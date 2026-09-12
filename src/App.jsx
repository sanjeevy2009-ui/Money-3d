import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  LayoutDashboard, Receipt, TrendingUp, TrendingDown, Wallet, CreditCard,
  PiggyBank, Target, BarChart3, FileText, Settings, Search, Bell, Plus,
  Sun, Moon, X, ChevronDown, ChevronRight, Filter, Download, Upload,
  Calendar, MapPin, Tag, Paperclip, ArrowUpRight, ArrowDownLeft, ArrowRightLeft,
  Smartphone, Banknote, Building2, Lock, Shield, Eye, EyeOff, Menu, Home,
  PieChart, LineChart, Sparkles, AlertTriangle, CheckCircle2, Clock, Zap,
  Coffee, ShoppingBag, Car, Fuel, Lightbulb, Wifi, Phone, GraduationCap,
  Heart, Film, Plane, Repeat, Landmark, Gift, Users, MoreHorizontal, Trash2,
  Edit3, CreditCard as CardIcon, IndianRupee, CircleDollarSign, Percent
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart as RLineChart, Line,
  PieChart as RPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

// ==================== THEME ====================
const useTheme = () => {
  const [dark, setDark] = useState(true);
  const t = dark ? {
    bg: '#0A0A0B', bg2: '#111113', card: '#151518', card2: '#1C1C21',
    border: 'rgba(255,255,255,0.07)', border2: 'rgba(255,255,255,0.12)',
    text: '#FFFFFF', text2: '#A1A1AA', text3: '#71717A',
    green: '#22C55E', greenBg: 'rgba(34,197,94,0.12)',
    red: '#EF4444', redBg: 'rgba(239,68,68,0.12)',
    blue: '#3B82F6', blueBg: 'rgba(59,130,246,0.12)',
    gold: '#F59E0B', goldBg: 'rgba(245,158,11,0.12)',
    purple: '#8B5CF6', purpleBg: 'rgba(139,92,246,0.12)',
    shadow: '0 8px 32px rgba(0,0,0,0.4)',
    shadowSm: '0 4px 12px rgba(0,0,0,0.25)',
    glass: 'rgba(21,21,24,0.7)',
    grad: 'linear-gradient(135deg, #151518 0%, #1C1C21 100%)',
    gradGreen: 'linear-gradient(135deg, #065F46 0%, #059669 100%)',
    gradBlue: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
    gradPurple: 'linear-gradient(135deg, #5B21B6 0%, #8B5CF6 100%)',
    gradGold: 'linear-gradient(135deg, #78350F 0%, #F59E0B 100%)',
    gradDark: 'linear-gradient(135deg, #18181B 0%, #27272A 100%)',
    chartGrid: 'rgba(255,255,255,0.05)',
  } : {
    bg: '#F7F7F8', bg2: '#FFFFFF', card: '#FFFFFF', card2: '#F4F4F5',
    border: 'rgba(0,0,0,0.06)', border2: 'rgba(0,0,0,0.1)',
    text: '#09090B', text2: '#52525B', text3: '#A1A1AA',
    green: '#16A34A', greenBg: 'rgba(22,163,74,0.08)',
    red: '#DC2626', redBg: 'rgba(220,38,38,0.08)',
    blue: '#2563EB', blueBg: 'rgba(37,99,235,0.08)',
    gold: '#D97706', goldBg: 'rgba(217,119,6,0.08)',
    purple: '#7C3AED', purpleBg: 'rgba(124,58,237,0.08)',
    shadow: '0 8px 32px rgba(0,0,0,0.08)',
    shadowSm: '0 4px 12px rgba(0,0,0,0.05)',
    glass: 'rgba(255,255,255,0.7)',
    grad: 'linear-gradient(135deg, #FFFFFF 0%, #F4F4F5 100%)',
    gradGreen: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    gradBlue: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
    gradPurple: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
    gradGold: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    gradDark: 'linear-gradient(135deg, #18181B 0%, #3F3F46 100%)',
    chartGrid: 'rgba(0,0,0,0.04)',
  };
  return { dark, setDark, t };
};

// ==================== HELPERS ====================
const fmt = (n) => {
  const abs = Math.abs(n);
  const s = abs.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  return (n < 0 ? '-' : '') + '₹' + s;
};
const fmt2 = (n) => {
  const abs = Math.abs(n);
  const s = abs.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (n < 0 ? '-' : '') + '₹' + s;
};

// ==================== ICON MAP ====================
const categoryIcons = {
  Food: Coffee, Grocery: ShoppingBag, Shopping: ShoppingBag, Transport: Car,
  Fuel: Fuel, Bills: Lightbulb, Electricity: Zap, Internet: Wifi,
  'Mobile Recharge': Phone, Rent: Home, Education: GraduationCap, Health: Heart,
  Entertainment: Film, Travel: Plane, Subscriptions: Repeat, EMI: Landmark,
  Insurance: Shield, Personal: Users, Family: Users, Other: MoreHorizontal,
  Salary: TrendingUp, Freelance: Sparkles, Business: Building2,
  Interest: Percent, Refund: ArrowDownLeft, Gift: Gift,
  Income: TrendingUp, UPI: Smartphone, 'Debit Card': CardIcon,
  'Credit Card': CardIcon, Cash: Banknote, 'Bank Transfer': Landmark,
};

const catColor = (t) => ({
  Food: '#F97316', Grocery: '#84CC16', Shopping: '#EC4899', Transport: '#06B6D4',
  Fuel: '#EF4444', Bills: '#F59E0B', Electricity: '#EAB308', Internet: '#3B82F6',
  'Mobile Recharge': '#8B5CF6', Rent: '#6366F1', Education: '#14B8A6',
  Health: '#EF4444', Entertainment: '#A855F7', Travel: '#0EA5E9',
  Subscriptions: '#D946EF', EMI: '#64748B', Insurance: '#0891B2',
  Personal: '#F43F5E', Family: '#FB7185', Other: '#71717A',
  Salary: '#22C55E', Freelance: '#10B981', Business: '#059669',
});

// ==================== DEMO DATA ====================
const initialAccounts = [
  { id: 'hdfc', type: 'bank', nickname: 'HDFC Savings', bank: 'HDFC Bank', last4: '4821', balance: 92450, income: 85000, expense: 20100, color: '#004C8F' },
  { id: 'upi', type: 'upi', nickname: 'UPI Wallet', app: 'Google Pay', balance: 2450, spent: 18420, received: 3200, txns: 47, topMerchant: 'Swiggy' },
  { id: 'dc', type: 'debit', nickname: 'HDFC Debit', bank: 'HDFC Bank', last4: '9903', balance: 92450, monthly: 7850, txns: 12 },
  { id: 'cc', type: 'credit', nickname: 'ICICI Amazon Pay', bank: 'ICICI Bank', last4: '7234', limit: 100000, used: 38500, currentBill: 12850, dueDate: '2025-10-05', minDue: 642, rewards: 1240, cycleStart: '2025-09-08', cycleEnd: '2025-10-07' },
  { id: 'cash', type: 'cash', nickname: 'Cash Wallet', balance: 7150, starting: 5000, withdrawals: 4000, deposits: 0, expenses: 1850 },
];

const initialTransactions = [
  { id: 1, date: '2025-09-12', time: '13:24', amount: 420, type: 'expense', category: 'Food', subcategory: 'Delivery', merchant: 'Swiggy', location: 'Koramangala, BLR', method: 'UPI', account: 'upi', note: 'Lunch', tags: ['work'], recurring: false },
  { id: 2, date: '2025-09-12', time: '09:15', amount: 180, type: 'expense', category: 'Transport', subcategory: 'Cab', merchant: 'Uber', location: 'Indiranagar', method: 'UPI', account: 'upi', note: 'Office', tags: [], recurring: false },
  { id: 3, date: '2025-09-12', time: '08:00', amount: 2000, type: 'income', category: 'Freelance', merchant: 'Client - Acme', method: 'Bank Transfer', account: 'hdfc', note: 'Design work', tags: ['freelance'], recurring: false },
  { id: 4, date: '2025-09-11', time: '19:42', amount: 1250, type: 'expense', category: 'Shopping', subcategory: 'Clothing', merchant: 'Amazon', location: 'Online', method: 'Credit Card', account: 'cc', note: 'Shirt', tags: [], recurring: false },
  { id: 5, date: '2025-09-11', time: '12:00', amount: 85000, type: 'income', category: 'Salary', merchant: 'TechCorp India', method: 'Bank Transfer', account: 'hdfc', note: 'September salary', tags: ['salary'], recurring: true },
  { id: 6, date: '2025-09-10', time: '21:15', amount: 649, type: 'expense', category: 'Subscriptions', merchant: 'Netflix', method: 'Credit Card', account: 'cc', recurring: true, tags: ['ott'] },
  { id: 7, date: '2025-09-10', time: '18:30', amount: 320, type: 'expense', category: 'Food', merchant: 'Zomato', method: 'UPI', account: 'upi', location: 'BLR', recurring: false },
  { id: 8, date: '2025-09-09', time: '10:00', amount: 5000, type: 'expense', category: 'Rent', merchant: 'Landlord - Ramesh', method: 'Bank Transfer', account: 'hdfc', recurring: true },
  { id: 9, date: '2025-09-09', time: '07:30', amount: 4000, type: 'transfer', category: 'ATM Withdrawal', merchant: 'HDFC ATM', method: 'Cash', fromAccount: 'hdfc', toAccount: 'cash', note: 'Cash for week' },
  { id: 10, date: '2025-09-08', time: '16:20', amount: 2450, type: 'expense', category: 'Grocery', merchant: 'BigBasket', method: 'UPI', account: 'upi' },
  { id: 11, date: '2025-09-08', time: '09:00', amount: 1899, type: 'expense', category: 'Bills', subcategory: 'Internet', merchant: 'ACT Fibernet', method: 'Debit Card', account: 'dc', recurring: true },
  { id: 12, date: '2025-09-07', time: '20:10', amount: 780, type: 'expense', category: 'Food', merchant: 'Restaurant - Truffles', method: 'Credit Card', account: 'cc' },
  { id: 13, date: '2025-09-06', time: '11:00', amount: 3200, type: 'expense', category: 'Fuel', merchant: 'HP Petrol Pump', method: 'Debit Card', account: 'dc' },
  { id: 14, date: '2025-09-05', time: '14:30', amount: 1200, type: 'expense', category: 'Health', merchant: 'Apollo Pharmacy', method: 'UPI', account: 'upi' },
  { id: 15, date: '2025-09-04', time: '19:00', amount: 299, type: 'expense', category: 'Subscriptions', merchant: 'Spotify', method: 'Credit Card', account: 'cc', recurring: true },
  { id: 16, date: '2025-09-03', time: '22:15', amount: 480, type: 'expense', category: 'Entertainment', merchant: 'PVR Cinemas', method: 'Cash', account: 'cash' },
  { id: 17, date: '2025-09-02', time: '10:30', amount: 850, type: 'expense', category: 'Mobile Recharge', merchant: 'Jio', method: 'UPI', account: 'upi', recurring: true },
  { id: 18, date: '2025-09-01', time: '12:00', amount: 650, type: 'expense', category: 'Bills', subcategory: 'Electricity', merchant: 'BESCOM', method: 'Debit Card', account: 'dc', recurring: true },
];

const monthlyData = [
  { month: 'Apr', income: 82000, expense: 38000, savings: 44000 },
  { month: 'May', income: 82000, expense: 41200, savings: 40800 },
  { month: 'Jun', income: 88000, expense: 39500, savings: 48500 },
  { month: 'Jul', income: 82000, expense: 44000, savings: 38000 },
  { month: 'Aug', income: 87000, expense: 41800, savings: 45200 },
  { month: 'Sep', income: 87000, expense: 42650, savings: 44350 },
];

const categorySpend = [
  { name: 'Food', value: 8240, color: '#F97316' },
  { name: 'Shopping', value: 7150, color: '#EC4899' },
  { name: 'Rent', value: 5000, color: '#6366F1' },
  { name: 'Fuel', value: 3200, color: '#EF4444' },
  { name: 'Bills', value: 2549, color: '#F59E0B' },
  { name: 'Grocery', value: 2450, color: '#84CC16' },
  { name: 'Subscriptions', value: 948, color: '#D946EF' },
  { name: 'Other', value: 3113, color: '#71717A' },
];

const paymentSplit = [
  { name: 'UPI', value: 18420, color: '#3B82F6' },
  { name: 'Credit Card', value: 10230, color: '#8B5CF6' },
  { name: 'Debit Card', value: 7850, color: '#22C55E' },
  { name: 'Cash', value: 6150, color: '#F59E0B' },
  { name: 'Bank Transfer', value: 5000, color: '#EF4444' },
];

const initialBills = [
  { id: 1, name: 'Netflix', amount: 649, due: '2025-09-16', freq: 'Monthly', method: 'Credit Card', status: 'upcoming' },
  { id: 2, name: 'Spotify', amount: 299, due: '2025-09-14', freq: 'Monthly', method: 'Credit Card', status: 'upcoming' },
  { id: 3, name: 'ACT Fibernet', amount: 1899, due: '2025-09-08', freq: 'Monthly', method: 'Debit Card', status: 'paid' },
  { id: 4, name: 'BESCOM Electricity', amount: 650, due: '2025-09-01', freq: 'Monthly', method: 'Debit Card', status: 'paid' },
  { id: 5, name: 'Jio Recharge', amount: 850, due: '2025-09-02', freq: 'Monthly', method: 'UPI', status: 'paid' },
  { id: 6, name: 'Home Rent', amount: 5000, due: '2025-09-09', freq: 'Monthly', method: 'Bank Transfer', status: 'paid' },
  { id: 7, name: 'HDFC Credit Card Bill', amount: 12850, due: '2025-10-05', freq: 'Monthly', method: 'Auto-debit', status: 'upcoming' },
];

const initialBudgets = [
  { id: 1, category: 'Food', budget: 8000, spent: 5420, color: '#F97316' },
  { id: 2, category: 'Shopping', budget: 10000, spent: 7800, color: '#EC4899' },
  { id: 3, category: 'Transport', budget: 5000, spent: 3200, color: '#06B6D4' },
  { id: 4, category: 'Fuel', budget: 4000, spent: 3200, color: '#EF4444' },
  { id: 5, category: 'Entertainment', budget: 3000, spent: 1280, color: '#A855F7' },
  { id: 6, category: 'Bills', budget: 4000, spent: 2549, color: '#F59E0B' },
];

const initialGoals = [
  { id: 1, name: 'Laptop', target: 80000, saved: 45000, icon: '💻', color: '#3B82F6', deadline: '2026-03-01' },
  { id: 2, name: 'Emergency Fund', target: 200000, saved: 85000, icon: '🛡️', color: '#22C55E', deadline: '2026-12-31' },
  { id: 3, name: 'Goa Trip', target: 40000, saved: 18500, icon: '✈️', color: '#F59E0B', deadline: '2026-01-15' },
];

const insights = [
  { icon: TrendingUp, color: 'red', text: 'Your food spending increased 18% compared with last month.', tag: 'Alert' },
  { icon: Smartphone, color: 'blue', text: 'UPI is your most-used payment method (47 transactions).', tag: 'Insight' },
  { icon: Calendar, color: 'gold', text: 'You spent the most on weekends this month.', tag: 'Pattern' },
  { icon: PiggyBank, color: 'green', text: 'Your savings rate improved by 4.2% this month.', tag: 'Positive' },
  { icon: Repeat, color: 'purple', text: '₹4,250 was spent on subscriptions this month.', tag: 'Recurring' },
];

// ==================== MAIN APP ====================
export default function Money3D() {
  const { dark, setDark, t } = useTheme();
  const [page, setPage] = useState('dashboard');
  const [mobileNav, setMobileNav] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [period, setPeriod] = useState('month');
  const [transactions, setTransactions] = useState(initialTransactions);
  const [accounts] = useState(initialAccounts);
  const [budgets] = useState(initialBudgets);
  const [goals] = useState(initialGoals);
  const [bills] = useState(initialBills);
  const [onboarding, setOnboarding] = useState(true);

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.color = t.text;
    document.body.style.margin = 0;
    document.body.style.fontFamily = "'Inter', system-ui, -apple-system, sans-serif";
    // load font
    if (!document.getElementById('money3d-font')) {
      const l = document.createElement('link');
      l.id = 'money3d-font'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
      document.head.appendChild(l);
    }
  }, [t]);

  const totals = useMemo(() => {
    const income = transactions.filter(x => x.type === 'income').reduce((s, x) => s + x.amount, 0);
    const expense = transactions.filter(x => x.type === 'expense').reduce((s, x) => s + x.amount, 0);
    const savings = income - expense;
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;
    const netBalance = accounts.filter(a => a.type !== 'credit').reduce((s, a) => s + a.balance, 0) - (accounts.find(a => a.type === 'credit')?.used || 0);
    return { income, expense, savings, savingsRate, netBalance };
  }, [transactions, accounts]);

  const addTransaction = (tx) => {
    setTransactions([{ ...tx, id: Date.now() }, ...transactions]);
    setAddOpen(false);
  };

  if (onboarding) return <Onboarding t={t} onDone={() => setOnboarding(false)} dark={dark} setDark={setDark} />;

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, transition: 'background .3s' }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${t.border2}; border-radius: 4px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .6; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .hover-lift { transition: all .3s cubic-bezier(.4,0,.2,1); }
        .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,.15); }
        .fade-in { animation: fadeIn .4s ease-out; }
        .scale-in { animation: scaleIn .3s ease-out; }
        button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; }
        input, select, textarea { font-family: inherit; }
        @media (max-width: 1024px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 1025px) {
          .mobile-only { display: none !important; }
        }
      `}</style>

      <Sidebar page={page} setPage={setPage} t={t} dark={dark} setDark={setDark} totals={totals} onAdd={() => setAddOpen(true)} />

      <MobileHeader t={t} onMenu={() => setMobileNav(!mobileNav)} setPage={setPage} />
      {mobileNav && <MobileNav page={page} setPage={(p) => { setPage(p); setMobileNav(false); }} t={t} />}

      <main className="main-content" style={{
        marginLeft: 'var(--sidebar-w, 260px)',
        padding: '28px 32px 120px',
        minHeight: '100vh',
        transition: 'margin .2s',
      }}>
        <style>{`
          @media (max-width: 1024px) { .main-content { margin-left: 0 !important; padding: 76px 16px 100px !important; } }
        `}</style>

        <TopBar t={t} page={page} totals={totals} onAdd={() => setAddOpen(true)} />

        <div className="fade-in" key={page}>
          {page === 'dashboard' && <Dashboard t={t} totals={totals} accounts={accounts} transactions={transactions} period={period} setPeriod={setPeriod} setPage={setPage} onAdd={() => setAddOpen(true)} />}
          {page === 'transactions' && <Transactions t={t} transactions={transactions} />}
          {page === 'income' && <Income t={t} transactions={transactions} />}
          {page === 'expenses' && <Expenses t={t} transactions={transactions} />}
          {page === 'budgets' && <Budgets t={t} budgets={budgets} />}
          {page === 'savings' && <Savings t={t} goals={goals} totals={totals} />}
          {page === 'accounts' && <Accounts t={t} accounts={accounts} />}
          {page === 'upi' && <UPIPage t={t} accounts={accounts} transactions={transactions} />}
          {page === 'cards' && <CardsPage t={t} accounts={accounts} transactions={transactions} />}
          {page === 'cash' && <CashPage t={t} accounts={accounts} transactions={transactions} />}
          {page === 'bills' && <Bills t={t} bills={bills} />}
          {page === 'analytics' && <Analytics t={t} transactions={transactions} />}
          {page === 'calendar' && <CalendarPage t={t} transactions={transactions} />}
          {page === 'insights' && <Insights t={t} />}
          {page === 'reports' && <Reports t={t} totals={totals} />}
          {page === 'security' && <Security t={t} />}
          {page === 'settings' && <Settings t={t} dark={dark} setDark={setDark} />}
        </div>
      </main>

      <FloatingAdd t={t} onClick={() => setAddOpen(true)} />

      {addOpen && <AddTransactionModal t={t} onClose={() => setAddOpen(false)} onSave={addTransaction} accounts={accounts} />}
    </div>
  );
}

// ==================== ONBOARDING ====================
function Onboarding({ t, onDone, dark, setDark }) {
  const [step, setStep] = useState(0);
  const steps = [
    { title: 'Take Control of Your Money', sub: 'Track every rupee — income, expenses, savings, UPI, cards & cash. All in one premium dashboard.', icon: '💎' },
    { title: 'Choose Your Currency', sub: 'Default: Indian Rupee (₹ INR)', icon: '₹' },
    { title: 'Add Your Accounts', sub: 'Bank · Cash · Debit Card · Credit Card · UPI', icon: '🏦' },
    { title: 'Set Monthly Budget', sub: 'We\'ll help you stay on track', icon: '🎯' },
    { title: 'Set a Savings Goal', sub: 'Emergency fund, travel, laptop — you decide', icon: '🏆' },
  ];
  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes floatY { 0%,100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-20px) rotate(-6deg); } }
      `}</style>
      {/* decorative cards */}
      <div style={{ position: 'absolute', top: '12%', left: '6%', width: 180, height: 110, borderRadius: 16, background: t.gradBlue, boxShadow: t.shadow, animation: 'floatY 6s ease-in-out infinite', display: 'none' }} />
      <div style={{ position: 'absolute', bottom: '14%', right: '8%', width: 200, height: 120, borderRadius: 16, background: t.gradGreen, boxShadow: t.shadow, animation: 'floatY 7s ease-in-out infinite', display: 'none' }} />

      <div className="scale-in" style={{
        maxWidth: 520, width: '100%', background: t.card, border: `1px solid ${t.border}`,
        borderRadius: 24, padding: 40, boxShadow: t.shadow, position: 'relative', zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: t.gradGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, color: '#fff' }}>M3</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>MONEY3D</div>
            <div style={{ fontSize: 11, color: t.text3, letterSpacing: '0.05em' }}>Know Where Your Money Goes.</div>
          </div>
        </div>

        <div style={{ fontSize: 48, marginBottom: 12 }}>{steps[step].icon}</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', margin: 0, marginBottom: 10 }}>{steps[step].title}</h1>
        <p style={{ color: t.text2, fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>{steps[step].sub}</p>

        {step === 1 && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            {['₹ INR', '$ USD', '€ EUR', '£ GBP'].map((c, i) => (
              <button key={c} style={{
                flex: 1, padding: '14px 8px', borderRadius: 12,
                background: i === 0 ? t.greenBg : t.card2,
                border: `1px solid ${i === 0 ? t.green : t.border}`,
                color: i === 0 ? t.green : t.text2, fontWeight: 600, fontSize: 14,
              }}>{c}</button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            {['🏦 Bank', '💵 Cash', '💳 Debit', '🎴 Credit', '📱 UPI', '📈 Invest'].map((a) => (
              <div key={a} style={{ padding: 16, borderRadius: 12, background: t.card2, border: `1px solid ${t.border}`, fontSize: 13, fontWeight: 500 }}>{a}</div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ background: t.card2, borderRadius: 14, padding: 18, border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 12, color: t.text3, marginBottom: 6 }}>MONTHLY BUDGET</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: t.green }}>₹45,000</span>
                <span style={{ fontSize: 13, color: t.text3 }}>/ month</span>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ background: t.card2, borderRadius: 14, padding: 18, border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 12, color: t.text3, marginBottom: 6 }}>SAVINGS GOAL</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Emergency Fund</div>
              <div style={{ height: 8, borderRadius: 4, background: t.border, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '42%', background: t.gradGreen, borderRadius: 4 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: t.text2 }}>
                <span>₹85,000 saved</span><span>₹2,00,000 goal</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 32 }}>
          <div style={{ display: 'flex', gap: 6, flex: 1 }}>
            {steps.map((_, i) => (
              <div key={i} style={{ height: 4, flex: 1, borderRadius: 2, background: i <= step ? t.green : t.border, transition: 'background .3s' }} />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button onClick={onDone} style={{ padding: '14px 20px', borderRadius: 12, color: t.text3, fontSize: 14, fontWeight: 600 }}>Skip</button>
          <button onClick={() => step < 4 ? setStep(step + 1) : onDone()} style={{
            flex: 1, padding: 14, borderRadius: 12, background: t.text, color: t.bg,
            fontWeight: 700, fontSize: 15,
          }}>{step === 4 ? 'Enter Dashboard →' : 'Continue →'}</button>
        </div>
      </div>
    </div>
  );
}

// ==================== SIDEBAR ====================
function Sidebar({ page, setPage, t, dark, setDark, totals, onAdd }) {
  const nav = [
    { section: 'MAIN', items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'transactions', label: 'Transactions', icon: Receipt },
      { id: 'calendar', label: 'Money Calendar', icon: Calendar },
    ]},
    { section: 'MONEY', items: [
      { id: 'income', label: 'Income', icon: TrendingUp },
      { id: 'expenses', label: 'Expenses', icon: TrendingDown },
      { id: 'budgets', label: 'Budgets', icon: Target },
      { id: 'savings', label: 'Savings', icon: PiggyBank },
    ]},
    { section: 'SOURCES', items: [
      { id: 'accounts', label: 'Accounts', icon: Wallet },
      { id: 'upi', label: 'UPI', icon: Smartphone },
      { id: 'cards', label: 'Cards', icon: CreditCard },
      { id: 'cash', label: 'Cash Flow', icon: Banknote },
      { id: 'bills', label: 'Bills & Subs', icon: Receipt },
    ]},
    { section: 'ANALYZE', items: [
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'insights', label: 'Money Insights', icon: Sparkles },
      { id: 'reports', label: 'Reports', icon: FileText },
    ]},
    { section: 'SYSTEM', items: [
      { id: 'security', label: 'Privacy & Security', icon: Shield },
      { id: 'settings', label: 'Settings', icon: Settings },
    ]},
  ];

  return (
    <aside className="desktop-only" style={{
      width: 260, position: 'fixed', top: 0, left: 0, bottom: 0,
      background: t.card, borderRight: `1px solid ${t.border}`,
      display: 'flex', flexDirection: 'column', zIndex: 40,
    }}>
      <style>{`--sidebar-w: 260px;`}</style>
      <div style={{ padding: '22px 20px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: t.gradGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#fff', boxShadow: '0 4px 14px rgba(34,197,94,0.35)' }}>M3</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em' }}>MONEY3D</div>
          <div style={{ fontSize: 10, color: t.text3, letterSpacing: '0.06em' }}>TRACK · SAVE</div>
        </div>
      </div>

      <div style={{ padding: '0 16px 12px' }}>
        <button onClick={onAdd} style={{
          width: '100%', padding: '12px 16px', borderRadius: 12,
          background: t.gradGreen, color: '#fff', fontWeight: 700, fontSize: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 6px 20px rgba(34,197,94,0.3)',
          transition: 'transform .2s',
        }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
           onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
          <Plus size={18} strokeWidth={2.5} /> Add Transaction
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 12px 16px' }}>
        {nav.map((group) => (
          <div key={group.section} style={{ marginTop: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: t.text3, letterSpacing: '0.1em', padding: '8px 8px 6px' }}>{group.section}</div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = page === item.id;
              return (
                <button key={item.id} onClick={() => setPage(item.id)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 11,
                  padding: '9px 10px', borderRadius: 10, fontSize: 13.5,
                  fontWeight: active ? 600 : 500,
                  background: active ? t.greenBg : 'transparent',
                  color: active ? t.green : t.text2,
                  transition: 'all .15s',
                  marginBottom: 2,
                  position: 'relative',
                }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = t.card2; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  {active && <div style={{ position: 'absolute', left: -12, top: '50%', transform: 'translateY(-50%)', width: 3, height: 16, borderRadius: 2, background: t.green }} />}
                  <Icon size={17} strokeWidth={active ? 2.4 : 2} />
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ padding: 14, borderTop: `1px solid ${t.border}`, display: 'flex', gap: 8 }}>
        <button onClick={() => setDark(!dark)} style={{ flex: 1, padding: 10, borderRadius: 10, background: t.card2, border: `1px solid ${t.border}`, color: t.text2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, fontWeight: 600 }}>
          {dark ? <Sun size={15} /> : <Moon size={15} />}
          {dark ? 'Light' : 'Dark'}
        </button>
        <button style={{ padding: 10, borderRadius: 10, background: t.card2, border: `1px solid ${t.border}`, color: t.text2 }}>
          <Bell size={15} />
        </button>
      </div>
    </aside>
  );
}

// ==================== MOBILE NAV ====================
function MobileHeader({ t, onMenu }) {
  return (
    <div className="mobile-only" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30,
      background: t.glass, backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${t.border}`,
      padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: t.gradGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12, color: '#fff' }}>M3</div>
        <div style={{ fontWeight: 800, fontSize: 14 }}>MONEY3D</div>
      </div>
      <button onClick={onMenu} style={{ padding: 8, color: t.text }}><Menu size={20} /></button>
    </div>
  );
}

function MobileNav({ page, setPage, t }) {
  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'transactions', label: 'Activity', icon: Receipt },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Profile', icon: Settings },
  ];
  return (
    <div className="mobile-only scale-in" style={{
      position: 'fixed', top: 60, left: 12, right: 12, zIndex: 31,
      background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 8,
      boxShadow: t.shadow,
    }}>
      {items.map(i => {
        const Icon = i.icon;
        return (
          <button key={i.id} onClick={() => setPage(i.id)} style={{
            width: '100%', padding: 14, borderRadius: 10, textAlign: 'left',
            background: page === i.id ? t.greenBg : 'transparent',
            color: page === i.id ? t.green : t.text,
            fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Icon size={18} /> {i.label}
          </button>
        );
      })}
    </div>
  );
}

function FloatingAdd({ t, onClick }) {
  return (
    <button onClick={onClick} className="mobile-only" style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      width: 60, height: 60, borderRadius: '50%',
      background: t.gradGreen, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 12px 32px rgba(34,197,94,0.45)', zIndex: 35,
      transition: 'transform .2s',
    }}>
      <Plus size={28} strokeWidth={2.5} />
    </button>
  );
}

// ==================== TOP BAR ====================
function TopBar({ t, page, totals, onAdd }) {
  const titles = {
    dashboard: 'Dashboard', transactions: 'Transactions', income: 'Income',
    expenses: 'Expenses', budgets: 'Budgets', savings: 'Savings', accounts: 'Accounts',
    upi: 'UPI', cards: 'Cards', cash: 'Cash Flow', bills: 'Bills & Subscriptions',
    analytics: 'Analytics', calendar: 'Money Calendar', insights: 'Money Insights',
    reports: 'Reports', security: 'Privacy & Security', settings: 'Settings',
  };
  return (
    <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, gap: 20, flexWrap: 'wrap' }}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>{titles[page]}</h1>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: t.card, border: `1px solid ${t.border}`, borderRadius: 12,
          padding: '10px 14px', minWidth: 260, boxShadow: t.shadowSm,
        }}>
          <Search size={16} style={{ color: t.text3 }} />
          <input placeholder="Search transactions, merchants..." style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: t.text, fontSize: 13.5, fontWeight: 500,
          }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: '10px 12px', boxShadow: t.shadowSm }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: t.gradPurple, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>AK</div>
          <div style={{ fontSize: 12.5, fontWeight: 600 }}>Arjun K.</div>
        </div>
      </div>
    </div>
  );
}

// ==================== DASHBOARD ====================
function Dashboard({ t, totals, accounts, transactions, period, setPeriod, setPage, onAdd }) {
  const bank = accounts.find(a => a.type === 'bank');
  const cc = accounts.find(a => a.type === 'credit');
  const cash = accounts.find(a => a.type === 'cash');
  const upi = accounts.find(a => a.type === 'upi');

  return (
    <div>
      {/* HERO */}
      <div style={{
        borderRadius: 24, padding: '32px 36px', position: 'relative', overflow: 'hidden',
        background: t.dark ? 'linear-gradient(135deg, #0F172A 0%, #052E16 100%)' : 'linear-gradient(135deg, #064E3B 0%, #065F46 60%, #047857 100%)',
        color: '#fff', boxShadow: '0 20px 60px rgba(6,95,70,0.35)', marginBottom: 24,
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.35), transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -100, left: '30%', width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2), transparent 70%)' }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.7, letterSpacing: '0.1em', fontWeight: 600, marginBottom: 4 }}>YOUR MONEY, AT A GLANCE</div>
            <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 8, fontWeight: 500 }}>Good Morning 👋</div>
            <div style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1 }}>{fmt(totals.netBalance)}</div>
            <div style={{ fontSize: 13, opacity: 0.7, marginTop: 6, fontWeight: 500 }}>Total Net Balance · This Month</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Today', 'Week', 'Month', 'Last Month', 'Year', 'Custom'].map(p => (
              <button key={p} onClick={() => setPeriod(p.toLowerCase())} style={{
                padding: '8px 14px', borderRadius: 10, fontSize: 12.5, fontWeight: 600,
                background: period === p.toLowerCase() ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                color: '#fff', border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
              }}>{p}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginTop: 28, position: 'relative', zIndex: 2 }}>
          {[
            { label: 'Income', value: totals.income, icon: ArrowDownLeft, color: '#4ADE80' },
            { label: 'Expenses', value: totals.expense, icon: ArrowUpRight, color: '#F87171' },
            { label: 'Savings', value: totals.savings, icon: PiggyBank, color: '#60A5FA' },
            { label: 'Savings Rate', value: totals.savingsRate.toFixed(1) + '%', icon: Percent, color: '#FBBF24' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, fontSize: 12, opacity: 0.85, fontWeight: 500 }}>
                  <Icon size={14} style={{ color: s.color }} /> {s.label}
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>{typeof s.value === 'number' ? fmt(s.value) : s.value}</div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24, position: 'relative', zIndex: 2, flexWrap: 'wrap' }}>
          <button onClick={onAdd} style={{ padding: '12px 22px', borderRadius: 12, background: '#fff', color: '#065F46', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
            <Plus size={18} strokeWidth={2.5} /> Add Transaction
          </button>
          <button onClick={() => setPage('analytics')} style={{ padding: '12px 22px', borderRadius: 12, background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 600, fontSize: 14, backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <BarChart3 size={16} /> View Analytics
          </button>
        </div>
      </div>

      {/* 3D CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18, marginBottom: 24 }}>
        <BankCard t={t} bank={bank} />
        <UPICard t={t} upi={upi} />
        <DebitCard t={t} accounts={accounts} />
        <CreditCard3D t={t} cc={cc} />
        <CashCard t={t} cash={cash} />
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginBottom: 24 }}>
        <MiniStat t={t} label="UPI Spending" value={fmt(18420)} sub="47 transactions" color={t.blue} icon={Smartphone} />
        <MiniStat t={t} label="Credit Card" value={fmt(38500)} sub="38.5% utilized" color={t.purple} icon={CreditCard} />
        <MiniStat t={t} label="Cash in Hand" value={fmt(7150)} sub="Wallet" color={t.gold} icon={Banknote} />
        <MiniStat t={t} label="This Month" value={fmt(42650)} sub="Total spent" color={t.red} icon={TrendingDown} />
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: 18, marginBottom: 24 }} className="chart-grid">
        <style>{`@media (max-width: 900px) { .chart-grid { grid-template-columns: 1fr !important; } }`}</style>
        <Card t={t}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>Income vs Expense</div>
              <div style={{ fontSize: 12, color: t.text3, marginTop: 2 }}>Last 6 months</div>
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 11.5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: t.green }} /><span style={{ color: t.text2 }}>Income</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: t.red }} /><span style={{ color: t.text2 }}>Expense</span></div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} vertical={false} />
              <XAxis dataKey="month" stroke={t.text3} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={t.text3} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => '₹' + (v/1000) + 'k'} />
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: 12, color: t.text }} formatter={(v) => fmt(v)} />
              <Bar dataKey="income" fill={t.green} radius={[6, 6, 0, 0]} />
              <Bar dataKey="expense" fill={t.red} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card t={t}>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 4 }}>Spending by Category</div>
          <div style={{ fontSize: 12, color: t.text3, marginBottom: 10 }}>This month</div>
          <ResponsiveContainer width="100%" height={200}>
            <RPieChart>
              <Pie data={categorySpend} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {categorySpend.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: 12, color: t.text }} formatter={(v) => fmt(v)} />
            </RPieChart>
          </ResponsiveContainer>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 8 }}>
            {categorySpend.slice(0, 4).map((c) => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5 }}>
                <div style={{ width: 7, height: 7, borderRadius: 2, background: c.color }} />
                <span style={{ color: t.text2, flex: 1 }}>{c.name}</span>
                <span style={{ fontWeight: 600 }}>{fmt(c.value)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent + Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: 18 }} className="recent-grid">
        <style>{`@media (max-width: 900px) { .recent-grid { grid-template-columns: 1fr !important; } }`}</style>
        <Card t={t} padding={0}>
          <div style={{ padding: '20px 22px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Recent Transactions</div>
            <button onClick={() => setPage('transactions')} style={{ fontSize: 12, color: t.green, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div>
            {transactions.slice(0, 6).map((tx, i) => <TxRow key={tx.id} tx={tx} t={t} last={i === 5} />)}
          </div>
        </Card>

        <Card t={t}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Sparkles size={16} style={{ color: t.green }} />
            <div style={{ fontSize: 16, fontWeight: 700 }}>Money Insights</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {insights.slice(0, 4).map((ins, i) => {
              const Icon = ins.icon;
              const c = { red: t.red, green: t.green, blue: t.blue, gold: t.gold, purple: t.purple }[ins.color];
              const bg = { red: t.redBg, green: t.greenBg, blue: t.blueBg, gold: t.goldBg, purple: t.purpleBg }[ins.color];
              return (
                <div key={i} style={{ display: 'flex', gap: 10, padding: 12, background: t.card2, borderRadius: 12, border: `1px solid ${t.border}` }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={15} style={{ color: c }} />
                  </div>
                  <div style={{ fontSize: 12.5, color: t.text2, lineHeight: 1.5 }}>{ins.text}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ==================== 3D CARDS ====================
function BankCard({ t, bank }) {
  return (
    <div className="hover-lift" style={{
      borderRadius: 20, padding: 22, position: 'relative', overflow: 'hidden',
      background: t.gradDark, color: '#fff', minHeight: 200,
      boxShadow: '0 20px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
      transform: 'perspective(1000px) rotateX(0deg)', transition: 'all .4s',
    }}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.25), transparent 70%)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
        <div>
          <div style={{ fontSize: 10.5, opacity: 0.6, letterSpacing: '0.1em', fontWeight: 600 }}>BANK ACCOUNT</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 3 }}>{bank.nickname}</div>
        </div>
        <Landmark size={22} style={{ opacity: 0.7 }} />
      </div>
      <div style={{ marginTop: 24, position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 10.5, opacity: 0.6, letterSpacing: '0.08em' }}>AVAILABLE BALANCE</div>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 4 }}>{fmt(bank.balance)}</div>
      </div>
      <div style={{ display: 'flex', gap: 20, marginTop: 20, position: 'relative', zIndex: 2 }}>
        <div><div style={{ fontSize: 10, opacity: 0.55 }}>Income</div><div style={{ fontSize: 14, fontWeight: 700, color: '#4ADE80' }}>+{fmt(bank.income)}</div></div>
        <div><div style={{ fontSize: 10, opacity: 0.55 }}>Expense</div><div style={{ fontSize: 14, fontWeight: 700, color: '#F87171' }}>-{fmt(bank.expense)}</div></div>
      </div>
      <div style={{ position: 'absolute', bottom: 14, right: 18, fontSize: 11, opacity: 0.5, letterSpacing: '0.15em', fontFamily: 'monospace' }}>•••• {bank.last4}</div>
    </div>
  );
}

function UPICard({ t, upi }) {
  return (
    <div className="hover-lift" style={{
      borderRadius: 20, padding: 22, position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #6366F1 100%)',
      color: '#fff', minHeight: 200,
      boxShadow: '0 20px 50px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
    }}>
      <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
        <div>
          <div style={{ fontSize: 10.5, opacity: 0.85, letterSpacing: '0.1em', fontWeight: 600 }}>UPI WALLET</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 3 }}>{upi.app}</div>
        </div>
        <Smartphone size={22} style={{ opacity: 0.85 }} />
      </div>
      <div style={{ marginTop: 24, position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 10.5, opacity: 0.75, letterSpacing: '0.08em' }}>UPI SPENDING</div>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 4 }}>{fmt(upi.spent)}</div>
      </div>
      <div style={{ display: 'flex', gap: 18, marginTop: 20, position: 'relative', zIndex: 2 }}>
        <div><div style={{ fontSize: 10, opacity: 0.65 }}>Received</div><div style={{ fontSize: 13, fontWeight: 700 }}>{fmt(upi.received)}</div></div>
        <div><div style={{ fontSize: 10, opacity: 0.65 }}>Txns</div><div style={{ fontSize: 13, fontWeight: 700 }}>{upi.txns}</div></div>
      </div>
      <div style={{ position: 'absolute', bottom: 14, right: 18, fontSize: 10, opacity: 0.65, fontWeight: 600 }}>Top: {upi.topMerchant}</div>
    </div>
  );
}

function DebitCard({ t, accounts }) {
  const dc = accounts.find(a => a.type === 'debit');
  return (
    <div className="hover-lift" style={{
      borderRadius: 20, padding: 22, position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
      color: '#fff', minHeight: 200,
      boxShadow: '0 20px 50px rgba(20,184,166,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
    }}>
      <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
        <div>
          <div style={{ fontSize: 10.5, opacity: 0.85, letterSpacing: '0.1em', fontWeight: 600 }}>DEBIT CARD</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 3 }}>{dc.nickname}</div>
        </div>
        <CreditCard size={22} style={{ opacity: 0.85 }} />
      </div>
      <div style={{ marginTop: 24, position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 10.5, opacity: 0.75, letterSpacing: '0.08em' }}>MONTHLY SPENDING</div>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 4 }}>{fmt(dc.monthly)}</div>
      </div>
      <div style={{ display: 'flex', gap: 18, marginTop: 20, position: 'relative', zIndex: 2 }}>
        <div><div style={{ fontSize: 10, opacity: 0.65 }}>Txns</div><div style={{ fontSize: 13, fontWeight: 700 }}>{dc.txns}</div></div>
        <div><div style={{ fontSize: 10, opacity: 0.65 }}>Balance</div><div style={{ fontSize: 13, fontWeight: 700 }}>{fmt(dc.balance)}</div></div>
      </div>
      <div style={{ position: 'absolute', bottom: 14, right: 18, fontSize: 11, opacity: 0.6, letterSpacing: '0.15em', fontFamily: 'monospace' }}>•••• {dc.last4}</div>
    </div>
  );
}

function CreditCard3D({ t, cc }) {
  const util = (cc.used / cc.limit) * 100;
  return (
    <div className="hover-lift" style={{
      borderRadius: 20, padding: 22, position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #18181B 0%, #3F3F46 50%, #52525B 100%)',
      color: '#fff', minHeight: 200,
      boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
    }}>
      <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
        <div>
          <div style={{ fontSize: 10.5, opacity: 0.6, letterSpacing: '0.1em', fontWeight: 600 }}>CREDIT CARD</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 3 }}>{cc.nickname}</div>
        </div>
        <CardIcon size={22} style={{ opacity: 0.8 }} />
      </div>
      <div style={{ marginTop: 20, position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 10.5, opacity: 0.6, letterSpacing: '0.08em' }}>CURRENT OUTSTANDING</div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 4 }}>{fmt(cc.used)}</div>
        <div style={{ fontSize: 10.5, opacity: 0.6, marginTop: 2 }}>of {fmt(cc.limit)} limit</div>
      </div>
      <div style={{ marginTop: 14, position: 'relative', zIndex: 2 }}>
        <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${util}%`, background: 'linear-gradient(90deg, #22C55E, #F59E0B, #EF4444)', borderRadius: 3 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, opacity: 0.7 }}>
          <span>{util.toFixed(1)}% utilized</span>
          <span>Due 5 Oct · Min ₹642</span>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 14, right: 18, fontSize: 11, opacity: 0.5, letterSpacing: '0.15em', fontFamily: 'monospace' }}>•••• {cc.last4}</div>
    </div>
  );
}

function CashCard({ t, cash }) {
  const current = cash.starting + cash.withdrawals + cash.deposits - cash.expenses;
  return (
    <div className="hover-lift" style={{
      borderRadius: 20, padding: 22, position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #78350F 0%, #B45309 50%, #F59E0B 100%)',
      color: '#fff', minHeight: 200,
      boxShadow: '0 20px 50px rgba(245,158,11,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
    }}>
      <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
        <div>
          <div style={{ fontSize: 10.5, opacity: 0.9, letterSpacing: '0.1em', fontWeight: 600 }}>CASH WALLET</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 3 }}>Physical Cash</div>
        </div>
        <Banknote size={22} style={{ opacity: 0.9 }} />
      </div>
      <div style={{ marginTop: 24, position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 10.5, opacity: 0.8, letterSpacing: '0.08em' }}>CASH IN HAND</div>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 4 }}>{fmt(current)}</div>
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 20, position: 'relative', zIndex: 2, fontSize: 11 }}>
        <div><div style={{ opacity: 0.7, fontSize: 10 }}>ATM</div><div style={{ fontWeight: 700 }}>+{fmt(cash.withdrawals)}</div></div>
        <div><div style={{ opacity: 0.7, fontSize: 10 }}>Spent</div><div style={{ fontWeight: 700 }}>-{fmt(cash.expenses)}</div></div>
      </div>
    </div>
  );
}

// ==================== COMPONENTS ====================
function Card({ t, children, padding = 22, style = {} }) {
  return (
    <div style={{
      background: t.card, border: `1px solid ${t.border}`, borderRadius: 18,
      padding, boxShadow: t.shadowSm, ...style,
    }}>{children}</div>
  );
}

function MiniStat({ t, label, value, sub, color, icon: Icon }) {
  return (
    <div className="hover-lift" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 18, boxShadow: t.shadowSm }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: t.text2, fontWeight: 500 }}>{label}</div>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={15} style={{ color }} />
        </div>
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>{value}</div>
      <div style={{ fontSize: 11.5, color: t.text3, marginTop: 3 }}>{sub}</div>
    </div>
  );
}

function TxRow({ tx, t, last }) {
  const isIncome = tx.type === 'income';
  const isTransfer = tx.type === 'transfer';
  const Icon = categoryIcons[tx.category] || MoreHorizontal;
  const color = isIncome ? t.green : isTransfer ? t.blue : t.red;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '13px 22px',
      borderBottom: last ? 'none' : `1px solid ${t.border}`,
      transition: 'background .15s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = t.card2}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={17} style={{ color }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.merchant}</div>
        <div style={{ fontSize: 11.5, color: t.text3, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span>{tx.category}</span><span>·</span><span>{tx.method}</span>
          <span>·</span><span>{new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color }}>{isIncome ? '+' : isTransfer ? '' : '-'}{fmt(tx.amount)}</div>
        <div style={{ fontSize: 10.5, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{tx.type}</div>
      </div>
    </div>
  );
}

// ==================== TRANSACTIONS ====================
function Transactions({ t, transactions }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [catFilter, setCatFilter] = useState('all');

  const filtered = useMemo(() => {
    return transactions.filter(tx => {
      if (search && !`${tx.merchant} ${tx.category} ${tx.method} ${tx.note || ''}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
      if (methodFilter !== 'all' && tx.method !== methodFilter) return false;
      if (catFilter !== 'all' && tx.category !== catFilter) return false;
      return true;
    });
  }, [transactions, search, typeFilter, methodFilter, catFilter]);

  const cats = [...new Set(transactions.map(t => t.category))];
  const methods = [...new Set(transactions.map(t => t.method).filter(Boolean))];

  return (
    <div>
      <Card t={t} padding={20} style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 200, background: t.card2, borderRadius: 10, padding: '10px 14px', border: `1px solid ${t.border}` }}>
            <Search size={16} style={{ color: t.text3 }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search merchant, category, notes..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: t.text, fontSize: 13.5 }} />
          </div>
          <Select value={typeFilter} onChange={setTypeFilter} t={t} options={[{ v: 'all', l: 'All Types' }, { v: 'income', l: 'Income' }, { v: 'expense', l: 'Expense' }, { v: 'transfer', l: 'Transfer' }]} />
          <Select value={methodFilter} onChange={setMethodFilter} t={t} options={[{ v: 'all', l: 'All Methods' }, ...methods.map(m => ({ v: m, l: m }))]} />
          <Select value={catFilter} onChange={setCatFilter} t={t} options={[{ v: 'all', l: 'All Categories' }, ...cats.map(c => ({ v: c, l: c }))]} />
          <button style={{ padding: '10px 14px', borderRadius: 10, background: t.card2, border: `1px solid ${t.border}`, color: t.text2, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}>
            <Download size={14} /> Export
          </button>
        </div>
      </Card>

      <Card t={t} padding={0}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${t.border}` }}>
                {['Date', 'Description', 'Category', 'Method', 'Type', 'Amount'].map(h => (
                  <th key={h} style={{ textAlign: h === 'Amount' ? 'right' : 'left', padding: '14px 18px', fontSize: 11, fontWeight: 700, color: t.text3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => {
                const isIncome = tx.type === 'income';
                return (
                  <tr key={tx.id} style={{ borderBottom: `1px solid ${t.border}`, transition: 'background .15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = t.card2}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '14px 18px', fontSize: 13, color: t.text2 }}>{new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                    <td style={{ padding: '14px 18px', fontSize: 13.5, fontWeight: 600 }}>{tx.merchant}</td>
                    <td style={{ padding: '14px 18px', fontSize: 13, color: t.text2 }}>{tx.category}</td>
                    <td style={{ padding: '14px 18px', fontSize: 12.5, color: t.text2 }}>{tx.method || '—'}</td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ fontSize: 10.5, padding: '3px 8px', borderRadius: 6, fontWeight: 700, letterSpacing: '0.03em', background: isIncome ? t.greenBg : tx.type === 'transfer' ? t.blueBg : t.redBg, color: isIncome ? t.green : tx.type === 'transfer' ? t.blue : t.red }}>{tx.type.toUpperCase()}</span>
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right', fontSize: 14, fontWeight: 700, color: isIncome ? t.green : tx.type === 'transfer' ? t.blue : t.text }}>{isIncome ? '+' : tx.type === 'transfer' ? '' : '-'}{fmt(tx.amount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <EmptyState t={t} title="No transactions found" sub="Try adjusting filters or search" />}
      </Card>
    </div>
  );
}

function Select({ value, onChange, options, t }) {
  return (
    <div style={{ position: 'relative' }}>
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        appearance: 'none', background: t.card2, border: `1px solid ${t.border}`,
        borderRadius: 10, padding: '10px 32px 10px 14px', color: t.text,
        fontSize: 13, fontWeight: 600, outline: 'none', cursor: 'pointer',
      }}>
        {options.map(o => <option key={o.v} value={o.v} style={{ background: t.card }}>{o.l}</option>)}
      </select>
      <ChevronDown size={14} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: t.text3, pointerEvents: 'none' }} />
    </div>
  );
}

function EmptyState({ t, title, sub, action }) {
  return (
    <div style={{ padding: 60, textAlign: 'center' }}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 12.5, color: t.text3, marginBottom: 16 }}>{sub}</div>
      {action}
    </div>
  );
}

// ==================== INCOME ====================
function Income({ t, transactions }) {
  const income = transactions.filter(x => x.type === 'income');
  const total = income.reduce((s, x) => s + x.amount, 0);
  const bySource = {};
  income.forEach(x => { bySource[x.category] = (bySource[x.category] || 0) + x.amount; });
  const sourceData = Object.entries(bySource).map(([name, value]) => ({ name, value, color: catColor(t)[name] || t.green }));

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        <MiniStat t={t} label="Total Income" value={fmt(total)} sub="This month" color={t.green} icon={TrendingUp} />
        <MiniStat t={t} label="Monthly Average" value={fmt(85000)} sub="Last 6 months" color={t.blue} icon={BarChart3} />
        <MiniStat t={t} label="Growth" value="+6.2%" sub="vs last month" color={t.green} icon={ArrowUpRight} />
        <MiniStat t={t} label="Sources" value={sourceData.length} sub="Active" color={t.purple} icon={Sparkles} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 18, marginBottom: 20 }} className="chart-grid">
        <Card t={t}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Income by Source</div>
          <ResponsiveContainer width="100%" height={220}>
            <RPieChart>
              <Pie data={sourceData} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {sourceData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: 12 }} formatter={(v) => fmt(v)} />
            </RPieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
            {sourceData.map(s => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                <span style={{ flex: 1, color: t.text2 }}>{s.name}</span>
                <span style={{ fontWeight: 700 }}>{fmt(s.value)}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card t={t}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Income Trend</div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={t.green} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={t.green} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} vertical={false} />
              <XAxis dataKey="month" stroke={t.text3} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={t.text3} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => '₹' + (v/1000) + 'k'} />
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: 12 }} formatter={(v) => fmt(v)} />
              <Area type="monotone" dataKey="income" stroke={t.green} strokeWidth={2.5} fill="url(#incGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card t={t} padding={0}>
        <div style={{ padding: '18px 22px', fontSize: 15, fontWeight: 700, borderBottom: `1px solid ${t.border}` }}>Income History</div>
        {income.map((tx, i) => <TxRow key={tx.id} tx={tx} t={t} last={i === income.length - 1} />)}
      </Card>
    </div>
  );
}

// ==================== EXPENSES ====================
function Expenses({ t, transactions }) {
  const expenses = transactions.filter(x => x.type === 'expense');
  const total = expenses.reduce((s, x) => s + x.amount, 0);
  const byCat = {};
  expenses.forEach(x => { byCat[x.category] = (byCat[x.category] || 0) + x.amount; });
  const catData = Object.entries(byCat).map(([name, value]) => ({ name, value, color: catColor(t)[name] || t.red })).sort((a, b) => b.value - a.value);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        <MiniStat t={t} label="Total Expenses" value={fmt(total)} sub="This month" color={t.red} icon={TrendingDown} />
        <MiniStat t={t} label="Daily Average" value={fmt(total / 30)} sub="Per day" color={t.gold} icon={Calendar} />
        <MiniStat t={t} label="Transactions" value={expenses.length} sub="This month" color={t.blue} icon={Receipt} />
        <MiniStat t={t} label="Top Category" value={catData[0]?.name || '—'} sub={catData[0] ? fmt(catData[0].value) : ''} color={t.purple} icon={Sparkles} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: 18, marginBottom: 20 }} className="chart-grid">
        <Card t={t}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Category Breakdown</div>
          {catData.map((c) => {
            const pct = (c.value / total) * 100;
            return (
              <div key={c.name} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12.5 }}>
                  <span style={{ fontWeight: 600 }}>{c.name}</span>
                  <span style={{ color: t.text2 }}>{fmt(c.value)} · {pct.toFixed(1)}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: t.card2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: c.color, borderRadius: 4, transition: 'width .5s' }} />
                </div>
              </div>
            );
          })}
        </Card>
        <Card t={t}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Distribution</div>
          <ResponsiveContainer width="100%" height={280}>
            <RPieChart>
              <Pie data={catData} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {catData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: 12 }} formatter={(v) => fmt(v)} />
            </RPieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card t={t} padding={0}>
        <div style={{ padding: '18px 22px', fontSize: 15, fontWeight: 700, borderBottom: `1px solid ${t.border}` }}>All Expenses</div>
        {expenses.map((tx, i) => <TxRow key={tx.id} tx={tx} t={t} last={i === expenses.length - 1} />)}
      </Card>
    </div>
  );
}

// ==================== BUDGETS ====================
function Budgets({ t, budgets }) {
  const totalBudget = budgets.reduce((s, b) => s + b.budget, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const pct = (totalSpent / totalBudget) * 100;

  return (
    <div>
      <Card t={t} style={{ marginBottom: 20, background: pct > 90 ? t.redBg : pct > 75 ? t.goldBg : t.greenBg, border: `1px solid ${pct > 90 ? t.red : pct > 75 ? t.gold : t.green}30` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 13, color: t.text2, fontWeight: 600, marginBottom: 4 }}>TOTAL MONTHLY BUDGET</div>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em' }}>{fmt(totalSpent)} <span style={{ fontSize: 16, color: t.text3, fontWeight: 500 }}>/ {fmt(totalBudget)}</span></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: pct > 90 ? t.red : pct > 75 ? t.gold : t.green }}>{pct.toFixed(0)}%</div>
            <div style={{ fontSize: 12, color: t.text2 }}>used</div>
          </div>
        </div>
        <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', marginTop: 16 }}>
          <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: pct > 90 ? t.red : pct > 75 ? t.gold : t.green, borderRadius: 5, transition: 'width .5s' }} />
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {budgets.map(b => {
          const p = (b.spent / b.budget) * 100;
          const rem = b.budget - b.spent;
          const warn = p > 80;
          return (
            <Card key={b.id} t={t}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{b.category}</div>
                {warn && <span style={{ fontSize: 10.5, padding: '3px 8px', borderRadius: 6, background: t.redBg, color: t.red, fontWeight: 700 }}>⚠ {p.toFixed(0)}%</span>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: t.text2, marginBottom: 8 }}>
                <span>Spent <b style={{ color: t.text }}>{fmt(b.spent)}</b></span>
                <span>of {fmt(b.budget)}</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: t.card2, overflow: 'hidden', marginBottom: 10 }}>
                <div style={{ height: '100%', width: `${Math.min(p, 100)}%`, background: b.color, borderRadius: 4, transition: 'width .5s' }} />
              </div>
              <div style={{ fontSize: 12, color: rem > 0 ? t.green : t.red, fontWeight: 600 }}>
                {rem > 0 ? `${fmt(rem)} remaining` : `${fmt(-rem)} over budget`}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ==================== SAVINGS ====================
function Savings({ t, goals, totals }) {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        <MiniStat t={t} label="Total Savings" value={fmt(totals.savings)} sub="This month" color={t.green} icon={PiggyBank} />
        <MiniStat t={t} label="Savings Rate" value={totals.savingsRate.toFixed(1) + '%'} sub="Of income" color={t.blue} icon={Percent} />
        <MiniStat t={t} label="Active Goals" value={goals.length} sub="In progress" color={t.purple} icon={Target} />
        <MiniStat t={t} label="Total Saved" value={fmt(goals.reduce((s, g) => s + g.saved, 0))} sub="Across goals" color={t.gold} icon={Sparkles} />
      </div>

      <Card t={t} style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Monthly Savings Trend</div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="savGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={t.blue} stopOpacity={0.4} />
                <stop offset="100%" stopColor={t.blue} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} vertical={false} />
            <XAxis dataKey="month" stroke={t.text3} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke={t.text3} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => '₹' + (v/1000) + 'k'} />
            <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: 12 }} formatter={(v) => fmt(v)} />
            <Area type="monotone" dataKey="savings" stroke={t.blue} strokeWidth={2.5} fill="url(#savGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Savings Goals</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {goals.map(g => {
          const p = (g.saved / g.target) * 100;
          const r = 52, c = 2 * Math.PI * r;
          return (
            <Card key={g.id} t={t}>
              <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
                  <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="60" cy="60" r={r} fill="none" stroke={t.card2} strokeWidth="10" />
                    <circle cx="60" cy="60" r={r} fill="none" stroke={g.color} strokeWidth="10" strokeDasharray={c} strokeDashoffset={c - (c * p / 100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset .8s' }} />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 24 }}>{g.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 800 }}>{p.toFixed(0)}%</div>
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{g.name}</div>
                  <div style={{ fontSize: 12.5, color: t.text2, marginBottom: 2 }}><b style={{ color: t.text }}>{fmt(g.saved)}</b> of {fmt(g.target)}</div>
                  <div style={{ fontSize: 11, color: t.text3 }}>Target: {new Date(g.deadline).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ==================== ACCOUNTS ====================
function Accounts({ t, accounts }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
      {accounts.map(a => (
        <Card key={a.id} t={t}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10.5, color: t.text3, fontWeight: 700, letterSpacing: '0.08em' }}>{a.type.toUpperCase()}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginTop: 3 }}>{a.nickname}</div>
            </div>
            <Wallet size={20} style={{ color: t.text3 }} />
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>{fmt(a.balance || (a.limit - a.used) || 0)}</div>
          <div style={{ fontSize: 12, color: t.text3 }}>{a.bank || a.app || 'Manual'} {a.last4 && `· •••• ${a.last4}`}</div>
          <div style={{ fontSize: 11, color: t.green, marginTop: 10, fontWeight: 600 }}>● Manual data</div>
        </Card>
      ))}
    </div>
  );
}

// ==================== UPI PAGE ====================
function UPIPage({ t, accounts, transactions }) {
  const upi = accounts.find(a => a.type === 'upi');
  const upiTxns = transactions.filter(x => x.method === 'UPI');
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        <MiniStat t={t} label="UPI Spending" value={fmt(upi.spent)} sub="This month" color={t.blue} icon={Smartphone} />
        <MiniStat t={t} label="UPI Received" value={fmt(upi.received)} sub="This month" color={t.green} icon={ArrowDownLeft} />
        <MiniStat t={t} label="Transactions" value={upi.txns} sub="This month" color={t.purple} icon={Receipt} />
        <MiniStat t={t} label="Top Merchant" value={upi.topMerchant} sub="Most frequent" color={t.gold} icon={Sparkles} />
      </div>

      <Card t={t} style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Supported UPI Apps</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['UPI', 'BHIM', 'Google Pay', 'PhonePe', 'Paytm'].map(app => (
            <div key={app} style={{ padding: '10px 16px', background: t.card2, borderRadius: 10, border: `1px solid ${t.border}`, fontSize: 13, fontWeight: 600 }}>{app}</div>
          ))}
        </div>
        <div style={{ marginTop: 14, padding: 12, background: t.goldBg, borderRadius: 10, fontSize: 12, color: t.text2, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <AlertTriangle size={14} style={{ color: t.gold, flexShrink: 0, marginTop: 1 }} />
          <span>MONEY3D does not access your bank/UPI account directly. All data shown is manually entered or imported unless a legitimate API integration is explicitly authorized.</span>
        </div>
      </Card>

      <Card t={t} padding={0}>
        <div style={{ padding: '18px 22px', fontSize: 15, fontWeight: 700, borderBottom: `1px solid ${t.border}` }}>UPI Transactions</div>
        {upiTxns.map((tx, i) => <TxRow key={tx.id} tx={tx} t={t} last={i === upiTxns.length - 1} />)}
        {upiTxns.length === 0 && <EmptyState t={t} title="No UPI transactions" sub="Start tracking your UPI spending" />}
      </Card>
    </div>
  );
}

// ==================== CARDS PAGE ====================
function CardsPage({ t, accounts, transactions }) {
  const cc = accounts.find(a => a.type === 'credit');
  const util = (cc.used / cc.limit) * 100;
  const ccTxns = transactions.filter(x => x.method === 'Credit Card');

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.3fr)', gap: 18, marginBottom: 20 }} className="chart-grid">
        <CreditCard3D t={t} cc={cc} />

        <Card t={t}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Card Details</div>
          {[
            ['Card', cc.nickname],
            ['Issuer', cc.bank],
            ['Number', `•••• •••• •••• ${cc.last4}`],
            ['Credit Limit', fmt(cc.limit)],
            ['Available', fmt(cc.limit - cc.used)],
            ['Current Bill', fmt(cc.currentBill)],
            ['Minimum Due', fmt(cc.minDue)],
            ['Due Date', new Date(cc.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })],
            ['Rewards', cc.rewards + ' pts'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${t.border}`, fontSize: 13 }}>
              <span style={{ color: t.text2 }}>{k}</span>
              <span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </Card>
      </div>

      <Card t={t} padding={0}>
        <div style={{ padding: '18px 22px', fontSize: 15, fontWeight: 700, borderBottom: `1px solid ${t.border}` }}>Card Transactions</div>
        {ccTxns.map((tx, i) => <TxRow key={tx.id} tx={tx} t={t} last={i === ccTxns.length - 1} />)}
      </Card>
    </div>
  );
}

// ==================== CASH PAGE ====================
function CashPage({ t, accounts }) {
  const cash = accounts.find(a => a.type === 'cash');
  const current = cash.starting + cash.withdrawals + cash.deposits - cash.expenses;
  const rows = [
    { label: 'Starting Cash', value: cash.starting, type: '+' },
    { label: 'ATM Withdrawals', value: cash.withdrawals, type: '+' },
    { label: 'Cash Deposits', value: cash.deposits, type: '+' },
    { label: 'Cash Expenses', value: cash.expenses, type: '-' },
  ];
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        <MiniStat t={t} label="Current Cash" value={fmt(current)} sub="In hand" color={t.gold} icon={Banknote} />
        <MiniStat t={t} label="ATM Withdrawn" value={fmt(cash.withdrawals)} sub="This month" color={t.blue} icon={Landmark} />
        <MiniStat t={t} label="Cash Spent" value={fmt(cash.expenses)} sub="This month" color={t.red} icon={TrendingDown} />
        <MiniStat t={t} label="Deposits" value={fmt(cash.deposits)} sub="This month" color={t.green} icon={ArrowDownLeft} />
      </div>

      <Card t={t}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Cash Flow Breakdown</div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < rows.length - 1 ? `1px solid ${t.border}` : 'none', fontSize: 13.5 }}>
            <span style={{ color: t.text2 }}>{r.label}</span>
            <span style={{ fontWeight: 700, color: r.type === '+' ? t.green : t.red }}>{r.type}{fmt(r.value)}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0', marginTop: 8, borderTop: `2px solid ${t.border}`, fontSize: 15 }}>
          <span style={{ fontWeight: 700 }}>Current Cash</span>
          <span style={{ fontWeight: 800, color: t.gold }}>{fmt(current)}</span>
        </div>
      </Card>
    </div>
  );
}

// ==================== BILLS ====================
function Bills({ t, bills }) {
  const upcoming = bills.filter(b => b.status === 'upcoming');
  const paid = bills.filter(b => b.status === 'paid');
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        <MiniStat t={t} label="Upcoming Bills" value={upcoming.length} sub={fmt(upcoming.reduce((s, b) => s + b.amount, 0))} color={t.gold} icon={Clock} />
        <MiniStat t={t} label="Paid This Month" value={paid.length} sub={fmt(paid.reduce((s, b) => s + b.amount, 0))} color={t.green} icon={CheckCircle2} />
        <MiniStat t={t} label="Monthly Recurring" value={fmt(bills.reduce((s, b) => s + b.amount, 0))} sub="Total commitments" color={t.blue} icon={Repeat} />
      </div>

      <Card t={t} padding={0} style={{ marginBottom: 20 }}>
        <div style={{ padding: '18px 22px', fontSize: 15, fontWeight: 700, borderBottom: `1px solid ${t.border}` }}>Upcoming Bills & Subscriptions</div>
        {upcoming.map((b, i) => <BillRow key={b.id} bill={b} t={t} last={i === upcoming.length - 1} />)}
      </Card>

      <Card t={t} padding={0}>
        <div style={{ padding: '18px 22px', fontSize: 15, fontWeight: 700, borderBottom: `1px solid ${t.border}` }}>Paid</div>
        {paid.map((b, i) => <BillRow key={b.id} bill={b} t={t} last={i === paid.length - 1} />)}
      </Card>

      <div style={{ marginTop: 16, padding: 14, background: t.blueBg, borderRadius: 12, fontSize: 12, color: t.text2, display: 'flex', gap: 8 }}>
        <AlertTriangle size={14} style={{ color: t.blue, flexShrink: 0, marginTop: 1 }} />
        <span>Bills are tracked for reminders only. MONEY3D does not auto-pay bills unless a real payment integration is connected.</span>
      </div>
    </div>
  );
}

function BillRow({ bill, t, last }) {
  const days = Math.ceil((new Date(bill.due) - new Date()) / (1000 * 60 * 60 * 24));
  const isUpcoming = bill.status === 'upcoming';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 22px', borderBottom: last ? 'none' : `1px solid ${t.border}` }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: isUpcoming ? t.goldBg : t.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isUpcoming ? <Clock size={18} style={{ color: t.gold }} /> : <CheckCircle2 size={18} style={{ color: t.green }} />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>{bill.name}</div>
        <div style={{ fontSize: 11.5, color: t.text3 }}>{bill.freq} · {bill.method}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>{fmt(bill.amount)}</div>
        <div style={{ fontSize: 11, color: isUpcoming && days <= 5 ? t.red : t.text3, fontWeight: 600 }}>
          {isUpcoming ? (days > 0 ? `Due in ${days}d` : 'Due today') : 'Paid'}
        </div>
      </div>
    </div>
  );
}

// ==================== ANALYTICS ====================
function Analytics({ t, transactions }) {
  const dailySpend = Array.from({ length: 30 }, (_, i) => {
    const d = i + 1;
    const dayData = transactions.filter(x => x.type === 'expense' && new Date(x.date).getDate() === d);
    return { day: d, spend: dayData.reduce((s, x) => s + x.amount, 0) };
  });

  const merchants = {};
  transactions.filter(x => x.type === 'expense').forEach(x => { merchants[x.merchant] = (merchants[x.merchant] || 0) + x.amount; });
  const topMerchants = Object.entries(merchants).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 20 }}>
        <Card t={t}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Payment Method Distribution</div>
          <ResponsiveContainer width="100%" height={200}>
            <RPieChart>
              <Pie data={paymentSplit} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2}>
                {paymentSplit.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: 12 }} formatter={(v) => fmt(v)} />
            </RPieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {paymentSplit.map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
                <span style={{ flex: 1, color: t.text2 }}>{p.name}</span>
                <span style={{ fontWeight: 700 }}>{fmt(p.value)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card t={t} style={{ gridColumn: 'span 2' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Daily Spending (This Month)</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dailySpend}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} vertical={false} />
              <XAxis dataKey="day" stroke={t.text3} fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke={t.text3} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => '₹' + v} />
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: 12 }} formatter={(v) => fmt(v)} />
              <Bar dataKey="spend" fill={t.red} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 18 }} className="chart-grid">
        <Card t={t}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Income vs Expense Trend</div>
          <ResponsiveContainer width="100%" height={250}>
            <RLineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} vertical={false} />
              <XAxis dataKey="month" stroke={t.text3} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={t.text3} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => '₹' + (v/1000) + 'k'} />
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: 12 }} formatter={(v) => fmt(v)} />
              <Line type="monotone" dataKey="income" stroke={t.green} strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="expense" stroke={t.red} strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="savings" stroke={t.blue} strokeWidth={2.5} dot={{ r: 4 }} />
            </RLineChart>
          </ResponsiveContainer>
        </Card>

        <Card t={t}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Top Merchants</div>
          {topMerchants.map(([name, amt], i) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < topMerchants.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: t.card2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: t.text2 }}>#{i + 1}</div>
              <div style={{ flex: 1, fontSize: 13.5, fontWeight: 600 }}>{name}</div>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>{fmt(amt)}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ==================== CALENDAR ====================
function CalendarPage({ t, transactions }) {
  const [selected, setSelected] = useState(12);
  const daysInMonth = 30;
  const byDay = {};
  transactions.forEach(tx => {
    const d = new Date(tx.date).getDate();
    if (!byDay[d]) byDay[d] = { income: 0, expense: 0 };
    if (tx.type === 'income') byDay[d].income += tx.amount;
    if (tx.type === 'expense') byDay[d].expense += tx.amount;
  });
  const selectedTxns = transactions.filter(tx => new Date(tx.date).getDate() === selected);

  return (
    <div>
      <Card t={t} style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>September 2025</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: 8, borderRadius: 8, background: t.card2, border: `1px solid ${t.border}` }}><ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /></button>
            <button style={{ padding: 8, borderRadius: 8, background: t.card2, border: `1px solid ${t.border}` }}><ChevronRight size={14} /></button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: t.text3, padding: '8px 0' }}>{d}</div>
          ))}
          {Array.from({ length: 30 }, (_, i) => i + 1).map(d => {
            const info = byDay[d] || { income: 0, expense: 0 };
            const net = info.income - info.expense;
            const isSelected = selected === d;
            return (
              <button key={d} onClick={() => setSelected(d)} style={{
                aspectRatio: '1', borderRadius: 10, padding: 6,
                background: isSelected ? t.greenBg : t.card2,
                border: `1px solid ${isSelected ? t.green : t.border}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 600, transition: 'all .15s',
              }}>
                <div>{d}</div>
                {net !== 0 && <div style={{ fontSize: 9, color: net > 0 ? t.green : t.red, fontWeight: 700, marginTop: 2 }}>{net > 0 ? '+' : ''}{(net/1000).toFixed(1)}k</div>}
              </button>
            );
          })}
        </div>
      </Card>

      <Card t={t} padding={0}>
        <div style={{ padding: '18px 22px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>September {selected}</div>
          <div style={{ fontSize: 12, color: t.text3, marginTop: 4 }}>
            Income <b style={{ color: t.green }}>+{fmt(byDay[selected]?.income || 0)}</b> · Expense <b style={{ color: t.red }}>-{fmt(byDay[selected]?.expense || 0)}</b> · Net <b>{fmt((byDay[selected]?.income || 0) - (byDay[selected]?.expense || 0))}</b>
          </div>
        </div>
        {selectedTxns.map((tx, i) => <TxRow key={tx.id} tx={tx} t={t} last={i === selectedTxns.length - 1} />)}
        {selectedTxns.length === 0 && <EmptyState t={t} title="No transactions" sub="Nothing recorded on this day" />}
      </Card>
    </div>
  );
}

// ==================== INSIGHTS ====================
function Insights({ t }) {
  return (
    <div>
      <Card t={t} style={{ marginBottom: 20, background: t.gradGreen, color: '#fff', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Sparkles size={20} />
          <div style={{ fontSize: 16, fontWeight: 700 }}>AI Money Insights</div>
        </div>
        <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.6 }}>Smart observations about your spending patterns. These are informational and not financial advice.</div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {insights.map((ins, i) => {
          const Icon = ins.icon;
          const c = { red: t.red, green: t.green, blue: t.blue, gold: t.gold, purple: t.purple }[ins.color];
          const bg = { red: t.redBg, green: t.greenBg, blue: t.blueBg, gold: t.goldBg, purple: t.purpleBg }[ins.color];
          return (
            <Card key={i} t={t}>
              <div style={{ display: 'flex', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} style={{ color: c }} />
                </div>
                <div>
                  <span style={{ fontSize: 10.5, padding: '3px 8px', borderRadius: 6, background: bg, color: c, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{ins.tag}</span>
                  <div style={{ fontSize: 13.5, color: t.text2, marginTop: 8, lineHeight: 1.6 }}>{ins.text}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ==================== REPORTS ====================
function Reports({ t, totals }) {
  return (
    <div>
      <Card t={t} style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>Monthly Financial Report</div>
            <div style={{ fontSize: 13, color: t.text3, marginTop: 4 }}>September 2025 · Auto-generated</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: '10px 16px', borderRadius: 10, background: t.card2, border: `1px solid ${t.border}`, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Download size={14} /> CSV</button>
            <button style={{ padding: '10px 16px', borderRadius: 10, background: t.card2, border: `1px solid ${t.border}`, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Download size={14} /> Excel</button>
            <button style={{ padding: '10px 16px', borderRadius: 10, background: t.text, color: t.bg, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><FileText size={14} /> PDF Report</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 20 }}>
          {[
            { l: 'Total Income', v: fmt(totals.income), c: t.green },
            { l: 'Total Expenses', v: fmt(totals.expense), c: t.red },
            { l: 'Total Savings', v: fmt(totals.savings), c: t.blue },
            { l: 'Savings Rate', v: totals.savingsRate.toFixed(1) + '%', c: t.purple },
          ].map((s, i) => (
            <div key={i} style={{ padding: 16, background: t.card2, borderRadius: 12, border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 11.5, color: t.text3, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.l}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.c, letterSpacing: '-0.02em', marginTop: 6 }}>{s.v}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Category Breakdown</div>
        {categorySpend.map(c => (
          <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${t.border}`, fontSize: 13 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: c.color }} />
            <span style={{ flex: 1, fontWeight: 600 }}>{c.name}</span>
            <span style={{ fontWeight: 700 }}>{fmt(c.value)}</span>
            <span style={{ color: t.text3, width: 60, textAlign: 'right' }}>{((c.value / categorySpend.reduce((s, x) => s + x.value, 0)) * 100).toFixed(1)}%</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ==================== SECURITY ====================
function Security({ t }) {
  return (
    <div>
      <Card t={t} style={{ marginBottom: 20, background: t.greenBg, border: `1px solid ${t.green}30` }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Shield size={22} style={{ color: t.green, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Your data is protected</div>
            <div style={{ fontSize: 13, color: t.text2, lineHeight: 1.6 }}>MONEY3D never stores complete account numbers, CVV, PIN, UPI PIN, OTP, or passwords. All sensitive information is masked.</div>
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 20 }}>
        {[
          { icon: Lock, title: 'Masked Data Only', desc: 'We only ever display •••• followed by the last 4 digits. Full numbers are never shown or stored.' },
          { icon: Eye, title: 'No Sensitive Fields', desc: 'CVV, PIN, UPI PIN, OTP, and passwords are never collected or displayed anywhere in the app.' },
          { icon: Building2, title: 'Connected vs Manual', desc: 'The app clearly distinguishes between manually entered data and data from legitimate connected account APIs.' },
          { icon: Shield, title: 'No Fake Sync', desc: 'MONEY3D does not claim to sync with your bank or UPI unless a proper authorized integration exists.' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <Card key={i} t={t}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: t.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <Icon size={20} style={{ color: t.green }} />
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12.5, color: t.text2, lineHeight: 1.6 }}>{item.desc}</div>
            </Card>
          );
        })}
      </div>

      <Card t={t}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Data Source Transparency</div>
        {[
          ['Bank Account', 'Manual entry + CSV import', 'manual'],
          ['UPI Wallet', 'Manual entry', 'manual'],
          ['Debit Card', 'Manual entry + CSV import', 'manual'],
          ['Credit Card', 'Manual entry + CSV import', 'manual'],
          ['Cash Wallet', 'Manual entry', 'manual'],
        ].map(([name, source, type], i, arr) => (
          <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', fontSize: 13 }}>
            <div>
              <div style={{ fontWeight: 600 }}>{name}</div>
              <div style={{ fontSize: 11.5, color: t.text3, marginTop: 2 }}>{source}</div>
            </div>
            <span style={{ fontSize: 10.5, padding: '4px 10px', borderRadius: 6, background: t.goldBg, color: t.gold, fontWeight: 700, letterSpacing: '0.05em' }}>MANUAL</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ==================== SETTINGS ====================
function Settings({ t, dark, setDark }) {
  const sections = [
    { title: 'Profile', items: ['Name: Arjun Kumar', 'Email: arjun@example.com', 'Currency: ₹ INR'] },
    { title: 'Preferences', items: ['Theme', 'Language', 'Default Dashboard', 'Notifications'] },
    { title: 'Data', items: ['Export CSV', 'Export Excel', 'Backup', 'Import'] },
    { title: 'Danger Zone', items: ['Delete account', 'Clear all data'] },
  ];
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {sections.map((s) => (
          <Card key={s.title} t={t}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{s.title}</div>
            {s.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < s.items.length - 1 ? `1px solid ${t.border}` : 'none', fontSize: 13.5 }}>
                <span style={{ color: t.text2 }}>{item}</span>
                <ChevronRight size={16} style={{ color: t.text3 }} />
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ==================== ADD MODAL ====================
function AddTransactionModal({ t, onClose, onSave, accounts }) {
  const [kind, setKind] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [merchant, setMerchant] = useState('');
  const [method, setMethod] = useState('UPI');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState('');

  const expenseCats = ['Food', 'Grocery', 'Shopping', 'Transport', 'Fuel', 'Bills', 'Electricity', 'Internet', 'Mobile Recharge', 'Rent', 'Education', 'Health', 'Entertainment', 'Travel', 'Subscriptions', 'EMI', 'Insurance', 'Personal', 'Family', 'Other'];
  const incomeCats = ['Salary', 'Freelance', 'Business', 'Interest', 'Refund', 'Gift', 'Other'];
  const methods = ['UPI', 'Debit Card', 'Credit Card', 'Cash', 'Bank Transfer', 'Net Banking', 'Other'];

  const cats = kind === 'income' ? incomeCats : expenseCats;

  const handleSave = () => {
    if (!amount || !merchant) return;
    onSave({
      amount: parseFloat(amount),
      type: kind,
      category,
      merchant,
      method,
      account: accounts.find(a => a.type === (method === 'Credit Card' ? 'credit' : method === 'Cash' ? 'cash' : method === 'UPI' ? 'upi' : 'bank'))?.id || 'hdfc',
      date,
      time: new Date().toTimeString().slice(0, 5),
      note,
    });
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 0,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="scale-in" style={{
        background: t.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
        width: '100%', maxWidth: 560, maxHeight: '92vh', overflowY: 'auto',
        padding: 24, boxShadow: '0 -20px 60px rgba(0,0,0,0.5)',
        border: `1px solid ${t.border}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>Add Transaction</div>
          <button onClick={onClose} style={{ padding: 8, borderRadius: 8, background: t.card2 }}><X size={18} /></button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[
            { id: 'expense', label: 'MONEY OUT', icon: ArrowUpRight, color: t.red },
            { id: 'income', label: 'MONEY IN', icon: ArrowDownLeft, color: t.green },
          ].map(k => {
            const Icon = k.icon;
            const active = kind === k.id;
            return (
              <button key={k.id} onClick={() => { setKind(k.id); setCategory(k.id === 'income' ? 'Salary' : 'Food'); }} style={{
                flex: 1, padding: 14, borderRadius: 12,
                background: active ? k.color + '20' : t.card2,
                border: `1px solid ${active ? k.color : t.border}`,
                color: active ? k.color : t.text2,
                fontWeight: 700, fontSize: 13, letterSpacing: '0.05em',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <Icon size={16} /> {k.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11.5, color: t.text3, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Amount</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, background: t.card2, border: `1px solid ${t.border}`, borderRadius: 12, padding: '14px 16px' }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: t.text3 }}>₹</span>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: t.text, fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em',
            }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 11.5, color: t.text3, fontWeight: 600 }}>CATEGORY</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', marginTop: 6, padding: '12px 14px', borderRadius: 10, background: t.card2, border: `1px solid ${t.border}`, color: t.text, fontSize: 13.5, fontWeight: 600, outline: 'none' }}>
              {cats.map(c => <option key={c} value={c} style={{ background: t.card }}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11.5, color: t.text3, fontWeight: 600 }}>METHOD</label>
            <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%', marginTop: 6, padding: '12px 14px', borderRadius: 10, background: t.card2, border: `1px solid ${t.border}`, color: t.text, fontSize: 13.5, fontWeight: 600, outline: 'none' }}>
              {methods.map(m => <option key={m} value={m} style={{ background: t.card }}>{m}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11.5, color: t.text3, fontWeight: 600 }}>MERCHANT / SOURCE</label>
          <input value={merchant} onChange={e => setMerchant(e.target.value)} placeholder="e.g. Swiggy, Salary from TechCorp" style={{ width: '100%', marginTop: 6, padding: '12px 14px', borderRadius: 10, background: t.card2, border: `1px solid ${t.border}`, color: t.text, fontSize: 13.5, outline: 'none' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 11.5, color: t.text3, fontWeight: 600 }}>DATE</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', marginTop: 6, padding: '12px 14px', borderRadius: 10, background: t.card2, border: `1px solid ${t.border}`, color: t.text, fontSize: 13.5, outline: 'none' }} />
          </div>
          <div>
            <label style={{ fontSize: 11.5, color: t.text3, fontWeight: 600 }}>NOTE</label>
            <input value={note} onChange={e => setNote(e.target.value)} placeholder="Optional" style={{ width: '100%', marginTop: 6, padding: '12px 14px', borderRadius: 10, background: t.card2, border: `1px solid ${t.border}`, color: t.text, fontSize: 13.5, outline: 'none' }} />
          </div>
        </div>

        <button onClick={handleSave} disabled={!amount || !merchant} style={{
          width: '100%', padding: 16, borderRadius: 12,
          background: !amount || !merchant ? t.card2 : t.gradGreen,
          color: !amount || !merchant ? t.text3 : '#fff',
          fontSize: 15, fontWeight: 700, marginTop: 8,
          boxShadow: !amount || !merchant ? 'none' : '0 8px 24px rgba(34,197,94,0.35)',
          transition: 'all .2s',
        }}>Save Transaction</button>
      </div>
    </div>
  );
}