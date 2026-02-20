import { useState, useEffect, useCallback } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend
} from "recharts";
import {
  LayoutDashboard, IndianRupee, Shield, CloudLightning, Building2, Heart,
  GraduationCap, MessageSquare, Users, Wheat, Vote, Bell, Brain, ChevronRight,
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, MapPin, Eye,
  Activity, Zap, Droplets, Thermometer, Wind, BarChart3, Settings, Search,
  ChevronDown, ArrowUpRight, ArrowDownRight, Minus, FileText, Target, Layers,
  Cpu, Wifi, Globe, Lock, Menu, X, Sun, Moon
} from "lucide-react";

// ═══════════════════════════════════════════
// DATA GENERATORS
// ═══════════════════════════════════════════
const months = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
const revenueData = months.map((m,i) => ({ name: m, target: 120+i*12, actual: 105+i*14+Math.random()*20, prev: 90+i*10 }));
const crimeData = months.map((m,i) => ({ name: m, theft: 45+Math.floor(Math.random()*30), assault: 20+Math.floor(Math.random()*15), cyber: 10+Math.floor(Math.random()*20), total: 80+Math.floor(Math.random()*50) }));
const healthData = months.map((m,i) => ({ name: m, opd: 2200+Math.floor(Math.random()*800), beds: 65+Math.floor(Math.random()*25), dengue: Math.floor(Math.random()*40), malaria: Math.floor(Math.random()*20) }));
const educationData = [
  { name: "Primary", enrolled: 185000, target: 195000 },
  { name: "Upper Primary", enrolled: 142000, target: 150000 },
  { name: "Secondary", enrolled: 98000, target: 110000 },
  { name: "Sr. Secondary", enrolled: 67000, target: 78000 },
];
const grievanceCategories = [
  { name: "Water Supply", value: 28, color: "#3b82f6" },
  { name: "Roads", value: 22, color: "#f59e0b" },
  { name: "Electricity", value: 18, color: "#ef4444" },
  { name: "Healthcare", value: 12, color: "#10b981" },
  { name: "Education", value: 10, color: "#8b5cf6" },
  { name: "Others", value: 10, color: "#6b7280" },
];
const schemeData = [
  { name: "PM-KISAN", beneficiaries: 245000, target: 280000, disbursed: 87 },
  { name: "PM Awas", beneficiaries: 18500, target: 22000, disbursed: 72 },
  { name: "Ujjwala", beneficiaries: 95000, target: 100000, disbursed: 95 },
  { name: "DBT Pension", beneficiaries: 156000, target: 165000, disbursed: 91 },
  { name: "Scholarships", beneficiaries: 42000, target: 55000, disbursed: 63 },
];
const cropData = [
  { name: "Sugarcane", area: 1200, yield: 85, price: 3150 },
  { name: "Soybean", area: 980, yield: 72, price: 4600 },
  { name: "Jowar", area: 750, yield: 68, price: 3180 },
  { name: "Bajra", area: 620, yield: 75, price: 2350 },
  { name: "Onion", area: 450, yield: 90, price: 2800 },
];
const projectData = [
  { name: "NH-48 Widening", status: "In Progress", progress: 72, budget: 450, spent: 324, delay: 0 },
  { name: "Pune Metro Ph-2", status: "In Progress", progress: 45, budget: 1200, spent: 540, delay: 15 },
  { name: "Smart Water Grid", status: "In Progress", progress: 58, budget: 380, spent: 220, delay: 8 },
  { name: "District Hospital", status: "Delayed", progress: 35, budget: 280, spent: 98, delay: 45 },
  { name: "Rural Roads PKG-3", status: "On Track", progress: 88, budget: 150, spent: 132, delay: 0 },
  { name: "School Renovation", status: "Completed", progress: 100, budget: 85, spent: 82, delay: 0 },
];
const electionData = {
  totalVoters: 7850000,
  newRegistrations: 125000,
  pollingStations: 8542,
  readyStations: 8210,
  evmsTested: 97.2,
};
const disasterAlerts = [
  { type: "Flood Warning", severity: "high", area: "Maval, Mulshi", time: "2h ago" },
  { type: "Heavy Rainfall", severity: "medium", area: "Haveli, Bhor", time: "4h ago" },
  { type: "Landslide Risk", severity: "low", area: "Ambegaon Ghat", time: "6h ago" },
];
const dssRecommendations = [
  { module: "Revenue", priority: "high", alert: "Baramati tehsil projected to miss target by 18%", action: "Deploy 3 additional officers for arrears recovery in villages Morgaon, Phaltan, Indapur. Expected recovery: ₹24L", icon: IndianRupee },
  { module: "Health", priority: "critical", alert: "Dengue cases up 52% in Kothrud zone this week", action: "Initiate fogging in Kothrud, Karve Nagar. Set up 4 fever camps. Alert district hospital for surge capacity.", icon: Heart },
  { module: "Law & Order", priority: "medium", alert: "Predicted theft spike in Hadapsar (68% probability)", action: "Increase patrolling 8PM-2AM. Deploy 2 additional PCR vans. Coordinate with local beat officers.", icon: Shield },
  { module: "Disaster", priority: "critical", alert: "IMD: Heavy rainfall next 48hrs in Maval region", action: "Pre-position 8 boats at checkpoints. Issue evacuation advisory for 12 low-lying villages. Open 3 relief camps.", icon: CloudLightning },
  { module: "Education", priority: "medium", alert: "Dropout rate spike (8.2%) in Junnar block", action: "Deploy counsellors to 5 at-risk schools. Review mid-day meal quality. Coordinate family welfare support.", icon: GraduationCap },
];
const iotSensors = [
  { name: "AQI - Shivajinagar", value: 142, unit: "AQI", status: "moderate", icon: Wind },
  { name: "Water Level - Khadakwasla", value: 78, unit: "%", status: "good", icon: Droplets },
  { name: "Temp - PMC HQ", value: 34.2, unit: "°C", status: "high", icon: Thermometer },
  { name: "Traffic - Swargate", value: 856, unit: "veh/hr", status: "heavy", icon: Activity },
];

// ═══════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════

const COLORS = {
  navy: "#0f1729",
  navyLight: "#1a2744",
  navyMid: "#243352",
  accent: "#3b82f6",
  accentGlow: "rgba(59,130,246,0.15)",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#6366f1",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  cardBg: "rgba(26,39,68,0.7)",
  cardBorder: "rgba(59,130,246,0.12)",
  gridLine: "rgba(148,163,184,0.08)",
};

const priorityColors = { critical: COLORS.danger, high: COLORS.warning, medium: COLORS.accent, low: COLORS.success };

function KPICard({ title, value, suffix = "", trend, trendValue, icon: Icon, color = COLORS.accent, sparkData }) {
  const trendColor = trend === "up" ? COLORS.success : trend === "down" ? COLORS.danger : COLORS.textMuted;
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  return (
    <div style={{
      background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 16, padding: "20px 22px", position: "relative", overflow: "hidden",
      backdropFilter: "blur(20px)", transition: "all 0.3s ease",
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 0 24px ${color}22`; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.cardBorder; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: `${color}08` }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>{title}</span>
        {Icon && <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} color={color} />
        </div>}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: COLORS.textPrimary, letterSpacing: -0.5 }}>{value}</span>
        {suffix && <span style={{ fontSize: 13, color: COLORS.textSecondary }}>{suffix}</span>}
      </div>
      {trendValue && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <TrendIcon size={14} color={trendColor} />
          <span style={{ fontSize: 12, fontWeight: 600, color: trendColor }}>{trendValue}</span>
          <span style={{ fontSize: 11, color: COLORS.textMuted, marginLeft: 4 }}>vs last month</span>
        </div>
      )}
      {sparkData && (
        <div style={{ marginTop: 10, height: 36 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData}>
              <defs><linearGradient id={`spark-${title}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.3} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
              <Area type="monotone" dataKey="v" stroke={color} fill={`url(#spark-${title})`} strokeWidth={1.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function ProgressBar({ value, max = 100, color = COLORS.accent, height = 6, label }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      {label && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: COLORS.textSecondary }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textPrimary }}>{Math.round(pct)}%</span>
      </div>}
      <div style={{ width: "100%", height, borderRadius: height, background: COLORS.navyMid, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: height, background: `linear-gradient(90deg, ${color}, ${color}cc)`, transition: "width 1s ease" }} />
      </div>
    </div>
  );
}

function AlertBadge({ priority }) {
  const bg = { critical: "#ef444422", high: "#f59e0b22", medium: "#3b82f622", low: "#10b98122" };
  const col = priorityColors[priority];
  return (
    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", padding: "2px 8px", borderRadius: 4, background: bg[priority], color: col, letterSpacing: 0.5 }}>
      {priority}
    </span>
  );
}

function SectionCard({ title, children, action, style: extraStyle }) {
  return (
    <div style={{
      background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16,
      padding: 24, backdropFilter: "blur(20px)", ...extraStyle
    }}>
      {title && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: COLORS.textPrimary, letterSpacing: -0.2 }}>{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

function StatusDot({ status }) {
  const colors = { good: COLORS.success, moderate: COLORS.warning, high: COLORS.danger, heavy: COLORS.danger, normal: COLORS.success, delayed: COLORS.danger };
  const c = colors[status] || COLORS.textMuted;
  return <span style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "inline-block", boxShadow: `0 0 6px ${c}66` }} />;
}

// Tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{ background: COLORS.navyLight, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, padding: "10px 14px", fontSize: 12 }}>
      <div style={{ color: COLORS.textSecondary, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color, display: "inline-block" }} />
          <span>{p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong></span>
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE VIEWS
// ═══════════════════════════════════════════

function OverviewModule() {
  const spark = (base) => Array.from({ length: 12 }, (_, i) => ({ v: base + Math.random() * base * 0.3 }));
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <KPICard title="Revenue Collected (Cr)" value="₹1,847" trend="up" trendValue="+12.4%" icon={IndianRupee} color="#10b981" sparkData={spark(150)} />
        <KPICard title="Active Grievances" value="2,847" trend="down" trendValue="-8.2%" icon={MessageSquare} color="#f59e0b" sparkData={spark(280)} />
        <KPICard title="Crime Index" value="4.2" suffix="/10" trend="down" trendValue="-3.1%" icon={Shield} color="#3b82f6" sparkData={spark(4)} />
        <KPICard title="Scheme Coverage" value="89.4" suffix="%" trend="up" trendValue="+2.8%" icon={Users} color="#8b5cf6" sparkData={spark(85)} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
        <SectionCard title="Revenue Collection Trend (₹ Crore)">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.25} /><stop offset="100%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity={0.1} /><stop offset="100%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
              <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="target" stroke="#3b82f6" fill="url(#targetGrad)" strokeWidth={1.5} strokeDasharray="4 4" name="Target" dot={false} />
              <Area type="monotone" dataKey="actual" stroke="#10b981" fill="url(#revGrad)" strokeWidth={2} name="Actual" dot={false} />
              <Area type="monotone" dataKey="prev" stroke="#64748b" fill="none" strokeWidth={1} strokeDasharray="2 2" name="Previous Year" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="AI Decision Alerts">
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 260, overflowY: "auto" }}>
            {dssRecommendations.slice(0, 4).map((r, i) => (
              <div key={i} style={{ padding: 12, borderRadius: 10, background: COLORS.navyMid, border: `1px solid ${priorityColors[r.priority]}22` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.textSecondary }}>{r.module}</span>
                  <AlertBadge priority={r.priority} />
                </div>
                <p style={{ margin: 0, fontSize: 12, color: COLORS.textPrimary, lineHeight: 1.5 }}>{r.alert}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <SectionCard title="Department Performance">
          {[
            { name: "Revenue", score: 87, color: COLORS.success },
            { name: "Health", score: 74, color: COLORS.warning },
            { name: "Education", score: 81, color: COLORS.accent },
            { name: "Public Works", score: 68, color: COLORS.danger },
            { name: "Agriculture", score: 79, color: COLORS.success },
            { name: "Social Welfare", score: 91, color: COLORS.success },
          ].map((d, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <ProgressBar value={d.score} color={d.color} label={d.name} />
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Grievance Distribution">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={grievanceCategories} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" stroke="none">
                {grievanceCategories.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {grievanceCategories.map((g, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: COLORS.textSecondary }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: g.color, display: "inline-block" }} />
                {g.name} ({g.value}%)
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="IoT Sensor Network">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {iotSensors.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: COLORS.navyMid }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `${COLORS.accent}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.icon size={16} color={COLORS.accent} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{s.name}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.textPrimary }}>{s.value} <span style={{ fontSize: 11, fontWeight: 400, color: COLORS.textMuted }}>{s.unit}</span></div>
                </div>
                <StatusDot status={s.status} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <SectionCard title="Project Portfolio Status">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>{["Project", "Status", "Progress", "Budget (Cr)", "Delay"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 10px", color: COLORS.textMuted, fontWeight: 500, borderBottom: `1px solid ${COLORS.cardBorder}`, fontSize: 11 }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {projectData.map((p, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${COLORS.cardBorder}08` }}>
                    <td style={{ padding: "10px 10px", color: COLORS.textPrimary, fontWeight: 500 }}>{p.name}</td>
                    <td><span style={{
                      fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4,
                      background: p.status === "Completed" ? "#10b98122" : p.status === "Delayed" ? "#ef444422" : p.status === "On Track" ? "#3b82f622" : "#f59e0b22",
                      color: p.status === "Completed" ? COLORS.success : p.status === "Delayed" ? COLORS.danger : p.status === "On Track" ? COLORS.accent : COLORS.warning,
                    }}>{p.status}</span></td>
                    <td style={{ padding: "10px 10px" }}><ProgressBar value={p.progress} color={p.progress === 100 ? COLORS.success : p.delay > 30 ? COLORS.danger : COLORS.accent} height={4} /></td>
                    <td style={{ padding: "10px 10px", color: COLORS.textSecondary }}>₹{p.spent}/{p.budget}</td>
                    <td style={{ padding: "10px 10px", color: p.delay > 0 ? COLORS.danger : COLORS.success, fontWeight: 600 }}>{p.delay > 0 ? `${p.delay}d` : "On Time"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Scheme Implementation Tracker">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={schemeData} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} horizontal={false} />
              <XAxis type="number" tick={{ fill: COLORS.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
              <YAxis type="category" dataKey="name" tick={{ fill: COLORS.textSecondary, fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="disbursed" name="Disbursed %" radius={[0, 6, 6, 0]}>
                {schemeData.map((s, i) => <Cell key={i} fill={s.disbursed > 85 ? COLORS.success : s.disbursed > 70 ? COLORS.warning : COLORS.danger} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
    </div>
  );
}

function RevenueModule() {
  const tehsilData = [
    { name: "Pune City", target: 320, actual: 298, recovery: 93 },
    { name: "Haveli", target: 180, actual: 172, recovery: 96 },
    { name: "Baramati", target: 120, actual: 98, recovery: 82 },
    { name: "Junnar", target: 85, actual: 79, recovery: 93 },
    { name: "Maval", target: 95, actual: 88, recovery: 93 },
    { name: "Mulshi", target: 65, actual: 61, recovery: 94 },
    { name: "Shirur", target: 78, actual: 58, recovery: 74 },
    { name: "Indapur", target: 55, actual: 48, recovery: 87 },
  ];
  const certData = months.map(m => ({ name: m, domicile: 800+Math.floor(Math.random()*400), caste: 600+Math.floor(Math.random()*300), income: 900+Math.floor(Math.random()*500) }));
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <KPICard title="Total Revenue (FY)" value="₹1,847" suffix="Cr" trend="up" trendValue="+12.4%" icon={IndianRupee} color="#10b981" />
        <KPICard title="Arrears Outstanding" value="₹284" suffix="Cr" trend="down" trendValue="-5.1%" icon={AlertTriangle} color="#f59e0b" />
        <KPICard title="Mutations Pending" value="3,842" trend="down" trendValue="-12%" icon={FileText} color="#3b82f6" />
        <KPICard title="Certificates Issued (MTD)" value="12,450" trend="up" trendValue="+8.7%" icon={CheckCircle} color="#8b5cf6" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 16, marginBottom: 24 }}>
        <SectionCard title="Tehsil-wise Revenue Collection (₹ Crore)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tehsilData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
              <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: COLORS.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="target" name="Target" fill="#3b82f633" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="actual" name="Actual" radius={[4, 4, 0, 0]} barSize={20}>
                {tehsilData.map((t, i) => <Cell key={i} fill={t.recovery > 90 ? COLORS.success : t.recovery > 80 ? COLORS.warning : COLORS.danger} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard title="AI Revenue Predictions">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ padding: 14, borderRadius: 10, background: `${COLORS.danger}11`, border: `1px solid ${COLORS.danger}33` }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.danger, marginBottom: 6 }}>⚠ HIGH RISK - Shirur Tehsil</div>
              <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.6 }}>AI predicts 74% target achievement. Recommend deploying additional recovery officers in Pabal and Talegaon areas. Est. recoverable: ₹12Cr.</p>
            </div>
            <div style={{ padding: 14, borderRadius: 10, background: `${COLORS.warning}11`, border: `1px solid ${COLORS.warning}33` }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.warning, marginBottom: 6 }}>⚡ WATCH - Baramati Tehsil</div>
              <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.6 }}>82% target achieved. Anomaly detected: 15 land transactions flagged for unusual patterns. Review recommended.</p>
            </div>
            <div style={{ padding: 14, borderRadius: 10, background: `${COLORS.success}11`, border: `1px solid ${COLORS.success}33` }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.success, marginBottom: 6 }}>✓ ON TRACK - Haveli Tehsil</div>
              <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.6 }}>96% target achieved. Projected to exceed annual target by 4%. Strong agricultural loan recovery.</p>
            </div>
          </div>
        </SectionCard>
      </div>
      <SectionCard title="Certificate Issuance Trends (Monthly)">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={certData}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
            <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="domicile" stroke="#3b82f6" strokeWidth={2} dot={false} name="Domicile" />
            <Line type="monotone" dataKey="caste" stroke="#10b981" strokeWidth={2} dot={false} name="Caste" />
            <Line type="monotone" dataKey="income" stroke="#f59e0b" strokeWidth={2} dot={false} name="Income" />
            <Legend wrapperStyle={{ fontSize: 11, color: COLORS.textSecondary }} />
          </LineChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  );
}

function LawOrderModule() {
  const stationData = [
    { name: "Deccan", cases: 124, resolved: 98, pending: 26, responseTime: 8.2 },
    { name: "Kothrud", cases: 98, resolved: 82, pending: 16, responseTime: 7.5 },
    { name: "Hadapsar", cases: 156, resolved: 112, pending: 44, responseTime: 12.3 },
    { name: "Pimpri", cases: 142, resolved: 118, pending: 24, responseTime: 9.1 },
    { name: "Yerawada", cases: 87, resolved: 71, pending: 16, responseTime: 6.8 },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <KPICard title="Total Cases (YTD)" value="4,218" trend="down" trendValue="-6.2%" icon={Shield} color="#3b82f6" />
        <KPICard title="Conviction Rate" value="68.4" suffix="%" trend="up" trendValue="+3.1%" icon={Target} color="#10b981" />
        <KPICard title="Avg Response Time" value="8.4" suffix="min" trend="down" trendValue="-1.2m" icon={Clock} color="#f59e0b" />
        <KPICard title="Pending Cases" value="847" trend="down" trendValue="-15%" icon={FileText} color="#ef4444" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <SectionCard title="Crime Trend Analysis (Monthly)">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={crimeData}>
              <defs>
                <linearGradient id="theftG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ef4444" stopOpacity={0.2}/><stop offset="100%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
                <linearGradient id="assaultG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2}/><stop offset="100%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
                <linearGradient id="cyberG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2}/><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
              <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="theft" stroke="#ef4444" fill="url(#theftG)" strokeWidth={2} name="Theft" dot={false} />
              <Area type="monotone" dataKey="assault" stroke="#f59e0b" fill="url(#assaultG)" strokeWidth={2} name="Assault" dot={false} />
              <Area type="monotone" dataKey="cyber" stroke="#8b5cf6" fill="url(#cyberG)" strokeWidth={2} name="Cybercrime" dot={false} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard title="AI Predictive Policing - Hotspot Alerts">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { area: "Hadapsar East", risk: 78, type: "Theft/Burglary", time: "8PM-2AM", action: "Deploy 2 PCR vans" },
              { area: "Kothrud Market", risk: 65, type: "Chain Snatching", time: "6PM-10PM", action: "Increase foot patrol" },
              { area: "Swargate Bus Stand", risk: 58, type: "Pickpocketing", time: "Peak hours", action: "Plain-clothes deployment" },
              { area: "Hinjewadi IT Park", risk: 42, type: "Vehicle Theft", time: "Late night", action: "CCTV monitoring alert" },
            ].map((h, i) => (
              <div key={i} style={{ padding: 12, borderRadius: 10, background: COLORS.navyMid, display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${h.risk > 70 ? COLORS.danger : h.risk > 50 ? COLORS.warning : COLORS.accent}18`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14,
                  color: h.risk > 70 ? COLORS.danger : h.risk > 50 ? COLORS.warning : COLORS.accent }}>
                  {h.risk}%
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>{h.area}</div>
                  <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{h.type} · {h.time}</div>
                </div>
                <span style={{ fontSize: 10, padding: "4px 8px", borderRadius: 6, background: `${COLORS.accent}18`, color: COLORS.accent }}>{h.action}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <SectionCard title="Police Station Performance">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr>{["Station", "Total Cases", "Resolved", "Pending", "Resp. Time (min)", "Performance"].map(h => (
            <th key={h} style={{ textAlign: "left", padding: "10px 12px", color: COLORS.textMuted, fontWeight: 500, borderBottom: `1px solid ${COLORS.cardBorder}`, fontSize: 11 }}>{h}</th>
          ))}</tr></thead>
          <tbody>{stationData.map((s, i) => (
            <tr key={i}><td style={{ padding: "10px 12px", color: COLORS.textPrimary, fontWeight: 500 }}>{s.name}</td>
              <td style={{ padding: "10px 12px", color: COLORS.textSecondary }}>{s.cases}</td>
              <td style={{ padding: "10px 12px", color: COLORS.success }}>{s.resolved}</td>
              <td style={{ padding: "10px 12px", color: COLORS.danger }}>{s.pending}</td>
              <td style={{ padding: "10px 12px", color: s.responseTime > 10 ? COLORS.danger : COLORS.textSecondary }}>{s.responseTime}m</td>
              <td style={{ padding: "10px 12px", width: 140 }}><ProgressBar value={Math.round(s.resolved / s.cases * 100)} color={s.resolved / s.cases > 0.85 ? COLORS.success : COLORS.warning} height={4} /></td>
            </tr>
          ))}</tbody>
        </table>
      </SectionCard>
    </div>
  );
}

function DisasterModule() {
  const waterLevels = months.map(m => ({ name: m, khadakwasla: 40+Math.random()*55, panshet: 35+Math.random()*60, varasgaon: 45+Math.random()*50 }));
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <KPICard title="Active Alerts" value="3" icon={AlertTriangle} color="#ef4444" />
        <KPICard title="Relief Camps Ready" value="12" icon={Building2} color="#3b82f6" />
        <KPICard title="Rescue Teams Deployed" value="8" icon={Users} color="#f59e0b" />
        <KPICard title="Avg Response Time" value="22" suffix="min" trend="down" trendValue="-4min" icon={Clock} color="#10b981" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <SectionCard title="Active Disaster Alerts">
          {disasterAlerts.map((a, i) => (
            <div key={i} style={{ padding: 14, borderRadius: 10, background: COLORS.navyMid, marginBottom: 10,
              borderLeft: `3px solid ${a.severity === "high" ? COLORS.danger : a.severity === "medium" ? COLORS.warning : COLORS.success}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary }}>{a.type}</span>
                <AlertBadge priority={a.severity === "high" ? "critical" : a.severity} />
              </div>
              <div style={{ fontSize: 12, color: COLORS.textSecondary }}>Area: {a.area} · {a.time}</div>
            </div>
          ))}
          <div style={{ marginTop: 12, padding: 14, borderRadius: 10, background: `${COLORS.accent}11`, border: `1px solid ${COLORS.accent}33` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 8 }}>🧠 AI Recommendation</div>
            <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.6 }}>Based on IMD data and historical patterns, pre-position 10 rescue boats at Maval checkpoints. Evacuate 1,200 residents from 8 low-lying villages. Open relief camps at Talegaon and Lonavala community centres.</p>
          </div>
        </SectionCard>
        <SectionCard title="Reservoir Water Levels (%)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={waterLevels}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
              <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="khadakwasla" stroke="#3b82f6" strokeWidth={2} dot={false} name="Khadakwasla" />
              <Line type="monotone" dataKey="panshet" stroke="#10b981" strokeWidth={2} dot={false} name="Panshet" />
              <Line type="monotone" dataKey="varasgaon" stroke="#f59e0b" strokeWidth={2} dot={false} name="Varasgaon" />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
    </div>
  );
}

function HealthModule() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <KPICard title="Bed Occupancy" value="78" suffix="%" icon={Heart} color="#ef4444" />
        <KPICard title="Daily OPD" value="3,240" trend="up" trendValue="+5.2%" icon={Activity} color="#3b82f6" />
        <KPICard title="Vaccination Coverage" value="94.2" suffix="%" trend="up" trendValue="+1.8%" icon={CheckCircle} color="#10b981" />
        <KPICard title="108 Response Time" value="14" suffix="min" trend="down" trendValue="-2min" icon={Clock} color="#f59e0b" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <SectionCard title="Disease Surveillance Trend">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={healthData}>
              <defs>
                <linearGradient id="dengueG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ef4444" stopOpacity={0.3}/><stop offset="100%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
              <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="dengue" stroke="#ef4444" fill="url(#dengueG)" strokeWidth={2} name="Dengue" dot={false} />
              <Area type="monotone" dataKey="malaria" stroke="#f59e0b" fill="none" strokeWidth={2} name="Malaria" dot={false} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard title="AI Health Alerts">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ padding: 14, borderRadius: 10, background: `${COLORS.danger}11`, border: `1px solid ${COLORS.danger}33` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, fontWeight: 600, color: COLORS.danger }}>🔴 Dengue Outbreak Alert</span><AlertBadge priority="critical" /></div>
              <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.6 }}>52% increase in Kothrud zone. AI predicts 120+ cases next week. Fogging and fever camps recommended.</p>
            </div>
            <div style={{ padding: 14, borderRadius: 10, background: `${COLORS.warning}11`, border: `1px solid ${COLORS.warning}33` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.warning, marginBottom: 6 }}>⚠ Medicine Stock Alert</div>
              <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.6 }}>Paracetamol stock at 4 PHCs below 7-day threshold. AI forecasts depletion in 3 days. Procurement recommended.</p>
            </div>
            <div style={{ padding: 14, borderRadius: 10, background: `${COLORS.accent}11`, border: `1px solid ${COLORS.accent}33` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 6 }}>📊 Ambulance Optimisation</div>
              <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.6 }}>AI analysis: Reposition 2 ambulances from Bhor to Purandar between 6-10PM to reduce avg response by 6 minutes.</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function EducationModule() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <KPICard title="Total Enrollment" value="4.92" suffix="L" trend="up" trendValue="+3.2%" icon={GraduationCap} color="#8b5cf6" />
        <KPICard title="Student-Teacher Ratio" value="28:1" icon={Users} color="#3b82f6" />
        <KPICard title="Dropout Rate" value="3.8" suffix="%" trend="down" trendValue="-0.6%" icon={TrendingDown} color="#10b981" />
        <KPICard title="Mid-Day Meal" value="96.1" suffix="%" icon={CheckCircle} color="#f59e0b" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <SectionCard title="Enrollment vs Target by Level">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={educationData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
              <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="target" name="Target" fill="#3b82f633" radius={[4, 4, 0, 0]} barSize={24} />
              <Bar dataKey="enrolled" name="Enrolled" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={24} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard title="AI Dropout Risk Prediction">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { block: "Junnar", risk: "High", students: 342, factors: "Attendance <60%, economic hardship" },
              { block: "Ambegaon", risk: "Medium", students: 187, factors: "Distance to school, seasonal migration" },
              { block: "Bhor", risk: "Medium", students: 156, factors: "Gender gap, infrastructure deficit" },
              { block: "Velhe", risk: "Low", students: 89, factors: "Improving but needs monitoring" },
            ].map((b, i) => (
              <div key={i} style={{ padding: 12, borderRadius: 10, background: COLORS.navyMid }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>{b.block} Block</span>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                    background: b.risk === "High" ? "#ef444422" : b.risk === "Medium" ? "#f59e0b22" : "#10b98122",
                    color: b.risk === "High" ? COLORS.danger : b.risk === "Medium" ? COLORS.warning : COLORS.success }}>{b.risk} Risk</span>
                </div>
                <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{b.students} students at risk · {b.factors}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function GrievanceModule() {
  const trendData = months.map(m => ({ name: m, received: 400+Math.floor(Math.random()*200), resolved: 350+Math.floor(Math.random()*200), pending: 40+Math.floor(Math.random()*80) }));
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <KPICard title="Complaints (MTD)" value="2,847" trend="down" trendValue="-8.2%" icon={MessageSquare} color="#3b82f6" />
        <KPICard title="Resolution Rate" value="87.4" suffix="%" trend="up" trendValue="+4.1%" icon={CheckCircle} color="#10b981" />
        <KPICard title="Avg Resolution Time" value="4.2" suffix="days" trend="down" trendValue="-1.3d" icon={Clock} color="#f59e0b" />
        <KPICard title="Satisfaction Score" value="4.1" suffix="/5" trend="up" trendValue="+0.3" icon={Target} color="#8b5cf6" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
        <SectionCard title="Grievance Trend">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trendData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
              <XAxis dataKey="name" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="received" name="Received" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar dataKey="pending" name="Pending" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={16} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard title="NLP Complaint Analysis">
          <div style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 12 }}>Top complaint themes (AI-extracted):</div>
          {[
            { theme: "Water supply disruption", count: 342, pct: 28 },
            { theme: "Pothole complaints", count: 267, pct: 22 },
            { theme: "Power outage", count: 218, pct: 18 },
            { theme: "Garbage collection", count: 156, pct: 13 },
            { theme: "Drainage issues", count: 134, pct: 11 },
          ].map((t, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: COLORS.textPrimary }}>{t.theme}</span>
                <span style={{ fontSize: 11, color: COLORS.textMuted }}>{t.count}</span>
              </div>
              <ProgressBar value={t.pct} color={COLORS.accent} height={4} />
            </div>
          ))}
          <div style={{ marginTop: 14, padding: 10, borderRadius: 8, background: `${COLORS.info}11`, border: `1px solid ${COLORS.info}33` }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.info }}>🤖 Sentiment: Negative spike in Hadapsar (-12%)</div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function WelfareModule() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <KPICard title="Total Beneficiaries" value="5.56" suffix="L" icon={Users} color="#8b5cf6" />
        <KPICard title="DBT Success Rate" value="96.8" suffix="%" trend="up" trendValue="+1.2%" icon={CheckCircle} color="#10b981" />
        <KPICard title="Ghost Beneficiaries Flagged" value="1,247" icon={AlertTriangle} color="#ef4444" />
        <KPICard title="Aadhaar Seeding" value="98.2" suffix="%" icon={Lock} color="#3b82f6" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <SectionCard title="Scheme Performance">
          {schemeData.map((s, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.textPrimary }}>{s.name}</span>
                <span style={{ fontSize: 12, color: COLORS.textSecondary }}>{(s.beneficiaries/1000).toFixed(0)}K / {(s.target/1000).toFixed(0)}K</span>
              </div>
              <ProgressBar value={s.disbursed} color={s.disbursed > 85 ? COLORS.success : s.disbursed > 70 ? COLORS.warning : COLORS.danger} height={6} label={`Disbursement`} />
            </div>
          ))}
        </SectionCard>
        <SectionCard title="AI Fraud Detection">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ padding: 14, borderRadius: 10, background: `${COLORS.danger}11`, border: `1px solid ${COLORS.danger}33` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.danger, marginBottom: 6 }}>🔴 1,247 Ghost Beneficiaries Detected</div>
              <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.6 }}>AI cross-referenced Aadhaar, income, and property databases. 847 duplicate entries and 400 ineligible beneficiaries identified across PM-KISAN and pension schemes. Est. savings: ₹3.2Cr/year.</p>
            </div>
            <div style={{ padding: 14, borderRadius: 10, background: `${COLORS.warning}11`, border: `1px solid ${COLORS.warning}33` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.warning, marginBottom: 6 }}>⚠ 2,340 Eligible Non-Beneficiaries Found</div>
              <p style={{ margin: 0, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.6 }}>AI identified eligible citizens not enrolled in Ujjwala and scholarship schemes. Targeted outreach campaign recommended for Indapur and Bhor blocks.</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function AgricultureModule() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <KPICard title="Sowing Area" value="4,080" suffix="Ha" icon={Wheat} color="#10b981" />
        <KPICard title="Irrigation Coverage" value="62" suffix="%" trend="up" trendValue="+4.5%" icon={Droplets} color="#3b82f6" />
        <KPICard title="Crop Insurance" value="78" suffix="%" icon={Shield} color="#f59e0b" />
        <KPICard title="KCC Issued" value="34,500" trend="up" trendValue="+12%" icon={FileText} color="#8b5cf6" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <SectionCard title="Crop Performance Overview">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead><tr>{["Crop", "Area (Ha)", "Yield Index", "Market Price (₹/Q)"].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "10px 12px", color: COLORS.textMuted, fontWeight: 500, borderBottom: `1px solid ${COLORS.cardBorder}`, fontSize: 11 }}>{h}</th>
            ))}</tr></thead>
            <tbody>{cropData.map((c, i) => (
              <tr key={i}><td style={{ padding: "10px 12px", color: COLORS.textPrimary, fontWeight: 500 }}>{c.name}</td>
                <td style={{ padding: "10px 12px", color: COLORS.textSecondary }}>{c.area.toLocaleString()}</td>
                <td style={{ padding: "10px 12px", width: 120 }}><ProgressBar value={c.yield} color={c.yield > 80 ? COLORS.success : c.yield > 65 ? COLORS.warning : COLORS.danger} height={4} /></td>
                <td style={{ padding: "10px 12px", color: COLORS.textSecondary }}>₹{c.price.toLocaleString()}</td>
              </tr>
            ))}</tbody>
          </table>
        </SectionCard>
        <SectionCard title="AI Agricultural Advisory">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ padding: 12, borderRadius: 10, background: `${COLORS.success}11`, border: `1px solid ${COLORS.success}33` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.success, marginBottom: 4 }}>🌾 Yield Prediction: Sugarcane +12%</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary }}>Favourable rainfall and soil conditions predict above-average yield in Baramati and Indapur.</div>
            </div>
            <div style={{ padding: 12, borderRadius: 10, background: `${COLORS.danger}11`, border: `1px solid ${COLORS.danger}33` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.danger, marginBottom: 4 }}>🐛 Pest Alert: Fall Armyworm Risk</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary }}>AI detects 67% probability in Junnar/Ambegaon maize fields. Advisory issued to 4,200 farmers via SMS.</div>
            </div>
            <div style={{ padding: 12, borderRadius: 10, background: `${COLORS.accent}11`, border: `1px solid ${COLORS.accent}33` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 4 }}>📈 Onion Price Forecast: ₹3,200/Q next month</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary }}>Recommend farmers in Shirur to delay harvest by 2 weeks for better returns.</div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function ElectionModule() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <KPICard title="Total Voters" value="78.5" suffix="L" icon={Vote} color="#8b5cf6" />
        <KPICard title="New Registrations" value="1.25" suffix="L" icon={Users} color="#10b981" />
        <KPICard title="Polling Stations Ready" value="96.1" suffix="%" icon={Building2} color="#3b82f6" />
        <KPICard title="EVMs Tested" value="97.2" suffix="%" icon={CheckCircle} color="#f59e0b" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <SectionCard title="Election Preparedness Dashboard">
          {[
            { item: "Polling Stations Setup", completed: 8210, total: 8542 },
            { item: "EVM Deployment", completed: 8314, total: 8542 },
            { item: "Staff Training", completed: 24800, total: 26000 },
            { item: "Voter Slip Distribution", completed: 6800000, total: 7850000 },
            { item: "VVPAT Testing", completed: 8100, total: 8542 },
          ].map((e, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <ProgressBar value={(e.completed / e.total) * 100} color={e.completed / e.total > 0.95 ? COLORS.success : e.completed / e.total > 0.85 ? COLORS.warning : COLORS.danger} label={e.item} height={6} />
            </div>
          ))}
        </SectionCard>
        <SectionCard title="AI Election Insights">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ padding: 12, borderRadius: 10, background: `${COLORS.accent}11`, border: `1px solid ${COLORS.accent}33` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 4 }}>📊 Turnout Prediction: 67.2%</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary }}>Based on weather forecast (clear), historical patterns, and local event calendar. Urban turnout predicted lower at 58%.</div>
            </div>
            <div style={{ padding: 12, borderRadius: 10, background: `${COLORS.warning}11`, border: `1px solid ${COLORS.warning}33` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.warning, marginBottom: 4 }}>⚠ Expenditure Anomaly: 3 Candidates Flagged</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary }}>AI detected unusual spending patterns exceeding declared limits in Baramati and Shirur constituencies.</div>
            </div>
            <div style={{ padding: 12, borderRadius: 10, background: `${COLORS.success}11`, border: `1px solid ${COLORS.success}33` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.success, marginBottom: 4 }}>✓ Staff Allocation Optimised</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary }}>AI recommends redeployment of 140 staff from low-risk to 23 sensitive polling stations in Maval and Junnar.</div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function DSSModule() {
  return (
    <div>
      <SectionCard title="AI Decision Support System — Active Recommendations" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {dssRecommendations.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={i} style={{ padding: 18, borderRadius: 12, background: COLORS.navyMid, border: `1px solid ${priorityColors[r.priority]}22`,
                display: "grid", gridTemplateColumns: "48px 1fr auto", gap: 16, alignItems: "start" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${priorityColors[r.priority]}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={22} color={priorityColors[r.priority]} />
                </div>
                <div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary }}>{r.module}</span>
                    <AlertBadge priority={r.priority} />
                  </div>
                  <p style={{ margin: "0 0 8px", fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5 }}><strong style={{ color: COLORS.textPrimary }}>Alert:</strong> {r.alert}</p>
                  <div style={{ padding: 10, borderRadius: 8, background: `${COLORS.accent}08`, border: `1px solid ${COLORS.accent}22` }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.accent }}>🧠 AI Recommendation: </span>
                    <span style={{ fontSize: 12, color: COLORS.textSecondary }}>{r.action}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <button style={{ padding: "6px 14px", borderRadius: 6, border: "none", background: COLORS.accent, color: "white", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Accept</button>
                  <button style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${COLORS.cardBorder}`, background: "transparent", color: COLORS.textSecondary, fontSize: 11, cursor: "pointer" }}>Dismiss</button>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <SectionCard title="Scenario Simulation">
          <div style={{ padding: 16, borderRadius: 10, background: COLORS.navyMid, marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 10 }}>What-If: Increase Health Budget by 15%</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Bed Capacity", current: "78%", projected: "68%" },
                { label: "Medicine Stockout", current: "12 days/yr", projected: "4 days/yr" },
                { label: "108 Response", current: "14 min", projected: "9 min" },
                { label: "Vaccination", current: "94.2%", projected: "98.1%" },
              ].map((s, i) => (
                <div key={i} style={{ padding: 10, borderRadius: 8, background: COLORS.navy }}>
                  <div style={{ fontSize: 10, color: COLORS.textMuted, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 14, color: COLORS.textSecondary }}>{s.current}</span>
                    <span style={{ color: COLORS.success }}>→</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.success }}>{s.projected}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 11, color: COLORS.textMuted, fontStyle: "italic" }}>Confidence interval: 82-91% | Based on 5-year historical data</div>
        </SectionCard>

        <SectionCard title="Inter-District Benchmarking">
          {[
            { district: "Pune", score: 87, rank: 1 },
            { district: "Nashik", score: 82, rank: 2 },
            { district: "Satara", score: 79, rank: 3 },
            { district: "Kolhapur", score: 76, rank: 4 },
            { district: "Solapur", score: 71, rank: 5 },
          ].map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 4 ? `1px solid ${COLORS.cardBorder}` : "none" }}>
              <span style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, background: i === 0 ? COLORS.accent : COLORS.navyMid, color: i === 0 ? "white" : COLORS.textSecondary }}>
                {d.rank}
              </span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? COLORS.textPrimary : COLORS.textSecondary }}>{d.district}</span>
              <div style={{ width: 100 }}><ProgressBar value={d.score} color={i === 0 ? COLORS.accent : COLORS.textMuted} height={4} /></div>
              <span style={{ fontSize: 14, fontWeight: 700, color: i === 0 ? COLORS.accent : COLORS.textSecondary, width: 30, textAlign: "right" }}>{d.score}</span>
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════

const modules = [
  { id: "overview", label: "Strategic Overview", icon: LayoutDashboard },
  { id: "revenue", label: "Revenue", icon: IndianRupee },
  { id: "laworder", label: "Law & Order", icon: Shield },
  { id: "disaster", label: "Disaster Mgmt", icon: CloudLightning },
  { id: "health", label: "Health Services", icon: Heart },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "grievance", label: "Grievances", icon: MessageSquare },
  { id: "welfare", label: "Social Welfare", icon: Users },
  { id: "agriculture", label: "Agriculture", icon: Wheat },
  { id: "election", label: "Elections", icon: Vote },
  { id: "dss", label: "AI Decision Support", icon: Brain },
];

export default function App() {
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [time, setTime] = useState(new Date());
  const [alertCount] = useState(5);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const renderModule = () => {
    switch (active) {
      case "overview": return <OverviewModule />;
      case "revenue": return <RevenueModule />;
      case "laworder": return <LawOrderModule />;
      case "disaster": return <DisasterModule />;
      case "health": return <HealthModule />;
      case "education": return <EducationModule />;
      case "grievance": return <GrievanceModule />;
      case "welfare": return <WelfareModule />;
      case "agriculture": return <AgricultureModule />;
      case "election": return <ElectionModule />;
      case "dss": return <DSSModule />;
      default: return <OverviewModule />;
    }
  };

  const currentModule = modules.find(m => m.id === active);

  return (
    <div style={{
      display: "flex", height: "100vh", fontFamily: "'Segoe UI', -apple-system, sans-serif",
      background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0c1220 50%, #111827 100%)`,
      color: COLORS.textPrimary, overflow: "hidden",
    }}>
      {/* ───── SIDEBAR ───── */}
      <div style={{
        width: sidebarOpen ? 240 : 64, minWidth: sidebarOpen ? 240 : 64,
        background: "rgba(15,23,41,0.95)", borderRight: `1px solid ${COLORS.cardBorder}`,
        display: "flex", flexDirection: "column", transition: "all 0.3s ease",
        backdropFilter: "blur(20px)", zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{ padding: sidebarOpen ? "20px 18px" : "20px 14px", borderBottom: `1px solid ${COLORS.cardBorder}`, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${COLORS.accent}, #6366f1)`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Cpu size={18} color="white" />
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1.2 }}>DC Pune</div>
              <div style={{ fontSize: 10, color: COLORS.textMuted }}>AI Dashboard v1.0</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <div style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {modules.map(m => {
            const isActive = active === m.id;
            const Icon = m.icon;
            return (
              <button key={m.id} onClick={() => setActive(m.id)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: sidebarOpen ? "10px 14px" : "10px 0",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                borderRadius: 10, border: "none", cursor: "pointer", marginBottom: 2,
                background: isActive ? `${COLORS.accent}18` : "transparent",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = COLORS.navyMid; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon size={18} color={isActive ? COLORS.accent : COLORS.textMuted} />
                {sidebarOpen && <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? COLORS.accent : COLORS.textSecondary }}>{m.label}</span>}
                {isActive && sidebarOpen && <div style={{ marginLeft: "auto", width: 4, height: 16, borderRadius: 2, background: COLORS.accent }} />}
              </button>
            );
          })}
        </div>

        {/* Sidebar toggle */}
        <div style={{ padding: 12, borderTop: `1px solid ${COLORS.cardBorder}` }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            width: "100%", padding: 10, borderRadius: 8, border: "none", cursor: "pointer",
            background: COLORS.navyMid, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            {sidebarOpen ? <X size={16} color={COLORS.textMuted} /> : <Menu size={16} color={COLORS.textMuted} />}
            {sidebarOpen && <span style={{ fontSize: 12, color: COLORS.textMuted }}>Collapse</span>}
          </button>
        </div>
      </div>

      {/* ───── MAIN AREA ───── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{
          padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: `1px solid ${COLORS.cardBorder}`, background: "rgba(15,23,41,0.6)",
          backdropFilter: "blur(20px)",
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: COLORS.textPrimary, letterSpacing: -0.3 }}>
              {currentModule?.label}
            </h1>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>
              District Collector, Pune · {time.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, background: COLORS.navyMid }}>
              <Search size={14} color={COLORS.textMuted} />
              <span style={{ fontSize: 12, color: COLORS.textMuted }}>Search modules...</span>
            </div>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Bell size={20} color={COLORS.textSecondary} />
              <span style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: COLORS.danger,
                fontSize: 9, fontWeight: 700, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>{alertCount}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.accent}, #6366f1)`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white" }}>DC</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
          {renderModule()}
        </div>
      </div>
    </div>
  );
}
