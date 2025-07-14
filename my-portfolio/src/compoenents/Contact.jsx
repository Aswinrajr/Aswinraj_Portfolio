import React, { useState } from "react";
import { Mail, Github, Linkedin, Phone, CheckCircle } from "lucide-react";

const contactInfo = {
  email: "aswinrajr07@gmail.com",
  github: "https://github.com/Aswinrajr",
  linkedin: "https://www.linkedin.com/in/aswinrajr07",
  mobile: "+91 9074140114",
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [successMessage, setSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showSuccessMessage = () => {
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 4000); // Auto-hide after 4 seconds
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        showSuccessMessage();
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const openLink = (url) => window.open(url, "_blank");

  return (
    <>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
      
      <section id="contact" className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Let's work together</h3>
              <p className="text-gray-300 mb-6">
                I'm always open to discussing new opportunities and interesting
                projects. Feel free to reach out if you'd like to collaborate!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-purple-400" />
                  <span
                    onClick={() =>
                      (window.location.href = `mailto:${contactInfo.email}`)
                    }
                    className="cursor-pointer hover:text-purple-400 transition-colors"
                  >
                    {contactInfo.email}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Github className="w-6 h-6 text-purple-400" />
                  <span
                    onClick={() => openLink(contactInfo.github)}
                    className="cursor-pointer hover:text-purple-400 transition-colors"
                  >
                    {contactInfo.github.replace("https://", "")}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Linkedin className="w-6 h-6 text-purple-400" />
                  <span
                    onClick={() => openLink(contactInfo.linkedin)}
                    className="cursor-pointer hover:text-purple-400 transition-colors"
                  >
                    {contactInfo.linkedin.replace("https://", "")}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-purple-400" />
                  <span
                    onClick={() =>
                      (window.location.href = `tel:${contactInfo.mobile}`)
                    }
                    className="cursor-pointer hover:text-purple-400 transition-colors"
                  >
                    {contactInfo.mobile}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              {successMessage && (
                <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3 animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">Thank you! Your message has been sent successfully.</span>
                </div>
              )}
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none transition-colors"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20 focus:border-purple-400 focus:outline-none transition-colors resize-none"
                ></textarea>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;