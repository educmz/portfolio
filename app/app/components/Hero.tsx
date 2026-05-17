type HeroProps = {
  language: "es" | "en";
};

export default function Hero({ language }: HeroProps) {
  const content = {
    es: {
      tag: "Estudiante de Ingeniería de Software",
      title: "Construyendo soluciones digitales modernas, funcionales y escalables.",
      description:
        "Soy Eduardo Fabian Chacaliaza Minaya, estudiante de Ingeniería de Software en la UPC. Me enfoco en desarrollar proyectos con una base técnica sólida, cuidando la estructura, la experiencia de usuario y las buenas prácticas de desarrollo.",
      primaryButton: "Ver proyectos",
      secondaryButton: "Contactarme",
    },
    en: {
      tag: "Software Engineering Student",
      title: "Building modern, functional and scalable digital solutions.",
      description:
        "I am Eduardo Fabian Chacaliaza Minaya, a Software Engineering student at UPC. I focus on developing projects with a solid technical foundation, paying attention to structure, user experience and software development best practices.",
      primaryButton: "View projects",
      secondaryButton: "Contact me",
    },
  };

  const text = content[language];

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-tag">{text.tag}</p>
        <h1>{text.title}</h1>
        <p className="hero-description">{text.description}</p>

        <div className="hero-buttons">
          <a href="#proyectos" className="btn btn-primary">
            {text.primaryButton}
          </a>
          <a href="#contacto" className="btn btn-secondary">
            {text.secondaryButton}
          </a>
        </div>
      </div>

      <div className="code-card">
        <div className="code-card-header">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <pre>
          <code>{`const developer = {
  name: "Eduardo",
  role: "Software Engineering",
  focus: ["Software", "Web", "Scalability"],
  mindset: "Build. Learn. Improve."
};`}</code>
        </pre>
      </div>
    </section>
  );
}