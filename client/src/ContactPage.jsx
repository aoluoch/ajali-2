import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

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
    <div className="flex justify-start items-start lg:p-5 font-Encode-Sans mt-10">
      <div className="w-full max-w-lg">
        <h3 className="text-left text-6xl pb-6 font-bold">Contact</h3>
        {formError && <p className="text-red-600 text-xl">{errorMessage}</p>}
        {formSubmitted ? (
          <p className="text-green-500 text-xl">Thank you for your message! We'll get back to you shortly!</p>
        ) : (
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-4 flex items-center">
              <label className="w-1/3 text-gray-700 text-lg">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-2/3 border border-gray-300 rounded-md p-3 text-lg focus:outline-none focus:ring focus:ring-indigo-200 transition duration-200"
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="w-1/3 text-gray-700 text-lg">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="w-2/3 border border-gray-300 rounded-md p-3 text-lg focus:outline-none focus:ring focus:ring-indigo-200 transition duration-200"
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="w-1/3 text-gray-700 text-lg">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Your Phone Number"
                className="w-2/3 border border-gray-300 rounded-md p-3 text-lg focus:outline-none focus:ring focus:ring-indigo-200 transition duration-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg">Message</label>
              <textarea
                name="message"
                required
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-md p-3 text-lg focus:outline-none focus:ring focus:ring-indigo-200 transition duration-200"
                rows="4"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md p-3 text-lg hover:bg-blue-600 transition duration-200"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;