import SkillsGlobe from "./SkillsGlobe";

type SkillsProps = {
  language: "es" | "en";
};

export default function Skills({ language }: SkillsProps) {
  const content = {
    es: {
      tag: "TECH STACK",
      title: "Mis habilidades",
      description:
        "Tecnolog\u00edas y herramientas que utilizo para desarrollar soluciones web, software y experiencias digitales.",
    },
    en: {
      tag: "TECH STACK",
      title: "My Skills",
      description:
        "Technologies and tools I use to build web solutions, software and digital experiences.",
    },
  };

  const text = content[language];

  return (
    <section id="habilidades" className="skills">
      <div className="skills-layout">
        <div className="skills-info">
          <p className="section-tag">{text.tag}</p>
          <h2>{text.title}</h2>
          <p>{text.description}</p>

          <div className="skills-stats">
            <div>
              <strong>13+</strong>
              <span>Tecnolog\u00edas</span>
            </div>

            <div>
              <strong>4</strong>
              <span>\u00c1reas</span>
            </div>

            <div>
              <strong>3+</strong>
              <span>Herramientas</span>
            </div>
          </div>
        </div>

        <div className="skills-visual">
          <SkillsGlobe />
        </div>
      </div>
    </section>
  );
}
