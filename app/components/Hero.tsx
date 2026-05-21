"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import {
  FaArrowRight,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { openFloatingContact } from "./FloatingContact";

type HeroProps = {
  language: "es" | "en";
};

export default function Hero({ language }: HeroProps) {
  const githubHref = "https://github.com/educmz";
  const linkedinHref =
    "https://www.linkedin.com/in/eduardo-chacaliaza-minaya/";

  const content = {
    es: {
      hello: "Hola, soy",
      description:
        "Desarrollador full stack orientado a construir software completo: aplicaciones web, sistemas, experiencias desktop e integraciones con IA, cuidando arquitectura, producto y detalle visual.",
      projects: "Ver proyectos",
      contact: "Escríbeme",
      cv: "Descargar CV",
      typingPrefix: "Desarrollando ",
      typing: [
        "productos full stack",
        "aplicaciones web",
        "software desktop",
        "soluciones con IA",
      ],
      socials: "Enlaces profesionales",
      github: "Abrir GitHub",
      linkedin: "Abrir LinkedIn",
      email: "Abrir formulario de contacto",
    },
    en: {
      hello: "Hello, I'm",
      description:
        "Full stack developer focused on building complete software: web applications, systems, desktop experiences and AI integrations with care for architecture, product thinking and visual detail.",
      projects: "View projects",
      contact: "Write me",
      cv: "Download CV",
      typingPrefix: "Building ",
      typing: [
        "full-stack products",
        "web applications",
        "desktop software",
        "AI-powered tools",
      ],
      socials: "Professional links",
      github: "Open GitHub",
      linkedin: "Open LinkedIn",
      email: "Open contact form",
    },
  };

  const text = content[language];

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-background" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-intro">{text.hello}</p>

          <h1 id="hero-title">
            Eduardo <br />
            Chacaliaza
          </h1>

          <div className="hero-typing" aria-label={text.typingPrefix.trim()}>
            <span className="typing-prefix">{text.typingPrefix}</span>
            <TypeAnimation
              key={language}
              sequence={[
                text.typing[0],
                1800,
                text.typing[1],
                1800,
                text.typing[2],
                1800,
                text.typing[3],
                1800,
              ]}
              wrapper="span"
              speed={42}
              repeat={Infinity}
              className="typing-highlight"
            />
          </div>

          <p className="hero-description">{text.description}</p>

          <div className="hero-buttons">
            <a href="#proyectos" className="btn btn-primary">
              {text.projects}
              <FaArrowRight />
            </a>

            <button
              className="btn btn-secondary"
              type="button"
              onClick={openFloatingContact}
            >
              {text.contact}
            </button>

            <a
              href="/cv/CURRICULUM_VITAE_EDUARDO_CHACALIAZA_MINAYA.pdf"
              className="btn btn-outline"
              download
            >
              <FaDownload />
              {text.cv}
            </a>
          </div>

          <div className="hero-socials" aria-label={text.socials}>
            <a href={githubHref} target="_blank" rel="noreferrer" aria-label={text.github}>
              <FaGithub />
            </a>

            <a href={linkedinHref} target="_blank" rel="noreferrer" aria-label={text.linkedin}>
              <FaLinkedin />
            </a>

            <button type="button" onClick={openFloatingContact} aria-label={text.email}>
              <FaEnvelope />
            </button>
          </div>
        </div>

        <div className="hero-image-wrapper" aria-hidden="true">
          <div className="hero-image-glow" />

          <div className="hero-image">
            <Image
              src="/images/profile/hero-profile.jpg"
              alt=""
              fill
              sizes="(max-width: 980px) 78vw, 410px"
              priority
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
