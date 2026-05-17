"use client";

import { motion } from "framer-motion";

type ContactProps = {
  language: "es" | "en";
};

export default function Contact({ language }: ContactProps) {
  const content = {
    es: {
      title: "Construyamos algo moderno juntos",
      highlight: "moderno",
      text: "Estoy abierto a conectar, colaborar y participar en nuevos proyectos donde pueda aportar, aprender y seguir creciendo como ingeniero de software.",
      primary: "Iniciar conversación",
      secondary: "Descargar CV",
      available: "Disponible para nuevos proyectos",
      location: "Lima, Perú",
      response: "Respuesta dentro de 24h",
    },
    en: {
      title: "Let’s build something modern together",
      highlight: "modern",
      text: "I am open to connecting, collaborating and joining new projects where I can contribute, learn and continue growing as a software engineer.",
      primary: "Start a conversation",
      secondary: "Download CV",
      available: "Available for new projects",
      location: "Lima, Peru",
      response: "Response within 24h",
    },
  };

  const text = content[language];

  return (
    <section id="contacto" className="contact">
      <motion.div
        className="contact-content"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <h2>
          {language === "es" ? (
            <>
              Construyamos algo <span>moderno</span> juntos
            </>
          ) : (
            <>
              Let’s build something <span>modern</span> together
            </>
          )}
        </h2>

        <p>{text.text}</p>

        <div className="contact-actions">
          <a href="mailto:TU_CORREO_AQUI" className="btn btn-primary">
            {text.primary}
          </a>

          <a href="/cv.pdf" className="btn btn-secondary" download>
            {text.secondary}
          </a>
        </div>

        <div className="contact-meta">
          <p>
            <span></span>
            {text.available}
          </p>
          <p>{text.location}</p>
          <p>{text.response}</p>
        </div>
      </motion.div>
    </section>
  );
}