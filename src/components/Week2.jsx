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
  Award,
  Clock,
  LogOut,
  BrainCircuit
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const StudyDashboard = ({ user, onLogout }) => {
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
    updated[4] = newEntry; // Mock insertion
    setWeeklyLogs(updated);
    setIsModalOpen(false);
  };

  const accentColor = "#6c63ff";
  const surfaceBg = "bg-white border border-[#00000014] shadow-sm";

  return (
    <div className="min-h-screen w-full font-sans bg-[#f7f9ff] text-[#0f1724] pb-12 overflow-x-hidden">
      
      {/* Navbar specific to Dashboard */}
      <nav className="w-full bg-white border-b border-[#00000014] sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-xl text-[#0f1724]">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#eef2ff] text-[#6c63ff]">
              <BrainCircuit size={20} />
            </div>
            StudyFlow
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-lg font-medium text-sm text-white flex items-center gap-2 transition-colors bg-[#6c63ff] hover:bg-[#5a52d6] shadow-sm"
            >
              <Plus size={16} /> Add Log
            </motion.button>
            <div className="w-10 h-10 rounded-full border border-[#00000014] bg-[#f7f9ff] flex items-center justify-center text-[#96a0b5] ml-4 cursor-pointer hover:bg-[#eef2ff] transition-colors">
              <User size={18} />
            </div>
            {onLogout && (
              <button 
                onClick={onLogout}
                className="text-[#96a0b5] hover:text-[#ef4444] transition-colors p-2"
                title="Log out"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 pt-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f1724] tracking-tight">
            {user?.name ? `Welcome back, ${user.name}!` : 'Your Dashboard'}
          </h1>
          <p className="text-[#96a0b5] font-medium mt-1">Here's a breakdown of your study progress this week.</p>
        </motion.div>

        {/* Main Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left column */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <CompactStat
                label="Progress"
                val={`${goalPercent}%`}
                icon={<Target size={16} className="text-[#6c63ff]" />}
                surfaceBg={surfaceBg}
              />
              <CompactStat
                label="Remaining"
                val={`${remainingHours}h`}
                icon={<TrendingUp size={16} className="text-[#a09cff]" />}
                surfaceBg={surfaceBg}
              />
              <CompactStat
                label="Daily Avg"
                val="14.3h"
                icon={<Flame size={16} className="text-[#f59e0b]" />}
                surfaceBg={surfaceBg}
              />
            </div>

            <motion.div
              variants={fadeInVariants}
              className={`rounded-2xl p-6 lg:p-8 flex flex-col flex-grow min-h-[450px] relative overflow-hidden group ${surfaceBg}`}
            >
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 relative z-10 gap-4">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#96a0b5] mb-1">
                    Activity Flow
                  </h3>
                  <p className="text-2xl font-bold text-[#0f1724]">Weekly Hours Logged</p>
                </div>
                <div className="px-4 py-2 rounded-lg text-xs font-bold bg-[#eef2ff] text-[#6c63ff]">
                  This Week
                </div>
              </div>
              
              <div className="flex-grow relative z-10 min-h-[300px]">
                <Line
                  data={{
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                      {
                        data: weeklyLogs.map((t) =>
                          (getSeconds(t) / 3600).toFixed(1),
                        ),
                        borderColor: accentColor,
                        backgroundColor: (context) => {
                          const ctx = context.chart.ctx;
                          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                          gradient.addColorStop(0, `${accentColor}40`);
                          gradient.addColorStop(1, `${accentColor}00`);
                          return gradient;
                        },
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: accentColor,
                        pointBorderWidth: 3,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: accentColor,
                        pointHoverBorderColor: '#ffffff',
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                      mode: 'index',
                      intersect: false,
                    },
                    plugins: { 
                      legend: { display: false },
                      tooltip: {
                        backgroundColor: '#0f1724',
                        titleColor: '#96a0b5',
                        bodyColor: '#ffffff',
                        bodyFont: { weight: 'bold', size: 14 },
                        padding: 12,
                        borderColor: '#1e293b',
                        borderWidth: 1,
                        displayColors: false,
                        cornerRadius: 8,
                        callbacks: {
                          label: function(context) { return `${context.parsed.y} hrs`; }
                        }
                      }
                    },
                    scales: {
                      y: {
                        grid: { 
                          color: "#f1f4f8",
                          drawBorder: false,
                        },
                        ticks: { 
                          color: "#96a0b5",
                          font: { family: "inherit" },
                          padding: 10
                        },
                        border: { display: false }
                      },
                      x: {
                        grid: { display: false },
                        ticks: { 
                          color: "#96a0b5",
                          font: { family: "inherit", weight: '500' },
                          padding: 10
                        },
                        border: { display: false }
                      },
                    },
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* TOTAL TIME CARD */}
            <motion.div variants={fadeInVariants} className={`rounded-2xl p-8 relative overflow-hidden ${surfaceBg}`}>
              <div className="flex items-center gap-2 mb-6 text-[#96a0b5]">
                <Clock size={16} />
                <span className="text-xs font-black uppercase tracking-widest">
                  Total Time
                </span>
              </div>
              <div className="py-2">
                <div className="text-6xl font-black tracking-tighter text-[#0f1724]">
                  {Math.floor(totalSeconds / 3600)}<span className="text-3xl text-[#6c63ff]">h</span>{" "}
                  {Math.floor((totalSeconds % 3600) / 60)}<span className="text-3xl text-[#a09cff]">m</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#10b981] font-bold text-sm mt-4 bg-[#10b981]/10 w-fit px-3 py-1.5 rounded-full">
                  <TrendingUp size={16} /> <span>+12% vs last week</span>
                </div>
              </div>
            </motion.div>

            {/* GOAL PROGRESS CARD */}
            <motion.div
              variants={fadeInVariants}
              className={`rounded-2xl p-8 flex flex-col items-center justify-center relative ${surfaceBg}`}
            >
              <div className="w-full flex justify-between items-center mb-2 text-[#96a0b5]">
                <span className="text-xs font-black uppercase tracking-widest">Goal Status</span>
                <Target size={16} />
              </div>
              
              <div className="relative py-4 flex justify-center items-center w-full">
                <svg className="w-52 h-52 -rotate-90">
                  {/* Background Track */}
                  <circle
                    cx="104"
                    cy="104"
                    r="90"
                    stroke="#f1f4f8"
                    strokeWidth="14"
                    fill="none"
                  />
                  {/* Progress Glow */}
                  <motion.circle
                    initial={{ strokeDashoffset: 565 }}
                    animate={{ strokeDashoffset: 565 * (1 - goalPercent / 100) }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    cx="104"
                    cy="104"
                    r="90"
                    stroke="#6c63ff"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray={565}
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0px 0px 8px rgba(108, 99, 255, 0.4))" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black tracking-tighter text-[#0f1724]">
                    {Math.round(goalPercent)}<span className="text-2xl text-[#6c63ff]">%</span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#96a0b5] mt-1">
                    Completed
                  </span>
                </div>
              </div>
            </motion.div>

            {/* PRODUCTIVITY SCORE CARD */}
            <motion.div variants={fadeInVariants} className={`rounded-2xl p-8 relative overflow-hidden ${surfaceBg}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#96a0b5]">
                  <Award size={16} />
                  <span className="text-xs font-black uppercase tracking-widest">
                    Score
                  </span>
                </div>
              </div>
              <div className="flex items-end gap-4">
                <div className="text-7xl font-black tracking-tighter text-[#6c63ff]">
                  84
                </div>
                <div className="pb-2">
                  <p className="text-sm font-bold text-[#0f1724]">
                    Elite Consistency
                  </p>
                  <p className="text-xs text-[#96a0b5] mt-1">Top 5% this week</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#0f1724]/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-2xl p-8 sm:p-10 shadow-2xl border border-[#00000014]"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-[#0f1724]">New Log</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-[#f1f4f8] text-[#96a0b5] hover:text-[#0f1724] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddLog} className="flex flex-col gap-10">
                <div className="flex justify-center items-center gap-4 sm:gap-6">
                  <TimeInput
                    value={hours}
                    onChange={setHours}
                    label="Hours"
                  />
                  <span className="text-4xl font-light text-[#96a0b5] -mt-6">:</span>
                  <TimeInput
                    value={mins}
                    onChange={setMins}
                    label="Minutes"
                  />
                  <span className="text-4xl font-light text-[#96a0b5] -mt-6">:</span>
                  <TimeInput
                    value={secs}
                    onChange={setSecs}
                    label="Seconds"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-white bg-[#6c63ff] hover:bg-[#5a52d6] transition-all"
                >
                  Sync Session
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CompactStat = ({ label, val, icon, surfaceBg }) => (
  <motion.div
    variants={fadeInVariants}
    whileHover={{ y: -4, scale: 1.01 }}
    className={`p-6 rounded-2xl transition-all ${surfaceBg}`}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-lg bg-[#eef2ff]">
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-[#96a0b5]">
        {label}
      </span>
    </div>
    <div className="text-3xl font-black tracking-tight text-[#0f1724]">{val}</div>
  </motion.div>
);

const TimeInput = ({ value, onChange, label }) => (
  <div className="flex flex-col items-center gap-3">
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value.slice(0, 2))}
      className="w-20 h-24 sm:w-24 sm:h-28 text-center text-4xl sm:text-5xl font-black rounded-2xl outline-none border border-[#00000014] bg-[#f7f9ff] focus:border-[#6c63ff] focus:ring-2 focus:ring-[#6c63ff]/20 text-[#0f1724] transition-all"
      placeholder="00"
    />
    <span className="text-[10px] font-bold text-[#96a0b5] uppercase tracking-widest">
      {label}
    </span>
  </div>
);

export default StudyDashboard;
