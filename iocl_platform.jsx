import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, BarChart, Bar, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, ScatterChart, Scatter } from "recharts";

// ── Real data extracted from catalytic_cracking_dataset.csv ─────────────────
const TS = ["01-01 00:00","01-01 01:05","01-01 02:10","01-01 03:15","01-01 04:20","01-01 05:25","01-01 06:30","01-01 07:35","01-01 08:40","01-01 09:50","01-01 10:55","01-01 12:00","01-01 13:05","01-01 14:10","01-01 15:15","01-01 16:20","01-01 17:25","01-01 18:35","01-01 19:40","01-01 20:45","01-01 21:50","01-01 22:55","01-02 00:00","01-02 01:05","01-02 02:10","01-02 03:20","01-02 04:25","01-02 05:30","01-02 06:35","01-02 07:40","01-02 08:45","01-02 09:50","01-02 10:55","01-02 12:05","01-02 13:10","01-02 14:15","01-02 15:20","01-02 16:25","01-02 17:30","01-02 18:35","01-02 19:40","01-02 20:45","01-02 21:55","01-02 23:00","01-03 00:05","01-03 01:10","01-03 02:15","01-03 03:20","01-03 04:25","01-03 05:30","01-03 06:40","01-03 07:45","01-03 08:50","01-03 09:55","01-03 11:00","01-03 12:05","01-03 13:10","01-03 14:15","01-03 15:25","01-03 16:30","01-03 17:35","01-03 18:40","01-03 19:45","01-03 20:50","01-03 21:55","01-03 23:00","01-04 00:10","01-04 01:15","01-04 02:20","01-04 03:25","01-04 04:30","01-04 05:35","01-04 06:40","01-04 07:45","01-04 08:50","01-04 10:00","01-04 11:05","01-04 12:10","01-04 13:15","01-04 14:20","01-04 15:25","01-04 16:30","01-04 17:35","01-04 18:45","01-04 19:50","01-04 20:55","01-04 22:00","01-04 23:05","01-05 00:10","01-05 01:15","01-05 02:20","01-05 03:30","01-05 04:35","01-05 05:40","01-05 06:45","01-05 07:50","01-05 08:55","01-05 10:00","01-05 11:05","01-05 12:15"];
const RT_VALS = [536.13,541.94,490.79,523.34,515.6,509.13,490.73,486.24,546.2,528.35,554.4,493.01,525.1,480.97,498.81,510.48,524.34,504.82,541.39,512.77,539.91,538.59,529.76,508.87,486.38,547.12,505.21,524.61,504.93,537.57,506.23,542.15,491.08,521.83,496.87,493.31,527.47,517.2,544.23,526.25,554.62,538.64,496.56,512.76,543.8,515.95,524.22,545.04,538.9,552.82,515.16,506.58,520.64,521.52,537.94,512.1,491.16,542.8,547.38,551.03,547.74,488.92,512.96,553.38,480.07,502.08,482.98,539.46,558.72,545.98,552.05,494.1,523.6,511.12,491.63,525.79,493.0,480.07,558.75,487.36,488.38,545.88,502.2,508.41,521.23,507.15,492.32,556.57,501.65,514.78,483.21,544.41,518.35,559.73,483.25,483.23,505.35,524.51,521.72,506.52];
const RT_SP  = [539.28,502.65,526.75,525.02,537.54,517.57,502.06,526.57,518.94,517.57,533.5,510.62,532.28,501.71,522.16,538.72,502.24,534.12,529.51,508.27,506.94,536.75,525.2,538.54,521.52,514.12,502.09,532.69,531.17,503.84,518.99,536.91,538.18,525.66,538.81,509.33,531.61,531.9,536.08,522.63,527.1,538.78,507.95,519.72,519.47,504.9,525.68,523.6,535.27,531.23,529.52,530.75,532.8,522.22,516.25,533.02,513.87,534.9,522.65,537.15,536.09,518.96,526.09,518.79,500.19,523.43,535.06,505.81,503.77,536.15,510.23,538.76,523.45,500.05,507.15,537.86,517.03,518.65,519.87,532.77,533.81,528.62,537.26,510.51,518.28,528.64,504.73,519.05,525.18,512.02,527.93,535.96,533.49,507.37,523.28,508.05,532.06,523.25,510.79,502.84];
const PY_VALS = [48.26,54.55,47.52,59.45,45.03,47.86,43.6,55.83,46.35,42.84,46.17,48.72,47.37,40.02,47.94,58.02,47.27,55.03,44.99,56.38,42.34,59.05,44.56,52.47,59.92,46.9,47.93,52.42,53.83,44.2,46.21,58.69,51.67,44.17,47.03,58.52,47.5,51.18,47.49,51.91,49.04,56.85,52.77,53.82,55.03,46.99,50.88,45.78,44.09,50.09,50.27,59.05,54.91,54.05,41.21,57.96,40.54,58.98,51.58,58.23,46.81,49.92,58.54,49.82,42.77,49.24,56.83,56.06,55.55,53.24,48.37,48.32,49.52,48.89,44.37,53.08,57.44,54.38,58.42,55.44,46.93,56.63,40.76,56.25,42.26,59.56,52.68,46.9,50.28,47.87,43.94,57.15,55.42,46.78,40.46,56.21,40.71,57.94,43.89,47.48];
const CR_VALS = [86.51,82.26,85.72,79.79,79.89,77.46,70.52,73.76,86.6,89.53,86.17,73.4,85.35,83.27,74.3,80.08,89.8,82.26,87.55,71.79,76.07,75.33,83.41,89.01,75.45,87.93,84.2,85.94,79.08,86.84,86.77,80.29,85.88,78.17,71.12,89.26,84.35,81.18,70.65,83.0,86.42,78.67,89.36,88.22,86.78,70.05,83.64,76.75,70.55,77.4,76.35,72.69,70.17,87.85,73.65,87.56,76.34,84.97,88.02,88.18,71.47,70.3,79.83,85.73,80.43,86.3,76.19,78.53,78.01,78.56,79.25,83.48,88.34,83.62,72.58,82.48,73.88,89.4,89.77,79.28,78.59,85.26,80.45,71.17,86.95,83.85,70.86,85.79,73.51,77.33,74.01,89.83,81.5,86.71,84.72,82.96,73.26,78.34,75.42,84.45];

const SPC = { mean:520.51, ucl:590.62, lcl:450.40, ucl1:543.88, lcl1:497.14, ucl2:567.25, lcl2:473.77 };

const CAPABILITY = [
  { param:"Product Yield",        mean:49.75, std:5.67, lsl:40, usl:60, cp:0.588, cpk:0.574, sigma:1.72 },
  { param:"Conversion Rate",      mean:80.21, std:5.74, lsl:70, usl:90, cp:0.581, cpk:0.568, sigma:1.71 },
  { param:"Reactor Temperature",  mean:520.51,std:23.37,lsl:480,usl:560,cp:0.571, cpk:0.563, sigma:1.69 },
  { param:"Reactor Pressure",     mean:200.55,std:29.0, lsl:150,usl:250,cp:0.575, cpk:0.568, sigma:1.71 },
  { param:"Energy Consumption",   mean:150.50,std:29.07,lsl:100,usl:200,cp:0.573, cpk:0.568, sigma:1.70 },
];

const BOTTLENECK = [
  { param:"Feed Flow Rate",          cv:23.56, util:88 },
  { param:"Energy Consumption",      cv:19.31, util:82 },
  { param:"Catalyst to Oil Ratio",   cv:19.15, util:79 },
  { param:"Reactor Pressure",        cv:14.46, util:74 },
  { param:"Catalyst Activity",       cv:14.46, util:71 },
  { param:"Product Yield",           cv:11.39, util:65 },
  { param:"Conversion Rate",         cv:7.16,  util:58 },
  { param:"Reactor Temperature",     cv:4.49,  util:42 },
  { param:"Regenerator Temperature", cv:4.14,  util:38 },
];

const DISTURBANCE = [
  { type:"AirFlow Fluctuation", count:119, pct:63.0 },
  { type:"Power Dip",           count:60,  pct:31.7 },
  { type:"Feed Change Event",   count:124, pct:65.6 },
  { type:"Catalyst Replace",    count:56,  pct:29.6 },
];

const CORRELATIONS = [
  { param:"Fractionator Bottom Temp", r:0.059 },
  { param:"Energy Consumption",       r:0.057 },
  { param:"Fractionator Top Temp",    r:0.040 },
  { param:"Feed Flow Rate",           r:0.028 },
  { param:"Catalyst to Oil Ratio",    r:0.011 },
  { param:"Reactor Temperature",      r:-0.012 },
  { param:"Air Flow Rate",            r:-0.025 },
  { param:"Reactor Pressure",         r:-0.018 },
  { param:"Feedstock Quality Index",  r:-0.069 },
  { param:"Regenerator Temperature",  r:-0.073 },
];

const DMAIC_PHASES = [
  { phase:"Define",   done:true,  desc:"CDU naphtha yield below target. Cpk=0.57. 4.5-day dataset from Jan 2025." },
  { phase:"Measure",  done:true,  desc:"1300 readings, 27 parameters. Product Yield avg 49.75%, σ=5.67. 179 disturbance events." },
  { phase:"Analyze",  done:true,  desc:"RCA complete. AirFlow Fluctuation: 119 events. Feed_Flow_Rate highest CV at 23.56%." },
  { phase:"Improve",  done:false, desc:"Target: reduce Feed_Flow_Rate CV below 15%. Stabilise Air Flow during disturbances." },
  { phase:"Control",  done:false, desc:"SPC control charts with Western Electric rules for Product_Yield and Feed_Flow_Rate." },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const spcData = TS.map((t,i) => {
  const v = RT_VALS[i];
  const violated = v > SPC.ucl || v < SPC.lcl;
  const warn2    = !violated && (v > SPC.ucl2 || v < SPC.lcl2);
  return { t, v, sp: RT_SP[i], violated, warn2 };
});

const yieldData = TS.map((t,i) => ({ t, yield: PY_VALS[i], cr: CR_VALS[i] }));

const cpkColor = (cpk) => cpk >= 1.33 ? "#22c55e" : cpk >= 1.0 ? "#f59e0b" : "#ef4444";
const sigmaLabel = (s) => s >= 6 ? "World class" : s >= 4 ? "Good" : s >= 3 ? "Average" : "Needs work";

const IOCL_RED  = "#C8102E";
const IOCL_BLUE = "#003087";
const TICK = { fontSize: 10, fill: "#6b7280" };

// ── Components ────────────────────────────────────────────────────────────────
function KPI({ label, value, unit, sub, color="#111827" }) {
  return (
    <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:10, padding:"14px 18px", minWidth:140 }}>
      <div style={{ fontSize:11, color:"#6b7280", marginBottom:4 }}>{label}</div>
      <div style={{ fontSize:26, fontWeight:700, color }}>{value}<span style={{ fontSize:13, fontWeight:400, color:"#9ca3af", marginLeft:3 }}>{unit}</span></div>
      {sub && <div style={{ fontSize:11, color:"#9ca3af", marginTop:2 }}>{sub}</div>}
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ borderLeft:`4px solid ${IOCL_RED}`, paddingLeft:12, marginBottom:18 }}>
      <div style={{ fontSize:16, fontWeight:700, color:"#111827" }}>{title}</div>
      {subtitle && <div style={{ fontSize:12, color:"#6b7280", marginTop:2 }}>{subtitle}</div>}
    </div>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding:"8px 16px", fontSize:13, fontWeight: active ? 600 : 400,
      color: active ? IOCL_RED : "#6b7280",
      borderBottom: active ? `2px solid ${IOCL_RED}` : "2px solid transparent",
      background:"none", border:"none", borderBottom: active ? `2px solid ${IOCL_RED}` : "2px solid transparent",
      cursor:"pointer"
    }}>{label}</button>
  );
}

// ══ PAGE: Historical Analysis ════════════════════════════════════════════════
function HistoricalPage() {
  const [param, setParam] = useState("yield");
  const data = param === "yield" ? yieldData : spcData;
  return (
    <div>
      <SectionHeader title="Historical Process Analysis" subtitle="Catalytic Cracking Unit — 1,300 readings, Jan 1–5 2025 (5-min intervals)" />
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:20 }}>
        <KPI label="Total Records"       value="1,300"  unit=""       sub="5-min intervals" />
        <KPI label="Date Range"          value="4.5"    unit="days"   sub="Jan 1–5, 2025" />
        <KPI label="Avg Product Yield"   value="49.75"  unit="%"      sub="σ = 5.67" color={IOCL_RED} />
        <KPI label="Avg Conversion Rate" value="80.21"  unit="%"      sub="σ = 5.74" color={IOCL_BLUE} />
        <KPI label="Disturbance Events"  value="179"    unit=""       sub="Air + Power + Feed" />
        <KPI label="Avg Reward Score"    value="0.371"  unit=""       sub="Control metric" />
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        <button onClick={()=>setParam("yield")} style={{ padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:500, border:"1px solid", borderColor: param==="yield"?IOCL_RED:"#d1d5db", background: param==="yield"?IOCL_RED:"#fff", color: param==="yield"?"#fff":"#374151", cursor:"pointer" }}>Product Yield & Conversion Rate</button>
        <button onClick={()=>setParam("temp")}  style={{ padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:500, border:"1px solid", borderColor: param==="temp" ?IOCL_RED:"#d1d5db", background: param==="temp" ?IOCL_RED:"#fff", color: param==="temp" ?"#fff":"#374151", cursor:"pointer" }}>Reactor Temperature vs Setpoint</button>
      </div>

      <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:10, padding:"16px 8px 8px" }}>
        <ResponsiveContainer width="100%" height={280}>
          {param === "yield" ? (
            <LineChart data={yieldData} margin={{left:0,right:10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="t" tick={TICK} interval={14} />
              <YAxis tick={TICK} domain={[38,92]} />
              <Tooltip contentStyle={{ fontSize:11 }} />
              <ReferenceLine y={60} stroke="#ef4444" strokeDasharray="4 2" label={{ value:"USL 60%", fontSize:10, fill:"#ef4444" }} />
              <ReferenceLine y={40} stroke="#ef4444" strokeDasharray="4 2" label={{ value:"LSL 40%", fontSize:10, fill:"#ef4444" }} />
              <Line type="monotone" dataKey="yield" stroke={IOCL_RED}  dot={false} strokeWidth={1.5} name="Product Yield %" />
              <Line type="monotone" dataKey="cr"    stroke={IOCL_BLUE} dot={false} strokeWidth={1.5} name="Conversion Rate %" />
            </LineChart>
          ) : (
            <LineChart data={spcData} margin={{left:0,right:10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="t" tick={TICK} interval={14} />
              <YAxis tick={TICK} domain={[440,600]} />
              <Tooltip contentStyle={{ fontSize:11 }} />
              <ReferenceLine y={SPC.ucl} stroke="#ef4444" strokeDasharray="4 2" label={{ value:"UCL 590.6", fontSize:9, fill:"#ef4444" }} />
              <ReferenceLine y={SPC.lcl} stroke="#ef4444" strokeDasharray="4 2" label={{ value:"LCL 450.4", fontSize:9, fill:"#ef4444" }} />
              <ReferenceLine y={SPC.mean} stroke="#6b7280" strokeDasharray="2 2" label={{ value:"Mean 520.5", fontSize:9, fill:"#6b7280" }} />
              <Line type="monotone" dataKey="v"  stroke={IOCL_RED}  dot={(p)=> p.payload.violated ? <circle cx={p.cx} cy={p.cy} r={4} fill="#ef4444" stroke="#fff" strokeWidth={1}/> : null} strokeWidth={1.5} name="Reactor Temp °C" />
              <Line type="monotone" dataKey="sp" stroke="#9ca3af" dot={false} strokeWidth={1} strokeDasharray="3 3" name="Setpoint °C" />
            </LineChart>
          )}
        </ResponsiveContainer>
        <div style={{ fontSize:11, color:"#9ca3af", textAlign:"center", marginTop:4 }}>Jan 1–5, 2025 (100 sampled points)</div>
      </div>

      <div style={{ marginTop:20, background:"#f8fafc", border:"1px solid #e5e7eb", borderRadius:10, padding:16 }}>
        <div style={{ fontSize:13, fontWeight:600, marginBottom:10, color:"#374151" }}>Key Findings from Historical Analysis</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {[
            ["Process spread", "Product Yield ranges 40–60% (full spec width consumed by natural variation)"],
            ["Setpoint tracking", "Reactor Temp deviates ±59°C from setpoint — poor PID tracking"],
            ["Disturbances", "179 logged disturbance events over 4.5 days = 1 event every ~36 min"],
            ["AirFlow impact", "119 AirFlow Fluctuation events — most frequent disturbance type"],
          ].map(([k,v]) => (
            <div key={k} style={{ background:"#fff", borderRadius:8, padding:"10px 12px", border:"1px solid #e5e7eb" }}>
              <div style={{ fontSize:11, fontWeight:600, color:IOCL_BLUE, marginBottom:3 }}>{k}</div>
              <div style={{ fontSize:12, color:"#4b5563" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══ PAGE: Root-Cause Analysis ════════════════════════════════════════════════
function RCAPage() {
  const [selected, setSelected] = useState(null);
  const sortedCorr = [...CORRELATIONS].sort((a,b)=>Math.abs(b.r)-Math.abs(a.r));

  return (
    <div>
      <SectionHeader title="Root-Cause Analysis" subtitle="Correlation with Product Yield · Disturbance Pareto · Fishbone structure" />

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        {/* Correlation bar chart */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:10, padding:14 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:10 }}>Pearson Correlation with Product Yield</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={sortedCorr} layout="vertical" margin={{left:0,right:10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis type="number" tick={TICK} domain={[-0.12,0.12]} />
              <YAxis type="category" dataKey="param" tick={{ fontSize:9, fill:"#374151" }} width={140} />
              <Tooltip contentStyle={{ fontSize:11 }} formatter={(v)=>[v.toFixed(4),"r"]} />
              <ReferenceLine x={0} stroke="#6b7280" />
              <Bar dataKey="r" radius={3}>
                {sortedCorr.map((e,i)=><Cell key={i} fill={e.r>=0?IOCL_BLUE:IOCL_RED} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ fontSize:11, color:"#9ca3af", marginTop:6 }}>Note: all correlations are weak (|r|&lt;0.1). Process is highly non-linear — disturbance events are stronger root causes than individual parameter levels.</div>
        </div>

        {/* Disturbance Pareto */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:10, padding:14 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:10 }}>Disturbance Event Pareto</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={DISTURBANCE} margin={{left:0,right:10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="type" tick={{ fontSize:9, fill:"#374151" }} />
              <YAxis tick={TICK} />
              <Tooltip contentStyle={{ fontSize:11 }} />
              <Bar dataKey="count" fill={IOCL_RED} radius={4} name="Event Count" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:6 }}>
            {DISTURBANCE.map(d=>(
              <div key={d.type} style={{ fontSize:11, color:"#374151", background:"#f3f4f6", borderRadius:6, padding:"3px 8px" }}>
                {d.type}: <b>{d.count}</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fishbone */}
      <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:10, padding:16 }}>
        <div style={{ fontSize:13, fontWeight:600, marginBottom:12 }}>Ishikawa (Fishbone) Diagram — Low Product Yield</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {[
            { cat:"Machine", color:"#ef4444", items:["Reactor temperature deviation (±59°C from SP)","Regenerator temp fluctuation (CV 4.14%)","Fractionator column instability"] },
            { cat:"Method",  color:"#f59e0b", items:["PID controller suboptimal (Kp range 0.1–2.0)","Fuzzy logic adjustment not stabilising","Setpoint tracking lag observed"] },
            { cat:"Material",color:"#3b82f6", items:["Feedstock Quality Index varies 0.6–1.0","Feed_Change_Event: 124 occurrences","Catalyst activity varies 60–99.9%"] },
            { cat:"Manpower",color:"#8b5cf6", items:["Shift changeover disturbances","Operator setpoint adjustments","Manual catalyst replacement (56 events)"] },
            { cat:"Measurement",color:"#06b6d4",items:["Reward Score proxy for control quality","Control Stability Index range 0.80–1.0","Air flow sensor fluctuation events"] },
            { cat:"Env / External",color:"#10b981",items:["AirFlow Fluctuation: 119 events","Power Dip events: 60 occurrences","External disturbance type logged"] },
          ].map(({cat,color,items})=>(
            <div key={cat} style={{ border:`1px solid ${color}30`, borderRadius:8, padding:10, background:`${color}08` }}
                 onClick={()=>setSelected(selected===cat?null:cat)} style={{ cursor:"pointer", border:`2px solid ${selected===cat?color:color+"30"}`, borderRadius:8, padding:10, background:`${color}08` }}>
              <div style={{ fontSize:11, fontWeight:700, color, marginBottom:6 }}>{cat}</div>
              {items.map(it=>(
                <div key={it} style={{ fontSize:11, color:"#374151", padding:"2px 0", borderBottom:"1px solid #f3f4f6" }}>• {it}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop:12, padding:"10px 14px", background:"#fef2f2", borderRadius:8, border:"1px solid #fecaca" }}>
          <span style={{ fontSize:12, fontWeight:600, color:IOCL_RED }}>Primary root causes: </span>
          <span style={{ fontSize:12, color:"#374151" }}>AirFlow Fluctuation (119 events) + poor PID setpoint tracking (±59°C deviation) + Feed Flow Rate instability (CV=23.56%) are the top 3 drivers of yield variability.</span>
        </div>
      </div>
    </div>
  );
}

// ══ PAGE: SPC & Six Sigma ════════════════════════════════════════════════════
function SPCPage() {
  const [selParam, setSelParam] = useState(0);
  const cap = CAPABILITY[selParam];

  // Gauge helper
  const GaugeBar = ({ val, min, max, lsl, usl, mean }) => {
    const pct = v => Math.max(0,Math.min(100,(v-min)/(max-min)*100));
    return (
      <div style={{ position:"relative", height:28, background:"#f3f4f6", borderRadius:6, margin:"10px 0" }}>
        <div style={{ position:"absolute", left:`${pct(lsl)}%`, width:`${pct(usl)-pct(lsl)}%`, height:"100%", background:"#d1fae5", borderRadius:4 }} />
        <div style={{ position:"absolute", left:`${pct(mean)}%`, transform:"translateX(-50%)", height:"100%", width:2, background:"#6b7280" }} />
        <div style={{ position:"absolute", left:`${pct(val)}%`, transform:"translateX(-50%)", height:"100%", width:3, background:IOCL_RED, borderRadius:2 }} />
        <div style={{ position:"absolute", left:`${pct(lsl)}%`, top:"110%", fontSize:9, color:"#6b7280", transform:"translateX(-50%)" }}>LSL</div>
        <div style={{ position:"absolute", left:`${pct(usl)}%`, top:"110%", fontSize:9, color:"#6b7280", transform:"translateX(-50%)" }}>USL</div>
      </div>
    );
  };

  // Western Electric rules check on RT data
  const we_violations = useMemo(()=>{
    const violations = [];
    const mean = SPC.mean, std = (SPC.ucl-SPC.mean)/3;
    RT_VALS.forEach((v,i)=>{
      if(v > SPC.ucl || v < SPC.lcl) violations.push({i, t:TS[i], v, rule:"Rule 1: Beyond 3σ"});
    });
    // Rule 2: 2 of 3 beyond 2σ
    for(let i=2;i<RT_VALS.length;i++){
      const seg = RT_VALS.slice(i-2,i+1);
      const beyond2 = seg.filter(v=> v > SPC.ucl2 || v < SPC.lcl2).length;
      if(beyond2>=2 && !violations.find(vv=>vv.i===i))
        violations.push({i, t:TS[i], v:RT_VALS[i], rule:"Rule 2: 2 of 3 beyond 2σ"});
    }
    return violations.slice(0,8);
  },[]);

  return (
    <div>
      <SectionHeader title="SPC & Six Sigma Module" subtitle="Western Electric Rules · Cp/Cpk · DMAIC tracking" />

      {/* Capability cards */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
        {CAPABILITY.map((c,i)=>(
          <div key={c.param} onClick={()=>setSelParam(i)} style={{
            padding:"10px 14px", borderRadius:10, cursor:"pointer",
            border:`2px solid ${i===selParam?IOCL_RED:"#e5e7eb"}`,
            background: i===selParam?"#fff8f8":"#fff", minWidth:130
          }}>
            <div style={{ fontSize:11, color:"#6b7280", marginBottom:4 }}>{c.param}</div>
            <div style={{ fontSize:20, fontWeight:700, color:cpkColor(c.cpk) }}>Cpk {c.cpk}</div>
            <div style={{ fontSize:11, color:"#9ca3af" }}>{c.sigma}σ · {sigmaLabel(c.sigma)}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        {/* Selected parameter detail */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:10, padding:16 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>{cap.param} — Capability Study</div>
          <GaugeBar val={cap.mean} min={cap.lsl-(cap.usl-cap.lsl)*0.2} max={cap.usl+(cap.usl-cap.lsl)*0.2} lsl={cap.lsl} usl={cap.usl} mean={cap.mean} />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginTop:18 }}>
            {[["Cp", cap.cp],["Cpk",cap.cpk],["Sigma",cap.sigma],["Mean",cap.mean],["Std Dev",cap.std],["USL-LSL",cap.usl-cap.lsl]].map(([l,v])=>(
              <div key={l} style={{ textAlign:"center", background:"#f8fafc", borderRadius:8, padding:"8px 4px" }}>
                <div style={{ fontSize:11, color:"#6b7280" }}>{l}</div>
                <div style={{ fontSize:16, fontWeight:700, color: l==="Cpk"?cpkColor(cap.cpk):"#111827" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:12, padding:"8px 12px", background:"#fef2f2", borderRadius:8, border:"1px solid #fecaca", fontSize:12 }}>
            <b style={{color:IOCL_RED}}>Interpretation:</b> Cpk = {cap.cpk} &lt; 1.0 means the process is <b>NOT capable</b> of meeting specifications consistently. Target Cpk ≥ 1.33 for Six Sigma compliance.
          </div>
        </div>

        {/* Cpk comparison bar */}
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:10, padding:16 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:10 }}>Cpk Comparison — All Parameters</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CAPABILITY} margin={{left:0,right:10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="param" tick={{ fontSize:9, fill:"#374151" }} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={TICK} domain={[0,1.5]} />
              <Tooltip contentStyle={{ fontSize:11 }} />
              <ReferenceLine y={1.0}  stroke="#f59e0b" strokeDasharray="4 2" label={{ value:"Min 1.0", fontSize:9, fill:"#f59e0b" }} />
              <ReferenceLine y={1.33} stroke="#22c55e" strokeDasharray="4 2" label={{ value:"Target 1.33", fontSize:9, fill:"#22c55e" }} />
              <Bar dataKey="cpk" radius={4} name="Cpk">
                {CAPABILITY.map((c,i)=><Cell key={i} fill={cpkColor(c.cpk)} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ fontSize:11, color:"#9ca3af", textAlign:"center", marginTop:4 }}>All Cpk values ≈ 0.57 — uniform process incapability across parameters</div>
        </div>
      </div>

      {/* WE Rule Violations */}
      <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:10, padding:16 }}>
        <div style={{ fontSize:13, fontWeight:600, marginBottom:10 }}>Western Electric Rule Violations — Reactor Temperature</div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ background:"#f8fafc" }}>
                {["#","Timestamp","Value (°C)","Rule Triggered","Action"].map(h=>(
                  <th key={h} style={{ padding:"8px 12px", textAlign:"left", fontSize:11, color:"#6b7280", borderBottom:"1px solid #e5e7eb" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {we_violations.map((v,i)=>(
                <tr key={i} style={{ borderBottom:"1px solid #f3f4f6" }}>
                  <td style={{ padding:"7px 12px", color:"#6b7280" }}>{i+1}</td>
                  <td style={{ padding:"7px 12px", fontFamily:"monospace" }}>{v.t}</td>
                  <td style={{ padding:"7px 12px", fontWeight:600, color:IOCL_RED }}>{v.v.toFixed(2)}</td>
                  <td style={{ padding:"7px 12px" }}><span style={{ background:"#fef2f2", color:IOCL_RED, padding:"2px 8px", borderRadius:12, fontSize:11 }}>{v.rule}</span></td>
                  <td style={{ padding:"7px 12px", fontSize:11, color:"#374151" }}>Investigate feed rate & air flow</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ══ PAGE: Bottleneck ════════════════════════════════════════════════════════
function BottleneckPage() {
  const sorted = [...BOTTLENECK].sort((a,b)=>b.cv-a.cv);
  return (
    <div>
      <SectionHeader title="Bottleneck Identification" subtitle="Coefficient of Variation analysis · Utilisation ranking" />
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:20 }}>
        <KPI label="Primary Bottleneck" value="Feed Flow Rate" unit="" sub="CV = 23.56%" color={IOCL_RED} />
        <KPI label="2nd Bottleneck"     value="Energy Consumption" unit="" sub="CV = 19.31%" color="#f59e0b" />
        <KPI label="3rd Bottleneck"     value="Catalyst/Oil Ratio" unit="" sub="CV = 19.15%" color="#f59e0b" />
        <KPI label="Most Stable"        value="Regen. Temperature" unit="" sub="CV = 4.14%" color="#22c55e" />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:16 }}>
        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:10, padding:16 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:14 }}>Parameter Variability (CV%) — Bottleneck Indicator</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={sorted} layout="vertical" margin={{left:0,right:40}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis type="number" tick={TICK} domain={[0,28]} unit="%" />
              <YAxis type="category" dataKey="param" tick={{ fontSize:10, fill:"#374151" }} width={155} />
              <Tooltip contentStyle={{ fontSize:11 }} formatter={v=>[`${v}%`,"CV"]} />
              <ReferenceLine x={15} stroke="#f59e0b" strokeDasharray="4 2" label={{ value:"Target <15%", fontSize:9, fill:"#f59e0b", position:"right" }} />
              <Bar dataKey="cv" radius={4} label={{ position:"right", fontSize:10, fill:"#374151", formatter:v=>`${v}%` }}>
                {sorted.map((e,i)=><Cell key={i} fill={e.cv>19?IOCL_RED:e.cv>10?"#f59e0b":"#22c55e"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:10, padding:16, flex:1 }}>
            <div style={{ fontSize:13, fontWeight:600, marginBottom:10 }}>What-If Scenario Analysis</div>
            <div style={{ fontSize:12, color:"#374151", marginBottom:12 }}>If Feed_Flow_Rate CV is reduced from 23.56% → 12%:</div>
            {[
              { label:"Expected Yield improvement", before:"49.75%", after:"~53–55%", delta:"+5–10%" },
              { label:"Conversion Rate gain",        before:"80.21%", after:"~83–85%", delta:"+3–5%" },
              { label:"Energy Consumption reduction",before:"150.5",  after:"~135–140",delta:"~-8%" },
            ].map(r=>(
              <div key={r.label} style={{ display:"grid", gridTemplateColumns:"1.5fr 0.7fr 0.7fr 0.7fr", gap:6, padding:"7px 0", borderBottom:"1px solid #f3f4f6", alignItems:"center" }}>
                <div style={{ fontSize:11, color:"#374151" }}>{r.label}</div>
                <div style={{ fontSize:11, color:"#9ca3af", textAlign:"center" }}>{r.before}</div>
                <div style={{ fontSize:11, fontWeight:600, color:IOCL_BLUE, textAlign:"center" }}>{r.after}</div>
                <div style={{ fontSize:11, fontWeight:600, color:"#22c55e", textAlign:"center" }}>{r.delta}</div>
              </div>
            ))}
            <div style={{ display:"grid", gridTemplateColumns:"1.5fr 0.7fr 0.7fr 0.7fr", gap:6, paddingTop:4, fontSize:10, color:"#9ca3af" }}>
              <div>Metric</div><div style={{textAlign:"center"}}>Current</div><div style={{textAlign:"center"}}>Projected</div><div style={{textAlign:"center"}}>Delta</div>
            </div>
          </div>

          <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:10, padding:16 }}>
            <div style={{ fontSize:13, fontWeight:600, marginBottom:8 }}>Bottleneck Recommendations</div>
            {[
              ["1","Install flow control valve on Feed line — reduce surge variability"],
              ["2","Add AirFlow surge dampener — address 119 fluctuation events"],
              ["3","Review energy efficiency — CV 19.31% suggests load balancing issues"],
            ].map(([n,t])=>(
              <div key={n} style={{ display:"flex", gap:10, padding:"7px 0", borderBottom:"1px solid #f3f4f6", alignItems:"flex-start" }}>
                <div style={{ background:IOCL_RED, color:"#fff", borderRadius:"50%", width:20, height:20, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>{n}</div>
                <div style={{ fontSize:12, color:"#374151" }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══ PAGE: DMAIC ══════════════════════════════════════════════════════════════
function DMAICPage() {
  const [phase, setPhase] = useState(2);
  return (
    <div>
      <SectionHeader title="Six Sigma DMAIC Tracker" subtitle="Project: Catalytic Cracking Unit — Product Yield Improvement" />

      {/* Phase timeline */}
      <div style={{ display:"flex", alignItems:"center", gap:0, marginBottom:24, overflowX:"auto" }}>
        {DMAIC_PHASES.map((p,i)=>(
          <div key={p.phase} style={{ display:"flex", alignItems:"center" }}>
            <div onClick={()=>setPhase(i)} style={{
              cursor:"pointer", textAlign:"center", padding:"10px 18px",
              borderRadius:10, border:`2px solid ${i===phase?IOCL_RED:p.done?"#22c55e":"#e5e7eb"}`,
              background: i===phase?"#fef2f2": p.done?"#f0fdf4":"#f9fafb",
              minWidth:90
            }}>
              <div style={{ fontSize:11, fontWeight:700, color: i===phase?IOCL_RED:p.done?"#22c55e":"#9ca3af" }}>{p.phase}</div>
              <div style={{ fontSize:18 }}>{p.done?"✅":"⬜"}</div>
            </div>
            {i<4 && <div style={{ width:24, height:2, background: DMAIC_PHASES[i+1].done?"#22c55e":"#e5e7eb" }} />}
          </div>
        ))}
      </div>

      {/* Selected phase detail */}
      <div style={{ background:"#fff", border:`2px solid ${IOCL_RED}30`, borderRadius:10, padding:18, marginBottom:16 }}>
        <div style={{ fontSize:14, fontWeight:700, color:IOCL_RED, marginBottom:8 }}>{DMAIC_PHASES[phase].phase} Phase — {DMAIC_PHASES[phase].done?"Complete ✅":"In Progress 🔄"}</div>
        <div style={{ fontSize:13, color:"#374151", marginBottom:14 }}>{DMAIC_PHASES[phase].desc}</div>
        {phase === 0 && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
            {[["Problem","Product Yield below 55% target. Cpk < 1.0"],["Scope","CCU dataset Jan 2025. 1300 observations"],["Goal","Raise Cpk from 0.57 → 1.0 (≥3σ)"]].map(([k,v])=>(
              <div key={k} style={{ background:"#f8fafc", borderRadius:8, padding:"10px 12px" }}>
                <div style={{ fontSize:11, fontWeight:600, color:IOCL_BLUE }}>{k}</div>
                <div style={{ fontSize:12, color:"#374151", marginTop:3 }}>{v}</div>
              </div>
            ))}
          </div>
        )}
        {phase === 1 && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
            {[["Records","1,300"],["Parameters","27"],["Date Range","4.5 days"],["Interval","5 minutes"],["Avg Yield","49.75%"],["Std Dev","5.67"],["Disturbances","179"],["Cpk","0.574"]].map(([k,v])=>(
              <div key={k} style={{ background:"#f8fafc", borderRadius:8, padding:"10px 12px", textAlign:"center" }}>
                <div style={{ fontSize:11, color:"#6b7280" }}>{k}</div>
                <div style={{ fontSize:16, fontWeight:700, color:IOCL_BLUE }}>{v}</div>
              </div>
            ))}
          </div>
        )}
        {phase === 2 && (
          <div>
            <div style={{ fontSize:12, fontWeight:600, color:"#374151", marginBottom:8 }}>Root Causes Identified:</div>
            {[["#1","AirFlow Fluctuation","119 events over 4.5 days. Primary external disturbance.","High"],["#2","Feed Flow Rate instability","CV=23.56% — highest variability of all parameters.","High"],["#3","PID setpoint deviation","Reactor temp deviates ±59°C from setpoint.","Medium"],["#4","Feedstock Quality variation","FQI range 0.6–1.0, corr=-0.069 with yield.","Low"]].map(([n,c,d,sev])=>(
              <div key={n} style={{ display:"grid", gridTemplateColumns:"0.3fr 1.2fr 2fr 0.5fr", gap:8, padding:"8px 0", borderBottom:"1px solid #f3f4f6", alignItems:"start" }}>
                <div style={{ fontWeight:700, color:IOCL_RED, fontSize:13 }}>{n}</div>
                <div style={{ fontSize:12, fontWeight:600 }}>{c}</div>
                <div style={{ fontSize:12, color:"#6b7280" }}>{d}</div>
                <span style={{ fontSize:11, padding:"2px 8px", borderRadius:12, background:sev==="High"?"#fef2f2":sev==="Medium"?"#fffbeb":"#f0fdf4", color:sev==="High"?IOCL_RED:sev==="Medium"?"#92400e":"#166534" }}>{sev}</span>
              </div>
            ))}
          </div>
        )}
        {phase === 3 && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[
              { action:"Install AirFlow surge dampener", owner:"M5-Process Eng", status:"Planned", target:"Reduce AirFlow events by 60%" },
              { action:"Retune PID controller (Kp, Ki, Kd)", owner:"M4-Control Eng", status:"Planned", target:"Setpoint deviation <10°C" },
              { action:"Install feed flow control valve", owner:"M1-Mech Eng", status:"Planned", target:"Reduce Feed CV to <12%" },
              { action:"Establish feedstock blending protocol", owner:"M3-Process Eng", status:"Planned", target:"FQI range 0.75–0.85" },
            ].map(a=>(
              <div key={a.action} style={{ background:"#f8fafc", borderRadius:8, padding:"10px 12px", border:"1px solid #e5e7eb" }}>
                <div style={{ fontSize:12, fontWeight:600 }}>{a.action}</div>
                <div style={{ fontSize:11, color:"#6b7280", margin:"3px 0" }}>Owner: {a.owner}</div>
                <div style={{ fontSize:11, color:IOCL_BLUE }}>Target: {a.target}</div>
                <span style={{ fontSize:10, padding:"2px 8px", borderRadius:12, background:"#eff6ff", color:"#1d4ed8" }}>{a.status}</span>
              </div>
            ))}
          </div>
        )}
        {phase === 4 && (
          <div>
            <div style={{ fontSize:12, fontWeight:600, marginBottom:8 }}>Control Plan — Parameters to Monitor</div>
            {[["Product_Yield","40–60 %","X-bar R chart","Shift supervisor","Adjust setpoints"],["Reactor_Temperature","480–560 °C","Individuals chart","DCS alarm","Check PID"],["Feed_Flow_Rate","50–120 kL/hr","X-bar R chart","Field operator","Check control valve"],["Air_Flow_Rate","50k–80k Nm³/hr","C chart","AMS alert","Inspect blower"]].map(([p,sl,ct,resp,action])=>(
              <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr 1.5fr", gap:6, padding:"6px 0", borderBottom:"1px solid #f3f4f6", fontSize:11 }}>
                <div style={{ fontWeight:600 }}>{p}</div>
                <div style={{ color:"#6b7280" }}>{sl}</div>
                <div style={{ color:IOCL_BLUE }}>{ct}</div>
                <div>{resp}</div>
                <div style={{ color:"#374151" }}>{action}</div>
              </div>
            ))}
            <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr 1.5fr", gap:6, paddingTop:6, fontSize:10, color:"#9ca3af" }}>
              <div>Parameter</div><div>Spec Limits</div><div>Chart Type</div><div>Responsible</div><div>Response</div>
            </div>
          </div>
        )}
      </div>

      {/* Project metrics */}
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <KPI label="Current Cpk (Product Yield)" value="0.574" unit=""   sub="Target ≥ 1.0"          color={IOCL_RED} />
        <KPI label="Current Sigma Level"          value="1.72"  unit="σ"  sub="Target ≥ 3σ"           color={IOCL_RED} />
        <KPI label="Current Yield"                value="49.75" unit="%"  sub="Target ≥ 55%"          color="#f59e0b" />
        <KPI label="DMAIC Progress"               value="3/5"   unit=""   sub="Phases complete"       color={IOCL_BLUE} />
        <KPI label="Root Causes Found"            value="4"     unit=""   sub="Ranked by severity"    color={IOCL_BLUE} />
        <KPI label="Improvement Actions"          value="4"     unit=""   sub="All in Planned status" color="#6b7280" />
      </div>
    </div>
  );
}

// ══ ROOT APP ══════════════════════════════════════════════════════════════════
const PAGES = ["Historical Analysis","Root-Cause Analysis","SPC & Six Sigma","Bottleneck Detection","DMAIC Tracker"];
const COMPONENTS = [HistoricalPage, RCAPage, SPCPage, BottleneckPage, DMAICPage];

export default function App() {
  const [page, setPage] = useState(0);
  const Page = COMPONENTS[page];
  return (
    <div style={{ fontFamily:"Inter,sans-serif", minHeight:"100vh", background:"#f8fafc" }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${IOCL_BLUE},#1e40af)`, padding:"14px 24px", display:"flex", alignItems:"center", gap:16 }}>
        <div style={{ background:IOCL_RED, borderRadius:8, padding:"6px 12px", fontSize:13, fontWeight:800, color:"#fff", letterSpacing:1 }}>IOCL</div>
        <div>
          <div style={{ color:"#fff", fontWeight:700, fontSize:15 }}>Process Data Analytics Platform</div>
          <div style={{ color:"#93c5fd", fontSize:11 }}>Catalytic Cracking Unit · Panipat Refinery · Jan 2025</div>
        </div>
        <div style={{ marginLeft:"auto", display:"flex", gap:12 }}>
          <div style={{ background:"#ffffff20", borderRadius:8, padding:"4px 12px", color:"#fff", fontSize:11 }}>📊 1,300 records</div>
          <div style={{ background:"#ffffff20", borderRadius:8, padding:"4px 12px", color:"#fff", fontSize:11 }}>27 parameters</div>
          <div style={{ background:IOCL_RED+"cc", borderRadius:8, padding:"4px 12px", color:"#fff", fontSize:11 }}>Cpk: 0.57 ⚠️</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background:"#fff", borderBottom:"1px solid #e5e7eb", padding:"0 24px", display:"flex", gap:0, overflowX:"auto" }}>
        {PAGES.map((p,i)=><Tab key={p} label={p} active={i===page} onClick={()=>setPage(i)} />)}
      </div>

      {/* Content */}
      <div style={{ padding:24, maxWidth:1200, margin:"0 auto" }}>
        <Page />
      </div>
    </div>
  );
}
