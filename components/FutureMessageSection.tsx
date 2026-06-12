"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const GAP = "3.91vw";
const IMG_HEIGHT = "37.04vh";

const IMAGES = [
  { src: "/images/FUTURE MESSAGE img1.png", width: "30.89vw" },
  { src: "/images/FUTURE MESSAGE img2.png", width: "30.89vw" },
  { src: "/images/FUTURE MESSAGE img4.png", width: "20.83vw", round: true },
  { src: "/images/FUTURE MESSAGE img3.png", width: "30.89vw" },
];

export default function FutureMessageSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative w-full overflow-hidden bg-[#060606]"
      style={{ height: "100vh" }}
    >
      {/* 헤딩 */}
      <h2
        data-reveal="fade-left"
        data-delay="100"
        className="absolute text-white font-bold"
        style={{ left: "8.18vw", top: "16.85vh", fontSize: "clamp(40px, 6.67vw, 128px)", lineHeight: 1.05 }}
      >
        <span className="block">Engineering the Future</span>
        <span className="block">of Precision Therapeutics</span>
      </h2>

      {/* 자동으로 오른쪽으로 흐르는 이미지 트랙 — 시퀀스를 2번 이어붙여 무한 루프 */}
      <div
        className="absolute flex"
        style={{
          left: 0,
          top: "39.07vh",
          height: IMG_HEIGHT,
          width: "max-content",
          animation: "futureMarqueeRight 40s linear infinite",
        }}
      >
        {[...IMAGES, ...IMAGES].map((img, i) => (
          <div
            key={i}
            className="shrink-0 overflow-hidden"
            style={{
              width: img.width,
              height: IMG_HEIGHT,
              marginRight: GAP,
              borderRadius: img.round ? "50%" : 0,
            }}
          >
            <img src={img.src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
