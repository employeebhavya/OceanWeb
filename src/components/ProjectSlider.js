/* eslint-disable @next/next/no-img-element */
// Slider.js
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { BsArrowLeft, BsArrowRight, BsArrowUpRight } from "react-icons/bs";
import Styles from "./ProjectSlider.module.css";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Sample images array
const images = ["/project1.png", "/project1.png", "/project1.png"];

const ProjectSlider = () => {
  const sliderRef = useRef(null);
  const projectSliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  gsap.registerPlugin(ScrollTrigger);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const slider = sliderRef.current;

    // GSAP animation for smooth transition
    gsap.to(slider, {
      xPercent: -currentIndex * 50,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [currentIndex]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectSliderRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(projectSliderRef.current.querySelectorAll("a, h2, p, img"), {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className={Styles.sectionProjectSlider} ref={projectSliderRef}>
      <div className="container">
        <div className={Styles.rowProjectSlider}>
          <div className={Styles.columnProjectSlider}>
            <h2>Projects</h2>
            <p>
              Since its inception, Ocean Lifespaces has consistently showcased
              its expertise in Turnkey Interiors and Civil Construction. Our
              portfolio is a testament to our dedication and craftsmanship in
              delivering high-quality projects. We take pride in our ability to
              handle every aspect of interior design and construction with
              precision. Our completed projects reflect our commitment to
              excellence and innovation. Ocean Lifespaces continues to build on
              its reputation for reliability and superior service. Each project
              we complete is a step towards furthering our legacy of excellence
              in the industry.
            </p>
            <Link href="/projects">
              <button>
                <span>
                  View All <BsArrowUpRight />
                </span>
              </button>
            </Link>
          </div>
          <div className={Styles.columnProjectSlider}>
            <div className={Styles.sliderWrapper}>
              <div className={Styles.slider} ref={sliderRef}>
                {images.map((image, index) => (
                  <div className={Styles.slide} key={index}>
                    <img src={image} alt={`Slide ${index}`} />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className={Styles.navigation}>
                <button className={Styles.prevButton} onClick={handlePrev}>
                  <BsArrowLeft />
                </button>
                <button className={Styles.nextButton} onClick={handleNext}>
                  <BsArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSlider;
