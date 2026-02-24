'use client'

import { useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from "recharts";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800;900&family=Barlow+Condensed:wght@600;700;800;900&display=swap');`;

const C = {
  navy: "#080f24", navyMid: "#0d1630", navyCard: "#111c3a",
  blue1: "#1565d8", blue2: "#1e88e5", blue3: "#29b6f6", blueLight: "#64c8f5",
  orange: "#f57c00", orangeLight: "#ff9800",
  white: "#f0f6ff", gray: "#8a9bb8", grayDim: "#3a4a6b", grayDark: "#1e2d52",
};

const sections = [
  { id: "strategic", label: "I", title: "Strategic Linkage", subtitle: "Converting AI ambition into boardroom accountability", questions: ["Each AI initiative has a clear business owner.", "AI initiatives have written ROI hypotheses.", "ROI is linked to P&L-level KPIs.", "AI investments are prioritized by economic impact.", "AI portfolio visibility exists at executive level.", "AI impact is reported to the board.", "AI is integrated into strategy process.", "AI competitive advantage role is defined.", "Post-investment reviews are systematic.", "Stop/Go criteria are defined for initiatives.", "AI impact reflected in budgeting & forecasting."] },
  { id: "velocity", label: "II", title: "Decision Velocity", subtitle: "Speed and clarity from insight to action", questions: ["Critical data is rapidly available to leadership.", "Decision latency is measured.", "Decision ownership is clearly defined.", "Approval layers are minimized.", "AI insights directly inform decisions.", "Data reliability issues are rare.", "Cross-functional decision governance is clear.", "Decision-to-action ownership is explicit.", "Decision-to-implementation time is measured.", "Decision chain is visualized.", "Bottlenecks are systematically identified."] },
  { id: "execution", label: "III", title: "Execution Alignment", subtitle: "Turning AI outputs into operational reality", questions: ["AI KPIs cascade to team level.", "Incentives align with AI outcomes.", "Processes redesigned when AI introduced.", "AI integrated into daily management.", "AI usage rate is measured.", "User adoption tracked systematically.", "Capability gaps analyzed.", "Role-specific training implemented.", "AI operational impact documented.", "Change management structured.", "Shadow work reduced."] },
  { id: "sales", label: "IV", title: "Sales & Value Realization", subtitle: "Translating intelligence into revenue and margin", questions: ["AI used for pipeline prioritization.", "AI improved win rate.", "Sales cycle shortened.", "Pricing uses data intelligence.", "AI-assisted segmentation active.", "Offer automation increased efficiency.", "Margin leakage measured.", "Churn analyzed predictively.", "Real-time sales visibility exists.", "AI impact on margin measured.", "AI used for upsell/cross-sell optimization."] },
  { id: "governance", label: "V", title: "Governance & Accountability", subtitle: "Structural safeguards for sustainable AI value", questions: ["Executive AI sponsor appointed.", "Business & IT roles clearly separated.", "AI governance model documented.", "Board-level AI review cadence exists.", "AI risks assessed systematically.", "Data ownership clearly defined.", "Investment approval standardized.", "Ethical AI principles documented.", "Accountability clear in failures.", "AI roadmap linked to strategy roadmap.", "AI governance audit conducted within 12 months."] },
];

const scoreLabels = ["Ei olemassa", "Ad hoc", "Dokumentoitu", "Systemaattinen", "Mitattu", "Optimoitu"];
const scoreColors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#1e88e5", "#29b6f6"];

const roles = [
  { id: "ceo", label: "CEO / Toimitusjohtaja", multiplier: 1.4 },
  { id: "cdo_cio", label: "CDO / CIO / CTO", multiplier: 1.2 },
  { id: "cfo", label: "CFO / Talousjohtaja", multiplier: 1.1 },
  { id: "vp_director", label: "VP / Johtaja (liiketoiminta)", multiplier: 1.0 },
  { id: "manager", label: "Päällikkö / Tiimiesimies", multiplier: 0.8 },
  { id: "consultant", label: "Konsultti / Asiantuntija", multiplier: 0.9 },
];

const sizes = [
  { id: "micro", label: "< 50 henkilöä", baseExposure: 350000 },
  { id: "small", label: "50–200 henkilöä", baseExposure: 950000 },
  { id: "medium", label: "200–1 000 henkilöä", baseExposure: 3200000 },
  { id: "large", label: "1 000–5 000 henkilöä", baseExposure: 9500000 },
  { id: "enterprise", label: "> 5 000 henkilöä", baseExposure: 28000000 },
];

const industries = [
  { id: "finance", label: "Rahoitus & vakuutus", multiplier: 1.5 },
  { id: "manufacturing", label: "Teollisuus & valmistus", multiplier: 1.2 },
  { id: "retail", label: "Kauppa & jakelu", multiplier: 1.1 },
  { id: "health", label: "Terveys & hyvinvointi", multiplier: 1.3 },
  { id: "tech", label: "Teknologia & SaaS", multiplier: 1.4 },
  { id: "professional", label: "Asiantuntijapalvelut", multiplier: 1.1 },
  { id: "public", label: "Julkinen sektori", multiplier: 0.8 },
  { id: "other", label: "Muu toimiala", multiplier: 1.0 },
];

const aiStatuses = [
  { id: "exploring", label: "Tutkimme AI:n mahdollisuuksia", maturityAdj: -10 },
  { id: "piloting", label: "Meillä on käynnissä AI-pilotteja", maturityAdj: 0 },
  { id: "scaling", label: "Skalaamme AI-ratkaisuja", maturityAdj: 10 },
  { id: "mature", label: "AI on osa liiketoimintaamme", maturityAdj: 20 },
];

const maturityLevels = [
  { min: 0, max: 20, label: "AI Laggard", desc: "AI-aloitteet ovat irrallisia ja vailla strategista koherenssia.", color: "#ef4444" },
  { min: 21, max: 40, label: "AI Explorer", desc: "Varhaisia ponnisteluja, mutta systemaattiset toteutuskehykset puuttuvat.", color: "#f97316" },
  { min: 41, max: 60, label: "AI Developer", desc: "Kasvava kyky paikallisilla osaamisilla, mutta arvon realisointi epäyhtenäistä.", color: "#eab308" },
  { min: 61, max: 80, label: "AI Practitioner", desc: "Mitattua ja johdettua toimintaa selkeällä kytkennällä liiketuloksiin.", color: "#1e88e5" },
  { min: 81, max: 100, label: "AI Leader", desc: "Täysin integroitu AI-toteutusäly luo kilpailuetua.", color: "#29b6f6" },
];

const getMaturiyLevel = (score) => maturityLevels.find(l => score >= l.min && score <= l.max) || maturityLevels[0];

const calcExposure = (profile, scorePct) => {
  const size = sizes.find(s => s.id === profile.size) || sizes[1];
  const industry = industries.find(i => i.id === profile.industry) || industries[7];
  const role = roles.find(r => r.id === profile.role) || roles[3];
  const base = size.baseExposure * industry.multiplier * role.multiplier;
  const gapFactor = Math.pow((100 - scorePct) / 100, 1.4);
  return Math.round(base * gapFactor);
};

const Logo = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="38" fill="url(#lg1)" opacity="0.15" />
    <circle cx="50" cy="50" r="28" fill="url(#lg2)" opacity="0.25" />
    {[[10,30],[10,50],[10,70],[90,30],[90,50],[90,70]].map(([x,y],i) => (
      <line key={i} x1={x < 50 ? x+8 : x-8} y1={y} x2={x < 50 ? 28 : 72} y2={y} stroke="#29b6f6" strokeWidth="1.5" opacity="0.7" />
    ))}
    {[10,50,90].map((x,i) => [30,50,70].map((y,j) => (
      <circle key={`${i}${j}`} cx={x < 50 ? x+4 : x-4} cy={y} r="2.5" fill="#29b6f6" opacity="0.8" />
    )))}
    <circle cx="52" cy="47" r="20" fill="url(#lgMag)" stroke="url(#lgStroke)" strokeWidth="3" />
    <circle cx="52" cy="47" r="16" fill="#f0f6ff" opacity="0.08" />
    <rect x="44" y="38" width="16" height="20" rx="2" fill="#1565d8" opacity="0.9" />
    <rect x="47" y="35" width="10" height="5" rx="2" fill="#1e88e5" />
    <line x1="47" y1="44" x2="57" y2="44" stroke="#64c8f5" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="47" y1="48" x2="55" y2="48" stroke="#64c8f5" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="47" y1="52" x2="57" y2="52" stroke="#64c8f5" strokeWidth="1.5" strokeLinecap="round" />
    <polyline points="44,44 46,46 49,41" stroke="#f57c00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="36" y1="62" x2="28" y2="70" stroke="url(#lgHandle)" strokeWidth="5" strokeLinecap="round" />
    <circle cx="66" cy="34" r="3" fill="#ff9800" opacity="0.9" />
    <line x1="66" y1="28" x2="66" y2="31" stroke="#ff9800" strokeWidth="1.5" />
    <line x1="66" y1="37" x2="66" y2="40" stroke="#ff9800" strokeWidth="1.5" opacity="0.5" />
    <line x1="60" y1="34" x2="63" y2="34" stroke="#ff9800" strokeWidth="1.5" opacity="0.5" />
    <defs>
      <radialGradient id="lg1" cx="50%" cy="50%"><stop offset="0%" stopColor="#1e88e5" /><stop offset="100%" stopColor="#1565d8" stopOpacity="0" /></radialGradient>
      <radialGradient id="lg2" cx="50%" cy="50%"><stop offset="0%" stopColor="#29b6f6" /><stop offset="100%" stopColor="#1565d8" stopOpacity="0" /></radialGradient>
      <radialGradient id="lgMag" cx="40%" cy="35%"><stop offset="0%" stopColor="#1e3a7a" /><stop offset="100%" stopColor="#0d1630" /></radialGradient>
      <linearGradient id="lgStroke" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#64c8f5" /><stop offset="100%" stopColor="#1565d8" /></linearGradient>
      <linearGradient id="lgHandle" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1565d8" /><stop offset="100%" stopColor="#0d1630" /></linearGradient>
    </defs>
  </svg>
);

const OptionBtn = ({ label, selected, onClick }) => (
  <button onClick={onClick} style={{
    padding: "12px 18px", borderRadius: 10, cursor: "pointer", textAlign: "left", transition: "all 0.2s",
    background: selected ? "rgba(30,136,229,0.15)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${selected ? C.blue2 : C.grayDark}`,
    color: selected ? C.white : C.gray,
    fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: selected ? 600 : 400,
  }}>
    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${selected ? C.blue2 : C.grayDim}`, background: selected ? C.blue2 : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
        {selected && <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.white }} />}
      </span>
      {label}
    </span>
  </button>
);

export default function App() {
  const [phase, setPhase] = useState("landing");
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [profile, setProfile] = useState({ role: "", size: "", industry: "", aiStatus: "" });
  const [sectionIndex, setSectionIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [animIn, setAnimIn] = useState(true);

  const tr = (fn) => { setAnimIn(false); setTimeout(() => { fn(); setAnimIn(true); }, 320); };

  const profileComplete = profile.role && profile.size && profile.industry && profile.aiStatus;
  const currentSection = sections[sectionIndex];
  const sectionDone = (s) => s.questions.every((_, i) => scores[`${s.id}_${i}`] !== undefined);
  const getSectionScore = (sectionId, questions) => questions.reduce((sum, _, i) => sum + (scores[`${sectionId}_${i}`] ?? 0), 0);
  const totalScore = sections.reduce((sum, s) => sum + getSectionScore(s.id, s.questions), 0);
  const scorePct = Math.round((totalScore / 275) * 100);
  const maturity = getMaturiyLevel(scorePct);
  const exposure = calcExposure(profile, scorePct);
  const weakest = [...sections].sort((a, b) => getSectionScore(a.id, a.questions) / a.questions.length - getSectionScore(b.id, b.questions) / b.questions.length)[0];
  const radarData = sections.map(s => ({ subject: s.title.split(" ")[0], score: Math.round((getSectionScore(s.id, s.questions) / (s.questions.length * 5)) * 100) }));
  const selectedRole = roles.find(r => r.id === profile.role);
  const selectedSize = sizes.find(s => s.id === profile.size);
  const selectedIndustry = industries.find(i => i.id === profile.industry);

  return (
    <>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.navy}; }
        .bar { font-family: 'Barlow', sans-serif; }
        .barc { font-family: 'Barlow Condensed', sans-serif; }
        .fade { transition: opacity 0.32s ease, transform 0.32s ease; }
        .fade-in { opacity: 1; transform: translateY(0); }
        .fade-out { opacity: 0; transform: translateY(16px); }
        .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; }
        .card-blue { background: rgba(21,101,216,0.07); border: 1px solid rgba(30,136,229,0.2); border-radius: 14px; }
        .glow { box-shadow: 0 0 40px rgba(30,136,229,0.08); }
        input[type=range] { -webkit-appearance: none; width: 100%; height: 4px; border-radius: 2px; outline: none; cursor: pointer; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; cursor: pointer; transition: box-shadow 0.2s; background: ${C.blue2}; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: ${C.navyMid}; } ::-webkit-scrollbar-thumb { background: ${C.grayDark}; border-radius: 2px; }
        .grid-dots { background-image: radial-gradient(${C.grayDark} 1px, transparent 1px); background-size: 32px 32px; }
        .opt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media(max-width: 520px) { .opt-grid { grid-template-columns: 1fr; } .two-col { grid-template-columns: 1fr !important; } }
        .btn-primary { background: linear-gradient(135deg, ${C.orange}, ${C.orangeLight}); border: none; border-radius: 10px; color: #fff; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; letter-spacing: 0.05em; font-size: 16px; cursor: pointer; transition: opacity 0.2s, transform 0.1s; }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-primary:disabled { background: ${C.grayDark}; color: ${C.grayDim}; cursor: default; transform: none; opacity: 1; }
        .btn-ghost { background: transparent; border: 1px solid ${C.grayDark}; border-radius: 10px; color: ${C.gray}; font-family: 'Barlow', sans-serif; font-size: 14px; cursor: pointer; transition: border-color 0.2s; }
        .btn-ghost:hover { border-color: ${C.grayDim}; }
        .btn-ghost:disabled { opacity: 0.3; cursor: default; }
      `}</style>

      <div style={{ minHeight: "100vh", background: C.navy, position: "relative" }}>
        <div className="grid-dots" style={{ position: "fixed", inset: 0, opacity: 0.4, pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "fixed", top: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(21,101,216,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "fixed", bottom: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,124,0,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>

          {phase === "landing" && (
            <div className={`fade ${animIn ? "fade-in" : "fade-out"}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "40px 20px" }}>
              <div style={{ maxWidth: 540, width: "100%" }}>
                <div style={{ textAlign: "center", marginBottom: 44 }}>
                  <div style={{ marginBottom: 16 }}><Logo size={80} /></div>
                  <div className="barc" style={{ fontSize: 13, color: C.blue3, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 4 }}>AI™</div>
                  <div className="barc" style={{ fontSize: 28, fontWeight: 900, color: C.orange, letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1 }}>Execution Audit</div>
                  <div style={{ width: 60, height: 2, background: `linear-gradient(90deg, transparent, ${C.orange}, transparent)`, margin: "14px auto 20px" }} />
                  <p className="bar" style={{ fontSize: 15, color: C.gray, lineHeight: 1.7, fontWeight: 300 }}>
                    Mittaa organisaatiosi kykyä muuttaa AI-ambitio mitattaviksi liiketuloksiksi.<br />55 kysymystä · 5 dimensiota · Välitön visuaalinen raportti.
                  </p>
                  <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 20, flexWrap: "wrap" }}>
                    {["~12 minuuttia", "Ilmainen", "Välitön raportti"].map(t => (
                      <span key={t} className="bar" style={{ fontSize: 13, color: C.grayDim, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: C.blue3 }}>◆</span> {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card glow" style={{ padding: 32 }}>
                  {!emailSent ? (
                    <>
                      <label className="bar" style={{ display: "block", fontSize: 12, color: C.gray, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Työsähköpostiosoite</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="sinä@yritys.fi" className="bar"
                        style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.grayDark}`, borderRadius: 10, padding: "13px 16px", color: C.white, fontSize: 15, marginBottom: 14, outline: "none" }}
                        onFocus={e => e.target.style.borderColor = C.blue2} onBlur={e => e.target.style.borderColor = C.grayDark}
                      />
                      <button className="btn-primary" style={{ width: "100%", padding: "14px" }}
                        disabled={!email.includes("@")}
                        onClick={() => { if (email.includes("@")) { setEmailSent(true); setTimeout(() => tr(() => setPhase("profile")), 1600); } }}>
                        LÄHETÄ PÄÄSYLINKKI →
                      </button>
                      <p className="bar" style={{ fontSize: 12, color: C.grayDim, textAlign: "center", marginTop: 12 }}>Ei salasanaa. Ei roskapostia. Linkki voimassa 24h.</p>
                    </>
                  ) : (
                    <div style={{ textAlign: "center", padding: "12px 0" }}>
                      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(30,136,229,0.1)", border: `1px solid ${C.blue2}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22, color: C.blue3 }}>✓</div>
                      <p className="barc" style={{ color: C.white, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Tarkista sähköpostisi</p>
                      <p className="bar" style={{ color: C.gray, fontSize: 14 }}>Linkki lähetetty: <span style={{ color: C.orange }}>{email}</span></p>
                      <p className="bar" style={{ color: C.grayDim, fontSize: 12, marginTop: 8 }}>Ladataan arviointia…</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {phase === "profile" && (
            <div className={`fade ${animIn ? "fade-in" : "fade-out"}`} style={{ maxWidth: 680, margin: "0 auto", padding: "50px 20px 80px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 44 }}>
                <Logo size={36} />
                <div>
                  <div className="barc" style={{ fontSize: 11, color: C.blue3, letterSpacing: "0.15em", textTransform: "uppercase" }}>AI™ Execution Audit</div>
                  <div className="barc" style={{ fontSize: 18, color: C.orange, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>Taustaprofiili</div>
                </div>
              </div>
              <div style={{ marginBottom: 32 }}>
                <h2 className="barc" style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 900, color: C.white, textTransform: "uppercase", marginBottom: 8 }}>Kerro organisaatiostasi</h2>
                <p className="bar" style={{ color: C.gray, fontSize: 14, fontWeight: 300 }}>Nämä tiedot kalibroivat arviosi tulokset ja taloudellisen altistuman laskelman.</p>
              </div>
              {[
                { num: "01", title: "Roolisi organisaatiossa", key: "role", items: roles, grid: true },
                { num: "02", title: "Organisaation koko", key: "size", items: sizes, grid: true },
                { num: "03", title: "Toimiala", key: "industry", items: industries, grid: true },
                { num: "04", title: "AI-kypsyystaso tällä hetkellä", key: "aiStatus", items: aiStatuses, grid: false },
              ].map(({ num, title, key, items, grid }) => (
                <div key={key} className="card" style={{ padding: 24, marginBottom: 16 }}>
                  <p className="barc" style={{ fontSize: 16, fontWeight: 700, color: C.blue3, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
                    <span style={{ color: C.grayDim, marginRight: 8 }}>{num}</span> {title}
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: grid ? "1fr 1fr" : "1fr", gap: 10 }}>
                    {items.map(item => (
                      <OptionBtn key={item.id} label={item.label} selected={profile[key] === item.id} onClick={() => setProfile(p => ({ ...p, [key]: item.id }))} />
                    ))}
                  </div>
                </div>
              ))}
              <button className="btn-primary" style={{ width: "100%", padding: "16px", marginTop: 16 }}
                disabled={!profileComplete}
                onClick={() => tr(() => setPhase("survey"))}>
                ALOITA ARVIOINTI →
              </button>
            </div>
          )}

          {phase === "survey" && (
            <div className={`fade ${animIn ? "fade-in" : "fade-out"}`} style={{ maxWidth: 740, margin: "0 auto", padding: "40px 20px 80px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Logo size={32} />
                  <span className="barc" style={{ fontSize: 13, color: C.orange, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>Execution Audit</span>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  {sections.map((s, i) => (
                    <div key={s.id} style={{ height: 4, width: i === sectionIndex ? 32 : 10, borderRadius: 2, background: i < sectionIndex ? C.orange : i === sectionIndex ? C.blue2 : C.grayDark, transition: "all 0.4s" }} />
                  ))}
                </div>
                <span className="bar" style={{ fontSize: 13, color: C.gray }}>{sectionIndex + 1} / {sections.length}</span>
              </div>
              <div style={{ marginBottom: 36 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
                  <span className="barc" style={{ fontSize: 40, fontWeight: 900, color: C.grayDark, lineHeight: 1 }}>{currentSection.label}</span>
                  <div style={{ height: 2, flex: 1, background: `linear-gradient(90deg, ${C.blue2}60, transparent)` }} />
                </div>
                <h2 className="barc" style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, color: C.white, textTransform: "uppercase", marginBottom: 6 }}>{currentSection.title}</h2>
                <p className="bar" style={{ fontSize: 14, color: C.gray, fontWeight: 300 }}>{currentSection.subtitle}</p>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 28, padding: "10px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: `1px solid ${C.grayDark}`, flexWrap: "wrap" }}>
                {scoreLabels.map((l, i) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, marginRight: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: scoreColors[i] }} />
                    <span className="bar" style={{ fontSize: 11, color: C.grayDim }}>{i} – {l}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {currentSection.questions.map((q, i) => {
                  const key = `${currentSection.id}_${i}`;
                  const val = scores[key] ?? -1;
                  const hasVal = val >= 0;
                  const pct = hasVal ? val * 20 : 0;
                  return (
                    <div key={i} className="card" style={{ padding: "22px 24px", borderColor: hasVal ? "rgba(30,136,229,0.2)" : "rgba(255,255,255,0.06)", transition: "border-color 0.3s" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 18 }}>
                        <p className="bar" style={{ fontSize: 14, color: C.gray, lineHeight: 1.6 }}>
                          <span style={{ color: C.grayDim, fontFamily: "monospace", fontSize: 11, marginRight: 8 }}>{String(i + 1).padStart(2, "0")}</span>{q}
                        </p>
                        <div style={{ minWidth: 42, textAlign: "center", flexShrink: 0 }}>
                          <div style={{ background: hasVal ? scoreColors[val] : C.grayDark, borderRadius: 8, padding: "5px 10px", transition: "background 0.2s" }}>
                            <span className="barc" style={{ fontSize: 16, fontWeight: 800, color: hasVal ? "#fff" : C.grayDim }}>{hasVal ? val : "–"}</span>
                          </div>
                        </div>
                      </div>
                      <input type="range" min={0} max={5} step={1} value={hasVal ? val : 0}
                        style={{ background: hasVal ? `linear-gradient(90deg, ${scoreColors[val]} ${pct}%, ${C.grayDark} ${pct}%)` : C.grayDark }}
                        onChange={e => setScores(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                        onClick={e => setScores(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                      />
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                        {scoreLabels.map((l, li) => (
                          <span key={li} className="bar" style={{ fontSize: 10, color: val === li ? scoreColors[li] : C.grayDark, transition: "color 0.2s", textAlign: "center", width: "16%" }}>{l}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36 }}>
                <button className="btn-ghost" style={{ padding: "12px 22px" }} disabled={sectionIndex === 0} onClick={() => tr(() => setSectionIndex(i => i - 1))}>← Takaisin</button>
                <span className="bar" style={{ fontSize: 12, color: C.grayDim }}>{currentSection.questions.filter((_, i) => scores[`${currentSection.id}_${i}`] !== undefined).length} / {currentSection.questions.length} vastattu</span>
                <button className="btn-primary" style={{ padding: "12px 28px" }} disabled={!sectionDone(currentSection)}
                  onClick={() => { if (sectionIndex < sections.length - 1) tr(() => setSectionIndex(i => i + 1)); else tr(() => setPhase("results")); }}>
                  {sectionIndex < sections.length - 1 ? "Seuraava →" : "KATSO TULOKSET →"}
                </button>
              </div>
            </div>
          )}

          {phase === "results" && (
            <div className={`fade ${animIn ? "fade-in" : "fade-out"}`} style={{ maxWidth: 900, margin: "0 auto", padding: "52px 20px 80px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <Logo size={44} />
                  <div>
                    <div className="barc" style={{ fontSize: 11, color: C.blue3, letterSpacing: "0.15em", textTransform: "uppercase" }}>AI™ Execution Audit</div>
                    <div className="barc" style={{ fontSize: 22, fontWeight: 900, color: C.orange, textTransform: "uppercase", letterSpacing: "0.08em" }}>Arviointiraportti</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p className="bar" style={{ fontSize: 12, color: C.grayDim }}>
                    {selectedRole?.label} · {selectedSize?.label}<br />{selectedIndustry?.label}
                  </p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="two-col">
                <div className="card-blue glow" style={{ padding: "36px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <p className="barc" style={{ fontSize: 11, color: C.grayDim, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20 }}>Execution Intelligence Score</p>
                  <div style={{ position: "relative", marginBottom: 20 }}>
                    <svg width="160" height="160" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="68" fill="none" stroke={C.grayDark} strokeWidth="6" />
                      <circle cx="80" cy="80" r="68" fill="none" stroke="url(#grad_score)" strokeWidth="6"
                        strokeDasharray={`${(scorePct / 100) * 427} 427`} strokeLinecap="round" transform="rotate(-90 80 80)" />
                      <defs><linearGradient id="grad_score" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={C.blue1} /><stop offset="100%" stopColor={C.blue3} /></linearGradient></defs>
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <span className="barc" style={{ fontSize: 48, fontWeight: 900, color: C.white, lineHeight: 1 }}>{scorePct}</span>
                      <span className="bar" style={{ fontSize: 13, color: C.gray }}>/ 100</span>
                    </div>
                  </div>
                  <div style={{ padding: "8px 22px", background: maturity.color + "20", border: `1px solid ${maturity.color}50`, borderRadius: 100, marginBottom: 12 }}>
                    <span className="barc" style={{ fontSize: 16, fontWeight: 800, color: maturity.color, letterSpacing: "0.06em" }}>{maturity.label}</span>
                  </div>
                  <p className="bar" style={{ fontSize: 13, color: C.gray, lineHeight: 1.6 }}>{maturity.desc}</p>
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.grayDark}`, width: "100%" }}>
                    <p className="bar" style={{ fontSize: 12, color: C.grayDim }}>Yhteispisteet: <span style={{ color: C.white, fontWeight: 600 }}>{totalScore} / 275</span></p>
                  </div>
                </div>
                <div className="card" style={{ padding: "24px" }}>
                  <p className="barc" style={{ fontSize: 12, color: C.grayDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Dimensioanalyysi</p>
                  <ResponsiveContainer width="100%" height={280}>
                    <RadarChart data={radarData} margin={{ top: 16, right: 24, bottom: 16, left: 24 }}>
                      <PolarGrid stroke={C.grayDark} />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: C.gray, fontSize: 11, fontFamily: "Barlow" }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar dataKey="score" stroke={C.blue2} fill={C.blue2} fillOpacity={0.12} strokeWidth={2} dot={{ fill: C.blue3, r: 4, strokeWidth: 0 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="card" style={{ padding: "28px 32px", marginBottom: 16 }}>
                <p className="barc" style={{ fontSize: 12, color: C.grayDim, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 24 }}>Osiokohtainen analyysi</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  {sections.map(s => {
                    const raw = getSectionScore(s.id, s.questions);
                    const max = s.questions.length * 5;
                    const pct = Math.round((raw / max) * 100);
                    const isWeakest = s.id === weakest.id;
                    const barColor = pct >= 60 ? C.blue2 : pct >= 40 ? "#eab308" : "#ef4444";
                    return (
                      <div key={s.id}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span className="barc" style={{ fontSize: 13, color: C.grayDim, fontWeight: 700 }}>{s.label}</span>
                            <span className="bar" style={{ fontSize: 14, color: C.gray, fontWeight: 500 }}>{s.title}</span>
                            {isWeakest && <span className="bar" style={{ fontSize: 10, background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 100, padding: "2px 10px", fontWeight: 600 }}>⚠ Kriittinen</span>}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <span className="bar" style={{ fontSize: 12, color: C.grayDim }}>{raw}/{max}</span>
                            <span className="barc" style={{ fontSize: 16, fontWeight: 800, color: barColor, minWidth: 44, textAlign: "right" }}>{pct}%</span>
                          </div>
                        </div>
                        <div style={{ height: 6, borderRadius: 3, background: C.grayDark, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: barColor, borderRadius: 3, boxShadow: `0 0 8px ${barColor}50` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="two-col">
                <div className="card" style={{ padding: "28px", background: "rgba(239,68,68,0.04)", borderColor: "rgba(239,68,68,0.15)" }}>
                  <p className="barc" style={{ fontSize: 11, color: C.grayDim, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>Arvioitu taloudellinen altistuma</p>
                  <p className="barc" style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 900, color: "#ef4444", letterSpacing: "-0.01em", marginBottom: 6 }}>
                    €{exposure.toLocaleString("fi-FI")}
                  </p>
                  <p className="bar" style={{ fontSize: 13, color: C.gray, lineHeight: 1.7 }}>
                    Vuosittainen arvonlisäys on vaarassa toteutumattomien AI-hyötyjen takia. Laskelma perustuu profiiliisi ({selectedSize?.label}, {selectedIndustry?.label}).
                  </p>
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid rgba(255,255,255,0.05)` }}>
                    <p className="bar" style={{ fontSize: 12, color: C.grayDim, marginBottom: 4 }}>Kriittisin kehityskohde:</p>
                    <p className="barc" style={{ fontSize: 16, fontWeight: 800, color: "#ef4444", textTransform: "uppercase" }}>{weakest.title}</p>
                  </div>
                </div>
                <div className="card" style={{ padding: "28px", background: "rgba(245,124,0,0.06)", borderColor: "rgba(245,124,0,0.2)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <p className="barc" style={{ fontSize: 11, color: C.orange, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Seuraava askel</p>
                    <p className="barc" style={{ fontSize: 20, fontWeight: 800, color: C.white, marginBottom: 12, lineHeight: 1.3, textTransform: "uppercase" }}>Valmis sulkemaan suorituskykyvajeen?</p>
                    <p className="bar" style={{ fontSize: 13, color: C.gray, lineHeight: 1.7 }}>45 minuutin strategiasessio. Kartoitamme yhdessä suurimman vipuvaikutuksen interventiokohdat ja rakennamme 90 päivän toteutusroadmapin.</p>
                  </div>
                  <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                    <button className="btn-primary" style={{ padding: "14px", width: "100%", fontSize: 15 }}>VARAA STRATEGIASESSIO →</button>
                    <button className="btn-ghost" style={{ padding: "12px", width: "100%", fontSize: 13 }}>Lataa PDF-raportti</button>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: 48 }}>
                <Logo size={28} />
                <p className="bar" style={{ fontSize: 11, color: C.grayDim, marginTop: 12, lineHeight: 1.8 }}>AI Execution Audit™ · 55 kysymystä · 5 dimensiota</p>
                <button onClick={() => tr(() => { setPhase("landing"); setScores({}); setSectionIndex(0); setEmailSent(false); setProfile({ role: "", size: "", industry: "", aiStatus: "" }); })}
                  className="bar" style={{ marginTop: 16, background: "transparent", border: "none", color: C.grayDim, fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>
                  Tee arviointi uudelleen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
