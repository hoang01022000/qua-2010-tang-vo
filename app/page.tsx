"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Gift, Check, Send, ArrowRight, ExternalLink, Link as LinkIcon, Music, VolumeX, Disc, Crown, Star } from "lucide-react";
import { EARRINGS_DATA, Earring } from "@/data/earrings";

export default function Home() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedEarring, setSelectedEarring] = useState<Earring | null>(null);
  const [customLink, setCustomLink] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Brand Filter Tab state ('all' | 'Huy Thanh' | 'PNJ' | 'Lili' | 'Pandora')
  const [activeTab, setActiveTab] = useState<string>("all");

  // Mini-game 1: Lật mở hộp quà (Dynamic Reveal - No modal)
  const [openedBoxes, setOpenedBoxes] = useState(false);
  const [revealedRewards, setRevealedRewards] = useState<{ [key: number]: { title: string; icon: string } }>({});

  // Mini-game 2: Vòng quay may mắn (SVG Wheel + Precise pointer alignment formula)
  const [spinPhase, setSpinPhase] = useState<'idle' | 'spinning' | 'teasing' | 'won'>('idle');
  const [wheelRotation, setWheelRotation] = useState(0);

  // Music state & Audio ref
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/music.mp3");
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.play().then(() => {
      setIsPlayingMusic(true);
    }).catch(err => {
      console.log("Browser blocked autoplay:", err);
      setIsPlayingMusic(false);
    });
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch(err => {
        console.log("Browser blocked play:", err);
      });
    }
  };

  const handleOpenWelcome = () => {
    setStep(2); // Sang Mini-game 1
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    startMusic();
  };

  const handleChooseBox = (clickedIdx: number) => {
    if (openedBoxes) return;
    setOpenedBoxes(true);
    triggerHugeConfetti();

    const pool = [
      { title: "Du thuyền 5 sao", icon: "🛥️" },
      { title: "Máy bay cá nhân", icon: "✈️" },
      { title: "Siêu xe Ô tô", icon: "🏎️" },
      { title: "Kim cương 10ct", icon: "💍" }
    ];

    const newRewards: { [key: number]: { title: string; icon: string } } = {};
    newRewards[clickedIdx] = { title: "Lượt Quay May Mắn!", icon: "🎡" };

    let poolIdx = 0;
    for (let i = 0; i < 5; i++) {
      if (i !== clickedIdx) {
        newRewards[i] = pool[poolIdx++];
      }
    }
    setRevealedRewards(newRewards);
  };

  // Kịch bản quay giật gân (Teaser Spin Animation) với công thức góc chuẩn xác trúng ô Đôi Bông Tai (index 5)
  const handleSpinWheel = () => {
    if (spinPhase === 'spinning' || spinPhase === 'teasing' || spinPhase === 'won') return;
    
    // Giai đoạn 1: Quay tốc độ cao (5 vòng + khựng tạm ở ô 100 Triệu)
    setSpinPhase('spinning');
    const fullSpins = 360 * 6; // 6 vòng
    
    // Ô Đôi Bông Tai là index 5 (300 - 360 độ -> tâm 330 độ trong SVG)
    const targetIndex = 5;
    const centerAngle = targetIndex * 60 + 30; // 330 độ
    const pointerAngle = 90; // Kim chỉ ở góc 3h (90 độ)
    
    let finalDegree = fullSpins + (pointerAngle - centerAngle);
    while (finalDegree < fullSpins) {
      finalDegree += 360;
    }

    // Tạm dừng ở ô 100 Triệu (index 0 -> centerAngle = 30) để troll
    const teaserIndex = 0;
    const teaserCenter = teaserIndex * 60 + 30; // 30 độ
    let teaserDegree = fullSpins + (pointerAngle - teaserCenter);
    while (teaserDegree < 360) {
      teaserDegree += 360;
    }

    setWheelRotation(teaserDegree);

    // Giai đoạn 3: Troll khựng lại (1.5s) rồi chốt hạ chuẩn xác vào Đôi Bông Tai
    setTimeout(() => {
      setSpinPhase('teasing');
      
      setTimeout(() => {
        setWheelRotation(finalDegree);
        
        setTimeout(() => {
          setSpinPhase('won');
          triggerHugeConfetti();
        }, 1500);
      }, 1500);
    }, 2500);
  };

  const handleSelectEarring = (earring: Earring) => {
    setSelectedEarring(earring);
    setCustomLink("");
    setErrorMsg("");
  };

  const handleSubmitGift = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalSelection = customLink.trim() || selectedEarring?.name;
    const finalUrl = customLink.trim() || selectedEarring?.productUrl;

    if (!finalSelection) {
      setErrorMsg("Vui lòng chọn 1 mẫu bông tai hoặc dán link món quà yêu thích nhé! ❤️");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemTitle: finalSelection,
          itemPrice: customLink.trim() ? "Link tùy chọn" : "01 Đôi Bông Tai 20/10",
          productUrl: finalUrl,
          message: message || "Yêu Hoàng nhất trên đời!",
        }),
      });

      const data = await res.json();
      if (!res.ok && !data.success) {
        throw new Error(data.error || "Có lỗi xảy ra");
      }

      setStep(5); // Hoàn tất
      triggerHugeConfetti();
    } catch (err: any) {
      console.error(err);
      setStep(5);
      triggerHugeConfetti();
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerHugeConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 35, spread: 360, ticks: 80, zIndex: 999 };

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 60 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const filteredProducts = activeTab === "all" 
    ? EARRINGS_DATA 
    : EARRINGS_DATA.filter(item => item.brand === activeTab);

  const countAll = EARRINGS_DATA.length;
  const countHuyThanh = EARRINGS_DATA.filter(i => i.brand === "Huy Thanh").length;
  const countPNJ = EARRINGS_DATA.filter(i => i.brand === "PNJ").length;
  const countLili = EARRINGS_DATA.filter(i => i.brand === "Lili").length;
  const countPandora = EARRINGS_DATA.filter(i => i.brand === "Pandora").length;

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-pink-100 to-red-100 text-gray-800 flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 relative font-sans">
      {/* Background ambient glowing & floating romantic elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>

      {/* Floating Romantic Decorations */}
      <div className="absolute top-12 left-10 text-3xl animate-bounce duration-1000 opacity-60 pointer-events-none">🌹</div>
      <div className="absolute top-24 right-16 text-3xl animate-pulse opacity-65 pointer-events-none">💖</div>
      <div className="absolute bottom-16 left-20 text-3xl animate-bounce opacity-60 pointer-events-none">🌿</div>
      <div className="absolute bottom-24 right-24 text-3xl animate-pulse opacity-65 pointer-events-none">🌹</div>
      <div className="absolute top-1/2 left-4 text-2xl animate-spin opacity-40 pointer-events-none">✨</div>
      <div className="absolute top-1/3 right-8 text-2xl animate-bounce opacity-50 pointer-events-none">💖</div>

      {/* Header */}
      <header className="w-full max-w-[92vw] mx-auto flex items-center justify-between py-4 z-10 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="bg-rose-600 text-white p-2 rounded-xl shadow-md">
            <Heart className="w-6 h-6 animate-bounce" />
          </div>
          <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Món Quà 20/10 Đặc Biệt
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Music Control Button */}
          <button
            onClick={toggleMusic}
            title={isPlayingMusic ? "Tắt nhạc nền" : "Bật nhạc nền lãng mạn"}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full shadow-md border transition-all ${
              isPlayingMusic
                ? "bg-rose-600 text-white border-rose-500 shadow-rose-600/40 animate-pulse"
                : "bg-white/80 backdrop-blur-md text-gray-700 border-rose-200 hover:bg-white"
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Music className="w-4 h-4 animate-spin" />
                <span className="text-xs font-bold">Tắt nhạc</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-bold">Bật nhạc nền</span>
              </>
            )}
          </button>

          <div className="text-xs sm:text-sm bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-rose-200 text-rose-600 font-medium">
            Dành tặng Hiền ❤️
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="w-full max-w-[92vw] mx-auto flex-1 flex flex-col items-center justify-center my-6 z-10">
        <AnimatePresence mode="wait">
          {/* STEP 1: CHÀO MỪNG */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200 p-8 text-center relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-200 rounded-full blur-2xl opacity-50"></div>
              
              <div className="w-20 h-20 bg-gradient-to-tr from-rose-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-rose-500/30 mb-6 text-white transform hover:rotate-6 transition-transform">
                <Gift className="w-10 h-10 animate-pulse" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Chuỗi thử thách 20/10
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 leading-snug">
                Chúc mừng Hiền! 🎉
              </h1>

              <p className="text-gray-600 text-base mb-8 leading-relaxed">
                Hoàng đã chuẩn bị chuỗi minigame bất ngờ để trao phần quà đặc biệt cho Hiền!
              </p>

              <button
                onClick={handleOpenWelcome}
                className="w-full py-4 px-6 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-xl shadow-rose-600/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-3 text-lg group"
              >
                <span>Mở quà ngay</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: MINI-GAME 1 - LẬT MỞ HỘP QUÀ */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-3xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200 p-8 text-center relative overflow-hidden flex flex-col items-center"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                Lật Mở Hộp Quà Bí Mật 🎁
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Hãy chọn 1 trong 5 hộp quà thần kỳ bên dưới nhé!
              </p>

              <div className="grid grid-cols-5 gap-3 sm:gap-4 w-full mb-6">
                {[0, 1, 2, 3, 4].map((boxIdx) => {
                  const reward = revealedRewards[boxIdx];
                  return (
                    <motion.div
                      key={boxIdx}
                      whileHover={{ scale: openedBoxes ? 1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleChooseBox(boxIdx)}
                      className={`cursor-pointer rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center border-2 transition-all shadow-md min-h-[130px] ${
                        openedBoxes
                          ? reward?.icon === "🎡"
                            ? "bg-rose-600 text-white border-rose-600 ring-4 ring-rose-500/20 scale-105"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                          : "bg-gradient-to-b from-rose-50 to-pink-100 border-rose-200 hover:border-rose-400 animate-bounce"
                      }`}
                      style={{ animationDuration: `${2 + boxIdx * 0.3}s` }}
                    >
                      {openedBoxes ? (
                        <>
                          <span className="text-2xl sm:text-4xl mb-1">{reward?.icon}</span>
                          <span className="text-[10px] sm:text-xs font-bold mt-1 text-center line-clamp-2">
                            {reward?.title}
                          </span>
                        </>
                      ) : (
                        <>
                          <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-rose-600 mb-1" />
                          <span className="text-xs font-bold mt-1 text-rose-700">Hộp #{boxIdx + 1}</span>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {openedBoxes && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full flex flex-col items-center gap-4 mt-2"
                >
                  <div className="bg-rose-50 border border-rose-200 px-6 py-3 rounded-2xl text-rose-700 font-semibold text-sm">
                    🤪 Tiếc quá! Suýt nữa là trúng Du thuyền và 100 Triệu rồi! Nhưng Hiền đã xuất sắc nhận được <span className="font-bold underline">01 Lượt Quay May Mắn</span>!
                  </div>
                  <button
                    onClick={() => setStep(3)} // Sang Mini-game 2: Vòng quay
                    className="py-3.5 px-8 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-rose-600/30 flex items-center space-x-2 text-base transform hover:scale-105 transition-all"
                  >
                    <span>Chuyển sang Vòng Quay May Mắn ➔</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 3: MINI-GAME 2 - SVG WHEEL & PRECISE POINTER ALIGNMENT */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200 p-6 sm:p-10 relative overflow-hidden"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                  Vòng Quay May Mắn 🎡
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Bấm nút quay để xem phần thưởng đỉnh cao từ Hoàng!
                </p>
              </div>

              {/* Layout 2 Cột: Trái (SVG Wheel) - Phải (Thiệp Mừng Cao Cấp) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* BÊN TRÁI: VÒNG QUAY SVG 500x500 LỘNG LẪY */}
                <div className="flex flex-col items-center justify-center relative">
                  <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center p-3 bg-gradient-to-b from-amber-200 via-yellow-100 to-amber-300 rounded-full shadow-2xl border-4 border-yellow-400">
                    {/* Kim chỉ bên phải (hướng 3h) */}
                    <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-30 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[24px] border-r-red-600 filter drop-shadow-md"></div>

                    {/* SVG Wheel */}
                    <div 
                      style={{
                        transform: `rotate(${wheelRotation}deg)`,
                        transition: spinPhase === 'spinning' || spinPhase === 'teasing' || spinPhase === 'won' 
                          ? 'transform 4s cubic-bezier(0.15, 0.85, 0.15, 1)' 
                          : 'none',
                        willChange: 'transform',
                        backfaceVisibility: 'hidden'
                      }}
                      className="w-full h-full rounded-full overflow-hidden shadow-inner relative flex items-center justify-center"
                    >
                      <svg viewBox="0 0 500 500" className="w-full h-full">
                        {/* 6 Slices (60 độ mỗi ô, tâm 250,250, bán kính 250) */}
                        {/* Ô 1: 100 Triệu Cash (0 - 60 độ) */}
                        <g>
                          <path d="M250,250 L250,0 A250,250 0 0,1 466.5,125 Z" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="3" />
                          <text x="330" y="110" fill="#881337" fontSize="15" fontWeight="bold" textAnchor="middle" transform="rotate(30, 330, 110)">💵 100 Triệu</text>
                        </g>

                        {/* Ô 2: Thẻ Đen Vô Cực (60 - 120 độ) */}
                        <g>
                          <path d="M250,250 L466.5,125 A250,250 0 0,1 466.5,375 Z" fill="#fde68a" stroke="#f43f5e" strokeWidth="3" />
                          <text x="375" y="270" fill="#78350f" fontSize="15" fontWeight="bold" textAnchor="middle" transform="rotate(90, 375, 270)">💳 Thẻ Đen</text>
                        </g>

                        {/* Ô 3: Du Lịch Maldives (120 - 180 độ) */}
                        <g>
                          <path d="M250,250 L466.5,375 A250,250 0 0,1 250,500 Z" fill="#fed7aa" stroke="#f43f5e" strokeWidth="3" />
                          <text x="330" y="395" fill="#7c2d12" fontSize="15" fontWeight="bold" textAnchor="middle" transform="rotate(150, 330, 395)">🏝️ Maldives</text>
                        </g>

                        {/* Ô 4: 1000 Nụ Hôn (180 - 240 độ) */}
                        <g>
                          <path d="M250,250 L250,500 A250,250 0 0,1 33.5,375 Z" fill="#fecdd3" stroke="#f43f5e" strokeWidth="3" />
                          <text x="170" y="395" fill="#881337" fontSize="15" fontWeight="bold" textAnchor="middle" transform="rotate(210, 170, 395)">💋 1000 Nụ Hôn</text>
                        </g>

                        {/* Ô 5: Dọn Nhà 1 Tháng (240 - 300 độ) */}
                        <g>
                          <path d="M250,250 L33.5,375 A250,250 0 0,1 33.5,125 Z" fill="#e9d5ff" stroke="#f43f5e" strokeWidth="3" />
                          <text x="125" y="270" fill="#581c87" fontSize="15" fontWeight="bold" textAnchor="middle" transform="rotate(270, 125, 270)">🧹 Dọn Nhà</text>
                        </g>

                        {/* Ô 6: Đôi Bông Tai (300 - 360 độ - Trúng giải - Màu pastel #ffe4e6) */}
                        <g>
                          <path d="M250,250 L33.5,125 A250,250 0 0,1 250,0 Z" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="3" />
                          <text x="170" y="110" fill="#881337" fontSize="16" fontWeight="extrabold" textAnchor="middle" transform="rotate(330, 170, 110)">💎 Đôi Bông Tai</text>
                        </g>
                      </svg>
                    </div>

                    {/* Center knob */}
                    <div className="absolute z-20 w-16 h-16 bg-gradient-to-tr from-rose-600 to-pink-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white text-xs font-extrabold">
                      QUAY
                    </div>
                  </div>
                </div>

                {/* BÊN PHẢI: THIỆP MỪNG CAO CẤP (LUXURY GLASSMORPHISM CARD) */}
                <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left bg-gradient-to-br from-white/90 via-rose-50/90 to-pink-100/90 p-8 rounded-3xl border border-rose-300 shadow-2xl shadow-pink-300/40 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-300 rounded-full blur-2xl opacity-40"></div>

                  <div className="w-14 h-14 bg-gradient-to-tr from-rose-500 to-pink-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-rose-500/30">
                    <Crown className="w-7 h-7 animate-bounce" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {spinPhase === 'won' ? "🎉 CHÚC MỪNG HIỀN THẮNG GIẢI!" : spinPhase === 'teasing' ? "😱 Ôi suýt trúng 100 triệu..." : spinPhase === 'spinning' ? "🫣 Đang quay xé gió..." : "Sẵn sàng quay thưởng?"}
                  </h3>

                  <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed">
                    {spinPhase === 'won' ? (
                      <span className="font-extrabold text-rose-700 text-base">
                        Hiền đã xuất sắc vượt qua thử thách và quay trúng phần thưởng danh giá nhất: <br />
                        <span className="text-xl bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent underline decoration-rose-400">"💎 01 Đôi Bông Tai Tùy Chọn từ Hoàng"</span>! ✨
                      </span>
                    ) : spinPhase === 'teasing' ? (
                      <span className="text-amber-700 font-bold italic animate-pulse">
                        Kim đang lướt qua ô 100 Triệu... Nhích nhẹ sang ô Bông Tai nào! 🤭
                      </span>
                    ) : spinPhase === 'spinning' ? (
                      <span className="text-rose-600 font-semibold italic animate-pulse">
                        Vòng quay đang quay tít mù... Hồi hộp quá đi thôi! 🎡
                      </span>
                    ) : (
                      "Hiền hãy bấm nút QUAY NGAY bên dưới để bắt đầu thử thách và nhận phần thưởng trang sức lấp lánh nhé!"
                    )}
                  </p>

                  {spinPhase !== 'won' ? (
                    <button
                      onClick={handleSpinWheel}
                      disabled={spinPhase === 'spinning' || spinPhase === 'teasing'}
                      className="w-full py-4 px-8 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 text-white font-extrabold rounded-2xl shadow-xl shadow-rose-600/30 text-base disabled:opacity-70 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>{spinPhase === 'spinning' || spinPhase === 'teasing' ? "Đang quay giật gân..." : "QUAY NGAY 🎡"}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setStep(4)} // Sang Step 4: Chọn bông tai
                      className="w-full py-4 px-8 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 text-white font-extrabold rounded-2xl shadow-xl shadow-rose-600/30 text-base flex items-center justify-center space-x-2 transform hover:scale-105 transition-all relative overflow-hidden group"
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"></div>
                      <span className="relative z-10">Nhận Quà & Chọn Mẫu Ngay 💖</span>
                      <ArrowRight className="w-5 h-5 relative z-10" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: DANH SÁCH CHỌN QUÀ (BÔNG TAI) */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                  Chọn Mẫu Quà 20/10 Yêu Thích 💎
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                  Lọc theo thương hiệu bên dưới, xem chi tiết link gốc hoặc bấm <span className="font-bold text-rose-600">"Nhận mẫu"</span> để chọn món quà yêu thích nhé!
                </p>
              </div>

              {/* BRAND FILTER TABS BAR */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                {[
                  { id: "all", label: `Tất cả (${countAll})` },
                  { id: "Huy Thanh", label: `Huy Thanh (${countHuyThanh})` },
                  { id: "PNJ", label: `PNJ (${countPNJ})` },
                  { id: "Lili", label: `Lili (${countLili})` },
                  { id: "Pandora", label: `Pandora (${countPandora})` },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
                        isActive
                          ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-rose-600/30 scale-105"
                          : "bg-white/90 hover:bg-white text-gray-700 border border-rose-200"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleSubmitGift} className="w-full flex flex-col items-center">
                {/* Responsive Grid hiển thị TẤT CẢ sản phẩm của tab hiện tại */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 w-full mb-8">
                  {filteredProducts.map((item) => {
                    const isSelected = selectedEarring?.id === item.id && !customLink;
                    return (
                      <div
                        key={item.id}
                        className={`bg-white/95 backdrop-blur-sm rounded-2xl p-3 border-2 transition-all flex flex-col justify-between relative group shadow-md ${
                          isSelected
                            ? "border-rose-600 ring-4 ring-rose-500/20 bg-rose-50/40 scale-[1.02]"
                            : "border-gray-200 hover:border-rose-300"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 z-10 bg-rose-600 text-white p-1 rounded-full shadow-md">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}

                        <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-2.5 bg-gray-100 relative">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="mb-2.5">
                          <h3 className="font-bold text-gray-900 text-xs mb-1 line-clamp-2">{item.name}</h3>
                          <p className="text-[11px] text-rose-600 font-semibold">{item.material}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5 mt-auto">
                          <a
                            href={item.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-1.5 px-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs flex items-center justify-center space-x-1 transition-all border border-gray-200"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Chi tiết</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleSelectEarring(item)}
                            className={`py-1.5 px-1 font-bold rounded-xl text-xs flex items-center justify-center transition-all shadow-sm ${
                              isSelected
                                ? "bg-rose-600 text-white shadow-rose-600/30"
                                : "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                            }`}
                          >
                            {isSelected ? "Đã chọn" : "Nhận mẫu"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CUSTOM LINK & MESSAGE CONTAINER */}
                <div className="w-full max-w-3xl bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-rose-200 flex flex-col gap-5 mb-8">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-rose-600" /> Nếu Hiền không thích các mẫu trên, hãy dán link món quà thích vào đây:
                    </label>
                    <input
                      type="url"
                      value={customLink}
                      onChange={(e) => {
                        setCustomLink(e.target.value);
                        if (e.target.value.trim()) setSelectedEarring(null);
                        setErrorMsg("");
                      }}
                      placeholder="https://... (dán đường dẫn sản phẩm bất kỳ)"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all text-sm bg-gray-50/50"
                    />
                    {customLink && (
                      <p className="text-xs text-green-600 font-semibold mt-1.5">✓ Đã ghi nhận link tự chọn!</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-600" /> Đôi lời gửi đến Hoàng:
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Cảm ơn Hoàng..."
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all text-sm resize-none bg-gray-50/50"
                    />
                  </div>

                  {errorMsg && (
                    <div className="px-4 py-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm font-medium">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <div className="flex flex-col items-center gap-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-8 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-xl shadow-rose-600/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-3 text-base disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Đang gửi yêu cầu...</span>
                        </div>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Nhận quà ngay</span>
                        </>
                      )}
                    </button>
                    <span className="text-xs text-gray-500 italic">
                      "Bấm nhận để phần quà được gửi đến bạn"
                    </span>
                  </div>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 5: HOÀN TẤT */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200 p-8 sm:p-10 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500"></div>

              <div className="w-24 h-24 bg-gradient-to-tr from-rose-500 to-pink-500 rounded-full mx-auto flex items-center justify-center shadow-xl shadow-rose-500/30 mb-6 text-white">
                <Check className="w-12 h-12 stroke-[3]" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                Đã gửi yêu cầu thành công! 💖
              </h2>

              <p className="text-gray-600 text-base mb-6 leading-relaxed">
                Yêu cầu món quà <span className="font-bold text-rose-600">"{customLink ? customLink : selectedEarring?.name}"</span> kèm lời nhắn đã được gửi đến Hoàng!
              </p>

              {/* Box tổng kết */}
              <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 mb-8 text-left">
                <div className="flex items-center space-x-3">
                  {!customLink && selectedEarring && (
                    <img
                      src={selectedEarring.imageUrl}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover border border-rose-200"
                    />
                  )}
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{customLink ? "Link tự chọn" : selectedEarring?.name}</h4>
                    {customLink ? (
                      <a href={customLink} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline truncate block max-w-xs">
                        {customLink}
                      </a>
                    ) : (
                      <p className="text-xs text-rose-600 font-semibold">{selectedEarring?.material} &bull; {selectedEarring?.brand}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Trạng thái: <span className="text-green-600 font-bold">Chờ ship quà nhé! 🚚✨</span></p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setStep(1);
                  setSelectedEarring(null);
                  setCustomLink("");
                  setMessage("");
                  setActiveTab("all");
                  setOpenedBoxes(false);
                  setRevealedRewards({});
                  setSpinPhase('idle');
                }}
                className="py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all text-sm"
              >
                Chơi lại từ đầu 🎁
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-[92vw] mx-auto text-center py-3 text-xs text-gray-500 z-10 border-t border-rose-100/50 shrink-0">
        Made with ❤️ for Hiền by Hoàng
      </footer>
    </main>
  );
}
