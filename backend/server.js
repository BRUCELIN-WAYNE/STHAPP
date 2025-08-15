const internalUsers = { "LINCHONGXIAO": "19981218", "XUJIAYU": "19950819", "ZHUMENGHUI": "19990323", "CAILI": "19870814", "LISHUDONG": "12345678", "LIZHUHAO": "19990109" };

// --- 核心工具函数 ---
function paceToSeconds(min, sec) { return (parseFloat(min) || 0) * 60 + (parseFloat(sec) || 0); }
function paceToSpeed(paceSeconds) { return paceSeconds > 0 ? 100 / paceSeconds : 0; }
function speedToPace(speed) { return speed > 0 ? 100 / speed : 0; }
function formatTime(totalSeconds) { if (isNaN(totalSeconds) || totalSeconds < 0 || !isFinite(totalSeconds)) return 'N/A'; const minutes = Math.floor(totalSeconds / 60); const seconds = totalSeconds % 60; return `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`; }

// --- 核心乳酸计算模型 (已迁移) ---
function fitNewLactateModel(data) {
    const modelFunc = (speed, cLa_rest, p1, p2) => speed <= p1 ? cLa_rest : cLa_rest * Math.exp((speed - p1) / p2);
    const calculateError = (params, data) => { let error = 0; const exponentialPhaseWeight = 2.0; const peakPointWeight = 5.0; const peakSpeed = data[data.length - 1].speed; for (const d of data) { if (d.isBaseline) continue; const squaredError = Math.pow(d.lactate - modelFunc(d.speed, params.cLa_rest, params.P1, params.P2), 2); if (d.speed === peakSpeed) { error += squaredError * peakPointWeight; } else if (d.speed > params.P1) { error += squaredError * exponentialPhaseWeight; } else { error += squaredError; } } return error; };
    const nonBaselineData = data.filter(d => !d.isBaseline); const speeds = nonBaselineData.map(d => d.speed); const lactates = nonBaselineData.map(d => d.lactate); const userBaselinePoint = data.find(d => d.isBaseline); let initialPoints = []; if (userBaselinePoint) { initialPoints.push(userBaselinePoint.lactate); } for(let i = 0; i < Math.min(3, lactates.length); i++) { initialPoints.push(lactates[i]); } const plausibleInitialPoints = initialPoints.filter(l => l < 4.0 && l > 0); let anchorLactate; if (plausibleInitialPoints.length >= 3) { const sortedPoints = [...plausibleInitialPoints].sort((a, b) => a - b); anchorLactate = sortedPoints[Math.floor(sortedPoints.length / 2)]; } else if (plausibleInitialPoints.length > 0) { anchorLactate = Math.min(...plausibleInitialPoints); } else { anchorLactate = (lactates.length > 0) ? Math.min(1.5, ...lactates) : 1.5; } const physiologicalMaxBaseline = 3.5; let cLa_rest_min = Math.max(0.5, anchorLactate * 0.85); let cLa_rest_max = Math.min(physiologicalMaxBaseline, anchorLactate * 1.15); if (cLa_rest_max < cLa_rest_min) { cLa_rest_max = cLa_rest_min + 0.5; }
    let bestFit = { cLa_rest: 0, P1: 0, P2: 0, error: Infinity }; const P1_min = Math.min(...speeds.filter(s => s > 0)); const P1_max = speeds[speeds.length - 2] || P1_min; const P2_min = 0.05; const P2_max = 2.0; const c_steps = 20, p1_steps = 25, p2_steps = 30; for (let i = 0; i <= c_steps; i++) { const cLa_rest = cLa_rest_min + i * (cLa_rest_max - cLa_rest_min) / c_steps; for (let j = 0; j <= p1_steps; j++) { const P1 = P1_min + j * (P1_max - P1_min) / p1_steps; if (P1 >= speeds[speeds.length - 1]) continue; for (let k = 0; k <= p2_steps; k++) { const P2 = P2_min + k * (P2_max - P2_min) / p2_steps; const current_error = calculateError({ cLa_rest, P1, P2 }, nonBaselineData); if (current_error < bestFit.error) { bestFit = { cLa_rest, P1, P2, error: current_error }; } } } }
    const c_range = (cLa_rest_max - cLa_rest_min) / c_steps; const p1_range = (P1_max - P1_min) / p1_steps; const p2_range = (P2_max - P2_min) / p2_steps; const fine_steps = 10; for (let i = -fine_steps; i <= fine_steps; i++) { const cLa_rest = bestFit.cLa_rest + i * (c_range / (2 * fine_steps)); for (let j = -fine_steps; j <= fine_steps; j++) { const P1 = bestFit.P1 + j * (p1_range / (2 * fine_steps)); for (let k = -fine_steps; k <= fine_steps; k++) { const P2 = bestFit.P2 + k * (p2_range / (2 * fine_steps)); if (cLa_rest < 0.3 || P1 < 0 || P2 <= 0.01) continue; const current_error = calculateError({ cLa_rest, P1, P2 }, nonBaselineData); if (current_error < bestFit.error) { bestFit = { cLa_rest, P1, P2, error: current_error }; } } } }
    const { cLa_rest, P1, P2 } = bestFit; return { params: { cLa_rest, P1, P2 }, fittedCurve: (speed) => modelFunc(speed, cLa_rest, P1, P2) };
}
function findLogLogLT1(data) {
    const logData = data.filter(d => d.speed > 0 && d.lactate > 0 && !d.isBaseline).map(d => ({ original: d, logSpeed: Math.log(d.speed), logLactate: Math.log(d.lactate) })); if (logData.length < 3) return data.filter(d => !d.isBaseline)[0]; let minError = Infinity, breakpointIndex = -1; for (let i = 1; i < logData.length - 1; i++) { const segment1 = logData.slice(0, i + 1); const segment2 = logData.slice(i); if (segment1.length < 2 || segment2.length < 2) continue; const getSegmentError = (segment) => { const n = segment.length; const sumX = segment.reduce((sum, p) => sum + p.logSpeed, 0); const sumY = segment.reduce((sum, p) => sum + p.logLactate, 0); const sumXY = segment.reduce((sum, p) => sum + p.logSpeed * p.logLactate, 0); const sumX2 = segment.reduce((sum, p) => sum + p.logSpeed * p.logSpeed, 0); const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX); const intercept = (sumY - slope * sumX) / n; let error = 0; for (const p of segment) { error += Math.pow(p.logLactate - (slope * p.logSpeed + intercept), 2); } return error; }; const totalError = getSegmentError(segment1) + getSegmentError(segment2); if (totalError < minError) { minError = totalError; breakpointIndex = i; } } return breakpointIndex !== -1 ? logData[breakpointIndex].original : data.filter(d => !d.isBaseline)[1];
}
function calculateMetrics(data, peakLactate, recoveryLactate, recoveryDuration, mlssMethod) {
    const nonBaselineData = data.filter(d => !d.isBaseline); if (!nonBaselineData || nonBaselineData.length < 3) { throw new Error('Please enter at least 3 valid data rows for analysis.'); } const vvo2max = nonBaselineData[nonBaselineData.length - 1]; const { params, fittedCurve } = fitNewLactateModel(data); let lt1; if (mlssMethod === 'loglog_dmax') { lt1 = findLogLogLT1(nonBaselineData); } else { const lt1_speed = params.P1; const lt1_lactate = fittedCurve(lt1_speed); lt1 = { speed: lt1_speed, lactate: lt1_lactate, pace: speedToPace(lt1_speed) }; }
    const startPoint = lt1; const endPoint = vvo2max; let max_dist = 0; let mlss = null; if (startPoint && endPoint && endPoint.speed > startPoint.speed) { const endPointLactateOnCurve = fittedCurve(endPoint.speed); const chord_m = (endPointLactateOnCurve - startPoint.lactate) / (endPoint.speed - startPoint.speed); const chord_c = startPoint.lactate - chord_m * startPoint.speed; for (let s = startPoint.speed; s <= endPoint.speed; s += 0.001) { const curve_lactate = fittedCurve(s); const dist = Math.abs(chord_m * s - curve_lactate + chord_c) / Math.sqrt(chord_m * chord_m + 1); if (dist > max_dist) { max_dist = dist; mlss = { speed: s, lactate: curve_lactate, pace: speedToPace(s) }; } } }
    const interpolate = (x1, y1, x2, y2, targetX) => { if (y1 === null || y2 === null || x1 === x2 || typeof y1 === 'undefined' || typeof y2 === 'undefined') return null; return y1 + (y2 - y1) * (targetX - x1) / (x2 - x1); }; const findBoundingPoints = (targetSpeed) => { for (let i = 0; i < nonBaselineData.length - 1; i++) { if (nonBaselineData[i].speed <= targetSpeed && nonBaselineData[i + 1].speed >= targetSpeed) { return { p1: nonBaselineData[i], p2: nonBaselineData[i + 1] }; } } return { p1: nonBaselineData[nonBaselineData.length - 2] || nonBaselineData[0], p2: nonBaselineData[nonBaselineData.length - 1] }; };
    [lt1, mlss].forEach(point => { if (point) { const { p1, p2 } = findBoundingPoints(point.speed); point.hr = interpolate(p1.speed, p1.hr, p2.speed, p2.hr, point.speed); point.rpe = interpolate(p1.speed, p1.rpe, p2.speed, p2.rpe, point.speed); } }); let clearanceRate = null; if (!isNaN(peakLactate) && !isNaN(recoveryLactate) && !isNaN(recoveryDuration) && recoveryDuration > 0) { clearanceRate = { value: (peakLactate - recoveryLactate) / recoveryDuration }; }
    let glycolyticIndex = null; if (mlss && vvo2max && vvo2max.speed > mlss.speed) { const vvo2max_lactate_on_curve = fittedCurve(vvo2max.speed); glycolyticIndex = (vvo2max_lactate_on_curve - mlss.lactate) / (vvo2max.speed - mlss.speed); }
    return { lt1, mlss, vvo2max, clearanceRate, glycolyticIndex, fittedCurve, params };
}

// --- 新增：后端专属的推荐算法模型 ---
function calculateLactateZones(metrics) {
    if (!metrics || !metrics.lt1 || !metrics.mlss || !metrics.vvo2max) { return []; }
    const p_lt1 = metrics.lt1.pace; const p_lt2 = metrics.mlss.pace; const p_vvo2max = metrics.vvo2max.pace;
    return [
        { id: 1, nameKey: 'zone-name-1', purpose: '促进恢复, 技术练习。', pace: `> ${formatTime(p_lt1 + 10)}`, color: 'bg-slate-100 text-slate-600' },
        { id: 2, nameKey: 'zone-name-2', purpose: '构建基础有氧能力, 提高线粒体效率。', pace: `${formatTime(p_lt1)} - ${formatTime(p_lt1 + 9)}`, color: 'bg-green-100 text-green-600' },
        { id: 3, nameKey: 'zone-name-3', purpose: '提高乳酸利用效率, 发展在高强度下的有氧能力。', pace: `${formatTime(p_lt2 + 1)} - ${formatTime(p_lt1 - 1)}`, color: 'bg-teal-100 text-teal-600' },
        { id: 4, nameKey: 'zone-name-4', purpose: '提升最大乳酸稳态水平。', pace: `~ ${formatTime(p_lt2)}`, color: 'bg-cyan-100 text-cyan-600' },
        { id: 5, nameKey: 'zone-name-5', purpose: '刺激心肺系统达到其功能上限, 提升VO2max。', pace: `${formatTime(p_vvo2max)} - ${formatTime(p_lt2 - 1)}`, color: 'bg-blue-100 text-blue-600' },
        { id: 6, nameKey: 'zone-name-6', purpose: '提升糖酵解功率和对高乳酸环境的耐受性。', pace: `${formatTime(p_vvo2max - 5)} - ${formatTime(p_vvo2max - 1)}`, color: 'bg-orange-100 text-orange-600' },
        { id: 7, nameKey: 'zone-name-7', purpose: '发展纯粹的速度和爆发力。', pace: '全力冲刺', color: 'bg-red-100 text-red-600' }
    ];
}
function calculateCssZones(cssPacePer100m) {
    if (isNaN(cssPacePer100m) || cssPacePer100m <= 0) { return []; }
    return [
        { id: 1, nameKey: 'zone-name-1', purpose: '促进血液循环, 加速恢复, 打磨技术细节。', pace: `> ${formatTime(cssPacePer100m + 15)}`, color: 'bg-slate-100 text-slate-600' },
        { id: 2, nameKey: 'zone-name-2', purpose: '构建有氧基础, 提高脂肪利用效率。', pace: `${formatTime(cssPacePer100m + 8)} - ${formatTime(cssPacePer100m + 14)}`, color: 'bg-green-100 text-green-600' },
        { id: 3, nameKey: 'zone-name-3', purpose: '“甜蜜点”训练, 提高舒适强度下的维持能力。', pace: `${formatTime(cssPacePer100m + 3)} - ${formatTime(cssPacePer100m + 7)}`, color: 'bg-teal-100 text-teal-600' },
        { id: 4, nameKey: 'zone-name-4', purpose: '挑战并提升最大代谢稳态(MMSS)水平。', pace: `${formatTime(cssPacePer100m - 2)} - ${formatTime(cssPacePer100m + 2)}`, color: 'bg-cyan-100 text-cyan-600' },
        { id: 5, nameKey: 'zone-name-5', purpose: '刺激并提升最大摄氧量(VO2max)。', pace: `${formatTime(cssPacePer100m - 7)} - ${formatTime(cssPacePer100m - 3)}`, color: 'bg-blue-100 text-blue-600' },
        { id: 6, nameKey: 'zone-name-6', purpose: '发展糖酵解功率, 提升乳酸耐受和清除能力。', pace: `${formatTime(cssPacePer100m - 12)} - ${formatTime(cssPacePer100m - 8)}`, color: 'bg-orange-100 text-orange-600' },
        { id: 7, nameKey: 'zone-name-7', purpose: '发展绝对速度和爆发力。', pace: '全力冲刺', color: 'bg-red-100 text-red-600' }
    ];
}
function generateTrainingRecommendations(zones) {
    if (!zones || zones.length < 7) { return []; }
    const getPaceForZones = (zoneIds) => zoneIds.map(id => zones.find(z => z.id === id)?.pace).join(' / ');
    return [
        { typeKey: 'reco-type-aec', goalKey: 'reco-goal-aec', mappedZones: getPaceForZones([2, 5, 6]), sampleKey: 'reco-set-aec' },
        { typeKey: 'reco-type-anc', goalKey: 'reco-goal-anc', mappedZones: getPaceForZones([6, 7]), sampleKey: 'reco-set-anc' },
        { typeKey: 'reco-type-aep', goalKey: 'reco-goal-aep', mappedZones: getPaceForZones([4, 5]), sampleKey: 'reco-set-aep' },
        { typeKey: 'reco-type-anp', goalKey: 'reco-goal-anp', mappedZones: getPaceForZones([6, 7]), sampleKey: 'reco-set-anp' }
    ];
}

// --- 服务器核心设置 ---
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const whitelist = ['https://swimming-test-hub-app.onrender.com']; // Your frontend URL
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // Allow requests from the whitelist and REST tools (like Postman, where origin is undefined)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
const port = 3000;

// --- API 路由定义 ---
app.get('/', (req, res) => {
    res.send('Hello from the Swimming Test-hub backend!');
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('收到登录请求, 用户名:', username);
    if (internalUsers[username.toUpperCase()] && internalUsers[username.toUpperCase()] === password) {
        res.json({ success: true, message: '登录成功！' });
    } else {
        res.status(401).json({ success: false, message: '用户名或密码无效。' });
    }
});

// ==========================================================
// --- 新增：为移动App提供文章列表的API接口 ---
// ==========================================================
const articles = [
  { id: 1, title: 'React Native Is Awesome', author: 'John Doe' },
  { id: 2, title: 'Building Your First App', author: 'Jane Smith' },
  { id: 3, title: 'Understanding API Endpoints', author: 'Peter Jones' },
  { id: 4, title: 'Connecting to a Backend', author: 'Emily White' },
];

app.get('/api/articles', (req, res) => {
    console.log("收到对 /api/articles 的GET请求");
    res.json(articles);
});
// ==========================================================
// --- 结束新增代码块 ---
// ==========================================================

app.post('/api/analyze/lactate', (req, res) => {
    try {
        const { data, peakLactate, recoveryLactate, recoveryDuration, mlssMethod } = req.body;
        console.log(`收到乳酸分析请求，方法: ${mlssMethod}，包含 ${data.length} 个数据点。`);
        const { fittedCurve, params, ...metrics } = calculateMetrics(data, peakLactate, recoveryLactate, recoveryDuration, mlssMethod);
        const lactateZones = calculateLactateZones(metrics);
        const trainingRecommendations = generateTrainingRecommendations(lactateZones);
        res.json({ metrics, lactateZones, trainingRecommendations, params });
    } catch (error) {
        console.error("后端计算出错:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/analyze/group', (req, res) => {
    try {
        const { groupData } = req.body;
        console.log(`收到团队分析请求，包含 ${Object.keys(groupData).length} 位运动员。`);
        const groupResults = {};
        for (const athleteName in groupData) {
            const athleteData = groupData[athleteName];
            if (athleteData && athleteData.length >= 3) {
                const { fittedCurve, params, ...metrics } = calculateMetrics(athleteData, NaN, NaN, NaN, 'mod_dmax');
                const lactateZones = calculateLactateZones(metrics);
                const trainingRecommendations = generateTrainingRecommendations(lactateZones);
                groupResults[athleteName] = { metrics, lactateZones, trainingRecommendations, params };
            }
        }
        res.json(groupResults);
    } catch (error) {
        console.error("后端团队分析出错:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/analyze/css', (req, res) => {
    try {
        const { t400_min, t400_sec, t200_min, t200_sec } = req.body;
        const t400_total_sec = paceToSeconds(t400_min, t400_sec);
        const t200_total_sec = paceToSeconds(t200_min, t200_sec);

        if (t400_total_sec <= t200_total_sec || t200_total_sec === 0) {
            return res.status(400).json({ success: false, message: '输入错误: 400米时间必须大于200米时间。' });
        }

        const cssPacePer100m = (t400_total_sec - t200_total_sec) / 2;
        const cssZones = calculateCssZones(cssPacePer100m);
        const trainingRecommendations = generateTrainingRecommendations(cssZones);

        res.json({
            cssPace: formatTime(cssPacePer100m),
            cssZones,
            trainingRecommendations
        });
    } catch (error) {
        console.error("后端CSS分析出错:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`后端服务器已在 http://localhost:${port} 上运行`);
});