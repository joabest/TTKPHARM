"use client";

import { useEffect, useRef } from "react";
import "./mouse-glow.css";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const cursor = cursorRef.current;
    const landing = glow?.closest("main");
    if (!glow || !cursor || !landing) return;
    landing.classList.add("ttk-landing-root");

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const move = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      glow.style.opacity = "1";
      cursor.style.opacity = "1";
      cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
    };
    const leave = () => { glow.style.opacity = "0"; cursor.style.opacity = "0"; };
    const over = (event: MouseEvent) => {
      const el = event.target as HTMLElement | null;
      cursor.classList.toggle("is-interactive", Boolean(el?.closest("a,button,input,article,[role='button']")));
    };
    const animate = () => {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    animate();
    return () => {
      landing.classList.remove("ttk-landing-root");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <><div ref={glowRef} className="ttk-mouse-glow" aria-hidden="true"/><div ref={cursorRef} className="ttk-custom-cursor" aria-hidden="true"/></>;
}
