"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutHeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLDivElement>(null);
  const supVideoRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const headerOverlayRef = useRef<HTMLDivElement>(null);
  const targetdRef = useRef<HTMLDivElement>(null);
  const adcRef = useRef<HTMLDivElement>(null);
  const drugRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(sloganRef.current, { yPercent: -50, transformOrigin: "center center" });
    gsap.set(heroVideoRef.current, { opacity: 1, scale: 1, transformOrigin: "center center" });
    gsap.set(supVideoRef.current, { y: "100vh" });
    gsap.set(shapeRef.current, { y: "100vh" });
    gsap.set(imageBoxRef.current, {
      opacity: 0,
      width: "11.64vw",
      height: "11.44vh",
      borderRadius: "2.76vw",
    });
    gsap.set(descRef.current, { opacity: 0, y: "2vh" });
    gsap.set(headerOverlayRef.current, { opacity: 0, y: "2vh" });
    gsap.set(targetdRef.current, { y: "100vh" });
    gsap.set(adcRef.current, { y: "100vh" });
    gsap.set(drugRef.current, { y: "100vh" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        scroller: "#scroll-root",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    // Phase 1 — HERO_VISUAL이 사라지고 sup_VISUAL이 올라오며 슬로건이 좌상단으로 이동
    tl.to(sloganRef.current, { x: "-28vw", y: "-32vh", scale: 0.55, ease: "power2.inOut", duration: 0.18 }, 0)
      .to(heroVideoRef.current, { opacity: 0, scale: 0.85, ease: "power2.inOut", duration: 0.18 }, 0)
      .to(supVideoRef.current, { y: 0, ease: "power2.out", duration: 0.18 }, 0.02)
      // Phase 2 — 슬로건+sup_VISUAL이 자리잡은 화면 위로 블러가 천천히 올라와 화면을 덮고,
      // 블러가 다 올라온 뒤 ONCOLOGY 이미지가 쭉 이어서 커져 화면을 꽉 채운 뒤, 콘텐츠가 자연스럽게 나타남
      .to(shapeRef.current, { y: "0%", ease: "power2.out", duration: 0.08 }, 0.2)
      .set(imageBoxRef.current, { opacity: 1 }, 0.28)
      .to(
        imageBoxRef.current,
        { width: "100vw", height: "100vh", borderRadius: "0px", ease: "power2.inOut", duration: 0.08 },
        0.28
      )
      .to([descRef.current, headerOverlayRef.current], { opacity: 1, y: 0, ease: "power1.out", duration: 0.04 }, 0.36)
      // Phase 3 — TARGETD THERAPY → ADC PLATTFORM → DRUG DISCOVERY 카드가 순서대로
      // 화면 아래에서 위로 스르륵 올라오며 이전 카드를 덮음
      .to(targetdRef.current, { y: "0%", ease: "power2.inOut", duration: 0.2 }, 0.4)
      .to(adcRef.current, { y: "0%", ease: "power2.inOut", duration: 0.2 }, 0.6)
      .to(drugRef.current, { y: "0%", ease: "power2.inOut", duration: 0.2 }, 0.8);

    // 구간(화면) 단위 스냅 스크롤 — 한 번 스크롤하면 다음/이전 화면으로 슥 전환
    const root = document.getElementById("scroll-root");
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let busy = false;

    const animateScrollTo = (target: number, ms = 500) => {
      if (!root) return;
      const from = root.scrollTop;
      const dist = target - from;
      if (Math.abs(dist) < 1) return;
      busy = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / ms, 1);
        root.scrollTop = from + dist * easeInOutCubic(p);
        if (p < 1) requestAnimationFrame(tick);
        else setTimeout(() => { busy = false; }, 100);
      };
      requestAnimationFrame(tick);
    };

    // 카드 구간(ONCOLOGY~DRUG)은 화면 단위로 딱딱 스냅
    const getSnapPoints = () => {
      const wrapperTop = wrapperRef.current?.offsetTop ?? 0;
      const vh = window.innerHeight;
      return [wrapperTop + 2 * vh, wrapperTop + 3 * vh, wrapperTop + 4 * vh, wrapperTop + 5 * vh];
    };

    // 03.SCIENTIFIC APPROACH 구간 — 카드(2,3,4)가 한 장씩 쌓이는 지점마다 딱딱 스냅
    const getSciSnapPoints = () => {
      const sciWrapper = document.querySelector<HTMLElement>(".sci-wrapper");
      if (!sciWrapper) return [];
      const top = sciWrapper.offsetTop;
      const vh = window.innerHeight;
      return [top, top + vh, top + 2 * vh, top + 3 * vh];
    };

    const findNearestIdx = (snapPoints: number[], current: number) => {
      let idx = 0;
      let bestD = Infinity;
      snapPoints.forEach((p, i) => {
        const d = Math.abs(p - current);
        if (d < bestD) { bestD = d; idx = i; }
      });
      return idx;
    };

    const onWheel = (e: WheelEvent) => {
      if (!root) return;
      if (busy) { e.preventDefault(); return; }

      const wrapperTop = wrapperRef.current?.offsetTop ?? 0;
      const snapPoints = getSnapPoints();
      const sciSnapPoints = getSciSnapPoints();
      const freeZoneStart = snapPoints[0];
      const freeZoneEnd = wrapperTop;
      const current = root.scrollTop;
      const down = e.deltaY > 0;
      const dir = down ? 1 : -1;

      // 최상단: AboutNav <-> 메인 영상+슬로건 화면 — 딱딱 스냅
      if (current <= freeZoneEnd + 0.5) {
        const topPoints = [0, freeZoneEnd];
        const idx = findNearestIdx(topPoints, current);
        const next = idx + dir;
        if (next < 0 || next >= topPoints.length) return;
        e.preventDefault();
        animateScrollTo(topPoints[next]);
        return;
      }

      // 영상 → 블러 → ONCOLOGY 확대 구간은 전처럼 자유 스크롤, 양 끝 경계에서만 정지
      if (current < freeZoneStart - 0.5) {
        if (down && current + e.deltaY > freeZoneStart) {
          e.preventDefault();
          animateScrollTo(freeZoneStart);
        } else if (!down && current + e.deltaY < freeZoneEnd) {
          e.preventDefault();
          animateScrollTo(freeZoneEnd);
        }
        return;
      }

      // 03.SCIENTIFIC APPROACH 카드 구간 — 화면 단위로 딱딱 스냅
      if (sciSnapPoints.length && current >= sciSnapPoints[0] - 0.5) {
        const idx = findNearestIdx(sciSnapPoints, current);
        const next = idx + dir;
        if (next < 0) {
          // 첫 화면(1 Discovery)에서 위로 → DRUG DISCOVERY로 복귀
          e.preventDefault();
          animateScrollTo(snapPoints[snapPoints.length - 1]);
          return;
        }
        if (next >= sciSnapPoints.length) return; // 마지막 화면 — 자연 스크롤에 맡김
        e.preventDefault();
        animateScrollTo(sciSnapPoints[next]);
        return;
      }

      // ONCOLOGY/TARGETD/ADC/DRUG 카드 구간 — 딱딱 스냅
      const idx = findNearestIdx(snapPoints, current);
      const next = idx + dir;
      if (next < 0) return; // 자유 스크롤 구간으로 복귀

      e.preventDefault();
      if (next >= snapPoints.length) {
        // DRUG DISCOVERY → 자연스럽게 03.SCIENTIFIC APPROACH로 전환
        if (down && sciSnapPoints.length) animateScrollTo(sciSnapPoints[0]);
        return;
      }
      animateScrollTo(snapPoints[next]);
    };

    let touchY0 = 0;
    const onTouchStart = (e: TouchEvent) => { touchY0 = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (busy || !root) return;
      const dy = touchY0 - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;

      const wrapperTop = wrapperRef.current?.offsetTop ?? 0;
      const snapPoints = getSnapPoints();
      const sciSnapPoints = getSciSnapPoints();
      const freeZoneStart = snapPoints[0];
      const freeZoneEnd = wrapperTop;
      const current = root.scrollTop;
      const dir = dy > 0 ? 1 : -1;

      if (current <= freeZoneEnd + 0.5) {
        const topPoints = [0, freeZoneEnd];
        const idx = findNearestIdx(topPoints, current);
        const next = idx + dir;
        if (next < 0 || next >= topPoints.length) return;
        animateScrollTo(topPoints[next]);
        return;
      }

      if (current < freeZoneStart - 0.5) return;

      // 03.SCIENTIFIC APPROACH 카드 구간 — 화면 단위로 딱딱 스냅
      if (sciSnapPoints.length && current >= sciSnapPoints[0] - 0.5) {
        const idx = findNearestIdx(sciSnapPoints, current);
        const next = idx + dir;
        if (next < 0) {
          animateScrollTo(snapPoints[snapPoints.length - 1]);
          return;
        }
        if (next >= sciSnapPoints.length) return;
        animateScrollTo(sciSnapPoints[next]);
        return;
      }

      const idx = findNearestIdx(snapPoints, current);
      const next = idx + dir;
      if (next < 0) return;
      if (next >= snapPoints.length) {
        if (dir > 0 && sciSnapPoints.length) animateScrollTo(sciSnapPoints[0]);
        return;
      }
      animateScrollTo(snapPoints[next]);
    };

    root?.addEventListener("wheel", onWheel, { passive: false });
    root?.addEventListener("touchstart", onTouchStart, { passive: true });
    root?.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      root?.removeEventListener("wheel", onWheel);
      root?.removeEventListener("touchstart", onTouchStart);
      root?.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full bg-black" style={{ height: "600vh" }}>
      <div className="sticky top-0 left-0 w-full overflow-hidden bg-black" style={{ height: "100vh" }}>
        {/* HERO_VISUAL — 처음부터 슬로건과 함께 중앙에 위치, 스크롤 시 사라짐 */}
        <div
          ref={heroVideoRef}
          className="absolute overflow-hidden"
          style={{
            left: "10.31%",
            top: "5.93%",
            width: "74.375%",
            height: "88.15%",
            zIndex: 1,
          }}
        >
          <video
            className="absolute inset-0 w-full h-full object-contain"
            src="/video/HERO_VISUAL.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* 슬로건 — 처음엔 화면 정중앙, 스크롤 시 좌상단으로 이동하며 축소된 뒤 고정 */}
        <div
          ref={sloganRef}
          className="absolute left-0 right-0 text-white text-center font-semibold"
          style={{
            top: "50%",
            fontSize: "clamp(36px, 5vw, 96px)",
            lineHeight: 1.25,
            whiteSpace: "nowrap",
            zIndex: 2,
          }}
        >
          <p className="m-0">{`"표적을 향한 정밀함,`}</p>
          <p className="m-0">{`결과로 증명하는 혁신"`}</p>
        </div>

        {/* sup_VISUAL — 화면 아래에서 위로 올라와 슬로건을 덮으며 자리잡음 */}
        <div
          ref={supVideoRef}
          className="absolute overflow-hidden"
          style={{
            left: "33.39%",
            top: "10%",
            width: "31.93%",
            height: "79.07%",
            borderRadius: "clamp(16px, 2.76vw, 53px)",
            zIndex: 3,
          }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/video/sup%20_VISUAL.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* 투명 도형 — 슬로건+sup_VISUAL이 자리잡은 화면 위로 빠르게 올라오며 블러 처리 */}
        <div
          ref={shapeRef}
          className="absolute inset-0"
          style={{
            zIndex: 4,
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
          }}
        />

        {/* ONCOLOGY 프레임 — 블러가 올라온 뒤 화면 중앙에서 점점 커짐 */}
        <div
          ref={imageBoxRef}
          className="absolute overflow-hidden"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "clamp(16px, 2.76vw, 53px)",
            zIndex: 5,
          }}
        >
          <img
            src="/images/ONCOLOGY.png"
            alt="ONCOLOGY"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* 02.CORE RESEARCH AREAS - ONCOLOGY 콘텐츠 — 화면을 꽉 채운 뒤 자연스럽게 페이드인 */}
          <div ref={descRef} className="absolute inset-0">
            <p
              className="absolute m-0 text-white font-bold whitespace-nowrap"
              style={{ left: "39.27vw", top: "67vh", fontSize: "10.42vw" }}
            >
              ONCOLOGY
            </p>
            <div
              className="absolute text-white text-right whitespace-nowrap font-normal"
              style={{ right: "6.82vw", top: "55vh", fontSize: "2.08vw", lineHeight: 1.625 }}
            >
              <p className="m-0">{`혁신적인 암 치료제 연구를 통해 `}</p>
              <p className="m-0">복잡한 암 질환의 새로운 가능성을 탐구합니다.</p>
            </div>
          </div>
        </div>

        {/* TARGETD THERAPY 프레임 — 화면 아래에서 위로 스르륵 올라오며 ONCOLOGY를 덮음 */}
        <div ref={targetdRef} className="absolute inset-0 overflow-hidden" style={{ zIndex: 6 }}>
          <img
            src="/images/TARGETD%20THERAPY.png"
            alt="TARGETD THERAPY"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <p
            className="absolute m-0 text-white font-bold whitespace-nowrap"
            style={{ left: "8.23vw", top: "67vh", fontSize: "9.375vw" }}
          >
            TARGETD THERAPY
          </p>
          <div
            className="absolute text-white text-right whitespace-nowrap font-normal"
            style={{ right: "6.82vw", top: "55vh", fontSize: "2.08vw", lineHeight: 1.625 }}
          >
            <p className="m-0">{`표적 기반 치료 기술로 `}</p>
            <p className="m-0">치료 효율과 정확성을 향상시킵니다.</p>
          </div>
        </div>

        {/* ADC PLATTFORM 프레임 — TARGETD THERAPY 위로 스르륵 올라오며 덮음 */}
        <div ref={adcRef} className="absolute inset-0 overflow-hidden" style={{ zIndex: 7 }}>
          <img
            src="/images/ADC%20PLATTFORM.png"
            alt="ADC PLATTFORM"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <p
            className="absolute m-0 text-white font-bold whitespace-nowrap"
            style={{ left: "10.10vw", top: "67vh", fontSize: "10.42vw" }}
          >
            ADC PLATTFORM
          </p>
          <div
            className="absolute text-white text-right whitespace-nowrap font-normal"
            style={{ right: "6.82vw", top: "55vh", fontSize: "2.08vw", lineHeight: 1.625 }}
          >
            <p className="m-0">{`항체 기반 전달 플랫폼으로 `}</p>
            <p className="m-0">선택적 치료 기술을 개발합니다.</p>
          </div>
        </div>

        {/* DRUG DISCOVERY 프레임 — ADC PLATTFORM 위로 스르륵 올라오며 덮음 */}
        <div ref={drugRef} className="absolute inset-0 overflow-hidden" style={{ zIndex: 8 }}>
          <img
            src="/images/DRUG%20DISCOVERY.png"
            alt="DRUG DISCOVERY"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <p
            className="absolute m-0 text-white font-bold whitespace-nowrap"
            style={{ left: "6.51vw", top: "67vh", fontSize: "10.42vw" }}
          >
            DRUG DISCOVERY
          </p>
          <div
            className="absolute text-white text-right whitespace-nowrap font-normal"
            style={{ right: "6.82vw", top: "55vh", fontSize: "2.08vw", lineHeight: 1.625 }}
          >
            <p className="m-0">{`신약 발굴과 연구 프로세스를 통해 `}</p>
            <p className="m-0">미래 치료제 개발을 가속화합니다.</p>
          </div>
        </div>

        {/* 공통 헤더 — CORE RESEARCH AREAS 라벨 + VIEW 버튼, 모든 카드 위에 한 번만 표시되어 전환 시 따라 올라오지 않음 */}
        <div ref={headerOverlayRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 9 }}>
          <p
            className="absolute m-0 text-white font-bold whitespace-nowrap"
            style={{ left: "5.36vw", top: "7.31vh", fontSize: "3.33vw" }}
          >
            CORE RESEARCH AREAS
          </p>
          <div
            className="absolute flex items-center justify-center text-white border border-white font-normal"
            style={{
              left: "84.58vw",
              top: "50vh",
              width: "8.59vw",
              height: "5.19vh",
              borderRadius: "999px",
              fontSize: "1.67vw",
            }}
          >
            VIEW
          </div>
        </div>
      </div>
    </div>
  );
}
