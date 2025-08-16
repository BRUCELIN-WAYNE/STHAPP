// server.js

// --- Helper Functions (No changes needed here) ---
function paceToSeconds(min, sec) { return (parseFloat(min) || 0) * 60 + (parseFloat(sec) || 0); }
function speedToPace(speed) { return speed > 0 ? 100 / speed : 0; }
function formatTime(totalSeconds) { 
    if (isNaN(totalSeconds) || totalSeconds < 0 || !isFinite(totalSeconds)) return 'N/A'; 
    const minutes = Math.floor(totalSeconds / 60); 
    const seconds = totalSeconds % 60; 
    return `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`; 
}

// --- Lactate & CSS Calculation Models (No changes needed here) ---
function fitNewLactateModel(data) { /* ... your solid algorithm ... */ }
function findLogLogLT1(data) { /* ... your solid algorithm ... */ }
function calculateMetrics(data, peakLactate, recoveryLactate, recoveryDuration, mlssMethod) { /* ... your solid algorithm ... */ }
function calculateLactateZones(metrics) { /* ... your solid algorithm ... */ }
function calculateCssZones(cssPacePer100m) { /* ... your solid algorithm ... */ }
// ... (and other calculation functions) ...


// --- Server Setup ---
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

// --- API Routes ---
app.get('/', (req, res) => {
    res.send('Hello from the Swimming Test-hub backend!');
});

app.post('/analyze/lactate', (req, res) => {
    try {
        const { data, peakLactate, recoveryLactate, recoveryDuration, mlssMethod } = req.body;
        console.log(`Received lactate analysis request, method: ${mlssMethod}, with ${data.length} data points.`);
        const { fittedCurve, params, ...metrics } = calculateMetrics(data, peakLactate, recoveryLactate, recoveryDuration, mlssMethod);
        const lactateZones = calculateLactateZones(metrics);
        res.json({ metrics, lactateZones });
    } catch (error) {
        console.error("Backend calculation error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- CORE CHANGE: CSS Analysis Route ---
app.post('/analyze/css', (req, res) => {
    try {
        // CRITICAL FIX: Receive the total seconds sent by the Mini Program
        const { t400, t200 } = req.body;

        if (!t400 || !t200 || t400 <= t200) {
            return res.status(400).json({ success: false, message: 'Input error: 400m time must be greater than 200m time.' });
        }

        const cssPacePer100m = (t400 - t200) / 2;
        const cssZones = calculateCssZones(cssPacePer100m);

        res.json({
            cssPace: formatTime(cssPacePer100m), // Use the backend's formatTime
            cssZones: cssZones,
        });
    } catch (error) {
        console.error("Backend CSS analysis error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});


app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});