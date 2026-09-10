import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS_DATA = [
  { value: 4, label: "Projects Shipped", suffix: "" },
  { value: 1, label: "Years Experience", suffix: "+" },
  { value: 25, label: "Features Built", suffix: "+" },
  { value: 500, label: "Code Commits", suffix: "+" },
];

const CounterItem = ({ targetValue, label, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2s duration
    const steps = 40;
    const increment = targetValue / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetValue]);

  return (
    <div
      ref={ref}
      className="p-6 rounded-2xl backdrop-blur-md bg-white/[0.02] border border-white/10 text-center relative group hover:border-purple-500/40 transition-all cursor-default"
    >
      <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-mono mb-1">
        {count}{suffix}
      </div>
      <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
};

const StatsRow = () => {
  return (
    <section className="w-full text-white px-6 py-12 bg-[#0b0f1a] relative z-10 border-y border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {STATS_DATA.map((item, idx) => (
          <CounterItem key={idx} targetValue={item.value} label={item.label} suffix={item.suffix} />
        ))}
      </div>
    </section>
  );
};

export default StatsRow;
