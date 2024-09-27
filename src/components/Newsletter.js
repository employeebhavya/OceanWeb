"use client";

import React, { useEffect, useRef } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./Newsletter.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Newsletter() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom 100%",
          scrub: 1,
        },
      });

      tl.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
      }).from(
        inputRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 1,
        },
        "-=0.5"
      );
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);
  return (
    <section ref={sectionRef} className={styles.sectionNewsLetter}>
      <div className={styles.container}>
        <h2 className={styles.heading} ref={headingRef}>
          Get The Latest Ocean Updates By Subscribing To Our Newsletter!
        </h2>
        <div className={styles.inputWrapper}>
          <input
            type="email"
            placeholder="Enter email address"
            className={styles.input}
            ref={inputRef}
          />
          <button className={styles.button}>
            <AiOutlineArrowRight className={styles.icon} />
          </button>
        </div>
      </div>
    </section>
  );
}
