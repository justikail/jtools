"use client";
import { useState } from "react";
import { Send } from "lucide-react";

function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitMessage("Thanks for ur message! We will get back to you soon.");
    setFormState({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
    setTimeout(() => setSubmitMessage(""), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input id="name" name="name" type="text" value={formState.name} onChange={handleChange} required className="w-full px-3 py-2 bg-[#1a1d24] border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400" />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-[#1a1d24] border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formState.subject}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-[#1a1d24] border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 bg-[#1a1d24] border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-yellow-400 text-black font-medium rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#1a1d24] disabled:opacity-50 transition-colors"
      >
        <span>Send Message</span>
        <Send className="h-4 w-4" />
      </button>

      {submitMessage && <div className="p-3 bg-[#2a303a] text-green-400 rounded-md text-center">{submitMessage}</div>}
    </form>
  );
}

export default ContactForm;
