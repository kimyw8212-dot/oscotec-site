"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function SupSection() {
  const sectionRef = useScrollReveal();
  return (
    <section ref={sectionRef as React.RefObject<HTMLDivElement>} className="snap-section relative w-full overflow-hidden bg-black" style={{ height: "100vh" }}>
      {/* 배경 이미지 */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/01-1 SUP SECTION bg.png"
          alt="DNA background"
          fill
          className="object-cover"
          priority
        />
        {/* 좌측 하단 어두운 그라디언트 (텍스트 가독성) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* 대형 인용 텍스트 — 우측 상단 */}
      <div
        className="absolute text-white text-right"
        data-reveal="fade-right"
        data-delay="100"
        style={{
          top: "9.5%",
          right: "5.8%",
          width: "74.2%",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: "clamp(36px, 5vw, 96px)",
          lineHeight: 1.25,
          whiteSpace: "pre-wrap",
          wordBreak: "keep-all",
        }}
      >
        <p>{`"표적을 향한 정밀함,`}</p>
        <p>{`결과로 증명하는 혁신"`}</p>
      </div>

      {/* 본문 텍스트 — 좌측 하단 */}
      <div
        className="absolute text-white"
        data-reveal="fade-up"
        data-delay="300"
        style={{
          bottom: "14%",
          left: "3.85%",
          width: "48.1%",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(16px, 1.875vw, 36px)",
          lineHeight: 1.6,
          wordBreak: "keep-all",
        }}
      >
        <p>글로벌 시장이 인정한 신약 상업화의 성공 DNA</p>
        <p>분자 단위의 표적 제어로 질병의 근본 원인을 타격하는</p>
        <p>기술 항암을 넘어 면역·뇌질환으로 뻗어 나가는 혁신의 지평</p>
      </div>
    </section>
  );
}
