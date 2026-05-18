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

type HeroProps = {
  language: "es" | "en";
};

export default function Hero({ language }: HeroProps) {
  const content = {
    es: {
      hello: "Hola, soy",
      description:
        "Estudiante de Ingenieria de Software enfocado en crear interfaces claras, aplicaciones web funcionales y experiencias digitales cuidadas desde el codigo hasta el detalle visual.",
      projects: "Ver proyectos",
      contact: "Contactarme",
      cv: "Descargar CV",
      typingPrefix: "Desarrollando ",
      typing: [
        "interfaces modernas",
        "aplicaciones web",
        "experiencias digitales",
        "software funcional",
      ],
    },
    en: {
      hello: "Hello, I'm",
      description:
        "Software Engineering student focused on building clear interfaces, functional web apps and polished digital experiences from code quality to visual detail.",
      projects: "View projects",
      contact: "Contact me",
      cv: "Download CV",
      typingPrefix: "Building ",
      typing: [
        "modern interfaces",
        "web applications",
        "digital experiences",
        "functional software",
      ],
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

            <a href="#contacto" className="btn btn-secondary">
              {text.contact}
            </a>

            <a href="/cv.pdf" className="btn btn-outline" download>
              <FaDownload />
              {text.cv}
            </a>
          </div>

          <div className="hero-socials" aria-label="Social links">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>

            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>

            <a href="mailto:correo@ejemplo.com" aria-label="Email">
              <FaEnvelope />
            </a>
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
