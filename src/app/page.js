"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Home from "../components/Home";
import Styles from "./page.module.css";
import ServiceSlider from "../components/ServiceSlider";
import { useGSAP } from "@gsap/react";
import ProjectSlider from "../components/ProjectSlider";
import NewsAndEvents from "../components/NewsAndEvents";
import Transform from "../components/Transform";
import TestimonialHome from "../components/TestimonialHome";
import LogoScroll from "../components/LogoScroll";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

function HomeMain() {
  gsap.registerPlugin(ScrollTrigger);
  const [counters, setCounters] = useState({
    employees: 0,
    projects: 0,
    experience: 0,
    ongoing: 0,
  });

  const counterRef = useRef(null);
  const dreamSectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: dreamSectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(
      dreamSectionRef.current.querySelectorAll(
        "h4, h2, p, img, .dreamFloat, .counterBox"
      ),
      {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      }
    );
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: counterRef.current,
        start: "top 80%",
        onEnter: () => startCounting(),
      });
    }, counterRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const startCounting = () => {
    const targets = [
      { id: "employees", end: 500 },
      { id: "projects", end: 350 },
      { id: "experience", end: 23 },
      { id: "ongoing", end: 20 },
    ];

    targets.forEach((target) => {
      gsap.to(
        { value: 0 },
        {
          value: target.end,
          duration: 2,
          ease: "power1.out",
          onUpdate: function () {
            setCounters((prev) => ({
              ...prev,
              [target.id]: Math.floor(this.targets()[0].value),
            }));
          },
        }
      );
    });
  };

  return (
    <div>
      <Home />
      <section ref={dreamSectionRef} className={Styles.dreamSection}>
        <div className="container">
          <div className={Styles.rowDream}>
            <div className={Styles.columnDream}>
              <h4>enhance satisfaction by transcending quality standards</h4>
              <h2>Turning Dreams into Reality</h2>
              <p>
                Ocean Lifespaces India Private Limited, formerly Ocean Interiors
                Limited, was found in the year 1996. Under the visionary
                leadership of Mr. S.K. Peter, MD & CEO, today the company has
                expanded to become one of the best in the field of General
                Contracting Works including all MEP, Design & Build, Civil
                Construction & Facade works.
              </p>
              <p>
                We aim to achieve our goal by constantly merging our systems,
                processes, teams & activities to ensure that we remain on top of
                our present and future clients need at all times. To achieve
                success in all latitudes and become the only sought-after name
                by Business Associates in all our endeavours and beyond.
              </p>
              <div className={Styles.dreamCounter}>
                <div ref={counterRef} className={Styles.counterSection}>
                  <div className={Styles.counterBox}>
                    <h3>Number of Employees</h3>
                    <p>{counters.employees}</p>
                  </div>
                  <div className={Styles.counterBox}>
                    <h3>Number of Projects</h3>
                    <p>{counters.projects}</p>
                  </div>
                  <div className={Styles.counterBox}>
                    <h3>Years of Experience</h3>
                    <p>{counters.experience}</p>
                  </div>
                  <div className={Styles.counterBox}>
                    <h3>Ongoing Projects</h3>
                    <p>{counters.ongoing}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={Styles.columnDream}>
              <Image
                src="/dreamImage.png"
                alt="dream"
                width={624}
                height={476}
              />
              <p className={Styles.dreamFloat}>
                Creating exceptional interior design solutions and accumulate an
                expertise that is the best in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ServiceSlider />
      <ProjectSlider />
      <NewsAndEvents />
      <Transform />
      <TestimonialHome />
      <LogoScroll />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default HomeMain;
