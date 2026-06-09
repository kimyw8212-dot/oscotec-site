"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const tabs = [
  {
    id: 1,
    number: "01",
    name: "Kinase Inhibitor",
    image: "/images/02 PELINE SECTIONKinase Inhibitor img.png",
    arc: "/images/pipeline-arc-1.svg",
    description: (
      <>
        암세포의 특정 단백질을 정밀하게 표적하여
        <br />
        효과적인 항암 치료제를 개발합니다.
      </>
    ),
    imgStyle: { width: "clamp(160px, 20.1vw, 386px)", height: "clamp(160px, 20.6vw, 395px)", borderRadius: "30px" },
  },
  {
    id: 2,
    number: "02",
    name: "Target Discovery",
    image: "/images/02 PELINE SECTIONTarget Discovery img.png",
    arc: "/images/pipeline-arc-2.svg",
    description: (
      <>
        질병의 원인을 분석하고
        <br />
        새로운 치료 타겟을 발굴하는 단계입니다.
      </>
    ),
    imgStyle: { width: "clamp(180px, 23.6vw, 454px)", height: "clamp(160px, 20.6vw, 395px)", borderRadius: "4px" },
  },
  {
    id: 3,
    number: "03",
    name: "Drug Development",
    image: "/images/02 PELINE SECTION Drug Development img.png",
    arc: "/images/pipeline-arc-3.svg",
    description: (
      <>
        발굴된 타겟을 기반으로
        <br />
        안전하고 효과적인 치료제를 개발합니다.
      </>
    ),
    imgStyle: { width: "clamp(150px, 18.8vw, 361px)", height: "clamp(145px, 18.5vw, 355px)", borderRadius: "4px" },
  },
];

// 탭별 수직 위치 (Figma 기준: 353px, 541px, 714px from 1081px section)
const TAB_POSITIONS = ["32.6%", "50.0%", "66.1%"];

export default function PipelineSection() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const sectionRef = useScrollReveal();

  const switchTab = (idx: number) => {
    if (idx === active || fading) return;
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setFading(false);
    }, 220);
  };

  const current = tabs[active];

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="snap-section relative w-full overflow-hidden bg-black"
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

      {/* PIPELINE 헤딩 */}
      <h2
        data-reveal="fade-left"
        data-delay="100"
        className="absolute text-white font-black leading-none select-none"
        style={{
          top: "9.5%",
          left: "5.5%",
          fontSize: "clamp(36px, 5vw, 96px)",
          letterSpacing: "-0.01em",
        }}
      >
        PIPELINE
      </h2>

      {/* 아크 SVG 컨테이너 — 탭별 다른 모양 */}
      <div
        className="absolute pointer-events-none"
        style={{ left: "4.9%", top: "27.7%", width: "90.3%", height: "63.5%" }}
      >
        {tabs.map((tab, idx) => (
          <img
            key={tab.id}
            src={tab.arc}
            alt=""
            className="absolute inset-0 w-full h-full"
            style={{
              transition: "opacity 0.4s ease",
              opacity: idx === active ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* 좌측 이미지 */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: "11.6%",
          top: "37%",
          transition: "opacity 0.22s ease",
          opacity: fading ? 0 : 1,
          ...current.imgStyle,
        }}
      >
        <Image
          src={current.image}
          alt={current.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 20vw"
        />
      </div>

      {/* 좌측 하단 설명 텍스트 */}
      <div
        className="absolute text-white"
        style={{
          left: "10.3%",
          top: "77.7%",
          width: "37.3%",
          fontSize: "clamp(14px, 1.875vw, 36px)",
          lineHeight: 1.6,
          fontWeight: 400,
          transition: "opacity 0.22s ease",
          opacity: fading ? 0 : 1,
          wordBreak: "keep-all",
        }}
      >
        {current.description}
      </div>

      {/* 우측 탭 메뉴 */}
      <div className="absolute" style={{ right: "7.5%", top: 0, bottom: 0 }}>
        {tabs.map((tab, idx) => {
          const isActive = idx === active;
          return (
            <button
              key={tab.id}
              className="absolute flex items-baseline gap-[0.35em]"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                top: TAB_POSITIONS[idx],
                right: 0,
                transform: "translateY(-50%)",
              }}
              onMouseEnter={() => switchTab(idx)}
              onClick={() => switchTab(idx)}
            >
              <span
                style={{
                  fontSize: "clamp(11px, 1.46vw, 28px)",
                  fontWeight: 600,
                  color: isActive ? "#c5000e" : "rgba(255,255,255,0.5)",
                  transition: "color 0.35s ease",
                  lineHeight: 1,
                  alignSelf: "flex-start",
                  marginTop: "0.12em",
                }}
              >
                {tab.number}
              </span>
              <span
                style={{
                  fontSize: "clamp(18px, 2.5vw, 48px)",
                  fontWeight: 600,
                  color: isActive ? "#c5000e" : "rgba(255,255,255,0.85)",
                  transition: "color 0.35s ease",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {tab.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
