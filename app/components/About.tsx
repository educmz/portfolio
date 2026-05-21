"use client";

import Image from "next/image";

type AboutProps = {
  language: "es" | "en";
};

export default function About({ language }: AboutProps) {
  const content = {
    es: {
      tag: "SOBRE MÍ",
      title: "Construyo software útil, claro y bien diseñado.",
      text:
        "Soy Eduardo Chacaliaza, estudiante de Ingeniería de Software. Me interesa crear aplicaciones web, sistemas y herramientas que conecten diseño, lógica de negocio y tecnología para resolver necesidades reales.",
      support:
        "Trabajo con frontend, backend, bases de datos e integración de servicios, buscando que cada proyecto sea funcional, mantenible y visualmente cuidado.",
      caption: "SOFTWARE ENGINEERING · FULL STACK DEVELOPMENT · PRODUCT THINKING",
      gallery: "Galería sobre Eduardo",
      altMain: "Eduardo Chacaliaza",
      altCampus: "Campus UPC",
      altPortrait: "Retrato de Eduardo Chacaliaza",
    },
    en: {
      tag: "ABOUT ME",
      title: "I build useful, clear and well-designed software.",
      text:
        "I'm Eduardo Chacaliaza, a Software Engineering student. I'm interested in creating web applications, systems and tools that connect design, business logic and technology to solve real needs.",
      support:
        "I work with frontend, backend, databases and service integration, aiming for every project to be functional, maintainable and visually polished.",
      caption: "SOFTWARE ENGINEERING · FULL STACK DEVELOPMENT · PRODUCT THINKING",
      gallery: "Eduardo gallery",
      altMain: "Eduardo Chacaliaza",
      altCampus: "UPC campus",
      altPortrait: "Portrait of Eduardo Chacaliaza",
    },
  };

  const text = content[language];

  const photos = [
    {
      src: "/images/profile/upc.png",
      alt: text.altCampus,
      className: "photo-one",
    },
    {
      src: "/images/profile/laptop.png",
      alt: text.altPortrait,
      className: "photo-two",
    },
    {
      src: "/images/profile/eduardo.jpg",
      alt: text.altMain,
      className: "photo-three",
    },
  ];

  return (
    <section id="sobre-mi" className="about" aria-labelledby="about-title">
      <div className="about-polaroid-layout">
        <div className="about-polaroid-text">
          <p className="section-tag">{text.tag}</p>
          <h2 id="about-title">{text.title}</h2>
          <p>{text.text}</p>
          <p>{text.support}</p>

          <span>{text.caption}</span>
        </div>

        <div className="photo-stack" aria-label={text.gallery}>
          {photos.map((photo, index) => (
            <figure
              className={`printed-photo ${photo.className}`}
              key={`${photo.src}-${index}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 720px) 58vw, 285px"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
