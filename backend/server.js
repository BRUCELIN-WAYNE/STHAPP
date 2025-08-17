// server.js

// --- 辅助函数 ---
function paceToSeconds(min, sec) { return (parseFloat(min) || 0) * 60 + (parseFloat(sec) || 0); }
function speedToPace(speed) { return speed > 0 ? 100 / speed : 0; }
function formatTime(totalSeconds) { 
    if (isNaN(totalSeconds) || totalSeconds < 0 || !isFinite(totalSeconds)) return 'N/A'; 
    const minutes = Math.floor(totalSeconds / 60); 
    const seconds = totalSeconds % 60; 
    return `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`; 
}

// --- 核心乳酸计算模型 (这些是您提供的算法，我们假设它们是正确的) ---
// (请确保您后端项目中确实包含了这些函数的完整实现)
function fitNewLactateModel(data) { /* ... 您的复杂算法 ... */ return { params: {}, fittedCurve: () => {} }; }
function findLogLogLT1(data) { /* ... 您的复杂算法 ... */ return data[0]; }
function calculateMetrics(data, peakLactate, recoveryLactate, recoveryDuration, mlssMethod) { /* ... 您的复杂算法 ... */ return { lt1: {}, mlss: {}, vvo2max: {} }; }
function calculateLactateZones(metrics) { /* ... 您的复杂算法 ... */ return []; }


// --- ！！！关键补充：为您补全缺失的 CSS 区间计算函数！！！ ---
function calculateCssZones(cssPace) {
    const zones = [
        { id: 1, nameKey: "zone-name-1", purpose: '促进血液循环, 加速恢复, 打磨技术细节。', pace: `> ${formatTime(cssPace + 15)}`, color: '#f1f5f9' },
        { id: 2, nameKey: "zone-name-2", purpose: '构建有氧基础, 提高脂肪利用效率。', pace: `${formatTime(cssPace + 8)} - ${formatTime(cssPace + 14)}`, color: '#dcfce7' },
        { id: 3, nameKey: "zone-name-3", purpose: '“甜蜜点”训练, 提高舒适强度下的维持能力。', pace: `${formatTime(cssPace + 3)} - ${formatTime(cssPace + 7)}`, color: '#ccfbf1' },
        { id: 4, nameKey: "zone-name-4", purpose: '挑战并提升最大代谢稳态(MMSS)水平。', pace: `${formatTime(cssPace - 2)} - ${formatTime(cssPace + 2)}`, color: '#cffafe' },
        { id: 5, nameKey: "zone-name-5", purpose: '刺激并提升最大摄氧量(VO2max)。', pace: `${formatTime(cssPace - 7)} - ${formatTime(cssPace - 3)}`, color: '#dbeafe' },
        { id: 6, nameKey: "zone-name-6", purpose: '发展糖酵解功率, 提升乳酸耐受和清除能力。', pace: `${formatTime(cssPace - 12)} - ${formatTime(cssPace - 8)}`, color: '#ffedd5' },
        { id: 7, nameKey: "zone-name-7", purpose: '发展绝对速度和爆发力。', pace: '全力冲刺', color: '#fee2e2' }
    ];
    // 注意：这里的 translateZoneName 可以在小程序前端完成，后端返回 nameKey 即可
    return zones;
}

// --- 服务器核心设置 ---
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

// --- API 路由定义 ---
app.get('/', (req, res) => {
    res.send('Hello from the Swimming Test-hub backend!');
});

app.post('/analyze/lactate', (req, res) => {
    // --- 关键调试步骤：在服务器端打印接收到的数据 ---
    console.log("收到 /analyze/lactate 请求, 请求体 (body):", JSON.stringify(req.body, null, 2));
    
    try {
        // 解构请求体，注意 baselineLactate 和 data 现在是分开的
        const { data, maxHr, baselineLactate, restingLactate, peakLactate, recoveryLactate, recoveryDuration, mlssMethod } = req.body;

        // 将 baselineLactate 数据点加回到 data 数组的开头，供算法使用
        const fullDataForCalc = [
            { isBaseline: true, lactate: baselineLactate, speed: 0 },
            ...data
        ];

        const { fittedCurve, params, ...metrics } = calculateMetrics(fullDataForCalc, peakLactate, recoveryLactate, recoveryDuration, mlssMethod);
        const lactateZones = calculateLactateZones(metrics);
        res.json({ metrics, lactateZones });

    } catch (error) {
        console.error("后端 /analyze/lactate 接口出错:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/analyze/css', (req, res) => {
    // --- 关键调试步骤：在服务器端打印接收到的数据 ---
    console.log("收到 /analyze/css 请求, 请求体 (body):", JSON.stringify(req.body, null, 2));

    try {
        const { t400, t200 } = req.body;

        if (!t400 || !t200 || t400 <= t200) {
            return res.status(400).json({ success: false, message: '输入错误: 400米时间必须大于200米时间。' });
        }

        const cssPacePer100m = (t400 - t200) / 2;
        // --- 关键修正：调用我们刚刚补全的函数 ---
        const cssZones = calculateCssZones(cssPacePer100m);

        res.json({
            cssPace: formatTime(cssPacePer100m),
            cssZones: cssZones, // 现在 cssZones 应该有内容了
        });
    } catch (error) {
        console.error("后端 /analyze/css 接口出错:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});