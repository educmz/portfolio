"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaCertificate,
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaTimes,
} from "react-icons/fa";

type ProjectsProps = {
  language: "es" | "en";
};

type Certificate = {
  name: string;
  issuer: string;
  year: string;
  image: string;
};

export default function Projects({ language }: ProjectsProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "certificates">(
    "projects",
  );
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const githubHref = "https://github.com/educmz";
  const linkedinHref =
    "https://www.linkedin.com/in/eduardo-chacaliaza-minaya/";

  const content = {
    es: {
      tag: "PORTAFOLIO",
      title: "Proyectos y certificados",
      description:
        "Una seleccion de trabajos, practicas y certificaciones que muestran mi avance como desarrollador.",
      projects: "Proyectos",
      certificates: "Certificados",
      start: "Start",
      github: "Explorar repositorios",
      linkedin: "Consultar credenciales",
      credential: "Credencial",
      issuedBy: "Emitido por",
      close: "Cerrar certificado",
      imagePlaceholder: "Vista previa",
    },
    en: {
      tag: "PORTFOLIO",
      title: "Projects and certificates",
      description:
        "A curated selection of work, practice and credentials that reflects my growth as a developer.",
      projects: "Projects",
      certificates: "Certificates",
      start: "Start",
      github: "Explore repositories",
      linkedin: "Review credentials",
      credential: "Credential",
      issuedBy: "Issued by",
      close: "Close certificate",
      imagePlaceholder: "Preview",
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
      preview: ["Route planner", "Map layers", "Responsive UI"],
      previewImage: "",
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
      preview: ["Dashboard", "Modules", "Reusable components"],
      previewImage: "",
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
      preview: ["Optimization", "Routes", "Results"],
      previewImage: "",
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
      preview: ["Personal brand", "Sections", "Performance"],
      previewImage: "",
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
      preview: ["Academic flows", "Modeling", "Validation"],
      previewImage: "",
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
      preview: ["Relational data", "Queries", "Control views"],
      previewImage: "",
    },
  ];

  const certificates: Certificate[] = [
    {
      name: "HTML: Creación de páginas web",
      issuer: "Netzun",
      year: "2025",
      image: "/certificates/html-netzun.jpg",
    },
    {
      name: "Introduction to MongoDB",
      issuer: "MongoDB University",
      year: "2025",
      image: "/certificates/mongodb.jpg",
    },
    {
      name: "Scrum Fundamentals",
      issuer: "SCRUMstudy",
      year: "2025",
      image: "/certificates/scrum-fundamentals.jpg",
    },
    {
      name: "Generative AI: Prompt Engineering Basics",
      issuer: "IBM / Coursera",
      year: "2025",
      image: "/certificates/ibm-prompt-engineering.jpg",
    },
    {
      name: "Generative AI: Introduction and Applications",
      issuer: "IBM / Coursera",
      year: "2025",
      image: "/certificates/ibm-generative-ai-intro.jpg",
    },
    {
      name: "Generative AI: Foundation Models and Platforms",
      issuer: "IBM / Coursera",
      year: "2025",
      image: "/certificates/ibm-foundation-models.jpg",
    },
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

        <div className="portfolio-panel">
          {activeTab === "projects" ? (
          <>
            <div className="projects-showcase">
              {projects.map((project) => (
                <article className="project-showcase-card" key={project.number}>
                  <div className="project-preview" aria-hidden="true">
                    {project.previewImage ? (
                      <Image
                        src={project.previewImage}
                        alt=""
                        fill
                        sizes="(max-width: 1120px) 50vw, 33vw"
                      />
                    ) : (
                      <>
                        <span className="preview-number">{project.number}</span>
                        <div>
                          {project.preview.map((item) => (
                            <span key={item}>{item}</span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

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
              <a href={githubHref} target="_blank" rel="noreferrer" className="btn btn-outline">
                <FaGithub />
                {text.github}
              </a>
            </div>
          </>
          ) : (
          <>
            <div className="certificates-grid">
              {certificates.map((certificate) => (
                <button
                  className="certificate-card"
                  key={certificate.name}
                  type="button"
                  onClick={() => setSelectedCertificate(certificate)}
                >
                  <span className="certificate-preview" aria-hidden="true">
                    {certificate.image ? (
                      <Image
                        src={certificate.image}
                        alt=""
                        fill
                        sizes="(max-width: 1120px) 50vw, 33vw"
                      />
                    ) : (
                      <>
                        <span className="certificate-ribbon" />
                        <FaCertificate />
                        <span className="certificate-preview-label">
                          {text.imagePlaceholder}
                        </span>
                      </>
                    )}
                  </span>
                  <span className="certificate-copy">
                    <span className="certificate-name">{certificate.name}</span>
                    <span>{certificate.issuer}</span>
                    <span>{certificate.year}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="section-cta">
              <a href={linkedinHref} target="_blank" rel="noreferrer" className="btn btn-outline">
                <FaLinkedin />
                {text.linkedin}
              </a>
            </div>
          </>
          )}
        </div>
      </div>

      {selectedCertificate ? (
        <div
          className="certificate-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          onClick={() => setSelectedCertificate(null)}
        >
          <div className="certificate-modal-card" onClick={(event) => event.stopPropagation()}>
            <button
              className="certificate-modal-close"
              type="button"
              aria-label={text.close}
              onClick={() => setSelectedCertificate(null)}
            >
              <FaTimes />
            </button>

            <div className="certificate-sheet">
              {selectedCertificate.image ? (
                <Image
                  src={selectedCertificate.image}
                  alt={`${selectedCertificate.name} ${text.credential}`}
                  fill
                  sizes="min(100vw, 720px)"
                />
              ) : (
                <>
                  <span className="certificate-sheet-mark">
                    <FaCertificate />
                  </span>
                  <p className="section-tag">{text.credential}</p>
                  <h3 id="certificate-modal-title">{selectedCertificate.name}</h3>
                  <p>
                    {text.issuedBy}: {selectedCertificate.issuer}
                  </p>
                  <span>{selectedCertificate.year}</span>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
