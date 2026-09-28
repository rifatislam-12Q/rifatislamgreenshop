import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ClipboardCheck, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  Loader2, 
  Bell, 
  Radio, 
  Play, 
  Pause, 
  RotateCw, 
  Sparkles,
  ChevronRight,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PendingOrder {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'confirmed';
}

interface RecentOrder {
  id: string;
  customer: string;
  amount: number;
  status: 'Shipped' | 'Processing' | 'Delivered';
  timeAgo?: string;
}

interface DeliveryScheduled {
  id: string;
  driver: string;
  schedule: string;
  area: string;
}

interface CompletedDelivery {
  id: string;
  driver: string;
  status: 'Completed';
  verifiedAt: string;
}

interface PaymentOrder {
  id: string;
  customer: string;
  method: string;
  statusText: string;
  amount: number;
  confirmed?: boolean;
}

export const DashboardView: React.FC = () => {
  // Real-time live status
  const [isLiveRunning, setIsLiveRunning] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [liveEventNotice, setLiveEventNotice] = useState<string | null>(null);

  // Interactive & Realtime State
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([
    { id: '#1045', customer: 'Anita B.', amount: 120, status: 'pending' },
    { id: '#1046', customer: 'Karim S.', amount: 85, status: 'pending' },
    { id: '#1047', customer: 'Farida K.', amount: 210, status: 'confirmed' },
    { id: '#1048', customer: 'Rashed A.', amount: 95, status: 'confirmed' },
    { id: '#1049', customer: 'Tisha M.', amount: 150, status: 'confirmed' },
  ]);

  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([
    { id: '#1040', customer: 'John Doe', amount: 50, status: 'Shipped', timeAgo: '2m ago' },
    { id: '#1041', customer: 'Jane Smith', amount: 75, status: 'Processing', timeAgo: '12m ago' },
    { id: '#1042', customer: 'Bob Jones', amount: 110, status: 'Delivered', timeAgo: '35m ago' },
    { id: '#1043', customer: 'Sara Lee', amount: 60, status: 'Processing', timeAgo: '1h ago' },
    { id: '#1044', customer: 'Mike T.', amount: 130, status: 'Shipped', timeAgo: '2h ago' },
  ]);

  const [scheduledDeliveries] = useState<DeliveryScheduled[]>([
    { id: '#D556', driver: 'Rashid', schedule: 'Tomorrow, 10am', area: 'Gulshan-2' },
    { id: '#D557', driver: 'Fatima', schedule: 'Tomorrow, 2pm', area: 'Dhanmondi' },
    { id: '#D558', driver: 'Jamila', schedule: 'Day After, 11am', area: 'Uttara' },
    { id: '#D559', driver: 'Kabir', schedule: 'Day After, 4pm', area: 'Sylhet Sadar' },
  ]);

  const [completedDeliveries, setCompletedDeliveries] = useState<CompletedDelivery[]>([
    { id: '#D552', driver: 'Karim', status: 'Completed', verifiedAt: '10:14 AM' },
    { id: '#D553', driver: 'Nipa', status: 'Completed', verifiedAt: '11:20 AM' },
    { id: '#D554', driver: 'Sajjad', status: 'Completed', verifiedAt: '12:45 PM' },
    { id: '#D555', driver: 'Faruq', status: 'Completed', verifiedAt: '01:10 PM' },
  ]);

  const [awaitingPayments, setAwaitingPayments] = useState<PaymentOrder[]>([
    { id: '#1046', customer: 'Karim S.', method: 'Bank Transfer', statusText: 'Awaiting Bank Transfer', amount: 85 },
    { id: '#1049', customer: 'Tisha M.', method: 'Card Auth', statusText: 'Awaiting Card Auth.', amount: 150 },
    { id: '#1050', customer: 'Jamil P.', method: 'Partially Paid', statusText: 'Partially Paid', amount: 320 },
    { id: '#1051', customer: 'Nasrin H.', method: 'Pending PayPal', statusText: 'Pending PayPal', amount: 65 },
    { id: '#1052', customer: 'Asif R.', method: 'Awaiting COD', statusText: 'Awaiting COD', amount: 110 },
  ]);

  // Real-time fluctuating chart points
  const [chartData, setChartData] = useState<number[]>([15, 42, 28, 55, 48, 85, 72, 98]);
  const [salesGrowth, setSalesGrowth] = useState<number>(17.4);
  const [totalSalesToday, setTotalSalesToday] = useState<number>(1840);

  // Clock tick & Live real-time generator
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Real-time event simulator loop
  useEffect(() => {
    if (!isLiveRunning) return;

    const interval = setInterval(() => {
      // Fluctuate chart slightly
      setChartData((prev) => {
        const next = [...prev];
        const lastIdx = next.length - 1;
        const delta = (Math.random() - 0.45) * 4;
        next[lastIdx] = Math.max(80, Math.min(100, Math.round(next[lastIdx] + delta)));
        return next;
      });

      // Random live ticker event every ~8 seconds
      const rand = Math.random();
      if (rand > 0.6) {
        const randomAmount = Math.floor(Math.random() * 80) + 30;
        const newTotal = totalSalesToday + randomAmount;
        setTotalSalesToday(newTotal);
        setSalesGrowth((prev) => Number((prev + (Math.random() * 0.4 - 0.15)).toFixed(1)));
        
        const names = ['Sultana R.', 'Tanvir H.', 'Mehedi K.', 'Nazmul I.', 'Nusrat J.'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const newOrderId = `#10${Math.floor(Math.random() * 30) + 53}`;
        
        setLiveEventNotice(`⚡ New order ${newOrderId} from ${randomName} ($${randomAmount}) received!`);
        setTimeout(() => setLiveEventNotice(null), 3500);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isLiveRunning, totalSalesToday]);

  // Toggle order confirmation
  const handleTogglePending = (id: string) => {
    setPendingOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          const newStatus = order.status === 'pending' ? 'confirmed' : 'pending';
          if (newStatus === 'confirmed') {
            setLiveEventNotice(`✓ Order ${order.id} for ${order.customer} has been confirmed!`);
            setTimeout(() => setLiveEventNotice(null), 3000);
          }
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
  };

  // Confirm payment
  const handleVerifyPayment = (id: string) => {
    setAwaitingPayments((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, statusText: 'Verified & Cleared ✓', confirmed: true };
        }
        return item;
      })
    );
    setLiveEventNotice(`💳 Payment for ${id} verified and settled.`);
    setTimeout(() => setLiveEventNotice(null), 3000);
  };

  // Build SVG path for smooth bezier curve chart
  const svgWidth = 500;
  const svgHeight = 220;
  const points = chartData.map((val, idx) => {
    const x = (idx / (chartData.length - 1)) * (svgWidth - 40) + 20;
    const y = svgHeight - (val / 100) * (svgHeight - 60) - 20;
    return { x, y, val };
  });

  // Calculate smooth SVG curve command
  const pathD = points.reduce((acc, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x},${pt.y}`;
    const prev = arr[idx - 1];
    const cp1x = prev.x + (pt.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (pt.x - prev.x) / 2;
    const cp2y = pt.y;
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${svgHeight - 15} L ${points[0].x},${svgHeight - 15} Z`;

  return (
    <div className="min-h-full w-full bg-[#edf7f1] p-4 sm:p-6 lg:p-8 font-sans text-neutral-800 transition-colors">
      
      {/* Top section: Live Notification Banner if active */}
      <div className="max-w-7xl mx-auto mb-4">
        {/* Live Notification Banner */}
        <AnimatePresence>
          {liveEventNotice && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              className="mb-3 mx-auto max-w-lg py-1.5 px-4 rounded-full bg-emerald-700 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 text-center"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>{liveEventNotice}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main 6-Cards Grid Layout (Matching exact 3x2 screenshot layout) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* ========================================================================= */}
        {/* CARD 1: Analytics Report */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="bg-white rounded-2xl shadow-sm border border-emerald-950/10 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          {/* Dark Green Header */}
          <div className="bg-[#1b4c3e] px-4 py-3.5 flex items-center justify-between text-white">
            <h2 className="text-sm sm:text-base font-bold tracking-wide">Analytics Report</h2>
            <div className="w-7 h-7 rounded-lg bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-300" />
            </div>
          </div>

          {/* Card Body with Animated SVG Curve and Badges */}
          <div className="p-4 flex-1 flex flex-col justify-between bg-white relative">
            
            {/* Live Chart Header Values */}
            <div className="flex items-center justify-between mb-1 px-1">
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Today's Revenue</span>
                <div className="text-xl font-black text-[#143d30]">
                  ${totalSalesToday.toLocaleString()}
                  <span className="ml-1.5 text-xs font-bold text-emerald-600">+{salesGrowth}%</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Feed</span>
              </div>
            </div>

            {/* SVG Wave Chart */}
            <div className="relative w-full h-48 mt-2">
              <svg 
                viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="20" y1="30" x2={svgWidth - 20} y2="30" stroke="#f1f5f3" strokeDasharray="3 3" />
                <line x1="20" y1="85" x2={svgWidth - 20} y2="85" stroke="#f1f5f3" strokeDasharray="3 3" />
                <line x1="20" y1="145" x2={svgWidth - 20} y2="145" stroke="#f1f5f3" strokeDasharray="3 3" />
                <line x1="20" y1={svgHeight - 15} x2={svgWidth - 20} y2={svgHeight - 15} stroke="#e2ece5" />

                {/* Area Fill */}
                <path d={areaD} fill="url(#chartGradient)" />

                {/* Line Curve */}
                <motion.path 
                  d={pathD} 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ d: pathD }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />

                {/* Interactive Points on Curve */}
                {points.map((pt, idx) => (
                  <g key={idx}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="4.5"
                      fill="#ffffff"
                      stroke="#059669"
                      strokeWidth="2.5"
                      className="cursor-pointer transition-transform hover:scale-150"
                    />
                  </g>
                ))}
              </svg>

              {/* Tag Badges matching screenshot: "Sales: +12%" and "Sales: +17%" */}
              <div 
                className="absolute left-[12%] top-[54%] -translate-y-1/2 bg-white/95 backdrop-blur border border-emerald-200 px-2 py-0.5 rounded-md text-[10px] font-bold text-neutral-600 shadow-sm flex items-center gap-1 pointer-events-none"
              >
                <span>Sales:</span>
                <span className="text-emerald-600">+12%</span>
              </div>

              <div 
                className="absolute right-[16%] top-[24%] -translate-y-1/2 bg-white/95 backdrop-blur border border-emerald-300 px-2 py-0.5 rounded-md text-[10px] font-bold text-neutral-700 shadow-sm flex items-center gap-1 pointer-events-none"
              >
                <span>Sales:</span>
                <span className="text-emerald-700 font-extrabold">+17%</span>
              </div>

              {/* Pulsing Dot at final node */}
              <div 
                className="absolute right-[4%] top-[12%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
              >
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-white"></span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
              <span>08:00 AM</span>
              <span>12:00 PM</span>
              <span>04:00 PM</span>
              <span className="text-emerald-700 font-semibold">Current (Live)</span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 2: Orders Pending Confirmation */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-emerald-950/10 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <div className="bg-[#1b4c3e] px-4 py-3.5 flex items-center justify-between text-white">
            <h2 className="text-sm sm:text-base font-bold tracking-wide">Orders Pending Confirmation</h2>
            <div className="w-7 h-7 rounded-lg bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center">
              <ClipboardCheck className="w-4 h-4 text-emerald-300" />
            </div>
          </div>

          {/* List items */}
          <div className="p-4 flex-1 flex flex-col justify-between bg-white divide-y divide-neutral-100">
            {pendingOrders.map((order, idx) => {
              const isConfirmed = order.status === 'confirmed';
              return (
                <div 
                  key={order.id}
                  onClick={() => handleTogglePending(order.id)}
                  className="py-2.5 flex items-center justify-between text-xs sm:text-sm cursor-pointer hover:bg-emerald-50/50 px-2 rounded-lg transition-colors group"
                >
                  <span className="font-medium text-neutral-800">
                    <span className="text-neutral-500 font-semibold">{idx + 1}. </span>
                    Order {order.id} - {order.customer} - <span className="font-bold">${order.amount}</span>
                  </span>

                  {/* Pending Spinner or Green Tick Mark */}
                  <div className="flex items-center gap-1.5">
                    {!isConfirmed ? (
                      <div className="flex items-center text-neutral-400 group-hover:text-emerald-600 transition-colors" title="Click to confirm order">
                        <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-emerald-600 flex items-center" 
                        title="Confirmed"
                      >
                        <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Action Footer */}
          <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
            <span>Click any order to toggle confirmation</span>
            <button 
              onClick={() => {
                setPendingOrders((prev) => prev.map((o) => ({ ...o, status: 'confirmed' })));
                setLiveEventNotice('All pending orders confirmed!');
                setTimeout(() => setLiveEventNotice(null), 2500);
              }}
              className="text-emerald-700 font-semibold hover:underline"
            >
              Confirm All
            </button>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 3: Recent Orders */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="bg-white rounded-2xl shadow-sm border border-emerald-950/10 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <div className="bg-[#1b4c3e] px-4 py-3.5 flex items-center justify-between text-white">
            <h2 className="text-sm sm:text-base font-bold tracking-wide">Recent Orders</h2>
            <div className="w-7 h-7 rounded-lg bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center">
              <Package className="w-4 h-4 text-emerald-300" />
            </div>
          </div>

          {/* List items */}
          <div className="p-4 flex-1 flex flex-col justify-between bg-white divide-y divide-neutral-100">
            {recentOrders.map((order, idx) => {
              return (
                <div 
                  key={order.id}
                  className="py-2.5 flex items-center justify-between text-xs sm:text-sm hover:bg-neutral-50 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <span className="font-medium text-neutral-800 truncate">
                      <span className="text-neutral-500 font-semibold">{idx + 1}. </span>
                      Order {order.id} - {order.customer} - <span className="font-bold">${order.amount}</span>
                    </span>
                    <span className={`text-[11px] font-semibold ${
                      order.status === 'Shipped' ? 'text-sky-700' :
                      order.status === 'Processing' ? 'text-amber-700' :
                      'text-emerald-700'
                    }`}>
                      ({order.status})
                    </span>
                  </div>

                  {/* Icon for Shipped order (Delivery Truck as in screenshot) */}
                  {order.status === 'Shipped' && (
                    <motion.div 
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                      className="ml-2 text-sky-600 flex-shrink-0"
                      title="En Route"
                    >
                      <Truck className="w-4 h-4" />
                    </motion.div>
                  )}
                  {order.status === 'Processing' && (
                    <div className="ml-2 w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0"></div>
                  )}
                  {order.status === 'Delivered' && (
                    <div className="ml-2 text-emerald-600 flex-shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
            <span>5 recent consignments active</span>
            <span className="text-emerald-700 font-semibold">100% On Time</span>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 4: Scheduled for Delivery */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-emerald-950/10 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <div className="bg-[#1b4c3e] px-4 py-3.5 flex items-center justify-between text-white">
            <h2 className="text-sm sm:text-base font-bold tracking-wide">Scheduled for Delivery</h2>
            <div className="flex items-center gap-1 w-8 h-7 rounded-lg bg-emerald-900/40 border border-emerald-500/30 px-1 justify-center">
              <MapPin className="w-3.5 h-3.5 text-rose-300" />
              <Clock className="w-3 h-3 text-amber-300" />
            </div>
          </div>

          {/* List items */}
          <div className="p-4 flex-1 flex flex-col justify-between bg-white divide-y divide-neutral-100">
            {scheduledDeliveries.map((item, idx) => (
              <div 
                key={item.id}
                className="py-3 flex items-center justify-between text-xs sm:text-sm hover:bg-neutral-50 px-2 rounded-lg transition-colors group"
              >
                <div>
                  <span className="font-medium text-neutral-800">
                    <span className="text-neutral-500 font-semibold">{idx + 1}. </span>
                    Delivery {item.id} - <span className="font-bold">{item.driver}</span>
                  </span>
                  <span className="text-neutral-500 ml-1 font-normal">({item.schedule})</span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {item.area}
                </span>
              </div>
            ))}
          </div>

          <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
            <span>Route optimization active</span>
            <span className="text-emerald-700 font-semibold">4 Dispatches Planned</span>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 5: Confirm Delivery Completion */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          className="bg-white rounded-2xl shadow-sm border border-emerald-950/10 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <div className="bg-[#1b4c3e] px-4 py-3.5 flex items-center justify-between text-white">
            <h2 className="text-sm sm:text-base font-bold tracking-wide">Confirm Delivery Completion</h2>
            <div className="w-7 h-7 rounded-lg bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            </div>
          </div>

          {/* List items */}
          <div className="p-4 flex-1 flex flex-col justify-between bg-white divide-y divide-neutral-100">
            {completedDeliveries.map((item, idx) => (
              <div 
                key={item.id}
                className="py-3 flex items-center justify-between text-xs sm:text-sm hover:bg-emerald-50/40 px-2 rounded-lg transition-colors"
              >
                <div>
                  <span className="font-medium text-neutral-800">
                    <span className="text-neutral-500 font-semibold">{idx + 1}. </span>
                    Delivery {item.id} - <span className="font-bold">{item.driver}</span>
                  </span>
                  <span className="text-neutral-500 ml-1">({item.status})</span>
                </div>

                {/* Checked Icon matching screenshot */}
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-emerald-600 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
                </motion.div>
              </div>
            ))}
          </div>

          <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
            <span>Customer signatures verified</span>
            <span className="text-emerald-700 font-semibold">100% Success Rate</span>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 6: Awaiting Payment Confirmation */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-emerald-950/10 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <div className="bg-[#1b4c3e] px-4 py-3.5 flex items-center justify-between text-white">
            <h2 className="text-sm sm:text-base font-bold tracking-wide">Awaiting Payment Confirmation</h2>
            <div className="w-7 h-7 rounded-lg bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-amber-300" />
            </div>
          </div>

          {/* List items */}
          <div className="p-4 flex-1 flex flex-col justify-between bg-white divide-y divide-neutral-100">
            {awaitingPayments.map((item, idx) => (
              <div 
                key={item.id}
                onClick={() => !item.confirmed && handleVerifyPayment(item.id)}
                className="py-2.5 flex items-center justify-between text-xs sm:text-sm hover:bg-neutral-50 px-2 rounded-lg transition-colors cursor-pointer group"
                title={item.confirmed ? 'Payment settled' : 'Click to instantly verify payment'}
              >
                <div className="truncate flex-1 min-w-0 pr-2">
                  <span className="font-medium text-neutral-800">
                    <span className="text-neutral-500 font-semibold">{idx + 1}. </span>
                    Order {item.id} - <span className="font-semibold">{item.customer}</span>
                  </span>
                  <div className="text-[11px] text-neutral-500 group-hover:text-emerald-700 transition-colors">
                    (Status: {item.statusText})
                  </div>
                </div>

                {item.confirmed ? (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    CLEARED
                  </span>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVerifyPayment(item.id);
                    }}
                    className="text-[10px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded border border-amber-200 transition-colors"
                  >
                    Verify
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
            <span>Auto-matching bank & bKash receipts</span>
            <span className="text-amber-700 font-semibold">5 Pending Review</span>
          </div>
        </motion.div>

      </div>

      {/* Bottom Spacing */}
      <div className="h-8"></div>
    </div>
  );
};
