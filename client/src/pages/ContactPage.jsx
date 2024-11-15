import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Loader2, AlertCircle, CheckCircle } from "lucide-react"; // Importing icons

const ContactForm = () => {
  const form = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(false);
    setErrorMessage("");

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, "YOUR_PUBLIC_KEY")
      .then(
        (result) => {
          console.log(result.text);
          setFormSubmitted(true);
          setLoading(false);
        },
        (error) => {
          console.error("Error sending email:", error);
          setErrorMessage("Something went wrong! Please try again later. Error: " + error.text);
          setFormError(true);
          setLoading(false);
        }
      );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-neutral-100)]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h3 className="text-left text-4xl pb-6 font-bold text-[var(--color-neutral-900)]">Contact Us</h3>
        
        {formError && (
          <div className="flex items-center text-red-600 text-lg mb-4">
            <AlertCircle className="mr-2" />
            <p>{errorMessage}</p>
          </div>
        )}
        
        {formSubmitted ? (
          <div className="flex items-center text-green-500 text-lg">
            <CheckCircle className="mr-2" />
            <p>Thank you for your message! We&apos;ll get back to you shortly!</p>
          </div>
        ) : (
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-4">
              <label className="block text-[var(--color-neutral-700)] text-lg">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full border border-[var(--color-neutral-300)] rounded-md p-3 text-lg focus:outline-none focus:ring focus:ring-[var(--color-primary-200)] transition duration-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[var(--color-neutral-700)] text-lg">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="w-full border border-[var(--color-neutral-300)] rounded-md p-3 text-lg focus:outline-none focus:ring focus:ring-[var(--color-primary-200)] transition duration-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[var(--color-neutral-700)] text-lg">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Your Phone Number"
                className="w-full border border-[var(--color-neutral-300)] rounded-md p-3 text-lg focus:outline-none focus:ring focus:ring-[var(--color-primary-200)] transition duration-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[var(--color-neutral-700)] text-lg">Message</label>
              <textarea
                name="message"
                required
                placeholder="Your Message"
                className="w-full border border-[var(--color-neutral-300)] rounded-md p-3 text-lg focus:outline-none focus:ring focus:ring-[var(--color-primary-200)] transition duration-200"
                rows="4"
              />
            </div>
            <button
              type="submit"
              className={`flex items-center justify-center bg-[var(--color-primary-500)] text-white rounded-md p-3 text-lg hover:bg-[var(--color-primary-600)] transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2" />
                  Send
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
