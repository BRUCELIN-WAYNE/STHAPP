// server.js

// --- 核心工具函数 (No changes needed here) ---
function paceToSeconds(min, sec) { return (parseFloat(min) || 0) * 60 + (parseFloat(sec) || 0); }
function speedToPace(speed) { return speed > 0 ? 100 / speed : 0; }
// ... (and other helper functions) ...

// --- 核心乳酸计算模型 (No changes needed here) ---
function fitNewLactateModel(data) { /* ... your solid algorithm ... */ }
function findLogLogLT1(data) { /* ... your solid algorithm ... */ }
function calculateMetrics(data, peakLactate, recoveryLactate, recoveryDuration, mlssMethod) { /* ... your solid algorithm ... */ }

// --- 后端专属的推荐算法模型 (No changes needed here) ---
function calculateLactateZones(metrics) { /* ... your solid algorithm ... */ }
function calculateCssZones(cssPacePer100m) { /* ... your solid algorithm ... */ }
// ... (and other calculation functions) ...


// --- 服务器核心设置 ---
const express = require('express');
const cors = require('cors'); // Make sure cors is installed
const app = express();

// --- FIX #3: Allow requests from any origin, including the Mini Program ---
app.use(cors());

app.use(express.json());
const port = process.env.PORT || 3000; // Render provides the PORT env variable

// --- API 路由定义 (FIX #1: Removed '/api' prefix) ---
app.get('/', (req, res) => {
    res.send('Hello from the Swimming Test-hub backend!');
});

// The login route is not needed for the Mini Program, but kept for the website
// app.post('/login', ...);

app.post('/analyze/lactate', (req, res) => {
    try {
        // Your existing lactate analysis logic...
        const { data, peakLactate, recoveryLactate, recoveryDuration, mlssMethod } = req.body;
        console.log(`Received lactate analysis request, method: ${mlssMethod}, with ${data.length} data points.`);
        const { fittedCurve, params, ...metrics } = calculateMetrics(data, peakLactate, recoveryLactate, recoveryDuration, mlssMethod);
        const lactateZones = calculateLactateZones(metrics);
        // ... (rest of your logic)
        res.json({ metrics, lactateZones /*, ...other results */ });
    } catch (error) {
        console.error("Backend calculation error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/analyze/css', (req, res) => {
    try {
        const { t400, t200 } = req.body; // Mini Program sends t400 and t200 directly

        if (t400 <= t200 || t200 === 0) {
            return res.status(400).json({ success: false, message: 'Input error: 400m time must be greater than 200m time.' });
        }

        const cssPacePer100m = (t400 - t200) / 2;
        const cssZones = calculateCssZones(cssPacePer100m);
        // const trainingRecommendations = generateTrainingRecommendations(cssZones); // You can add this back if needed

        res.json({
            cssPace: formatTime(cssPacePer100m), // Ensure formatTime is defined
            cssZones,
            // trainingRecommendations
        });
    } catch (error) {
        console.error("Backend CSS analysis error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});


app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});

// Make sure all helper functions like formatTime are defined in this file
function formatTime(totalSeconds) { 
    if (isNaN(totalSeconds) || totalSeconds < 0 || !isFinite(totalSeconds)) return 'N/A'; 
    const minutes = Math.floor(totalSeconds / 60); 
    const seconds = totalSeconds % 60; 
    return `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`; 
}