import React, { useState, useEffect, useMemo } from 'react';

// ============================================================
// WEALTHY LOGO — Minimal bars in circle (matches screenshot)
// ============================================================
const WealthyLogo = ({ size = 40, variant = 'green' }) => {
  const bg = variant === 'green' ? '#16A34A' : variant === 'black' ? '#0A0A0A' : '#FFFFFF';
  const fg = variant === 'white' ? '#16A34A' : '#FFFFFF';
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill={bg}/>
      <rect x="11" y="22" width="3.5" height="7" rx="1.2" fill={fg} opacity="0.85"/>
      <rect x="16.5" y="16" width="3.5" height="13" rx="1.2" fill={fg}/>
      <rect x="22" y="10" width="3.5" height="19" rx="1.2" fill={fg}/>
      <rect x="27" y="19" width="3.5" height="10" rx="1.2" fill={fg} opacity="0.65"/>
    </svg>
  );
};

// ============================================================
// ICONS — Thin stroke (1.5-1.8), minimal geometric
// ============================================================
const I = ({ name, size = 18, color = 'currentColor', strokeWidth = 1.7 }) => {
  const paths = {
    dashboard: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></>,
    receipt: <><path d="M5 3v18l2.5-2 2.5 2 2.5-2 2.5 2 2.5-2 2.5 2V3H5z"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
    analytics: <><path d="M4 20V10M10 20V4M16 20v-8M22 20v-5"/></>,
    profile: <><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    arrowUpRight: <><path d="M7 17L17 7M9 7h8v8"/></>,
    arrowDownLeft: <><path d="M17 7L7 17M15 17H7V9"/></>,
    arrowRight: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    arrowUp: <><path d="M12 19V5M6 11l6-6 6 6"/></>,
    arrowDown: <><path d="M12 5v14M6 13l6 6 6-6"/></>,
    chevronRight: <><path d="M9 6l6 6-6 6"/></>,
    chevronDown: <><path d="M6 9l6 6 6-6"/></>,
    chevronLeft: <><path d="M15 6l-6 6 6 6"/></>,
    close: <><path d="M18 6L6 18M6 6l12 12"/></>,
    check: <><path d="M20 6L9 17l-5-5"/></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></>,
    bell: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>,
    wallet: <><path d="M20 12V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-4"/><path d="M22 12h-4a2 2 0 0 0 0 4h4v-4z"/></>,
    card: <><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 11h18"/></>,
    bank: <><path d="M4 21h16M4 10h16M6 6l6-3 6 3M5 10v11M19 10v11M9 10v11M15 10v11"/></>,
    cash: <><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v4M18 10v4"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></>,
    piggy: <><path d="M9 4v2M15 4v2"/><path d="M5 10c0-2 2-4 7-4s7 2 7 4v7a2 2 0 0 1-2 2h-1v2h-2v-2h-4v2H8v-2H6a2 2 0 0 1-2-2v-7z"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></>,
    sparkle: <><path d="M12 3l1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5L12 3z"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></>,
    calendar: <><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 10h17M8 2.5v4M16 2.5v4"/></>,
    food: <><path d="M4 2v6c0 1 .8 2 2 2h2a2 2 0 0 0 2-2V2M7 2v20M20 15V3a4 4 0 0 0-4 4v6a2 2 0 0 0 2 2h2zm0 0v7"/></>,
    shopping: <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></>,
    car: <><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M7 17v2M17 17v2M7 11h.01M17 11h.01"/></>,
    fuel: <><path d="M3 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18M3 10h12M13 14h4a2 2 0 0 0 2-2V9l3-3M17 22h4"/></>,
    bolt: <><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></>,
    medical: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></>,
    film: <><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M10 12l4-2-4-2v4z"/></>,
    lock: <><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M21 7l-9 6-9-6"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M5 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1"/></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
    eyeOff: <><path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18 18 0 0 1 5-6M1 1l22 22M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18 18 0 0 1-3 4M9.9 9.9a3 3 0 0 0 4.2 4.2"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    moon: <><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></>,
    zap: <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>,
    trending: <><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></>,
    more: <><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || paths.dashboard}
    </svg>
  );
};

// ============================================================
// THEME — Minimalist (light + dark)
// ============================================================
const T = {
  light: {
    bg: '#F5F6F8', card: '#FFFFFF', card2: '#F0F1F4',
    text: '#0A0A0A', text2: '#6B7280', text3: '#9CA3AF',
    border: 'rgba(10,10,10,0.06)', border2: 'rgba(10,10,10,0.1)',
    green: '#16A34A', greenSoft: '#DCFCE7', greenBg: '#ECFDF5',
    red: '#DC2626', redSoft: '#FEE2E2', redBg: '#FEF2F2',
    blue: '#2563EB', blueSoft: '#DBEAFE', blueBg: '#EFF6FF',
    yellow: '#EAB308', yellowSoft: '#FEF9C3', yellowBg: '#FEFCE8',
    sky: '#0EA5E9', skySoft: '#E0F2FE',
    shadow: '0 1px 3px rgba(10,10,10,0.04), 0 4px 16px rgba(10,10,10,0.04)',
    shadowLg: '0 4px 12px rgba(10,10,10,0.05), 0 12px 32px rgba(10,10,10,0.08)',
    glass: 'rgba(255,255,255,0.85)',
    gradGreen: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
    gradCard: 'linear-gradient(135deg, #0F172A 0%, #064E3B 100%)',
  },
  dark: {
    bg: '#0A0A0A', card: '#141414', card2: '#1C1C1C',
    text: '#FFFFFF', text2: '#A1A1AA', text3: '#71717A',
    border: 'rgba(255,255,255,0.06)', border2: 'rgba(255,255,255,0.1)',
    green: '#22C55E', greenSoft: 'rgba(34,197,94,0.15)', greenBg: 'rgba(34,197,94,0.08)',
    red: '#F87171', redSoft: 'rgba(248,113,113,0.15)', redBg: 'rgba(248,113,113,0.08)',
    blue: '#60A5FA', blueSoft: 'rgba(96,165,250,0.15)', blueBg: 'rgba(96,165,250,0.08)',
    yellow: '#FBBF24', yellowSoft: 'rgba(251,191,36,0.15)', yellowBg: 'rgba(251,191,36,0.08)',
    sky: '#38BDF8', skySoft: 'rgba(56,189,248,0.15)',
    shadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)',
    shadowLg: '0 4px 12px rgba(0,0,0,0.4), 0 12px 32px rgba(0,0,0,0.3)',
    glass: 'rgba(20,20,20,0.85)',
    gradGreen: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
    gradCard: 'linear-gradient(135deg, #0F172A 0%, #064E3B 100%)',
  },
};

const fmt = (n) => '₹' + Math.abs(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });

// ============================================================
// DEMO DATA
// ============================================================
const DEMO = {
  id: 'demo', name: 'Sanjeev Yadav', email: 'demo@wealthy.app',
  isDemo: true, onboarded: true, theme: 'light',
  accounts: [
    { id: 'a1', type: 'bank', name: 'HDFC Bank', last4: '1840', balance: 84500, change: '+₹82,300 this month' },
    { id: 'a2', type: 'debit', name: 'Everyday Card', last4: '4821', balance: 34500, meta: '12 payments this month' },
    { id: 'a3', type: 'credit', name: 'Rewards Card', last4: '7392', limit: 100000, used: 38500, available: 61500, due: '18 Sep', bill: 12840, utilization: 38.5 },
    { id: 'a4', type: 'cash', name: 'Cash Wallet', balance: 7150, starting: 5000, withdrawals: 4000, expenses: 1850 },
    { id: 'a5', type: 'upi', name: 'UPI Wallet', balance: 2450, spent: 18420, received: 3200, txns: 47, topMerchant: 'Swiggy' },
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
// STORAGE
// ============================================================
const SK = 'wealthy_v2_users';
const SS = 'wealthy_v2_session';
const loadUsers = () => { try { return JSON.parse(localStorage.getItem(SK) || '[]'); } catch { return []; } };
const saveUsers = (u) => { try { localStorage.setItem(SK, JSON.stringify(u)); } catch {} };
const loadSession = () => { try { return localStorage.getItem(SS); } catch { return null; } };
const saveSession = (id) => { try { id ? localStorage.setItem(SS, id) : localStorage.removeItem(SS); } catch {} };

// ============================================================
// ROOT APP
// ============================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState('welcome');
  const [users, setUsers] = useState([]);
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const t = dark ? T.dark : T.light;

  useEffect(() => {
    const sid = loadSession();
    const stored = loadUsers();
    setUsers(stored);
    if (sid === 'demo') { setUser(DEMO); setScreen('app'); }
    else if (sid) { const f = stored.find(u => u.id === sid); if (f) { setUser(f); setScreen(f.onboarded ? 'app' : 'onboarding'); } }
    setLoading(false);
  }, []);

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.color = t.text;
    document.body.style.margin = '0';
    document.body.style.fontFamily = "-apple-system, 'Inter', system-ui, sans-serif";
    document.body.style.transition = 'background 0.3s, color 0.3s';
    document.body.style.webkitFontSmoothing = 'antialiased';
    if (!document.getElementById('wf')) {
      const l = document.createElement('link'); l.id = 'wf'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
      document.head.appendChild(l);
    }
  }, [t]);

  const demoLogin = () => { setUser(DEMO); saveSession('demo'); setScreen('app'); };

  const signup = (data) => {
    const nu = { id: 'u_' + Date.now(), ...data, isDemo: false, onboarded: false, theme: 'light', monthlyIncome: 0, accounts: [], budgets: [], goals: [], transactions: [] };
    const updated = [...users, nu]; setUsers(updated); saveUsers(updated);
    setUser(nu); saveSession(nu.id); setScreen('onboarding');
  };

  const signin = (email, password) => {
    const f = users.find(u => u.email === email && u.password === password);
    if (!f) return { error: 'Invalid email or password' };
    setUser(f); saveSession(f.id); setScreen(f.onboarded ? 'app' : 'onboarding');
    return { success: true };
  };

  const updateUser = (updates) => {
    if (!user) return;
    const updated = { ...user, ...updates }; setUser(updated);
    if (!user.isDemo) {
      const us = users.map(u => u.id === user.id ? updated : u);
      setUsers(us); saveUsers(us);
    }
  };

  const logout = () => { setUser(null); saveSession(null); setScreen('welcome'); };

  const finishOnboarding = (data) => {
    updateUser({ ...data, onboarded: true, transactions: [{ id: Date.now(), date: new Date().toISOString().slice(0,10), amount: data.monthlyIncome, type: 'income', category: 'Salary', merchant: 'Monthly Income', method: 'Bank transfer' }] });
    setScreen('app');
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.bg }}><WealthyLogo size={56}/></div>;

  if (!user) return (
    <>
      <GS t={t}/>
      {screen === 'welcome' && <Welcome t={t} onDemo={demoLogin} onSignup={() => setScreen('signup')} onSignin={() => setScreen('signin')}/>}
      {screen === 'signup' && <Signup t={t} onBack={() => setScreen('welcome')} onSignup={signup} onSwitch={() => setScreen('signin')}/>}
      {screen === 'signin' && <Signin t={t} onBack={() => setScreen('welcome')} onSignin={signin} onSwitch={() => setScreen('signup')} onForgot={() => setScreen('forgot')} onDemo={demoLogin}/>}
      {screen === 'forgot' && <Forgot t={t} onBack={() => setScreen('signin')}/>}
    </>
  );

  if (!user.onboarded && screen === 'onboarding') return (<><GS t={t}/><Onboarding t={t} user={user} onComplete={finishOnboarding} onSkip={() => { updateUser({ onboarded: true }); setScreen('app'); }}/></>);

  return (<><GS t={t}/><AppShell user={user} updateUser={updateUser} t={t} dark={dark} setDark={setDark} onLogout={logout}/></>);
}

// ============================================================
// GLOBAL STYLES
// ============================================================
function GS({ t }) {
  return <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
    @keyframes growUp { from { height: 0; opacity: 0; } to { height: var(--h); opacity: 1; } }
    @keyframes drawIn { from { stroke-dashoffset: var(--c); } to { stroke-dashoffset: var(--o); } }
    .fu { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
    .fi { animation: fadeIn 0.35s ease both; }
    .si { animation: scaleIn 0.4s cubic-bezier(0.22,1,0.36,1) both; }
    .su { animation: slideUp 0.4s cubic-bezier(0.22,1,0.36,1) both; }
    .fl { animation: float 6s ease-in-out infinite; }
    .lift { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s; }
    .lift:hover { transform: translateY(-2px); }
    .lift:active { transform: translateY(0) scale(0.995); }
    .btn { transition: transform 0.15s cubic-bezier(0.22,1,0.36,1), background 0.2s; cursor: pointer; border: none; font-family: inherit; }
    .btn:active { transform: scale(0.96); }
    .btn:disabled { opacity: 0.4; cursor: not-allowed; }
    input, select, textarea { font-family: inherit; }
    input:focus, select:focus, textarea:focus { outline: none; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-thumb { background: ${t.border2}; border-radius: 3px; }
    @media (min-width: 900px) { .mob { display: none !important; } }
    @media (max-width: 899px) { .desk { display: none !important; } }
  `}</style>;
}

// ============================================================
// WELCOME
// ============================================================
function Welcome({ t, onDemo, onSignup, onSignin }) {
  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="si" style={{ maxWidth: 400, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, justifyContent: 'center' }}>
          <WealthyLogo size={40}/>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: t.text }}>Wealthy</div>
        </div>

        <div style={{ background: t.card, borderRadius: 24, padding: 32, boxShadow: t.shadowLg, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, color: t.text, marginBottom: 12 }}>
            Your money,<br/>beautifully organized.
          </div>
          <div style={{ fontSize: 15, color: t.text2, lineHeight: 1.55, marginBottom: 32 }}>
            See where your money goes, how much you save, and what you can improve.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={onDemo} className="btn" style={{ padding: '15px 20px', borderRadius: 14, background: t.gradGreen, color: '#fff', fontWeight: 600, fontSize: 15, boxShadow: '0 8px 24px rgba(22,163,74,0.25)' }}>
              Try Demo
            </button>
            <button onClick={onSignup} className="btn" style={{ padding: '15px 20px', borderRadius: 14, background: t.text, color: t.bg, fontWeight: 600, fontSize: 15 }}>
              Create Account
            </button>
            <button onClick={onSignin} className="btn" style={{ padding: '15px 20px', borderRadius: 14, background: 'transparent', color: t.text2, fontWeight: 500, fontSize: 14, border: `1px solid ${t.border}` }}>
              Sign in
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: t.text3 }}>
          🔒 Your data stays on your device
        </div>
      </div>
    </div>
  );
}

// ============================================================
// AUTH: SIGNUP / SIGNIN / FORGOT
// ============================================================
function AuthWrap({ t, onBack, title, sub, children }) {
  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="si" style={{ maxWidth: 400, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 30 }}>
          <button onClick={onBack} className="btn" style={{ width: 36, height: 36, borderRadius: 10, background: t.card, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <I name="chevronLeft" size={16} color={t.text2}/>
          </button>
          <WealthyLogo size={28}/>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>Wealthy</div>
        </div>

        <div style={{ background: t.card, borderRadius: 24, padding: 28, boxShadow: t.shadowLg, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: t.text, marginBottom: 6 }}>{title}</div>
          <div style={{ fontSize: 14, color: t.text2, marginBottom: 24 }}>{sub}</div>
          {children}
        </div>
      </div>
    </div>
  );
}

function Field({ t, icon, label, value, onChange, placeholder, type = 'text', rightIcon, onRight }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: t.text3, letterSpacing: '0.06em', display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 12, padding: '12px 14px', transition: 'border 0.2s' }}>
        {icon && <I name={icon} size={16} color={t.text3}/>}
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: t.text, fontSize: 14.5, fontWeight: 500 }}/>
        {rightIcon && <button onClick={onRight} className="btn" style={{ padding: 4 }}><I name={rightIcon} size={16} color={t.text3}/></button>}
      </div>
    </div>
  );
}

function Signup({ t, onBack, onSignup, onSwitch }) {
  const [name, setName] = useState(''), [email, setEmail] = useState(''), [pass, setPass] = useState(''), [cpass, setCpass] = useState('');
  const [show, setShow] = useState(false), [err, setErr] = useState('');
  const go = () => {
    if (!name.trim()) return setErr('Enter your name');
    if (!email.includes('@')) return setErr('Enter a valid email');
    if (pass.length < 6) return setErr('Password must be 6+ characters');
    if (pass !== cpass) return setErr('Passwords do not match');
    onSignup({ name: name.trim(), email: email.trim().toLowerCase(), password: pass });
  };
  return (
    <AuthWrap t={t} onBack={onBack} title="Create account" sub="Start tracking your money today">
      <Field t={t} icon="user" label="Name" value={name} onChange={setName} placeholder="Your name"/>
      <Field t={t} icon="mail" label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email"/>
      <Field t={t} icon="lock" label="Password" value={pass} onChange={setPass} placeholder="Min 6 characters" type={show ? 'text' : 'password'} rightIcon={show ? 'eyeOff' : 'eye'} onRight={() => setShow(!show)}/>
      <Field t={t} icon="lock" label="Confirm Password" value={cpass} onChange={setCpass} placeholder="Re-enter password" type="password"/>
      {err && <div style={{ padding: 12, background: t.redSoft, borderRadius: 10, color: t.red, fontSize: 13, fontWeight: 500, marginBottom: 14 }}>{err}</div>}
      <button onClick={go} className="btn" style={{ width: '100%', padding: 15, borderRadius: 12, background: t.gradGreen, color: '#fff', fontWeight: 600, fontSize: 15, boxShadow: '0 8px 24px rgba(22,163,74,0.25)' }}>Create account</button>
      <div style={{ textAlign: 'center', fontSize: 13.5, color: t.text2, marginTop: 18 }}>
        Already have an account? <button onClick={onSwitch} className="btn" style={{ color: t.green, fontWeight: 600, background: 'transparent', fontSize: 13.5 }}>Sign in</button>
      </div>
    </AuthWrap>
  );
}

function Signin({ t, onBack, onSignin, onSwitch, onForgot, onDemo }) {
  const [email, setEmail] = useState(''), [pass, setPass] = useState('');
  const [show, setShow] = useState(false), [err, setErr] = useState('');
  const go = () => {
    if (!email || !pass) return setErr('Please fill all fields');
    const r = onSignin(email.trim().toLowerCase(), pass);
    if (r?.error) setErr(r.error);
  };
  return (
    <AuthWrap t={t} onBack={onBack} title="Welcome back" sub="Sign in to continue">
      <Field t={t} icon="mail" label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email"/>
      <Field t={t} icon="lock" label="Password" value={pass} onChange={setPass} placeholder="Your password" type={show ? 'text' : 'password'} rightIcon={show ? 'eyeOff' : 'eye'} onRight={() => setShow(!show)}/>
      {err && <div style={{ padding: 12, background: t.redSoft, borderRadius: 10, color: t.red, fontSize: 13, fontWeight: 500, marginBottom: 14 }}>{err}</div>}
      <button onClick={go} className="btn" style={{ width: '100%', padding: 15, borderRadius: 12, background: t.gradGreen, color: '#fff', fontWeight: 600, fontSize: 15, boxShadow: '0 8px 24px rgba(22,163,74,0.25)' }}>Sign in</button>
      <button onClick={onDemo} className="btn" style={{ width: '100%', padding: 14, borderRadius: 12, background: t.card2, color: t.text, fontWeight: 600, fontSize: 14, marginTop: 10 }}>
        Try Demo instead
      </button>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, fontSize: 13 }}>
        <button onClick={onForgot} className="btn" style={{ color: t.text2, fontWeight: 500, background: 'transparent', fontSize: 13 }}>Forgot password?</button>
        <button onClick={onSwitch} className="btn" style={{ color: t.green, fontWeight: 600, background: 'transparent', fontSize: 13 }}>Create account</button>
      </div>
    </AuthWrap>
  );
}

function Forgot({ t, onBack }) {
  const [email, setEmail] = useState(''), [sent, setSent] = useState(false);
  return (
    <AuthWrap t={t} onBack={onBack} title="Reset password" sub={sent ? '' : 'We\'ll send a reset link'}>
      {!sent ? (
        <>
          <Field t={t} icon="mail" label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email"/>
          <button onClick={() => email.includes('@') && setSent(true)} className="btn" style={{ width: '100%', padding: 15, borderRadius: 12, background: t.gradGreen, color: '#fff', fontWeight: 600, fontSize: 15 }}>Send reset link</button>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: t.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <I name="check" size={26} color={t.green} strokeWidth={2.5}/>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Check your email</div>
          <div style={{ fontSize: 13.5, color: t.text2, lineHeight: 1.6 }}>Reset link sent to {email}</div>
          <button onClick={onBack} className="btn" style={{ marginTop: 18, padding: '12px 20px', borderRadius: 12, background: t.card2, color: t.text, fontWeight: 600, fontSize: 13.5 }}>Back to sign in</button>
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
    { title: 'Monthly income', sub: 'What\'s your typical monthly income?', icon: 'income' },
    { title: 'Your accounts', sub: 'Add starting balances for your accounts.', icon: 'wallet' },
    { title: 'Monthly budgets', sub: 'Set spending limits for main categories.', icon: 'target' },
    { title: 'First goal', sub: 'What are you saving for?', icon: 'piggy' },
  ];

  const finish = () => {
    onComplete({
      monthlyIncome: incomeNum,
      accounts: accounts.filter(a => a.enabled).map(a => ({ id: a.id, type: a.type, name: a.name, balance: parseFloat(a.balance) || 0 })),
      budgets: budgets.map(b => ({ id: b.id, category: b.category, amount: parseFloat(b.amount) || 0, spent: 0 })),
      goals: goalName && goalTarget ? [{ id: 'g1', name: goalName, target: parseFloat(goalTarget) || 0, saved: 0 }] : [],
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div className="si" style={{ maxWidth: 460, width: '100%', background: t.card, borderRadius: 24, padding: 28, boxShadow: t.shadowLg, border: `1px solid ${t.border}` }}>
        <div style={{ display: 'flex', gap: 5, marginBottom: 26 }}>
          {steps.map((_, i) => <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= step ? t.green : t.border, transition: 'background 0.3s' }}/>)}
        </div>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: t.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <I name={steps[step].icon} size={24} color={t.green}/>
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6, color: t.text }}>{steps[step].title}</div>
        <div style={{ fontSize: 14, color: t.text2, marginBottom: 22, lineHeight: 1.55 }}>{steps[step].sub}</div>

        {step === 1 && (
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: t.text3, letterSpacing: '0.06em' }}>MONTHLY INCOME</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 12, padding: '14px 16px' }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: t.text3 }}>₹</span>
              <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="85000" style={{ flex: 1, background: 'transparent', border: 'none', color: t.text, fontSize: 22, fontWeight: 700 }}/>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
            {accounts.map(a => (
              <div key={a.id} style={{ background: a.enabled ? t.greenBg : t.bg, border: `1px solid ${a.enabled ? t.green : t.border}`, borderRadius: 12, padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button onClick={() => setAccounts(accounts.map(x => x.id === a.id ? { ...x, enabled: !x.enabled } : x))} className="btn" style={{ width: 22, height: 22, borderRadius: 6, background: a.enabled ? t.green : t.card, border: `1.5px solid ${a.enabled ? t.green : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {a.enabled && <I name="check" size={12} color="#fff" strokeWidth={3}/>}
                  </button>
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: t.text }}>{a.name}</div>
                </div>
                {a.enabled && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: t.card, borderRadius: 10, padding: '8px 12px', marginTop: 10, border: `1px solid ${t.border}` }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: t.text3 }}>₹</span>
                    <input type="number" value={a.balance} onChange={e => setAccounts(accounts.map(x => x.id === a.id ? { ...x, balance: e.target.value } : x))} placeholder="Starting balance" style={{ flex: 1, background: 'transparent', border: 'none', color: t.text, fontSize: 13.5, fontWeight: 500 }}/>
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
                <div style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: t.text }}>{b.category}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 10, padding: '8px 12px', width: 128 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: t.text3 }}>₹</span>
                  <input type="number" value={b.amount} onChange={e => setBudgets(budgets.map(x => x.id === b.id ? { ...x, amount: e.target.value } : x))} style={{ flex: 1, background: 'transparent', border: 'none', color: t.text, fontSize: 13, fontWeight: 600, width: '100%' }}/>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 14, padding: 12, background: totalBudget > incomeNum ? t.redSoft : t.greenBg, borderRadius: 10, fontSize: 13, color: totalBudget > incomeNum ? t.red : t.green, fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
              <span>Total budget</span><span>{fmt(totalBudget)} / {fmt(incomeNum)}</span>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ marginBottom: 18 }}>
            <Field t={t} label="Goal name" value={goalName} onChange={setGoalName} placeholder="Emergency Fund"/>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: t.text3, letterSpacing: '0.06em' }}>TARGET AMOUNT</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 12, padding: '12px 14px' }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: t.text3 }}>₹</span>
                <input type="number" value={goalTarget} onChange={e => setGoalTarget(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', color: t.text, fontSize: 16, fontWeight: 600 }}/>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
          {step > 0 && <button onClick={() => setStep(step - 1)} className="btn" style={{ padding: '13px 18px', borderRadius: 12, background: t.card2, color: t.text2, fontWeight: 600, fontSize: 14 }}>Back</button>}
          <button onClick={onSkip} className="btn" style={{ padding: '13px 12px', borderRadius: 12, color: t.text3, fontSize: 13, fontWeight: 500, background: 'transparent' }}>Skip</button>
          {step < 4 ? (
            <button onClick={() => canNext && setStep(step + 1)} disabled={!canNext} className="btn" style={{ flex: 1, padding: 13, borderRadius: 12, background: canNext ? t.gradGreen : t.card2, color: canNext ? '#fff' : t.text3, fontWeight: 600, fontSize: 14, boxShadow: canNext ? '0 8px 24px rgba(22,163,74,0.25)' : 'none' }}>Continue</button>
          ) : (
            <button onClick={finish} className="btn" style={{ flex: 1, padding: 13, borderRadius: 12, background: t.gradGreen, color: '#fff', fontWeight: 600, fontSize: 14, boxShadow: '0 8px 24px rgba(22,163,74,0.25)' }}>Finish setup</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// APP SHELL
// ============================================================
function AppShell({ user, updateUser, t, dark, setDark, onLogout }) {
  const [page, setPage] = useState('dashboard');
  const [addOpen, setAddOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [period, setPeriod] = useState('month');

  const txns = user.transactions || [];
  const accounts = user.accounts || [];

  const totals = useMemo(() => {
    const income = txns.filter(x => x.type === 'income').reduce((s, x) => s + x.amount, 0);
    const expense = txns.filter(x => x.type === 'expense').reduce((s, x) => s + x.amount, 0);
    const saved = income - expense;
    const rate = income > 0 ? (saved / income) * 100 : 0;
    const balance = accounts.reduce((s, a) => s + (a.balance || 0), 0);
    return { income, expense, saved, rate, balance };
  }, [txns, accounts]);

  const addTx = (tx) => { updateUser({ transactions: [{ ...tx, id: Date.now() }, ...txns] }); setAddOpen(false); };
  const delTx = (id) => { updateUser({ transactions: txns.filter(x => x.id !== id) }); };

  const nav = [
    { id: 'dashboard', label: 'Overview', icon: 'dashboard' },
    { id: 'transactions', label: 'Transactions', icon: 'receipt' },
    { id: 'budgets', label: 'Budgets', icon: 'target' },
    { id: 'savings', label: 'Savings', icon: 'piggy' },
    { id: 'analytics', label: 'Analytics', icon: 'analytics' },
    { id: 'accounts', label: 'Accounts', icon: 'wallet' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: t.bg }}>
      {/* Top Bar (desktop) */}
      <header className="desk" style={{ position: 'sticky', top: 0, zIndex: 30, background: t.glass, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${t.border}`, padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <WealthyLogo size={30}/>
          <div style={{ fontSize: 15.5, fontWeight: 700, letterSpacing: '-0.01em' }}>Wealthy</div>
        </div>

        <nav style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
          {nav.map(n => {
            const active = page === n.id;
            return (
              <button key={n.id} onClick={() => setPage(n.id)} className="btn" style={{ padding: '8px 14px', borderRadius: 8, fontSize: 13.5, fontWeight: active ? 600 : 500, background: active ? t.text : 'transparent', color: active ? t.bg : t.text2, transition: 'background 0.2s, color 0.2s' }}>
                {n.label}
              </button>
            );
          })}
        </nav>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="btn" style={{ width: 36, height: 36, borderRadius: 10, background: 'transparent', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <I name="search" size={16} color={t.text2}/>
          </button>
          <button className="btn" style={{ width: 36, height: 36, borderRadius: 10, background: 'transparent', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <I name="bell" size={16} color={t.text2}/>
          </button>
          <button onClick={() => setAddOpen(true)} className="btn" style={{ padding: '9px 16px', borderRadius: 10, background: t.gradGreen, color: '#fff', fontWeight: 600, fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 6px 16px rgba(22,163,74,0.25)' }}>
            <I name="plus" size={15} color="#fff" strokeWidth={2.2}/> Add transaction
          </button>
          <button onClick={() => setProfileOpen(true)} className="btn" style={{ width: 36, height: 36, borderRadius: 10, background: t.card2, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <I name="user" size={16} color={t.text2}/>
          </button>
        </div>
      </header>

      {/* Mobile header */}
      <header className="mob" style={{ position: 'sticky', top: 0, zIndex: 30, background: t.glass, backdropFilter: 'blur(16px)', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${t.border}` }}>
        <WealthyLogo size={30}/>
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>Wealthy</div>
        <button className="btn" style={{ marginLeft: 'auto', width: 34, height: 34, borderRadius: 10, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <I name="search" size={18} color={t.text2}/>
        </button>
        <button onClick={() => setProfileOpen(true)} className="btn" style={{ width: 34, height: 34, borderRadius: 10, background: t.card2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <I name="user" size={18} color={t.text2}/>
        </button>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 28px 120px' }} className="page-main">
        <style>{`@media (max-width: 899px) { .page-main { padding: 20px 18px 110px !important; } }`}</style>
        <div key={page} className="fu">
          {page === 'dashboard' && <Dashboard t={t} totals={totals} txns={txns} user={user} period={period} setPeriod={setPeriod} setPage={setPage} onAdd={() => setAddOpen(true)}/>}
          {page === 'transactions' && <TransactionsPage t={t} txns={txns} onDelete={delTx} onAdd={() => setAddOpen(true)}/>}
          {page === 'budgets' && <BudgetsPage t={t} budgets={user.budgets || []} update={(b) => updateUser({ budgets: b })}/>}
          {page === 'savings' && <SavingsPage t={t} goals={user.goals || []} update={(g) => updateUser({ goals: g })}/>}
          {page === 'analytics' && <AnalyticsPage t={t} txns={txns} totals={totals} user={user}/>}
          {page === 'accounts' && <AccountsPage t={t} accounts={accounts} user={user} update={(a) => updateUser({ accounts: a })}/>}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <div className="mob" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, background: t.card, borderTop: `1px solid ${t.border}`, display: 'flex', padding: '8px 12px 20px', justifyContent: 'space-between' }}>
        {[
          { id: 'dashboard', label: 'Home', icon: 'dashboard' },
          { id: 'transactions', label: 'Transactions', icon: 'receipt' },
        ].map(n => {
          const active = page === n.id;
          return (
            <button key={n.id} onClick={() => setPage(n.id)} className="btn" style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'transparent' }}>
              <I name={n.icon} size={22} color={active ? t.green : t.text3} strokeWidth={active ? 2.2 : 1.7}/>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: active ? t.green : t.text3 }}>{n.label}</span>
            </button>
          );
        })}
        <button onClick={() => setAddOpen(true)} className="btn" style={{ width: 52, height: 52, borderRadius: '50%', background: t.gradGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(22,163,74,0.4)', marginTop: -14 }}>
          <I name="plus" size={24} color="#fff" strokeWidth={2.4}/>
        </button>
        {[
          { id: 'analytics', label: 'Analytics', icon: 'analytics' },
          { id: 'profile', label: 'Profile', icon: 'profile' },
        ].map(n => {
          const active = page === n.id || (n.id === 'profile' && profileOpen);
          return (
            <button key={n.id} onClick={() => n.id === 'profile' ? setProfileOpen(true) : setPage(n.id)} className="btn" style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'transparent' }}>
              <I name={n.icon} size={22} color={active ? t.green : t.text3} strokeWidth={active ? 2.2 : 1.7}/>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: active ? t.green : t.text3 }}>{n.label}</span>
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
  const [insight, setInsight] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Greeting + hero balance (left) + card (right) */}
      <div className="dash-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>
        <style>{`@media (max-width: 899px) { .dash-hero { grid-template-columns: 1fr !important; gap: 22px !important; } }`}</style>
        <div>
          <div style={{ fontSize: 13, color: t.green, fontWeight: 600, marginBottom: 6 }}>Good morning</div>
          <div style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: t.text, marginBottom: 12 }}>
            Your money, beautifully organized.
          </div>
          <div style={{ fontSize: 14.5, color: t.text2, lineHeight: 1.55, marginBottom: 28, maxWidth: 440 }}>
            See where your money goes, how much you save, and what you can improve.
          </div>

          <div style={{ fontSize: 11.5, color: t.text3, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 6 }}>TOTAL BALANCE</div>
          <div style={{ fontSize: 'clamp(34px, 6vw, 52px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: t.text, marginBottom: 10 }}>
            {fmt(totals.balance)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13.5, color: t.green, fontWeight: 600 }}>+₹8,420 this month</span>
            <span style={{ fontSize: 11.5, padding: '3px 9px', borderRadius: 20, background: t.greenSoft, color: t.green, fontWeight: 700 }}>↑ 7.2%</span>
          </div>

          {/* Period selector */}
          <div style={{ display: 'inline-flex', gap: 2, padding: 3, background: t.card2, borderRadius: 12 }}>
            {['Today', 'Week', 'Month', 'Year'].map(p => {
              const active = period === p.toLowerCase();
              return (
                <button key={p} onClick={() => setPeriod(p.toLowerCase())} className="btn" style={{ padding: '7px 16px', borderRadius: 9, fontSize: 12.5, fontWeight: 600, background: active ? t.card : 'transparent', color: active ? t.text : t.text2, boxShadow: active ? t.shadow : 'none' }}>
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Wealthy card */}
        <div className="lift" style={{ borderRadius: 20, background: t.gradCard, padding: 24, aspectRatio: '1.6', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: t.shadowLg, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.25), transparent 70%)' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>Wealthy</div>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <I name="card" size={18} color="#fff" strokeWidth={1.6}/>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.55)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 6 }}>YOUR EVERYDAY CARD</div>
            <div style={{ fontSize: 19, color: '#fff', fontWeight: 700, letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: 16 }}>•••• 4821</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '0.05em' }}>{user.name.toUpperCase()}</div>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '0.05em' }}>CARD</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        <Stat t={t} label="Income" value={fmt(totals.income)} delta="+12.4%" deltaUp color={t.green} icon="arrowDown"/>
        <Stat t={t} label="Expenses" value={fmt(totals.expense)} delta="-4.8%" deltaDown color={t.red} icon="arrowUp"/>
        <Stat t={t} label="Savings" value={fmt(totals.saved)} delta="+18.2%" deltaUp color={t.blue} icon="piggy"/>
        <Stat t={t} label="Savings rate" value={totals.rate.toFixed(1) + '%'} note="Strong this month" color={t.green} icon="trending"/>
      </div>

      {/* Quick actions */}
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 12 }}>Quick actions</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { label: 'Expense', icon: 'arrowUp', color: t.red, bg: t.redSoft, onClick: onAdd },
            { label: 'Income', icon: 'arrowDown', color: t.green, bg: t.greenSoft, onClick: onAdd },
            { label: 'Transfer', icon: 'arrowRight', color: t.blue, bg: t.blueSoft },
            { label: 'Cash', icon: 'cash', color: t.yellow, bg: t.yellowSoft },
            { label: 'Card', icon: 'card', color: t.sky, bg: t.skySoft },
            { label: 'Bill', icon: 'receipt', color: t.red, bg: t.redSoft },
          ].map((a, i) => (
            <button key={i} onClick={a.onClick} className="btn lift" style={{ minWidth: 72, padding: '12px 8px', borderRadius: 14, background: t.card, border: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <I name={a.icon} size={16} color={a.color} strokeWidth={1.9}/>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: t.text2 }}>{a.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent + Savings */}
      <div className="rec-sav" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <style>{`@media (max-width: 899px) { .rec-sav { grid-template-columns: 1fr !important; } }`}</style>

        <div style={{ background: t.card, borderRadius: 18, border: `1px solid ${t.border}`, boxShadow: t.shadow, overflow: 'hidden' }}>
          <div style={{ padding: '18px 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>Recent transactions</div>
            <button onClick={() => setPage('transactions')} className="btn" style={{ fontSize: 12.5, color: t.green, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3, background: 'transparent' }}>
              View all <I name="arrowRight" size={13} color={t.green} strokeWidth={2.2}/>
            </button>
          </div>
          {recent.length === 0 ? <Empty t={t} onAdd={onAdd}/> : recent.map((tx, i) => <TxItem key={tx.id} tx={tx} t={t} last={i === recent.length - 1}/>)}
        </div>

        <div style={{ background: t.card, borderRadius: 18, border: `1px solid ${t.border}`, boxShadow: t.shadow, padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
            <I name="sparkle" size={14} color={t.green} strokeWidth={2}/>
            <div style={{ fontSize: 13.5, color: t.green, fontWeight: 600 }}>Your savings are growing.</div>
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 4 }}>{fmt(totals.saved)}</div>
          <div style={{ fontSize: 13, color: t.text2, marginBottom: 22 }}>saved this month · {totals.rate.toFixed(1)}% savings rate</div>

          {/* Goal ring */}
          {(() => {
            const goal = (user.goals || [])[0];
            if (!goal) return null;
            const p = goal.target > 0 ? (goal.saved / goal.target) * 100 : 0;
            const r = 60, c = 2 * Math.PI * r;
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
                  <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="70" cy="70" r={r} fill="none" stroke={t.card2} strokeWidth="10"/>
                    <circle cx="70" cy="70" r={r} fill="none" stroke={t.green} strokeWidth="10" strokeDasharray={c} strokeDashoffset={c - (c * p / 100)} strokeLinecap="round" style={{ animation: 'drawIn 1.2s cubic-bezier(0.22,1,0.36,1) forwards', '--c': c, '--o': c - (c * p / 100) }}/>
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>{p.toFixed(0)}%</div>
                    <div style={{ fontSize: 11, color: t.text3, fontWeight: 500 }}>Goal</div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 4 }}>{goal.name}</div>
                  <div style={{ fontSize: 13, color: t.text2 }}>{fmt(goal.saved)} of {fmt(goal.target)}</div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Where your money goes */}
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>Where your money goes.</div>
        <div style={{ fontSize: 13.5, color: t.text2, marginBottom: 18 }}>A clear view of this month's spending.</div>

        <div className="money-goes" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
          <style>{`@media (max-width: 899px) { .money-goes { grid-template-columns: 1fr !important; } }`}</style>

          <div style={{ background: t.card, borderRadius: 18, border: `1px solid ${t.border}`, boxShadow: t.shadow, padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12.5, color: t.text2, fontWeight: 500, marginBottom: 6 }}>Monthly spending</div>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em' }}>{fmt(totals.expense)}</div>
              </div>
              <div style={{ fontSize: 12, padding: '5px 12px', borderRadius: 20, background: t.greenSoft, color: t.green, fontWeight: 700 }}>-4.8%</div>
            </div>

            {/* Bar chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 130 }}>
              {DEMO.monthlySpend.map((d, i) => {
                const max = Math.max(...DEMO.monthlySpend.map(x => x.v));
                const h = (d.v / max) * 100;
                const isLast = i === DEMO.monthlySpend.length - 1;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: '100%', height: 110, display: 'flex', alignItems: 'flex-end' }}>
                      <div style={{ width: '100%', height: `${h}%`, background: isLast ? t.green : t.greenSoft, borderRadius: 6, transition: 'height 0.8s cubic-bezier(0.22,1,0.36,1)' }}/>
                    </div>
                    <div style={{ fontSize: 10, color: t.text3, fontWeight: 500 }}>{d.m}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: t.card, borderRadius: 18, border: `1px solid ${t.border}`, boxShadow: t.shadow, padding: 22 }}>
            <div style={{ fontSize: 13, color: t.text2, fontWeight: 500, marginBottom: 16 }}>By category</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
                <svg width="140" height="140" viewBox="0 0 140 140">
                  {(() => {
                    const data = [
                      { v: 15200, c: t.green },
                      { v: 9800, c: t.red },
                      { v: 6200, c: t.blue },
                      { v: 5100, c: t.yellow },
                      { v: 6350, c: t.text3 },
                    ];
                    const total = data.reduce((s, x) => s + x.v, 0);
                    const r = 52, cx = 70, cy = 70;
                    let angle = -90;
                    return data.map((d, i) => {
                      const slice = (d.v / total) * 360;
                      const start = angle;
                      const end = angle + slice;
                      angle = end;
                      const large = slice > 180 ? 1 : 0;
                      const x1 = cx + r * Math.cos(start * Math.PI / 180);
                      const y1 = cy + r * Math.sin(start * Math.PI / 180);
                      const x2 = cx + r * Math.cos(end * Math.PI / 180);
                      const y2 = cy + r * Math.sin(end * Math.PI / 180);
                      const ri = 34;
                      const x3 = cx + ri * Math.cos(end * Math.PI / 180);
                      const y3 = cy + ri * Math.sin(end * Math.PI / 180);
                      const x4 = cx + ri * Math.cos(start * Math.PI / 180);
                      const y4 = cy + ri * Math.sin(start * Math.PI / 180);
                      return <path key={i} d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${ri} ${ri} 0 ${large} 0 ${x4} ${y4} Z`} fill={d.c}/>;
                    });
                  })()}
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>₹42.6k</div>
                  <div style={{ fontSize: 10.5, color: t.text3, fontWeight: 500 }}>Total</div>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[['Food', t.green], ['Shopping', t.red], ['Transport', t.blue], ['Bills', t.yellow], ['Other', t.text3]].map(([l, c]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: c }}/>
                    <span style={{ color: t.text2, fontWeight: 500 }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insight card */}
      {insight && (
        <div style={{ background: t.text, borderRadius: 20, padding: 26, position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <I name="sparkle" size={20} color="#4ADE80" strokeWidth={2}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 8 }}>A LITTLE INSIGHT.</div>
              <div style={{ fontSize: 20, color: '#fff', fontWeight: 600, lineHeight: 1.35, marginBottom: 14, letterSpacing: '-0.01em' }}>
                Your food spending is 18% lower than last month. You also saved ₹6,500 more.
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                Based on your manually tracked activity.<br/>Informational, not financial advice.
              </div>
            </div>
            <button onClick={() => setInsight(false)} className="btn" style={{ padding: 4, background: 'transparent' }}>
              <I name="close" size={16} color="rgba(255,255,255,0.4)"/>
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: t.text3, justifyContent: 'center', padding: '8px 0' }}>
        <I name="lock" size={13} color={t.text3}/>
        Sample, manually entered data · No live bank or UPI connection
      </div>
    </div>
  );
}

function Stat({ t, label, value, delta, deltaUp, deltaDown, note, color, icon }) {
  return (
    <div className="lift" style={{ background: t.card, borderRadius: 16, border: `1px solid ${t.border}`, padding: 20, boxShadow: t.shadow }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 12.5, color: t.text2, fontWeight: 500 }}>{label}</div>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: t.card2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <I name={icon} size={14} color={t.text2} strokeWidth={1.8}/>
        </div>
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8, color: t.text }}>{value}</div>
      {delta && <div style={{ fontSize: 12, color: deltaUp ? t.green : t.red, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
        <I name={deltaUp ? 'arrowUp' : 'arrowDown'} size={11} color={deltaUp ? t.green : t.red} strokeWidth={2.4}/>
        {delta.replace(/[↑↓]/, '')}
      </div>}
      {note && <div style={{ fontSize: 12, color: t.green, fontWeight: 600 }}>{note}</div>}
    </div>
  );
}

function TxItem({ tx, t, last, onDelete }) {
  const isIncome = tx.type === 'income';
  const color = isIncome ? t.green : t.red;
  const bg = isIncome ? t.greenSoft : t.redSoft;
  const iconName = { Food: 'food', Shopping: 'shopping', Transport: 'car', Bills: 'bolt', Cash: 'cash', Salary: 'arrowDown' }[tx.category] || 'wallet';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: last ? 'none' : `1px solid ${t.border}` }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <I name={iconName} size={18} color={color} strokeWidth={1.9}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: t.text }}>{tx.merchant}</div>
        <div style={{ fontSize: 12, color: t.text3 }}>
          {tx.category} · {tx.method} {tx.account && `· ${tx.account}`}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, color, letterSpacing: '-0.01em' }}>{isIncome ? '+' : '-'}{fmt(tx.amount)}</div>
        <div style={{ fontSize: 11, color: t.text3, marginTop: 2 }}>
          {new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
        </div>
      </div>
    </div>
  );
}

function Empty({ t, onAdd }) {
  return (
    <div style={{ padding: 50, textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: t.card2, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
        <I name="receipt" size={24} color={t.text3}/>
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: t.text }}>No transactions yet</div>
      <div style={{ fontSize: 13, color: t.text3, marginBottom: 16 }}>Start tracking your first transaction</div>
      {onAdd && <button onClick={onAdd} className="btn" style={{ padding: '10px 18px', borderRadius: 10, background: t.gradGreen, color: '#fff', fontWeight: 600, fontSize: 13 }}>+ Add transaction</button>}
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
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 6 }}>Transactions</div>
        <div style={{ fontSize: 14, color: t.text2 }}>Every rupee in and out, clearly organized.</div>
      </div>

      <button onClick={onAdd} className="btn" style={{ width: '100%', padding: 15, borderRadius: 12, background: t.gradGreen, color: '#fff', fontWeight: 600, fontSize: 14.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18, boxShadow: '0 8px 20px rgba(22,163,74,0.22)' }}>
        <I name="plus" size={17} color="#fff" strokeWidth={2.2}/> Add transaction
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: '11px 14px', marginBottom: 14 }}>
        <I name="search" size={16} color={t.text3}/>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search transactions..." style={{ flex: 1, background: 'transparent', border: 'none', color: t.text, fontSize: 14, fontWeight: 500 }}/>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 18, overflowX: 'auto', paddingBottom: 4 }}>
        {['all', 'income', 'expense', 'Food', 'Shopping', 'Bills', 'UPI', 'Cash'].map(f => {
          const active = filter === f;
          return (
            <button key={f} onClick={() => setFilter(f)} className="btn" style={{ padding: '8px 16px', borderRadius: 20, fontSize: 12.5, fontWeight: 600, background: active ? t.green : t.card, color: active ? '#fff' : t.text2, border: `1px solid ${active ? 'transparent' : t.border}`, whiteSpace: 'nowrap', textTransform: 'capitalize' }}>
              {f === 'all' ? 'All' : f}
            </button>
          );
        })}
      </div>

      <div style={{ background: t.card, borderRadius: 18, border: `1px solid ${t.border}`, boxShadow: t.shadow, overflow: 'hidden' }}>
        {filtered.length === 0 ? <Empty t={t} onAdd={onAdd}/> : filtered.map((tx, i) => <TxItem key={tx.id} tx={tx} t={t} last={i === filtered.length - 1} onDelete={onDelete}/>)}
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
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 6 }}>Budgets</div>
        <div style={{ fontSize: 14, color: t.text2 }}>Stay on track with monthly limits.</div>
      </div>

      <div style={{ background: t.card, borderRadius: 18, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow, marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 11.5, color: t.text3, fontWeight: 600, letterSpacing: '0.06em', marginBottom: 6 }}>TOTAL BUDGET</div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em' }}>{fmt(totalSpent)} <span style={{ fontSize: 14, color: t.text3, fontWeight: 500 }}>/ {fmt(totalBudget)}</span></div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: pct > 75 ? t.yellow : t.green }}>{pct.toFixed(0)}%</div>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: t.card2, overflow: 'hidden', marginTop: 16 }}>
          <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: pct > 75 ? t.yellow : t.green, borderRadius: 4, transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)' }}/>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 14 }}>
        {budgets.map(b => {
          const p = b.amount > 0 ? (b.spent / b.amount) * 100 : 0;
          const rem = b.amount - b.spent;
          return (
            <div key={b.id} className="lift" style={{ background: t.card, borderRadius: 16, padding: 20, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{b.category}</div>
                <div style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: p > 80 ? t.redSoft : t.greenSoft, color: p > 80 ? t.red : t.green, fontWeight: 700 }}>{p.toFixed(0)}%</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: t.text2, marginBottom: 10 }}>
                <span><b style={{ color: t.text, fontWeight: 700 }}>{fmt(b.spent)}</b> spent</span>
                <span>{fmt(b.amount)}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: t.card2, overflow: 'hidden', marginBottom: 12 }}>
                <div style={{ height: '100%', width: `${Math.min(p, 100)}%`, background: p > 80 ? t.red : t.green, borderRadius: 3 }}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 12, color: rem > 0 ? t.green : t.red, fontWeight: 600 }}>{rem > 0 ? `${fmt(rem)} left` : `${fmt(-rem)} over`}</div>
                <button onClick={() => setEdit(b)} className="btn" style={{ fontSize: 12, color: t.text2, fontWeight: 600, background: 'transparent' }}>Edit</button>
              </div>
            </div>
          );
        })}
      </div>

      {edit && <EditBudget t={t} budget={edit} onClose={() => setEdit(null)} onSave={(data) => { update(budgets.map(x => x.id === edit.id ? { ...x, amount: parseFloat(data.amount) || 0, spent: parseFloat(data.spent) || 0 } : x)); setEdit(null); }}/>}
    </div>
  );
}

function EditBudget({ t, budget, onClose, onSave }) {
  const [amount, setAmount] = useState(budget.amount);
  const [spent, setSpent] = useState(budget.spent);
  return (
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="si" style={{ background: t.card, borderRadius: 20, padding: 26, maxWidth: 380, width: '100%', boxShadow: t.shadowLg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{budget.category} budget</div>
          <button onClick={onClose} className="btn" style={{ padding: 6 }}><I name="close" size={16} color={t.text2}/></button>
        </div>
        <Field t={t} label="Budget amount" value={amount} onChange={setAmount} type="number"/>
        <Field t={t} label="Spent so far" value={spent} onChange={setSpent} type="number"/>
        <button onClick={() => onSave({ amount, spent })} className="btn" style={{ width: '100%', padding: 14, borderRadius: 12, background: t.gradGreen, color: '#fff', fontWeight: 600, fontSize: 14, marginTop: 8 }}>Save</button>
      </div>
    </div>
  );
}

function SavingsPage({ t, goals, update }) {
  const [edit, setEdit] = useState(null);
  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 6 }}>Savings</div>
        <div style={{ fontSize: 14, color: t.text2 }}>Your goals and progress.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {goals.map(g => {
          const p = g.target > 0 ? (g.saved / g.target) * 100 : 0;
          const r = 54, c = 2 * Math.PI * r;
          return (
            <div key={g.id} className="lift" style={{ background: t.card, borderRadius: 20, padding: 24, border: `1px solid ${t.border}`, boxShadow: t.shadow, display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
                <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="60" cy="60" r={r} fill="none" stroke={t.card2} strokeWidth="9"/>
                  <circle cx="60" cy="60" r={r} fill="none" stroke={t.green} strokeWidth="9" strokeDasharray={c} strokeDashoffset={c - (c * p / 100)} strokeLinecap="round"/>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{p.toFixed(0)}%</div>
                  <div style={{ fontSize: 10.5, color: t.text3, fontWeight: 500 }}>Goal</div>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{g.name}</div>
                <div style={{ fontSize: 13, color: t.text2, marginBottom: 12 }}><b style={{ color: t.text, fontWeight: 700 }}>{fmt(g.saved)}</b> of {fmt(g.target)}</div>
                <button onClick={() => setEdit(g)} className="btn" style={{ padding: '7px 14px', borderRadius: 9, background: t.card2, color: t.text2, fontSize: 12.5, fontWeight: 600 }}>Edit</button>
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
      <div onClick={e => e.stopPropagation()} className="si" style={{ background: t.card, borderRadius: 20, padding: 26, maxWidth: 380, width: '100%', boxShadow: t.shadowLg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{goal.name}</div>
          <button onClick={onClose} className="btn" style={{ padding: 6 }}><I name="close" size={16} color={t.text2}/></button>
        </div>
        <Field t={t} label="Saved amount" value={saved} onChange={setSaved} type="number"/>
        <Field t={t} label="Target amount" value={target} onChange={setTarget} type="number"/>
        <button onClick={() => onSave({ saved, target })} className="btn" style={{ width: '100%', padding: 14, borderRadius: 12, background: t.gradGreen, color: '#fff', fontWeight: 600, fontSize: 14, marginTop: 8 }}>Save</button>
      </div>
    </div>
  );
}

function AnalyticsPage({ t, txns, totals }) {
  const [range, setRange] = useState('30d');
  const byCat = useMemo(() => {
    const m = {};
    txns.filter(x => x.type === 'expense').forEach(x => { m[x.category] = (m[x.category] || 0) + x.amount; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [txns]);
  const maxCat = byCat[0]?.[1] || 1;

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 6 }}>Financial analytics</div>
        <div style={{ fontSize: 14, color: t.text2 }}>See the patterns behind your spending and saving.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' }}>
        {[
          { id: 'csv', label: 'CSV', icon: 'download' },
          { id: 'excel', label: 'Excel', icon: 'file' },
          { id: 'pdf', label: 'PDF', icon: 'file' },
        ].map(e => (
          <button key={e.id} className="btn lift" style={{ padding: '9px 16px', borderRadius: 12, background: t.card, border: `1px solid ${t.border}`, color: t.text2, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7 }}>
            <I name={e.icon} size={14} color={t.text2} strokeWidth={2}/>{e.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 22 }}>
        {['7 Days', '30 Days', '3 Months', '6 Months', '1 Year'].map(r => {
          const active = range === r;
          return (
            <button key={r} onClick={() => setRange(r)} className="btn" style={{ padding: '8px 16px', borderRadius: 20, fontSize: 12.5, fontWeight: 600, background: active ? t.green : t.card, color: active ? '#fff' : t.text2, border: `1px solid ${active ? 'transparent' : t.border}`, whiteSpace: 'nowrap' }}>
              {r}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
        <Stat t={t} label="Income" value={fmt(totals.income)} delta="+12.4%" deltaUp color={t.green} icon="arrowDown"/>
        <Stat t={t} label="Expense" value={fmt(totals.expense)} delta="-4.8%" deltaDown color={t.red} icon="arrowUp"/>
        <Stat t={t} label="Savings" value={fmt(totals.saved)} delta="+18.2%" deltaUp color={t.blue} icon="piggy"/>
        <Stat t={t} label="Daily average" value={fmt(totals.expense / 30)} note="₹164 less" color={t.green} icon="trending"/>
      </div>

      <div style={{ background: t.card, borderRadius: 18, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow, marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Monthly spending</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 180 }}>
          {DEMO.monthlySpend.map((d, i) => {
            const max = Math.max(...DEMO.monthlySpend.map(x => x.v));
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: '100%', height: 140, display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{ width: '100%', height: `${(d.v / max) * 100}%`, background: i === DEMO.monthlySpend.length - 1 ? t.green : t.greenSoft, borderRadius: 6 }}/>
                </div>
                <div style={{ fontSize: 10.5, color: t.text3, fontWeight: 500 }}>{d.m}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: t.card, borderRadius: 18, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>By category</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: 180, height: 180, flexShrink: 0 }}>
            <svg width="180" height="180" viewBox="0 0 180 180">
              {(() => {
                const colors = [t.green, t.red, t.blue, t.yellow, t.text3];
                const data = byCat.length > 0 ? byCat.slice(0, 5).map(([n, v], i) => ({ v, c: colors[i % colors.length], name: n })) : [{ v: 1, c: t.card2, name: 'No data' }];
                const total = data.reduce((s, x) => s + x.v, 0);
                const r = 68, cx = 90, cy = 90;
                let angle = -90;
                return data.map((d, i) => {
                  const slice = (d.v / total) * 360;
                  const start = angle, end = angle + slice; angle = end;
                  const large = slice > 180 ? 1 : 0;
                  const x1 = cx + r * Math.cos(start * Math.PI / 180);
                  const y1 = cy + r * Math.sin(start * Math.PI / 180);
                  const x2 = cx + r * Math.cos(end * Math.PI / 180);
                  const y2 = cy + r * Math.sin(end * Math.PI / 180);
                  const ri = 44;
                  const x3 = cx + ri * Math.cos(end * Math.PI / 180);
                  const y3 = cy + ri * Math.sin(end * Math.PI / 180);
                  const x4 = cx + ri * Math.cos(start * Math.PI / 180);
                  const y4 = cy + ri * Math.sin(start * Math.PI / 180);
                  return <path key={i} d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${ri} ${ri} 0 ${large} 0 ${x4} ${y4} Z`} fill={d.c}/>;
                });
              })()}
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{fmt(totals.expense)}</div>
              <div style={{ fontSize: 11, color: t.text3, fontWeight: 500 }}>Total</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {byCat.slice(0, 5).map(([n, v], i) => {
              const colors = [t.green, t.red, t.blue, t.yellow, t.text3];
              return (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: colors[i % colors.length] }}/>
                  <span style={{ color: t.text2, fontWeight: 500, minWidth: 80 }}>{n}</span>
                  <span style={{ fontWeight: 700, color: t.text }}>{fmt(v)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountsPage({ t, accounts, user, update }) {
  const [edit, setEdit] = useState(null);
  const total = accounts.reduce((s, a) => s + (a.balance || 0), 0);
  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 6 }}>Cards & Accounts</div>
        <div style={{ fontSize: 14, color: t.text2 }}>Your balances and payment methods, safely organized.</div>
      </div>

      {/* Big black card */}
      <div style={{ borderRadius: 22, background: '#0A0A0A', padding: 26, marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 12 }}>TOTAL ACROSS ACCOUNTS</div>
        <div style={{ fontSize: 36, fontWeight: 700, color: '#fff', letterSpacing: '-0.04em', marginBottom: 10 }}>{fmt(total)}</div>
        <div style={{ fontSize: 13, color: '#4ADE80', fontWeight: 600, marginBottom: 22 }}>+₹8,420 this month</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
          <I name="lock" size={13} color="rgba(255,255,255,0.5)"/> Sensitive details are always masked.
        </div>
      </div>

      {/* Wealthy everyday card */}
      <div style={{ borderRadius: 20, background: t.gradCard, padding: 24, aspectRatio: '1.6', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: t.shadowLg, marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.25), transparent 70%)' }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Wealthy</div>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <I name="card" size={18} color="#fff" strokeWidth={1.6}/>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.55)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 6 }}>YOUR EVERYDAY CARD</div>
          <div style={{ fontSize: 19, color: '#fff', fontWeight: 700, letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: 16 }}>•••• 4821</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '0.05em' }}>{user.name.toUpperCase()}</div>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '0.05em' }}>CARD</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {accounts.map(a => (
          <div key={a.id} className="lift" style={{ background: t.card, borderRadius: 18, border: `1px solid ${t.border}`, boxShadow: t.shadow, padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: t.card2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <I name={a.type === 'bank' ? 'bank' : a.type === 'cash' ? 'cash' : a.type === 'upi' ? 'wallet' : 'card'} size={18} color={t.text2} strokeWidth={1.8}/>
              </div>
              <div style={{ fontSize: 12, color: t.text3, fontWeight: 500, textTransform: 'capitalize' }}>
                {a.type === 'bank' ? 'Bank account' : a.type === 'credit' ? 'Credit card' : a.type === 'debit' ? 'Debit card' : a.type === 'upi' ? 'UPI wallet' : a.type}
              </div>
            </div>
            <div style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 4 }}>{a.name}</div>
            {a.last4 && <div style={{ fontSize: 13, color: t.text3, fontFamily: 'monospace', marginBottom: 12 }}>•••• {a.last4}</div>}
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 4 }}>{fmt(a.balance || (a.limit - a.used) || 0)}</div>
            <div style={{ fontSize: 12.5, color: t.green, fontWeight: 600 }}>{a.change || a.meta || (a.type === 'credit' ? `${a.utilization}% utilized · ₹${a.bill} due ${a.due}` : '')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// ADD MODAL — full screen with sections (matches screenshot)
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

  const expenseCats = ['Food', 'Shopping', 'Transport', 'Bills', 'Health', 'Entertainment', 'Fuel', 'Other'];
  const incomeCats = ['Salary', 'Freelance', 'Business', 'Other'];
  const cats = kind === 'income' ? incomeCats : expenseCats;
  const methods = ['UPI', 'Debit card', 'Credit card', 'Cash', 'Bank transfer', 'Other'];

  const save = () => {
    if (!amount || !merchant.trim()) return;
    onSave({ amount: parseFloat(amount), type: kind, category: category || (kind === 'income' ? 'Other' : 'Other'), merchant: merchant.trim(), method: method || 'Other', account: account || 'Default', date, time, notes });
  };

  return (
    <div className="fi" style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="su" style={{ background: t.card, borderRadius: '24px 24px 0 0', width: '100%', maxWidth: 520, maxHeight: '94vh', overflowY: 'auto', padding: '20px 24px 30px' }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 22px' }}/>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: t.text, marginBottom: 4 }}>Add transaction</div>
            <div style={{ fontSize: 13, color: t.text2 }}>Keep your financial picture up to date.</div>
          </div>
          <button onClick={onClose} className="btn" style={{ width: 32, height: 32, borderRadius: 10, background: t.card2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <I name="close" size={16} color={t.text2}/>
          </button>
        </div>

        <div style={{ display: 'flex', gap: 4, padding: 4, background: t.card2, borderRadius: 12, marginBottom: 24 }}>
          {[{ id: 'income', label: 'Money in' }, { id: 'expense', label: 'Money out' }].map(k => {
            const active = kind === k.id;
            return (
              <button key={k.id} onClick={() => setKind(k.id)} className="btn" style={{ flex: 1, padding: 12, borderRadius: 9, background: active ? t.green : 'transparent', color: active ? '#fff' : t.text2, fontWeight: 600, fontSize: 14 }}>
                {k.label}
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 11.5, color: t.text3, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 8 }}>AMOUNT</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontSize: 26, fontWeight: 500, color: t.text3 }}>₹</span>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" autoFocus style={{ background: 'transparent', border: 'none', color: t.text, fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em', width: 180, textAlign: 'center', fontFamily: 'inherit' }}/>
          </div>
        </div>

        <label style={{ fontSize: 12.5, color: t.text2, fontWeight: 500, display: 'block', marginBottom: 8 }}>Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '13px 16px', borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontSize: 14.5, fontWeight: 500, marginBottom: 16 }}>
          <option value="">Select category</option>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label style={{ fontSize: 12.5, color: t.text2, fontWeight: 500, display: 'block', marginBottom: 8 }}>Merchant</label>
        <input value={merchant} onChange={e => setMerchant(e.target.value)} placeholder="e.g. Swiggy, Amazon" style={{ width: '100%', padding: '13px 16px', borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontSize: 14.5, marginBottom: 16, fontWeight: 500 }}/>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 12.5, color: t.text2, fontWeight: 500, display: 'block', marginBottom: 8 }}>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '13px 16px', borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontSize: 14, fontWeight: 500 }}/>
          </div>
          <div>
            <label style={{ fontSize: 12.5, color: t.text2, fontWeight: 500, display: 'block', marginBottom: 8 }}>Time</label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', padding: '13px 16px', borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontSize: 14, fontWeight: 500 }}/>
          </div>
        </div>

        <label style={{ fontSize: 12.5, color: t.text2, fontWeight: 500, display: 'block', marginBottom: 8 }}>Payment method</label>
        <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%', padding: '13px 16px', borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontSize: 14.5, fontWeight: 500, marginBottom: 16 }}>
          <option value="">Select method</option>
          {methods.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <label style={{ fontSize: 12.5, color: t.text2, fontWeight: 500, display: 'block', marginBottom: 8 }}>Account</label>
        <input value={account} onChange={e => setAccount(e.target.value)} placeholder="e.g. HDFC Bank" style={{ width: '100%', padding: '13px 16px', borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontSize: 14.5, marginBottom: 16, fontWeight: 500 }}/>

        <label style={{ fontSize: 12.5, color: t.text2, fontWeight: 500, display: 'block', marginBottom: 8 }}>Notes</label>
        <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Optional note" style={{ width: '100%', padding: '13px 16px', borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, color: t.text, fontSize: 14.5, marginBottom: 22, fontWeight: 500 }}/>

        <button onClick={save} disabled={!amount || !merchant.trim()} className="btn" style={{ width: '100%', padding: 16, borderRadius: 14, background: (!amount || !merchant.trim()) ? t.card2 : t.gradGreen, color: (!amount || !merchant.trim()) ? t.text3 : '#fff', fontSize: 15, fontWeight: 700, boxShadow: (!amount || !merchant.trim()) ? 'none' : '0 8px 24px rgba(22,163,74,0.25)' }}>
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
      <div onClick={e => e.stopPropagation()} className="si" style={{ background: t.card, borderRadius: 22, padding: 26, maxWidth: 400, width: '100%', boxShadow: t.shadowLg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Profile</div>
          <button onClick={onClose} className="btn" style={{ padding: 6 }}><I name="close" size={16} color={t.text2}/></button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: t.bg, borderRadius: 14, marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: t.gradGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff' }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{user.name}</div>
            <div style={{ fontSize: 12, color: t.text3 }}>{user.email}</div>
          </div>
          {user.isDemo && <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 20, background: t.yellowSoft, color: t.yellow, fontWeight: 700 }}>DEMO</span>}
        </div>

        <Field t={t} label="Name" value={name} onChange={setName}/>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <I name={dark ? 'moon' : 'sun'} size={18} color={t.text2}/>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Dark mode</div>
          </div>
          <button onClick={() => setDark(!dark)} className="btn" style={{ width: 46, height: 26, borderRadius: 13, background: dark ? t.green : t.card2, position: 'relative', transition: 'background 0.3s' }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 3, left: dark ? 23 : 3, transition: 'left 0.3s cubic-bezier(0.22,1,0.36,1)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}/>
          </button>
        </div>

        <button onClick={() => { if (name.trim() && name !== user.name) updateUser({ name: name.trim() }); onClose(); }} className="btn" style={{ width: '100%', padding: 13, borderRadius: 12, background: t.card2, color: t.text, fontWeight: 600, fontSize: 14, marginBottom: 10 }}>
          Save changes
        </button>

        <button onClick={onLogout} className="btn" style={{ width: '100%', padding: 13, borderRadius: 12, background: t.redBg, color: t.red, fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <I name="logout" size={15} color={t.red}/> Logout
        </button>
      </div>
    </div>
  );
}