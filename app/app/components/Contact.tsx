"use client";

import { motion } from "framer-motion";
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";

type ContactProps = {
  language: "es" | "en";
};

export default function Contact({ language }: ContactProps) {
  const content = {
    es: {
      tag: "CONTACTO",
      title: "Conversemos sobre tu proximo proyecto",
      text:
        "Si tienes una idea, una oportunidad de colaboracion o un proyecto web en marcha, puedo ayudarte a convertirlo en una experiencia clara, funcional y bien construida.",
      email: "Enviar correo",
      cv: "Descargar CV",
      phone: "Telefono",
    },
    en: {
      tag: "CONTACT",
      title: "Let's talk about your next project",
      text:
        "If you have an idea, a collaboration opportunity or an active web project, I can help turn it into a clear, functional and well-built experience.",
      email: "Send email",
      cv: "Download CV",
      phone: "Phone",
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
          <a href="mailto:correo@ejemplo.com" className="btn btn-primary">
            <FaEnvelope />
            {text.email}
          </a>

          <a href="/cv.pdf" className="btn btn-secondary" download>
            <FaDownload />
            {text.cv}
          </a>
        </div>

        <div className="contact-grid" aria-label="Contact details">
          <a href="mailto:correo@ejemplo.com">
            <FaEnvelope />
            <span>correo@ejemplo.com</span>
          </a>
          <a href="tel:+51999999999">
            <FaPhoneAlt />
            <span>{text.phone}: +51 999 999 999</span>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
            <FaLinkedin />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <FaGithub />
            <span>GitHub</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
