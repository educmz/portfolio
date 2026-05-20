"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import {
  FaCheck,
  FaChevronDown,
  FaGlobe,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { openFloatingContact } from "./FloatingContact";

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
  const [languageOpen, setLanguageOpen] = useState(false);
  const [visualActiveSection, setVisualActiveSection] = useState("inicio");
  const [forcedActiveSection, setForcedActiveSection] = useState<string | null>(
    null,
  );
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({
    opacity: 0,
  });
  const navRef = useRef<HTMLElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const scrollFrame = useRef<number | null>(null);
  const lockedSection = useRef<string | null>(null);
  const unlockTimer = useRef<number | null>(null);

  const content = {
    es: {
      home: "Inicio",
      work: "Portafolio",
      skills: "Stack",
      about: "Sobre mí",
      contact: "Contacto",
      talk: "Escríbeme",
      menu: "Abrir menú",
      close: "Cerrar menú",
      languageMenu: "Seleccionar idioma",
      currentLanguage: "Español",
      themeControl: "Tema",
      languageControl: "Idioma",
      lightMode: "Cambiar a modo claro",
      darkMode: "Cambiar a modo oscuro",
      nav: "Navegación principal",
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
      languageMenu: "Select language",
      currentLanguage: "English",
      themeControl: "Theme",
      languageControl: "Language",
      lightMode: "Switch to light mode",
      darkMode: "Switch to dark mode",
      nav: "Main navigation",
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
  const effectiveActiveSection = forcedActiveSection ?? visualActiveSection;

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;

    const updateActiveSection = () => {
      if (lockedSection.current) {
        return;
      }

      const headerHeight =
        document.querySelector<HTMLElement>(".header")?.offsetHeight ?? 0;
      const activationLine =
        headerHeight + Math.min(window.innerHeight * 0.3, 220);
      const pageBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;

      if (pageBottom) {
        setVisualActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      const currentSection = sections.reduce((current, section) => {
        return section.getBoundingClientRect().top <= activationLine
          ? section.id
          : current;
      }, sectionIds[0]);

      setVisualActiveSection(currentSection);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (scrollFrame.current) {
        window.cancelAnimationFrame(scrollFrame.current);
      }

      if (unlockTimer.current) {
        window.clearTimeout(unlockTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const nav = navRef.current;
      const activeLink = nav?.querySelector<HTMLAnchorElement>(
        `a[data-section="${effectiveActiveSection}"]`,
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
  }, [effectiveActiveSection, language, menuOpen]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!languageRef.current?.contains(event.target as Node)) {
        setLanguageOpen(false);
      }

      if (menuOpen && !headerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLanguageOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const scrollToY = (targetTop: number, targetSection: string) => {
    if (scrollFrame.current) {
      window.cancelAnimationFrame(scrollFrame.current);
    }

    lockedSection.current = targetSection;
    setForcedActiveSection(targetSection);
    setVisualActiveSection(targetSection);

    if (unlockTimer.current) {
      window.clearTimeout(unlockTimer.current);
    }

    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || Math.abs(distance) < 2) {
      window.scrollTo(0, targetTop);
      setVisualActiveSection(targetSection);
      unlockTimer.current = window.setTimeout(() => {
        lockedSection.current = null;
        setForcedActiveSection(null);
      }, 120);
      return;
    }

    const duration = Math.min(340, Math.max(140, Math.abs(distance) * 0.12));
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, startTop + distance * eased);

      if (progress < 1) {
        scrollFrame.current = window.requestAnimationFrame(step);
      } else {
        scrollFrame.current = null;
        setVisualActiveSection(targetSection);
        unlockTimer.current = window.setTimeout(() => {
          lockedSection.current = null;
          setForcedActiveSection(null);
        }, 140);
      }
    };

    scrollFrame.current = window.requestAnimationFrame(step);
  };

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();

    const section = document.getElementById(sectionId);
    const headerHeight =
      document.querySelector<HTMLElement>(".header")?.offsetHeight ?? 0;

    if (section) {
      const top = Math.max(
        section.getBoundingClientRect().top + window.scrollY - headerHeight,
        0,
      );

      scrollToY(top, sectionId);
      window.history.pushState(null, "", `#${sectionId}`);
    }

    setMenuOpen(false);
  };

  const languageOptions = [
    { code: "es", label: "Español", short: "ES" },
    { code: "en", label: "English", short: "EN" },
  ] as const;

  const handleLanguageSelect = (nextLanguage: "es" | "en") => {
    setLanguage(nextLanguage);
    setLanguageOpen(false);
  };

  return (
    <header className="header" ref={headerRef}>
      <a
        href="#inicio"
        className="header-brand"
        onClick={(event) => handleNavClick(event, "inicio")}
      >
        <span className="brand-wordmark" aria-label="Eduardo">
          <span className="brand-token" aria-hidden="true">&lt;</span>
          <span className="brand-name">Eduardo</span>
          <span className="brand-token" aria-hidden="true">/&gt;</span>
        </span>
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label={menuOpen ? text.close : text.menu}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <nav
        ref={navRef}
        className={`header-nav ${menuOpen ? "is-open" : ""}`}
        aria-label={text.nav}
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
            className={effectiveActiveSection === item.id ? "active" : ""}
            aria-current={effectiveActiveSection === item.id ? "page" : undefined}
            onClick={(event) => handleNavClick(event, item.id)}
          >
            {item.label}
          </a>
        ))}

        <div className="mobile-menu-controls">
          <div className="mobile-control-row">
            <span>{text.themeControl}</span>
            <button
              className={`theme-switch mobile-theme-switch ${
                theme === "light" ? "is-light" : "is-dark"
              }`}
              type="button"
              aria-label={theme === "dark" ? text.lightMode : text.darkMode}
              aria-pressed={theme === "light"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <span className="theme-switch-track" aria-hidden="true">
                <span className="theme-switch-icon theme-switch-sun">
                  <FaSun />
                </span>
                <span className="theme-switch-icon theme-switch-moon">
                  <FaMoon />
                </span>
                <span className="theme-switch-thumb">
                  {theme === "dark" ? <FaMoon /> : <FaSun />}
                </span>
              </span>
            </button>
          </div>

          <div className="mobile-control-row">
            <span>{text.languageControl}</span>
            <div className="mobile-language-segment" aria-label={text.languageMenu}>
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  className={`mobile-language-segment-option ${
                    language === option.code ? "is-active" : ""
                  }`}
                  type="button"
                  aria-pressed={language === option.code}
                  onClick={() => handleLanguageSelect(option.code)}
                >
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="header-actions">
        <button
          className={`theme-switch ${theme === "light" ? "is-light" : "is-dark"}`}
          type="button"
          aria-label={theme === "dark" ? text.lightMode : text.darkMode}
          aria-pressed={theme === "light"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span className="theme-switch-track" aria-hidden="true">
            <span className="theme-switch-icon theme-switch-sun">
              <FaSun />
            </span>
            <span className="theme-switch-icon theme-switch-moon">
              <FaMoon />
            </span>
            <span className="theme-switch-thumb">
              {theme === "dark" ? <FaMoon /> : <FaSun />}
            </span>
          </span>
        </button>

        <div className="language-select" ref={languageRef}>
          <button
            className="language-trigger"
            type="button"
            aria-label={text.languageMenu}
            aria-haspopup="listbox"
            aria-expanded={languageOpen}
            onClick={() => setLanguageOpen((open) => !open)}
          >
            <FaGlobe aria-hidden="true" />
            <span>{text.currentLanguage}</span>
            <FaChevronDown className="language-chevron" aria-hidden="true" />
          </button>

          <div
            className={`language-dropdown ${languageOpen ? "is-open" : ""}`}
            role="listbox"
            aria-label={text.languageMenu}
          >
            {languageOptions.map((option) => (
              <button
                key={option.code}
                className={`language-option ${
                  language === option.code ? "is-active" : ""
                }`}
                type="button"
                role="option"
                aria-selected={language === option.code}
                onClick={() => handleLanguageSelect(option.code)}
              >
                <span className="language-option-copy">
                  <span>{option.label}</span>
                  <small>{option.short}</small>
                </span>
                <FaCheck aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <button
          className="talk-button"
          type="button"
          onClick={openFloatingContact}
        >
          {text.talk}
        </button>
      </div>
    </header>
  );
}
