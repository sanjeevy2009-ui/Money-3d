import React, { useState, useMemo } from 'react';

// ==================== CUSTOM SVG ICONS (Zero dependencies) ====================
const Icon = ({ name, size = 20, color = 'currentColor', strokeWidth = 2 }) => {
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></>,
    receipt: <><path d="M4 2v20l3-3 3 3 3-3 3 3 3-3 3 3V2H4z"/><path d="M9 8h6M9 13h6"/></>,
    income: <><path d="M12 20V4M6 10l6-6 6 6"/></>,
    expense: <><path d="M12 4v16M6 14l6 6 6-6"/></>,
    wallet: <><path d="M20 12V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/><path d="M22 12h-4a2 2 0 0 0 0 4h4v-4z"/></>,
    card: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    savings: <><path d="M9 4v2M15 4v2"/><path d="M5 10c0-2 2-4 7-4s7 2 7 4v8a2 2 0 0 1-2 2h-1v2h-2v-2h-4v2H8v-2H6a2 2 0 0 1-2-2v-8z"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/></>,
    chart: <><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    moon: <><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></>,
    search: <><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></>,
    food: <><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></>,
    shopping: <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></>,
    transport: <><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M7 17v2M17 17v2M7 11h.01M17 11h.01"/></>,
    fuel: <><path d="M3 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18M3 10h12M13 14h4a2 2 0 0 0 2-2V9l3-3M17 22h4"/></>,
    bills: <><path d="M9 2v6M15 2v6M6 8h12l1 12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L6 8z"/></>,
    entertainment: <><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M10 12l4-2-4-2v4z"/></>,
    health: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></>,
    gift: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M12 7V3M7 3a3 3 0 0 0 0 4h5M17 3a3 3 0 0 1 0 4h-5"/></>,
    bank: <><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11"/></>,
    upi: <><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></>,
    cash: <><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v4M18 10v4"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    sparkle: <><path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z"/></>,
    arrowUp: <><path d="M12 19V5M5 12l7-7 7 7"/></>,
    arrowDown: <><path d="M12 5v14M19 12l-7 7-7-7"/></>,
    arrowRight: <><path d="M5 12h14M12 5l7 7-7 7"/></>,
    chevronRight: <><path d="M9 6l6 6-6 6"/></>,
    chevronDown: <><path d="M6 9l6 6 6-6"/></>,
    close: <><path d="M18 6L6 18M6 6l12 12"/></>,
    check: <><path d="M20 6L9 17l-5-5"/></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></>,
    users: <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 3.1a4 4 0 0 1 0 7.8M23 21v-2a4 4 0 0 0-3-3.9"/></>,
    repeat: <><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
    check2: <><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></>,
    trash: <><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>,
    home: <><path d="M3 12L12 3l9 9M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || paths.dashboard}
    </svg>
  );
};

// ==================== THEME ====================
const THEMES = {
  light: {
    bg: '#F8F9FB',
    card: '#FFFFFF',
    card2: '#F1F3F7',
    text: '#0A0A0A',
    text2: '#5A6172',
    text3: '#9CA3AF',
    border: '#E8EBF0',
    green: '#10B981',
    greenBg: '#ECFDF5',
    red: '#EF4444',
    redBg: '#FEF2F2',
    blue: '#3B82F6',
    blueBg: '#EFF6FF',
    gold: '#F59E0B',
    goldBg: '#FFFBEB',
    purple: '#8B5CF6',
    purpleBg: '#F5F3FF',
    shadow: '0 4px 20px rgba(15,23,42,0.06)',
    shadowLg: '0 20px 50px rgba(15,23,42,0.12)',
    gradGreen: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    gradBlue: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    gradDark: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
    gradGold: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    gradHero: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%)',
  },
  dark: {
    bg: '#0A0B0E',
    card: '#14161C',
    card2: '#1E2029',
    text: '#FFFFFF',
    text2: '#9CA3AF',
    text3: '#6B7280',
    border: '#252831',
    green: '#22C55E',
    greenBg: 'rgba(34,197,94,0.12)',
    red: '#F87171',
    redBg: 'rgba(248,113,113,0.12)',
    blue: '#60A5FA',
    blueBg: 'rgba(96,165,250,0.12)',
    gold: '#FBBF24',
    goldBg: 'rgba(251,191,36,0.12)',
    purple: '#A78BFA',
    purpleBg: 'rgba(167,139,250,0.12)',
    shadow: '0 4px 20px rgba(0,0,0,0.4)',
    shadowLg: '0 20px 50px rgba(0,0,0,0.5)',
    gradGreen: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
    gradBlue: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)',
    gradDark: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
    gradGold: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
    gradHero: 'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #047857 100%)',
  },
};

// ==================== HELPERS ====================
const fmt = (n) => '₹' + Math.abs(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });

// ==================== DEMO DATA ====================
const DEMO_TRANSACTIONS = [
  { id: 1, date: '2025-09-12', time: '13:24', amount: 420, type: 'expense', category: 'Food', merchant: 'Swiggy', method: 'UPI', note: 'Lunch' },
  { id: 2, date: '2025-09-12', time: '09:15', amount: 180, type: 'expense', category: 'Transport', merchant: 'Uber', method: 'UPI' },
  { id: 3, date: '2025-09-12', time: '08:00', amount: 2000, type: 'income', category: 'Freelance', merchant: 'Acme Client', method: 'Bank Transfer' },
  { id: 4, date: '2025-09-11', time: '19:42', amount: 1250, type: 'expense', category: 'Shopping', merchant: 'Amazon', method: 'Credit Card' },
  { id: 5, date: '2025-09-11', time: '12:00', amount: 85000, type: 'income', category: 'Salary', merchant: 'TechCorp India', method: 'Bank Transfer' },
  { id: 6, date: '2025-09-10', time: '21:15', amount: 649, type: 'expense', category: 'Bills', merchant: 'Netflix', method: 'Credit Card' },
  { id: 7, date: '2025-09-10', time: '18:30', amount: 320, type: 'expense', category: 'Food', merchant: 'Zomato', method: 'UPI' },
  { id: 8, date: '2025-09-09', time: '10:00', amount: 5000, type: 'expense', category: 'Bills', merchant: 'Landlord', method: 'Bank Transfer' },
  { id: 9, date: '2025-09-08', time: '16:20', amount: 2450, type: 'expense', category: 'Food', merchant: 'BigBasket', method: 'UPI' },
  { id: 10, date: '2025-09-07', time: '20:10', amount: 780, type: 'expense', category: 'Food', merchant: 'Truffles', method: 'Credit Card' },
  { id: 11, date: '2025-09-06', time: '11:00', amount: 3200, type: 'expense', category: 'Transport', merchant: 'HP Petrol', method: 'Debit Card' },
  { id: 12, date: '2025-09-05', time: '14:30', amount: 1200, type: 'expense', category: 'Health', merchant: 'Apollo', method: 'UPI' },
];

const CATEGORY_ICONS = {
  Food: 'food', Shopping: 'shopping', Transport: 'transport', Bills: 'bills',
  Health: 'health', Entertainment: 'entertainment', Salary: 'income',
  Freelance: 'sparkle', Grocery: 'shopping', Fuel: 'fuel', Other: 'wallet',
};

// ==================== MAIN APP ====================
export default function Money3D() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState('dashboard');
  const [onboarded, setOnboarded] = useState(false);
  const [transactions, setTransactions] = useState(DEMO_TRANSACTIONS);
  const [addOpen, setAddOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const t = dark ? THEMES.dark : THEMES.light;

  const totals = useMemo(() => {
    const income = transactions.filter(x => x.type === 'income').reduce((s, x) => s + x.amount, 0);
    const expense = transactions.filter(x => x.type === 'expense').reduce((s, x) => s + x.amount, 0);
    const savings = income - expense;
    const rate = income > 0 ? (savings / income) * 100 : 0;
    return { income, expense, savings, rate, balance: savings + 124850 };
  }, [transactions]);

  const addTransaction = (tx) => {
    setTransactions([{ ...tx, id: Date.now() }, ...transactions]);
    setAddOpen(false);
  };

  if (!onboarded) return <Onboarding t={t} onDone={() => setOnboarded(true)} />;

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, fontFamily: "'Inter', -apple-system, sans-serif", transition: 'background 0.4s ease' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        
        .fade-up { animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .fade-in { animation: fadeIn 0.4s ease both; }
        .scale-in { animation: scaleIn 0.4s cubic-bezier(0.16,1,0.3,1) both; }
        .slide-up { animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        
        .hover-lift { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1); }
        .hover-lift:hover { transform: translateY(-4px); }
        .hover-lift:active { transform: translateY(-1px) scale(0.99); }
        
        .btn { transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s; cursor: pointer; border: none; font-family: inherit; }
        .btn:active { transform: scale(0.96); }
        
        input, select, textarea { font-family: inherit; }
        input:focus, select:focus { outline: 2px solid ${t.green}40; outline-offset: -1px; }
        
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 3px; }
        
        @media (min-width: 1025px) { .mobile-bottom-nav { display: none; } }
        @media (max-width: 1024px) { .desktop-sidebar { display: none !important; } .main-pad { padding: 70px 16px 90px !important; } }
      `}</style>

      <Sidebar page={page} setPage={setPage} t={t} dark={dark} setDark={setDark} onAdd={() => setAddOpen(true)} />

      <MobileHeader t={t} onMenu={() => setMobileNav(!mobileNav)} />
      {mobileNav && <MobileNavDrawer page={page} setPage={(p) => { setPage(p); setMobileNav(false); }} t={t} onClose={() => setMobileNav(false)} />}

      <main className="main-pad desktop-sidebar-offset" style={{ marginLeft: 260, padding: '28px 32px 100px', minHeight: '100vh' }}>
        <style>{`@media (min-width: 1025px) { .desktop-sidebar-offset { margin-left: 260px !important; } } @media (max-width: 1024px) { .desktop-sidebar-offset { margin-left: 0 !important; } }`}</style>
        <PageHeader t={t} page={page} />
        <div key={page} className="fade-up">
          {page === 'dashboard' && <Dashboard t={t} totals={totals} transactions={transactions} setPage={setPage} onAdd={() => setAddOpen(true)} />}
          {page === 'transactions' && <Transactions t={t} transactions={transactions} />}
          {page === 'analytics' && <Analytics t={t} transactions={transactions} totals={totals} />}
          {page === 'budgets' && <Budgets t={t} />}
          {page === 'savings' && <Savings t={t} />}
          {page === 'settings' && <SettingsPage t={t} dark={dark} setDark={setDark} />}
        </div>
      </main>

      <MobileBottomNav page={page} setPage={setPage} t={t} onAdd={() => setAddOpen(true)} />

      {addOpen && <AddModal t={t} onClose={() => setAddOpen(false)} onSave={addTransaction} />}
    </div>
  );
}

// ==================== ONBOARDING ====================
function Onboarding({ t, onDone }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: 'wallet', title: 'Take Control of Your Money', sub: 'Track every rupee — income, expenses, savings, UPI, cards & cash. All in one beautiful place.' },
    { icon: 'dashboard', title: 'See Everything Clearly', sub: 'Beautiful dashboards that show you exactly where your money goes.' },
    { icon: 'target', title: 'Set Budgets & Goals', sub: 'Stay on track with smart budgets and savings goals.' },
    { icon: 'sparkle', title: 'Get Money Insights', sub: 'Understand your spending patterns with clear insights.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: t.gradHero, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'hidden' }}>
      {/* Floating decorative blobs */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)', animation: 'float 6s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2), transparent 70%)', animation: 'float 8s ease-in-out infinite' }} />

      <div className="scale-in" style={{ maxWidth: 440, width: '100%', background: 'rgba(255,255,255,0.98)', borderRadius: 28, padding: 36, boxShadow: '0 30px 80px rgba(0,0,0,0.3)', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: t.gradGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(16,185,129,0.35)' }}>
            <Icon name="wallet" size={22} color="#fff" strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, color: '#0A0A0A', letterSpacing: '-0.02em' }}>MONEY3D</div>
            <div style={{ fontSize: 10, color: '#5A6172', letterSpacing: '0.08em', fontWeight: 600 }}>KNOW WHERE YOUR MONEY GOES</div>
          </div>
        </div>

        <div style={{ width: 72, height: 72, borderRadius: 20, background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Icon name={steps[step].icon} size={34} color="#10B981" strokeWidth={2} />
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', color: '#0A0A0A', marginBottom: 10, lineHeight: 1.2 }}>{steps[step].title}</h1>
        <p style={{ color: '#5A6172', fontSize: 14.5, lineHeight: 1.6, marginBottom: 32 }}>{steps[step].sub}</p>

        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ height: 4, flex: 1, borderRadius: 2, background: i <= step ? '#10B981' : '#E8EBF0', transition: 'background 0.4s cubic-bezier(0.16,1,0.3,1)' }} />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onDone} className="btn" style={{ padding: '14px 20px', borderRadius: 12, color: '#5A6172', fontSize: 14, fontWeight: 600, background: 'transparent' }}>Skip</button>
          <button onClick={() => step < steps.length - 1 ? setStep(step + 1) : onDone()} className="btn" style={{ flex: 1, padding: 14, borderRadius: 12, background: t.gradGreen, color: '#fff', fontWeight: 700, fontSize: 15, boxShadow: '0 8px 20px rgba(16,185,129,0.35)' }}>
            {step === steps.length - 1 ? 'Get Started →' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== SIDEBAR ====================
function Sidebar({ page, setPage, t, dark, setDark, onAdd }) {
  const nav = [
    { section: 'MAIN', items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'transactions', label: 'Transactions', icon: 'receipt' },
      { id: 'analytics', label: 'Analytics', icon: 'chart' },
    ]},
    { section: 'MONEY', items: [
      { id: 'budgets', label: 'Budgets', icon: 'target' },
      { id: 'savings', label: 'Savings', icon: 'savings' },
    ]},
    { section: 'SYSTEM', items: [
      { id: 'settings', label: 'Settings', icon: 'settings' },
    ]},
  ];

  return (
    <aside className="desktop-sidebar" style={{ width: 260, position: 'fixed', top: 0, left: 0, bottom: 0, background: t.card, borderRight: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', zIndex: 40, transition: 'background 0.4s' }}>
      <div style={{ padding: '22px 20px 18px', display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 40, height: 40, borderRadius: 11, background: t.gradGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(16,185,129,0.3)' }}>
          <Icon name="wallet" size={20} color="#fff" strokeWidth={2.2} />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em' }}>MONEY3D</div>
          <div style={{ fontSize: 10, color: t.text3, letterSpacing: '0.06em', fontWeight: 600 }}>TRACK · SAVE</div>
        </div>
      </div>

      <div style={{ padding: '0 16px 14px' }}>
        <button onClick={onAdd} className="btn" style={{ width: '100%', padding: '13px 16px', borderRadius: 12, background: t.gradGreen, color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 20px rgba(16,185,129,0.3)' }}>
          <Icon name="plus" size={18} strokeWidth={2.5} color="#fff" /> Add Transaction
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 12px 16px' }}>
        {nav.map((group) => (
          <div key={group.section} style={{ marginTop: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: t.text3, letterSpacing: '0.1em', padding: '8px 8px 6px' }}>{group.section}</div>
            {group.items.map((item) => {
              const active = page === item.id;
              return (
                <button key={item.id} onClick={() => setPage(item.id)} className="btn" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 10, fontSize: 13.5, fontWeight: active ? 700 : 500, background: active ? t.greenBg : 'transparent', color: active ? t.green : t.text2, marginBottom: 2, textAlign: 'left', transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)' }}>
                  <Icon name={item.icon} size={17} color={active ? t.green : t.text2} strokeWidth={active ? 2.4 : 2} />
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ padding: 14, borderTop: `1px solid ${t.border}`, display: 'flex', gap: 8 }}>
        <button onClick={() => setDark(!dark)} className="btn" style={{ flex: 1, padding: 11, borderRadius: 10, background: t.card2, border: `1px solid ${t.border}`, color: t.text2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, fontWeight: 600 }}>
          <Icon name={dark ? 'sun' : 'moon'} size={15} color={t.text2} />
          {dark ? 'Light' : 'Dark'}
        </button>
      </div>
    </aside>
  );
}

// ==================== MOBILE ====================
function MobileHeader({ t, onMenu }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30, background: t.card, borderBottom: `1px solid ${t.border}`, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(20px)', transition: 'background 0.4s' }} className="desktop-sidebar-hide">
      <style>{`@media (min-width: 1025px) { .desktop-sidebar-hide { display: none; } }`}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: t.gradGreen, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="wallet" size={17} color="#fff" strokeWidth={2.2} />
        </div>
        <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: '-0.02em' }}>MONEY3D</div>
      </div>
      <button onClick={onMenu} className="btn" style={{ padding: 8, color: t.text }}>
        <Icon name="menu" size={22} color={t.text} />
      </button>
    </div>
  );
}

function MobileNavDrawer({ page, setPage, t, onClose }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'transactions', label: 'Transactions', icon: 'receipt' },
    { id: 'analytics', label: 'Analytics', icon: 'chart' },
    { id: 'budgets', label: 'Budgets', icon: 'target' },
    { id: 'savings', label: 'Savings', icon: 'savings' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
  return (
    <div className="fade-in" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 50, display: 'flex', justifyContent: 'flex-end' }} onClick={onClose}>
      <style>{`@media (min-width: 1025px) { .drawer-hide { display: none; } }`}</style>
      <div className="drawer-hide slide-up" onClick={e => e.stopPropagation()} style={{ width: '80%', maxWidth: 340, background: t.card, height: '100%', padding: 20, overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>Menu</div>
          <button onClick={onClose} className="btn" style={{ padding: 8 }}><Icon name="close" size={20} color={t.text} /></button>
        </div>
        {items.map(i => {
          const active = page === i.id;
          return (
            <button key={i.id} onClick={() => { setPage(i.id); onClose(); }} className="btn" style={{ width: '100%', padding: 14, borderRadius: 10, textAlign: 'left', background: active ? t.greenBg : 'transparent', color: active ? t.green : t.text, fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <Icon name={i.icon} size={18} color={active ? t.green : t.text2} />
              {i.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MobileBottomNav({ page, setPage, t, onAdd }) {
  const items = [
    { id: 'dashboard', label: 'Home', icon: 'dashboard' },
    { id: 'transactions', label: 'Activity', icon: 'receipt' },
    { id: 'analytics', label: 'Stats', icon: 'chart' },
    { id: 'settings', label: 'Profile', icon: 'settings' },
  ];
  return (
    <div className="mobile-bottom-nav" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, background: t.card, borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-around', padding: '10px 8px 20px', backdropFilter: 'blur(20px)' }}>
      {items.slice(0, 2).map(i => {
        const active = page === i.id;
        return (
          <button key={i.id} onClick={() => setPage(i.id)} className="btn" style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'transparent' }}>
            <Icon name={i.icon} size={22} color={active ? t.green : t.text3} strokeWidth={active ? 2.5 : 2} />
            <span style={{ fontSize: 10, fontWeight: 600, color: active ? t.green : t.text3 }}>{i.label}</span>
          </button>
        );
      })}
      <button onClick={onAdd} className="btn" style={{ width: 56, height: 56, borderRadius: '50%', background: t.gradGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(16,185,129,0.5)', marginTop: -20 }}>
        <Icon name="plus" size={26} color="#fff" strokeWidth={2.5} />
      </button>
      {items.slice(2).map(i => {
        const active = page === i.id;
        return (
          <button key={i.id} onClick={() => setPage(i.id)} className="btn" style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'transparent' }}>
            <Icon name={i.icon} size={22} color={active ? t.green : t.text3} strokeWidth={active ? 2.5 : 2} />
            <span style={{ fontSize: 10, fontWeight: 600, color: active ? t.green : t.text3 }}>{i.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ==================== PAGE HEADER ====================
function PageHeader({ t, page }) {
  const titles = { dashboard: 'Dashboard', transactions: 'Transactions', analytics: 'Analytics', budgets: 'Budgets', savings: 'Savings', settings: 'Settings' };
  const subs = { dashboard: 'Your financial overview', transactions: 'All your money movements', analytics: 'Understand your spending', budgets: 'Stay on track monthly', savings: 'Your goals and progress', settings: 'Preferences & privacy' };
  return (
    <div style={{ marginBottom: 24 }} className="desktop-only-header">
      <style>{`@media (max-width: 1024px) { .desktop-only-header { display: none; } }`}</style>
      <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>{titles[page]}</h1>
      <p style={{ fontSize: 13.5, color: t.text2 }}>{subs[page]}</p>
    </div>
  );
}

// ==================== DASHBOARD ====================
function Dashboard({ t, totals, transactions, setPage, onAdd }) {
  const recent = transactions.slice(0, 5);

  return (
    <div>
      {/* HERO */}
      <div className="fade-up hover-lift" style={{ borderRadius: 26, padding: '32px 30px', background: t.gradHero, color: '#fff', position: 'relative', overflow: 'hidden', marginBottom: 22, boxShadow: t.shadowLg }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: '0.12em', fontWeight: 600, marginBottom: 6 }}>TOTAL BALANCE</div>
          <div style={{ fontSize: 'clamp(32px, 8vw, 46px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 4 }}>{fmt(totals.balance)}</div>
          <div style={{ fontSize: 12.5, opacity: 0.75, marginBottom: 26, fontWeight: 500 }}>Good Morning 👋 · September 2025</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { label: 'Income', value: totals.income, icon: 'arrowDown', color: '#4ADE80' },
              { label: 'Expense', value: totals.expense, icon: 'arrowUp', color: '#F87171' },
              { label: 'Savings', value: totals.savings, icon: 'savings', color: '#60A5FA' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: 13 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 7, fontSize: 10.5, opacity: 0.85, fontWeight: 500 }}>
                  <Icon name={s.icon} size={12} color={s.color} />
                  {s.label}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>{fmt(s.value)}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
            <button onClick={onAdd} className="btn" style={{ padding: '12px 20px', borderRadius: 12, background: '#fff', color: '#059669', fontWeight: 700, fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
              <Icon name="plus" size={17} strokeWidth={2.5} color="#059669" /> Add Transaction
            </button>
            <button onClick={() => setPage('analytics')} className="btn" style={{ padding: '12px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 600, fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 7, backdropFilter: 'blur(10px)' }}>
              <Icon name="chart" size={15} color="#fff" /> Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Savings Rate Card */}
      <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 22 }}>
        <StatCard t={t} label="Savings Rate" value={totals.rate.toFixed(1) + '%'} sub="Of income saved" color={t.green} icon="target" />
        <StatCard t={t} label="Transactions" value={transactions.length} sub="This month" color={t.blue} icon="receipt" />
        <StatCard t={t} label="Avg. Daily" value={fmt(totals.expense / 30)} sub="Daily spending" color={t.gold} icon="clock" />
      </div>

      {/* 3D Card-like quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 22 }}>
        <QuickCard t={t} title="Income" value={fmt(totals.income)} sub="+12.4% vs last month" icon="income" color={t.green} bg={t.greenBg} />
        <QuickCard t={t} title="Expense" value={fmt(totals.expense)} sub="+4.2% vs last month" icon="expense" color={t.red} bg={t.redBg} />
        <QuickCard t={t} title="Savings" value={fmt(totals.savings)} sub="On track for goal" icon="savings" color={t.blue} bg={t.blueBg} />
      </div>

      {/* Recent Transactions */}
      <div className="fade-up" style={{ background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, overflow: 'hidden', boxShadow: t.shadow }}>
        <div style={{ padding: '20px 22px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 15.5, fontWeight: 700, letterSpacing: '-0.01em' }}>Recent Transactions</div>
          <button onClick={() => setPage('transactions')} className="btn" style={{ fontSize: 12, color: t.green, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3, background: 'transparent' }}>
            View all <Icon name="chevronRight" size={14} color={t.green} />
          </button>
        </div>
        {recent.map((tx, i) => <TxRow key={tx.id} tx={tx} t={t} last={i === recent.length - 1} />)}
      </div>
    </div>
  );
}

function StatCard({ t, label, value, sub, color, icon }) {
  return (
    <div className="hover-lift" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: 18, boxShadow: t.shadow }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 11.5, color: t.text2, fontWeight: 600, letterSpacing: '0.03em' }}>{label}</div>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={16} color={color} strokeWidth={2.2} />
        </div>
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 3 }}>{value}</div>
      <div style={{ fontSize: 11, color: t.text3 }}>{sub}</div>
    </div>
  );
}

function QuickCard({ t, title, value, sub, icon, color, bg }) {
  return (
    <div className="hover-lift" style={{ background: t.card, borderRadius: 20, padding: 20, border: `1px solid ${t.border}`, boxShadow: t.shadow, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: bg, opacity: 0.5 }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
          <Icon name={icon} size={20} color={color} strokeWidth={2.2} />
        </div>
        <div style={{ fontSize: 12, color: t.text2, fontWeight: 600, marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>{value}</div>
        <div style={{ fontSize: 11, color: t.text3 }}>{sub}</div>
      </div>
    </div>
  );
}

// ==================== TX ROW ====================
function TxRow({ tx, t, last }) {
  const isIncome = tx.type === 'income';
  const color = isIncome ? t.green : t.red;
  const icon = CATEGORY_ICONS[tx.category] || 'wallet';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 22px', borderBottom: last ? 'none' : `1px solid ${t.border}`, transition: 'background 0.2s' }}>
      <div style={{ width: 40, height: 40, borderRadius: 11, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={icon} size={18} color={color} strokeWidth={2.2} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.merchant}</div>
        <div style={{ fontSize: 11, color: t.text3, display: 'flex', gap: 6, alignItems: 'center' }}>
          <span>{tx.category}</span><span>·</span><span>{tx.method}</span>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color, letterSpacing: '-0.01em' }}>{isIncome ? '+' : '-'}{fmt(tx.amount)}</div>
        <div style={{ fontSize: 10, color: t.text3, fontWeight: 500 }}>{new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
      </div>
    </div>
  );
}

// ==================== TRANSACTIONS ====================
function Transactions({ t, transactions }) {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter(tx => tx.type === filter);
  }, [transactions, filter]);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, overflowX: 'auto', paddingBottom: 4 }}>
        {[
          { id: 'all', label: 'All' },
          { id: 'income', label: 'Income' },
          { id: 'expense', label: 'Expense' },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className="btn" style={{ padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, background: filter === f.id ? t.gradGreen : t.card, color: filter === f.id ? '#fff' : t.text2, border: `1px solid ${filter === f.id ? 'transparent' : t.border}`, whiteSpace: 'nowrap', boxShadow: filter === f.id ? '0 6px 16px rgba(16,185,129,0.3)' : 'none' }}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="fade-up" style={{ background: t.card, borderRadius: 20, border: `1px solid ${t.border}`, overflow: 'hidden', boxShadow: t.shadow }}>
        {filtered.map((tx, i) => <TxRow key={tx.id} tx={tx} t={t} last={i === filtered.length - 1} />)}
        {filtered.length === 0 && (
          <div style={{ padding: 60, textAlign: 'center' }}>
            <div style={{ width: 60, height: 60, borderRadius: 18, background: t.card2, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Icon name="receipt" size={26} color={t.text3} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>No transactions</div>
            <div style={{ fontSize: 12.5, color: t.text3 }}>Start tracking your first transaction</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== ANALYTICS ====================
function Analytics({ t, transactions, totals }) {
  const byCategory = useMemo(() => {
    const map = {};
    transactions.filter(x => x.type === 'expense').forEach(x => {
      map[x.category] = (map[x.category] || 0) + x.amount;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [transactions]);

  const maxVal = byCategory[0]?.[1] || 1;

  const byMethod = useMemo(() => {
    const map = {};
    transactions.filter(x => x.type === 'expense').forEach(x => {
      map[x.method] = (map[x.method] || 0) + x.amount;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [transactions]);

  const monthData = [
    { m: 'Apr', i: 82000, e: 38000 },
    { m: 'May', i: 82000, e: 41200 },
    { m: 'Jun', i: 88000, e: 39500 },
    { m: 'Jul', i: 82000, e: 44000 },
    { m: 'Aug', i: 87000, e: 41800 },
    { m: 'Sep', i: totals.income, e: totals.expense },
  ];
  const maxMonth = Math.max(...monthData.map(x => Math.max(x.i, x.e)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Income vs Expense */}
      <div className="fade-up" style={{ background: t.card, borderRadius: 20, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 6 }}>Income vs Expense</div>
        <div style={{ fontSize: 12, color: t.text3, marginBottom: 22 }}>Last 6 months</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 200, gap: 8 }}>
          {monthData.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: '100%', height: 160, display: 'flex', alignItems: 'flex-end', gap: 3, justifyContent: 'center' }}>
                <div style={{ width: '45%', height: `${(d.i / maxMonth) * 100}%`, background: t.gradGreen, borderRadius: '6px 6px 0 0', transition: 'height 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
                <div style={{ width: '45%', height: `${(d.e / maxMonth) * 100}%`, background: `linear-gradient(135deg, ${t.red}, #DC2626)`, borderRadius: '6px 6px 0 0', transition: 'height 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
              <div style={{ fontSize: 11, color: t.text2, fontWeight: 600 }}>{d.m}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 14, justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: t.gradGreen }} />
            <span style={{ color: t.text2 }}>Income</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: t.red }} />
            <span style={{ color: t.text2 }}>Expense</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="fade-up" style={{ background: t.card, borderRadius: 20, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 18 }}>Spending by Category</div>
        {byCategory.slice(0, 6).map(([cat, amt], i) => {
          const pct = (amt / maxVal) * 100;
          return (
            <div key={cat} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: 12.5 }}>
                <span style={{ fontWeight: 600 }}>{cat}</span>
                <span style={{ color: t.text2, fontWeight: 700 }}>{fmt(amt)}</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: t.card2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${t.green}, ${t.blue})`, borderRadius: 4, transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Methods */}
      <div className="fade-up" style={{ background: t.card, borderRadius: 20, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 18 }}>Payment Methods</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
          {byMethod.map(([method, amt]) => (
            <div key={method} style={{ background: t.card2, borderRadius: 14, padding: 16, border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 11, color: t.text2, fontWeight: 600, marginBottom: 6 }}>{method}</div>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>{fmt(amt)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== BUDGETS ====================
function Budgets({ t }) {
  const budgets = [
    { category: 'Food', budget: 8000, spent: 5420, color: t.gold },
    { category: 'Shopping', budget: 10000, spent: 7800, color: t.red },
    { category: 'Transport', budget: 5000, spent: 3200, color: t.blue },
    { category: 'Bills', budget: 4000, spent: 2549, color: t.green },
  ];
  const totalBudget = budgets.reduce((s, b) => s + b.budget, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const pct = (totalSpent / totalBudget) * 100;

  return (
    <div>
      <div className="fade-up" style={{ background: t.card, borderRadius: 20, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow, marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11.5, color: t.text2, fontWeight: 700, letterSpacing: '0.06em', marginBottom: 6 }}>TOTAL MONTHLY BUDGET</div>
            <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em' }}>
              {fmt(totalSpent)} <span style={{ fontSize: 15, color: t.text3, fontWeight: 500 }}>/ {fmt(totalBudget)}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 30, fontWeight: 900, color: pct > 75 ? t.gold : t.green }}>{pct.toFixed(0)}%</div>
            <div style={{ fontSize: 11, color: t.text2, fontWeight: 600 }}>used</div>
          </div>
        </div>
        <div style={{ height: 10, borderRadius: 5, background: t.card2, overflow: 'hidden', marginTop: 16 }}>
          <div style={{ height: '100%', width: `${pct}%`, background: pct > 75 ? `linear-gradient(90deg, ${t.gold}, ${t.red})` : t.gradGreen, borderRadius: 5, transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
        {budgets.map(b => {
          const p = (b.spent / b.budget) * 100;
          const rem = b.budget - b.spent;
          return (
            <div key={b.category} className="fade-up hover-lift" style={{ background: t.card, borderRadius: 18, padding: 20, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ fontSize: 15, fontWeight: 800 }}>{b.category}</div>
                <div style={{ fontSize: 11, padding: '3px 9px', borderRadius: 6, background: p > 80 ? t.redBg : t.greenBg, color: p > 80 ? t.red : t.green, fontWeight: 700 }}>{p.toFixed(0)}%</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: t.text2, marginBottom: 9 }}>
                <span><b style={{ color: t.text }}>{fmt(b.spent)}</b> spent</span>
                <span>{fmt(b.budget)}</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: t.card2, overflow: 'hidden', marginBottom: 10 }}>
                <div style={{ height: '100%', width: `${Math.min(p, 100)}%`, background: p > 80 ? `linear-gradient(90deg, ${t.gold}, ${t.red})` : `linear-gradient(90deg, ${t.green}, ${t.blue})`, borderRadius: 4, transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
              <div style={{ fontSize: 12, color: rem > 0 ? t.green : t.red, fontWeight: 700 }}>
                {rem > 0 ? `${fmt(rem)} remaining` : `${fmt(-rem)} over`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==================== SAVINGS ====================
function Savings({ t }) {
  const goals = [
    { name: 'Laptop', target: 80000, saved: 45000, color: t.blue, icon: 'wallet' },
    { name: 'Emergency Fund', target: 200000, saved: 85000, color: t.green, icon: 'shield' },
    { name: 'Goa Trip', target: 40000, saved: 18500, color: t.gold, icon: 'sparkle' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
      {goals.map(g => {
        const p = (g.saved / g.target) * 100;
        const r = 52, c = 2 * Math.PI * r;
        return (
          <div key={g.name} className="fade-up hover-lift" style={{ background: t.card, borderRadius: 20, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
                <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="60" cy="60" r={r} fill="none" stroke={t.card2} strokeWidth="10" />
                  <circle cx="60" cy="60" r={r} fill="none" stroke={g.color} strokeWidth="10" strokeDasharray={c} strokeDashoffset={c - (c * p / 100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)' }} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={g.icon} size={22} color={g.color} strokeWidth={2.2} />
                  <div style={{ fontSize: 14, fontWeight: 800, marginTop: 4 }}>{p.toFixed(0)}%</div>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 6 }}>{g.name}</div>
                <div style={{ fontSize: 12.5, color: t.text2, marginBottom: 3 }}><b style={{ color: t.text }}>{fmt(g.saved)}</b> / {fmt(g.target)}</div>
                <div style={{ fontSize: 11, color: t.text3 }}>{fmt(g.target - g.saved)} to go</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ==================== SETTINGS ====================
function SettingsPage({ t, dark, setDark }) {
  return (
    <div>
      <div className="fade-up" style={{ background: t.card, borderRadius: 20, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow, marginBottom: 16 }}>
        <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 16 }}>Appearance</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600 }}>Dark Mode</div>
            <div style={{ fontSize: 11.5, color: t.text3, marginTop: 2 }}>Switch between light and dark theme</div>
          </div>
          <button onClick={() => setDark(!dark)} className="btn" style={{ width: 50, height: 28, borderRadius: 14, background: dark ? t.green : t.card2, position: 'relative', transition: 'background 0.3s' }}>
            <div style={{ width: 22, height: 22, borderRadius: 11, background: '#fff', position: 'absolute', top: 3, left: dark ? 25 : 3, transition: 'left 0.3s cubic-bezier(0.16,1,0.3,1)', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
          </button>
        </div>
      </div>

      <div className="fade-up" style={{ background: t.card, borderRadius: 20, padding: 22, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 16 }}>Privacy & Security</div>
        <div style={{ display: 'flex', gap: 14, padding: 14, background: t.greenBg, borderRadius: 12, marginBottom: 12 }}>
          <Icon name="shield" size={20} color={t.green} style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>Your data is protected</div>
            <div style={{ fontSize: 11.5, color: t.text2, lineHeight: 1.6 }}>We never store full account numbers, CVV, PIN, or passwords. Only masked data (•••• 1234) is shown.</div>
          </div>
        </div>
        <div style={{ fontSize: 12.5, color: t.text2, lineHeight: 1.7 }}>
          <b style={{ color: t.text }}>Manual data:</b> All transactions are entered manually.<br />
          <b style={{ color: t.text }}>No fake sync:</b> MONEY3D does not claim to sync with banks unless a real API is connected.
        </div>
      </div>
    </div>
  );
}

// ==================== ADD MODAL ====================
function AddModal({ t, onClose, onSave }) {
  const [kind, setKind] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [merchant, setMerchant] = useState('');
  const [method, setMethod] = useState('UPI');

  const expenseCats = ['Food', 'Shopping', 'Transport', 'Bills', 'Health', 'Entertainment', 'Fuel', 'Other'];
  const incomeCats = ['Salary', 'Freelance', 'Business', 'Other'];
  const methods = ['UPI', 'Debit Card', 'Credit Card', 'Cash', 'Bank Transfer'];
  const cats = kind === 'income' ? incomeCats : expenseCats;

  const handleSave = () => {
    if (!amount || !merchant) return;
    onSave({
      amount: parseFloat(amount),
      type: kind,
      category,
      merchant,
      method,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toTimeString().slice(0, 5),
    });
  };

  return (
    <div className="fade-in" style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="slide-up" style={{ background: t.card, borderTopLeftRadius: 26, borderTopRightRadius: 26, width: '100%', maxWidth: 540, maxHeight: '94vh', overflowY: 'auto', padding: 24, boxShadow: '0 -20px 60px rgba(0,0,0,0.35)' }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 20px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.02em' }}>Add Transaction</div>
          <button onClick={onClose} className="btn" style={{ padding: 8, borderRadius: 8, background: t.card2 }}>
            <Icon name="close" size={18} color={t.text} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
          {[
            { id: 'expense', label: 'MONEY OUT', icon: 'arrowUp', color: t.red, bg: t.redBg },
            { id: 'income', label: 'MONEY IN', icon: 'arrowDown', color: t.green, bg: t.greenBg },
          ].map(k => {
            const active = kind === k.id;
            return (
              <button key={k.id} onClick={() => { setKind(k.id); setCategory(k.id === 'income' ? 'Salary' : 'Food'); }} className="btn" style={{ flex: 1, padding: 14, borderRadius: 12, background: active ? k.bg : t.card2, border: `1.5px solid ${active ? k.color : t.border}`, color: active ? k.color : t.text2, fontWeight: 700, fontSize: 12, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                <Icon name={k.icon} size={15} color={active ? k.color : t.text2} strokeWidth={2.4} />
                {k.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 11, color: t.text3, fontWeight: 700, letterSpacing: '0.06em' }}>AMOUNT</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, background: t.card2, border: `1.5px solid ${t.border}`, borderRadius: 14, padding: '16px 18px' }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: t.text3 }}>₹</span>
            <input type="number" inputMode="decimal" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: t.text, fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
          <div>
            <label style={{ fontSize: 11, color: t.text3, fontWeight: 700, letterSpacing: '0.06em' }}>CATEGORY</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', marginTop: 8, padding: '13px 14px', borderRadius: 12, background: t.card2, border: `1.5px solid ${t.border}`, color: t.text, fontSize: 13.5, fontWeight: 600, outline: 'none' }}>
              {cats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: t.text3, fontWeight: 700, letterSpacing: '0.06em' }}>METHOD</label>
            <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%', marginTop: 8, padding: '13px 14px', borderRadius: 12, background: t.card2, border: `1.5px solid ${t.border}`, color: t.text, fontSize: 13.5, fontWeight: 600, outline: 'none' }}>
              {methods.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 22 }}>
          <label style={{ fontSize: 11, color: t.text3, fontWeight: 700, letterSpacing: '0.06em' }}>MERCHANT / SOURCE</label>
          <input value={merchant} onChange={e => setMerchant(e.target.value)} placeholder="e.g. Swiggy, Salary" style={{ width: '100%', marginTop: 8, padding: '13px 16px', borderRadius: 12, background: t.card2, border: `1.5px solid ${t.border}`, color: t.text, fontSize: 14, outline: 'none', fontWeight: 500 }} />
        </div>

        <button onClick={handleSave} disabled={!amount || !merchant} className="btn" style={{ width: '100%', padding: 17, borderRadius: 14, background: (!amount || !merchant) ? t.card2 : t.gradGreen, color: (!amount || !merchant) ? t.text3 : '#fff', fontSize: 15, fontWeight: 800, boxShadow: (!amount || !merchant) ? 'none' : '0 10px 25px rgba(16,185,129,0.35)', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
          Save Transaction
        </button>
      </div>
    </div>
  );
}