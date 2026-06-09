"use client";

import Image from "next/image";
import Link from "next/link";

const navItems = [
  "About",
  "R&D",
  "Pipeline",
  "Platform",
  "Sustainability",
  "News",
  "Careers",
  "IR",
];

export default function HeroSection() {
  return (
    <section className="snap-section relative w-full h-screen overflow-hidden bg-black">
      {/* 배경 비디오 */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/01 HERO SECTION video .mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* 네비게이션 */}
      <nav className="absolute top-0 left-0 right-0 z-10 flex items-center px-[4.5%] h-[10.2vh]">
        {/* 로고 */}
        <Link href="/" className="relative shrink-0 mr-auto" style={{ width: "19.8vw", height: "5.2vw", maxWidth: 380, maxHeight: 100 }}>
          <Image
            src="/images/01 HERO SECTION logo.png"
            alt="Oscotec Inc."
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* 메뉴 항목 */}
        <ul className="flex items-center" style={{ gap: "4vw" }}>
          {navItems.map((item) => (
            <li key={item}>
              <Link
                href={`#${item.toLowerCase().replace("&", "")}`}
                className="text-white font-medium leading-none whitespace-nowrap hover:opacity-70 transition-opacity duration-200"
                style={{ fontSize: "clamp(14px, 1.25vw, 24px)" }}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 하단 대형 oscotec 텍스트 */}
      <div
        className="absolute bottom-0 left-0 overflow-hidden w-full pointer-events-none select-none"
        style={{ lineHeight: 0 }}
      >
        <p
          className="text-white font-black leading-none whitespace-nowrap"
          style={{
            fontSize: "25vw",
            marginLeft: "-0.5%",
            lineHeight: 0.9,
          }}
        >
          oscotec
        </p>
      </div>
    </section>
  );
}
