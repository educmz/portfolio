import SkillsGlobe from "./SkillsGlobe";

type SkillsProps = {
  language: "es" | "en";
};

export default function Skills({ language }: SkillsProps) {
  const content = {
    es: {
      tag: "STACK TECNICO",
      title: "Herramientas con las que construyo",
      description:
        "Trabajo con tecnologias modernas para crear interfaces web, conectar servicios, modelar datos y mantener proyectos claros desde la idea hasta la entrega.",
      groups: ["Frontend", "Backend", "Bases de datos", "Herramientas"],
    },
    en: {
      tag: "TECH STACK",
      title: "Tools I build with",
      description:
        "I use modern technologies to craft web interfaces, connect services, model data and keep projects clear from idea to delivery.",
      groups: ["Frontend", "Backend", "Databases", "Tools"],
    },
  };

  const text = content[language];

  return (
    <section id="habilidades" className="skills" aria-labelledby="skills-title">
      <div className="skills-layout">
        <div className="skills-info">
          <p className="section-tag">{text.tag}</p>
          <h2 id="skills-title">{text.title}</h2>
          <p>{text.description}</p>

          <div className="skills-pills" aria-label="Skill areas">
            {text.groups.map((group) => (
              <span key={group}>{group}</span>
            ))}
          </div>
        </div>

        <div className="skills-visual" aria-label="Interactive technology globe">
          <SkillsGlobe />
        </div>
      </div>
    </section>
  );
}
