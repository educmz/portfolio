import SkillsGlobe from "./SkillsGlobe";

type SkillsProps = {
  language: "es" | "en";
};

export default function Skills({ language }: SkillsProps) {
  const content = {
    es: {
      tag: "STACK TÉCNICO",
      title: "Stack para construir software completo",
      description:
        "Combino tecnologías de interfaz, backend y datos para llevar productos desde el prototipo hasta una base mantenible y lista para crecer.",
      groups: ["Frontend", "Backend", "Base de datos"],
      areas: "Áreas técnicas",
      globe: "Globo interactivo de tecnologías",
    },
    en: {
      tag: "TECH STACK",
      title: "A stack for complete software",
      description:
        "I combine interface, backend and data technologies to move products from prototype to a maintainable foundation ready to grow.",
      groups: ["Frontend", "Backend", "Database"],
      areas: "Technical areas",
      globe: "Interactive technology globe",
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

          <div className="skills-pills" aria-label={text.areas}>
            {text.groups.map((group) => (
              <span key={group}>{group}</span>
            ))}
          </div>
        </div>

        <div className="skills-visual" aria-label={text.globe}>
          <SkillsGlobe />
        </div>
      </div>
    </section>
  );
}
