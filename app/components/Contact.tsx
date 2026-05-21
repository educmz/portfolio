"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { openFloatingContact } from "./FloatingContact";

type ContactProps = {
  language: "es" | "en";
};

export default function Contact({ language }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const email = "echacaliazaminaya@gmail.com";
  const githubHref = "https://github.com/educmz";
  const linkedinHref =
    "https://www.linkedin.com/in/eduardo-chacaliaza-minaya/";

  const content = {
    es: {
      tag: "CONTACTO",
      title: "Hablemos de un producto, sistema o integración que quieras construir",
      text:
        "Si tienes una idea, una oportunidad de colaboración o un proyecto en marcha, puedo ayudarte a darle estructura técnica, experiencia de uso y una base lista para crecer.",
      email: "Escríbeme",
      github: "Ver GitHub",
      linkedin: "Conectar en LinkedIn",
      details: "Canales de contacto",
      copyEmail: "Copiar correo al portapapeles",
      copied: "Correo copiado",
      copyFallback: "Selecciona y copia el correo",
    },
    en: {
      tag: "CONTACT",
      title: "Let's talk about a product, system or integration you want to build",
      text:
        "If you have an idea, a collaboration opportunity or a project in motion, I can help shape its technical structure, user experience and foundation for growth.",
      email: "Write me",
      github: "View GitHub",
      linkedin: "Connect on LinkedIn",
      details: "Contact channels",
      copyEmail: "Copy email to clipboard",
      copied: "Email copied",
      copyFallback: "Select and copy the email",
    },
  };

  const text = content[language];

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const field = document.createElement("textarea");
        field.value = email;
        field.setAttribute("readonly", "true");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        document.body.removeChild(field);
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

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

        <div className="contact-grid" aria-label={text.details}>
          <button
            type="button"
            className={copied ? "is-copied" : ""}
            onClick={copyEmail}
            aria-label={text.copyEmail}
          >
            {copied ? <FaCheck /> : <FaEnvelope />}
            <span>{copied ? text.copied : email}</span>
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
