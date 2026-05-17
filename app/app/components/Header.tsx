type HeaderProps = {
  language: "es" | "en";
  setLanguage: (language: "es" | "en") => void;
};

export default function Header({ language, setLanguage }: HeaderProps) {
  const content = {
    es: {
      about: "Sobre mí",
      skills: "Habilidades",
      projects: "Proyectos",
      contact: "Contacto",
    },
    en: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
  };

  const text = content[language];

  return (
    <header className="header">
      <a href="#" className="logo">
        Eduardo<span>.</span>
      </a>

      <nav className="nav">
        <a href="#sobre-mi">{text.about}</a>
        <a href="#habilidades">{text.skills}</a>
        <a href="#proyectos">{text.projects}</a>
        <a href="#contacto">{text.contact}</a>

        <button
          className="language-button"
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
        >
          {language === "es" ? "EN" : "ES"}
        </button>
      </nav>
    </header>
  );
}