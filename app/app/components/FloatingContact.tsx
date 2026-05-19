"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";

type ContactMethod = "whatsapp" | "email";

const email = "echacaliazaminaya@gmail.com";
const whatsappNumber = "51948742332";
const formspreeEndpoint = "https://formspree.io/f/xlgvdlrq";
const subject = "Contacto desde tu portafolio";

export const openFloatingContact = () => {
  window.dispatchEvent(new Event("open-floating-contact"));
};

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<ContactMethod>("whatsapp");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openPanel = () => setOpen(true);

    window.addEventListener("open-floating-contact", openPanel);

    return () => window.removeEventListener("open-floating-contact", openPanel);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const projectType = String(formData.get("projectType") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const naturalMessage = `Hola Eduardo, soy ${name}. Vi tu portafolio y estoy interesado en conversar contigo sobre ${projectType}. Te cuento brevemente: ${message}`;

    if (method === "whatsapp") {
      const encodedMessage = encodeURIComponent(naturalMessage);

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
        "_blank",
        "noopener,noreferrer",
      );

      setOpen(false);
      form.reset();
      return;
    }

    try {
      setStatus("sending");

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(form),
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar el mensaje.");
      }

      setStatus("sent");
      form.reset();

      window.setTimeout(() => {
        setOpen(false);
        setStatus("idle");
      }, 1800);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="floating-contact" ref={wrapperRef}>
      {open && (
        <div className="floating-contact-panel" role="dialog" aria-modal="false">
          <button
            className="floating-contact-close"
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar formulario"
          >
            <FaTimes />
          </button>

          <p className="floating-contact-eyebrow">Contacto rápido</p>
          <h3>Cuéntame qué quieres construir</h3>
          <p>
            Escríbeme una idea breve y elige si prefieres enviarlo por WhatsApp
            o correo.
          </p>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value={subject} />
            <input type="hidden" name="email_to" value={email} />
            <input type="hidden" name="method" value={method} />

            <input type="text" name="name" placeholder="Tu nombre" required />

            <label className="floating-contact-label">
              Enviar mensaje por
            </label>

            <div className="floating-contact-method" aria-label="Enviar mensaje por">
              <button
                className={method === "whatsapp" ? "is-active" : ""}
                type="button"
                onClick={() => setMethod("whatsapp")}
              >
                WhatsApp
              </button>

              <button
                className={method === "email" ? "is-active" : ""}
                type="button"
                onClick={() => setMethod("email")}
              >
                Correo
              </button>
            </div>

            <select name="projectType" required defaultValue="">
              <option value="" disabled>
                Tipo de proyecto
              </option>
              <option value="una landing page">Landing page</option>
              <option value="una página web">Página web</option>
              <option value="un portafolio">Portafolio</option>
              <option value="un sistema web">Sistema web</option>
              <option value="otro tipo de proyecto">Otro</option>
            </select>

            <textarea
              name="message"
              placeholder="Cuéntame brevemente qué necesitas"
              rows={4}
              required
            />

            <textarea
              name="formatted_message"
              value=""
              readOnly
              hidden
            />

            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Enviando..." : "Enviar mensaje"}
            </button>

            {status === "sent" && (
              <span className="floating-contact-feedback">
                Mensaje enviado correctamente.
              </span>
            )}

            {status === "error" && (
              <span className="floating-contact-feedback is-error">
                No se pudo enviar. Intenta nuevamente.
              </span>
            )}
          </form>
        </div>
      )}

      <button
        className="floating-contact-button"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Abrir formulario de contacto"
        aria-expanded={open}
      >
        <FaCommentDots />
      </button>
    </div>
  );
}