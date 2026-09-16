"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const move = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      glow.style.opacity = "1";
    };

    const leave = () => {
      glow.style.opacity = "0";
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.105;
      currentY += (targetY - currentY) * 0.105;
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "520px",
        height: "520px",
        borderRadius: "9999px",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0,
        background: "radial-gradient(circle, rgba(254,44,85,.24) 0%, rgba(254,44,85,.13) 28%, rgba(254,44,85,.055) 48%, transparent 72%)",
        filter: "blur(34px)",
        transition: "opacity .35s ease",
        willChange: "transform",
        mixBlendMode: "screen",
      }}
    />
  );
}
