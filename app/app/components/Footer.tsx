import { FaArrowUp, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

type FooterProps = {
  language: "es" | "en";
};

export default function Footer({ language }: FooterProps) {
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
        projects: "Proyectos",
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
        projects: "Projects",
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
          <a href="#">{text.links.home}</a>
          <a href="#proyectos">{text.links.projects}</a>
          <a href="#habilidades">{text.links.skills}</a>
          <a href="#sobre-mi">{text.links.about}</a>
          <a href="#contacto">{text.links.contact}</a>
        </nav>

        <div className="footer-column">
          <h4>{text.connect}</h4>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <FaGithub /> GitHub
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
          <a href="mailto:correo@ejemplo.com">
            <FaEnvelope /> Email
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Eduardo Chacaliaza. {text.rights}</p>

        <a href="#" className="footer-top" aria-label="Back to top">
          <FaArrowUp />
        </a>
      </div>
    </footer>
  );
}
