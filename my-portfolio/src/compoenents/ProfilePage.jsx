import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Code,
  Palette,
  Rocket,
  Database,
  Wrench,
  Server,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import * as THREE from "three";
import findMyHomeImg from "../assets/findmyhome.png";
import stepifyImg from "../assets/stepify.png";
import weatherApp from "../assets/weatherapp.png";
import taskManagement from "../assets/taskmanagement.png";
import profileImg from "../assets/avatar.jpg"; // Add your profile image
import aboutImg from "../assets/avatar.jpg"; // Add your about image
import resumePDF from "../assets/Aswinraj_R_MERN_Resume.pdf"; // Add your resume PDF
import Contact from "./Contact";

// Add Tailwind CSS CDN if not already included
if (!document.querySelector('link[href*="tailwindcss"]')) {
  const link = document.createElement("link");
  link.href = "https://cdn.tailwindcss.com";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

// Skills data
const skills = [
  { name: "MongoDB", level: 80, icon: <Database className="w-6 h-6" /> },
  { name: "Express.js", level: 90, icon: <Rocket className="w-6 h-6" /> },
  { name: "React.js", level: 90, icon: <Code className="w-6 h-6" /> },
  { name: "Node.js", level: 95, icon: <Rocket className="w-6 h-6" /> },
  { name: "JavaScript", level: 90, icon: <Code className="w-6 h-6" /> },
  { name: "Redux", level: 85, icon: <Code className="w-6 h-6" /> },
  { name: "Tailwind CSS", level: 80, icon: <Palette className="w-6 h-6" /> },
  { name: "Bootstrap", level: 80, icon: <Palette className="w-6 h-6" /> },
  { name: "Firebase", level: 65, icon: <Server className="w-6 h-6" /> },
  { name: "MySQL", level: 65, icon: <Database className="w-6 h-6" /> },
  { name: "HTML & CSS", level: 90, icon: <Palette className="w-6 h-6" /> },
  { name: "Git", level: 85, icon: <Wrench className="w-6 h-6" /> },
  { name: "Postman", level: 80, icon: <Wrench className="w-6 h-6" /> },
  { name: "Figma", level: 75, icon: <Palette className="w-6 h-6" /> },
  { name: "Docker", level: 65, icon: <Server className="w-6 h-6" /> },
  { name: "EC2 (AWS)", level: 70, icon: <Server className="w-6 h-6" /> },
  { name: "Data Structures", level: 75, icon: <Code className="w-6 h-6" /> },
  { name: "OOPS", level: 75, icon: <Rocket className="w-6 h-6" /> },
];

// Image Slider Component
const ImageSlider = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-48 overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProfilePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  // Contact information
  const contactInfo = {
    email: "aswinrajr07@gmail.com",
    github: "https://github.com/Aswinrajr",
    linkedin: "https://www.linkedin.com/in/aswinrajr07",
    mobile: "+91 9074140114",
  };

  // Three.js setup
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create floating geometric shapes
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    const shapes = [];
    for (let i = 0; i < 5; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(mesh);
      shapes.push(mesh);
    }

    camera.position.z = 10;
    sceneRef.current = { scene, camera, renderer, shapes };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  // Scroll handler for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = resumePDF;
    link.download = "Aswinraj_R_Resume.pdf";
    link.click();
  };

  const openLink = (url) => {
    window.open(url, "_blank");
  };

  const projects = [
    {
      title: "Find My Home",
      description: "A comprehensive room booking website",
      tech: ["React", "Node.js", "MongoDB", "Razorpay", "Socket.io"],
      images: [findMyHomeImg], // Add more images if you have them
      github: "https://github.com/Aswinrajr/Test_frontend-roombooking.git",
      live: "https://test-frontend-roombooking.vercel.app",
    },
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and MongoDB",
      tech: ["ejs", "Node.js", "MongoDB", "Razorpay"],
      images: [stepifyImg], // Add more images if you have them
      github: "https://github.com/Aswinrajr/mini-project-stepify.git",
      live: "https://mini-project-stepify.onrender.com",
    },
    {
      title: "Weather App",
      description:
        "Real-time weather application with beautiful UI and animations",
      tech: ["React", "API Integration", "CSS3", "Chart.js"],
      images: [weatherApp], // Add more images if you have them
      github: "https://github.com/Aswinrajr/Weather-App.git",
      live: "https://weather-app-react-coral-seven.vercel.app",
    },
    {
      title: "Task Management",
      description:
        "A web app to manage tasks with simple CRUD features and a focus on ease of use.",
      tech: ["React", "Tailwind CSS", "Node.js"],
      images: [taskManagement], // Add more images if you have them
      github: "https://github.com/Aswinrajr/TaskManagement_Fontend.git",
      live: "https://task-management-fontend.vercel.app",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-x-hidden">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "transparent" }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Aswinraj R
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "contact"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-colors duration-200 hover:text-purple-400 ${
                      activeSection === section
                        ? "text-purple-400"
                        : "text-white"
                    }`}
                  >
                    {section}
                  </button>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/30 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-2 space-y-1">
              {["home", "about", "skills", "projects", "contact"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left px-3 py-2 capitalize hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {section}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4"
      >
        <div className="text-center z-10">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={profileImg}
                  alt="Aswinraj R"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Aswinraj R
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            MERN Full Stack Developer
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <button
              onClick={() => openLink(contactInfo.github)}
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </button>
            <button
              onClick={() => openLink(contactInfo.linkedin)}
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </button>
            <button
              onClick={() =>
                (window.location.href = `mailto:${contactInfo.email}`)
              }
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-6 h-6" />
            </button>
            <button
              onClick={() =>
                (window.location.href = `tel:${contactInfo.mobile}`)
              }
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <Phone className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </button>
            <button
              onClick={downloadResume}
              className="px-8 py-3 border-2 border-purple-400 rounded-full hover:bg-purple-400 hover:text-black transition-all duration-300"
            >
              <Download className="w-5 h-5 inline mr-2" />
              Download CV
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a self-taught MERN Full Stack Developer with a passion for
                building scalable web applications. I specialize in React.js,
                Node.js, and MongoDB, and I enjoy turning ideas into
                high-quality code.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                With 1 year of hands-on experience, I've developed user-friendly
                interfaces and robust backend systems. I'm committed to
                continuous learning and thrive in collaborative environments
                where I can contribute to impactful solutions.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold text-purple-400">15+</div>
                  <div className="text-sm text-gray-400">
                    Projects Completed <br />{" "}
                    <span>(Inc. Company,Major,Mini Projects)</span>
                  </div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold text-pink-400">1+</div>
                  <div className="text-sm text-gray-400">Year Experience</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
                <img
                  src={aboutImg}
                  alt="About Aswinraj R"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="text-purple-400 mr-3">{skill.icon}</div>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400">{skill.level}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <ImageSlider images={project.images} title={project.title} />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-purple-600/20 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => openLink(project.github)}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </button>
                    <button
                      onClick={() => openLink(project.live)}
                      className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Aswinraj R.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
