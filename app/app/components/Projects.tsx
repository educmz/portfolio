"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaCertificate,
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
  FaImage,
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

type Project = {
  number: string;
  title: string;
  stack: string[];
  visibleStack: string[];
  preview: string[];
  image: string;
  deployUrl: string;
  githubUrl: string;
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
      tag: "PORTFOLIO",
      projectsTitle: "Proyectos",
      projectsDescription:
        "Una seleccion de proyectos con enfoque en producto, arquitectura clara y experiencias listas para crecer.",
      certificatesTitle: "Certificados",
      certificatesDescription:
        "Credenciales y formacion tecnica que respaldan mi aprendizaje en desarrollo, datos, metodologia e IA.",
      projects: "Proyectos",
      certificates: "Certificados",
      viewProject: "Ver proyecto",
      inProgress: "En desarrollo",
      imageReady: "Preview del proyecto",
      github: "Ver GitHub",
      linkedin: "Consultar credenciales",
      credential: "Credencial",
      issuedBy: "Emitido por",
      close: "Cerrar certificado",
      imagePlaceholder: "Preview preparado",
      projectTabs: "Cambiar vista del portfolio",
      openCertificate: "Abrir certificado",
    },
    en: {
      tag: "PORTFOLIO",
      projectsTitle: "Projects",
      projectsDescription:
        "A selection of projects focused on product thinking, clear architecture and experiences ready to grow.",
      certificatesTitle: "Certificates",
      certificatesDescription:
        "Credentials and technical training that support my growth in development, data, methodology and AI.",
      projects: "Projects",
      certificates: "Certificates",
      viewProject: "View project",
      inProgress: "In progress",
      imageReady: "Project preview",
      github: "View GitHub",
      linkedin: "Review credentials",
      credential: "Credential",
      issuedBy: "Issued by",
      close: "Close certificate",
      imagePlaceholder: "Preview ready",
      projectTabs: "Switch portfolio view",
      openCertificate: "Open certificate",
    },
  };

  const text = content[language];
  const activeTitle =
    activeTab === "projects" ? text.projectsTitle : text.certificatesTitle;
  const activeDescription =
    activeTab === "projects"
      ? text.projectsDescription
      : text.certificatesDescription;

  const projects: Project[] = [
    {
      number: "01",
      title: "AquaRuta",
      stack: ["Next.js", "TypeScript", "Python", "FastAPI", "Leaflet", "MongoDB"],
      visibleStack: ["Next.js", "Python", "MongoDB"],
      preview: ["Maps", "Routes", "API"],
      image: "",
      deployUrl: "",
      githubUrl: "",
    },
    {
      number: "02",
      title: "LexStudio",
      stack: ["Astro", "Tailwind", "Framer Motion", "SEO"],
      visibleStack: ["Astro", "Tailwind", "SEO"],
      preview: ["Content", "Motion", "SEO"],
      image: "",
      deployUrl: "",
      githubUrl: "",
    },
    {
      number: "03",
      title: "NovaPOS",
      stack: ["Angular", "NestJS", "PostgreSQL", "Prisma"],
      visibleStack: ["Angular", "NestJS", "PostgreSQL"],
      preview: ["Sales", "Inventory", "Ops"],
      image: "",
      deployUrl: "",
      githubUrl: "",
    },
    {
      number: "04",
      title: "AetherAI",
      stack: ["Next.js", "TypeScript", "OpenAI API", "Supabase", "pgvector"],
      visibleStack: ["Next.js", "OpenAI API", "Supabase", "pgvector"],
      preview: ["AI", "Vectors", "Knowledge"],
      image: "",
      deployUrl: "",
      githubUrl: "",
    },
    {
      number: "05",
      title: "Nexo",
      stack: ["Electron", "React", "TypeScript", "SQLite", "Tailwind"],
      visibleStack: ["Electron", "React", "SQLite"],
      preview: ["Desktop", "Local DB", "Modules"],
      image: "",
      deployUrl: "",
      githubUrl: "",
    },
    {
      number: "06",
      title: "Urbana",
      stack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Prisma"],
      visibleStack: ["Next.js", "Stripe", "PostgreSQL"],
      preview: ["Payments", "Catalog", "Data"],
      image: "",
      deployUrl: "",
      githubUrl: "",
    },
  ];

  const certificates: Certificate[] = [
    {
      name: "HTML: Creacion de paginas web",
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
          <h2 id="projects-title">{activeTitle}</h2>
          <p>{activeDescription}</p>
        </div>

        <div className="projects-tabs" role="tablist" aria-label={text.projectTabs}>
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
                {projects.map((project) => {
                  const projectHref = project.deployUrl || project.githubUrl;

                  return (
                    <article className="project-showcase-card" key={project.number}>
                      <div className="project-preview" aria-hidden="true">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt=""
                            fill
                            sizes="(max-width: 1120px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="project-preview-placeholder">
                            <span className="preview-number">{project.number}</span>
                            <span className="preview-icon">
                              <FaImage />
                            </span>
                            <strong>{text.imageReady}</strong>
                            <span>{project.preview.join(" - ")}</span>
                          </div>
                        )}
                      </div>

                      <div className="project-title-row">
                        <h3>{project.title}</h3>
                        {projectHref ? (
                          <a
                            href={projectHref}
                            target="_blank"
                            rel="noreferrer"
                            className="project-link"
                            aria-label={`${text.viewProject}: ${project.title}`}
                          >
                            {text.viewProject}
                            <FaExternalLinkAlt />
                          </a>
                        ) : (
                          <span className="project-link is-disabled">
                            {text.inProgress}
                            <FaExternalLinkAlt />
                          </span>
                        )}
                      </div>

                      <div className="project-tags" aria-label={project.stack.join(", ")}>
                        {project.visibleStack.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </article>
                  );
                })}
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
                    aria-label={`${text.openCertificate}: ${certificate.name}`}
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
                  sizes="min(100vw, 1040px)"
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
