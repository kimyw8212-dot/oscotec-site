"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARD_LEFT = "43.91vw";
const CARD_WIDTH = "49.32vw";
const CARD_HEIGHT = "53.52vh";
const CARD_TOP_VH = [6.76, 18.06, 28.61, 39.54];

const CARDS = [
  {
    title: "1 Discovery",
    desc: ["새로운 치료 가능성을 발견하고", "핵심 연구 타겟을 분석합니다."],
    image: "/images/1 Discovery.png",
  },
  {
    title: "2 Molecular Analysis",
    desc: ["분자 구조와 상호작용 분석을 기반으로", "정밀 치료 메커니즘을 연구합니다."],
    image: "/images/2 Molecular Analysis.png",
  },
  {
    title: "3 Optimization",
    desc: ["실험 기반 최적화 과정을 통해", "치료제의 안정성과 효율을 향상시킵니다."],
    image: "/images/3 Optimization.png",
  },
  {
    title: "4 Preclinical Research",
    desc: ["전임상 연구와 데이터 검증을 통해", "치료 가능성과 안전성을 평가합니다."],
    image: "/images/4 Preclinical Research.png",
  },
];

export default function ScientificApproachSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const card2WrapRef = useRef<HTMLDivElement>(null);
  const card3WrapRef = useRef<HTMLDivElement>(null);
  const card4WrapRef = useRef<HTMLDivElement>(null);
  const card1ImgRef = useRef<HTMLImageElement>(null);
  const card1DescRef = useRef<HTMLDivElement>(null);
  const card2ImgRef = useRef<HTMLImageElement>(null);
  const card2DescRef = useRef<HTMLDivElement>(null);
  const card3DescRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(card2WrapRef.current, { y: "100vh" });
    gsap.set(card3WrapRef.current, { y: "100vh" });
    gsap.set(card4WrapRef.current, { y: "100vh" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        scroller: "#scroll-root",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    const seg = 1 / 3;

    // 2 Molecular Analysis가 올라와 1 Discovery 위로 쌓임
    tl.to(card2WrapRef.current, { y: "0%", ease: "power2.inOut", duration: seg }, 0)
      .to(card1ImgRef.current, { opacity: 0.38, ease: "none", duration: seg }, 0)
      .to(card1DescRef.current, { opacity: 0, ease: "none", duration: seg }, 0)
      // 3 Optimization이 올라와 2 Molecular Analysis 위로 쌓임
      .to(card3WrapRef.current, { y: "0%", ease: "power2.inOut", duration: seg }, seg)
      .to(card2ImgRef.current, { opacity: 0.77, ease: "none", duration: seg }, seg)
      .to(card2DescRef.current, { opacity: 0, ease: "none", duration: seg }, seg)
      // 4 Preclinical Research가 올라와 3 Optimization 위로 쌓임
      .to(card4WrapRef.current, { y: "0%", ease: "power2.inOut", duration: seg }, seg * 2)
      .to(card3DescRef.current, { opacity: 0, ease: "none", duration: seg }, seg * 2);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="sci-wrapper relative w-full bg-[#060606]" style={{ height: "400vh" }}>
      <div className="sticky top-0 left-0 w-full overflow-hidden bg-[#060606]" style={{ height: "100vh" }}>
        {/* SCIENTIFIC APPROACH 헤딩 — 스크롤 내내 위치 고정 */}
        <h2
          className="absolute text-white font-bold"
          style={{ left: "5.05vw", top: "22.78vh", fontSize: "clamp(32px, 5vw, 96px)", lineHeight: 1.05, zIndex: 10 }}
        >
          <span className="block">SCIENTIFIC</span>
          <span className="block">APPROACH</span>
        </h2>

        {/* 1 Discovery — 항상 제자리, 이후 카드들이 위로 쌓이며 덮음 */}
        <div
          className="absolute overflow-hidden bg-black"
          style={{ left: CARD_LEFT, top: `${CARD_TOP_VH[0]}vh`, width: CARD_WIDTH, height: CARD_HEIGHT, zIndex: 1 }}
        >
          <img
            ref={card1ImgRef}
            src={CARDS[0].image}
            alt={CARDS[0].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <p className="absolute m-0 text-white font-bold" style={{ left: "4.44%", top: "4.2%", fontSize: "clamp(20px, 2.5vw, 48px)" }}>
            {CARDS[0].title}
          </p>
          <div
            ref={card1DescRef}
            className="absolute font-normal text-white"
            style={{ left: "4.44%", top: "78%", fontSize: "clamp(14px, 1.667vw, 32px)", lineHeight: 1.625 }}
          >
            {CARDS[0].desc.map((line, idx) => (
              <p key={idx} className="m-0">{line}</p>
            ))}
          </div>
        </div>

        {/* 2 Molecular Analysis — 스크롤 시 아래에서 올라와 1 위에 쌓임 */}
        <div
          ref={card2WrapRef}
          className="absolute overflow-hidden bg-black"
          style={{ left: CARD_LEFT, top: `${CARD_TOP_VH[1]}vh`, width: CARD_WIDTH, height: CARD_HEIGHT, zIndex: 2 }}
        >
          <img
            ref={card2ImgRef}
            src={CARDS[1].image}
            alt={CARDS[1].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <p className="absolute m-0 text-white font-bold" style={{ left: "4.44%", top: "4.2%", fontSize: "clamp(20px, 2.5vw, 48px)" }}>
            {CARDS[1].title}
          </p>
          <div
            ref={card2DescRef}
            className="absolute font-normal text-white"
            style={{ left: "4.44%", top: "78%", fontSize: "clamp(14px, 1.667vw, 32px)", lineHeight: 1.625 }}
          >
            {CARDS[1].desc.map((line, idx) => (
              <p key={idx} className="m-0">{line}</p>
            ))}
          </div>
        </div>

        {/* 3 Optimization — 스크롤 시 아래에서 올라와 2 위에 쌓임 */}
        <div
          ref={card3WrapRef}
          className="absolute overflow-hidden bg-black"
          style={{ left: CARD_LEFT, top: `${CARD_TOP_VH[2]}vh`, width: CARD_WIDTH, height: CARD_HEIGHT, zIndex: 3 }}
        >
          <img
            src={CARDS[2].image}
            alt={CARDS[2].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <p className="absolute m-0 text-white font-bold" style={{ left: "4.44%", top: "4.2%", fontSize: "clamp(20px, 2.5vw, 48px)" }}>
            {CARDS[2].title}
          </p>
          <div
            ref={card3DescRef}
            className="absolute font-normal text-white"
            style={{ left: "4.44%", top: "78%", fontSize: "clamp(14px, 1.667vw, 32px)", lineHeight: 1.625 }}
          >
            {CARDS[2].desc.map((line, idx) => (
              <p key={idx} className="m-0">{line}</p>
            ))}
          </div>
        </div>

        {/* 4 Preclinical Research — 스크롤 시 아래에서 올라와 3 위에 쌓임 */}
        <div
          ref={card4WrapRef}
          className="absolute overflow-hidden bg-black"
          style={{ left: CARD_LEFT, top: `${CARD_TOP_VH[3]}vh`, width: CARD_WIDTH, height: CARD_HEIGHT, zIndex: 4 }}
        >
          <img
            src={CARDS[3].image}
            alt={CARDS[3].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <p className="absolute m-0 text-white font-bold" style={{ left: "4.44%", top: "4.2%", fontSize: "clamp(20px, 2.5vw, 48px)" }}>
            {CARDS[3].title}
          </p>
          <div
            className="absolute font-normal text-white"
            style={{ left: "4.44%", top: "78%", fontSize: "clamp(14px, 1.667vw, 32px)", lineHeight: 1.625 }}
          >
            {CARDS[3].desc.map((line, idx) => (
              <p key={idx} className="m-0">{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
