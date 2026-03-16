import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { Flame, Clock, BarChart3, Target, Play, Square } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const StudyDashboard = () => {
  const [seconds, setSeconds] = useState(8132); // Initial time: 02:15:32
  const [isActive, setIsActive] = useState(false);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [hrs, mins, secs].map((v) => (v < 10 ? "0" + v : v)).join(":");
  };

  // Chart Data & Styling
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [2.8, 5.1, 4.3, 5.9, 4.8, 3.6, 5.4],
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#8B5CF6"); // Purple
          gradient.addColorStop(1, "#FB923C"); // Orange
          return gradient;
        },
        borderRadius: 10,
        borderSkipped: false,
        barThickness: 40,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { display: false, grid: { display: false } },
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#94a3b8", font: { weight: "600" } },
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FB] flex items-center justify-center p-6 md:p-10 font-sans text-slate-700">
      <div className="w-full max-w-6xl">
        {/* Top Header/Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Current Streak"
            value="March week 02"
            subValue="(09-15)"
            footer="Personal best: 14"
            icon={<Flame className="text-orange-400 w-5 h-5" />}
          />
          <StatCard
            title="Study Time"
            value="4h 20m"
            subValue="+12% from yesterday"
            icon={<Clock className="text-indigo-500 w-5 h-5" />}
          />
          <StatCard
            title="Weekly Average"
            value="5h 08m"
            subValue="Average per study day"
            icon={<BarChart3 className="text-pink-400 w-5 h-5" />}
          />
          <StatCard
            title="Weekly Goal"
            value="82%"
            subValue="On track to finish early"
            icon={<Target className="text-emerald-400 w-5 h-5" />}
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bar Chart Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-slate-400 uppercase tracking-wider text-xs">
                Weekly Time Bargraph
              </h3>
              <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                7 day overview
              </span>
            </div>
            <div className="h-72 w-full">
              <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="flex justify-between mt-4 px-4">
              {chartData.datasets[0].data.map((val, i) => (
                <span key={i} className="text-sm font-bold text-slate-800">
                  {val}h
                </span>
              ))}
            </div>
          </motion.div>

          {/* Active Session / Timer Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col"
          >
            <h3 className="font-bold text-slate-400 uppercase tracking-wider text-xs mb-auto">
              Active Session
            </h3>

            <div className="flex flex-col items-center justify-center py-10">
              <div className="text-6xl font-black tracking-tighter text-slate-800 mb-12">
                {formatTime(seconds)}
              </div>

              <div className="flex gap-4 w-full">
                <button
                  onClick={() => setIsActive(true)}
                  className="flex-1 bg-[#7C5DFA] hover:bg-[#6C47FF] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-100"
                >
                  <Play size={18} fill="currentColor" /> Start
                </button>
                <button
                  onClick={() => setIsActive(false)}
                  className="flex-1 bg-[#FF7E7E] hover:bg-[#F96B6B] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-100"
                >
                  <Square size={16} fill="currentColor" /> Stop
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for small stat cards
const StatCard = ({ title, value, subValue, footer, icon }) => (
  <motion.div
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col h-full"
  >
    <div className="flex justify-between items-start mb-6">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        {title}
      </h3>
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
    </div>
    <div className="mt-auto">
      <div className="text-2xl font-black text-slate-800 leading-tight">
        {value}
      </div>
      <div className="text-sm font-bold text-slate-500 mt-1">{subValue}</div>
      {footer && (
        <div className="text-[10px] font-bold text-slate-300 mt-4 uppercase tracking-widest border-t pt-3 border-slate-50">
          {footer}
        </div>
      )}
    </div>
  </motion.div>
);

export default StudyDashboard;
