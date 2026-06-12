"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ───── 슬라이드 데이터 ───── */
const slides = [
  {
    id: 1,
    label: "I",
    title: "ADC Technology",
    subtitle: '"Engineering Precision in Targeted Innovation"',
    image: "/images/03 PLATFROM ADC Technology img.png",
    ellipse: "/images/platform-ellipse-1.svg",
    imgW: "clamp(180px, 23.65vw, 454px)",
    imgH: "clamp(150px, 22vw, 422px)",
    imgOffsetX: "0vw",
  },
  {
    id: 2,
    label: "2",
    title: "Targeted Innovation",
    subtitle: "Advancing next-generation therapies through targeted innovation.",
    image: "/images/03 PLATFROM Targeted Innovation img.png",
    ellipse: "/images/platform-ellipse-2.svg",
    imgW: "clamp(150px, 19.4vw, 372px)",
    imgH: "clamp(150px, 19.3vw, 370px)",
    imgOffsetX: "0vw",
  },
  {
    id: 3,
    label: "3",
    title: "Precision Therapeutics",
    subtitle: "Innovative therapeutics driven by precision bioengineering.",
    image: "/images/03 PLATFROM Precision Therapeutics img.png",
    ellipse: "/images/platform-ellipse-2.svg",
    imgW: "clamp(180px, 25.3vw, 486px)",
    imgH: "clamp(150px, 19.3vw, 370px)",
    imgOffsetX: "3vw",
  },
];

/* ───── 원형 버튼 ───── */
function CircleBtn({
  label,
  onClick,
  style,
}: {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      className="absolute flex items-center justify-center"
      style={{
        width: "clamp(44px, 3.85vw, 74px)",
        height: "clamp(44px, 3.85vw, 74px)",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        zIndex: 10,
        ...style,
      }}
    >
      {/* 원형 SVG 배경 */}
      <img
        src="/images/platform-button.svg"
        alt=""
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <span
        className="relative text-white font-light select-none"
        style={{ fontSize: "clamp(14px, 1.67vw, 32px)", lineHeight: 1 }}
      >
        {label}
      </span>
    </button>
  );
}

/* ───── 메인 섹션 ───── */
type AnimPhase = "idle" | "out" | "in";

export default function PlatformSection() {
  const [active, setActive] = useState(0);
  const [animPhase, setAnimPhase] = useState<AnimPhase>("idle");
  const [direction, setDirection] = useState<1 | -1>(1);
  const sectionRef = useScrollReveal();

  const navigate = useCallback(
    (toIdx: number) => {
      if (animPhase !== "idle") return;
      const dir: 1 | -1 = toIdx > active ? 1 : -1;
      setDirection(dir);
      setAnimPhase("out");

      setTimeout(() => {
        setActive(toIdx);
        setAnimPhase("in");
        setTimeout(() => setAnimPhase("idle"), 420);
      }, 340);
    },
    [active, animPhase]
  );

  const current = slides[active];

  /* 콘텐츠 애니메이션 스타일 */
  const contentAnim: React.CSSProperties = (() => {
    if (animPhase === "out")
      return {
        animation: `${
          direction === 1 ? "platformRotateOutRight" : "platformRotateOutLeft"
        } 0.34s ease forwards`,
      };
    if (animPhase === "in")
      return {
        animation: `${
          direction === 1 ? "platformRotateInRight" : "platformRotateInLeft"
        } 0.42s ease forwards`,
      };
    return { opacity: 1, transform: "perspective(1000px) rotateY(0deg)" };
  })();

  /* 버튼 배치: 상태별로 어떤 버튼이 어디에 있는지 */
  const prevIdx = (active - 1 + 3) % 3;
  const nextIdx = (active + 1) % 3;

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="snap-section relative w-full bg-black overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* 상단 구분선 */}
      <div
        className="absolute"
        style={{
          top: "1.9%",
          left: "2.86%",
          right: "5%",
          height: "1px",
          background: "rgba(255,255,255,0.6)",
        }}
      />

      {/* PLATFROM 헤딩 */}
      <h2
        data-reveal="fade-left"
        data-delay="100"
        className="absolute text-white font-semibold leading-none select-none"
        style={{
          top: "7.87%",
          left: "7.66%",
          fontSize: "clamp(32px, 5vw, 96px)",
        }}
      >
        PLATFROM
      </h2>

      {/* 배경 타원 호 (슬라이드별 페이드 전환) */}
      {slides.map((s, i) => (
        <img
          key={s.id}
          src={s.ellipse}
          alt=""
          className="absolute pointer-events-none"
          style={{
            left: "7.98%",
            top: "33.8%",
            width: "84.67%",
            height: "66.5%",
            transition: "opacity 0.4s ease",
            opacity: i === active ? 1 : 0,
          }}
        />
      ))}

      {/* ── 애니메이션 콘텐츠 영역 ── */}
      <div
        className="absolute inset-0 flex flex-col items-center"
        style={contentAnim}
      >
        {/* 이미지 */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: "19.5%",
            left: `calc(50% + ${current.imgOffsetX})`,
            transform: "translateX(-50%)",
            width: current.imgW,
            height: current.imgH,
          }}
        >
          <Image
            src={current.image}
            alt={current.title}
            fill
            className="object-contain"
            sizes="25vw"
            priority
          />
        </div>

        {/* 수직 구분선 */}
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "59.4%",
            transform: "translateX(-50%)",
            width: "1px",
            height: "clamp(60px, 6.35vw, 122px)",
            background: "rgba(255,255,255,0.7)",
          }}
        />

        {/* 제목 */}
        <p
          className="absolute text-center font-medium leading-tight"
          style={{
            top: "73.6%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "clamp(24px, 3.33vw, 64px)",
            color: "#c5000e",
            whiteSpace: "nowrap",
          }}
        >
          {current.title}
        </p>

        {/* 부제 */}
        <p
          className="absolute text-center font-light leading-snug"
          style={{
            top: "82.4%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "clamp(260px, 31.7vw, 609px)",
            fontSize: "clamp(13px, 1.875vw, 36px)",
            color: "#ff5a5f",
          }}
        >
          {current.subtitle}
        </p>
      </div>

      {/* ── 버튼 배치 ──
          Figma 기준:
          - 상단 중앙: 현재 슬라이드 번호 (top 6.4%, x 50%)
          - 좌측 하단: 이전 번호 (top 84.5%, left 2.8%) — slide 0일 때 없음
          - 우측 하단: 다음 번호 (top 84.5%, right 2.8%) — slide 2에서 loop "I"
      ── */}

      {/* 상단 중앙 — 현재 번호 (표시용) */}
      <CircleBtn
        label={current.label}
        onClick={() => {}}
        style={{
          top: "6.4%",
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "default",
          opacity: 0.9,
        }}
      />

      {/* 왼쪽 — slide 1,2 일 때만 표시 */}
      {active > 0 && (
        <CircleBtn
          label={slides[prevIdx].label}
          onClick={() => navigate(prevIdx)}
          style={{ top: "84.5%", left: "2.8%" }}
        />
      )}

      {/* 오른쪽 — 항상 표시 (slide 2에서는 루프로 slide 0) */}
      <CircleBtn
        label={slides[nextIdx].label}
        onClick={() => navigate(nextIdx)}
        style={{ top: "84.5%", right: "2.8%", left: "auto" }}
      />
    </section>
  );
}
