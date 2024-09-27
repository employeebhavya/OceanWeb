"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Styles from "./Menu.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsArrowUpRight } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";

const MenuItems = [
  { name: "Home", path: "/" },
  { name: "Our Services", path: "/services" },
  { name: "About Us", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Clients", path: "/clients" },
  { name: "News", path: "/news" },
];

function Menu() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);
  const popupMenuRef = useRef(null);

  const openMenu = () => {
    gsap.to(popupMenuRef.current, {
      right: "0%",
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => setPopupVisible(true),
    });

    if (mobileMenuRef.current) {
      gsap.from(mobileMenuRef.current.children, {
        opacity: 0,
        y: -10,
        delay: 0.3,
        duration: 0.5,
        stagger: 0.2,
      });
    }
  };

  const closeMenu = () => {
    gsap.to(popupMenuRef.current, {
      right: "-100%",
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => setPopupVisible(false),
    });
  };

  const togglePopup = () => {
    if (isPopupVisible) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  return (
    <div className={Styles.menu}>
      <Link href="/">
        <Image
          className={Styles.logo}
          src="/logo-web.png"
          alt="Logo"
          width={209}
          height={52}
        />
      </Link>

      <div className={Styles.menuItemsContainerInner}>
        <ul className={Styles.menuItems}>
          {MenuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  className={isActive ? Styles.active : ""}
                  href={item.path}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <button onClick={togglePopup} className={Styles.popupButton}>
          <span>
            Menu <BsArrowUpRight />
          </span>
        </button>
      </div>

      <div className={Styles.popupMenu} ref={popupMenuRef}>
        <div className={Styles.popupContentMenu}>
          <div className={Styles.mobilemenu}>
            <ul className={Styles.mobileMenuItems} ref={mobileMenuRef}>
              {MenuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path} className={Styles.mobileMenuItem}>
                    <Link
                      className={isActive ? Styles.mobileActive : ""}
                      href={item.path}
                      onClick={togglePopup}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <button className={Styles.closeButtonMenu} onClick={togglePopup}>
            Close <IoCloseCircle />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
