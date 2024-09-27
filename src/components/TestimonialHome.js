/* eslint-disable @next/next/no-img-element */
// Slider.js
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { BsArrowLeft, BsArrowRight, BsArrowUpRight } from "react-icons/bs";
import Styles from "./TestimonialHome.module.css";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Sample images array
const images = [
  {
    id: 1,
    testiImage: "testimonial1.png",
    quoteImage: "/quote.png",
    name: "Sheena James",
    designation: "CEO, FLF Company",
    description:
      "Ocean Lifespaces exceeded our expectations with their impeccable design expertise and unwavering commitment to quality. Their ability to blend functionality with aesthetic appeal transformed our workspace into an inspiring environment, fostering creativity and productivity among our team. They truly are the trusted partner we needed for our interior design needs.",
  },
  {
    id: 1,
    testiImage: "testimonial1.png",
    quoteImage: "/quote.png",
    name: "Sheena James",
    designation: "CEO, FLF Company",
    description:
      "Ocean Lifespaces exceeded our expectations with their impeccable design expertise and unwavering commitment to quality. Their ability to blend functionality with aesthetic appeal transformed our workspace into an inspiring environment, fostering creativity and productivity among our team. They truly are the trusted partner we needed for our interior design needs.",
  },
  {
    id: 1,
    testiImage: "testimonial1.png",
    quoteImage: "/quote.png",
    name: "Sheena James",
    designation: "CEO, FLF Company",
    description:
      "Ocean Lifespaces exceeded our expectations with their impeccable design expertise and unwavering commitment to quality. Their ability to blend functionality with aesthetic appeal transformed our workspace into an inspiring environment, fostering creativity and productivity among our team. They truly are the trusted partner we needed for our interior design needs.",
  },
];

const TestimonialHome = () => {
  const sliderRef = useRef(null);
  const TestimonialHomeRef = useRef(null);
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
      xPercent: -currentIndex * 100,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [currentIndex]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: TestimonialHomeRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(TestimonialHomeRef.current.querySelectorAll("a, h2, p, img"), {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className={Styles.sectionTestimonialHome} ref={TestimonialHomeRef}>
      <div className="container" id="TestimonialHomeContainer">
        <div className={Styles.rowTestimonialHome}>
          <div className={Styles.columnTestimonialHome}>
            <Image
              src="/testimonialLeftImage.jpg"
              alt="Project Slider"
              width={500}
              height={500}
            />
          </div>
          <div className={Styles.columnTestimonialHome}>
            <div className={Styles.sliderWrapper}>
              <div className={Styles.slider} ref={sliderRef}>
                {images.map((image, index) => (
                  <div className={Styles.slide} key={index}>
                    <img
                      className={Styles.testiImage}
                      src={image.testiImage}
                      alt={`Slide ${index}`}
                    />
                    <img
                      className={Styles.quoteImage}
                      src={image.quoteImage}
                      alt={`Slide ${index}`}
                    />
                    <p>{image.description}</p>
                    <div>
                      <h4>{image.name}</h4>
                      <h5>{image.designation}</h5>
                    </div>
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

export default TestimonialHome;
