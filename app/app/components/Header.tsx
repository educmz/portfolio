"use client";

import { useState } from "react";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";

type HeaderProps = {
  language: "es" | "en";
  setLanguage: (language: "es" | "en") => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
};

export default function Header({
  language,
  setLanguage,
  theme,
  setTheme,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const content = {
    es: {
      home: "Inicio",
      work: "Proyectos",
      skills: "Stack",
      about: "Sobre mi",
      contact: "Contacto",
      talk: "Contactame",
      menu: "Abrir menu",
      close: "Cerrar menu",
      theme: "Cambiar tema",
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
    },
  };

  const text = content[language];
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <a href="#" className="header-brand" onClick={closeMenu}>
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
        className={`header-nav ${menuOpen ? "is-open" : ""}`}
        aria-label="Main navigation"
      >
        <a href="#" className="active" onClick={closeMenu}>
          {text.home}
        </a>
        <a href="#proyectos" onClick={closeMenu}>
          {text.work}
        </a>
        <a href="#habilidades" onClick={closeMenu}>
          {text.skills}
        </a>
        <a href="#sobre-mi" onClick={closeMenu}>
          {text.about}
        </a>
        <a href="#contacto" onClick={closeMenu}>
          {text.contact}
        </a>
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
          aria-label="Change language"
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
        >
          {language === "es" ? "EN" : "ES"}
        </button>

        <a href="#contacto" className="talk-button" onClick={closeMenu}>
          {text.talk}
        </a>
      </div>
    </header>
  );
}
