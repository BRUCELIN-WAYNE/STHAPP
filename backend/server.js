// server.js

// --- Helper Functions ---
function paceToSeconds(min, sec) { return (parseFloat(min) || 0) * 60 + (parseFloat(sec) || 0); }
function speedToPace(speed) { return speed > 0 ? 100 / speed : 0; }
function formatTime(totalSeconds) { 
    if (isNaN(totalSeconds) || !isFinite(totalSeconds)) return 'N/A'; 
    const minutes = Math.floor(totalSeconds / 60); 
    const seconds = (totalSeconds % 60); 
    return `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`; 
}

// --- Lactate & CSS Calculation Models (Using Mocks for now) ---
function calculateMetrics(data) { 
    // This is a mock implementation. Replace with your real algorithm.
    console.log("Using mock data for lactate metrics calculation.");
    return {
        lt1: { pace: 360, hr: 150, lactate: 1.8 },
        mlss: { pace: 300, hr: 170, lactate: 3.9 },
        vvo2max: { pace: 240, hr: 185, lactate: 7.5 }
    };
}
function calculateLactateZones(metrics) {
    // This is a mock implementation. Replace with your real algorithm.
    console.log("Using mock data for lactate zones calculation.");
    const zones = [
        { id: 1, nameKey: "zone-name-1", purpose: '促进恢复, 技术练习。', pace: '> 07:00', color: '#f1f5f9' },
        { id: 2, nameKey: "zone-name-2", purpose: '构建基础有氧能力。', pace: '06:00 - 06:59', color: '#dcfce7' },
        { id: 3, nameKey: "zone-name-3", purpose: '提高乳酸利用效率。', pace: '05:30 - 05:59', color: '#ccfbf1' },
        { id: 4, nameKey: "zone-name-4", purpose: '提升最大乳酸稳态水平。', pace: '~ 05:29', color: '#cffafe' },
        { id: 5, nameKey: "zone-name-5", purpose: '刺激心肺系统达到上限。', pace: '05:00 - 05:28', color: '#dbeafe' }
    ];
    return zones;
}

// --- FINAL VERSION of calculateCssZones ---
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

// --- FINAL VERSION of translateZoneName ---
function translateZoneName(nameKey, id) {
    const names = {
      'zone-name-1': '恢复区', 'zone-name-2': '耐力区', 'zone-name-3': '节奏区',
      'zone-name-4': '阈值区', 'zone-name-5': '最大摄氧量区', 'zone-name-6': '无氧耐力区',
      'zone-name-7': '神经肌肉力量区',
    };
    // Add the "区间 X:" prefix
    return `区间 ${id}: ${names[nameKey] || nameKey}`;
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
    console.log("Received /analyze/lactate request.");
    try {
        // Using mock data until the real algorithm is implemented
        const metrics = calculateMetrics(req.body.data);
        const lactateZones = calculateLactateZones(metrics);
        res.json({ metrics, lactateZones });
    } catch (error) {
        console.error("Backend /analyze/lactate Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/analyze/css', (req, res) => {
    console.log("Received /analyze/css request.");
    try {
        const { t400, t200 } = req.body;
        if (!t400 || !t200 || t400 <= t200) {
            return res.status(400).json({ success: false, message: 'Input error: 400m time must be greater than 200m time.' });
        }
        const cssPacePer100m = (t400 - t200) / 2;
        let cssZones = calculateCssZones(cssPacePer100m);

        // Apply the new numbered naming convention
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