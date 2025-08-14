// --- i18n Translation ---
const translations = {
    en: {
        // ... all other translations
        'pace-sugg-label': '200m Personal Best', 
        'pace-sugg-min': 'min', 
        // ==== MODIFICATION START ====
        'pace-sugg-sec': 's', // Changed from "sec" to "s"
        // ==== MODIFICATION END ====
        'pace-sugg-button': 'Calculate Paces', 
        // ... all other translations
    },
    zh: {
        // ... all other translations
        'login-required-button': '登录', 
        // ==== MODIFICATION START ====
        'tab-lactate': '乳酸阶梯测试', // For consistency, changed from "乳酸分级测试"
        'tab-css': '临界游泳速度', 
        'protocol-title': '乳酸阶梯测试协议', // Changed from "乳酸分级测试方案"
        // ==== MODIFICATION END ====
        'protocol-p1': '乳酸阶梯测试是经典的耐力评估方法，旨在确定运动员在不同运动强度下的生理反应，特别是血乳酸浓度的拐点。这些拐点对于精确定义训练区间至关重要。',
        // ... all other translations
    }
};

// --- Authentication & Language ---
let currentLanguage = 'zh';

// --- New Helper Function to reliably get CSS variable values ---
function getCssVariable(variableName) {
    const styles = getComputedStyle(document.documentElement);
    return styles.getPropertyValue(variableName).trim();
}

function switchLanguage(lang) {
    const mainContainer = document.getElementById('main-app-container');
    mainContainer.classList.add('content-fade-out');
    setTimeout(() => {
        currentLanguage = lang;
        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) { el.innerHTML = translations[lang][key]; }
        });
        document.querySelectorAll('[data-lang-key-placeholder]').forEach(el => {
            const key = el.getAttribute('data-lang-key-placeholder');
            if (translations[lang] && translations[lang][key]) { el.placeholder = translations[lang][key]; }
        });
        const langSwitcher = document.getElementById('language-switcher');
        if (lang === 'en') {
            langSwitcher.innerHTML = `<button onclick="switchLanguage('zh')" class="px-3 py-2 text-sm font-semibold text-gray-600 bg-white/50 rounded-lg hover:bg-white transition-colors">中</button>`;
        } else {
            langSwitcher.innerHTML = `<button onclick="switchLanguage('en')" class="px-3 py-2 text-sm font-semibold text-gray-600 bg-white/50 rounded-lg hover:bg-white transition-colors">EN</button>`;
        }
        updateUIForLoginState();
        if (!document.getElementById('pace-suggestions-results').classList.contains('hidden')) { calculatePaceSuggestions(); }
        if (lastCssPace !== null) { document.getElementById('calculate-css-btn').click(); }
        if (lastLactateMetrics !== null) {
            const reportId = 'individual-report';
            const resultsContainer = document.getElementById('lactate-results-container');
            const reportHTML = generateReportHTML(reportId, translations[currentLanguage]['report-title-individual'], true);
            resultsContainer.innerHTML = reportHTML;
            rerenderLastLactateAnalysis();
        }
        if (Object.keys(globalGroupData).length > 0) {
            const groupResultsContainer = document.getElementById('group-lactate-results-container');
            const summaryHTML = generateGroupSummaryHTML(globalGroupSummaryData);
            groupResultsContainer.innerHTML = summaryHTML;
            rerenderGroupReportsAfterLanguageSwitch();
        }
        mainContainer.classList.remove('content-fade-out');
    }, 200);
}

// Helper function to re-render individual analysis after language switch
function rerenderLastLactateAnalysis() {
    const reportId = 'individual-report';
    const athleteLevel = document.getElementById('individual-athlete-level').value;
    const eventSpecialty = document.getElementById('individual-event-specialty').value;
    const maxHr = parseInt(document.getElementById('max-hr').value);
    const restingLactate = parseFloat(document.getElementById('resting-lactate').value);
    const mlssMethod = document.querySelector(`#mlss-method-fieldset-${reportId} input:checked`)?.value || 'mod_dmax';
    displayLactateResults(reportId, globalIndividualData.filter(d => !d.isBaseline), restingLactate, lastLactateMetrics, maxHr, mlssMethod, athleteLevel, eventSpecialty, lastLactateMetrics.zones, lastLactateMetrics.recommendations);
}

// Helper function to re-render group analysis after language switch
function rerenderGroupReportsAfterLanguageSwitch() {
    requestAnimationFrame(() => {
        updateRadarChartFromSelection();
        let allReportsHTML = '';
        Object.keys(globalGroupData).forEach((athleteName, index) => {
            const reportId = `report-group-${index}`;
            const reportTitle = `${athleteName}${translations[currentLanguage]['report-title-group']}`;
            allReportsHTML += `<div>${generateReportHTML(reportId, reportTitle, true, athleteName)}</div>`;
        });
        const individualReportsContainer = document.getElementById('group-reports-anchor');
        if (individualReportsContainer) { individualReportsContainer.innerHTML = allReportsHTML; }
        rerenderGroupReports();
    });
}

// ==== Refactored handleLogin Function ====
async function handleLogin(event) {
    createRipple(event);
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorDiv = document.getElementById('login-error');
    const username = usernameInput.value;
    const password = passwordInput.value;
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        });
        const result = await response.json();
        if (response.ok) {
            sessionStorage.setItem('loggedIn', 'true');
            errorDiv.classList.add('hidden'); // Hide error on successful login
            closeLoginModal();
            updateUIForLoginState();
        } else {
            errorDiv.textContent = translations[currentLanguage]['login-error']; // Use translation
            errorDiv.classList.remove('hidden');
        }
    } catch (error) {
        console.error('无法连接到服务器:', error);
        errorDiv.textContent = translations[currentLanguage]['connecting-error']; // Use translation
        errorDiv.classList.remove('hidden');
    }
}

function handleLogout() { sessionStorage.removeItem('loggedIn'); updateUIForLoginState(); }

function openLoginModal() {
    const modal = document.getElementById('login-modal-container');
    modal.style.display = 'flex';
    requestAnimationFrame(() => { modal.classList.add('visible'); });
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal-container');
    modal.classList.remove('visible');
    setTimeout(() => { if (!modal.classList.contains('visible')) { modal.style.display = 'none'; } }, 300);
}

function updateUIForLoginState() {
    const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
    const authButtonContainer = document.getElementById('auth-button-container');
    const lactateBtn = document.getElementById('analyze-lactate-btn');
    const cssBtn = document.getElementById('calculate-css-btn');
    const groupBtn = document.getElementById('analyze-group-btn');
    const buttonsToUpdate = [lactateBtn, cssBtn, groupBtn];
    if (isLoggedIn) {
        authButtonContainer.innerHTML = `<button onclick="handleLogout()" class="px-4 py-2 text-sm text-gray-600 bg-white/50 rounded-lg hover:bg-white transition-colors" data-lang-key="logout-button">${translations[currentLanguage]['logout-button']}</button>`;
        buttonsToUpdate.forEach(btn => {
            if (btn) {
                btn.disabled = false;
                const icon = btn.querySelector('.btn-icon');
                if (icon) {
                    icon.innerHTML = `<svg class="h-5 w-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zm0 2a3 3 0 00-3 3v2h6V7a3 3 0 00-3-3z" /></svg>`;
                    icon.classList.remove('hidden');
                }
            }
        });
    } else {
        authButtonContainer.innerHTML = `<button onclick="openLoginModal()" class="px-4 py-2 text-sm font-semibold text-white bg-[var(--primary-color)] rounded-lg hover:bg-[var(--primary-color-dark)] transition-colors" data-lang-key="login-required-button">${translations[currentLanguage]['login-required-button']}</button>`;
        buttonsToUpdate.forEach(btn => {
            if (btn) {
                btn.disabled = true;
                const icon = btn.querySelector('.btn-icon');
                if (icon) {
                    icon.innerHTML = `<svg class="h-5 w-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" /></svg>`;
                    icon.classList.remove('hidden');
                }
            }
        });
    }
}

// --- Global State ---
let lastLactateMetrics = null;
let lastCssPace = null;
let chartInstances = {};
let globalGroupData = {};
let globalGroupSummaryData = [];
let globalIndividualData = [];

// --- Background Caustics Animation ---
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
let time = 0;
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
function renderCaustics() { if (!canvas.getContext) return; time += 0.01; const width = canvas.width; const height = canvas.height; if (width === 0 || height === 0) { requestAnimationFrame(renderCaustics); return; } ctx.fillStyle = getCssVariable('--background-color'); ctx.fillRect(0, 0, width, height); ctx.save(); ctx.filter = 'blur(40px)'; for (let i = 0; i < 20; i++) { ctx.beginPath(); const x = Math.sin(time * 0.5 + i * 0.5) * width * 0.4 + width / 2; const y = Math.cos(time * 0.3 + i * 0.7) * height * 0.4 + height / 2; const radius = Math.sin(time + i) * 50 + 150; const grd = ctx.createRadialGradient(x, y, radius / 2, x, y, radius); grd.addColorStop(0, 'rgba(0, 128, 128, 0.1)'); grd.addColorStop(1, 'rgba(0, 128, 128, 0)'); ctx.fillStyle = grd; ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill(); } ctx.restore(); requestAnimationFrame(renderCaustics); }

// --- UI Logic ---
let lactateRowCount = 0;
function createRipple(event) { if (!event) return; const button = event.currentTarget; if (!button) return; const circle = document.createElement("span"); const diameter = Math.max(button.clientWidth, button.clientHeight); const radius = diameter / 2; circle.style.width = circle.style.height = `${diameter}px`; const rect = button.getBoundingClientRect(); circle.style.left = `${event.clientX - rect.left - radius}px`; circle.style.top = `${event.clientY - rect.top - radius}px`; circle.classList.add("ripple"); const ripple = button.getElementsByClassName("ripple")[0]; if (ripple) ripple.remove(); button.appendChild(circle); }
function switchTab(tabName) { document.getElementById('content-lactate').style.display = tabName === 'lactate' ? 'block' : 'none'; document.getElementById('content-css').style.display = tabName === 'css' ? 'block' : 'none'; document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active')); document.getElementById(`tab-${tabName}`).classList.add('active'); }
function formatTime(totalSeconds) { if (isNaN(totalSeconds) || totalSeconds < 0 || !isFinite(totalSeconds)) return 'N/A'; const minutes = Math.floor(totalSeconds / 60); const seconds = totalSeconds % 60; return `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`; }
function paceToSeconds(min, sec) { return (parseFloat(min) || 0) * 60 + (parseFloat(sec) || 0); }
function paceToSpeed(paceSeconds) { return paceSeconds > 0 ? 100 / paceSeconds : 0; }
function speedToPace(speed) { return speed > 0 ? 100 / speed : 0; }
function calculatePaceSuggestions() { const minInput = document.getElementById('pb200m_min').value; const secInput = document.getElementById('pb200m_sec').value; const pb200_seconds = paceToSeconds(minInput, secInput); const resultsDiv = document.getElementById('pace-suggestions-results'); if (pb200_seconds === 0) { resultsDiv.classList.add('hidden'); return; } const pace_100_percent = pb200_seconds / 2; const percentages = [80, 85, 90, 95, 100, 105]; const tableBody = document.getElementById('pace-suggestions-table'); tableBody.innerHTML = ''; percentages.forEach((p, index) => { const target_pace_100m = pace_100_percent / (p / 100); tableBody.innerHTML += `<tr class="border-b border-gray-200/50 last:border-b-0 hover:bg-gray-50/50"><td class="px-4 py-3 text-sm font-medium text-gray-900">${index + 1}</td><td class="px-4 py-3 text-sm text-gray-500">${p}%</td><td class="px-4 py-3 text-sm text-gray-500 font-mono">${formatTime(target_pace_100m)}</td><td class="px-4 py-3 text-sm text-gray-500 font-mono">${formatTime(target_pace_100m * 2)}</td></tr>`; }); resultsDiv.classList.remove('hidden'); }
function addLactateRow() { lactateRowCount++; const div = document.createElement('div'); div.className = 'grid grid-cols-10 gap-x-4 items-center'; div.id = `lactate-row-${lactateRowCount}`; let rpeOptions = ''; const rpeMap = { 6: "6 - No exertion / 无费力", 7: "7 - Extremely light / 极其轻松", 9: "9 - Very light / 非常轻松", 11: "11 - Light / 轻松", 13: "13 - Somewhat hard / 有点吃力", 15: "15 - Hard / 吃力", 17: "17 - Very hard / 非常吃力", 19: "19 - Extremely hard / 极其吃力", 20: "20 - Maximal / 力竭" }; for (let i = 6; i <= 20; i++) { rpeOptions += `<option value="${i}">${rpeMap[i] || i}</option>`; } div.innerHTML = `<div class="col-span-1 flex items-center"><span class="text-gray-500 font-semibold">${lactateRowCount}.</span></div><div class="col-span-2 flex space-x-2"><input type="number" class="form-input w-full p-2" placeholder="${translations[currentLanguage]['pace-sugg-min']}"><input type="number" step="0.01" class="form-input w-full p-2" placeholder="${translations[currentLanguage]['pace-sugg-sec']}"></div><div class="col-span-2"><input type="number" step="0.1" class="form-input w-full p-2" placeholder="mmol/L"></div><div class="col-span-2"><input type="number" class="form-input w-full p-2" placeholder="bpm"></div><div class="col-span-2"><select class="form-select w-full p-2">${rpeOptions}</select></div><div class="col-span-1 text-right"><button onclick="removeLactateRow(${lactateRowCount})" class="text-red-500 hover:text-red-700 p-1 rounded-full text-2xl leading-none">&times;</button></div>`; document.getElementById('lactate-input-rows').appendChild(div); }
function removeLactateRow(id) { document.getElementById(`lactate-row-${id}`).remove(); }
function toggleCollapse(headerElement, contentId) { const content = document.getElementById(contentId); const arrow = headerElement.querySelector('.arrow'); if (content.classList.contains('expanded')) { content.classList.remove('expanded'); arrow.classList.remove('expanded'); } else { content.classList.add('expanded'); arrow.classList.add('expanded'); } }

// ==== Refactored setButtonLoading Function ====
function setButtonLoading(button, isLoading, originalTextKey) {
    const spinner = button.querySelector('.btn-spinner');
    const text = button.querySelector('.btn-text');
    const icon = button.querySelector('.btn-icon');
    if (isLoading) {
        button.disabled = true;
        if (text) text.textContent = translations[currentLanguage]['analyzing-text']; // Use translation
        if (spinner) spinner.classList.remove('hidden');
        if (icon) icon.classList.add('hidden');
    } else {
        button.disabled = false;
        if (text && translations[currentLanguage][originalTextKey]) text.textContent = translations[currentLanguage][originalTextKey];
        if (spinner) spinner.classList.add('hidden');
        if (icon) icon.classList.remove('hidden');
    }
}


// --- NEW PURE RENDERING FUNCTIONS ---
function renderZonesTable(zones, containerId) {
    const t = translations[currentLanguage];
    const container = document.getElementById(containerId);
    if (!container || !zones || zones.length === 0) { if (container) container.innerHTML = ""; return; }
    let zonesTableHTML = '';
    zones.forEach(zone => {
        zonesTableHTML += `<tr class="hover:bg-gray-50/50 border-b border-gray-200/50 last:border-b-0">
            <td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center"><div class="flex-shrink-0 h-4 w-4 rounded-full ${zone.color}"></div><div class="ml-4"><div class="text-sm font-medium text-gray-900">${t[zone.nameKey]}</div></div></div></td>
            <td class="px-6 py-4 text-sm text-gray-500">${zone.purpose}</td>
            <td class="px-6 py-4 text-sm text-gray-500 font-mono">${zone.pace}</td>
        </tr>`;
    });
    const fullHtml = `
        <div class="card-pop-in">
            <h3 class="text-2xl font-bold text-gray-800 tracking-tight">${t['lactate-zones-title']}</h3>
            <p class="text-gray-600 mt-2 mb-6">${t['lactate-zones-subtitle']}</p>
            <div><table class="min-w-full">
                <thead><tr class="border-b-2 border-[var(--primary-color)] border-opacity-20">
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-500">${t['css-results-th1']}</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-500">${t['css-results-th2']}</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-500">${t['css-results-th3']}</th>
                </tr></thead>
                <tbody>${zonesTableHTML}</tbody>
            </table></div>
        </div>`;
    container.innerHTML = fullHtml;
}

function renderTrainingRecommendations(recommendations, containerId) {
    const t = translations[currentLanguage];
    const container = document.getElementById(containerId);
    if (!container || !recommendations || recommendations.length === 0) { if (container) container.innerHTML = ""; return; }
    const trainingTypes = [ { color: '--accent-green' }, { color: '--accent-red' }, { color: '--primary-color' }, { color: '--accent-orange' } ];
    let recommendationsContent = recommendations.map((reco, index) => `
        <div class="p-6 rounded-2xl border-l-4" style="border-color: ${getCssVariable(trainingTypes[index].color)}">
            <h4 class="text-xl font-bold text-gray-800">${t[reco.typeKey]}</h4>
            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div><strong class="text-gray-500">${t['reco-goal']}:</strong><p class="text-gray-700">${t[reco.goalKey]}</p></div>
                <div><strong class="text-gray-500">${t['reco-zones']}:</strong><p class="font-mono text-teal-700 font-semibold">${reco.mappedZones}</p></div>
            </div>
            <div class="mt-4">
                <strong class="text-gray-500 text-sm">${t['reco-sample-set']}:</strong>
                <p class="text-gray-700 text-sm p-3 bg-gray-50/80 rounded-lg mt-1">${t[reco.sampleKey]}</p>
            </div>
        </div>
    `).join('');
    const fullHtml = `
        <div class="flex items-center gap-4 mb-6">
            <div class="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <div>
                <h2 class="text-3xl font-bold text-gray-800 tracking-tight">${t['reco-title']}</h2>
                <p class="text-gray-600 mt-1">${t['reco-subtitle']}</p>
            </div>
        </div>
        <div class="space-y-6 mt-8">${recommendationsContent}</div>`;
    container.innerHTML = fullHtml;
}

// --- MAIN API CALL FUNCTIONS ---
async function calculateCSS(event) {
    createRipple(event);
    const button = event.currentTarget;
    setButtonLoading(button, true, 'css-calculate-button');
    const resultsContainer = document.getElementById('css-results-container');
    try {
        const t400_min = document.getElementById('t400m_min').value;
        const t400_sec = document.getElementById('t400m_sec').value;
        const t200_min = document.getElementById('t200m_min').value;
        const t200_sec = document.getElementById('t200m_sec').value;

        const response = await fetch('http://localhost:3000/api/analyze/css', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ t400_min, t400_sec, t200_min, t200_sec })
        });
        const result = await response.json();
        if (!response.ok) { throw new Error(result.message || translations[currentLanguage]['css-error-time']); }

        const { cssPace, cssZones, trainingRecommendations } = result;
        lastCssPace = cssPace;
        
        const recoContainerId = 'reco-css';
        const zonesContainerId = 'zones-css';
        
        resultsContainer.innerHTML = `
            <div class="card card-pop-in">
                <div class="card-content p-8 md:p-10 relative">
                    <h2 class="text-3xl font-bold mb-6 text-gray-800 tracking-tight">${translations[currentLanguage]['css-results-title']}</h2>
                    <div class="mb-8 text-center">
                        <p class="text-lg text-gray-600">${translations[currentLanguage]['css-results-pace-label']}</p>
                        <p class="text-6xl font-bold text-[var(--primary-color)] mt-1 tracking-tight">${cssPace}</p>
                    </div>
                    <div id="${zonesContainerId}"></div>
                </div>
            </div>
            <div class="card mt-12"><div class="card-content p-8 md:p-10" id="${recoContainerId}"></div></div>
        `;
        
        renderZonesTable(cssZones, zonesContainerId);
        renderTrainingRecommendations(trainingRecommendations, recoContainerId);
        
        resultsContainer.classList.remove('hidden');
        resultsContainer.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        resultsContainer.innerHTML = `<div class="card p-8 card-pop-in"><p class="text-red-500">${error.message}</p></div>`;
        resultsContainer.classList.remove('hidden');
    } finally {
        setButtonLoading(button, false, 'css-calculate-button');
    }
}

async function analyzeLactate(event) {
    const button = event.currentTarget;
    setButtonLoading(button, true, 'individual-generate-button');
    const resultsContainer = document.getElementById('lactate-results-container');
    resultsContainer.innerHTML = `<div class="flex justify-center items-center py-20"><div class="loader"></div></div>`;
    resultsContainer.classList.remove('hidden');

    try {
        const athleteLevel = document.getElementById('individual-athlete-level').value;
        const eventSpecialty = document.getElementById('individual-event-specialty').value;
        let collectedData = [];
        const baselineLactate = parseFloat(document.getElementById('baseline-lactate').value);
        if (!isNaN(baselineLactate)) { collectedData.push({ pace: 999, lactate: baselineLactate, speed: paceToSpeed(999), hr: null, rpe: null, isBaseline: true }); }
        const rows = document.getElementById('lactate-input-rows').children;
        for (let row of rows) {
            const inputs = row.querySelectorAll('input, select');
            const paceMin = inputs[0].value; const paceSec = inputs[1].value; const lactate = parseFloat(inputs[2].value); const hr = parseInt(inputs[3].value); const rpe = parseInt(inputs[4].value);
            if (paceMin && paceSec && !isNaN(lactate)) { const totalPaceSeconds = paceToSeconds(paceMin, paceSec); collectedData.push({ pace: totalPaceSeconds / 2, lactate: lactate, speed: paceToSpeed(totalPaceSeconds / 2), hr: isNaN(hr) ? null : hr, rpe: isNaN(rpe) ? null : rpe, isBaseline: false }); }
        }
        collectedData.sort((a, b) => a.speed - b.speed);
        globalIndividualData = collectedData;
        
        const peakLactate = parseFloat(document.getElementById('peak-lactate').value);
        const recoveryLactate = parseFloat(document.getElementById('recovery-lactate').value);
        const recoveryDuration = parseFloat(document.getElementById('recovery-duration').value);
        const reportId = 'individual-report';
        const mlssMethodElement = document.querySelector(`#mlss-method-fieldset-${reportId} input[name="mlss-method-${reportId}"]:checked`);
        const mlssMethod = mlssMethodElement ? mlssMethodElement.value : 'mod_dmax';

        const requestBody = { data: collectedData, peakLactate, recoveryLactate, recoveryDuration, mlssMethod };
        const response = await fetch('http://localhost:3000/api/analyze/lactate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) { const errorResult = await response.json(); throw new Error(errorResult.message || '后端分析失败'); }
        
        const { metrics, lactateZones, trainingRecommendations, params } = await response.json();
        const metricsForDisplay = { ...metrics, fittedCurve: (speed) => (speed <= params.P1 ? params.cLa_rest : params.cLa_rest * Math.exp((speed - params.P1) / params.P2)) };
        lastLactateMetrics = { ...metricsForDisplay, zones: lactateZones, recommendations: trainingRecommendations };
        lastCssPace = null;
        
        const reportHTML = generateReportHTML(reportId, translations[currentLanguage]['report-title-individual'], true);
        resultsContainer.innerHTML = reportHTML;
        if (mlssMethodElement) { const newRadio = document.querySelector(`#mlss-method-fieldset-${reportId} input[value=${mlssMethod}]`); if (newRadio) newRadio.checked = true; }
        
        const restingLactate = parseFloat(document.getElementById('resting-lactate').value);
        const maxHr = parseInt(document.getElementById('max-hr').value);
        displayLactateResults(reportId, collectedData.filter(d => !d.isBaseline), restingLactate, metricsForDisplay, maxHr, mlssMethod, athleteLevel, eventSpecialty, lactateZones, trainingRecommendations);
        
    } catch (error) {
        console.error("分析失败:", error);
        resultsContainer.innerHTML = `<div class="card p-8 card-pop-in"><p class="text-red-500">${translations[currentLanguage]['report-error']}${error.message}</p></div>`;
    } finally {
        setButtonLoading(button, false, 'individual-generate-button');
        document.getElementById('lactate-results-container').scrollIntoView({ behavior: 'smooth' });
    }
}

async function analyzeGroupData(event) {
    const button = event.currentTarget;
    setButtonLoading(button, true, 'group-generate-button');
    const groupResultsContainer = document.getElementById('group-lactate-results-container');
    try {
        const fileInput = document.getElementById('csv-file-input');
        const file = fileInput.files[0];
        if (!file) { throw new Error(translations[currentLanguage]['alert-choose-file']); }
        groupResultsContainer.innerHTML = `<div class="flex justify-center items-center py-20"><div class="loader"></div></div>`;
        groupResultsContainer.classList.remove('hidden');
        
        const text = await file.text();
        const parsedGroupData = parseCSV(text);
        globalGroupData = parsedGroupData;
        if (Object.keys(parsedGroupData).length === 0) { throw new Error(translations[currentLanguage]['alert-parse-error']); }
        
        const response = await fetch('http://localhost:3000/api/analyze/group', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ groupData: parsedGroupData })
        });
        if (!response.ok) { const errorResult = await response.json(); throw new Error(errorResult.message || '后端团队分析失败'); }
        
        const groupResultsFromServer = await response.json();
        globalGroupSummaryData = [];
        for (const athleteName in groupResultsFromServer) {
            globalGroupSummaryData.push({ name: athleteName, ...groupResultsFromServer[athleteName] });
        }
        
        const summaryHTML = generateGroupSummaryHTML(globalGroupSummaryData);
        groupResultsContainer.innerHTML = summaryHTML;
        
        rerenderGroupReportsAfterLanguageSwitch();
    } catch (error) {
        console.error("Group analysis failed:", error);
        groupResultsContainer.innerHTML = `<div class="card p-8 card-pop-in"><p class="text-red-500">${translations[currentLanguage]['report-error']}${error.message}</p></div>`;
    } finally {
        setButtonLoading(button, false, 'group-generate-button');
        if (document.getElementById('group-lactate-results-container')) {
            document.getElementById('group-lactate-results-container').scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function rerenderGroupReports() {
    const athleteLevel = document.getElementById('group-athlete-level').value;
    const eventSpecialty = document.getElementById('group-event-specialty').value;
    const athleteKeys = Object.keys(globalGroupData);
    updateRadarChartFromSelection();
    athleteKeys.forEach((athleteName, index) => {
        const reportId = `report-group-${index}`;
        const athleteSummary = globalGroupSummaryData.find(d => d.name === athleteName);
        if (athleteSummary) {
            updateSingleAnalysis(reportId, athleteName, athleteLevel, eventSpecialty, athleteSummary);
        }
    });
}

function updateSingleAnalysis(reportId, athleteName, athleteLevel, eventSpecialty, summaryData) {
    const athleteData = globalGroupData[athleteName];
    if (!athleteData) { console.error('Data for athlete not found:', athleteName); return; }
    const { metrics, lactateZones, trainingRecommendations, params } = summaryData;
    const metricsForDisplay = { ...metrics, fittedCurve: (speed) => (speed <= params.P1 ? params.cLa_rest : params.cLa_rest * Math.exp((speed - params.P1) / params.P2)) };
    displayLactateResults(reportId, athleteData.filter(d => !d.isBaseline), NaN, metricsForDisplay, NaN, 'mod_dmax', athleteLevel, eventSpecialty, lactateZones, trainingRecommendations);
}

function parseCSV(text) {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].trim().split(',').map(h => h.trim());
    const requiredHeaders = ['Name', 'Pace_Min', 'Pace_Sec', 'Lactate'];
    if (!requiredHeaders.every(h => headers.includes(h))) { console.error("CSV headers are missing required columns."); return {}; }
    const data = {};
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].trim().split(',');
        if (values.length < headers.length) continue;
        const row = headers.reduce((obj, header, index) => { obj[header] = values[index]; return obj; }, {});
        const name = row.Name; if (!name) continue; if (!data[name]) data[name] = [];
        const paceMin = row.Pace_Min; const paceSec = row.Pace_Sec; const lactate = parseFloat(row.Lactate); const hr = parseInt(row.HR); const rpe = parseInt(row.RPE);
        if (paceMin && paceSec && !isNaN(lactate)) { const totalPaceSeconds = paceToSeconds(paceMin, paceSec); data[name].push({ pace: totalPaceSeconds / 2, lactate: lactate, speed: paceToSpeed(totalPaceSeconds / 2), hr: isNaN(hr) ? null : hr, rpe: isNaN(rpe) ? null : rpe, isBaseline: false }); }
    }
    for (const name in data) { data[name].sort((a, b) => a.speed - b.speed); }
    return data;
}

// NOTE: This function is now only for recreating the curve for plotting purposes.
function fitNewLactateModel(data) {
    const modelFunc = (speed, cLa_rest, p1, p2) => speed <= p1 ? cLa_rest : cLa_rest * Math.exp((speed - p1) / p2);
    const calculateError = (params, data) => { let error = 0; const exponentialPhaseWeight = 2.0; const peakPointWeight = 5.0; const peakSpeed = data[data.length - 1].speed; for (const d of data) { if (d.isBaseline) continue; const squaredError = Math.pow(d.lactate - modelFunc(d.speed, params.cLa_rest, params.P1, params.P2), 2); if (d.speed === peakSpeed) { error += squaredError * peakPointWeight; } else if (d.speed > params.P1) { error += squaredError * exponentialPhaseWeight; } else { error += squaredError; } } return error; };
    const nonBaselineData = data.filter(d => !d.isBaseline); const speeds = nonBaselineData.map(d => d.speed); const lactates = nonBaselineData.map(d => d.lactate); const userBaselinePoint = data.find(d => d.isBaseline); let initialPoints = []; if (userBaselinePoint) { initialPoints.push(userBaselinePoint.lactate); } for(let i = 0; i < Math.min(3, lactates.length); i++) { initialPoints.push(lactates[i]); } const plausibleInitialPoints = initialPoints.filter(l => l < 4.0 && l > 0); let anchorLactate; if (plausibleInitialPoints.length >= 3) { const sortedPoints = [...plausibleInitialPoints].sort((a, b) => a - b); anchorLactate = sortedPoints[Math.floor(sortedPoints.length / 2)]; } else if (plausibleInitialPoints.length > 0) { anchorLactate = Math.min(...plausibleInitialPoints); } else { anchorLactate = (lactates.length > 0) ? Math.min(1.5, ...lactates) : 1.5; } const physiologicalMaxBaseline = 3.5; let cLa_rest_min = Math.max(0.5, anchorLactate * 0.85); let cLa_rest_max = Math.min(physiologicalMaxBaseline, anchorLactate * 1.15); if (cLa_rest_max < cLa_rest_min) { cLa_rest_max = cLa_rest_min + 0.5; }
    let bestFit = { cLa_rest: 0, P1: 0, P2: 0, error: Infinity }; const P1_min = Math.min(...speeds.filter(s => s > 0)); const P1_max = speeds[speeds.length - 2] || P1_min; const P2_min = 0.05; const P2_max = 2.0; const c_steps = 20, p1_steps = 25, p2_steps = 30; for (let i = 0; i <= c_steps; i++) { const cLa_rest = cLa_rest_min + i * (cLa_rest_max - cLa_rest_min) / c_steps; for (let j = 0; j <= p1_steps; j++) { const P1 = P1_min + j * (P1_max - P1_min) / p1_steps; if (P1 >= speeds[speeds.length - 1]) continue; for (let k = 0; k <= p2_steps; k++) { const P2 = P2_min + k * (P2_max - P2_min) / p2_steps; const current_error = calculateError({ cLa_rest, P1, P2 }, nonBaselineData); if (current_error < bestFit.error) { bestFit = { cLa_rest, P1, P2, error: current_error }; } } } }
    const c_range = (cLa_rest_max - cLa_rest_min) / c_steps; const p1_range = (P1_max - P1_min) / p1_steps; const p2_range = (P2_max - P2_min) / p2_steps; const fine_steps = 10; for (let i = -fine_steps; i <= fine_steps; i++) { const cLa_rest = bestFit.cLa_rest + i * (c_range / (2 * fine_steps)); for (let j = -fine_steps; j <= fine_steps; j++) { const P1 = bestFit.P1 + j * (p1_range / (2 * fine_steps)); for (let k = -fine_steps; k <= fine_steps; k++) { const P2 = bestFit.P2 + k * (p2_range / (2 * fine_steps)); if (cLa_rest < 0.3 || P1 < 0 || P2 <= 0.01) continue; const current_error = calculateError({ cLa_rest, P1, P2 }, nonBaselineData); if (current_error < bestFit.error) { bestFit = { cLa_rest, P1, P2, error: current_error }; } } } }
    const { cLa_rest, P1, P2 } = bestFit; return { params: { cLa_rest, P1, P2 } };
}

function generateReportHTML(reportId, title, includeRecommendations = true, athleteNameForEvent = null) {
    const recommendationsHTML = includeRecommendations ? `<div class="card mt-12"><div class="card-content p-8 md:p-10" id="training-recommendations-${reportId}"></div></div>` : '';
    const onchangeHandler = athleteNameForEvent ? `updateSingleAnalysisWrapper('${reportId}', '${athleteNameForEvent.replace(/'/g, "\\'")}')` : `updateIndividualAnalysisWrapper('${reportId}')`;
    return `<fieldset id="mlss-method-fieldset-${reportId}" class="mb-8 p-4 bg-gray-50/80 rounded-2xl border-none"><legend class="block text-md font-semibold text-gray-700" data-lang-key="mlss-method-legend">${translations[currentLanguage]['mlss-method-legend']}</legend><div class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 mt-3"><div class="flex items-center"><input id="mod-dmax-method-${reportId}" type="radio" name="mlss-method-${reportId}" value="mod_dmax" checked onchange="${onchangeHandler}" class="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"><label for="mod-dmax-method-${reportId}" class="ml-2 text-sm font-medium text-gray-700 cursor-pointer" data-lang-key="mlss-method-moddmax">${translations[currentLanguage]['mlss-method-moddmax']}</label><div class="info-tooltip"><i class="info-icon">i</i><span class="tooltip-text" data-lang-key="moddmax-tooltip">${translations[currentLanguage]['moddmax-tooltip']}</span></div></div><div class="flex items-center"><input id="loglog-dmax-method-${reportId}" type="radio" name="mlss-method-${reportId}" value="loglog_dmax" onchange="${onchangeHandler}" class="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"><label for="loglog-dmax-method-${reportId}" class="ml-2 text-sm font-medium text-gray-700 cursor-pointer" data-lang-key="mlss-method-loglog">${translations[currentLanguage]['mlss-method-loglog']}</label><div class="info-tooltip"><i class="info-icon">i</i><span class="tooltip-text" data-lang-key="loglog-tooltip">${translations[currentLanguage]['loglog-tooltip']}</span></div></div></div></fieldset><div id="special-note-container-${reportId}"></div><div id="results-content-${reportId}" class="space-y-12"><div class="card p-8 md:p-10 relative"><h2 class="text-3xl font-bold mb-6 text-gray-800 tracking-tight">${title}</h2><div id="lactate-error-${reportId}" class="hidden text-red-500 mb-4 p-4 bg-red-100 rounded-lg"></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-10"><div class="min-h-[350px]"><canvas id="lactateChart-${reportId}"></canvas></div><div id="threshold-results-${reportId}" class="space-y-6"></div></div><div id="lactate-zones-container-${reportId}" class="mt-12"></div><div class="space-y-10 mt-10"><div class="min-h-[300px]"><canvas id="hrChart-${reportId}"></canvas></div><div class="min-h-[300px]"><canvas id="rpeChart-${reportId}"></canvas></div></div><div class="collapsible-container"><div id="analysis-header-${reportId}" class="collapsible-header" onclick="toggleCollapse(this, 'analysis-content-${reportId}')"><span data-lang-key="analysis-title" class="text-xl font-bold">${translations[currentLanguage]['analysis-title']}</span><span class="arrow text-lg transition-transform duration-300 transform">&#x25B8;</span></div><div id="analysis-content-${reportId}" class="collapsible-content"><div class="prose prose-custom p-6"></div></div></div><div class="collapsible-container"><div id="ref-header-${reportId}" class="collapsible-header" onclick="toggleCollapse(this, 'ref-content-${reportId}')"><span data-lang-key="ref-title">${translations[currentLanguage]['ref-title']}</span><span class="arrow text-lg transition-transform duration-300 transform">&#x25B8;</span></div><div id="ref-content-${reportId}" class="collapsible-content"><div class="prose prose-custom p-6 text-sm"><p data-lang-key="ref-p1">${translations[currentLanguage]['ref-p1']}</p><p><strong data-lang-key="ref-p2">${translations[currentLanguage]['ref-p2']}</strong><br>Nolte, S., Quittmann, O. J., & Meden, V. (2022). <em>The mathematical modeling of lactate curves from graded incremental exercise tests.</em> SportRxiv.<br>Beaver, W. L., Wasserman, K., & Whipp, B. J. (1985). <em>Improved detection of lactate threshold during exercise using a log-log transformation.</em> Journal of applied physiology.<br>Zwingmann, L., et al. (2018). <em>Modifications of the Dmax method...</em> Science & Sports.</p></div></div></div></div>${recommendationsHTML}</div>`;
}

function generateCurveAnalysisHTML(metrics, athleteLevel, eventSpecialty) {
    if (!metrics || !metrics.lt1 || !metrics.mlss || !metrics.vvo2max || metrics.glycolyticIndex === null) { return `<p>${translations[currentLanguage]['analysis-nodata']}</p>`; }
    const t = translations[currentLanguage]; const { lt1, mlss, vvo2max, glycolyticIndex } = metrics; let profile = '', profileExplanation = ''; const vlt2_vvo2max_ratio = (mlss.speed / vvo2max.speed) * 100; if (isNaN(vlt2_vvo2max_ratio) || isNaN(glycolyticIndex)) { return `<p>${translations[currentLanguage]['analysis-nodata']}</p>`; }
    const thresholds = { elite: { sprint: { ratio: 87, glycolytic: 65 }, middle: { ratio: 90, glycolytic: 45 }, distance: { ratio: 92, glycolytic: 35 } }, amateur: { sprint: { ratio: 84, glycolytic: 38 }, middle: { ratio: 86, glycolytic: 32 }, distance: { ratio: 88, glycolytic: 28 } } };
    const levelThresholds = thresholds[athleteLevel]; const profiles = { endurance: { score: 0, name: t['profile-endurance'], desc: t['profile-endurance-desc'] }, anaerobic: { score: 0, name: t['profile-anaerobic'], desc: t['profile-anaerobic-desc'] }, hybrid: { score: 0, name: t['profile-hybrid'], desc: t['profile-hybrid-desc'] } };
    if (vlt2_vvo2max_ratio > levelThresholds.distance.ratio && glycolyticIndex < levelThresholds.distance.glycolytic) { profile = profiles.endurance.name; profileExplanation = profiles.endurance.desc; } else if (vlt2_vvo2max_ratio < levelThresholds.sprint.ratio && glycolyticIndex > levelThresholds.sprint.glycolytic) { profile = profiles.anaerobic.name; profileExplanation = profiles.anaerobic.desc; } else { profile = profiles.hybrid.name; profileExplanation = profiles.hybrid.desc; }
    profileExplanation = profileExplanation.replace('{vlt2_vvo2max_ratio}', vlt2_vvo2max_ratio.toFixed(1)).replace('{glycolytic_index}', glycolyticIndex.toFixed(1));
    const kpi_vlt1_pace = lt1.pace ? formatTime(lt1.pace) : 'N/A'; const kpi_vlt2_pace = mlss.pace ? formatTime(mlss.pace) : 'N/A'; const kpi_vvo2max_pace = vvo2max.pace ? formatTime(vvo2max.pace) : 'N/A';
    const tooltip = (key) => `<div class="info-tooltip"><i class="info-icon">i</i><span class="tooltip-text" data-lang-key="${key}">${t[key]}</span></div>`;
    return `<div class="space-y-8"><div><strong class="text-lg text-gray-800">${t['analysis-kpi-title']}</strong><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-center"><div class="bg-gray-100 p-3 rounded-lg"><div class="text-sm text-gray-600 flex items-center justify-center">${t['kpi-vlt1']}${tooltip('kpi-tooltip-vlt1')}</div><div class="text-xl font-bold text-gray-800 mt-1">${kpi_vlt1_pace}</div></div><div class="bg-gray-100 p-3 rounded-lg"><div class="text-sm text-gray-600 flex items-center justify-center">${t['kpi-vlt2']}${tooltip('kpi-tooltip-vlt2')}</div><div class="text-xl font-bold text-teal-600 mt-1">${kpi_vlt2_pace}</div></div><div class="bg-gray-100 p-3 rounded-lg"><div class="text-sm text-gray-600 flex items-center justify-center">${t['kpi-vvo2max']}${tooltip('kpi-tooltip-vvo2max')}</div><div class="text-xl font-bold text-gray-800 mt-1">${kpi_vvo2max_pace}</div></div><div class="bg-gray-100 p-3 rounded-lg"><div class="text-sm text-gray-600 flex items-center justify-center">${t['kpi-glycolytic-index']}${tooltip('kpi-tooltip-glycolytic-index')}</div><div class="text-xl font-bold text-gray-800 mt-1">${glycolyticIndex.toFixed(1)}</div></div></div></div><div><strong class="text-lg text-gray-800">${t['analysis-interpretation-title']}</strong><div class="mt-4 space-y-4"><div class="bg-gray-100 p-4 rounded-2xl"><h4 class="font-semibold text-gray-800">${t['interpretation-ratio-title']}</h4><p class="text-sm mt-1">${t['interpretation-ratio-desc']}</p></div><div class="bg-gray-100 p-4 rounded-2xl"><h4 class="font-semibold text-gray-800">${t['interpretation-glycolytic-title']}</h4><p class="text-sm mt-1">${t['interpretation-glycolytic-desc']}</p></div></div></div><div><strong class="text-lg text-gray-800">${t['analysis-profile-title']}</strong><p class="mt-2">${t['analysis-profile-preamble']} <strong class="text-teal-600 text-lg">${profile}</strong>.</p><p class="mt-1">${profileExplanation}</p></div><div><strong class="text-lg text-gray-800">${t['analysis-longitudinal-title']}</strong><p class="mt-2">${t['analysis-longitudinal-note']}</p></div><span class="citation">${t['analysis-citation']}</span></div>`;
}

function displayLactateResults(reportId, data, restingLactate, metrics, maxHr, mlssMethod, athleteLevel, eventSpecialty, lactateZones, trainingRecommendations) {
    const thresholdDiv = document.getElementById(`threshold-results-${reportId}`); if (!thresholdDiv) return; thresholdDiv.innerHTML = '';
    const noteContainer = document.getElementById(`special-note-container-${reportId}`); if (noteContainer) noteContainer.innerHTML = '';
    if (mlssMethod === 'loglog_dmax' && metrics.lt1 && metrics.mlss && Math.abs(metrics.lt1.speed - metrics.mlss.speed) < 0.001) { if (noteContainer) { noteContainer.innerHTML = `<div class="p-4 mb-6 bg-blue-50 border border-blue-200 rounded-2xl text-sm text-blue-800 card-pop-in"><strong class="font-semibold" data-lang-key="special-note-lt-same-title">${translations[currentLanguage]['special-note-lt-same-title']}</strong><p class="mt-1" data-lang-key="special-note-lt-same-body">${translations[currentLanguage]['special-note-lt-same-body']}</p></div>`; } }
    const createThresholdCard = (title, icon, data, description, unit, valueKey, paceKey) => { let valueDisplay = `<p class="text-gray-500 mt-2">${translations[currentLanguage]['card-no-data']}</p>`; let subMetrics = ''; if (data && (data[paceKey] || data[valueKey])) { if (paceKey && data[paceKey]) { valueDisplay = `<p class="text-4xl lg:text-5xl font-bold text-[var(--primary-color)] mt-2 tracking-tight">${formatTime(data[paceKey])}<span class="text-2xl font-semibold text-gray-500">${translations[currentLanguage]['card-unit-pace']}</span></p>`; } else if (valueKey && data[valueKey]) { valueDisplay = `<p class="text-4xl lg:text-5xl font-bold text-[var(--primary-color)] mt-2 tracking-tight">${data[valueKey].toFixed(2)}<span class="text-2xl font-semibold text-gray-500">${unit}</span></p>`; } if (data.lactate) subMetrics += `<span class="text-sm text-gray-600 mt-1 mr-4">@ ${data.lactate.toFixed(2)} mmol/L</span>`; if (data.hr && !isNaN(data.hr)) subMetrics += `<span class="text-sm text-gray-600 mt-1 mr-4">@ ${Math.round(data.hr)} bpm</span>`; if (data.rpe && !isNaN(data.rpe)) subMetrics += `<span class="text-sm text-gray-600 mt-1">RPE ${Math.round(data.rpe)}</span>`; } thresholdDiv.innerHTML += `<div class="bg-gray-50/80 p-6 rounded-2xl flex items-start space-x-4 transition-all duration-300 hover:bg-white hover:shadow-lg"><div class="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center transition-transform duration-300 transform hover:scale-110">${icon}</div><div><h3 class="font-semibold text-lg text-gray-800">${title}</h3>${valueDisplay}<div class="mt-1">${subMetrics}</div><div class="text-gray-500 mt-2 text-sm">${description}</div></div></div>`; };
    const iconLT1 = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`; const iconMLSS = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`; const iconVO2max = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>`; const iconClearance = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>`;
    let lt1Title = translations[currentLanguage]['card-lt1-title']; if (mlssMethod === 'loglog_dmax') { lt1Title += ' [Log-Log]'; } else { lt1Title += ' [ModDmax]'; }
    createThresholdCard(lt1Title, iconLT1, metrics.lt1, translations[currentLanguage]['card-lt1-desc'], translations[currentLanguage]['card-unit-pace'], null, 'pace'); createThresholdCard(translations[currentLanguage]['card-lt2-title'], iconMLSS, metrics.mlss, translations[currentLanguage]['card-lt2-desc'], translations[currentLanguage]['card-unit-pace'], null, 'pace'); createThresholdCard(translations[currentLanguage]['card-vvo2max-title'], iconVO2max, metrics.vvo2max, translations[currentLanguage]['card-vvo2max-desc'], translations[currentLanguage]['card-unit-pace'], null, 'pace'); createThresholdCard(translations[currentLanguage]['card-clearance-title'], iconClearance, metrics.clearanceRate, translations[currentLanguage]['card-clearance-desc'], translations[currentLanguage]['card-unit-clearance'], 'value', null);
    
    renderZonesTable(lactateZones, `lactate-zones-container-${reportId}`);
    renderTrainingRecommendations(trainingRecommendations, `training-recommendations-${reportId}`);

    requestAnimationFrame(() => {
        const chartData = [...data]; if (!isNaN(restingLactate)) { chartData.unshift({ speed: 0, lactate: restingLactate, hr: null, rpe: null }); }
        const createChart = (canvasId, rawData, fittedCurveFunc, xLabel, yLabel, annotations = {}, pointColorVar) => {
            if (chartInstances[canvasId]) chartInstances[canvasId].destroy();
            const chartCtx = document.getElementById(canvasId)?.getContext('2d'); if (!chartCtx) return;
            const datasets = [];
            const pointColor = getCssVariable(pointColorVar); const primaryColor = getCssVariable('--primary-color');
            if (rawData.length > 0) { datasets.push({ label: translations[currentLanguage]['chart-raw-data'], data: rawData.map(d => ({ x: d.x, y: d.y })), borderColor: pointColor, backgroundColor: pointColor, pointRadius: 5, pointHoverRadius: 7, type: 'scatter', order: 1 }); }
            if (fittedCurveFunc && rawData.length > 0) {
                const maxSpeed = Math.max(...rawData.map(d => d.x)); const curvePoints = []; for (let s = 0; s <= maxSpeed * 1.05; s += (maxSpeed) / 100) { const lactate = fittedCurveFunc(s); if (lactate !== null && !isNaN(lactate)) { curvePoints.push({ x: s, y: lactate }); } }
                if (curvePoints.length > 0) {
                    const gradient = chartCtx.createLinearGradient(0, 0, 0, 400);
                    if (primaryColor.startsWith('#')) { const r = parseInt(primaryColor.slice(1, 3), 16); const g = parseInt(primaryColor.slice(3, 5), 16); const b = parseInt(primaryColor.slice(5, 7), 16); gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.3)`); gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`); } else { gradient.addColorStop(0, `rgba(0, 128, 128, 0.3)`); gradient.addColorStop(1, `rgba(0, 128, 128, 0)`); }
                    datasets.push({ label: translations[currentLanguage]['chart-fitted-curve'], data: curvePoints, borderColor: primaryColor, borderWidth: 2.5, pointRadius: 0, type: 'line', tension: 0.4, fill: { target: 'origin', above: gradient }, order: 2 });
                }
            } else if (rawData.length > 0) { datasets[0].showLine = true; datasets[0].type = 'line'; datasets[0].tension = 0.4; }
            const xMin = 0;
            chartInstances[canvasId] = new Chart(chartCtx, { data: { datasets }, options: { responsive: true, maintainAspectRatio: false, animation: { duration: 1000, easing: 'easeInOutQuart' }, plugins: { title: { display: false }, legend: { display: true, position: 'bottom', labels: { usePointStyle: true } }, annotation: { annotations: annotations }, zoom: { pan: { enabled: true, mode: 'xy' }, zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'xy' } } }, scales: { x: { title: { display: true, text: xLabel, font: { size: 14 } }, grid: { color: 'rgba(0,0,0,0.05)' }, min: xMin }, y: { title: { display: true, text: yLabel, font: { size: 14 } }, beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } } } } });
        };
        
        const annotations = {};
        if (metrics.lt1) annotations.lt1Line = { type: 'line', xMin: metrics.lt1.speed, xMax: metrics.lt1.speed, borderColor: getCssVariable('--accent-orange'), borderWidth: 2, borderDash: [6, 6], label: { content: `LT1`, enabled: true, position: 'start', backgroundColor: 'rgba(221, 107, 32, 0.8)' } };
        if (metrics.mlss) annotations.mlssLine = { type: 'line', xMin: metrics.mlss.speed, xMax: metrics.mlss.speed, borderColor: getCssVariable('--accent-red'), borderWidth: 2, borderDash: [6, 6], label: { content: `LT2`, enabled: true, position: 'end', backgroundColor: 'rgba(197, 48, 48, 0.8)' } };
        if (metrics.vvo2max) annotations.vvo2maxLine = { type: 'line', xMin: metrics.vvo2max.speed, xMax: metrics.vvo2max.speed, borderColor: getCssVariable('--accent-green'), borderWidth: 2, borderDash: [6, 6], label: { content: `vVO2max`, enabled: true, position: 'end', yAdjust: -20, backgroundColor: 'rgba(47, 133, 90, 0.8)' } };

        const lactateRawData = chartData.map(d => ({ x: d.speed, y: d.lactate }));
        createChart(`lactateChart-${reportId}`, lactateRawData, metrics.fittedCurve, translations[currentLanguage]['chart-xlabel'], translations[currentLanguage]['chart-ylabel-lactate'], annotations, '--primary-color-dark');
        const hrRawData = data.filter(d => d.hr).map(d => ({ x: d.speed, y: d.hr }));
        createChart(`hrChart-${reportId}`, hrRawData, null, translations[currentLanguage]['chart-xlabel'], translations[currentLanguage]['chart-ylabel-hr'], {}, '--accent-red');
        const rpeRawData = data.filter(d => d.rpe).map(d => ({ x: d.speed, y: d.rpe }));
        createChart(`rpeChart-${reportId}`, rpeRawData, null, translations[currentLanguage]['chart-xlabel'], translations[currentLanguage]['chart-ylabel-rpe'], {}, '--accent-orange');
    });
    const analysisHTML = generateCurveAnalysisHTML(metrics, athleteLevel, eventSpecialty);
    const analysisContainer = document.querySelector(`#analysis-content-${reportId} .prose`);
    if (analysisContainer) { analysisContainer.innerHTML = analysisHTML; }
}

function generateGroupSummaryHTML(summaryData) {
    const t = translations[currentLanguage]; let tableRows = ''; let checkboxHTML = '';
    const tooltip = (key) => `<div class="info-tooltip"><i class="info-icon">i</i><span class="tooltip-text" data-lang-key="${key}">${t[key]}</span></div>`;
    const colorPalette = ['#008080', '#DD6B20', '#C53030', '#5A67D8', '#38A169', '#B7791F', '#805AD5', '#3182CE', '#D53F8C', '#2F855A'];
    summaryData.forEach((athlete, index) => {
        const { name, metrics } = athlete;
        const vlt1Pace = metrics.lt1 ? formatTime(metrics.lt1.pace) : 'N/A';
        const vlt2Pace = metrics.mlss ? formatTime(metrics.mlss.pace) : 'N/A';
        const vvo2maxPace = metrics.vvo2max ? formatTime(metrics.vvo2max.pace) : 'N/A';
        const glycolyticIndex = metrics.glycolyticIndex !== null ? metrics.glycolyticIndex.toFixed(1) : 'N/A';
        const ratio = (metrics.mlss && metrics.vvo2max && metrics.vvo2max.speed > 0) ? ((metrics.mlss.speed / metrics.vvo2max.speed) * 100).toFixed(1) + '%' : 'N/A';
        const color = colorPalette[index % colorPalette.length];
        tableRows += `<tr class="border-b border-gray-200/50 last:border-b-0 hover:bg-gray-50/50"><td class="px-4 py-3 text-sm font-semibold text-gray-900">${name}</td><td class="px-4 py-3 text-sm text-gray-500 font-mono">${vlt1Pace}</td><td class="px-4 py-3 text-sm text-teal-600 font-bold font-mono">${vlt2Pace}</td><td class="px-4 py-3 text-sm text-gray-500 font-mono">${vvo2maxPace}</td><td class="px-4 py-3 text-sm text-gray-500 font-mono">${glycolyticIndex}</td><td class="px-4 py-3 text-sm text-gray-500 font-mono">${ratio}</td></tr>`;
        checkboxHTML += `<div class="flex items-center"><input id="athlete-checkbox-${index}" type="checkbox" value="${name}" onchange="updateRadarChartFromSelection()" ${index < 5 ? 'checked' : ''} class="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"><span class="ml-2 h-3 w-3 rounded-full" style="background-color: ${color};"></span><label for="athlete-checkbox-${index}" class="ml-2 text-sm font-medium text-gray-700 cursor-pointer">${name}</label></div>`;
    });
    const radarDisclaimer = `<p class="text-xs text-gray-500 mt-4">该图提供的各项指标仅供关联性参考，并非绝对，如想得到足够精确的数据指标，需结合技术动作经济性、生理生化指标、体成分、营养摄入、训练表现、负荷管理等多元分析。</p>`;
    return `<div class="card card-pop-in mb-12"><div class="card-content p-8 md:p-10"><h2 class="text-3xl font-bold text-gray-800 tracking-tight mb-2" data-lang-key="group-summary-title">${t['group-summary-title']}</h2><p class="text-gray-600 mb-8" data-lang-key="group-summary-subtitle">${t['group-summary-subtitle']}</p><div class="grid grid-cols-1 xl:grid-cols-5 gap-8"><div class="xl:col-span-2"><h3 class="text-xl font-semibold text-gray-800 mb-2" data-lang-key="group-radar-title">${t['group-radar-title']}</h3>${radarDisclaimer}<div class="min-h-[350px] mt-2"><canvas id="group-radar-chart"></canvas></div><div class="mt-6 p-4 bg-gray-50/80 rounded-2xl"><h4 class="text-md font-semibold text-gray-700 mb-3" data-lang-key="group-radar-select-title">${t['group-radar-select-title']}</h4><div id="radar-athlete-selector" class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">${checkboxHTML}</div></div></div><div class="xl:col-span-3"><h3 class="text-xl font-semibold text-gray-800 mb-4" data-lang-key="group-table-title">${t['group-table-title']}</h3><div><table class="min-w-full"><thead ><tr class="border-b-2 border-[var(--primary-color)] border-opacity-20"><th class="px-4 py-3 text-left text-sm font-semibold text-gray-500"><div data-lang-key="group-th-name">${t['group-th-name']}</div></th><th class="px-4 py-3 text-left text-sm font-semibold text-gray-500"><div class="flex items-center" data-lang-key="group-th-vlt1">${t['group-th-vlt1']}${tooltip('kpi-tooltip-vlt1')}</div></th><th class="px-4 py-3 text-left text-sm font-semibold text-gray-500"><div class="flex items-center" data-lang-key="group-th-vlt2">${t['group-th-vlt2']}${tooltip('kpi-tooltip-mlss')}</div></th><th class="px-4 py-3 text-left text-sm font-semibold text-gray-500"><div class="flex items-center" data-lang-key="group-th-vvo2max">${t['group-th-vvo2max']}${tooltip('kpi-tooltip-vvo2max')}</div></th><th class="px-4 py-3 text-left text-sm font-semibold text-gray-500"><div class="flex items-center" data-lang-key="group-th-glycolytic">${t['group-th-glycolytic']}${tooltip('kpi-tooltip-glycolytic-index')}</div></th><th class="px-4 py-3 text-left text-sm font-semibold text-gray-500"><div class="flex items-center" data-lang-key="group-th-ratio">${t['group-th-ratio']}${tooltip('kpi-tooltip-ratio')}</div></th></tr></thead><tbody>${tableRows}</tbody></table></div></div></div></div></div><h2 class="text-3xl font-bold text-gray-800 tracking-tight mb-10" data-lang-key="group-reports-title">${t['group-reports-title']}</h2><div id="group-reports-anchor" class="space-y-16"></div>`;
}

function updateRadarChartFromSelection() {
    if (!globalGroupSummaryData || globalGroupSummaryData.length === 0) return;
    const selectedNames = Array.from(document.querySelectorAll('#radar-athlete-selector input:checked')).map(cb => cb.value);
    const selectedAthleteData = globalGroupSummaryData.filter(athlete => selectedNames.includes(athlete.name));
    createGroupRadarChart(selectedAthleteData, 'group-radar-chart');
}

function createGroupRadarChart(selectedSummaryData, canvasId) {
    const chartCtx = document.getElementById(canvasId)?.getContext('2d'); if (!chartCtx) return;
    const t = translations[currentLanguage]; const labels = [t['radar-label-vlt1'], t['radar-label-vlt2'], t['radar-label-vvo2max'], t['radar-label-ratio'], t['radar-label-glycolytic']];
    const allMetrics = { vlt1: globalGroupSummaryData.map(d => d.metrics.lt1 ? d.metrics.lt1.speed : 0), vlt2: globalGroupSummaryData.map(d => d.metrics.mlss ? d.metrics.mlss.speed : 0), vvo2max: globalGroupSummaryData.map(d => d.metrics.vvo2max ? d.metrics.vvo2max.speed : 0), ratio: globalGroupSummaryData.map(d => (d.metrics.mlss && d.metrics.vvo2max && d.metrics.vvo2max.speed > 0) ? (d.metrics.mlss.speed / d.metrics.vvo2max.speed * 100) : 0), glycolytic: globalGroupSummaryData.map(d => d.metrics.glycolyticIndex ? d.metrics.glycolyticIndex : 0) };
    const normalize = (values) => { const filteredValues = values.filter(v => v > 0); if (filteredValues.length === 0) return values.map(() => 0); const min = Math.min(...filteredValues); const max = Math.max(...filteredValues); if (max === min) return values.map(v => v > 0 ? 50 : 0); return values.map(v => v === 0 ? 0 : 10 + 90 * (v - min) / (max - min)); };
    const normalizedAllMetrics = { vlt1: normalize(allMetrics.vlt1), vlt2: normalize(allMetrics.vlt2), vvo2max: normalize(allMetrics.vvo2max), ratio: normalize(allMetrics.ratio), glycolytic: normalize(allMetrics.glycolytic) };
    const colorPalette = ['#008080', '#DD6B20', '#C53030', '#5A67D8', '#38A169', '#B7791F', '#805AD5', '#3182CE', '#D53F8C', '#2F855A'];
    const datasets = selectedSummaryData.map((athlete) => {
        const originalIndex = globalGroupSummaryData.findIndex(a => a.name === athlete.name);
        const color = colorPalette[originalIndex % colorPalette.length];
        return {
            label: athlete.name,
            data: [normalizedAllMetrics.vlt1[originalIndex], normalizedAllMetrics.vlt2[originalIndex], normalizedAllMetrics.vvo2max[originalIndex], normalizedAllMetrics.ratio[originalIndex], normalizedAllMetrics.glycolytic[originalIndex]],
            borderColor: color, backgroundColor: `rgba(${parseInt(color.substring(1, 3), 16)}, ${parseInt(color.substring(3, 5), 16)}, ${parseInt(color.substring(5, 7), 16)}, 0.2)`, borderWidth: 2, pointBackgroundColor: color, pointRadius: 4, pointHoverRadius: 6
        };
    });
    if (chartInstances[canvasId]) { chartInstances[canvasId].destroy(); }
    chartInstances[canvasId] = new Chart(chartCtx, { type: 'radar', data: { labels, datasets }, options: { responsive: true, maintainAspectRatio: false, scales: { r: { angleLines: { color: 'rgba(0,0,0,0.1)' }, grid: { color: 'rgba(0,0,0,0.1)' }, pointLabels: { font: { size: 13, weight: '600' }, callback: function(label) { if (/\(/.test(label)) { return label.split('(').map(l => l.replace(')', '')); } return label; } }, ticks: { display: false, stepSize: 25 }, min: 0, max: 100 } }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(context) { const athleteName = context.dataset.label; const originalIndex = globalGroupSummaryData.findIndex(a => a.name === athleteName); const metricKey = Object.keys(allMetrics)[context.dataIndex]; const originalValue = allMetrics[metricKey][originalIndex]; let formattedValue = 'N/A'; if (originalValue > 0) { if (metricKey === 'glycolytic') { formattedValue = originalValue.toFixed(1); } else if (metricKey === 'ratio') { formattedValue = originalValue.toFixed(1) + '%'; } else { formattedValue = formatTime(speedToPace(originalValue)) + '/100m'; } } return `${athleteName}: ${formattedValue}`; } } } } } });
}

function updateIndividualAnalysisWrapper(reportId) { document.getElementById('analyze-lactate-btn').click(); }

async function updateSingleAnalysisWrapper(reportId, athleteName) {
    const reportContent = document.getElementById(`results-content-${reportId}`);
    const errorContainer = document.getElementById(`lactate-error-${reportId}`);
    if (!reportContent) return;
    reportContent.style.opacity = '0.5';
    if(errorContainer) errorContainer.classList.add('hidden');
    try {
        const athleteData = globalGroupData[athleteName];
        if (!athleteData) { throw new Error("未能找到该运动员的原始数据。"); }
        const newMlssMethod = document.querySelector(`#mlss-method-fieldset-${reportId} input[name="mlss-method-${reportId}"]:checked`).value;
        const athleteLevel = document.getElementById('group-athlete-level').value;
        const eventSpecialty = document.getElementById('group-event-specialty').value;
        const requestBody = { data: athleteData, mlssMethod: newMlssMethod };
        const response = await fetch('http://localhost:3000/api/analyze/lactate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) { const errorResult = await response.json(); throw new Error(errorResult.message || '后端分析失败'); }
        const { metrics, lactateZones, trainingRecommendations, params } = await response.json();
        const summaryData = { metrics, lactateZones, trainingRecommendations, params };
        updateSingleAnalysis(reportId, athleteName, athleteLevel, eventSpecialty, summaryData);
    } catch (error) {
        console.error(`为 ${athleteName} 更新分析时出错:`, error);
        if(errorContainer) {
            errorContainer.textContent = error.message;
            errorContainer.classList.remove('hidden');
        }
    } finally {
        reportContent.style.opacity = '1';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'zh';
    switchLanguage(preferredLanguage);
    resizeCanvas();
    renderCaustics();
    window.addEventListener('resize', resizeCanvas);
    for (let i = 0; i < 5; i++) addLactateRow();
    switchTab('lactate');
    document.getElementById('content-css').style.display = 'none';

    // ==== Logic for Terms Agreement Checkbox ====

    const agreeCheckbox = document.getElementById('agree-checkbox');
    const loginButton = document.getElementById('login-button');

    agreeCheckbox.addEventListener('change', () => {
        loginButton.disabled = !agreeCheckbox.checked;
    });

    const originalHandleLogin = handleLogin;
    window.handleLogin = async (event) => {
        if (!agreeCheckbox.checked) {
            const errorDiv = document.getElementById('login-error');
            errorDiv.textContent = translations[currentLanguage]['agree-terms-error']; // Use translation
            errorDiv.classList.remove('hidden');
            return;
        }
        await originalHandleLogin(event);
    };
    
    // Bind all event listeners
    document.getElementById('login-button').addEventListener('click', (event) => window.handleLogin(event));
    document.getElementById('login-modal-container').addEventListener('click', (event) => { if (event.target === event.currentTarget) { closeLoginModal(); } });
    document.getElementById('calculate-pace-btn').addEventListener('click', (e) => { createRipple(e); calculatePaceSuggestions(); });
    document.getElementById('calculate-css-btn').addEventListener('click', calculateCSS);
    document.getElementById('analyze-lactate-btn').addEventListener('click', analyzeLactate);
    document.getElementById('analyze-group-btn').addEventListener('click', analyzeGroupData);
    const fileInput = document.getElementById('csv-file-input');
    const fileNameDisplay = document.getElementById('file-name-display');
    fileInput.addEventListener('change', (event) => {
        if (event.target.files.length > 0) { fileNameDisplay.textContent = event.target.files[0].name; }
        else { fileNameDisplay.textContent = translations[currentLanguage]['group-no-file']; }
    });
});