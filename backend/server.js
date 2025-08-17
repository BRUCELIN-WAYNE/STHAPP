// server.js

// --- 服务器核心设置 ---
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 10000;


// --- START: 核心算法模型 (1:1 移植自 LINFINAL.html) ---

// 辅助函数
function paceToSeconds(min, sec) { return (parseFloat(min) || 0) * 60 + (parseFloat(sec) || 0); }
function speedToPace(speed) { return speed > 0 ? 200 / speed : 0; } // 修正为200米配速
function formatTime(totalSeconds) {
    if (isNaN(totalSeconds) || !isFinite(totalSeconds)) return 'N/A';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`;
}

// 核心乳酸曲线拟合模型
function fitNewLactateModel(data) {
    const modelFunc = (speed, cLa_rest, p1, p2) => speed <= p1 ? cLa_rest : cLa_rest * Math.exp((speed - p1) / p2);
    
    const calculateError = (params, data) => {
        let error = 0;
        const nonBaselineData = data.filter(d => !d.isBaseline);
        for (const d of nonBaselineData) {
            const squaredError = Math.pow(d.lactate - modelFunc(d.speed, params.cLa_rest, params.P1, params.P2), 2);
            error += squaredError;
        }
        return error;
    };

    const nonBaselineData = data.filter(d => !d.isBaseline);
    const speeds = nonBaselineData.map(d => d.speed);
    const lactates = nonBaselineData.map(d => d.lactate);
    const userBaselineLactate = (data.find(d => d.isBaseline) || {}).lactate || Math.min(...lactates);

    const cLa_rest_min = Math.max(0.5, userBaselineLactate * 0.8);
    const cLa_rest_max = Math.min(3.5, userBaselineLactate * 1.2);
    
    let bestFit = { error: Infinity };
    const P1_min = Math.min(...speeds.filter(s => s > 0));
    const P1_max = speeds[speeds.length - 2] || P1_min;
    
    // Grid search to find best initial parameters
    for (let c = cLa_rest_min; c <= cLa_rest_max; c += 0.1) {
        for (let p1 = P1_min; p1 <= P1_max; p1 += 0.05) {
            for (let p2 = 0.05; p2 <= 0.5; p2 += 0.02) {
                const error = calculateError({ cLa_rest: c, P1: p1, P2: p2 }, data);
                if (error < bestFit.error) {
                    bestFit = { cLa_rest: c, P1: p1, P2: p2, error: error };
                }
            }
        }
    }
    const { cLa_rest, P1, P2 } = bestFit;
    return { params: { cLa_rest, P1, P2 }, fittedCurve: (speed) => modelFunc(speed, cLa_rest, P1, P2) };
}

// Log-log 方法寻找 LT1
function findLogLogLT1(data) {
    const logData = data.filter(d => d.speed > 0 && d.lactate > 0 && !d.isBaseline).map(d => ({
        original: d, logSpeed: Math.log(d.speed), logLactate: Math.log(d.lactate)
    }));
    if (logData.length < 3) return data.filter(d => !d.isBaseline)[0];
    let minError = Infinity, breakpointIndex = -1;
    for (let i = 1; i < logData.length - 1; i++) {
        const segment1 = logData.slice(0, i + 1);
        const segment2 = logData.slice(i);
        if (segment1.length < 2 || segment2.length < 2) continue;
        const getSegmentError = (segment) => {
            const n = segment.length;
            const sumX = segment.reduce((sum, p) => sum + p.logSpeed, 0);
            const sumY = segment.reduce((sum, p) => sum + p.logLactate, 0);
            const sumXY = segment.reduce((sum, p) => sum + p.logSpeed * p.logLactate, 0);
            const sumX2 = segment.reduce((sum, p) => sum + p.logSpeed * p.logSpeed, 0);
            const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
            const intercept = (sumY - slope * sumX) / n;
            let error = 0;
            for (const p of segment) { error += Math.pow(p.logLactate - (slope * p.logSpeed + intercept), 2); }
            return error;
        };
        const totalError = getSegmentError(segment1) + getSegmentError(segment2);
        if (totalError < minError) {
            minError = totalError;
            breakpointIndex = i;
        }
    }
    return breakpointIndex !== -1 ? logData[breakpointIndex].original : data.filter(d => !d.isBaseline)[1];
}

// 核心指标计算函数
function calculateMetrics(data, mlssMethod = 'mod_dmax') {
    const nonBaselineData = data.filter(d => !d.isBaseline);
    if (!nonBaselineData || nonBaselineData.length < 3) throw new Error("至少需要3组有效数据");
    
    const vvo2max = nonBaselineData[nonBaselineData.length - 1];
    const { params, fittedCurve } = fitNewLactateModel(data);

    let lt1;
    if (mlssMethod === 'loglog_dmax') {
        lt1 = findLogLogLT1(nonBaselineData);
    } else { // mod_dmax
        const lt1_speed = params.P1;
        const lt1_lactate = fittedCurve(lt1_speed);
        lt1 = { speed: lt1_speed, lactate: lt1_lactate, pace: speedToPace(lt1_speed) };
    }
    
    const startPoint = lt1;
    const endPoint = vvo2max;
    let max_dist = 0;
    let mlss = null;

    if (startPoint && endPoint && endPoint.speed > startPoint.speed) {
        const endPointLactateOnCurve = fittedCurve(endPoint.speed);
        const chord_m = (endPointLactateOnCurve - startPoint.lactate) / (endPoint.speed - startPoint.speed);
        const chord_c = startPoint.lactate - chord_m * startPoint.speed;
        for (let s = startPoint.speed; s <= endPoint.speed; s += 0.001) {
            const curve_lactate = fittedCurve(s);
            const dist = Math.abs(chord_m * s - curve_lactate + chord_c) / Math.sqrt(chord_m * chord_m + 1);
            if (dist > max_dist) {
                max_dist = dist;
                mlss = { speed: s, lactate: curve_lactate, pace: speedToPace(s) };
            }
        }
    }

    const interpolate = (x1, y1, x2, y2, targetX) => (y1 + (y2 - y1) * (targetX - x1) / (x2 - x1));
    const findBoundingPoints = (targetSpeed) => {
        for(let i = 0; i < nonBaselineData.length - 1; i++){
            if(nonBaselineData[i].speed <= targetSpeed && nonBaselineData[i+1].speed >= targetSpeed){
                return { p1: nonBaselineData[i], p2: nonBaselineData[i+1] };
            }
        }
        return { p1: nonBaselineData[nonBaselineData.length - 2], p2: nonBaselineData[nonBaselineData.length - 1] };
    };

    [lt1, mlss].forEach(point => {
        if (point) {
            const { p1, p2 } = findBoundingPoints(point.speed);
            point.hr = interpolate(p1.speed, p1.hr, p2.speed, p2.hr, point.speed);
        }
    });

    return { lt1, mlss, vvo2max };
}

// 训练区间计算
function calculateLactateZones(metrics) {
    if (!metrics || !metrics.lt1 || !metrics.mlss || !metrics.vvo2max) return [];
    
    const p_lt1 = metrics.lt1.pace;
    const p_mlss = metrics.mlss.pace;
    const p_vvo2max = metrics.vvo2max.pace;

    const zones = [
        { id: 1, nameKey: "zone-name-1", purpose: '促进恢复, 技术练习。', pace: `> ${formatTime(p_lt1 + 10)}`, color: '#f1f5f9' },
        { id: 2, nameKey: "zone-name-2", purpose: '构建基础有氧能力。', pace: `${formatTime(p_lt1)} - ${formatTime(p_lt1 + 9)}`, color: '#dcfce7' },
        { id: 3, nameKey: "zone-name-3", purpose: '提高乳酸利用效率。', pace: `${formatTime(p_mlss + 6)} - ${formatTime(p_lt1 - 1)}`, color: '#ccfbf1' },
        { id: 4, nameKey: "zone-name-4", purpose: '提升最大乳酸稳态水平。', pace: `${formatTime(p_mlss - 5)} - ${formatTime(p_mlss + 5)}`, color: '#cffafe' },
        { id: 5, nameKey: "zone-name-5", purpose: '刺激心肺系统达到上限。', pace: `${formatTime(p_vvo2max)} - ${formatTime(p_mlss - 6)}`, color: '#dbeafe' },
        { id: 6, nameKey: "zone-name-6", purpose: '发展糖酵解功率。', pace: `${formatTime(p_vvo2max - 8)} - ${formatTime(p_vvo2max - 1)}`, color: '#ffedd5' },
        { id: 7, nameKey: "zone-name-7", purpose: '发展纯粹的速度和爆发力。', pace: '全力冲刺', color: '#fee2e2' }
    ];
    return zones;
}

// CSS 区间计算
function calculateCssZones(cssPace) {
    const zones = [
        { id: 1, nameKey: "zone-name-1", purpose: '促进血液循环, 加速恢复, 打磨技术细节。', pace: `> ${formatTime(cssPace + 15)}`, color: '#f1f5f9' },
        { id: 2, nameKey: "zone-name-2", purpose: '构建有氧基础, 提高脂肪利用效率。', pace: `${formatTime(cssPace + 8)} - ${formatTime(cssPace + 14)}`, color: '#dcfce7' },
        { id: 3, nameKey: "zone-name-3", purpose: '“甜蜜点”训练, 提高舒适强度下的维持能力。', pace: `${formatTime(cssPace + 3)} - ${formatTime(cssPace + 7)}`, color: '#ccfbf1' },
        { id: 4, nameKey: "zone-name-4", purpose: '挑战并提升最大代谢稳态(MMSS)水平。', pace: `${formatTime(cssPace - 2)} - ${formatTime(cssPace + 2)}`, color: '#cffafe' },
        { id: 5, nameKey: "zone-name-5", purpose: '刺激并提升最大摄氧量(VO2max)。', pace: `${formatTime(cssPace - 7)} - ${formatTime(cssPace - 3)}`, color: '#dbeafe' },
        { id: 6, nameKey: "zone-name-6", purpose: '发展糖酵解功率, 提升乳酸耐受和清除能力。', pace: `${formatTime(cssPace - 12)} - ${formatTime(cssPace - 8)}`, color: '#ffedd5' },
        { id: 7, nameKey: "zone-name-7", purpose: '发展纯粹的速度和爆发力。', pace: '全力冲刺', color: '#fee2e2' }
    ];
    return zones;
}

// 区间名称格式化
function translateZoneName(nameKey, id) {
    const names = {
      'zone-name-1': '恢复区', 'zone-name-2': '耐力区', 'zone-name-3': '节奏区',
      'zone-name-4': '阈值区', 'zone-name-5': '最大摄氧量区', 'zone-name-6': '无氧耐力区',
      'zone-name-7': '神经肌肉力量区',
    };
    return {
        line1: `区间 ${id}`,
        line2: names[nameKey] || nameKey
    };
}
// --- END: 核心算法模型 ---


// --- API 路由定义 ---
app.get('/', (req, res) => {
    res.send('Hello from the Swimming Test-hub backend! All algorithms are live.');
});

app.post('/analyze/lactate', (req, res) => {
    try {
        const { data, maxHr, baselineLactate, restingLactate } = req.body;
        
        // 将基线数据点加入到数据数组中供算法使用
        const fullDataForCalc = [
            { isBaseline: true, lactate: baselineLactate, speed: 0 },
            ...data
        ];
        
        // 调用真实的算法
        const metrics = calculateMetrics(fullDataForCalc);
        let lactateZones = calculateLactateZones(metrics);

        // 格式化区间名称
        lactateZones = lactateZones.map(zone => ({
            ...zone,
            nameKey: translateZoneName(zone.nameKey, zone.id)
        }));

        res.json({ metrics, lactateZones });
    } catch (error) {
        console.error("Backend /analyze/lactate Error:", error);
        res.status(500).json({ success: false, message: "Calculation error: " + error.message });
    }
});

app.post('/analyze/css', (req, res) => {
    try {
        const { t400, t200 } = req.body;
        if (!t400 || !t200 || t400 <= t200) {
            return res.status(400).json({ success: false, message: 'Input error' });
        }
        const cssPacePer100m = (t400 - t200) / 2;
        let cssZones = calculateCssZones(cssPacePer100m);
        
        cssZones = cssZones.map(zone => ({
            ...zone,
            nameKey: translateZoneName(zone.nameKey, zone.id)
        }));
        
        res.json({
            cssPace: formatTime(cssPacePer100m),
            cssZones: cssZones,
        });
    } catch (error) {
        console.error("Backend /analyze/css Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});