import { useState } from "react";
import "./ContactForm.css";

const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.status === 200) {
        setStatus("success");
        form.reset();
        return;
      }

      const data = await response.json().catch(() => null);
      const message =
        data?.errors?.map((err) => err.message).join(", ") ||
        "Une erreur est survenue lors de l'envoi. Merci de réessayer.";
      setErrorMessage(message);
      setStatus("error");
    } catch (error) {
      setErrorMessage(
        "Impossible de contacter le serveur. Vérifiez votre connexion et réessayez."
      );
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__field">
        <label htmlFor="name">Nom</label>
        <input type="text" id="name" name="name" autoComplete="name" required />
      </div>

      <div className="contact-form__field">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" autoComplete="email" required />
      </div>

      <div className="contact-form__field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required />
      </div>

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Envoi en cours..." : "Envoyer"}
      </button>

      {status === "success" && (
        <p className="contact-form__success" role="status">
          Merci ! Votre message a bien été envoyé.
        </p>
      )}

      {status === "error" && (
        <p className="contact-form__error" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
