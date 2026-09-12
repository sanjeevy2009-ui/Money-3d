import React, { useState, useEffect, useMemo, useRef } from 'react';

// ============================================================
// LOGO — Wealthy mark (circle with bars, matching screenshot)
// ============================================================
const Logo = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="20" fill="#16A34A"/>
    <rect x="11.5" y="22" width="3" height="6" rx="1" fill="#fff" opacity=".85"/>
    <rect x="16.5" y="16.5" width="3" height="11.5" rx="1" fill="#fff"/>
    <rect x="21.5" y="11" width="3" height="17" rx="1" fill="#fff"/>
    <rect x="26.5" y="19" width="3" height="9" rx="1" fill="#fff" opacity=".65"/>
  </svg>
);

// ============================================================
// ICON — thin (1.6) minimalist outline
// ============================================================
const Icon = ({ n, s = 18, c = 'currentColor', w = 1.6 }) => {
  const P = {
    home: <path d="M3 11.5L12 3l9 8.5M5.5 9.5V20a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1V9.5"/>,
    receipt: <><path d="M6 3v18l2-1.5 2 1.5 2-1.5 2 1.5 2-1.5 2 1.5V3H6z"/><path d="M9 8h6M9 12h6M9 16h3"/></>,
    analytics: <><path d="M4 20V10M10 20V4M16 20v-8M22 20v-5"/></>,
    profile: <><circle cx="12" cy="8" r="4"/><path d="M5 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    arrowUp: <path d="M12 19V5M6 11l6-6 6 6"/>,
    arrowDown: <path d="M12 5v14M6 13l6 6 6-6"/>,
    arrowRight: <path d="M5 12h14M13 6l6 6-6 6"/>,
    chevronRight: <path d="M9 6l6 6-6 6"/>,
    chevronLeft: <path d="M15 6l-6 6 6 6"/>,
    chevronDown: <path d="M6 9l6 6 6-6"/>,
    close: <path d="M18 6L6 18M6 6l12 12"/>,
    check: <path d="M20 6L9 17l-5-5"/>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
    bell: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>,
    card: <><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 11h18"/></>,
    bank: <><path d="M4 21h16M4 10h16M6 6.5l6-3 6 3M5 10v11M19 10v11M9 10v11M15 10v11"/></>,
    cash: <><rect x="2.5" y="6.5" width="19" height="11" rx="2"/><circle cx="12" cy="12" r="2.5"/></>,
    wallet: <><path d="M20 12V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-4"/><path d="M22 12h-4a2 2 0 0 0 0 4h4v-4z"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/></>,
    piggy: <><path d="M9 4v2M15 4v2"/><path d="M5 10c0-2 2-4 7-4s7 2 7 4v7a2 2 0 0 1-2 2h-1v2h-2v-2h-4v2H8v-2H6a2 2 0 0 1-2-2v-7z"/><circle cx="9" cy="13" r=".8"/><circle cx="15" cy="13" r=".8"/></>,
    sparkle: <path d="M12 3l1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5L12 3z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>,
    lock: <><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M21 7l-9 6-9-6"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M5 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1"/></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
    eyeOff: <><path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18 18 0 0 1 5-6M1 1l22 22M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18 18 0 0 1-3 4M9.9 9.9a3 3 0 0 0 4.2 4.2"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></>,
    zap: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>,
    trending: <><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></>,
    food: <><path d="M4 2v6c0 1 .8 2 2 2h2a2 2 0 0 0 2-2V2M7 2v20M20 15V3a4 4 0 0 0-4 4v6a2 2 0 0 0 2 2h2zm0 0v7"/></>,
    shopping: <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></>,
    car: <><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M7 17v2M17 17v2"/></>,
    bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>,
    homeIcon: <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V11z"/>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      {P[n] || P.home}
    </svg>
  );
};

// ============================================================
// THEME
// ============================================================
const THEME = {
  light: {
    bg: '#F4F5F7', card: '#FFFFFF', card2: '#EEF0F3',
    text: '#0A0A0A', text2: '#6B7280', text3: '#9CA3AF',
    border: 'rgba(10,10,10,0.06)', border2: 'rgba(10,10,10,0.1)',
    green: '#16A34A', greenSoft: '#DCFCE7', greenBg: '#F0FDF4',
    red: '#DC2626', redSoft: '#FEE2E2',
    blue: '#2563EB', blueSoft: '#DBEAFE',
    yellow: '#EAB308', yellowSoft: '#FEF9C3',
    sky: '#0EA5E9', skySoft: '#E0F2FE',
    shadow: '0 1px 2px rgba(10,10,10,0.04), 0 4px 16px rgba(10,10,10,0.04)',
    shadowLg: '0 4px 12px rgba(10,10,10,0.05), 0 16px 40px rgba(10,10,10,0.08)',
    glass: 'rgba(255,255,255,0.82)',
  },
  dark: {
    bg: '#0A0A0A', card: '#131313', card2: '#1C1C1C',
    text: '#FFFFFF', text2: '#A1A1AA', text3: '#71717A',
    border: 'rgba(255,255,255,0.06)', border2: 'rgba(255,255,255,0.1)',
    green: '#22C55E', greenSoft: 'rgba(34,197,94,0.14)', greenBg: 'rgba(34,197,94,0.08)',
    red: '#F87171', redSoft: 'rgba(248,113,113,0.14)',
    blue: '#60A5FA', blueSoft: 'rgba(96,165,250,0.14)',
    yellow: '#FBBF24', yellowSoft: 'rgba(251,191,36,0.14)',
    sky: '#38BDF8', skySoft: 'rgba(56,189,248,0.14)',
    shadow: '0 1px 2px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)',
    shadowLg: '0 4px 12px rgba(0,0,0,0.4), 0 16px 40px rgba(0,0,0,0.3)',
    glass: 'rgba(19,19,19,0.82)',
  },
};

const fmt = (n) => '₹' + Math.abs(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });

// ============================================================
// ANIMATED NUMBER (counts up smoothly)
// ============================================================
function Num({ value, size = 44, weight = 800, color, prefix = '₹', duration = 900 }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(0);
  useEffect(() => {
    const from = startRef.current;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (value - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
      else startRef.current = value;
    };
    requestAnimationFrame(tick);
  }, [value, duration]);
  return (
    <span style={{ fontSize: size, fontWeight: weight, letterSpacing: '-0.045em', color, lineHeight: 1, fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif', fontFeatureSettings: '"tnum"' }}>
      {prefix}{Math.round(display).toLocaleString('en-IN')}
    </span>
  );
}

// ============================================================
// 3D CARD with tilt + gloss + parallax
// ============================================================
function Card3D({ t, name, last4, holder, label = 'YOUR EVERYDAY CARD', style = {} }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setTilt({ x: (y - 0.5) * -14, y: (x - 0.5) * 18, gx: x * 100, gy: y * 100 });
  };
  const reset = () => setTilt({ x: 0, y: 0, gx: 50, gy: 50 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onTouchMove={(e) => { const touch = e.touches[0]; onMove(touch); }}
      onTouchEnd={reset}
      style={{
        perspective: 1000,
        ...style
      }}
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
          borderRadius: 22,
          background: 'linear-gradient(135deg, #0B1220 0%, #0F1E1A 55%, #0E3B24 100%)',
          padding: '24px 26px',
          aspectRatio: '1.6',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(10,10,10,0.15), 0 20px 50px rgba(10,10,10,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* gloss following mouse */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.14), transparent 45%)`,
          pointerEvents: 'none', transition: 'background 0.15s'
        }}/>
        {/* top-right green glow */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.35), transparent 70%)', pointerEvents: 'none' }}/>
        {/* edge shine */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: 22, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)', pointerEvents: 'none' }}/>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{name}</div>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon n="card" s={20} c="#fff" w={1.6}/>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 600, letterSpacing: '0.12em', marginBottom: 8 }}>{label}</div>
          <div style={{ fontSize: 22, color: '#fff', fontWeight: 700, letterSpacing: '0.18em', fontFamily: 'ui-monospace, monospace', marginBottom: 18 }}>•••• {last4}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '0.08em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{holder.toUpperCase()}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '0.08em' }}>CARD</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STORAGE
// ============================================================
const SK = 'wealthy_v3_users';
const SS = 'wealthy_v3_session';
const getUsers = () => { try { return JSON.parse(localStorage.getItem(SK) || '[]'); } catch { return []; } };
const setUsersLS = (u) => { try { localStorage.setItem(SK, JSON.stringify(u)); } catch {} };
const getSession = () => { try { return localStorage.getItem(SS); } catch { return null; } };
const setSession = (v) => { try { v ? localStorage.setItem(SS, v) : localStorage.removeItem(SS); } catch {} };

// ============================================================
// DEMO
// ============================================================
const DEMO = {
  id: 'demo', name: 'Sanjeev Yadav', email: 'demo@wealthy.app', password: 'demo',
  isDemo: true, onboarded: true,
  monthlyIncome: 85000,
  accounts: [
    { id: 'a1', type: 'bank', name: 'HDFC Bank', last4: '1840', balance: 84500 },
    { id: 'a2', type: 'debit', name: 'Everyday Card', last4: '4821', balance: 34500 },
    { id: 'a3', type: 'credit', name: 'Rewards Card', last4: '7392', balance: -38500, limit: 100000, used: 38500, bill: 12840, due: '18 Sep', utilization: 38.5 },
    { id: 'a4', type: 'cash', name: 'Cash Wallet', balance: 7150 },
    { id: 'a5', type: 'upi', name: 'UPI Wallet', balance: 2450 },
  ],
  budgets: [
    { id: 'b1', category: 'Food', amount: 8000, spent: 5420 },
    { id: 'b2', category: 'Shopping', amount: 10000, spent: 7800 },
    { id: 'b3', category: 'Transport', amount: 5000, spent: 3200 },
    { id: 'b4', category: 'Bills', amount: 4000, spent: 2549 },
  ],
  goals: [
    { id: 'g1', name: 'Laptop', target: 80000, saved: 45000 },
    { id: 'g2', name: 'Emergency Fund', target: 200000, saved: 85000 },
  ],
  transactions: [
    { id: 1, date: '2025-09-12', amount: 85000, type: 'income', category: 'Salary', merchant: 'Salary', method: 'Bank transfer', account: 'HDFC Bank' },
    { id: 2, date: '2025-09-11', amount: 420, type: 'expense', category: 'Food', merchant: 'Swiggy', method: 'UPI', account: 'UPI Wallet' },
    { id: 3, date: '2025-09-10', amount: 2499, type: 'expense', category: 'Shopping', merchant: 'Amazon', method: 'Credit card', account: 'Rewards Card' },
    { id: 4, date: '2025-09-09', amount: 1840, type: 'expense', category: 'Bills', merchant: 'Electricity Bill', method: 'Bank account', account: 'HDFC Bank' },
    { id: 5, date: '2025-09-08', amount: 4000, type: 'expense', category: 'Cash', merchant: 'ATM Withdrawal', method: 'Cash', account: 'Cash Wallet' },
    { id: 6, date: '2025-09-07', amount: 385, type: 'expense', category: 'Food', merchant: 'Blue Tokai', method: 'UPI', account: 'UPI Wallet' },
  ],
  monthlySpend: [
    { m: 'Oct', v: 28000 }, { m: 'Nov', v: 32000 }, { m: 'Dec', v: 29000 },
    { m: 'Jan', v: 35000 }, { m: 'Feb', v: 31000 }, { m: 'Mar', v: 38000 },
    { m: 'Apr', v: 33000 }, { m: 'May', v: 41000 }, { m: 'Jun', v: 36000 },
    { m: 'Jul', v: 39000 }, { m: 'Aug', v: 37000 }, { m: 'Sep', v: 42650 },
  ],
};

// ============================================================
// ROOT
// ============================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [screen, setScreen] = useState('welcome');
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);
  const t = dark ? THEME.dark : THEME.light;

  useEffect(() => {
    const sid = getSession();
    const stored = getUsers();
    setUsers(stored);
    if (sid === 'demo') { setUser(DEMO); setScreen('app'); }
    else if (sid) { const f = stored.find(u => u.id === sid); if (f) { setUser(f); setScreen(f.onboarded ? 'app' : 'onboarding'); } }
    setReady(true);
  }, []);

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.color = t.text;
    document.body.style.margin = '0';
    document.body.style.fontFamily = '"Plus Jakarta Sans", "Inter", -apple-system, sans-serif';
    document.body.style.transition = 'background 0.35s, color 0.35s';
    document.body.style.webkitFontSmoothing = 'antialiased';
    if (!document.getElementById('w-font')) {
      const l = document.createElement('link');
      l.id = 'w-font'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap';
      document.head.appendChild(l);
    }
  }, [t]);

  const demoLogin = () => { setUser(DEMO); setSession('demo'); setScreen('app'); };
  const signup = (data) => {
    const nu = { id: 'u_' + Date.now(), ...data, isDemo: false, onboarded: false, monthlyIncome: 0, accounts: [], budgets: [], goals: [], transactions: [], monthlySpend: DEMO.monthlySpend };
    const u = [...users, nu]; setUsers(u); setUsersLS(u);
    setUser(nu); setSession(nu.id); setScreen('onboarding');
  };
  const signin = (email, pw) => {
    const f = users.find(u => u.email === email && u.password === pw);
    if (!f) return { error: 'Invalid email or password' };
    setUser(f); setSession(f.id); setScreen(f.onboarded ? 'app' : 'onboarding');
    return { success: true };
  };
  const updateUser = (up) => {
    if (!user) return;
    const nu = { ...user, ...up };
    setUser(nu);
    if (!user.isDemo) { const u = users.map(x => x.id === user.id ? nu : x); setUsers(u); setUsersLS(u); }
  };
  const logout = () => { setUser(null); setSession(null); setScreen('welcome'); };
  const finishOnboarding = (d) => {
    updateUser({ ...d, onboarded: true, transactions: [{ id: Date.now(), date: new Date().toISOString().slice(0,10), amount: d.monthlyIncome, type: 'income', category: 'Salary', merchant: 'Monthly Income', method: 'Bank transfer' }], monthlySpend: DEMO.monthlySpend });
    setScreen('app');
  };

  if (!ready) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.bg }}><Logo size={56}/></div>;

  return (
    <>
      <GlobalStyles t={t}/>
      {!user && screen === 'welcome' && <Welcome t={t} onDemo={demoLogin} onSignup={() => setScreen('signup')} onSignin={() => setScreen('signin')}/>}
      {!user && screen === 'signup' && <Signup t={t} onBack={() => setScreen('welcome')} onSignup={signup} onSwitch={() => setScreen('signin')}/>}
      {!user && screen === 'signin' && <Signin t={t} onBack={() => setScreen('welcome')} onSignin={signin} onSwitch={() => setScreen('signup')} onForgot={() => setScreen('forgot')} onDemo={demoLogin}/>}
      {!user && screen === 'forgot' && <Forgot t={t} onBack={() => setScreen('signin')}/>}
      {user && !user.onboarded && screen === 'onboarding' && <Onboarding t={t} user={user} onComplete={finishOnboarding} onSkip={() => { updateUser({ onboarded: true }); setScreen('app'); }}/>}
      {user && (screen === 'app' || (user.onboarded && screen !== 'onboarding')) && <Shell user={user} updateUser={updateUser} t={t} dark={dark} setDark={setDark} onLogout={logout}/>}
    </>
  );
}

// ============================================================
// GLOBAL STYLES
// ============================================================
function GlobalStyles({ t }) {
  return <style>{`
    *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
    html,body{overscroll-behavior-y:none;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    @keyframes scaleIn{from{opacity:0;transform:scale(.95);}to{opacity:1;transform:scale(1);}}
    @keyframes slideUp{from{transform:translateY(100%);}to{transform:translateY(0);}}
    @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
    @keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
    @keyframes drawIn{from{stroke-dashoffset:var(--c);}to{stroke-dashoffset:var(--o);}}
    @keyframes growBar{from{transform:scaleY(0);}to{transform:scaleY(1);}}
    @keyframes popIn{0%{opacity:0;transform:scale(.85);}60%{transform:scale(1.02);}100%{opacity:1;transform:scale(1);}}
    .fu{animation:fadeUp .55s cubic-bezier(.22,1,.36,1) both;}
    .fi{animation:fadeIn .35s ease both;}
    .si{animation:scaleIn .45s cubic-bezier(.22,1,.36,1) both;}
    .su{animation:slideUp .45s cubic-bezier(.22,1,.36,1) both;}
    .fl{animation:float 6s ease-in-out infinite;}
    .pop{animation:popIn .5s cubic-bezier(.22,1,.36,1) both;}
    .stagger>*{animation:fadeUp .55s cubic-bezier(.22,1,.36,1) both;}
    .stagger>*:nth-child(1){animation-delay:.02s;}
    .stagger>*:nth-child(2){animation-delay:.06s;}
    .stagger>*:nth-child(3){animation-delay:.1s;}
    .stagger>*:nth-child(4){animation-delay:.14s;}
    .stagger>*:nth-child(5){animation-delay:.18s;}
    .stagger>*:nth-child(6){animation-delay:.22s;}
    .lift{transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s cubic-bezier(.22,1,.36,1);}
    .lift:hover{transform:translateY(-3px);}
    .lift:active{transform:translateY(-1px) scale(.995);}
    .btn{transition:transform .15s cubic-bezier(.22,1,.36,1),background .25s,color .25s,box-shadow .25s;cursor:pointer;border:none;font-family:inherit;}
    .btn:active{transform:scale(.96);}
    .btn:disabled{opacity:.4;cursor:not-allowed;}
    input,select,textarea{font-family:inherit;}
    input:focus,select:focus,textarea:focus{outline:none;}
    ::-webkit-scrollbar{width:5px;height:5px;}
    ::-webkit-scrollbar-thumb{background:${t.border2};border-radius:3px;}
    ::-webkit-scrollbar-track{background:transparent;}
    @media (min-width:900px){.mob{display:none!important;}}
    @media (max-width:899px){.desk{display:none!important;}}
  `}</style>;
}

// ============================================================
// WELCOME
// ============================================================
function Welcome({ t, onDemo, onSignup, onSignin }) {
  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="si" style={{ maxWidth: 420, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, justifyContent: 'center' }}>
          <Logo size={38}/>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: t.text, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Wealthy</div>
        </div>
        <div style={{ background: t.card, borderRadius: 26, padding: 34, boxShadow: t.shadowLg, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.1, color: t.text, marginBottom: 12, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            Your money,<br/>beautifully organized.
          </div>
          <div style={{ fontSize: 15, color: t.text2, lineHeight: 1.55, marginBottom: 32 }}>
            See where your money goes, how much you save, and what you can improve.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={onDemo} className="btn" style={{ padding: '15px 20px', borderRadius: 14, background: '#0A0A0A', color: '#fff', fontWeight: 700, fontSize: 15, boxShadow: '0 10px 24px rgba(10,10,10,0.22)', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Try Demo
            </button>
            <button onClick={onSignup} className="btn" style={{ padding: '15px 20px', borderRadius: 14, background: '#16A34A', color: '#fff', fontWeight: 700, fontSize: 15, boxShadow: '0 10px 24px rgba(22,163,74,0.25)', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Create Account
            </button>
            <button onClick={onSignin} className="btn" style={{ padding: '15px 20px', borderRadius: 14, background: 'transparent', color: t.text2, fontWeight: 600, fontSize: 14, border: `1px solid ${t.border}` }}>
              Sign in
            </button>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: t.text3 }}>🔒 Your data stays on your device</div>
      </div>
    </div>
  );
}

// ============================================================
// AUTH
// ============================================================
function AuthWrap({ t, onBack, title, sub, children }) {
  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="si" style={{ maxWidth: 400, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
          <button onClick={onBack} className="btn" style={{ width: 36, height: 36, borderRadius: 10, background: t.card, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="chevronLeft" s={16} c={t.text2}/></button>
          <Logo size={28}/>
          <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em' }}>Wealthy</div>
        </div>
        <div style={{ background: t.card, borderRadius: 24, padding: 28, boxShadow: t.shadowLg, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: t.text, marginBottom: 6, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{title}</div>
          <div style={{ fontSize: 13.5, color: t.text2, marginBottom: 24 }}>{sub}</div>
          {children}
        </div>
      </div>
    </div>
  );
}

function Field({ t, icon, label, value, onChange, placeholder, type = 'text', rightIcon, onRight }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: t.text3, letterSpacing: '0.08em', display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 12, padding: '12px 14px' }}>
        {icon && <Icon n={icon} s={16} c={t.text3}/>}
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ flex: 1, background: 'transparent', border: 'none', color: t.text, fontSize: 14.5, fontWeight: 500 }}/>
        {rightIcon && <button onClick={onRight} className="btn" style={{ padding: 4, background: 'transparent' }}><Icon n={rightIcon} s={16} c={t.text3}/></button>}
      </div>
    </div>
  );
}

function Signup({ t, onBack, onSignup, onSwitch }) {
  const [name, setName] = useState(''), [email, setEmail] = useState(''), [pw, setPw] = useState(''), [cp, setCp] = useState('');
  const [show, setShow] = useState(false), [err, setErr] = useState('');
  const go = () => {
    if (!name.trim()) return setErr('Enter your name');
    if (!email.includes('@')) return setErr('Enter a valid email');
    if (pw.length < 6) return setErr('Password must be 6+ characters');
    if (pw !== cp) return setErr('Passwords do not match');
    onSignup({ name: name.trim(), email: email.trim().toLowerCase(), password: pw });
  };
  return (
    <AuthWrap t={t} onBack={onBack} title="Create account" sub="Start tracking your money today">
      <Field t={t} icon="user" label="Name" value={name} onChange={setName} placeholder="Your name"/>
      <Field t={t} icon="mail" label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email"/>
      <Field t={t} icon="lock" label="Password" value={pw} onChange={setPw} placeholder="Min 6 characters" type={show ? 'text' : 'password'} rightIcon={show ? 'eyeOff' : 'eye'} onRight={() => setShow(!show)}/>
      <Field t={t} icon="lock" label="Confirm Password" value={cp} onChange={setCp} placeholder="Re-enter password" type="password"/>
      {err && <div style={{ padding: 12, background: t.redSoft, borderRadius: 10, color: t.red, fontSize: 13, fontWeight: 600, marginBottom: 14 }}>{err}</div>}
      <button onClick={go} className="btn" style={{ width: '100%', padding: 15, borderRadius: 12, background: '#16A34A', color: '#fff', fontWeight: 700, fontSize: 15, boxShadow: '0 8px 22px rgba(22,163,74,0.25)', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Create account</button>
      <div style={{ textAlign: 'center', fontSize: 13.5, color: t.text2, marginTop: 18 }}>
        Already have an account? <button onClick={onSwitch} className="btn" style={{ color: '#16A34A', fontWeight: 700, background: 'transparent', fontSize: 13.5 }}>Sign in</button>
      </div>
    </AuthWrap>
  );
}

function Signin({ t, onBack, onSignin, onSwitch, onForgot, onDemo }) {
  const [email, setEmail] = useState(''), [pw, setPw] = useState('');
  const [show, setShow] = useState(false), [err, setErr] = useState('');
  const go = () => {
    if (!email || !pw) return setErr('Please fill all fields');
    const r = onSignin(email.trim().toLowerCase(), pw);
    if (r?.error) setErr(r.error);
  };
  return (
    <AuthWrap t={t} onBack={onBack} title="Welcome back" sub="Sign in to continue">
      <Field t={t} icon="mail" label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email"/>
      <Field t={t} icon="lock" label="Password" value={pw} onChange={setPw} placeholder="Your password" type={show ? 'text' : 'password'} rightIcon={show ? 'eyeOff' : 'eye'} onRight={() => setShow(!show)}/>
      {err && <div style={{ padding: 12, background: t.redSoft, borderRadius: 10, color: t.red, fontSize: 13, fontWeight: 600, marginBottom: 14 }}>{err}</div>}
      <button onClick={go} className="btn" style={{ width: '100%', padding: 15, borderRadius: 12, background: '#16A34A', color: '#fff', fontWeight: 700, fontSize: 15, boxShadow: '0 8px 22px rgba(22,163,74,0.25)', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Sign in</button>
      <button onClick={onDemo} className="btn" style={{ width: '100%', padding: 14, borderRadius: 12, background: t.card2, color: t.text, fontWeight: 700, fontSize: 14, marginTop: 10 }}>Try Demo instead</button>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, fontSize: 13 }}>
        <button onClick={onForgot} className="btn" style={{ color: t.text2, fontWeight: 500, background: 'transparent', fontSize: 13 }}>Forgot password?</button>
        <button onClick={onSwitch} className="btn" style={{ color: '#16A34A', fontWeight: 700, background: 'transparent', fontSize: 13 }}>Create account</button>
      </div>
    </AuthWrap>
  );
}

function Forgot({ t, onBack }) {
  const [email, setEmail] = useState(''), [sent, setSent] = useState(false);
  return (
    <AuthWrap t={t} onBack={onBack} title="Reset password" sub={sent ? '' : "We'll send a reset link"}>
      {!sent ? (
        <>
          <Field t={t} icon="mail" label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email"/>
          <button onClick={() => email.includes('@') && setSent(true)} className="btn" style={{ width: '100%', padding: 15, borderRadius: 12, background: '#16A34A', color: '#fff', fontWeight: 700, fontSize: 15 }}>Send reset link</button>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div className="pop" style={{ width: 56, height: 56, borderRadius: 16, background: t.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <Icon n="check" s={26} c={t.green} w={2.5}/>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Check your email</div>
          <div style={{ fontSize: 13.5, color: t.text2, lineHeight: 1.6 }}>Reset link sent to {email}</div>
          <button onClick={onBack} className="btn" style={{ marginTop: 18, padding: '12px 20px', borderRadius: 12, background: t.card2, color: t.text, fontWeight: 700, fontSize: 13.5 }}>Back to sign in</button>
        </div>
      )}
    </AuthWrap>
  );
}

// ============================================================
// ONBOARDING
// ============================================================
function Onboarding({ t, user, onComplete, onSkip }) {
  const [step, setStep] = useState(0);
  const [income, setIncome] = useState('');
  const [accounts, setAccounts] = useState([
    { id: 'a1', type: 'bank', name: 'Bank Account', balance: '', enabled: true },
    { id: 'a2', type: 'cash', name: 'Cash Wallet', balance: '', enabled: true },
    { id: 'a3', type: 'upi', name: 'UPI Wallet', balance: '', enabled: false },
  ]);
  const [budgets, setBudgets] = useState([
    { id: 'b1', category: 'Food', amount: '8000', enabled: true },
    { id: 'b2', category: 'Shopping', amount: '10000', enabled: true },
    { id: 'b3', category: 'Transport', amount: '5000', enabled: true },
    { id: 'b4', category: 'Bills', amount: '4000', enabled: true },
  ]);
  const [goalName, setGoalName] = useState('Emergency Fund');
  const [goalTarget, setGoalTarget] = useState('200000');

  const incomeNum = parseFloat(income) || 0;
  const totalBudget = budgets.reduce((s, b) => s + (parseFloat(b.amount) || 0), 0);
  const canNext = step === 1 ? incomeNum > 0 : true;

  const steps = [
    { title: `Hi ${user.name.split(' ')[0]} 👋`, sub: "Let's set up your Wealthy account in 4 quick steps.", icon: 'sparkle' },
    { title: 'Monthly income', sub: 'What\'s your typical monthly income?', icon: 'arrowDown' },
    { title: 'Your accounts', sub: 'Add starting balances for your accounts.', icon: 'wallet' },
    { title: 'Monthly budgets', sub: 'Set spending limits for main categories.', icon: 'target' },
    { title: 'First goal', sub: 'What are you saving for?', icon: 'piggy' },
  ];

  const finish = () => onComplete({
    monthlyIncome: incomeNum,
    accounts: accounts.filter(a => a.enabled).map(a => ({ id: a.id, type: a.type, name: a.name, balance: parseFloat(a.balance) || 0 })),
    budgets: budgets.map(b => ({ id: b.id, category: b.category, amount: parseFloat(b.amount) || 0, spent: 0 })),
    goals: goalName && goalTarget ? [{ id: 'g1', name: goalName, target: parseFloat(goalTarget) || 0, saved: 0 }] : [],
  });

  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="si" style={{ maxWidth: 460, width: '100%', background: t.card, borderRadius: 24, padding: 30, boxShadow: t.shadowLg, border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', gap: 5, marginBottom: 26 }}>
          {steps.map((_, i) => <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= step ? '#16A34A' : t.border, transition: 'background .4s' }}/>)}
        </div>
        <div className="pop" style={{ width: 56, height: 56, borderRadius: 16, background: t.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Icon n={steps[step].icon} s={26} c="#16A34A" w={1.8}/>
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6, color: t.text, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{steps[step].title}</div>
        <div style={{ fontSize: 14, color: t.text2, marginBottom: 22, lineHeight: 1.55 }}>{steps[step].sub}</div>

        {step === 1 && (
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: t.text3, letterSpacing: '0.08em' }}>MONTHLY INCOME</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 12, padding: '14px 16px' }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: t.text3, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>₹</span>
              <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="85000" style={{ flex: 1, background: 'transparent', border: 'none', color: t.text, fontSize: 22, fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif', letterSpacing: '-0.02em' }}/>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
            {accounts.map(a => (
              <div key={a.id} style={{ background: a.enabled ? t.greenBg : t.bg, border: `1px solid ${a.enabled ? '#16A34A' : t.border}`, borderRadius: 12, padding: 12, transition: 'all .3s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button onClick={() => setAccounts(accounts.map(x => x.id === a.id ? { ...x, enabled: !x.enabled } : x))} className="btn" style={{ width: 22, height: 22, borderRadius: 6, background: a.enabled ? '#16A34A' : t.card, border: `1.5px solid ${a.enabled ? '#16A34A' : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {a.enabled && <Icon n="check" s={12} c="#fff" w={3}/>}
                  </button>
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: t.text }}>{a.name}</div>
                </div>
                {a.enabled && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: t.card, borderRadius: 10, padding: '8px 12px', marginTop: 10, border: `1px solid ${t.border}` }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: t.text3 }}>₹</span>
                    <input type="number" value={a.balance} onChange={e => setAccounts(accounts.map(x => x.id === a.id ? { ...x, balance: e.target.value } : x))} placeholder="Starting balance" style={{ flex: 1, background: 'transparent', border: 'none', color: t.text, fontSize: 13.5, fontWeight: 600 }}/>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div style={{ marginBottom: 18 }}>
            {budgets.map(b => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: t.text }}>{b.category}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 10, padding: '8px 12px', width: 128 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.text3 }}>₹</span>
                  <input type="number" value={b.amount} onChange={e => setBudgets(budgets.map(x => x.id === b.id ? { ...x, amount: e.target.value } : x))} style={{ flex: 1, background: 'transparent', border: 'none', color: t.text, fontSize: 13, fontWeight: 700, width: '100%' }}/>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 14, padding: 12, background: totalBudget > incomeNum ? t.redSoft : t.greenSoft, borderRadius: 10, fontSize: 13, color: totalBudget > incomeNum ? t.red : '#16A34A', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
              <span>Total budget</span><span>{fmt(totalBudget)} / {fmt(incomeNum)}</span>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ marginBottom: 18 }}>
            <Field t={t} label="Goal name" value={goalName} onChange={setGoalName} placeholder="Emergency Fund"/>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: t.text3, letterSpacing: '0.08em' }}>TARGET AMOUNT</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 12, padding: '12px 14px' }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: t.text3 }}>₹</span>
                <input type="number" value={goalTarget} onChange={e => setGoalTarget(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', color: t.text, fontSize: 16, fontWeight: 800 }}/>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
          {step > 0 && <button onClick={() => setStep(step - 1)} className="btn" style={{ padding: '13px 18px', borderRadius: 12, background: t.card2, color: t.text2, fontWeight: 700, fontSize: 14 }}>Back</button>}
          <button onClick={onSkip} className="btn" style={{ padding: '13px 12px', borderRadius: 12, color: t.text3, fontSize: 13, fontWeight: 600, background: 'transparent' }}>Skip</button>
          {step < 4 ? (
            <button onClick={() => canNext && setStep(step + 1)} disabled={!canNext} className="btn" style={{ flex: 1, padding: 13, borderRadius: 12, background: canNext ? '#16A34A' : t.card2, color: canNext ? '#fff' : t.text3, fontWeight: 800, fontSize: 14, boxShadow: canNext ? '0 8px 22px rgba(22,163,74,0.25)' : 'none', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Continue</button>
          ) : (
            <button onClick={finish} className="btn" style={{ flex: 1, padding: 13, borderRadius: 12, background: '#16A34A', color: '#fff', fontWeight: 800, fontSize: 14, boxShadow: '0 8px 22px rgba(22,163,74,0.25)', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Finish setup</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SHELL
// ============================================================
function Shell({ user, updateUser, t, dark, setDark, onLogout }) {
  const [page, setPage] = useState('dashboard');
  const [addOpen, setAddOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [period, setPeriod] = useState('month');

  const txns = user.transactions || [];
  const accounts = user.accounts || [];

  const totals = useMemo(() => {
    const inc = txns.filter(x => x.type === 'income').reduce((s, x) => s + x.amount, 0);
    const exp = txns.filter(x => x.type === 'expense').reduce((s, x) => s + x.amount, 0);
    const sav = inc - exp;
    const rate = inc > 0 ? (sav / inc) * 100 : 0;
    const bal = accounts.reduce((s, a) => s + (a.balance || 0), 0);
    return { inc, exp, sav, rate, bal: bal > 0 ? bal : 124850 };
  }, [txns, accounts]);

  const addTx = (tx) => { updateUser({ transactions: [{ ...tx, id: Date.now() }, ...txns] }); setAddOpen(false); };
  const delTx = (id) => updateUser({ transactions: txns.filter(x => x.id !== id) });

  const nav = [
    { id: 'dashboard', label: 'Overview', icon: 'home' },
    { id: 'transactions', label: 'Transactions', icon: 'receipt' },
    { id: 'budgets', label: 'Budgets', icon: 'target' },
    { id: 'savings', label: 'Savings', icon: 'piggy' },
    { id: 'analytics', label: 'Analytics', icon: 'analytics' },
    { id: 'accounts', label: 'Accounts', icon: 'wallet' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: t.bg }}>
      {/* Top nav — desktop, pill style (from Tourear image) */}
      <header className="desk" style={{ position: 'sticky', top: 12, zIndex: 30, margin: '12px 20px 0', borderRadius: 100, background: t.glass, backdropFilter: 'blur(20px) saturate(180%)', border: `1px solid ${t.border}`, padding: '8px 8px 8px 20px', display: 'flex', alignItems: 'center', gap: 6, boxShadow: t.shadow }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 16, borderRight: `1px solid ${t.border}` }}>
          <Logo size={26}/>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Wealthy</div>
        </div>
        <nav style={{ display: 'flex', gap: 2, marginLeft: 10 }}>
          {nav.map(n => {
            const active = page === n.id;
            return (
              <button key={n.id} onClick={() => setPage(n.id)} className="btn" style={{ padding: '8px 14px', borderRadius: 100, fontSize: 13.5, fontWeight: active ? 700 : 500, background: active ? t.text : 'transparent', color: active ? t.bg : t.text2, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                {n.label}
              </button>
            );
          })}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="btn" style={{ width: 34, height: 34, borderRadius: 100, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="search" s={16} c={t.text2}/></button>
          <button className="btn" style={{ width: 34, height: 34, borderRadius: 100, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="bell" s={16} c={t.text2}/></button>
          <button onClick={() => setAddOpen(true)} className="btn" style={{ padding: '9px 18px', borderRadius: 100, background: '#0A0A0A', color: '#fff', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            <Icon n="plus" s={14} c="#fff" w={2.2}/> Add
          </button>
          <button onClick={() => setProfileOpen(true)} className="btn" style={{ width: 34, height: 34, borderRadius: 100, background: t.card2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="user" s={16} c={t.text2}/></button>
        </div>
      </header>

      {/* Mobile header */}
      <header className="mob" style={{ position: 'sticky', top: 0, zIndex: 30, background: t.glass, backdropFilter: 'blur(20px)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${t.border}` }}>
        <Logo size={28}/>
        <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Wealthy</div>
        <button className="btn" style={{ marginLeft: 'auto', width: 34, height: 34, borderRadius: 100, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="search" s={18} c={t.text2}/></button>
        <button onClick={() => setProfileOpen(true)} className="btn" style={{ width: 34, height: 34, borderRadius: 100, background: t.card2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="user" s={18} c={t.text2}/></button>
      </header>

      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 24px 130px' }} className="page-main">
        <style>{`@media (max-width:899px){.page-main{padding:20px 18px 120px!important;}}`}</style>
        <div key={page} className="fu">
          {page === 'dashboard' && <Dashboard t={t} totals={totals} txns={txns} user={user} period={period} setPeriod={setPeriod} setPage={setPage} onAdd={() => setAddOpen(true)}/>}
          {page === 'transactions' && <TransactionsPage t={t} txns={txns} onDelete={delTx} onAdd={() => setAddOpen(true)}/>}
          {page === 'budgets' && <BudgetsPage t={t} budgets={user.budgets || []} update={(b) => updateUser({ budgets: b })}/>}
          {page === 'savings' && <SavingsPage t={t} goals={user.goals || []} update={(g) => updateUser({ goals: g })}/>}
          {page === 'analytics' && <AnalyticsPage t={t} txns={txns} totals={totals} user={user}/>}
          {page === 'accounts' && <AccountsPage t={t} accounts={accounts} user={user}/>}
        </div>
      </main>

      {/* Mobile bottom nav — center FAB is BLACK (not green) */}
      <div className="mob" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, background: t.glass, backdropFilter: 'blur(20px) saturate(180%)', borderTop: `1px solid ${t.border}`, display: 'flex', padding: '10px 20px 22px', justifyContent: 'space-between', alignItems: 'center' }}>
        {[
          { id: 'dashboard', label: 'Home', icon: 'home' },
          { id: 'transactions', label: 'Transactions', icon: 'receipt' },
        ].map(n => {
          const a = page === n.id;
          return (
            <button key={n.id} onClick={() => setPage(n.id)} className="btn" style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'transparent' }}>
              <Icon n={n.icon} s={22} c={a ? '#16A34A' : '#4B5563'} w={a ? 2 : 1.7}/>
              <span style={{ fontSize: 11, fontWeight: 600, color: a ? '#16A34A' : '#6B7280', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{n.label}</span>
            </button>
          );
        })}
        <button onClick={() => setAddOpen(true)} className="btn" style={{ width: 56, height: 56, borderRadius: '50%', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(10,10,10,0.3)', marginTop: -16, flexShrink: 0 }}>
          <Icon n="plus" s={26} c="#fff" w={2.4}/>
        </button>
        {[
          { id: 'analytics', label: 'Analytics', icon: 'analytics' },
          { id: 'profile', label: 'Profile', icon: 'profile' },
        ].map(n => {
          const a = page === n.id || (n.id === 'profile' && profileOpen);
          return (
            <button key={n.id} onClick={() => n.id === 'profile' ? setProfileOpen(true) : setPage(n.id)} className="btn" style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'transparent' }}>
              <Icon n={n.icon} s={22} c={a ? '#16A34A' : '#4B5563'} w={a ? 2 : 1.7}/>
              <span style={{ fontSize: 11, fontWeight: 600, color: a ? '#16A34A' : '#6B7280', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{n.label}</span>
            </button>
          );
        })}
      </div>

      {addOpen && <AddModal t={t} onClose={() => setAddOpen(false)} onSave={addTx}/>}
      {profileOpen && <ProfileModal t={t} user={user} dark={dark} setDark={setDark} updateUser={updateUser} onClose={() => setProfileOpen(false)} onLogout={onLogout}/>}
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================
function Dashboard({ t, totals, txns, user, period, setPeriod, setPage, onAdd }) {
  const recent = txns.slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      {/* HERO */}
      <div className="dash-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 36, alignItems: 'start' }}>
        <style>{`@media (max-width:899px){.dash-hero{grid-template-columns:1fr!important;gap:22px!important;}}`}</style>
        <div>
          <div className="fu" style={{ fontSize: 13, color: '#16A34A', fontWeight: 700, marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Good morning</div>
          <div className="fu" style={{ fontSize: 'clamp(28px, 4.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08, color: t.text, marginBottom: 12, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            Your money,<br/>beautifully organized.
          </div>
          <div className="fu" style={{ fontSize: 15, color: t.text2, lineHeight: 1.55, marginBottom: 30, maxWidth: 460 }}>
            See where your money goes, how much you save, and what you can improve.
          </div>

          <div className="fu" style={{ fontSize: 11.5, color: t.text3, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 10, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>TOTAL BALANCE</div>
          <div className="fu" style={{ marginBottom: 12 }}>
            <Num value={totals.bal} size={54} weight={800} color={t.text}/>
          </div>
          <div className="fu" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 26, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14, color: '#16A34A', fontWeight: 700, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>+₹8,420 this month</span>
            <span style={{ fontSize: 12, padding: '4px 11px', borderRadius: 100, background: t.greenSoft, color: '#16A34A', fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif', display: 'flex', alignItems: 'center', gap: 3 }}>
              <Icon n="arrowUp" s={11} c="#16A34A" w={2.4}/> 7.2%
            </span>
          </div>

          <div className="fu" style={{ display: 'inline-flex', gap: 2, padding: 4, background: t.card2, borderRadius: 100 }}>
            {['Today', 'Week', 'Month', 'Year'].map(p => {
              const a = period === p.toLowerCase();
              return (
                <button key={p} onClick={() => setPeriod(p.toLowerCase())} className="btn" style={{ padding: '8px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600, background: a ? t.card : 'transparent', color: a ? t.text : t.text2, boxShadow: a ? t.shadow : 'none', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D CARD — real tilt animation */}
        <div className="si"><Card3D t={t} name="Wealthy" last4="4821" holder={user.name}/></div>
      </div>

      {/* STATS */}
      <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        <Stat t={t} label="Income" value={totals.inc} delta="12.4%" up icon="arrowDown"/>
        <Stat t={t} label="Expenses" value={totals.exp} delta="4.8%" down icon="arrowUp"/>
        <Stat t={t} label="Savings" value={totals.sav} delta="18.2%" up icon="piggy"/>
        <Stat t={t} label="Savings rate" valueText={totals.rate.toFixed(1) + '%'} note="Strong this month" icon="trending"/>
      </div>

      {/* Quick actions */}
      <div className="fu">
        <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 14, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Quick actions</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { label: 'Expense', icon: 'arrowUp', color: '#DC2626', bg: t.redSoft, onClick: onAdd },
            { label: 'Income', icon: 'arrowDown', color: '#16A34A', bg: t.greenSoft, onClick: onAdd },
            { label: 'Transfer', icon: 'arrowRight', color: '#2563EB', bg: t.blueSoft },
            { label: 'Cash', icon: 'cash', color: '#EAB308', bg: t.yellowSoft },
            { label: 'Card', icon: 'card', color: '#0EA5E9', bg: t.skySoft },
            { label: 'Bill', icon: 'receipt', color: '#DC2626', bg: t.redSoft },
          ].map((a, i) => (
            <button key={i} onClick={a.onClick} className="btn lift" style={{ minWidth: 76, padding: '14px 10px', borderRadius: 16, background: t.card, border: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, boxShadow: t.shadow }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon n={a.icon} s={17} c={a.color} w={2}/>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.text2, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{a.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent + Savings */}
      <div className="rec-sav" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <style>{`@media (max-width:899px){.rec-sav{grid-template-columns:1fr!important;}}`}</style>

        <div style={{ background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, boxShadow: t.shadow, overflow: 'hidden' }}>
          <div style={{ padding: '20px 22px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Recent transactions</div>
            <button onClick={() => setPage('transactions')} className="btn" style={{ fontSize: 13, color: '#16A34A', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3, background: 'transparent', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              View all <Icon n="arrowRight" s={13} c="#16A34A" w={2.2}/>
            </button>
          </div>
          {recent.length === 0 ? <Empty t={t} onAdd={onAdd}/> : recent.map((tx, i) => <TxRow key={tx.id} tx={tx} t={t} last={i === recent.length - 1} delay={i * 0.04}/>)}
        </div>

        <div style={{ background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, boxShadow: t.shadow, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
            <Icon n="sparkle" s={14} c="#16A34A" w={2}/>
            <div style={{ fontSize: 13.5, color: '#16A34A', fontWeight: 700, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Your savings are growing.</div>
          </div>
          <div style={{ marginBottom: 6 }}>
            <Num value={totals.sav} size={34} weight={800} color={t.text}/>
          </div>
          <div style={{ fontSize: 13, color: t.text2, marginBottom: 24 }}>saved this month · {totals.rate.toFixed(1)}% savings rate</div>

          {(() => {
            const goal = (user.goals || [])[0];
            if (!goal) return null;
            const p = goal.target > 0 ? (goal.saved / goal.target) * 100 : 0;
            const r = 58, c = 2 * Math.PI * r;
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
                <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
                  <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="70" cy="70" r={r} fill="none" stroke={t.card2} strokeWidth="11"/>
                    <circle cx="70" cy="70" r={r} fill="none" stroke="#16A34A" strokeWidth="11" strokeDasharray={c} strokeDashoffset={c - (c * p / 100)} strokeLinecap="round" style={{ animation: 'drawIn 1.3s cubic-bezier(.22,1,.36,1) forwards', '--c': c, '--o': c - (c * p / 100) }}/>
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{p.toFixed(0)}%</div>
                    <div style={{ fontSize: 11, color: t.text3, fontWeight: 600 }}>Goal</div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 6, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{goal.name}</div>
                  <div style={{ fontSize: 13, color: t.text2 }}>{fmt(goal.saved)} of {fmt(goal.target)}</div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* WHERE YOUR MONEY GOES */}
      <div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Where your money goes.</div>
        <div style={{ fontSize: 14, color: t.text2, marginBottom: 20 }}>A clear view of this month's spending.</div>

        <div className="money-goes" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
          <style>{`@media (max-width:899px){.money-goes{grid-template-columns:1fr!important;}}`}</style>

          <div style={{ background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, boxShadow: t.shadow, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
              <div>
                <div style={{ fontSize: 13, color: t.text2, fontWeight: 600, marginBottom: 8 }}>Monthly spending</div>
                <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{fmt(totals.exp)}</div>
              </div>
              <div style={{ fontSize: 12.5, padding: '6px 13px', borderRadius: 100, background: t.greenSoft, color: '#16A34A', fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>-4.8%</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 150 }}>
              {DEMO.monthlySpend.map((d, i) => {
                const max = Math.max(...DEMO.monthlySpend.map(x => x.v));
                const h = (d.v / max) * 100;
                const last = i === DEMO.monthlySpend.length - 1;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: '100%', height: 120, display: 'flex', alignItems: 'flex-end' }}>
                      <div style={{ width: '100%', height: `${h}%`, background: last ? '#16A34A' : t.greenSoft, borderRadius: 6, transformOrigin: 'bottom', animation: `growBar .8s cubic-bezier(.22,1,.36,1) ${i * .04}s both` }}/>
                    </div>
                    <div style={{ fontSize: 10.5, color: t.text3, fontWeight: 600 }}>{d.m}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, boxShadow: t.shadow, padding: 24 }}>
            <div style={{ fontSize: 13.5, color: t.text2, fontWeight: 600, marginBottom: 18 }}>By category</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ position: 'relative', width: 150, height: 150, flexShrink: 0 }}>
                <svg width="150" height="150" viewBox="0 0 150 150">
                  {(() => {
                    const data = [
                      { v: 15200, c: '#16A34A' },
                      { v: 9800, c: '#DC2626' },
                      { v: 6200, c: '#2563EB' },
                      { v: 5100, c: '#EAB308' },
                      { v: 6350, c: '#9CA3AF' },
                    ];
                    const total = data.reduce((s, x) => s + x.v, 0);
                    const r = 56, cx = 75, cy = 75;
                    let angle = -90;
                    return data.map((d, i) => {
                      const slice = (d.v / total) * 360;
                      const s = angle, e = angle + slice; angle = e;
                      const large = slice > 180 ? 1 : 0;
                      const x1 = cx + r * Math.cos(s * Math.PI / 180), y1 = cy + r * Math.sin(s * Math.PI / 180);
                      const x2 = cx + r * Math.cos(e * Math.PI / 180), y2 = cy + r * Math.sin(e * Math.PI / 180);
                      const ri = 38;
                      const x3 = cx + ri * Math.cos(e * Math.PI / 180), y3 = cy + ri * Math.sin(e * Math.PI / 180);
                      const x4 = cx + ri * Math.cos(s * Math.PI / 180), y4 = cy + ri * Math.sin(s * Math.PI / 180);
                      return <path key={i} d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${ri} ${ri} 0 ${large} 0 ${x4} ${y4} Z`} fill={d.c}/>;
                    });
                  })()}
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>₹42.6k</div>
                  <div style={{ fontSize: 10.5, color: t.text3, fontWeight: 600 }}>Total</div>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Food', '#16A34A'], ['Shopping', '#DC2626'], ['Transport', '#2563EB'], ['Bills', '#EAB308'], ['Other', '#9CA3AF']].map(([l, c]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                    <div style={{ width: 9, height: 9, borderRadius: 3, background: c }}/>
                    <span style={{ color: t.text2, fontWeight: 600, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INSIGHT — dark card */}
      <div className="fu" style={{ background: '#0A0A0A', borderRadius: 22, padding: 28, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.18), transparent 70%)' }}/>
        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', position: 'relative' }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: 'rgba(34,197,94,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon n="sparkle" s={20} c="#4ADE80" w={2}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 10, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>A LITTLE INSIGHT.</div>
            <div style={{ fontSize: 21, color: '#fff', fontWeight: 600, lineHeight: 1.35, marginBottom: 14, letterSpacing: '-0.01em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Your food spending is 18% lower than last month. You also saved ₹6,500 more.
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>
              Based on your manually tracked activity. Informational, not financial advice.
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: t.text3, justifyContent: 'center', padding: '8px 0' }}>
        <Icon n="lock" s={13} c={t.text3}/>
        Sample, manually entered data · No live bank or UPI connection
      </div>
    </div>
  );
}

function Stat({ t, label, value, valueText, delta, up, down, note, icon }) {
  return (
    <div className="lift" style={{ background: t.card, borderRadius: 18, border: `1px solid ${t.border}`, padding: 22, boxShadow: t.shadow }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontSize: 12.5, color: t.text2, fontWeight: 600 }}>{label}</div>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: t.card2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon n={icon} s={14} c={t.text2} w={1.8}/>
        </div>
      </div>
      <div style={{ marginBottom: 10 }}>
        {value !== undefined ? <Num value={value} size={26} weight={800} color={t.text}/> : <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{valueText}</div>}
      </div>
      {delta && (
        <div style={{ fontSize: 12.5, color: up ? '#16A34A' : '#DC2626', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          <Icon n={up ? 'arrowUp' : 'arrowDown'} s={11} c={up ? '#16A34A' : '#DC2626'} w={2.6}/>
          {delta}
        </div>
      )}
      {note && <div style={{ fontSize: 12.5, color: '#16A34A', fontWeight: 700, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{note}</div>}
    </div>
  );
}

function TxRow({ tx, t, last, delay = 0 }) {
  const inc = tx.type === 'income';
  const color = inc ? '#16A34A' : t.text;
  const bg = inc ? t.greenSoft : t.card2;
  const iconName = { Food: 'food', Shopping: 'shopping', Transport: 'car', Bills: 'bolt', Cash: 'cash', Salary: 'arrowDown' }[tx.category] || 'wallet';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', borderBottom: last ? 'none' : `1px solid ${t.border}`, animation: `fadeUp .5s cubic-bezier(.22,1,.36,1) ${delay}s both` }}>
      <div style={{ width: 42, height: 42, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon n={iconName} s={18} c={inc ? '#16A34A' : t.text2} w={1.9}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: t.text, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{tx.merchant}</div>
        <div style={{ fontSize: 12, color: t.text3, fontWeight: 500 }}>{tx.category} · {tx.method}{tx.account ? ` · ${tx.account}` : ''}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color, letterSpacing: '-0.02em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{inc ? '+' : '-'}{fmt(tx.amount)}</div>
        <div style={{ fontSize: 11.5, color: t.text3, marginTop: 3, fontWeight: 500 }}>{new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
      </div>
    </div>
  );
}

function Empty({ t, onAdd }) {
  return (
    <div style={{ padding: 56, textAlign: 'center' }}>
      <div style={{ width: 60, height: 60, borderRadius: 18, background: t.card2, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
        <Icon n="receipt" s={26} c={t.text3}/>
      </div>
      <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 6, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>No transactions yet</div>
      <div style={{ fontSize: 13, color: t.text3, marginBottom: 18 }}>Start tracking your first transaction</div>
      {onAdd && <button onClick={onAdd} className="btn" style={{ padding: '11px 20px', borderRadius: 11, background: '#0A0A0A', color: '#fff', fontWeight: 800, fontSize: 13.5, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>+ Add transaction</button>}
    </div>
  );
}

// ============================================================
// OTHER PAGES
// ============================================================
function TransactionsPage({ t, txns, onDelete, onAdd }) {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => {
    let r = txns;
    if (filter !== 'all') r = r.filter(x => x.type === filter || x.category === filter || x.method === filter);
    if (q) r = r.filter(x => (x.merchant + ' ' + x.category + ' ' + x.method).toLowerCase().includes(q.toLowerCase()));
    return r;
  }, [txns, q, filter]);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 6, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Transactions</div>
        <div style={{ fontSize: 14.5, color: t.text2 }}>Every rupee in and out, clearly organized.</div>
      </div>

      <button onClick={onAdd} className="btn" style={{ width: '100%', padding: 16, borderRadius: 14, background: '#0A0A0A', color: '#fff', fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
        <Icon n="plus" s={18} c="#fff" w={2.4}/> Add transaction
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
        <Icon n="search" s={16} c={t.text3}/>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search transactions..." style={{ flex: 1, background: 'transparent', border: 'none', color: t.text, fontSize: 14.5, fontWeight: 500 }}/>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
        {['all', 'income', 'expense', 'Food', 'Shopping', 'Bills', 'UPI', 'Cash'].map(f => {
          const a = filter === f;
          return (
            <button key={f} onClick={() => setFilter(f)} className="btn" style={{ padding: '9px 18px', borderRadius: 100, fontSize: 13, fontWeight: 700, background: a ? '#16A34A' : t.card, color: a ? '#fff' : t.text2, border: `1px solid ${a ? 'transparent' : t.border}`, whiteSpace: 'nowrap', textTransform: 'capitalize', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              {f === 'all' ? 'All' : f}
            </button>
          );
        })}
      </div>

      <div style={{ background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, boxShadow: t.shadow, overflow: 'hidden' }}>
        {filtered.length === 0 ? <Empty t={t} onAdd={onAdd}/> : filtered.map((tx, i) => <TxRow key={tx.id} tx={tx} t={t} last={i === filtered.length - 1} delay={i * 0.02}/>)}
      </div>
    </div>
  );
}

function BudgetsPage({ t, budgets, update }) {
  const [edit, setEdit] = useState(null);
  const totalBudget = budgets.reduce((s, b) => s + b.amount, 0);
  const totalSpent = budgets.reduce((s, b) => s + (b.spent || 0), 0);
  const pct = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 6, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Budgets</div>
        <div style={{ fontSize: 14.5, color: t.text2 }}>Stay on track with monthly limits.</div>
      </div>

      <div style={{ background: t.card, borderRadius: 20, padding: 24, border: `1px solid ${t.border}`, boxShadow: t.shadow, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 11.5, color: t.text3, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>TOTAL BUDGET</div>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{fmt(totalSpent)} <span style={{ fontSize: 15, color: t.text3, fontWeight: 600 }}>/ {fmt(totalBudget)}</span></div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: pct > 75 ? '#EAB308' : '#16A34A', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{pct.toFixed(0)}%</div>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: t.card2, overflow: 'hidden', marginTop: 18 }}>
          <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: pct > 75 ? '#EAB308' : '#16A34A', borderRadius: 4, transition: 'width .9s cubic-bezier(.22,1,.36,1)' }}/>
        </div>
      </div>

      <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
        {budgets.map(b => {
          const p = b.amount > 0 ? (b.spent / b.amount) * 100 : 0;
          const rem = b.amount - b.spent;
          return (
            <div key={b.id} className="lift" style={{ background: t.card, borderRadius: 18, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{b.category}</div>
                <div style={{ fontSize: 11.5, padding: '4px 11px', borderRadius: 100, background: p > 80 ? t.redSoft : t.greenSoft, color: p > 80 ? '#DC2626' : '#16A34A', fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{p.toFixed(0)}%</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: t.text2, marginBottom: 12, fontWeight: 500 }}>
                <span><b style={{ color: t.text, fontWeight: 800 }}>{fmt(b.spent)}</b> spent</span>
                <span>{fmt(b.amount)}</span>
              </div>
              <div style={{ height: 7, borderRadius: 4, background: t.card2, overflow: 'hidden', marginBottom: 14 }}>
                <div style={{ height: '100%', width: `${Math.min(p, 100)}%`, background: p > 80 ? '#DC2626' : '#16A34A', borderRadius: 4, transition: 'width .9s cubic-bezier(.22,1,.36,1)' }}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 12.5, color: rem > 0 ? '#16A34A' : '#DC2626', fontWeight: 700, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{rem > 0 ? `${fmt(rem)} left` : `${fmt(-rem)} over`}</div>
                <button onClick={() => setEdit(b)} className="btn" style={{ fontSize: 12.5, color: t.text2, fontWeight: 700, background: 'transparent' }}>Edit</button>
              </div>
            </div>
          );
        })}
      </div>

      {edit && <EditBudget t={t} budget={edit} onClose={() => setEdit(null)} onSave={(d) => { update(budgets.map(x => x.id === edit.id ? { ...x, amount: parseFloat(d.amount) || 0, spent: parseFloat(d.spent) || 0 } : x)); setEdit(null); }}/>}
    </div>
  );
}

function EditBudget({ t, budget, onClose, onSave }) {
  const [amount, setAmount] = useState(budget.amount);
  const [spent, setSpent] = useState(budget.spent);
  return (
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="si" style={{ background: t.card, borderRadius: 22, padding: 26, maxWidth: 380, width: '100%', boxShadow: t.shadowLg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{budget.category} budget</div>
          <button onClick={onClose} className="btn" style={{ padding: 6 }}><Icon n="close" s={16} c={t.text2}/></button>
        </div>
        <Field t={t} label="Budget amount" value={amount} onChange={setAmount} type="number"/>
        <Field t={t} label="Spent so far" value={spent} onChange={setSpent} type="number"/>
        <button onClick={() => onSave({ amount, spent })} className="btn" style={{ width: '100%', padding: 14, borderRadius: 12, background: '#0A0A0A', color: '#fff', fontWeight: 800, fontSize: 14, marginTop: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Save</button>
      </div>
    </div>
  );
}

function SavingsPage({ t, goals, update }) {
  const [edit, setEdit] = useState(null);
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 6, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Savings</div>
        <div style={{ fontSize: 14.5, color: t.text2 }}>Your goals and progress.</div>
      </div>
      <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {goals.map(g => {
          const p = g.target > 0 ? (g.saved / g.target) * 100 : 0;
          const r = 54, c = 2 * Math.PI * r;
          return (
            <div key={g.id} className="lift" style={{ background: t.card, borderRadius: 22, padding: 26, border: `1px solid ${t.border}`, boxShadow: t.shadow, display: 'flex', gap: 22, alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
                <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="60" cy="60" r={r} fill="none" stroke={t.card2} strokeWidth="10"/>
                  <circle cx="60" cy="60" r={r} fill="none" stroke="#16A34A" strokeWidth="10" strokeDasharray={c} strokeDashoffset={c - (c * p / 100)} strokeLinecap="round" style={{ animation: 'drawIn 1.2s cubic-bezier(.22,1,.36,1) forwards', '--c': c, '--o': c - (c * p / 100) }}/>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{p.toFixed(0)}%</div>
                  <div style={{ fontSize: 11, color: t.text3, fontWeight: 600 }}>Goal</div>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{g.name}</div>
                <div style={{ fontSize: 13.5, color: t.text2, marginBottom: 14 }}><b style={{ color: t.text, fontWeight: 800 }}>{fmt(g.saved)}</b> of {fmt(g.target)}</div>
                <button onClick={() => setEdit(g)} className="btn" style={{ padding: '8px 16px', borderRadius: 10, background: t.card2, color: t.text2, fontSize: 12.5, fontWeight: 700 }}>Edit</button>
              </div>
            </div>
          );
        })}
      </div>
      {edit && <EditGoal t={t} goal={edit} onClose={() => setEdit(null)} onSave={(d) => { update(goals.map(x => x.id === edit.id ? { ...x, saved: parseFloat(d.saved) || 0, target: parseFloat(d.target) || 0 } : x)); setEdit(null); }}/>}
    </div>
  );
}

function EditGoal({ t, goal, onClose, onSave }) {
  const [saved, setSaved] = useState(goal.saved);
  const [target, setTarget] = useState(goal.target);
  return (
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="si" style={{ background: t.card, borderRadius: 22, padding: 26, maxWidth: 380, width: '100%', boxShadow: t.shadowLg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{goal.name}</div>
          <button onClick={onClose} className="btn" style={{ padding: 6 }}><Icon n="close" s={16} c={t.text2}/></button>
        </div>
        <Field t={t} label="Saved amount" value={saved} onChange={setSaved} type="number"/>
        <Field t={t} label="Target amount" value={target} onChange={setTarget} type="number"/>
        <button onClick={() => onSave({ saved, target })} className="btn" style={{ width: '100%', padding: 14, borderRadius: 12, background: '#0A0A0A', color: '#fff', fontWeight: 800, fontSize: 14, marginTop: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Save</button>
      </div>
    </div>
  );
}

function AnalyticsPage({ t, txns, totals }) {
  const [range, setRange] = useState('30 Days');
  const byCat = useMemo(() => {
    const m = {};
    txns.filter(x => x.type === 'expense').forEach(x => { m[x.category] = (m[x.category] || 0) + x.amount; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [txns]);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 6, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Financial analytics</div>
        <div style={{ fontSize: 14.5, color: t.text2 }}>See the patterns behind your spending and saving.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' }}>
        {[{ l: 'CSV', i: 'download' }, { l: 'Excel', i: 'file' }, { l: 'PDF', i: 'file' }].map(e => (
          <button key={e.l} className="btn lift" style={{ padding: '10px 18px', borderRadius: 100, background: t.card, border: `1px solid ${t.border}`, color: t.text2, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 7, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            <Icon n={e.i} s={14} c={t.text2} w={2}/>{e.l}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 22, overflowX: 'auto' }}>
        {['7 Days', '30 Days', '3 Months', '6 Months', '1 Year'].map(r => {
          const a = range === r;
          return (
            <button key={r} onClick={() => setRange(r)} className="btn" style={{ padding: '9px 18px', borderRadius: 100, fontSize: 13, fontWeight: 700, background: a ? '#16A34A' : t.card, color: a ? '#fff' : t.text2, border: `1px solid ${a ? 'transparent' : t.border}`, whiteSpace: 'nowrap', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              {r}
            </button>
          );
        })}
      </div>

      <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 22 }}>
        <Stat t={t} label="Income" value={totals.inc} delta="12.4%" up icon="arrowDown"/>
        <Stat t={t} label="Expense" value={totals.exp} delta="4.8%" down icon="arrowUp"/>
        <Stat t={t} label="Savings" value={totals.sav} delta="18.2%" up icon="piggy"/>
        <Stat t={t} label="Daily average" value={totals.exp / 30} note="₹164 less" icon="trending"/>
      </div>

      <div style={{ background: t.card, borderRadius: 20, padding: 24, border: `1px solid ${t.border}`, boxShadow: t.shadow, marginBottom: 20 }}>
        <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 22, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Monthly spending</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 200 }}>
          {DEMO.monthlySpend.map((d, i) => {
            const max = Math.max(...DEMO.monthlySpend.map(x => x.v));
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{ width: '100%', height: 160, display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{ width: '100%', height: `${(d.v / max) * 100}%`, background: i === DEMO.monthlySpend.length - 1 ? '#16A34A' : t.greenSoft, borderRadius: 6, transformOrigin: 'bottom', animation: `growBar .8s cubic-bezier(.22,1,.36,1) ${i * .04}s both` }}/>
                </div>
                <div style={{ fontSize: 10.5, color: t.text3, fontWeight: 700 }}>{d.m}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: t.card, borderRadius: 20, padding: 24, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 22, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>By category</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 34, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: 190, height: 190, flexShrink: 0 }}>
            <svg width="190" height="190" viewBox="0 0 190 190">
              {(() => {
                const colors = ['#16A34A', '#DC2626', '#2563EB', '#EAB308', '#9CA3AF'];
                const data = byCat.length > 0 ? byCat.slice(0, 5).map(([n, v], i) => ({ v, c: colors[i], name: n })) : [{ v: 1, c: t.card2, name: 'No data' }];
                const total = data.reduce((s, x) => s + x.v, 0);
                const r = 72, cx = 95, cy = 95;
                let angle = -90;
                return data.map((d, i) => {
                  const slice = (d.v / total) * 360;
                  const s = angle, e = angle + slice; angle = e;
                  const large = slice > 180 ? 1 : 0;
                  const x1 = cx + r * Math.cos(s * Math.PI / 180), y1 = cy + r * Math.sin(s * Math.PI / 180);
                  const x2 = cx + r * Math.cos(e * Math.PI / 180), y2 = cy + r * Math.sin(e * Math.PI / 180);
                  const ri = 48;
                  const x3 = cx + ri * Math.cos(e * Math.PI / 180), y3 = cy + ri * Math.sin(e * Math.PI / 180);
                  const x4 = cx + ri * Math.cos(s * Math.PI / 180), y4 = cy + ri * Math.sin(s * Math.PI / 180);
                  return <path key={i} d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${ri} ${ri} 0 ${large} 0 ${x4} ${y4} Z`} fill={d.c}/>;
                });
              })()}
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{fmt(totals.exp)}</div>
              <div style={{ fontSize: 11, color: t.text3, fontWeight: 600 }}>Total</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {byCat.slice(0, 5).map(([n, v], i) => {
              const colors = ['#16A34A', '#DC2626', '#2563EB', '#EAB308', '#9CA3AF'];
              return (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13.5 }}>
                  <div style={{ width: 11, height: 11, borderRadius: 3, background: colors[i] }}/>
                  <span style={{ color: t.text2, fontWeight: 600, minWidth: 90, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{n}</span>
                  <span style={{ fontWeight: 800, color: t.text, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{fmt(v)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountsPage({ t, accounts, user }) {
  const total = accounts.reduce((s, a) => s + (a.balance || 0), 0);
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 6, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Cards & Accounts</div>
        <div style={{ fontSize: 14.5, color: t.text2 }}>Your balances and payment methods, safely organized.</div>
      </div>

      <div className="si" style={{ borderRadius: 22, background: '#0A0A0A', padding: 28, marginBottom: 22, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -70, right: -70, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.18), transparent 70%)' }}/>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.55)', fontWeight: 700, letterSpacing: '0.12em', marginBottom: 14, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>TOTAL ACROSS ACCOUNTS</div>
          <div style={{ marginBottom: 12 }}><Num value={total} size={40} weight={800} color="#fff"/></div>
          <div style={{ fontSize: 14, color: '#4ADE80', fontWeight: 700, marginBottom: 24, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>+₹8,420 this month</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'rgba(255,255,255,0.5)' }}>
            <Icon n="lock" s={13} c="rgba(255,255,255,0.5)"/> Sensitive details are always masked.
          </div>
        </div>
      </div>

      <div className="si" style={{ marginBottom: 22 }}>
        <Card3D t={t} name="Wealthy" last4="4821" holder={user.name}/>
      </div>

      <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {accounts.map(a => (
          <div key={a.id} className="lift" style={{ background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, boxShadow: t.shadow, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 13, background: t.card2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon n={a.type === 'bank' ? 'bank' : a.type === 'cash' ? 'cash' : a.type === 'upi' ? 'wallet' : 'card'} s={19} c={t.text2} w={1.8}/>
              </div>
              <div style={{ fontSize: 12, color: t.text3, fontWeight: 600, textTransform: 'capitalize' }}>
                {a.type === 'bank' ? 'Bank account' : a.type === 'credit' ? 'Credit card' : a.type === 'debit' ? 'Debit card' : a.type === 'upi' ? 'UPI wallet' : a.type}
              </div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{a.name}</div>
            {a.last4 && <div style={{ fontSize: 13, color: t.text3, fontFamily: 'ui-monospace, monospace', marginBottom: 14 }}>•••• {a.last4}</div>}
            <div style={{ marginBottom: 6 }}><Num value={Math.abs(a.balance || (a.limit - a.used) || 0)} size={26} weight={800} color={t.text}/></div>
            <div style={{ fontSize: 13, color: '#16A34A', fontWeight: 700, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              {a.type === 'credit' ? `${a.utilization}% utilized · ${fmt(a.bill)} due ${a.due}` : 'This month'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// ADD MODAL
// ============================================================
function AddModal({ t, onClose, onSave }) {
  const [kind, setKind] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [merchant, setMerchant] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [method, setMethod] = useState('');
  const [account, setAccount] = useState('');
  const [notes, setNotes] = useState('');

  const cats = kind === 'income' ? ['Salary', 'Freelance', 'Business', 'Other'] : ['Food', 'Shopping', 'Transport', 'Bills', 'Health', 'Entertainment', 'Fuel', 'Other'];
  const methods = ['UPI', 'Debit card', 'Credit card', 'Cash', 'Bank transfer', 'Other'];

  const save = () => {
    if (!amount || !merchant.trim()) return;
    onSave({ amount: parseFloat(amount), type: kind, category: category || 'Other', merchant: merchant.trim(), method: method || 'Other', account: account || 'Default', date, time, notes });
  };

  return (
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="su" style={{ background: t.card, borderRadius: '28px 28px 0 0', width: '100%', maxWidth: 520, maxHeight: '94vh', overflowY: 'auto', padding: '20px 26px 34px' }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 24px' }}/>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 26 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: t.text, marginBottom: 5, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Add transaction</div>
            <div style={{ fontSize: 13.5, color: t.text2 }}>Keep your financial picture up to date.</div>
          </div>
          <button onClick={onClose} className="btn" style={{ width: 34, height: 34, borderRadius: 10, background: t.card2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon n="close" s={16} c={t.text2}/>
          </button>
        </div>

        <div style={{ display: 'flex', gap: 4, padding: 4, background: t.card2, borderRadius: 100, marginBottom: 26 }}>
          {[{ id: 'income', label: 'Money in' }, { id: 'expense', label: 'Money out' }].map(k => {
            const a = kind === k.id;
            return (
              <button key={k.id} onClick={() => setKind(k.id)} className="btn" style={{ flex: 1, padding: 13, borderRadius: 100, background: a ? '#0A0A0A' : 'transparent', color: a ? '#fff' : t.text2, fontWeight: 800, fontSize: 14, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                {k.label}
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 11.5, color: t.text3, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 10, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>AMOUNT</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontSize: 28, fontWeight: 500, color: t.text3 }}>₹</span>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" autoFocus style={{ background: 'transparent', border: 'none', color: t.text, fontSize: 46, fontWeight: 800, letterSpacing: '-0.04em', width: 200, textAlign: 'center', fontFamily: '"Plus Jakarta Sans", sans-serif' }}/>
          </div>
        </div>

        <label style={{ fontSize: 12.5, color: t.text2, fontWeight: 700, display: 'block', marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontSize: 14.5, fontWeight: 600, marginBottom: 16 }}>
          <option value="">Select category</option>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label style={{ fontSize: 12.5, color: t.text2, fontWeight: 700, display: 'block', marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Merchant</label>
        <input value={merchant} onChange={e => setMerchant(e.target.value)} placeholder="e.g. Swiggy, Amazon" style={{ width: '100%', padding: '14px 16px', borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontSize: 14.5, marginBottom: 16, fontWeight: 500 }}/>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 12.5, color: t.text2, fontWeight: 700, display: 'block', marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontSize: 14, fontWeight: 500 }}/>
          </div>
          <div>
            <label style={{ fontSize: 12.5, color: t.text2, fontWeight: 700, display: 'block', marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Time</label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontSize: 14, fontWeight: 500 }}/>
          </div>
        </div>

        <label style={{ fontSize: 12.5, color: t.text2, fontWeight: 700, display: 'block', marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Payment method</label>
        <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontSize: 14.5, fontWeight: 600, marginBottom: 16 }}>
          <option value="">Select method</option>
          {methods.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <label style={{ fontSize: 12.5, color: t.text2, fontWeight: 700, display: 'block', marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Account</label>
        <input value={account} onChange={e => setAccount(e.target.value)} placeholder="e.g. HDFC Bank" style={{ width: '100%', padding: '14px 16px', borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontSize: 14.5, marginBottom: 16, fontWeight: 500 }}/>

        <label style={{ fontSize: 12.5, color: t.text2, fontWeight: 700, display: 'block', marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Notes</label>
        <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Optional note" style={{ width: '100%', padding: '14px 16px', borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontSize: 14.5, marginBottom: 24, fontWeight: 500 }}/>

        <button onClick={save} disabled={!amount || !merchant.trim()} className="btn" style={{ width: '100%', padding: 17, borderRadius: 14, background: (!amount || !merchant.trim()) ? t.card2 : '#0A0A0A', color: (!amount || !merchant.trim()) ? t.text3 : '#fff', fontSize: 15, fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          Save transaction
        </button>
      </div>
    </div>
  );
}

// ============================================================
// PROFILE MODAL
// ============================================================
function ProfileModal({ t, user, dark, setDark, updateUser, onClose, onLogout }) {
  const [name, setName] = useState(user.name);
  return (
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="si" style={{ background: t.card, borderRadius: 24, padding: 28, maxWidth: 400, width: '100%', boxShadow: t.shadowLg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <div style={{ fontSize: 19, fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Profile</div>
          <button onClick={onClose} className="btn" style={{ padding: 6 }}><Icon n="close" s={16} c={t.text2}/></button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: t.bg, borderRadius: 14, marginBottom: 18 }}>
          <div style={{ width: 50, height: 50, borderRadius: 15, background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{user.name}</div>
            <div style={{ fontSize: 12.5, color: t.text3 }}>{user.email}</div>
          </div>
          {user.isDemo && <span style={{ fontSize: 10, padding: '4px 9px', borderRadius: 100, background: t.yellowSoft, color: t.yellow, fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>DEMO</span>}
        </div>

        <Field t={t} label="Name" value={name} onChange={setName}/>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon n={dark ? 'moon' : 'sun'} s={18} c={t.text2}/>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Dark mode</div>
          </div>
          <button onClick={() => setDark(!dark)} className="btn" style={{ width: 46, height: 26, borderRadius: 100, background: dark ? '#16A34A' : t.card2, position: 'relative', transition: 'background .3s' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: dark ? 23 : 3, transition: 'left .3s cubic-bezier(.22,1,.36,1)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}/>
          </button>
        </div>

        <button onClick={() => { if (name.trim() && name !== user.name) updateUser({ name: name.trim() }); onClose(); }} className="btn" style={{ width: '100%', padding: 14, borderRadius: 12, background: t.card2, color: t.text, fontWeight: 800, fontSize: 14, marginBottom: 10, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          Save changes
        </button>

        <button onClick={onLogout} className="btn" style={{ width: '100%', padding: 14, borderRadius: 12, background: t.redSoft, color: '#DC2626', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          <Icon n="logout" s={15} c="#DC2626"/> Logout
        </button>
      </div>
    </div>
  );
}