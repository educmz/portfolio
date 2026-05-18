"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";

type HeaderProps = {
  language: "es" | "en";
  setLanguage: (language: "es" | "en") => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
};

const sectionIds = ["inicio", "sobre-mi", "habilidades", "proyectos", "contacto"];

export default function Header({
  language,
  setLanguage,
  theme,
  setTheme,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({
    opacity: 0,
  });
  const navRef = useRef<HTMLElement>(null);
  const sectionRatios = useRef<Record<string, number>>({});
  const lockedSection = useRef<string | null>(null);
  const unlockTimer = useRef<number | null>(null);

  const content = {
    es: {
      home: "Inicio",
      work: "Portafolio",
      skills: "Stack",
      about: "Sobre mi",
      contact: "Contacto",
      talk: "Contactame",
      menu: "Abrir menu",
      close: "Cerrar menu",
      theme: "Cambiar tema",
      language: "Version en espanol",
    },
    en: {
      home: "Home",
      work: "Work",
      skills: "Stack",
      about: "About",
      contact: "Contact",
      talk: "Contact me",
      menu: "Open menu",
      close: "Close menu",
      theme: "Toggle theme",
      language: "English version",
    },
  };

  const text = content[language];
  const navItems = [
    { id: "inicio", href: "#inicio", label: text.home },
    { id: "sobre-mi", href: "#sobre-mi", label: text.about },
    { id: "habilidades", href: "#habilidades", label: text.skills },
    { id: "proyectos", href: "#proyectos", label: text.work },
    { id: "contacto", href: "#contacto", label: text.contact },
  ];

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRatios.current[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        if (lockedSection.current) {
          const lockedRatio = sectionRatios.current[lockedSection.current] ?? 0;

          if (lockedRatio < 0.24) {
            return;
          }

          lockedSection.current = null;
        }

        const visibleSection = sectionIds.reduce((current, sectionId) => {
          const currentRatio = sectionRatios.current[current] ?? 0;
          const nextRatio = sectionRatios.current[sectionId] ?? 0;

          return nextRatio > currentRatio ? sectionId : current;
        }, sectionIds[0]);

        setActiveSection(visibleSection);
      },
      {
        rootMargin: "-28% 0px -48% 0px",
        threshold: [0, 0.16, 0.28, 0.42, 0.58],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const nav = navRef.current;
      const activeLink = nav?.querySelector<HTMLAnchorElement>(
        `a[data-section="${activeSection}"]`,
      );

      if (!nav || !activeLink) {
        setIndicatorStyle({ opacity: 0 });
        return;
      }

      setIndicatorStyle({
        opacity: 1,
        transform: `translate3d(${activeLink.offsetLeft}px, ${activeLink.offsetTop}px, 0)`,
        width: activeLink.offsetWidth,
        height: activeLink.offsetHeight,
      });
    };

    updateIndicator();

    const frame = window.requestAnimationFrame(updateIndicator);
    window.addEventListener("resize", updateIndicator);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeSection, language, menuOpen]);

  const handleNavClick = (sectionId: string) => {
    lockedSection.current = sectionId;
    setActiveSection(sectionId);
    setMenuOpen(false);

    if (unlockTimer.current) {
      window.clearTimeout(unlockTimer.current);
    }

    unlockTimer.current = window.setTimeout(() => {
      lockedSection.current = null;
    }, 1200);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <a href="#inicio" className="header-brand" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true">
          EC
        </span>
        <span>Eduardo Chacaliaza</span>
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label={menuOpen ? text.close : text.menu}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav
        ref={navRef}
        className={`header-nav ${menuOpen ? "is-open" : ""}`}
        aria-label="Main navigation"
      >
        <span
          className="nav-active-pill"
          style={indicatorStyle}
          aria-hidden="true"
        />

        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            data-section={item.id}
            className={activeSection === item.id ? "active" : ""}
            aria-current={activeSection === item.id ? "page" : undefined}
            onClick={() => handleNavClick(item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button
          className="icon-button"
          type="button"
          aria-label={text.theme}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        <button
          className="language-button"
          type="button"
          aria-label={text.language}
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
        >
          <span aria-hidden="true">{language === "es" ? "🇪🇸" : "🇺🇸"}</span>
          <span>{language === "es" ? "ES" : "EN"}</span>
        </button>

        <a href="#contacto" className="talk-button" onClick={closeMenu}>
          {text.talk}
        </a>
      </div>
    </header>
  );
}
