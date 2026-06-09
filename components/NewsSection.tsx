"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const newsItems = [
  {
    id: 1,
    image: "/images/Frame 6.png",
    date: "2024.03.15",
    category: "Pipeline",
    title: "Oscotec Advances Lead Compound into Phase 1 Clinical Trial",
    description:
      "Oscotec's lead kinase inhibitor demonstrates a strong safety profile and early efficacy signals in the ongoing Phase 1 study.",
  },
  {
    id: 2,
    image: "/images/rd-left.png",
    date: "2024.02.28",
    category: "Platform",
    title: "ADC Technology Platform Delivers Promising Preclinical Results",
    description:
      "Our next-generation ADC platform achieves unprecedented precision in targeted cancer therapy, opening new therapeutic pathways.",
  },
  {
    id: 3,
    image: "/images/rd-center.png",
    date: "2024.01.20",
    category: "Partnership",
    title: "Global Strategic Partnership Established for Target Discovery",
    description:
      "Oscotec and a leading research institution announce a collaboration to accelerate novel target identification across oncology.",
  },
];

export default function NewsSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="snap-section relative w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* 배경 영상 */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/05 NEWS SECTION video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 어두운 오버레이 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* 상단 구분선 */}
      <div
        className="absolute"
        data-reveal="fade"
        data-delay="0"
        style={{
          top: "1.9%",
          left: "2.86%",
          right: "5%",
          height: "1px",
          background: "rgba(255,255,255,0.6)",
        }}
      />

      {/* NEWS 헤딩 */}
      <h2
        className="absolute text-white font-black leading-none select-none"
        data-reveal="fade-left"
        data-delay="100"
        style={{
          top: "9.5%",
          left: "5.5%",
          fontSize: "clamp(36px, 5vw, 96px)",
          letterSpacing: "-0.01em",
        }}
      >
        NEWS
      </h2>

      {/* 뉴스 카드 그리드 */}
      <div
        className="absolute flex"
        style={{
          left: "5.5%",
          right: "5.5%",
          top: "23%",
          bottom: "7%",
          gap: "2.2%",
        }}
      >
        {newsItems.map((item, i) => (
          <article
            key={item.id}
            className="relative flex-1 flex flex-col overflow-hidden cursor-pointer group"
            data-reveal="fade-up"
            data-delay={String(200 + i * 140)}
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "3px",
              background: "rgba(10,10,10,0.55)",
              backdropFilter: "blur(6px)",
              transition: "border-color 0.4s ease, background 0.4s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(197,0,14,0.6)";
              (e.currentTarget as HTMLElement).style.background =
                "rgba(20,5,5,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.14)";
              (e.currentTarget as HTMLElement).style.background =
                "rgba(10,10,10,0.55)";
            }}
          >
            {/* 썸네일 */}
            <div className="relative overflow-hidden" style={{ height: "42%" }}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="30vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)",
                }}
              />
              {/* 카테고리 배지 */}
              <span
                className="absolute text-white font-semibold select-none"
                style={{
                  top: "clamp(10px, 1.2vh, 16px)",
                  left: "clamp(10px, 1.2vw, 18px)",
                  background: "#c5000e",
                  padding: "3px 10px",
                  fontSize: "clamp(10px, 0.78vw, 13px)",
                  letterSpacing: "0.04em",
                }}
              >
                {item.category}
              </span>
            </div>

            {/* 카드 내용 */}
            <div
              className="flex flex-col flex-1"
              style={{ padding: "clamp(14px, 2vw, 28px)" }}
            >
              <p
                className="text-white select-none"
                style={{
                  fontSize: "clamp(10px, 0.8vw, 13px)",
                  opacity: 0.45,
                  marginBottom: "8px",
                  letterSpacing: "0.06em",
                }}
              >
                {item.date}
              </p>
              <h3
                className="text-white font-semibold leading-snug"
                style={{
                  fontSize: "clamp(13px, 1.15vw, 20px)",
                  marginBottom: "10px",
                  wordBreak: "keep-all",
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-white leading-relaxed flex-1"
                style={{
                  fontSize: "clamp(11px, 0.85vw, 14px)",
                  opacity: 0.55,
                  wordBreak: "keep-all",
                  lineHeight: 1.7,
                }}
              >
                {item.description}
              </p>

              {/* Read more */}
              <div
                className="flex items-center gap-2 mt-4 text-white"
                style={{ fontSize: "clamp(10px, 0.85vw, 13px)", opacity: 0.65 }}
              >
                <span style={{ letterSpacing: "0.05em" }}>READ MORE</span>
                <span
                  style={{
                    color: "#c5000e",
                    fontSize: "1.1em",
                    transition: "transform 0.3s ease",
                  }}
                  className="group-hover:translate-x-1 inline-block"
                >
                  →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
