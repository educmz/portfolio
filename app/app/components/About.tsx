type AboutProps = {
  language: "es" | "en";
};

export default function About({ language }: AboutProps) {
  const content = {
    es: {
      title: "Sobre mí",
      text: "Soy estudiante de Ingeniería de Software en la UPC. Me interesa desarrollar soluciones digitales bien estructuradas, aplicando aprendizaje constante, disciplina y resolución de problemas. Valoro el trabajo en equipo, la adaptabilidad y el liderazgo responsable dentro de cada proyecto.",
    },
    en: {
      title: "About me",
      text: "I am a Software Engineering student at UPC. I am interested in developing well-structured digital solutions, applying continuous learning, discipline and problem-solving. I value teamwork, adaptability and responsible leadership in every project.",
    },
  };

  const text = content[language];

  return (
    <section id="sobre-mi" className="about">
      <h2>{text.title}</h2>
      <p>{text.text}</p>
    </section>
  );
}