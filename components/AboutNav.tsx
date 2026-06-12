"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

export default function AboutNav() {
  const sectionRef = useScrollReveal();

  return (
    <header
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative w-full bg-black overflow-hidden"
      style={{ height: "clamp(240px, 24vw, 461px)" }}
    >
      {/* 상단 메뉴 바 (반투명) */}
      <nav
        className="absolute top-0 left-0 right-0 flex items-center"
        style={{ height: "8.02vw", padding: "0 6.93%", background: "rgba(255,255,255,0.1)" }}
      >
        <Link
          href="/"
          className="relative shrink-0 mr-auto"
          style={{ width: "19.8vw", height: "5.2vw", maxWidth: 380, maxHeight: 100 }}
        >
          <Image
            src="/images/01 HERO SECTION logo.png"
            alt="Oscotec Inc."
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <ul className="flex items-center" style={{ gap: "4vw" }}>
          {navItems.map((item) => (
            <li key={item}>
              <Link
                href={item === "About" ? "/about" : `/#${item.toLowerCase().replace("&", "")}`}
                className="text-white font-medium leading-none whitespace-nowrap hover:opacity-70 transition-opacity duration-200"
                style={{ fontSize: "clamp(14px, 1.25vw, 24px)" }}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 페이지 타이틀 */}
      <p
        data-reveal="fade-up"
        data-delay="100"
        className="absolute left-0 right-0 text-white font-semibold text-center whitespace-nowrap"
        style={{ top: "50.3%", fontSize: "clamp(28px, 3.33vw, 64px)" }}
      >
        회사소개
      </p>

      {/* 서브 타이틀 */}
      <p
        data-reveal="fade-up"
        data-delay="200"
        className="absolute left-0 right-0 text-white text-center whitespace-nowrap"
        style={{ top: "71.8%", fontSize: "clamp(10px, 0.78vw, 15px)" }}
      >
        Precision Toward the Target  Innovation Proven by Results
      </p>

      {/* 하단 구분선 */}
      <div
        className="absolute"
        style={{ left: "8.75%", right: "8.75%", top: "95.7%", height: "1px", background: "rgba(255,255,255,0.6)" }}
      />
    </header>
  );
}
