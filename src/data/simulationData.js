// ════════════════════════════════════════════
//  ONEDOC AI — SIMULATION DATA ENGINE v2
//  Realistic data for all 27 MY outlets
// ════════════════════════════════════════════

// ── OUTLETS ──────────────────────────────────
export const OUTLETS = {
  kv: ['Uptown PJ','Kota Damansara','Subang Jaya','Puchong','Bukit Jalil',
       'Publika KL','Kepong','Setia Alam','Kota Kemuning','Mid Valley',
       'Cheras','Bangi','Rawang','Melawati','Klang','Balakong'],
  penang: ['Icon City','E-Gate'],
  jb: ['Mount Austin','Southkey Mosaic','Sutera Utama','Eco Botanic'],
  other: ['Ipoh','Seremban','Melaka','Sungai Petani','Kuantan'],
};

export const ALL_OUTLETS = Object.values(OUTLETS).flat();

// ── REVENUE (12 months + 3 forecast) ─────────
export const revenueTimeline = [
  { month:'Jan 24', actual:268000, target:260000, forecast:null },
  { month:'Feb 24', actual:294000, target:280000, forecast:null },
  { month:'Mar 24', actual:312000, target:295000, forecast:null },
  { month:'Apr 24', actual:287000, target:305000, forecast:null },
  { month:'May 24', actual:334000, target:315000, forecast:null },
  { month:'Jun 24', actual:358000, target:330000, forecast:null },
  { month:'Jul 24', actual:376000, target:350000, forecast:null },
  { month:'Aug 24', actual:401000, target:370000, forecast:null },
  { month:'Sep 24', actual:388000, target:385000, forecast:null },
  { month:'Oct 24', actual:423000, target:400000, forecast:422000 },
  { month:'Nov 24', actual:null,   target:420000, forecast:447000 },
  { month:'Dec 24', actual:null,   target:445000, forecast:481000 },
  { month:'Jan 25', actual:null,   target:430000, forecast:406000 },
];

// ── CLIENT VOLUME ─────────────────────────────
export const clientVolume = [
  { month:'Jan', new:1180, returning:3640, churned:210 },
  { month:'Feb', new:1310, returning:3920, churned:188 },
  { month:'Mar', new:1260, returning:3790, churned:224 },
  { month:'Apr', new:1420, returning:4100, churned:165 },
  { month:'May', new:1580, returning:4380, churned:142 },
  { month:'Jun', new:1490, returning:4220, churned:178 },
  { month:'Jul', new:1670, returning:4590, churned:130 },
  { month:'Aug', new:1740, returning:4820, churned:115 },
  { month:'Sep', new:1580, returning:4450, churned:168 },
  { month:'Oct', new:1840, returning:4980, churned:102 },
];

// ── TREATMENT MIX ─────────────────────────────
export const treatmentMix = [
  { name:'Full Protocol',  value:36, color:'#6d35e0' },
  { name:'Ultra Pico X',   value:26, color:'#8b5cf6' },
  { name:'Deep Cleansing', value:19, color:'#a855f7' },
  { name:'UltraBoost™',    value:13, color:'#d946ef' },
  { name:'Hydration Mask', value:6,  color:'#f0abfc' },
];

// ── SKIN CONCERN TRENDS ───────────────────────
export const skinConcernTrend = [
  { month:'Jul', Pigmentation:36, PimpleScars:29, ActivePimples:19, Sunspots:10, UnevenTone:6 },
  { month:'Aug', Pigmentation:34, PimpleScars:31, ActivePimples:21, Sunspots:9,  UnevenTone:5 },
  { month:'Sep', Pigmentation:39, PimpleScars:28, ActivePimples:18, Sunspots:10, UnevenTone:5 },
  { month:'Oct', Pigmentation:42, PimpleScars:26, ActivePimples:20, Sunspots:7,  UnevenTone:5 },
];

// ── OUTLET PERFORMANCE ────────────────────────
export const outletData = [
  { name:'Mid Valley',    region:'KV',    rev:91200, clients:1580, sat:4.9, growth:18.4, sessions:2340, nps:78, status:'top'   },
  { name:'Uptown PJ',     region:'KV',    rev:78400, clients:1240, sat:4.8, growth:11.8, sessions:1890, nps:74, status:'top'   },
  { name:'Southkey JB',   region:'JB',    rev:71200, clients:1080, sat:4.8, growth:24.1, sessions:1650, nps:76, status:'top'   },
  { name:'Bukit Jalil',   region:'KV',    rev:67800, clients:1110, sat:4.7, growth:9.4,  sessions:1670, nps:72, status:'good'  },
  { name:'Icon City',     region:'Penang',rev:63400, clients:970,  sat:4.8, growth:-2.8, sessions:1420, nps:71, status:'watch' },
  { name:'Kota Damansara',region:'KV',    rev:60100, clients:940,  sat:4.6, growth:8.2,  sessions:1390, nps:68, status:'good'  },
  { name:'Eco Botanic',   region:'JB',    rev:58900, clients:890,  sat:4.7, growth:31.2, sessions:1280, nps:75, status:'top'   },
  { name:'Publika KL',    region:'KV',    rev:52300, clients:870,  sat:4.5, growth:3.8,  sessions:1200, nps:65, status:'good'  },
  { name:'Cheras',        region:'KV',    rev:48700, clients:980,  sat:4.3, growth:-6.1, sessions:1320, nps:55, status:'alert' },
  { name:'E-Gate',        region:'Penang',rev:42100, clients:710,  sat:4.6, growth:-9.2, sessions:980,  nps:63, status:'alert' },
  { name:'Ipoh',          region:'Perak', rev:38400, clients:640,  sat:4.7, growth:15.1, sessions:910,  nps:70, status:'good'  },
  { name:'Melaka',        region:'Other', rev:34200, clients:560,  sat:4.6, growth:12.3, sessions:810,  nps:68, status:'good'  },
];

// ── SATISFACTION BY OUTLET (scatter data) ─────
export const satisfactionScatter = outletData.map(o => ({
  name: o.name,
  x: o.sat,
  y: o.rev / 1000,
  z: o.sessions / 50,
  status: o.status,
}));

// ── WEEKLY HEATMAP ────────────────────────────
const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);
export const weekHeatmap = days.map((day, di) =>
  Array.from({length:12}, (_, hi) => ({
    day, hour: `${hi+8}:00`,
    val: rand(
      di >= 5 ? 40 : 10,
      di >= 5 ? 120 : (hi >= 3 && hi <= 6 ? 90 : 60)
    )
  }))
);

// ── MAIN KPIs ─────────────────────────────────
export const kpis = {
  revenue:    { val: 3541000, chg: 12.3,  fmt: 'RM3.54M' },
  clients:    { val: 106420,  chg: 8.7,   fmt: '106.4K'  },
  sat:        { val: 4.73,    chg: 0.12,  fmt: '4.73'    },
  retention:  { val: 78.4,    chg: 2.1,   fmt: '78.4%'   },
  completion: { val: 94.2,    chg: 1.8,   fmt: '94.2%'   },
  rpv:        { val: 33.3,    chg: 3.4,   fmt: 'RM33.3'  },
  nps:        { val: 72,      chg: 5,     fmt: '72'      },
  outlets:    { val: 27,      chg: 2,     fmt: '27'      },
};

// ── PREDICTIVE KPIs ───────────────────────────
export const predictiveKPIs = [
  { label:'Nov Revenue',    labelZh:'11月收入',     val:'RM 447K', conf:87, trend:'up',   delta:'+7.2%', color:'#8b5cf6' },
  { label:'New Clients',    labelZh:'新客户',       val:'1,950',   conf:82, trend:'up',   delta:'+3.2%', color:'#22d3ee' },
  { label:'Churn at Risk',  labelZh:'流失风险',     val:'142',     conf:79, trend:'down', delta:'-24',   color:'#fb7185' },
  { label:'Peak Day',       labelZh:'高峰日',       val:'Saturday',conf:94, trend:null,   delta:null,    color:'#fbbf24' },
  { label:'Top Concern',    labelZh:'主要皮肤问题', val:'Pigment', conf:91, trend:'up',   delta:'+4%',   color:'#34d399' },
];

// ── 6-MONTH FORECAST ──────────────────────────
export const forecastData = [
  ...revenueTimeline.slice(7,10).map(d => ({ ...d, type:'historical', lower:null, upper:null })),
  { month:'Nov 24', actual:null, forecast:447000, lower:419000, upper:475000, target:420000, type:'forecast' },
  { month:'Dec 24', actual:null, forecast:481000, lower:449000, upper:513000, target:445000, type:'forecast' },
  { month:'Jan 25', actual:null, forecast:406000, lower:374000, upper:438000, target:430000, type:'forecast' },
  { month:'Feb 25', actual:null, forecast:438000, lower:404000, upper:472000, target:435000, type:'forecast' },
  { month:'Mar 25', actual:null, forecast:496000, lower:458000, upper:534000, target:450000, type:'forecast' },
];

// ── CHURN SEGMENTS ────────────────────────────
export const churnSegments = [
  { label:'High Risk',  labelZh:'高风险', n:142,  pct:2.5,  color:'#fb7185', desc:'3+ months inactive after package', action:'Immediate reactivation campaign' },
  { label:'Medium Risk',labelZh:'中风险', n:287,  pct:5.1,  color:'#fbbf24', desc:'45–90 days since last visit',      action:'Personalised WhatsApp nudge'      },
  { label:'Low Risk',   labelZh:'低风险', n:1240, pct:22.1, color:'#8b5cf6', desc:'Recently engaged, watching',       action:'Loyalty tier upgrade offer'       },
  { label:'Loyal',      labelZh:'忠实客户',n:3890, pct:69.3, color:'#34d399', desc:'Repeat package purchasers',         action:'VIP referral programme'           },
];

// ── OUTLET RADAR (top 3 compare) ─────────────
export const outletRadar = [
  { metric:'Revenue',      midval:91, uptown:79, cheras:55 },
  { metric:'Clients',      midval:82, uptown:67, cheras:58 },
  { metric:'Satisfaction', midval:98, uptown:96, cheras:84 },
  { metric:'Growth',       midval:92, uptown:78, cheras:42 },
  { metric:'NPS',          midval:90, uptown:84, cheras:62 },
  { metric:'Retention',    midval:86, uptown:80, cheras:70 },
];

// ── ML MODELS ─────────────────────────────────
export const mlModels = [
  {
    name:'Revenue Forecaster',
    type:'Gradient Boosted Ensemble (XGBoost + LightGBM)',
    accuracy:87, precision:85, recall:88,
    status:'live',
    features:['Historical revenue','Seasonality index','Promotion calendar','Outlet count','Weather index'],
    lastTrained:'Oct 28, 2024',
    latency:'42ms',
  },
  {
    name:'Churn Predictor',
    type:'Random Forest + Logistic Regression',
    accuracy:82, precision:79, recall:84,
    status:'live',
    features:['Days since last visit','Session count','Package tier','Feedback score','Spend pattern'],
    lastTrained:'Oct 27, 2024',
    latency:'18ms',
  },
  {
    name:'Demand Modeller',
    type:'LSTM Neural Network (seq2seq)',
    accuracy:79, precision:76, recall:81,
    status:'training',
    features:['Time series','Location cluster','Treatment mix','Day-of-week','Public holidays'],
    lastTrained:'Oct 24, 2024',
    latency:'89ms',
  },
  {
    name:'Sentiment Analyser',
    type:'Fine-tuned mBERT (EN + ZH)',
    accuracy:91, precision:90, recall:92,
    status:'live',
    features:['Review text','Star rating','Visit recency','Language detection','Entity extraction'],
    lastTrained:'Oct 29, 2024',
    latency:'105ms',
  },
];

// ── RCA INCIDENTS ─────────────────────────────
export const rcaIncidents = [
  {
    id:'RCA-2024-089',
    title:'Satisfaction Score Drop — Cheras',
    titleZh:'满意度下降 — Cheras门店',
    severity:'high',
    status:'resolved',
    outlet:'Cheras (Sunway Velocity)',
    date:'2024-10-14',
    affectedClients:284,
    resolvedIn:'48h',
    kpiImpacted:'Satisfaction: 4.6→4.3',
    rootCauses:[
      { factor:'Weekend staff scheduling gap',      impact:68, type:'People',      confirmed:true  },
      { factor:'PICOPULSE™ maintenance overdue',    impact:21, type:'Equipment',   confirmed:true  },
      { factor:'Walk-in surge vs appointment slots',impact:11, type:'Process',     confirmed:true  },
    ],
    aiInsight:'Weekend therapist coverage was reduced by 33% during weeks 40–41 (2 therapists on leave, not replaced). Combined with a 28% walk-in spike post Mother\'s Day promo, average wait time reached 24 min vs. the 8-min standard. The PICOPULSE™ unit at Room 3 showed 14% energy degradation — consistent with overdue maintenance.',
    aiInsightZh:'周末治疗师覆盖率在第40-41周减少了33%（2名治疗师请假未获替代）。加上母亲节促销后步入客户量激增28%，平均等待时间达到24分钟（标准为8分钟）。3号房的PICOPULSE™设备显示能量衰减14%，与逾期维护一致。',
    recommendations:[
      { action:'Hire 2 weekend therapists for Cheras', owner:'HR Manager',  deadline:'Nov 15', done:true  },
      { action:'Schedule bi-weekly PICOPULSE™ service', owner:'Operations', deadline:'Nov 10', done:true  },
      { action:'Implement online queue + walk-in cap',  owner:'Tech Team',  deadline:'Nov 30', done:false },
      { action:'Send complimentary session to affected 284 clients', owner:'CRM', deadline:'Nov 8', done:true },
    ],
    timeline:[
      { t:'Oct 14 08:12', event:'Anomaly detected by AI monitoring — satisfaction score -0.4 SD below baseline', actor:'AI System' },
      { t:'Oct 14 08:18', event:'Alert pushed to Regional Manager & Head of Ops via WhatsApp', actor:'Auto Notification' },
      { t:'Oct 14 09:45', event:'RCA investigation opened', actor:'Operations' },
      { t:'Oct 14 11:20', event:'Root causes identified: staff gap + device degradation', actor:'AI + Manager' },
      { t:'Oct 14 14:00', event:'Emergency therapist rostered; device maintenance booked', actor:'Outlet Manager' },
      { t:'Oct 16 09:00', event:'All corrective actions implemented. Monitoring active.', actor:'System' },
    ],
  },
  {
    id:'RCA-2024-087',
    title:'Revenue Shortfall — Penang Region',
    titleZh:'收入不足 — 槟城地区',
    severity:'medium',
    status:'in-progress',
    outlet:'Icon City + E-Gate',
    date:'2024-10-08',
    affectedClients:156,
    resolvedIn:null,
    kpiImpacted:'Revenue: -RM 18.4K MoM',
    rootCauses:[
      { factor:'Trial-to-package conversion drop (42%→28%)',impact:45, type:'Sales',     confirmed:true  },
      { factor:'New competitor clinic opened 1.2km from Icon City',impact:32, type:'Market', confirmed:true  },
      { factor:'Reduced social media engagement (-38%)',     impact:23, type:'Marketing', confirmed:false },
    ],
    aiInsight:'NLP analysis of post-trial feedback identified "price sensitivity" and "more options now" clusters. Competitor opened Oct 2 — Google Maps reviews spike detected. Instagram engagement dropped after algorithm change Sep 28.',
    aiInsightZh:'对试用后反馈的NLP分析发现了"价格敏感"和"现在有更多选择"的关键词聚类。竞争对手于10月2日开业——检测到谷歌地图评论激增。Instagram互动量在9月28日算法更改后下降。',
    recommendations:[
      { action:'Launch targeted WhatsApp follow-up for 156 trial clients', owner:'CRM Team',  deadline:'Nov 10', done:false },
      { action:'Offer 3-session loyalty incentive (RM50 off)',             owner:'Marketing', deadline:'Nov 12', done:false },
      { action:'Boost Penang social media ad spend +40%',                  owner:'Digital',   deadline:'Nov 15', done:true  },
    ],
    timeline:[
      { t:'Oct 08 07:00', event:'Monthly revenue anomaly detected — Penang -12.3% MoM', actor:'AI System' },
      { t:'Oct 08 09:30', event:'Regional manager alerted; investigation begun', actor:'Ops' },
      { t:'Oct 09 14:00', event:'Competitor opening confirmed via field check', actor:'Field Team' },
      { t:'Oct 10 11:00', event:'Conversion funnel analysis completed by AI', actor:'AI Analytics' },
    ],
  },
  {
    id:'RCA-2024-085',
    title:'Pigmentation Complaint Spike — KL',
    titleZh:'色斑投诉激增 — 吉隆坡',
    severity:'medium',
    status:'monitoring',
    outlet:'Multiple KL Outlets',
    date:'2024-10-01',
    affectedClients:89,
    resolvedIn:null,
    kpiImpacted:'NPS: 72→66 in affected outlets',
    rootCauses:[
      { factor:'Serum batch #2024-B09 formulation variance',impact:55, type:'Product',   confirmed:true  },
      { factor:'Post-Raya UV index peak season',            impact:30, type:'External',  confirmed:true  },
      { factor:'Client aftercare non-compliance',           impact:15, type:'Client',    confirmed:false },
    ],
    aiInsight:'NLP on 89 feedback messages surfaced "darker spots", "worse after treatment" keywords — 3.2× baseline rate. Batch #2024-B09 shows 8% higher photosensitizer concentration per QA lab retest. Seasonal UV index in KL peaked at 12.4 in late Sep (avg 8.2).',
    aiInsightZh:'对89条反馈信息的NLP分析发现"斑点变深"、"治疗后更严重"等关键词——是基准率的3.2倍。批次#2024-B09显示光敏剂浓度偏高8%（QA实验室复测）。九月底吉隆坡紫外线指数峰值达12.4（平均8.2）。',
    recommendations:[
      { action:'Quarantine & QA-test Batch #2024-B09 across all outlets', owner:'QA Manager', deadline:'Oct 15', done:true  },
      { action:'Deploy automated aftercare WhatsApp reminders',           owner:'CRM',        deadline:'Oct 20', done:true  },
      { action:'Offer complimentary follow-up to 89 clients',             owner:'Outlet Mgr', deadline:'Oct 25', done:false },
    ],
    timeline:[
      { t:'Oct 01 06:00', event:'Sentiment AI flagged 12 negative reviews in 24h — keyword cluster alert', actor:'AI System' },
      { t:'Oct 01 10:00', event:'QA team notified; Batch #2024-B09 under review', actor:'Operations' },
      { t:'Oct 03 16:00', event:'Lab results confirm formulation variance', actor:'QA Lab' },
      { t:'Oct 04 09:00', event:'Batch quarantined across 8 KL outlets; replacement dispatched', actor:'Supply Chain' },
    ],
  },
];

// ── NLP CHATBOT RESPONSES ─────────────────────
export const chatResponses = {
  en: {
    revenue:     "YTD revenue stands at **RM 3.54M**, up **12.3%** vs same period last year. The AI forecasts **RM 447K in November** (87% confidence), driven by year-end festive demand and 2 new outlet openings. Top performer: **Mid Valley at RM 91.2K MTD**. Watch Penang — E-Gate is down 9.2% MoM.",
    clients:     "Total clients served: **106,420** across 27 outlets. New client acquisition grew **8.7% MoM**. ⚠️ **142 high-risk churn clients** identified — primarily lapsed package holders (45+ days inactive). Recommend launching a reactivation WhatsApp campaign by Dec 15 to prevent estimated **RM 28K revenue loss**.",
    satisfaction:"Overall NPS is **72** — top quartile for Malaysian aesthetics. Avg satisfaction: **4.73/5.0**. 🏆 Best: Mid Valley (4.9). ⚠️ Lowest: Cheras (4.3) — recovering from RCA-2024-089. AI sentiment analysis shows 86% positive sentiment in reviews; top keywords: *smooth*, *professional*, *visible results*.",
    rca:         "**3 active RCA cases** this month:\n- 🔴 RCA-2024-089 (Cheras, RESOLVED in 48h)\n- 🟡 RCA-2024-087 (Penang revenue, IN PROGRESS)\n- 🔵 RCA-2024-085 (KL pigmentation, MONITORING)\n\nAI identified **staff scheduling gaps** as the #1 cross-outlet root cause pattern (42% of all incidents). Enable predictive staffing to prevent future occurrences.",
    prediction:  "Q4 2024 forecast: **RM 1.37M** (+14.6% vs Q4 2023). Highest growth: **Johor Bahru +24%** (Eco Botanic driving). Risk: January 2025 seasonal dip predicted (−12%), recommend loyalty campaign in December. The churn model flags **142 clients** needing attention before year-end.",
    outlets:     "Top 3 by revenue: **Mid Valley (RM 91.2K) · Uptown PJ (RM 78.4K) · Southkey JB (RM 71.2K)**.\nEco Botanic JB is the fastest grower at **+31.2% MoM** 🚀\nAlert: **Cheras and E-Gate** are underperforming — RCA investigations active.",
    skin:        "Dominant concern: **Pigmentation (42%)** — up 4pp from July. This matches the seasonal UV index peak in Sep/Oct. Pimple scars (26%) and active pimples (20%) steady. AI recommends promoting the Full Protocol package to clients booking for pigmentation, as it shows 2.3× better outcome scores.",
    default:     "I'm the OneDoc AI Analytics Assistant. I have full access to real-time data across **27 outlets, 106K+ clients, and all revenue/satisfaction metrics**. Ask me about:\n- Revenue & forecasts\n- Client behaviour & churn\n- Outlet performance rankings\n- RCA investigations\n- Skin concern trends\n- Predictive AI insights",
  },
  zh: {
    revenue:     "年初至今收入为**RM 354万**，同比增长**12.3%**。AI预测**11月收入RM 44.7万**（置信度87%），由年末节庆需求和2家新门店开业推动。最佳表现：**Mid Valley本月至今RM 9.12万**。注意槟城——E-Gate环比下降9.2%。",
    clients:     "27家门店共服务客户：**106,420人**。新客户获取环比增长**8.7%**。⚠️ 识别到**142名高流失风险客户**——主要是45天以上未活跃的套餐持有人。建议12月15日前发起WhatsApp重新激活活动，预防约**RM 2.8万的收入损失**。",
    satisfaction: "整体NPS为**72分**——位于马来西亚美容行业前四分位。平均满意度：**4.73/5.0**。🏆最佳：Mid Valley（4.9）。⚠️最低：Cheras（4.3）——正从RCA-2024-089中恢复。AI情感分析显示86%正面情绪；高频词汇：*皮肤变滑*、*专业*、*效果明显*。",
    rca:         "本月**3个活跃根因分析案例**：\n- 🔴 RCA-2024-089（Cheras，48小时内已解决）\n- 🟡 RCA-2024-087（槟城收入，进行中）\n- 🔵 RCA-2024-085（吉隆坡色斑，监控中）\n\nAI将**员工排班缺口**识别为跨门店首要根因（占所有事件的42%）。",
    prediction:  "2024年第四季度预测：**RM 137万**（同比2023年Q4增长14.6%）。最高增长：**新山+24%**（Eco Botanic领跑）。风险：预测2025年1月出现季节性下滑（-12%），建议12月启动忠诚度活动。流失模型标记**142名客户**需在年底前关注。",
    outlets:     "按收入排名前三：**Mid Valley (RM 9.12万) · Uptown PJ (RM 7.84万) · Southkey JB (RM 7.12万)**。\nEco Botanic JB增速最快，环比**+31.2%** 🚀\n警报：**Cheras和E-Gate**表现不佳——根因调查进行中。",
    skin:        "主要皮肤问题：**色斑（42%）**——自7月以来上升4个百分点，与9-10月季节性紫外线指数峰值相符。痘疤（26%）和活跃痘痘（20%）保持稳定。AI建议向预约色斑治疗的客户推荐完整疗程套餐，其疗效评分高2.3倍。",
    default:     "我是OneDoc AI分析助手，可实时访问**27家门店、10.6万+客户及所有收入/满意度数据**。您可以询问：\n- 收入与预测\n- 客户行为与流失\n- 门店绩效排名\n- 根因分析调查\n- 皮肤问题趋势\n- 预测AI洞察",
  },
};

export const suggestedQ = {
  en:[
    "What's our Q4 revenue forecast?",
    "Which outlets need attention right now?",
    "Explain the top RCA findings",
    "How many clients are at churn risk?",
    "What skin concern is rising fastest?",
    "Compare Mid Valley vs Cheras performance",
  ],
  zh:[
    "第四季度收入预测是多少？",
    "哪些门店目前需要关注？",
    "解释主要根因分析发现",
    "有多少客户面临流失风险？",
    "哪种皮肤问题上升最快？",
    "比较Mid Valley和Cheras的绩效",
  ],
};

// Intent detection
export function detectIntent(text) {
  const t = text.toLowerCase();
  if (/revenue|收入|sales|forecast|预测|q4|quarter|季度|rm|money/.test(t)) return 'revenue';
  if (/client|客户|churn|流失|volume|acquisition|customer/.test(t)) return 'clients';
  if (/satisf|满意|nps|rating|score|review|sentiment|分数/.test(t)) return 'satisfaction';
  if (/rca|root cause|根因|incident|investigation|issue|问题/.test(t)) return 'rca';
  if (/predict|预测|forecast|future|next|model|ai|ml/.test(t)) return 'prediction';
  if (/outlet|门店|branch|location|region|penang|johor|kl|cheras|midvalley/.test(t)) return 'outlets';
  if (/skin|pigment|pimple|色斑|痘|concern|treatment|acne/.test(t)) return 'skin';
  return 'default';
}
