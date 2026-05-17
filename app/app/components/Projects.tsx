type ProjectsProps = {
  language: "es" | "en";
};

export default function Projects({ language }: ProjectsProps) {
  const content = {
    es: {
      title: "Proyectos",
      intro: "Espacio reservado para proyectos web, aplicaciones y trabajos académicos seleccionados.",
      status: "Próximamente",
      items: [
        "Landing pages",
        "Aplicaciones web",
        "Proyectos universitarios",
      ],
    },
    en: {
      title: "Projects",
      intro: "Reserved space for selected web projects, applications and academic work.",
      status: "Coming soon",
      items: [
        "Landing pages",
        "Web applications",
        "University projects",
      ],
    },
  };

  const text = content[language];

  return (
    <section id="proyectos" className="projects">
      <h2>{text.title}</h2>
      <p>{text.intro}</p>

      <div className="projects-grid">
        {text.items.map((project) => (
          <article className="project-card" key={project}>
            <p className="project-status">{text.status}</p>
            <h3>{project}</h3>
            <p>
              {language === "es"
                ? "Este espacio será actualizado con proyectos desarrollados, enlaces de repositorio y demos."
                : "This space will be updated with developed projects, repository links and demos."}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}