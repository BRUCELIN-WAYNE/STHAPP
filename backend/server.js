// server.js

// --- Helper Functions ---
function paceToSeconds(min, sec) { return (parseFloat(min) || 0) * 60 + (parseFloat(sec) || 0); }
function speedToPace(speed) { return speed > 0 ? 100 / speed : 0; }
function formatTime(totalSeconds) { 
    if (isNaN(totalSeconds) || totalSeconds < 0 || !isFinite(totalSeconds)) return 'N/A'; 
    const minutes = Math.floor(totalSeconds / 60); 
    const seconds = totalSeconds % 60; 
    return `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`; 
}

// --- Lactate Calculation Models (Your Algorithms) ---
// (Please ensure your proprietary algorithms are fully implemented here)
function fitNewLactateModel(data) { /* ... your complex algorithm ... */ return { params: {}, fittedCurve: () => {} }; }
function findLogLogLT1(data) { /* ... your complex algorithm ... */ return data[0]; }
function calculateMetrics(data, peakLactate, recoveryLactate, recoveryDuration, mlssMethod) { /* ... your complex algorithm ... */ return { lt1: {}, mlss: {}, vvo2max: {} }; }
function calculateLactateZones(metrics) { /* ... your complex algorithm ... */ return []; }


// --- FINAL VERSION of calculateCssZones ---
function calculateCssZones(cssPace) {
    const formatPace = (totalSeconds) => {
        if (isNaN(totalSeconds) || !isFinite(totalSeconds)) return 'N/A';
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = (totalSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`;
    };

    const zones = [
        { id: 1, nameKey: "zone-name-1", purpose: '促进血液循环, 加速恢复, 打磨技术细节。', pace: `> ${formatPace(cssPace + 15)}`, color: '#f1f5f9' },
        { id: 2, nameKey: "zone-name-2", purpose: '构建有氧基础, 提高脂肪利用效率。', pace: `${formatPace(cssPace + 8)} - ${formatPace(cssPace + 14)}`, color: '#dcfce7' },
        { id: 3, nameKey: "zone-name-3", purpose: '“甜蜜点”训练, 提高舒适强度下的维持能力。', pace: `${formatPace(cssPace + 3)} - ${formatPace(cssPace + 7)}`, color: '#ccfbf1' },
        { id: 4, nameKey: "zone-name-4", purpose: '挑战并提升最大代谢稳态(MMSS)水平。', pace: `${formatPace(cssPace - 2)} - ${formatPace(cssPace + 2)}`, color: '#cffafe' },
        { id: 5, nameKey: "zone-name-5", purpose: '刺激并提升最大摄氧量(VO2max)。', pace: `${formatPace(cssPace - 7)} - ${formatPace(cssPace - 3)}`, color: '#dbeafe' },
        { id: 6, nameKey: "zone-name-6", purpose: '发展糖酵解功率, 提升乳酸耐受和清除能力。', pace: `${formatPace(cssPace - 12)} - ${formatPace(cssPace - 8)}`, color: '#ffedd5' },
        { id: 7, nameKey: "zone-name-7", purpose: '发展纯粹的速度和爆发力。', pace: '全力冲刺', color: '#fee2e2' }
    ];

    const translateZoneName = (nameKey) => {
        const names = {
            'zone-name-1': '恢复区',
            'zone-name-2': '耐力区',
            'zone-name-3': '节奏区',
            'zone-name-4': '阈值区',
            'zone-name-5': '最大摄氧量区',
            'zone-name-6': '无氧耐力区',
            'zone-name-7': '神经肌肉力量区',
        };
        return names[nameKey] || nameKey;
    };
    
    // CRITICAL FIX: Translate the nameKey before returning the data
    return zones.map(zone => ({
        ...zone,
        nameKey: translateZoneName(zone.nameKey)
    }));
}

// --- Server Setup ---
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 10000;

// --- API Routes ---
app.get('/', (req, res) => {
    res.send('Hello from the Swimming Test-hub backend!');
});

app.post('/analyze/lactate', (req, res) => {
    console.log("Received /analyze/lactate request with body:", JSON.stringify(req.body, null, 2));
    try {
        const { data, maxHr, baselineLactate } = req.body;
        const fullDataForCalc = [{ isBaseline: true, lactate: baselineLactate, speed: 0 }, ...data];
        const metrics = calculateMetrics(fullDataForCalc);
        const lactateZones = calculateLactateZones(metrics);
        res.json({ metrics, lactateZones });
    } catch (error) {
        console.error("Backend /analyze/lactate Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/analyze/css', (req, res) => {
    console.log("Received /analyze/css request with body:", JSON.stringify(req.body, null, 2));
    try {
        const { t400, t200 } = req.body;
        if (!t400 || !t200 || t400 <= t200) {
            return res.status(400).json({ success: false, message: 'Input error: 400m time must be greater than 200m time.' });
        }
        const cssPacePer100m = (t400 - t200) / 2;
        const cssZones = calculateCssZones(cssPacePer100m);
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