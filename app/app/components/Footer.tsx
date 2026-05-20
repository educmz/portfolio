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
      role: "Full Stack Developer",
      description:
        "Creando soluciones digitales utiles, escalables y bien disenadas: desde interfaces web hasta sistemas, automatizaciones e integracion de IA.",
      navigation: "Navegacion",
      connect: "Canales",
      rights: "Todos los derechos reservados.",
      footerNav: "Navegacion del footer",
      email: "Abrir formulario de contacto",
      top: "Volver al inicio",
      links: {
        home: "Inicio",
        projects: "Portfolio",
        about: "Sobre mi",
        skills: "Stack",
        contact: "Contacto",
      },
    },
    en: {
      role: "Full Stack Developer",
      description:
        "Creating useful, scalable and well-designed digital solutions: from web interfaces to systems, automations and AI integration.",
      navigation: "Navigation",
      connect: "Channels",
      rights: "All rights reserved.",
      footerNav: "Footer navigation",
      email: "Open contact form",
      top: "Back to top",
      links: {
        home: "Home",
        projects: "Portfolio",
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
          <h3>Eduardo Chacaliaza</h3>
          <p className="footer-role">{text.role}</p>
          <p>{text.description}</p>
        </div>

        <nav className="footer-column" aria-label={text.footerNav}>
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
          <button type="button" onClick={openFloatingContact} aria-label={text.email}>
            <FaEnvelope /> Email
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>(c) 2026 Eduardo Chacaliaza. {text.rights}</p>

        <a href="#inicio" className="footer-top" aria-label={text.top}>
          <FaArrowUp />
        </a>
      </div>
    </footer>
  );
}
