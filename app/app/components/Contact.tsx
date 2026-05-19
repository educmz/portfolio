"use client";

import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { openFloatingContact } from "./FloatingContact";

type ContactProps = {
  language: "es" | "en";
};

export default function Contact({ language }: ContactProps) {
  const email = "echacaliazaminaya@gmail.com";
  const githubHref = "https://github.com/educmz";
  const linkedinHref =
    "https://www.linkedin.com/in/eduardo-chacaliaza-minaya/";

  const content = {
    es: {
      tag: "CONTACTO",
      title: "Hablemos de lo que quieres construir",
      text:
        "Si tienes una idea, una oportunidad de colaboracion o un proyecto web en marcha, escribeme y revisamos como llevarlo a una experiencia clara, funcional y bien cuidada.",
      email: "Escribirme",
      github: "Ver GitHub",
      linkedin: "Conectar en LinkedIn",
    },
    en: {
      tag: "CONTACT",
      title: "Let's talk about what you want to build",
      text:
        "If you have an idea, a collaboration opportunity or a web project in motion, reach out and we can shape it into a clear, functional and polished experience.",
      email: "Write me",
      github: "View GitHub",
      linkedin: "Connect on LinkedIn",
    },
  };

  const text = content[language];

  return (
    <section id="contacto" className="contact" aria-labelledby="contact-title">
      <motion.div
        className="contact-content"
        initial={{ opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <p className="section-tag">{text.tag}</p>
        <h2 id="contact-title">{text.title}</h2>
        <p>{text.text}</p>

        <div className="contact-actions">
          <button
            className="btn btn-primary"
            type="button"
            onClick={openFloatingContact}
          >
            <FaEnvelope />
            {text.email}
          </button>

          <a
            href={linkedinHref}
            className="btn btn-secondary"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
            LinkedIn
          </a>
        </div>

        <div className="contact-grid" aria-label="Contact details">
          <button type="button" onClick={openFloatingContact}>
            <FaEnvelope />
            <span>{email}</span>
          </button>
          <a href={linkedinHref} target="_blank" rel="noreferrer">
            <FaLinkedin />
            <span>{text.linkedin}</span>
          </a>
          <a href={githubHref} target="_blank" rel="noreferrer">
            <FaGithub />
            <span>{text.github}</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
