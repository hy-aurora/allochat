"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState, useEffect } from "react";

const messages = [
  {
    id: 1,
    user: "Sarah",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    text: "Who's hopping on the gaming stream tonight? 🎮",
    time: "8:42 PM",
    color: "bg-blue-500",
  },
  {
    id: 2,
    user: "Alex",
    avatar: "https://i.pravatar.cc/150?u=alex",
    text: "I'll be there! Just need to finish up some work first.",
    time: "8:45 PM",
    color: "bg-purple-500",
  },
  {
    id: 3,
    user: "Jordan",
    avatar: "https://i.pravatar.cc/150?u=jordan",
    text: "Same here. Are we doing the raid?",
    time: "8:46 PM",
    color: "bg-green-500",
  },
];

export function HeroChatMockup() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Simple sequence: show message 1, wait, message 2, wait, message 3, wait, show typing
    const sequence = async () => {
      // Small initial delay
      await new Promise((r) => setTimeout(r, 600));
      setVisibleMessages(1);
      
      await new Promise((r) => setTimeout(r, 1200));
      setVisibleMessages(2);
      
      await new Promise((r) => setTimeout(r, 1500));
      setVisibleMessages(3);
      
      await new Promise((r) => setTimeout(r, 800));
      setIsTyping(true);
    };

    sequence();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative mx-auto mt-16 w-full max-w-3xl rounded-3xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-md overflow-hidden"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/30">
            <Icon icon="solar:gamepad-bold" className="size-5" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-white">Gaming Lounge</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
              </span>
              24 online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex size-9 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors">
            <Icon icon="solar:phone-bold" className="size-4" />
          </button>
          <button className="flex size-9 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors">
            <Icon icon="solar:camera-bold" className="size-4" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col gap-5 p-6 min-h-[300px] justify-end relative z-10">
        {messages.slice(0, visibleMessages).map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-start gap-4"
          >
            <div className="relative shrink-0">
              <Image
                src={msg.avatar}
                alt={msg.user}
                width={36}
                height={36}
                className="rounded-full ring-2 ring-background shadow-sm"
              />
              <div className={`absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-background ${msg.color}`} />
            </div>
            <div className="flex flex-col items-start gap-1 w-full text-left">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-slate-200">{msg.user}</span>
                <span className="text-xs font-medium text-slate-500">{msg.time}</span>
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-white/5 px-4 py-2.5 text-sm leading-relaxed text-slate-300 ring-1 ring-white/10 shadow-sm max-w-[85%]">
                {msg.text}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs font-medium text-slate-500 pl-14"
          >
            Sarah is typing
            <span className="flex gap-0.5">
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0 }} className="h-1 w-1 rounded-full bg-slate-500" />
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} className="h-1 w-1 rounded-full bg-slate-500" />
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} className="h-1 w-1 rounded-full bg-slate-500" />
            </span>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-white/5 bg-white/5 p-4 relative z-10">
        <div className="flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-black/40 pl-4 pr-1.5 py-1.5 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
          <Icon icon="solar:smile-circle-linear" className="size-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Message Gaming Lounge..."
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
            disabled
          />
          <button className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm transition-transform hover:scale-105">
            <Icon icon="solar:arrow-right-bold" className="size-4 pt-1" />
          </button>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
    </motion.div>
  );
}
