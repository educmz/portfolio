"use client";

import { useState } from "react";
import { FaCertificate, FaCode, FaExternalLinkAlt, FaGithub, FaLinkedin } from "react-icons/fa";

type ProjectsProps = {
  language: "es" | "en";
};

export default function Projects({ language }: ProjectsProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "certificates">(
    "projects",
  );

  const content = {
    es: {
      tag: "PORTAFOLIO",
      title: "Proyectos y certificados",
      description:
        "Una seleccion de trabajos, practicas y certificaciones que muestran mi avance como desarrollador.",
      projects: "Proyectos",
      certificates: "Certificados",
      start: "Start",
      github: "Ver todo en GitHub",
      linkedin: "Ver el resto en LinkedIn",
      credential: "Credencial",
    },
    en: {
      tag: "PORTFOLIO",
      title: "Projects and certificates",
      description:
        "A curated selection of work, practice and credentials that reflects my growth as a developer.",
      projects: "Projects",
      certificates: "Certificates",
      start: "Start",
      github: "See all on GitHub",
      linkedin: "See more on LinkedIn",
      credential: "Credential",
    },
  };

  const text = content[language];

  const projects = [
    {
      number: "01",
      type: "WEB APP",
      title: "AquaRuta",
      description:
        language === "es"
          ? "Aplicacion para visualizar rutas y apoyar decisiones con una interfaz clara y responsive."
          : "Application for visualizing routes and supporting decisions through a clear, responsive interface.",
      tags: ["React", "Maps", "UX"],
      link: "#",
    },
    {
      number: "02",
      type: "FULL STACK",
      title: "Nexo",
      description:
        language === "es"
          ? "Proyecto web modular con enfoque en gestion, componentes reutilizables y experiencia de usuario."
          : "Modular web project focused on management flows, reusable components and user experience.",
      tags: ["Next.js", "Node.js", "API"],
      link: "#",
    },
    {
      number: "03",
      type: "ALGORITHMS",
      title: "OptiRuta",
      description:
        language === "es"
          ? "Proyecto academico orientado a rutas, optimizacion y visualizacion de resultados."
          : "Academic project focused on routes, optimization and result visualization.",
      tags: ["Algorithms", "React", "Data"],
      link: "#",
    },
    {
      number: "04",
      type: "LANDING",
      title: "Portfolio UI",
      description:
        language === "es"
          ? "Interfaz personal optimizada para presentar proyectos, habilidades y datos de contacto."
          : "Personal interface optimized to present projects, skills and contact information.",
      tags: ["Next.js", "CSS", "SEO"],
      link: "#",
    },
    {
      number: "05",
      type: "SOFTWARE",
      title: "Sistema Academico",
      description:
        language === "es"
          ? "Practica de modelado, logica de negocio y organizacion de codigo para flujos academicos."
          : "Practice in modeling, business logic and code organization for academic workflows.",
      tags: ["TypeScript", "Logic", "UI"],
      link: "#",
    },
    {
      number: "06",
      type: "DATABASE",
      title: "Data Manager",
      description:
        language === "es"
          ? "Ejercicio de integracion de datos con consultas, estructura relacional y vistas de control."
          : "Data integration exercise with queries, relational structure and control views.",
      tags: ["MySQL", "Node.js", "CRUD"],
      link: "#",
    },
  ];

  const certificates = [
    "React",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Git",
    "SQL",
    "Python",
    "UX Basics",
    "Web Design",
    "APIs",
    "Software Engineering",
  ];

  return (
    <section id="proyectos" className="projects" aria-labelledby="projects-title">
      <div className="projects-container">
        <div className="projects-header">
          <p className="section-tag">{text.tag}</p>
          <h2 id="projects-title">{text.title}</h2>
          <p>{text.description}</p>
        </div>

        <div className="projects-tabs" role="tablist" aria-label={text.title}>
          <button
            className={activeTab === "projects" ? "active" : ""}
            onClick={() => setActiveTab("projects")}
            type="button"
            role="tab"
            aria-selected={activeTab === "projects"}
          >
            <FaCode />
            {text.projects}
          </button>

          <button
            className={activeTab === "certificates" ? "active" : ""}
            onClick={() => setActiveTab("certificates")}
            type="button"
            role="tab"
            aria-selected={activeTab === "certificates"}
          >
            <FaCertificate />
            {text.certificates}
          </button>
        </div>

        {activeTab === "projects" ? (
          <>
            <div className="projects-showcase">
              {projects.map((project) => (
                <article className="project-showcase-card" key={project.number}>
                  <div className="project-meta">
                    <span>{project.number}</span>
                    <span>{project.type}</span>
                  </div>

                  <div className="project-title-row">
                    <h3>{project.title}</h3>
                    <a href={project.link} className="start-link" aria-label={`${text.start} ${project.title}`}>
                      {text.start}
                      <FaExternalLinkAlt />
                    </a>
                  </div>

                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="section-cta">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="btn btn-outline">
                <FaGithub />
                {text.github}
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="certificates-grid">
              {certificates.map((certificate) => (
                <article className="certificate-card" key={certificate}>
                  <span className="certificate-icon">
                    <FaCertificate />
                  </span>
                  <h3>{certificate}</h3>
                  <p>{text.credential}</p>
                </article>
              ))}
            </div>

            <div className="section-cta">
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="btn btn-outline">
                <FaLinkedin />
                {text.linkedin}
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
