"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const panels = [
  { id: 0, label: ["Target", "Discovery"] },
  { id: 1, label: ["Lead", "Optimization"] },
  { id: 2, label: ["Preclinical", "Development"] },
];

export default function RDSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="snap-section relative w-full overflow-hidden bg-black"
      style={{ height: "100vh" }}
    >
      {/* ── 단일 파노라마 배경 ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/R&D.png")',
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* R&D 헤딩 */}
      <h2
        data-reveal="fade-left"
        data-delay="100"
        className="absolute text-white font-semibold leading-none select-none z-10"
        style={{
          top: "7.35%",
          left: "7.66%",
          fontSize: "clamp(32px, 5vw, 96px)",
        }}
      >
        R&amp;D
      </h2>

      {/* ── 3분할 패널 오버레이 ── */}
      <div className="absolute inset-0 flex">
        {panels.map((panel, idx) => {
          const isHovered = hovered === idx;
          const isOther = hovered !== null && hovered !== idx;

          return (
            <div
              key={panel.id}
              className="relative overflow-hidden cursor-pointer"
              style={{
                width: isHovered ? "50%" : isOther ? "25%" : "33.333%",
                transition: "width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                flexShrink: 0,
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* 그라디언트 오버레이 — 호버 시 밝아짐 */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.08) 70%, transparent 100%)",
                  opacity: isHovered ? 0.55 : 1,
                  transition: "opacity 0.6s ease",
                }}
              />

              {/* 우측 구분선 (마지막 패널 제외) */}
              {idx < 2 && (
                <div
                  className="absolute top-0 right-0 w-px h-full pointer-events-none z-10"
                  style={{ background: "rgba(255,255,255,0.28)" }}
                />
              )}

              {/* 패널 텍스트 레이블 — 우하단 */}
              <div
                className="absolute text-white text-right select-none pointer-events-none z-10"
                style={{
                  bottom: "clamp(16px, 4.6vh, 50px)",
                  right: "clamp(12px, 2.5vw, 48px)",
                  fontWeight: 600,
                  fontSize: "clamp(18px, 2.5vw, 48px)",
                  lineHeight: 1.2,
                  transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                  transition: "transform 0.5s ease, opacity 0.5s ease",
                  opacity: isHovered ? 1 : 0.8,
                }}
              >
                {panel.label.map((line, i) => (
                  <p key={i} className="m-0">
                    {line}
                  </p>
                ))}
              </div>

              {/* 호버 시 하단 강조선 */}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
                style={{
                  height: "3px",
                  background: "#c5000e",
                  transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin:
                    idx === 0 ? "left" : idx === 2 ? "right" : "center",
                  transition:
                    "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
