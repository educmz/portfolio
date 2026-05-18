"use client";

import Image from "next/image";

type AboutProps = {
  language: "es" | "en";
};

export default function About({ language }: AboutProps) {
  const content = {
    es: {
      tag: "SOBRE MI",
      title: "Aprendo construyendo productos web utiles, ordenados y visualmente cuidados.",
      text:
        "Soy Eduardo Chacaliaza, estudiante de Ingenieria de Software en la UPC. Trabajo en proyectos web donde puedo unir estructura, criterio visual y buenas practicas para convertir ideas en interfaces funcionales, mantenibles y faciles de usar.",
      support:
        "Me interesa crecer como desarrollador frontend y full stack, aportando con codigo claro, curiosidad tecnica y atencion al detalle.",
      caption: "Software Engineering · UPC · Web Development",
    },
    en: {
      tag: "ABOUT ME",
      title: "I learn by building useful, organized and visually polished web products.",
      text:
        "I'm Eduardo Chacaliaza, a Software Engineering student at UPC. I build web projects that combine structure, visual judgement and development best practices to turn ideas into functional, maintainable and easy-to-use interfaces.",
      support:
        "My goal is to grow as a frontend and full-stack developer by contributing clean code, technical curiosity and attention to detail.",
      caption: "Software Engineering · UPC · Web Development",
    },
  };

  const text = content[language];

  const photos = [
    {
      src: "/images/profile/eduardo.jpg",
      alt: "Eduardo Chacaliaza",
      className: "photo-one",
    },
    {
      src: "/images/profile/universidad.jpg",
      alt: "UPC campus",
      className: "photo-two",
    },
    {
      src: "/images/profile/eduardo.jpg",
      alt: "Retrato de Eduardo Chacaliaza",
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

        <div className="photo-stack" aria-label="About image gallery">
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
