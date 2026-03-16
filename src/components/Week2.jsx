import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import {
  Plus,
  User,
  X,
  Target,
  Flame,
  TrendingUp,
  Moon,
  Sun,
  Award,
  Clock,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

const GrowthTracker = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [weeklyLogs, setWeeklyLogs] = useState([
    "04:13:21",
    "13:27:58",
    "02:23:42",
    "06:17:04",
    "00:00:00",
    "09:35:23",
    "02:13:42",
  ]);
  const weeklyGoalHours = 100;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hours, setHours] = useState("00");
  const [mins, setMins] = useState("00");
  const [secs, setSecs] = useState("00");

  const getSeconds = (timeStr) => {
    const [h, m, s] = timeStr.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  };

  const totalSeconds = useMemo(
    () => weeklyLogs.reduce((acc, t) => acc + getSeconds(t), 0),
    [weeklyLogs],
  );
  const goalPercent = useMemo(
    () =>
      Math.min(
        parseFloat(
          ((totalSeconds / (weeklyGoalHours * 3600)) * 100).toFixed(1),
        ),
        100,
      ),
    [totalSeconds],
  );
  const remainingHours = useMemo(
    () =>
      Math.max(0, (weeklyGoalHours * 3600 - totalSeconds) / 3600).toFixed(1),
    [totalSeconds],
  );

  const handleAddLog = (e) => {
    e.preventDefault();
    const newEntry = `${hours.padStart(2, "0")}:${mins.padStart(2, "0")}:${secs.padStart(2, "0")}`;
    const updated = [...weeklyLogs];
    updated[4] = newEntry;
    setWeeklyLogs(updated);
    setIsModalOpen(false);
  };

  const accentColor = darkMode ? "#818CF8" : "#6366F1";
  const surfaceBg = darkMode
    ? "bg-slate-900/60 border-slate-800/80"
    : "bg-white border-slate-200/60 shadow-sm";

  return (
    <div
      className={`min-h-screen w-full p-4 sm:p-6 font-sans transition-all duration-700 flex flex-col ${darkMode ? "bg-[#0B0F1A] text-slate-100" : "bg-[#F8FAFC] text-slate-900"}`}
    >
      {/* Header */}
      <header className="flex justify-between items-center mb-8 max-w-[1400px] mx-auto w-full">
        <h1 className="text-2xl font-black tracking-tight italic">STRIVE.</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-2xl border transition-all ${darkMode ? "bg-slate-900 border-slate-800 text-indigo-400" : "bg-white border-slate-200 text-slate-500 shadow-sm"}`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 rounded-2xl font-bold text-sm text-white flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
            style={{ backgroundColor: accentColor }}
          >
            <Plus size={18} /> Add Log
          </button>
          <div
            className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-all ${darkMode ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-400 shadow-sm"}`}
          >
            <User size={18} />
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow pb-10">
        {/* Left column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-4">
            <CompactStat
              label="Progress"
              val={`${goalPercent}%`}
              icon={<Target size={14} />}
              darkMode={darkMode}
            />
            <CompactStat
              label="Remaining"
              val={`${remainingHours}h`}
              icon={<TrendingUp size={14} />}
              darkMode={darkMode}
            />
            <CompactStat
              label="Daily"
              val="14.3h"
              icon={<Flame size={14} />}
              darkMode={darkMode}
            />
          </div>

          <div
            className={`rounded-[32px] p-8 border backdrop-blur-xl flex flex-col flex-grow min-h-[400px] ${surfaceBg}`}
          >
            <h3 className="text-sm font-black uppercase tracking-widest opacity-60 mb-8">
              Activity Flow
            </h3>
            <div className="flex-grow relative">
              <Line
                data={{
                  labels: ["M", "T", "W", "T", "F", "S", "S"],
                  datasets: [
                    {
                      data: weeklyLogs.map((t) =>
                        (getSeconds(t) / 3600).toFixed(1),
                      ),
                      borderColor: accentColor,
                      backgroundColor: `${accentColor}15`,
                      tension: 0.4,
                      fill: true,
                      pointRadius: 4,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: {
                      grid: { color: darkMode ? "#1E293B" : "#F1F5F9" },
                      ticks: { color: "#64748B" },
                    },
                    x: {
                      grid: { display: false },
                      ticks: { color: "#64748B" },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* TOTAL TIME CARD */}
          <div className={`rounded-[32px] p-6 border ${surfaceBg}`}>
            <div className="flex items-center gap-2 mb-4 opacity-40">
              <Clock size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Total Time
              </span>
            </div>
            <div className="text-center py-2">
              <div
                className="text-5xl font-black tracking-tighter"
                style={{ color: accentColor }}
              >
                {Math.floor(totalSeconds / 3600)}h{" "}
                {Math.floor((totalSeconds % 3600) / 60)}m
              </div>
              <div className="flex items-center justify-center gap-1.5 text-emerald-500 font-bold text-xs mt-2">
                <TrendingUp size={14} /> +12% vs last week
              </div>
            </div>
          </div>

          {/* GOAL PROGRESS CARD */}
          <div
            className={`rounded-[32px] p-8 border flex flex-col items-center justify-center ${surfaceBg}`}
          >
            <div className="relative py-4">
              <svg className="w-48 h-48 -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="82"
                  stroke={darkMode ? "#1E293B" : "#F1F5F9"}
                  strokeWidth="12"
                  fill="none"
                />
                <motion.circle
                  initial={{ strokeDashoffset: 515 }}
                  animate={{ strokeDashoffset: 515 * (1 - goalPercent / 100) }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  cx="96"
                  cy="96"
                  r="82"
                  stroke={accentColor}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={515}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black tracking-tighter">
                  {Math.round(goalPercent)}%
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                  Goal
                </span>
              </div>
            </div>
          </div>

          {/* PRODUCTIVITY SCORE CARD */}
          <div className={`rounded-[32px] p-6 border ${surfaceBg}`}>
            <div className="flex items-center gap-2 mb-4 opacity-40">
              <Award size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Productivity Score
              </span>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black tracking-tight">84</div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">
                Elite Consistency
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal remains the same as previous fix */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className={`relative w-full max-w-sm rounded-[40px] p-10 border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100 shadow-2xl"}`}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black italic">NEW LOG</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-500 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleAddLog} className="flex flex-col gap-8">
                <div className="flex justify-between items-center gap-4">
                  <TimeInput
                    value={hours}
                    onChange={setHours}
                    label="Hrs"
                    darkMode={darkMode}
                  />
                  <span className="text-2xl opacity-20">:</span>
                  <TimeInput
                    value={mins}
                    onChange={setMins}
                    label="Min"
                    darkMode={darkMode}
                  />
                  <span className="text-2xl opacity-20">:</span>
                  <TimeInput
                    value={secs}
                    onChange={setSecs}
                    label="Sec"
                    darkMode={darkMode}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-5 rounded-[24px] font-black text-white shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
                  style={{ backgroundColor: accentColor }}
                >
                  SYNC SESSION
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CompactStat = ({ label, val, icon, darkMode }) => (
  <div
    className={`p-5 rounded-[28px] border transition-all ${darkMode ? "bg-slate-900/60 border-slate-800/80" : "bg-white border-slate-200 shadow-sm"}`}
  >
    <div className="flex items-center gap-2 mb-2 opacity-40">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">
        {label}
      </span>
    </div>
    <div className="text-2xl font-black tracking-tight">{val}</div>
  </div>
);

const TimeInput = ({ value, onChange, label, darkMode }) => (
  <div className="flex flex-col items-center gap-2">
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value.slice(0, 2))}
      className={`w-20 h-20 text-center text-3xl font-black rounded-3xl outline-none border-2 transition-all ${darkMode ? "bg-slate-950 border-slate-800 focus:border-indigo-500" : "bg-slate-50 border-slate-200 focus:border-indigo-500"}`}
      placeholder="00"
    />
    <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">
      {label}
    </span>
  </div>
);

export default GrowthTracker;
