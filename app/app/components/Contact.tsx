type ContactProps = {
  language: "es" | "en";
};

export default function Contact({ language }: ContactProps) {
  const content = {
    es: {
      title: "Contacto",
      text: "Estoy abierto a conectar, colaborar y seguir aprendiendo a través de nuevos proyectos.",
      email: "Correo",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    en: {
      title: "Contact",
      text: "I am open to connecting, collaborating and continuing to learn through new projects.",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  };

  const text = content[language];

  return (
    <section id="contacto" className="contact">
      <h2>{text.title}</h2>
      <p>{text.text}</p>

      <div className="contact-links">
        <a href="mailto:TU_CORREO_AQUI" className="btn btn-primary">
          {text.email}
        </a>

        <a href="https://github.com/TU_USUARIO" className="btn btn-secondary">
          {text.github}
        </a>

        <a href="https://linkedin.com/in/TU_USUARIO" className="btn btn-secondary">
          {text.linkedin}
        </a>
      </div>
    </section>
  );
}