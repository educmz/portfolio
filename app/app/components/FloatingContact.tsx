"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";

type ContactMethod = "whatsapp" | "email";
type FloatingContactProps = {
  language: "es" | "en";
};

const email = "echacaliazaminaya@gmail.com";
const whatsappNumber = "51948742332";
const formspreeEndpoint = "https://formspree.io/f/xlgvdlrq";

export const openFloatingContact = () => {
  window.dispatchEvent(new Event("open-floating-contact"));
};

export default function FloatingContact({ language }: FloatingContactProps) {
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<ContactMethod>("whatsapp");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  const content = {
    es: {
      subject: "Contacto desde el portfolio de Eduardo",
      eyebrow: "Contacto rápido",
      title: "Cuéntame qué quieres construir",
      description:
        "Comparte una idea breve y elige si prefieres continuar por WhatsApp o correo.",
      close: "Cerrar formulario",
      open: "Abrir formulario de contacto",
      name: "Tu nombre",
      method: "Enviar mensaje por",
      whatsapp: "WhatsApp",
      email: "Correo",
      projectType: "Tipo de proyecto",
      options: [
        ["aplicación web", "Aplicación web"],
        ["sistema interno", "Sistema interno"],
        ["aplicación desktop", "Aplicación desktop"],
        ["integración con IA", "Integración con IA"],
        ["otro tipo de software", "Otro"],
      ],
      message: "Cuéntame brevemente qué necesitas",
      send: "Enviar mensaje",
      sending: "Enviando...",
      sent: "Mensaje enviado",
      sentDetail: "Mensaje enviado. Te responderé pronto.",
      error: "No se pudo enviar. Intenta nuevamente.",
      botField: "No completar este campo",
      naturalMessage: (name: string, projectType: string, message: string) =>
        `Hola Eduardo, soy ${name}. Vi tu portfolio y quiero conversar sobre ${projectType}. Te cuento brevemente: ${message}`,
    },
    en: {
      subject: "Contact from Eduardo's portfolio",
      eyebrow: "Quick contact",
      title: "Tell me what you want to build",
      description:
        "Share a brief idea and choose whether you prefer to continue by WhatsApp or email.",
      close: "Close form",
      open: "Open contact form",
      name: "Your name",
      method: "Send message by",
      whatsapp: "WhatsApp",
      email: "Email",
      projectType: "Project type",
      options: [
        ["web application", "Web application"],
        ["internal system", "Internal system"],
        ["desktop application", "Desktop application"],
        ["AI integration", "AI integration"],
        ["another type of software", "Other"],
      ],
      message: "Briefly tell me what you need",
      send: "Send message",
      sending: "Sending...",
      sent: "Message sent",
      sentDetail: "Message sent. I will reply soon.",
      error: "The message could not be sent. Please try again.",
      botField: "Do not fill this field",
      naturalMessage: (name: string, projectType: string, message: string) =>
        `Hi Eduardo, I'm ${name}. I saw your portfolio and want to talk about ${projectType}. Briefly: ${message}`,
    },
  };

  const text = content[language];

  useEffect(() => {
    const openPanel = () => {
      setStatus("idle");
      setOpen(true);
    };

    window.addEventListener("open-floating-contact", openPanel);

    return () => window.removeEventListener("open-floating-contact", openPanel);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const honeypot = String(formData.get("company") ?? "").trim();

    if (honeypot) {
      form.reset();
      setStatus("idle");
      return;
    }

    const name = String(formData.get("name") ?? "").trim();
    const projectType = String(formData.get("projectType") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const naturalMessage = text.naturalMessage(name, projectType, message);

    formData.set("formatted_message", naturalMessage);
    formData.set("_subject", text.subject);
    formData.set("email_to", email);
    formData.set("method", method);

    if (method === "whatsapp") {
      setStatus("sending");

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(naturalMessage)}`,
        "_blank",
        "noopener,noreferrer",
      );

      setStatus("sent");
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
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Message could not be sent.");
      }

      setStatus("sent");
      form.reset();
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
            aria-label={text.close}
          >
            <FaTimes />
          </button>

          <p className="floating-contact-eyebrow">{text.eyebrow}</p>
          <h3>{text.title}</h3>
          <p>{text.description}</p>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value={text.subject} />
            <input type="hidden" name="email_to" value={email} />
            <input type="hidden" name="method" value={method} />
            <input type="hidden" name="formatted_message" value="" readOnly />

            <label className="floating-contact-honeypot" aria-hidden="true">
              {text.botField}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            <input type="text" name="name" placeholder={text.name} required />

            <label className="floating-contact-label">{text.method}</label>

            <div className="floating-contact-method" aria-label={text.method}>
              <button
                className={method === "whatsapp" ? "is-active" : ""}
                type="button"
                disabled={status === "sending"}
                onClick={() => setMethod("whatsapp")}
              >
                {text.whatsapp}
              </button>

              <button
                className={method === "email" ? "is-active" : ""}
                type="button"
                disabled={status === "sending"}
                onClick={() => setMethod("email")}
              >
                {text.email}
              </button>
            </div>

            <select name="projectType" required defaultValue="">
              <option value="" disabled>
                {text.projectType}
              </option>
              {text.options.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              placeholder={text.message}
              rows={4}
              required
            />

            <button type="submit" disabled={status === "sending"}>
              {status === "sending"
                ? text.sending
                : status === "sent"
                  ? text.sent
                  : text.send}
            </button>

            {status === "sent" && (
              <span className="floating-contact-feedback">
                {text.sentDetail}
              </span>
            )}

            {status === "error" && (
              <span className="floating-contact-feedback is-error">
                {text.error}
              </span>
            )}
          </form>
        </div>
      )}

      <button
        className="floating-contact-button"
        type="button"
        onClick={() => {
          setStatus("idle");
          setOpen((value) => !value);
        }}
        aria-label={text.open}
        aria-expanded={open}
      >
        <FaCommentDots />
      </button>
    </div>
  );
}
