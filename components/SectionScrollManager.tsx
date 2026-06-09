"use client";

import { useEffect } from "react";

/* easeInOutCubic — 부드럽게 가속·감속 */
function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateTo(el: HTMLElement, target: number, ms = 700): Promise<void> {
  return new Promise((resolve) => {
    const from = el.scrollTop;
    const dist = target - from;
    if (Math.abs(dist) < 1) { resolve(); return; }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / ms, 1);
      el.scrollTop = from + dist * ease(p);
      p < 1 ? requestAnimationFrame(tick) : resolve();
    };
    requestAnimationFrame(tick);
  });
}

export default function SectionScrollManager() {
  useEffect(() => {
    const root = document.getElementById("scroll-root");
    if (!root) return;

    const getSections = () =>
      Array.from(root.querySelectorAll<HTMLElement>(".snap-section"));

    let busy = false;

    /* 현재 가장 가까운 섹션 인덱스 */
    const nearestIdx = () => {
      const ss = getSections();
      const mid = root.scrollTop + root.clientHeight / 2;
      let best = 0, bestD = Infinity;
      ss.forEach((s, i) => {
        const d = Math.abs(s.offsetTop + s.clientHeight / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      return best;
    };

    /* 마지막 섹션을 넘어선 영역(Footer)인지 */
    const inFooter = () => {
      const ss = getSections();
      if (!ss.length) return false;
      const last = ss[ss.length - 1];
      return root.scrollTop >= last.offsetTop + last.clientHeight - 10;
    };

    const go = (dir: 1 | -1) => {
      if (busy) return;
      const ss = getSections();
      const next = nearestIdx() + dir;
      if (next < 0 || next >= ss.length) return;
      busy = true;
      animateTo(root, ss[next].offsetTop, 700).then(() => {
        setTimeout(() => { busy = false; }, 60);
      });
    };

    const onWheel = (e: WheelEvent) => {
      const ss = getSections();
      const idx = nearestIdx();
      const down = e.deltaY > 0;

      /* NEWS → Footer: 마지막 섹션에서 아래로 → 자연 스크롤 허용 */
      if (down && idx === ss.length - 1) return;

      /* Footer에서 위로 → 마지막 섹션으로 복귀 */
      if (!down && inFooter()) {
        e.preventDefault();
        if (!busy) {
          busy = true;
          animateTo(root, ss[ss.length - 1].offsetTop, 700).then(() => {
            setTimeout(() => { busy = false; }, 60);
          });
        }
        return;
      }

      /* Footer 내부에서 더 아래로 스크롤 → 자연 허용 */
      if (inFooter()) return;

      /* 일반 섹션 간 이동 */
      e.preventDefault();
      go(down ? 1 : -1);
    };

    /* 터치 */
    let ty0 = 0;
    const onTouchStart = (e: TouchEvent) => { ty0 = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (busy) return;
      const dy = ty0 - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      const ss = getSections();
      const idx = nearestIdx();
      if (dy > 0 && idx === ss.length - 1) return; // NEWS → Footer 터치 허용
      go(dy > 0 ? 1 : -1);
    };

    /* 키보드 */
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); go(1); }
      if (e.key === "ArrowUp"   || e.key === "PageUp")   { e.preventDefault(); go(-1); }
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
