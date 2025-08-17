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

// --- Lactate & CSS Calculation Models ---
// (Mock data is used here for demonstration until your real algorithms are implemented)
function calculateMetrics(data) { 
    console.log("Using mock data for lactate metrics calculation.");
    return {
        lt1: { pace: 360, hr: 150, lactate: 1.8 },
        mlss: { pace: 300, hr: 170, lactate: 3.9 },
        vvo2max: { pace: 240, hr: 185, lactate: 7.5 }
    };
}
function calculateLactateZones(metrics) {
    console.log("Using mock data for lactate zones calculation.");
    // Pace is for 200m in the metrics, convert to 100m for zones
    const p_lt1 = metrics.lt1.pace / 2;
    const p_mlss = metrics.mlss.pace / 2;
    const p_vvo2max = metrics.vvo2max.pace / 2;
    const zones = [
        { id: 1, nameKey: "zone-name-1", purpose: '促进恢复, 技术练习。', pace: `> ${formatTime(p_lt1 + 10)}`, color: '#f1f5f9' },
        { id: 2, nameKey: "zone-name-2", purpose: '构建基础有氧能力。', pace: `${formatTime(p_lt1)} - ${formatTime(p_lt1 + 9)}`, color: '#dcfce7' },
        { id: 3, nameKey: "zone-name-3", purpose: '提高乳酸利用效率。', pace: `${formatTime(p_mlss + 1)} - ${formatTime(p_lt1 - 1)}`, color: '#ccfbf1' },
        { id: 4, nameKey: "zone-name-4", purpose: '提升最大乳酸稳态水平。', pace: `~ ${formatTime(p_mlss)}`, color: '#cffafe' },
        { id: 5, nameKey: "zone-name-5", purpose: '刺激心肺系统达到上限。', pace: `${formatTime(p_vvo2max)} - ${formatTime(p_mlss - 1)}`, color: '#dbeafe' },
        { id: 6, nameKey: "zone-name-6", purpose: '发展糖酵解功率。', pace: `${formatTime(p_vvo2max - 5)} - ${formatTime(p_vvo2max - 1)}`, color: '#ffedd5' },
        { id: 7, nameKey: "zone-name-7", purpose: '发展纯粹的速度和爆发力。', pace: '全力冲刺', color: '#fee2e2' }
    ];
    return zones;
}
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

// --- CRITICAL FIX: This function now creates the two-line object ---
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


// --- Server Setup ---
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 10000;

// --- API Routes ---
app.post('/analyze/lactate', (req, res) => {
    try {
        const metrics = calculateMetrics(req.body.data);
        let lactateZones = calculateLactateZones(metrics);
        // Apply the new two-line naming convention before sending
        lactateZones = lactateZones.map(zone => ({
            ...zone,
            nameKey: translateZoneName(zone.nameKey, zone.id)
        }));
        res.json({ metrics, lactateZones });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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
        // Apply the new two-line naming convention before sending
        cssZones = cssZones.map(zone => ({
            ...zone,
            nameKey: translateZoneName(zone.nameKey, zone.id)
        }));
        res.json({
            cssPace: formatTime(cssPacePer100m),
            cssZones: cssZones,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});