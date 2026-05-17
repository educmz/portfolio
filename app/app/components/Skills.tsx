type SkillsProps = {
  language: "es" | "en";
};

export default function Skills({ language }: SkillsProps) {
  const content = {
    es: {
      title: "Habilidades",
      intro: "Tecnologías y herramientas que he utilizado en proyectos y prácticas.",
    },
    en: {
      title: "Skills",
      intro: "Technologies and tools I have used in projects and practice.",
    },
  };

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "C++",
    "MySQL",
    "MongoDB",
    "GitHub",
  ];

  const text = content[language];

  return (
    <section id="habilidades" className="skills">
      <h2>{text.title}</h2>
      <p>{text.intro}</p>

      <div className="skills-grid">
        {skills.map((skill) => (
          <span className="skill-card" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}