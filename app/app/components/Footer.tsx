"use client";

import { FaArrowUp, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { openFloatingContact } from "./FloatingContact";

type FooterProps = {
  language: "es" | "en";
};

export default function Footer({ language }: FooterProps) {
  const githubHref = "https://github.com/educmz";
  const linkedinHref =
    "https://www.linkedin.com/in/eduardo-chacaliaza-minaya/";

  const content = {
    es: {
      role: "Frontend & Software Developer",
      description:
        "Portafolio personal de desarrollo web, proyectos academicos y soluciones digitales.",
      navigation: "Navegacion",
      connect: "Canales",
      rights: "Todos los derechos reservados.",
      links: {
        home: "Inicio",
        projects: "Portafolio",
        about: "Sobre mi",
        skills: "Stack",
        contact: "Contacto",
      },
    },
    en: {
      role: "Frontend & Software Developer",
      description:
        "Personal portfolio for web development, academic projects and digital solutions.",
      navigation: "Navigation",
      connect: "Channels",
      rights: "All rights reserved.",
      links: {
        home: "Home",
        projects: "Work",
        about: "About",
        skills: "Stack",
        contact: "Contact",
      },
    },
  };

  const text = content[language];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true">
            EC
          </span>
          <h3>Eduardo Chacaliaza</h3>
          <p className="footer-role">{text.role}</p>
          <p>{text.description}</p>
        </div>

        <nav className="footer-column" aria-label="Footer navigation">
          <h4>{text.navigation}</h4>
          <a href="#inicio">{text.links.home}</a>
          <a href="#sobre-mi">{text.links.about}</a>
          <a href="#habilidades">{text.links.skills}</a>
          <a href="#proyectos">{text.links.projects}</a>
          <a href="#contacto">{text.links.contact}</a>
        </nav>

        <div className="footer-column">
          <h4>{text.connect}</h4>
          <a href={githubHref} target="_blank" rel="noreferrer">
            <FaGithub /> GitHub
          </a>
          <a href={linkedinHref} target="_blank" rel="noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
          <button type="button" onClick={openFloatingContact}>
            <FaEnvelope /> Email
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>(c) 2026 Eduardo Chacaliaza. {text.rights}</p>

        <a href="#inicio" className="footer-top" aria-label="Back to top">
          <FaArrowUp />
        </a>
      </div>
    </footer>
  );
}
