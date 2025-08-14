// --- i18n Translation ---
const translations = {
    en: {
        'app-title': 'Swimming Test-hub', 'app-subtitle': 'An elite physiological profiling tool for swimmers, based on scientific literature.', 'login-title': 'Welcome Back', 'login-subtitle': 'Please sign in to access the Test-hub.', 'login-username': 'Username', 'login-username-placeholder': 'e.g., LINCHONGXIAO', 'login-password': 'Password', 'login-error': 'Invalid username or password.', 'login-button': 'Sign In', 'logout-button': 'Logout', 'login-required-button': 'Log In', 'tab-lactate': 'Lactate Step Test', 'tab-css': 'Critical Swim Speed', 'protocol-title': 'Lactate Step Test Protocol', 'protocol-p1': 'The Lactate Step Test is a classic endurance assessment method designed to determine an athlete\'s physiological responses at various exercise intensities, particularly the inflection points of blood lactate concentration. These points are crucial for accurately defining training zones.', 'protocol-subtitle': 'Standardized Test Protocol (e.g., 5-7 x 200m):', 'protocol-li1': '<strong>Preparation:</strong> Pool, stopwatch, calibrated portable lactate analyzer. Avoid high-intensity training 24 hours prior to the test.', 'protocol-li2': '<strong>Warm-up:</strong> Perform a 10-15 minute low-intensity aerobic warm-up.', 'protocol-li3': '<strong>Incremental Loading:</strong> Perform 5-7 sets of 200m swims with 60 seconds rest for blood sampling between sets. The intensity should increase incrementally until exhaustion.', 'protocol-li3-reco': '<br><strong>(Recommended)</strong> Use the "Personalized Pace Suggestion" tool below to generate a standard incremental pace plan based on your 200m personal best.', 'protocol-li4': '<strong>Active Recovery (Optional):</strong> After the final exhaustive set, perform 10-15 minutes of very low-intensity active recovery. Measure blood lactate before and after to calculate lactate clearance rate.', 'protocol-citation': 'Protocol adapted from: Olbrecht, J. (2013). *The Science of Winning*.',
        'pace-sugg-title': 'Personalized Pace Suggestion', 'pace-sugg-subtitle': 'Setting incremental loads based on personal bests is a more scientific approach. Enter your recent 200m PB to generate a standard test pacing plan.', 'pace-sugg-label': '200m Personal Best', 'pace-sugg-min': 'min', 'pace-sugg-sec': 'sec', 'pace-sugg-button': 'Calculate Paces', 'pace-sugg-results-title': 'Suggested 200m Test Pacing Plan', 'pace-sugg-th1': 'Step', 'pace-sugg-th2': 'Intensity', 'pace-sugg-th3': 'Target 100m Pace', 'pace-sugg-th4': 'Target 200m Time', 'group-title': 'Group Data Import', 'group-subtitle': 'Upload a CSV file with your team\'s data to generate a group report. The file should have columns: `Name`, `Pace_Min`, `Pace_Sec`, `Lactate`, `HR`, `RPE`.', 'group-guide-title': 'CSV File Format Guide:', 'group-guide-li1': 'The first row must be the header, including: code>Name,Pace_Min,Pace_Sec,Lactate,HR,RPE</code>.', 'group-guide-li2': '<code>Name</code>: Athlete\'s name.', 'group-guide-li3': '<code>Pace_Min</code>, <code>Pace_Sec</code>: Minutes and seconds for each 200m split.', 'group-guide-li4': '<code>Lactate</code>: Blood lactate value for that split (mmol/L).', 'group-guide-li5': '<code>HR</code>: Heart rate (bpm). (Optional)', 'group-guide-li6': '<code>RPE</code>: Rating of Perceived Exer-tion (6-20). (Optional)', 'group-guide-li7': 'Each athlete\'s data should be in consecutive rows.', 'group-template-link': 'Download CSV Template',
        'group-choose-file': 'Choose File', 'group-no-file': 'No file chosen', 'group-generate-button': 'Generate Group Report', 'individual-title': 'Individual Data Input', 'individual-resting-label': 'Resting Lactate (Optional)', 'individual-resting-placeholder': 'Pre-test (e.g., 1.2)', 'individual-baseline-label': 'Baseline Lactate', 'individual-baseline-tooltip': '<b>Strongly recommended.</b> This is the lactate value after warm-up, before the incremental loading (or from the first very low-intensity step). It is crucial for the new model to accurately determine the lactate plateau.', 'individual-baseline-placeholder': 'Post warm-up (e.g., 1.8)', 'individual-maxhr-label': 'Your Max Heart Rate (Max HR)', 'individual-maxhr-placeholder': 'e.g., 195 bpm', 'individual-stage1-title': '1. Incremental Loading Stage', 'individual-th-pace': 'Pace / 200m', 'individual-th-lactate': 'Lactate', 'individual-th-hr': 'Heart Rate', 'individual-th-rpe': 'RPE', 'individual-add-row': '+ Add Row', 'individual-stage2-title': '2. Active Recovery Stage (Optional)', 'individual-peak-label': 'Peak Lactate (mmol/L)', 'individual-peak-placeholder': '3-5 min post-exhaustion',
        'individual-recovery-label': 'Post-Recovery Lactate', 'individual-recovery-placeholder': 'After active recovery', 'individual-duration-label': 'Recovery Duration (min)', 'individual-duration-placeholder': 'e.g., 10', 'individual-generate-button': 'Generate Full Report', 'css-title': 'Critical Swim Speed (CSS)', 'css-p1': '<strong>Critical Swim Speed (CSS)</strong> is conceptually defined as the highest speed a swimmer can theoretically maintain for a long time without exhaustion. Importantly, the pace calculated from a 200/400m test is significantly faster than the true anaerobic threshold (MLSS), thus it more accurately reflects the <strong>Maximal Metabolic Steady State (MMSS)</strong>.', 'css-method-title': 'Test Method:', 'css-method-p': 'The test consists of one 400m and one 200m maximal effort timed swim, with full recovery in between.', 'css-formula-title': 'Core Formula:', 'css-formula-p': 'CSS Pace (/100m) = (400m Time - 200m Time) / 2', 'css-citation': 'Model sourced from the "Scientific Swimming Training Zone Setting Guide" report.', 'css-calculator-title': 'CSS Calculator', 'css-calculator-subtitle': 'Enter your 400m and 200m all-out times to calculate your CSS and corresponding training zones.', 'css-400m-label': '400m Time',
        'css-200m-label': '200m Time', 'css-calculate-button': 'Calculate Zones', 'css-results-title': 'Your Training Zones & Recommendations', 'css-results-pace-label': 'Critical Swim Speed (CSS) Pace', 'css-results-th1': 'Zone', 'css-results-th2': 'Physiological Goal', 'css-results-th3': 'Pace Range (/100m)', 'alert-choose-file': 'Please select a CSV file first.', 'alert-parse-error': 'Could not parse CSV file. Please check the file format and content.', 'alert-min-rows': 'Please enter at least 4 valid data rows (including baseline) for analysis.', 'css-error-time': 'Input Error: 400m time must be greater than 200m time.', 'report-title-individual': 'Individual Report', 'report-title-group': "'s Report", 'group-reports-title': 'Individual Athlete Reports', 'report-error': 'Chart generation failed: ', 'report-error-console': '. Please open the console (F12) for details.', 'mlss-method-legend': 'MLSS (LT2) Calculation Method (based on Nolte-2022 model)', 'mlss-method-moddmax': 'ModDmax (Modified D-max)',
        'mlss-method-loglog': 'Log-Log Dmax', 'moddmax-tooltip': '<strong>Calculation:</strong> Based on the Nolte (2022) model to directly determine the lactate takeoff point (P1) as LT1, and then perform D-max calculation from this point.<br><strong>Recommended for:</strong> Standard lactate curves with a clear plateau and takeoff point. It is robust and consistent with the overall model fit.', 'loglog-tooltip': '<strong>Calculation:</strong> First uses a log-log transformation to more precisely locate the first lactate threshold (LT1) from the raw data, then uses this LT1 point to perform D-max calculation on the Nolte (2022) curve.<br><strong>Recommended for:</strong> Elite athletes with low overall lactate levels, or for curves where the initial plateau is ambiguous or noisy. It provides a more objective, data-driven LT1 detection.', 'ref-title': 'Methodology and References', 'ref-p1': 'The core method for threshold calculation is based on a <strong>piecewise exponential function model</strong> for curve fitting, combined with the <strong>D-max method</strong> to determine the second lactate threshold (LT2). This model is recommended by the latest scientific research for its ability to more accurately reflect the true physiological changes of lactate during incremental exercise (plateau + exponential growth), providing higher reliability and validity than traditional single exponential models.', 'ref-p2': '<strong>Key References:</strong>', 'card-lt1-title': 'Aerobic Threshold (LT1)',
        'card-lt1-desc': 'The core of low-intensity aerobic base training (Zone 2).', 'card-lt2-title': 'Anaerobic Threshold (LT2 / MLSS)', 'card-lt2-desc': 'The critical point for high-intensity training (Zone 4) to boost race performance.', 'card-vvo2max-title': 'Velocity at VO2max (vVO2max)', 'card-vvo2max-desc': 'The specific speed at which maximum oxygen uptake occurs. It is a precise training target, not the entire VO2max zone.', 'card-clearance-title': 'Max Lactate Clearance Rate', 'card-clearance-desc': 'Reflects your recovery efficiency. Higher is better.', 'card-unit-pace': '/100m', 'card-unit-clearance': 'mmol/L/min', 'card-no-data': 'Data not available', 'chart-raw-data': 'Raw Data', 'chart-fitted-curve': 'Fitted Curve (Nolte, 2022)', 'chart-xlabel': 'Velocity (m/s)', 'chart-ylabel-lactate': 'Lactate (mmol/L)', 'chart-ylabel-hr': 'Heart Rate (bpm)', 'chart-ylabel-rpe': 'RPE (Borg 6-20)', 'reco-title': 'Personalized Training Recommendations', 'reco-subtitle': 'This guide translates your test data into actionable training strategies, mapping your personalized zones to the four core training types from "The Science of Winning".',
        'reco-type-aec': 'Aerobic Capacity Training', 'reco-type-anc': 'Anaerobic Capacity Training', 'reco-type-aep': 'Aerobic Power Training', 'reco-type-anp': 'Anaerobic Power Training', 'reco-goal': 'Goal', 'reco-pace': 'Pace', 'reco-zones': 'Corresponding Zones', 'reco-goal-aec': 'Build the foundation, improve VO2max.', 'reco-goal-anc': 'Increase max glycolytic rate (VLamax).', 'reco-goal-aep': 'Improve lactate clearance and utilization efficiency.', 'reco-goal-anp': 'Enhance tolerance to high lactate concentrations.', 'reco-sample-set': 'Sample Set', 'reco-set-aec': 'Extensive low-intensity training (e.g., 3000m continuous) combined with short, high-intensity stimuli (e.g., 6x50m fast).', 'reco-set-anc': 'Short, high-intensity intervals with long, passive rest (e.g., 8x25m all-out with 2 min rest).', 'reco-set-aep': 'Long intervals with short rest (e.g., 10x200m at Threshold pace with 15s rest).', 'reco-set-anp': 'Maximal intensity intervals with very short rest (e.g., "broken swims" like 2x(4x50m) at race pace with 10s rest).', 'analysis-title': "Athlete Metabolic Profile", 'analysis-nodata': "Insufficient data to generate a detailed metabolic profile.",
        'analysis-profile-title': "Metabolic Profile Summary", 'analysis-profile-preamble': "Based on a quantitative analysis of key metabolic markers, the athlete's profile is classified as:", 'profile-endurance': "Endurance Engine", 'profile-endurance-desc': "Characterized by a high LT2/vVO2max ratio (<strong>{vlt2_vvo2max_ratio}%</strong>) and a low Glycolytic Index (<strong>{glycolytic_index}</strong>). This indicates an elite ability to sustain a high percentage of maximal aerobic power, driven by superior lactate clearance and utilization. A highly efficient metabolic engine ideal for middle to long-distance events.", 'profile-anaerobic': "Anaerobic Powerhouse", 'profile-anaerobic-desc': "Characterized by a lower LT2/vVO2max ratio (<strong>{vlt2_vvo2max_ratio}%</strong>) and a high Glycolytic Index (<strong>{glycolytic_index}</strong>). This profile suggests a dominant anaerobic system, capable of producing very high power for short durations. Performance is reliant on a high rate of glycolysis, making it ideal for sprint events.", 'profile-hybrid': "Hybrid (Balanced)", 'profile-hybrid-desc': "Characterized by a balanced LT2/vVO2max ratio (<strong>{vlt2_vvo2max_ratio}%</strong>) and a moderate Glycolytic Index (<strong>{glycolytic_index}</strong>). This profile indicates a well-developed blend of both aerobic endurance and anaerobic power, making the athlete versatile and competitive in middle-distance events (e.g., 200m/400m) that require both speed and stamina.", 'analysis-kpi-title': "Key Metabolic Markers",
        'kpi-vlt1': "Aerobic Base (vLT1)", 'kpi-vlt2': "Sustainable Speed (vLT2)", 'kpi-vvo2max': "Aerobic Power (vVO2max)", 'kpi-glycolytic-index': "Glycolytic Index (VLamax Proxy)", 'kpi-tooltip-vlt1': "The speed at the first lactate threshold. A higher vLT1 indicates a stronger aerobic foundation and better recovery capability.", 'kpi-tooltip-vlt2': "The speed at the second lactate threshold (MLSS estimate). This is a critical predictor of performance in events from 200m to 1500m.", 'kpi-tooltip-vvo2max': "The speed that elicits maximum oxygen uptake. A higher value is generally better, but it must be balanced with a high Endurance Index. An excessively high vVO2max without sufficient endurance can lead to early fatigue.", 'kpi-tooltip-glycolytic-index': "Represents the maximum rate of lactate production (Glycolytic Index). A higher value indicates stronger explosive potential but also faster fatigue. Sprinters need a high value, while distance swimmers need a lower one.", 'analysis-longitudinal-title': "Longitudinal Diagnosis & Recommendations", 'analysis-longitudinal-note': "<strong>This is a cross-sectional analysis of a single test.</strong> For the most accurate diagnosis, it is highly recommended to compare these results with historical data. For example, a 'rightward shift' of the curve typically indicates endurance improvement, while a 'leftward shift' with suppressed peak lactate could be an alarm for overtraining. A comprehensive assessment requires combining this data with specific event performance and training logs.", 'analysis-citation': "Analysis framework primarily derived from: 'Metabolic Blueprint for Swimmers: A Scientific Guide to Interpreting Blood Lactate-Intensity Curves'.",
        'athlete-level-label': 'Athlete Level', 'level-elite': 'Professional / Elite', 'level-amateur': 'Amateur / Club', 'event-specialty-label': 'Event Specialty', 'specialty-sprint': 'Sprint (50-100m)', 'specialty-middle': 'Middle Distance (200-400m)', 'specialty-distance': 'Distance (800m+)', 'special-note-lt-same-title': 'Special Note', 'special-note-lt-same-body': 'When LT1 and LT2 paces are identical, this is not an error. It indicates that, based on this dataset, lactate increased in a highly linear fashion after the first turning point (LT1), without a distinct and significant second turning point. The LT1 value comes directly from your raw data point, while the LT2 value is derived from the fitted curve, which is why lactate values may differ slightly even at the same pace.', 'group-summary-title': 'Team Cross-Comparison', 'group-summary-subtitle': 'Overview of key metabolic markers for the entire team.', 'group-radar-title': 'Athlete Profile Radar Chart', 'group-radar-select-title': 'Select Athletes to Compare', 'group-table-title': 'Core Metrics Overview', 'group-th-name': 'Athlete', 'group-th-vlt1': 'vLT1 Pace',
        'group-th-vlt2': 'vLT2 Pace', 'group-th-vvo2max': 'vVO2max Pace', 'group-th-glycolytic': 'Glycolytic Idx.', 'group-th-ratio': 'vLT2/vVO2max %', 'radar-label-vlt1': 'Aerobic Base (vLT1)', 'radar-label-vlt2': 'MLSS Threshold Speed', 'radar-label-vvo2max': 'vVO2max Pace', 'radar-label-glycolytic': 'Explosive Potential', 'radar-label-ratio': 'Endurance Index', 'kpi-tooltip-mlss': 'Also known as the Anaerobic Threshold, this is the gold standard for high-intensity endurance. A higher speed here means a greater ability to sustain high race paces.', 'kpi-tooltip-ratio': 'Measures the efficiency of converting maximal aerobic power into sustainable speed. A higher ratio indicates better endurance economy, crucial for middle and long-distance events.', 'analysis-interpretation-title': "Interpretation of Key Metrics", 'interpretation-ratio-title': "vLT2/vVO2max Ratio (Endurance Index)", 'interpretation-ratio-desc': "This is a core indicator of endurance, representing what percentage of your maximal aerobic power (vVO2max) you can convert into a sustainable cruising speed (vLT2). <strong>A higher ratio indicates better endurance</strong>, meaning you have greater 'stamina' for longer distances. Elite distance athletes typically have ratios above 90%.",
        'interpretation-glycolytic-title': "Glycolytic Index (Power Index)", 'interpretation-glycolytic-desc': "This metric measures the capacity of your anaerobic glycolytic system, representing the maximum rate at which you produce lactate during high-intensity exercise. <strong>A higher index means greater short-burst power</strong>, but it also implies faster lactate accumulation. Sprinters require a high index, while distance swimmers need a lower one to maintain steady output.", 'lactate-zones-title': 'Lactate-Based Training Zones', 'lactate-zones-subtitle': 'Based on your physiological anchor points, here are your personalized 7-level training zones:', 'zone-name-1': 'Zone 1: Recovery', 'zone-name-2': 'Zone 2: Endurance', 'zone-name-3': 'Zone 3: Tempo', 'zone-name-4': 'Zone 4: Threshold', 'zone-name-5': 'Zone 5: VO2max', 'zone-name-6': 'Zone 6: Anaerobic Tolerance', 'zone-name-7': 'Zone 7: Neuromuscular Power',
    },
    zh: {
        'app-title': 'Swimming Test-hub', 'app-subtitle': '基于前沿科学文献的精英游泳运动员生理学分析工具。', 'login-title': '欢迎回来', 'login-subtitle': '请登录以访问测试中心。', 'login-username': '用户名', 'login-username-placeholder': '例如, LINCHONGXIAO', 'login-password': '密码', 'login-error': '用户名或密码无效。', 'login-button': '登录', 'logout-button': '登出', 'login-required-button': '登录', 'tab-lactate': '乳酸分级测试', 'tab-css': '临界游泳速度', 'protocol-title': '乳酸分级测试方案', 'protocol-p1': '乳酸分级测试是经典的耐力评估方法，旨在确定运动员在不同运动强度下的生理反应，特别是血乳酸浓度的拐点。这些拐点对于精确定义训练区间至关重要。', 'protocol-subtitle': '标准化测试方案 (例如, 5-7 x 200m):', 'protocol-li1': '<strong>准备:</strong> 泳池、秒表、校准过的便携式血乳酸分析仪。测试前24小时避免高强度训练。', 'protocol-li2': '<strong>热身:</strong> 进行10-15分钟的低强度有氧热身。', 'protocol-li3': '<strong>递增负荷:</strong> 进行5-7组200米游泳，组间休息60秒采血。强度应逐级递增直至力竭。',
        'protocol-li3-reco': '<br><strong>(推荐)</strong> 使用下方的“个性化配速建议”工具，根据您的200米个人最好成绩生成标准的递增配速计划。', 'protocol-li4': '<strong>主动恢复 (可选):</strong> 在最后一组力竭后，进行10-15分钟的极低强度主动恢复。测量恢复前后的血乳酸，以计算乳酸清除率。', 'protocol-citation': '方案改编自: Olbrecht, J. (2013). *The Science of Winning*.', 'pace-sugg-title': '个性化配速建议', 'pace-sugg-subtitle': '根据个人最好成绩设定递增负荷是更科学的方法。输入您近期的200米PB，生成标准测试配速计划。', 'pace-sugg-label': '200米 个人最好成绩', 'pace-sugg-min': '分', 'pace-sugg-sec': '秒', 'pace-sugg-button': '计算配速', 'pace-sugg-results-title': '建议的200米测试配速计划', 'pace-sugg-th1': '组数', 'pace-sugg-th2': '强度', 'pace-sugg-th3': '目标100米配速', 'pace-sugg-th4': '目标200米时间', 'group-title': '团体数据导入', 'group-subtitle': '上传包含您团队数据的CSV文件以生成团体报告。文件应包含列: `Name`, `Pace_Min`, `Pace_Sec`, `Lactate`, `HR`, `RPE`。',
        'group-guide-title': 'CSV 文件格式指南:', 'group-guide-li1': '第一行必须是表头, 包含: <code>Name,Pace_Min,Pace_Sec,Lactate,HR,RPE</code>。', 'group-guide-li2': '<code>Name</code>: 运动员姓名。', 'group-guide-li3': '<code>Pace_Min</code>, <code>Pace_Sec</code>: 每组200米分段的分钟和秒。', 'group-guide-li4': '<code>Lactate</code>: 该分段的血乳酸值 (mmol/L)。', 'group-guide-li5': '<code>HR</code>: 心率 (bpm)。(可选)', 'group-guide-li6': '<code>RPE</code>: 自感劳累程度 (6-20)。(可选)', 'group-guide-li7': '每个运动员的数据应在连续的行中。', 'group-template-link': '下载CSV模板', 'group-choose-file': '选择文件', 'group-no-file': '未选择文件', 'group-generate-button': '生成团体报告', 'individual-title': '个人数据输入', 'individual-resting-label': '静息血乳酸 (可选)', 'individual-resting-placeholder': '测试前 (例如, 1.2)', 'individual-baseline-label': '基础血乳酸', 'individual-baseline-tooltip': '<b>强烈建议填写。</b>此值为热身后、递增负荷开始前(或第一组极低强度)的血乳酸值，是新模型精确计算乳酸平台期的关键。',
        'individual-baseline-placeholder': '热身后 (例如, 1.8)', 'individual-maxhr-label': '您的最大心率 (Max HR)', 'individual-maxhr-placeholder': '例如, 195 bpm', 'individual-stage1-title': '1. 递增负荷阶段', 'individual-th-pace': '配速 / 200m', 'individual-th-lactate': '血乳酸', 'individual-th-hr': '心率', 'individual-th-rpe': 'RPE', 'individual-add-row': '+ 添加行', 'individual-stage2-title': '2. 主动恢复阶段 (可选)', 'individual-peak-label': '峰值血乳酸 (mmol/L)', 'individual-peak-placeholder': '力竭后3-5分钟', 'individual-recovery-label': '恢复后血乳酸', 'individual-recovery-placeholder': '主动恢复后', 'individual-duration-label': '恢复时长 (分钟)', 'individual-duration-placeholder': '例如, 10', 'individual-generate-button': '生成完整报告', 'css-title': '临界游泳速度 (CSS)', 'css-p1': '<strong>临界游泳速度 (CSS)</strong> 在概念上被定义为游泳者在理论上可以长时间持续运动而不会达到力竭状态的最高速度。重要的是，通过200/400米测试计算出的CSS，其配速通常显著快于真正的无氧阈 (MLSS)，因此它更准确地反映了<strong>最大代谢稳态 (Maximal Metabolic Steady State, MMSS)</strong>。',
        'css-method-title': '测试方法:', 'css-method-p': '测试包括一次400米和一次200米的最大努力计时游，两次测试之间进行充分的恢复。', 'css-formula-title': '核心公式:', 'css-formula-p': 'CSS 配速 (/100米) = (400米时间 - 200米时间) / 2', 'css-citation': '模型源自《科学化游泳训练区间设定指南》报告。', 'css-calculator-title': 'CSS 计算器', 'css-calculator-subtitle': '输入您的400米和200米全力游时间，以计算您的CSS和相应的训练区间。', 'css-400m-label': '400米 时间', 'css-200m-label': '200米 时间', 'css-calculate-button': '计算区间', 'css-results-title': '您的训练区间与建议', 'css-results-pace-label': '临界游泳速度 (CSS) 配速', 'css-results-th1': '区间', 'css-results-th2': '生理学目标', 'css-results-th3': '配速范围 (/100m)', 'alert-choose-file': '请先选择一个CSV文件。', 'alert-parse-error': '无法解析CSV文件。请检查文件格式和内容。', 'alert-min-rows': '请输入至少4个有效的数据行(包括基础值)以进行分析。', 'css-error-time': '输入错误: 400米时间必须大于200米时间。',
        'report-title-individual': '个人报告', 'report-title-group': '的报告', 'group-reports-title': '各运动员详细报告', 'report-error': '图表生成失败: ', 'report-error-console': '。请按F12打开控制台查看详细错误。', 'mlss-method-legend': 'MLSS (LT2) 计算方法 (基于Nolte-2022模型)', 'mlss-method-moddmax': 'ModDmax (改良D-max法)', 'mlss-method-loglog': 'Log-Log Dmax (双对数法)', 'moddmax-tooltip': '<strong>计算:</strong> 基于Nolte(2022)模型直接确定乳酸起飞点(P1)作为LT1, 再以此点为起点执行D-max计算。<br><strong>推荐适用:</strong> 数据形态良好、平台期与指数增长期分界清晰的“标准”乳酸曲线。此方法与整体模型自洽性高，结果稳健。', 'loglog-tooltip': '<strong>计算:</strong> 先通过双对数(Log-Log)变换在原始数据上直接定位第一乳酸阈(LT1), 再以此LT1点为起点在Nolte(2022)曲线上执行D-max计算。<br><strong>推荐适用:</strong> 乳酸水平整体偏低的精英耐力运动员，或初始数据点模糊、平台期不明显的“疑难”曲线。此方法对LT1的定位更客观，是公认的黄金标准之一。', 'ref-title': '方法学依据与参考文献', 'ref-p1': '阈值计算的核心方法基于<strong>分段式指数函数模型</strong>进行曲线拟合，并结合<strong>D-max法</strong>确定第二乳酸阈(LT2)。该模型因其能更准确地反映乳酸在递增负荷中的真实生理学变化（平台期+指数增长期）而被最新的科学研究所推荐，提供了比传统单一指数模型更高的信度和效度。',
        'ref-p2': '<strong>主要参考文献:</strong>', 'card-lt1-title': '有氧阈 (LT1)', 'card-lt1-desc': '理想的低强度有氧基础训练区间 (Zone 2) 的核心。', 'card-lt2-title': '无氧阈 (LT2 / MLSS)', 'card-lt2-desc': '提升竞赛表现的关键，高强度训练 (Zone 4) 的临界点。', 'card-vvo2max-title': '最大摄氧量速度 (vVO2max)', 'card-vvo2max-desc': '达到最大摄氧量的具体速度值，是一个精确的训练靶点，而非整个VO2max区间。', 'card-clearance-title': '最大乳酸清除率', 'card-clearance-desc': '反映您的恢复效率。数值越高越好。', 'card-unit-pace': '/100m', 'card-unit-clearance': 'mmol/L/min', 'card-no-data': '数据不可用', 'chart-raw-data': '原始数据', 'chart-fitted-curve': '拟合曲线 (Nolte, 2022)', 'chart-xlabel': '速度 (m/s)', 'chart-ylabel-lactate': '血乳酸 (mmol/L)', 'chart-ylabel-hr': '心率 (bpm)', 'chart-ylabel-rpe': 'RPE (Borg 6-20)', 'reco-title': '个性化训练建议', 'reco-subtitle': '本指南将您的测试数据转化为可行的训练策略，将您的个性化区间与《The Science of Winning》中的四种核心训练类型进行映射。',
        'reco-type-aec': '有氧能力训练 (Aerobic Capacity)', 'reco-type-anc': '无氧能力训练 (Anaerobic Capacity)', 'reco-type-aep': '有氧功率训练 (Aerobic Power)', 'reco-type-anp': '无氧功率训练 (Anaerobic Power)', 'reco-goal': '核心目标', 'reco-pace': '执行配速', 'reco-zones': '对应区间', 'reco-goal-aec': '建立基础，提升最大摄氧量(VO2max)。', 'reco-goal-anc': '提升最大糖酵解速率(VLamax)，即乳酸的产生能力。', 'reco-goal-aep': '优化在比赛中利用有氧能力的百分比，即提升乳酸清除和利用效率。', 'reco-goal-anp': '优化在比赛中利用无氧能力的百分比，增强对高浓度乳酸的耐受性。', 'reco-sample-set': '示例训练组', 'reco-set-aec': '大量的耐力区低强度训练(例如 3000米连续游)，配合少量、短暂的最大摄氧量区/无氧耐力区高强度刺激(例如 6x50米 快)。', 'reco-set-anc': '短距离、高强度间歇，配合长且被动的休息(例如 8x25米 全力冲刺，休2分钟)。', 'reco-set-aep': '在阈值区进行的长间歇训练，休息时间短(例如 10x200米 阈值配速，休15秒)。',
        'reco-set-anp': '极限强度间歇，配合极短的休息(例如“分解游”：2x(4x50米) 比赛配速，50米间休10秒)。', 'analysis-title': "运动员代谢画像", 'analysis-nodata': "数据不足，无法生成详细的代谢画像。", 'analysis-profile-title': "代谢画像总结", 'analysis-profile-preamble': "通过对关键代谢指标的量化分析，该运动员的画像被归类为：", 'profile-endurance': "耐力引擎型", 'profile-endurance-desc': "画像特征为极高的LT2/vVO2max比率(<strong>{vlt2_vvo2max_ratio}%</strong>)和较低的糖酵解指数(<strong>{glycolytic_index}</strong>)。这表明运动员能将极高比例的最大有氧能力转化为可持续巡航速度，其代谢引擎由卓越的乳酸清除和利用能力驱动，是中长距离项目的理想模型。", 'profile-anaerobic': "无氧动力型", 'profile-anaerobic-desc': "画像特征为较低的LT2/vVO2max比率(<strong>{vlt2_vvo2max_ratio}%</strong>)和较高的糖酵解指数(<strong>{glycolytic_index}</strong>)。此画像表明运动员拥有一个占主导地位的无氧系统，能为短时爆发提供极高功率。其运动表现依赖于高速的糖酵解，是冲刺项目的理想模型。", 'profile-hybrid': "混合均衡型", 'profile-hybrid-desc': "画像特征为均衡的LT2/vVO2max比率(<strong>{vlt2_vvo2max_ratio}%</strong>)和中等的糖酵解指数(<strong>{glycolytic_index}</strong>)。此画像表明运动员的有氧耐力和无氧爆发力发展均衡，能力全面，是200米/400米等要求速度和耐力并重的中距离项目的理想模型。",
        'analysis-kpi-title': "关键代谢指标", 'kpi-vlt1': "有氧基础 (vLT1)", 'kpi-vlt2': "可持续能力 (vLT2)", 'kpi-vvo2max': "有氧功率 (vVO2max)", 'kpi-glycolytic-index': "糖酵解指数 (VLamax代表指标)", 'kpi-tooltip-vlt1': "第一乳酸阈速度。更高的vLT1代表更扎实的有氧基础和更强的恢复能力。", 'kpi-tooltip-vlt2': "第二乳酸阈速度(MLSS估算值)。这是从200米到1500米项目表现的关键预测指标。", 'kpi-tooltip-vvo2max': "达到最大摄氧量的速度。更高的值通常更好，但必须与高耐力指数相平衡。没有足够耐力支撑的过高vVO2max可能导致提早衰竭。", 'kpi-tooltip-glycolytic-index': "代表最大乳酸生成速率（糖酵解指数）。数值越高，爆发潜力越强，但乳酸堆积也越快。冲刺选手需要高值，长距离选手则需要较低的值。", 'analysis-longitudinal-title': "纵向对比与诊断建议", 'analysis-longitudinal-note': "<strong>这是对单次测试的横断面分析。</strong> 为了做出最精准的诊断，强烈建议将本次结果与历史数据进行纵向对比。例如，曲线的“右移”通常代表耐力进步，而“左移”且峰值乳酸受抑制则可能是过度训练的警报。结合专项成绩和训练日志，才能全面评估运动员的适应性变化。", 'analysis-citation': "分析框架主要源自: 《游泳运动员的代谢蓝图：血乳酸-强度曲线科学解读指南》",
        'athlete-level-label': '运动员等级', 'level-elite': '专业/精英级', 'level-amateur': '业余/俱乐部级', 'event-specialty-label': '主项距离', 'specialty-sprint': '短距离 (50-100m)', 'specialty-middle': '中距离 (200-400m)', 'specialty-distance': '长距离 (800m+)', 'special-note-lt-same-title': '特别提示', 'special-note-lt-same-body': '当LT1与LT2配速相同时，这并非错误。它表明在此数据集上，乳酸在经过第一个拐点(LT1)后呈高度线性增长，未出现一个独立的、显著的第二个拐点。LT1的值直接来自您的原始数据点，而LT2的值来自拟合曲线，因此即使配速相同，血乳酸值也可能存在微小差异。', 'group-summary-title': '团队横向对比', 'group-summary-subtitle': '团队所有成员关键代谢指标一览。', 'group-radar-title': '运动员能力雷达图', 'group-radar-select-title': '选择运动员对比', 'group-table-title': '核心指标总览表', 'group-th-name': '运动员', 'group-th-vlt1': 'vLT1 配速', 'group-th-vlt2': 'vLT2 配速',
        'group-th-vvo2max': 'vVO2max 配速', 'group-th-glycolytic': '糖酵解指数', 'group-th-ratio': 'vLT2/vVO2max 比率', 'radar-label-vlt1': '有氧代谢效率 (vLT1)', 'radar-label-vlt2': '最大有氧输出能力 (vLT2≈MLSS)', 'radar-label-vvo2max': '有氧功率上限 (vVO2max)', 'radar-label-glycolytic': '爆发潜力 (糖酵解指数)', 'radar-label-ratio': '续航能力 (vLT2/vVO2max)', 'kpi-tooltip-mlss': '即无氧阈，这是衡量高强度耐力的黄金标准。此速度越高，运动员在比赛中维持高速的能力越强。', 'kpi-tooltip-ratio': '衡量运动员将最大有氧能力转化为可持续巡航速度的效率。比率越高，耐力经济性越好，尤其对中长距离项目至关重要。', 'analysis-interpretation-title': "指标解读", 'interpretation-ratio-title': "vLT2/vVO2max 比率 (耐力指数)", 'interpretation-ratio-desc': "这是衡量耐力水平的核心指标，代表了您能将多大比例的最大有氧功率（vVO2max）转化为可持续的巡航速度（vLT2）。<strong>比率越高，耐力越好</strong>，意味着您在长距离中有更强的“续航”能力。精英长距离选手的比率通常高于90%。",
        'interpretation-glycolytic-title': "糖酵解指数 (爆发力指数)", 'interpretation-glycolytic-desc': "这是衡量无氧糖酵解系统能力的指标，代表了您在高强度运动中产生乳酸的最大速率。<strong>指数越高，短时爆发力越强</strong>，但同时也意味着乳酸堆积更快。短距离冲刺选手需要高指数，而长距离选手则需要较低的指数以维持稳定输出。", 'lactate-zones-title': '基于生理学锚点的训练区间', 'lactate-zones-subtitle': '根据您的生理学锚点，为您生成以下个性化七级训练区间：', 'zone-name-1': '区间 1: 恢复区', 'zone-name-2': '区间 2: 耐力区', 'zone-name-3': '区间 3: 节奏区', 'zone-name-4': '区间 4: 阈值区', 'zone-name-5': '区间 5: 最大摄氧量区', 'zone-name-6': '区间 6: 无氧耐力区', 'zone-name-7': '区间 7: 神经肌肉力量区',
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
            closeLoginModal();
            updateUIForLoginState();
        } else {
            errorDiv.textContent = result.message;
            errorDiv.classList.remove('hidden');
        }
    } catch (error) {
        console.error('无法连接到服务器:', error);
        errorDiv.textContent = '无法连接到服务器，请稍后重试。';
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
function setButtonLoading(button, isLoading, originalTextKey) { const spinner = button.querySelector('.btn-spinner'); const text = button.querySelector('.btn-text'); const icon = button.querySelector('.btn-icon'); if (isLoading) { button.disabled = true; if (text) text.textContent = '正在分析...'; if (spinner) spinner.classList.remove('hidden'); if (icon) icon.classList.add('hidden'); } else { button.disabled = false; if (text && translations[currentLanguage][originalTextKey]) text.textContent = translations[currentLanguage][originalTextKey]; if (spinner) spinner.classList.add('hidden'); if (icon) icon.classList.remove('hidden'); } }

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

    // ==== 逻辑修改/新增部分 ====

    // 1. 获取新添加的复选框和登录按钮
    const agreeCheckbox = document.getElementById('agree-checkbox');
    const loginButton = document.getElementById('login-button');

    // 2. 监听复选框的点击事件
    agreeCheckbox.addEventListener('change', () => {
        // 如果复选框被勾选，则启用按钮；否则，禁用按钮
        loginButton.disabled = !agreeCheckbox.checked;
    });

    // 3. 修改 handleLogin 函数，增加一层保险检查
    const originalHandleLogin = handleLogin;
    window.handleLogin = async (event) => {
        if (!agreeCheckbox.checked) {
            const errorDiv = document.getElementById('login-error');
            errorDiv.textContent = '请先阅读并同意服务条款和隐私政策。'; // 新的提示
            errorDiv.classList.remove('hidden');
            return; // 中断登录
        }
        await originalHandleLogin(event); // 调用原始登录逻辑
    };
    
    // 4. 绑定所有现有的事件监听器
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