import Image from "next/image";

type AboutProps = {
  language: "es" | "en";
};

export default function About({ language }: AboutProps) {
  const content = {
    es: {
      title: "Sobre mí",
      subtitle: "Ingeniería de Software",
      text: "Soy estudiante de Ingeniería de Software en la UPC, enfocado en construir soluciones digitales bien estructuradas, funcionales y escalables. Me interesa desarrollar proyectos con una base técnica sólida, aplicando aprendizaje constante, disciplina y resolución de problemas.",
    },
    en: {
      title: "About me",
      subtitle: "Software Engineering",
      text: "I am a Software Engineering student at UPC, focused on building well-structured, functional and scalable digital solutions. I am interested in developing projects with a solid technical foundation, applying continuous learning, discipline and problem-solving.",
    },
  };

  const text = content[language];

return (
  <section id="sobre-mi" className="about">
    <div className="about-content">
      <div className="about-text">
        <p className="section-tag">{text.subtitle}</p>
        <h2>{text.title}</h2>
        <p>{text.text}</p>
      </div>
      <div className="about-photo-wrap">
        <div className="about-photo-frame">
          <Image
            src="/images/profile/eduardo.jpg"
            alt="Eduardo Chacaliaza"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  </section>
);
}