import { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = "service_0taigjq"; // From EmailJS dashboard
    const templateID = "template_3e5aw0n "; // From EmailJS dashboard
    const userID = "ocU5N8Ol3DBu6hUuZ"; // From EmailJS dashboard

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then(() => {
        setSuccess(true);
        setError(false);
        setIsSubmitting(false);
        setFormData({ name: "", email: "", message: "" }); // Clear the form
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setIsSubmitting(false);
      });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-form-container">
        <h2>Contact Me</h2>
        {success &&
          toast("email got sent successfully!", {
            type: "success",
          })}
        {error &&
          toast("ops! something went wrong", {
            type: "error",
          })}
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
