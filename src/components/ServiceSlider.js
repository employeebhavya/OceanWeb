"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import Styles from "./ServiceSlider.module.css";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

// Register GSAP Plugins only on the client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable, ScrollTrigger);
}

const services = [
  { id: 1, title: "Interior Design", imgSrc: "/interior.png" },
  { id: 2, title: "Design and Build", imgSrc: "/designBuild.png" },
  { id: 3, title: "Marine Infrastructure", imgSrc: "/marine.png" },
  { id: 4, title: "Fit Outs", imgSrc: "/fitOuts.png" },
  { id: 5, title: "Civil Construction", imgSrc: "/civil.png" },
];

const ServiceSlider = () => {
  const sliderRef = useRef(null);
  const wrapRef = useRef(null);
  const serviceSectionRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const serviceRefs = useRef([]); // Array of refs for the services

  const numClones = 2; // Number of clones for looping effect

  // ScrollTrigger Animation Setup
  useEffect(() => {
    const context = gsap.context(() => {
      // Create a GSAP timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: serviceSectionRef.current,
          start: "top 80%",
          end: "bottom 100%",
          scrub: 1,
        },
      });

      // Animate headings and button sequentially
      tl.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
      })
        .from(
          buttonRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 1,
          },
          "-=0.5" // Overlap animations slightly
        )
        .from(
          serviceRefs.current,
          {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2, // Stagger animation for each service item
          },
          "-=0.5"
        );
    }, serviceSectionRef);

    return () => {
      // Clean up ScrollTrigger and GSAP context
      context.revert();
    };
  }, []);

  // Draggable Slider Effect Setup
  useEffect(() => {
    const slider = sliderRef.current;
    const wrap = wrapRef.current;

    // Clone elements to create infinite scroll effect
    const cloneElements = () => {
      const children = Array.from(slider.children);
      for (let i = 0; i < numClones; i++) {
        children.forEach((child) => {
          const clone = child.cloneNode(true);
          slider.appendChild(clone); // Append cloned elements
        });
      }
    };

    cloneElements();

    const totalWidth = slider.scrollWidth / (1 + numClones); // Adjust width after cloning

    const draggableInstance = Draggable.create(slider, {
      type: "x",
      bounds: { minX: -totalWidth, maxX: 0 },
      inertia: true, // Smooth drag
      onDrag: wrapElements,
      onThrowUpdate: wrapElements,
    });

    function wrapElements() {
      const currentX = gsap.getProperty(slider, "x");

      // Wrap the slider back when it reaches the end
      if (currentX <= -totalWidth) {
        gsap.set(slider, { x: 0 });
      } else if (currentX >= 0) {
        gsap.set(slider, { x: -totalWidth });
      }
    }

    return () => {
      // Cleanup Draggable instance on unmount
      draggableInstance[0].kill();
    };
  }, []);

  return (
    <section className={Styles.serviceSliderSection} ref={serviceSectionRef}>
      <div className="container">
        <div className={Styles.rowServiceSlider}>
          <div className={Styles.columnServiceSlider} ref={headingRef}>
            <h4>Enhance satisfaction by transcending quality standards</h4>
            <h2>Our Services</h2>
          </div>
          <div className={Styles.columnServiceSlider} ref={buttonRef}>
            <Link href="/services">
              <button>
                <span>
                  Learn More <BsArrowUpRight />
                </span>
              </button>
            </Link>
          </div>
        </div>
        <div ref={wrapRef} style={{ overflow: "hidden", width: "100%" }}>
          <div
            ref={sliderRef}
            style={{ display: "flex", width: "max-content" }}
          >
            {services.map((service, index) => (
              <div
                key={service.id}
                style={{
                  flex: "0 0 auto",
                  width: "30vw",
                  marginRight: "2vw",
                }}
                className={Styles.cardServiceSlider}
                ref={(el) => (serviceRefs.current[index] = el)} // Store refs in array
              >
                <img
                  src={service.imgSrc}
                  alt={service.title}
                  style={{ width: "100%" }}
                />
                <h3 style={{ textAlign: "left" }}>{service.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSlider;
