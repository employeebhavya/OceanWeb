"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import gsap from "gsap";

const images = [
  "/logo1.png",
  "/logo1.png",
  "/logo1.png",
  "/logo1.png",
  "/logo1.png",
  "/logo1.png",
  "/logo1.png",
  "/logo1.png",
  "/logo1.png",
  "/logo1.png",
  "/logo1.png",
  "/logo1.png",
];

export default function LogoScroll() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const totalImages = images.length;
    const logoWidth = 163;
    const gap = 20;
    const totalWidth = (logoWidth + gap) * totalImages;

    gsap.set(container, {
      width: totalWidth * 2,
      display: "flex",
      gap: `${gap}px`,
    });
    gsap.set(container.querySelectorAll("img"), {
      width: `${logoWidth}px`,
      height: "auto",
      flexShrink: 0,
      margin: 0,
      padding: 0,
    });

    gsap.to(container.querySelectorAll("img"), {
      x: `-=${totalWidth}`,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });
  }, []);

  return (
    <div
      className="img-container"
      ref={containerRef}
      style={{
        overflow: "hidden",
        display: "flex",
        whiteSpace: "nowrap",
        width: "100vw",
      }}
    >
      {images.concat(images).map((src, index) => (
        <img
          key={index}
          alt={`logo-${index}`}
          src={src}
          style={{
            margin: 0,
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}
