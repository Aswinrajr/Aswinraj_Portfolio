import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Code,
  Globe,
  Database,
  Server,
  Terminal,
  Cpu,
  Layout,
  Download,
  MapPin,
  Sparkles,
  ExternalLink,
  Smartphone,
} from "lucide-react";

import Background3D from "./Background3D";
import profileImg from "../assets/avatar.jpg";
import findMyHomeImg from "../assets/findmyhome.png";
import stepifyImg from "../assets/stepify.png";
import taskManagement from "../assets/taskmanagement.png";
import resumePDF from "../assets/Aswinraj_R_MERN_Resume.pdf";

// --- 3D TILT COMPONENT ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;
    const xPct = mouseXVal / width - 0.5;
    const yPct = mouseYVal / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative transform-gpu ${className}`}
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </motion.div>
  );
};

// --- STICKY CARD COMPONENT ---
const Card = ({
  children,
  index,
  range,
  targetScale,
  color,
  glass = false,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.8]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
          backgroundColor: glass ? "rgba(20, 20, 23, 0.6)" : color,
          backdropFilter: glass ? "blur(20px)" : "none",
          borderColor: "rgba(255,255,255,0.1)",
        }}
        className={`relative flex flex-col w-[95vw] md:w-[75vw] h-[85vh] rounded-[2.5rem] p-6 md:p-12 border shadow-2xl overflow-y-auto no-scrollbar transform-gpu origin-top ${
          glass ? "glass" : ""
        }`}
      >
        {children}
      </motion.div>
    </div>
  );
};

const TechPill = ({ icon: Icon, label, color = "text-white" }) => (
  <motion.div
    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
    className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-xl transition-all cursor-default"
  >
    <Icon size={18} className={color} />
    <span className="text-sm font-medium tracking-wide text-white/90">
      {label}
    </span>
  </motion.div>
);

const ProjectItem = ({ title, desc, tech, link, github, image }) => (
  <div className="group grid md:grid-cols-2 gap-8 items-center mb-24 last:mb-0">
    <div className="order-2 md:order-1 space-y-6">
      <div className="flex items-center gap-2">
        <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-purple-500/20">
          Featured Project
        </span>
      </div>
      <h3 className="text-4xl font-extrabold text-white group-hover:text-purple-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-lg text-white/70 leading-relaxed font-light">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className="text-xs font-mono text-white/60 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-5 pt-4">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={github}
          target="_blank"
          className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white font-semibold transition-colors"
        >
          <Github size={18} /> Code
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={link}
          target="_blank"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full text-white font-semibold shadow-lg shadow-purple-500/20 transition-all"
        >
          <ExternalLink size={18} /> Live Demo
        </motion.a>
      </div>
    </div>

    <div className="order-1 md:order-2 perspective-1000">
      <TiltCard className="rounded-2xl bg-gradient-to-br from-white/10 to-transparent p-1 border border-white/10 shadow-2xl">
        <div className="rounded-xl overflow-hidden aspect-video relative group-hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] transition-shadow duration-500">
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </TiltCard>
    </div>
  </div>
);

// --- CONTENT DATA ---

const cards = [
  // CARD 1: HERO
  {
    color: "#0a0a0a", // Fallback color
    glass: true,
    content: (
      <div className="h-full flex flex-col justify-between relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-white/80 tracking-wider">
              AVAILABLE FOR HIRE
            </span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative inline-block">
            <div className="absolute -inset-1 blur-xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-30 animate-pulse" />
            <div className="flex items-end gap-6 mb-8">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/10 relative shadow-2xl">
                <img
                  src={profileImg}
                  alt="Aswin"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="pb-4"
              >
                <h2 className="text-xl md:text-2xl text-purple-400 font-bold mb-1">
                  Hello, I'm
                </h2>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
                  ASWINRAJ
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                    .
                  </span>
                </h1>
              </motion.div>
            </div>
          </div>

          <p className="text-2xl md:text-4xl text-white/70 max-w-3xl font-light leading-snug">
            Full Stack{" "}
            <span className="text-white font-semibold relative">
              MERN Developer
              <span className="absolute bottom-1 left-0 w-full h-2 bg-purple-500/30 -z-10 transform -rotate-2"></span>
            </span>{" "}
            crafting immersive digital experiences with modern technologies.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(resumePDF, "_blank")}
            className="group px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-purple-50 hover:text-purple-900 transition-colors flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Download Resume{" "}
            <Download
              size={20}
              className="group-hover:translate-y-1 transition-transform"
            />
          </motion.button>

          <div className="flex gap-3">
            {[
              {
                icon: Github,
                href: "https://github.com/Aswinrajr",
                color: "hover:bg-[#333]",
              },
              {
                icon: Linkedin,
                href: "https://linkedin.com/in/aswinrajr07",
                color: "hover:bg-[#0077b5]",
              },
              {
                icon: Mail,
                href: "mailto:aswinrajr07@gmail.com",
                color: "hover:bg-red-500",
              },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                whileHover={{ y: -5 }}
                href={social.href}
                target="_blank"
                className={`w-14 h-14 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all ${social.color} hover:border-transparent`}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  // CARD 2: EXPERTISE
  {
    color: "#0f0f11",
    glass: true,
    content: (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-4 mb-12">
          <div className="bg-purple-500 p-2 rounded-lg">
            <Code className="text-white" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Technical Arsenal
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-8 h-full">
          <div className="md:col-span-5 space-y-8">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <Sparkles className="text-yellow-400 mb-4" size={32} />
              <h3 className="text-2xl font-bold text-white mb-4">Core Focus</h3>
              <p className="text-lg text-white/70 leading-relaxed">
                I specialize in building scalable web applications using the{" "}
                <span className="text-purple-400 font-bold">MERN stack</span>.
                My approach combines clean code architecture with pixel-perfect
                design implementation.
              </p>
            </div>

            <div className="space-y-4 text-white/60">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <MapPin className="text-purple-500" />
                <span>
                  Based in{" "}
                  <strong className="text-white">Bengaluru, India</strong>
                </span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <Globe className="text-blue-500" />
                <span>Open to remote & onsite opportunities</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-black/40 p-8 md:p-10 rounded-[2rem] border border-white/10">
            <h3 className="text-xl font-bold text-white/90 mb-8 flex items-center gap-3">
              <Terminal size={20} className="text-purple-400" />
              Technologies & Tools
            </h3>

            <div className="grid gap-6">
              <div className="space-y-3">
                <p className="text-sm font-mono text-white/40 uppercase tracking-widest">
                  Frontend
                </p>
                <div className="flex flex-wrap gap-3">
                  <TechPill
                    icon={Globe}
                    label="React.js"
                    color="text-cyan-400"
                  />
                  <TechPill icon={Layout} label="Next.js" color="text-white" />
                  <TechPill
                    icon={Layout}
                    label="Tailwind CSS"
                    color="text-cyan-300"
                  />
                  <TechPill
                    icon={Layout}
                    label="Framer Motion"
                    color="text-purple-400"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-mono text-white/40 uppercase tracking-widest">
                  Backend
                </p>
                <div className="flex flex-wrap gap-3">
                  <TechPill
                    icon={Server}
                    label="Node.js"
                    color="text-green-500"
                  />
                  <TechPill
                    icon={Terminal}
                    label="Express"
                    color="text-gray-300"
                  />
                  <TechPill icon={Cpu} label="Socket.io" color="text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-mono text-white/40 uppercase tracking-widest">
                  Database & Tools
                </p>
                <div className="flex flex-wrap gap-3">
                  <TechPill
                    icon={Database}
                    label="MongoDB"
                    color="text-green-400"
                  />
                  <TechPill
                    icon={Database}
                    label="Redis"
                    color="text-red-500"
                  />
                  <TechPill
                    icon={Code}
                    label="Git & GitHub"
                    color="text-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // CARD 3: PROJECTS
  {
    color: "#161618",
    glass: false,
    content: (
      <div>
        <div className="flex items-center gap-4 mb-16">
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            FEATURED WORKS
          </h2>
        </div>

        <div>
          <ProjectItem
            title="FindMyHome"
            desc="A sophisticated real-estate platform enabling users to browse, book, and list properties with real-time chat and secure payment integration."
            tech={["React", "Node", "MongoDB", "Socket.io", "Tailwind"]}
            link="https://findmyhome-demo.com"
            github="https://github.com/Aswinrajr/findmyhome"
            image={findMyHomeImg}
          />
          <ProjectItem
            title="Stepify"
            desc="Full-featured e-commerce application for footwear enthusiasts featuring cart management, order tracking, and an administrative dashboard."
            tech={["React", "Express", "Redux Toolkit", "Stripe API"]}
            link="https://stepify-demo.com"
            github="https://github.com/Aswinrajr/stepify"
            image={stepifyImg}
          />
          <ProjectItem
            title="TaskFlow"
            desc="Productivity powerhouse with Kanban boards, drag-and-drop task management, and team collaboration features."
            tech={["MERN Stack", "Beautiful DnD", "JWT Auth"]}
            link="https://task-management-demo.com"
            github="https://github.com/Aswinrajr/task-management"
            image={taskManagement}
          />
        </div>
      </div>
    ),
  },
  // CARD 4: TIMELINE
  {
    color: "#1c1c1f",
    glass: false,
    content: (
      <div className="h-full flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-20 text-center">
          Professional Journey
        </h2>

        <div className="relative max-w-4xl mx-auto w-full">
          {/* Center Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent" />

          {/* Item 1 */}
          <div className="relative grid md:grid-cols-2 gap-8 mb-16 items-center group">
            <div className="md:text-right">
              <span className="inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-400 font-mono text-sm border border-purple-500/20 mb-2">
                2024 - Present
              </span>
              <h3 className="text-2xl font-bold text-white">
                Sensitive Technologies
              </h3>
              <p className="text-white/60">Full Stack Developer</p>
            </div>
            <div className="absolute left-[-5px] md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)] z-10 group-hover:scale-150 transition-transform" />
            <div className="pl-6 md:pl-0">
              <p className="text-white/50 text-sm leading-relaxed">
                Spearheading the development of scalable EdTech solutions and
                secure banking applications. Implementing real-time features and
                optimizing backend performance.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="relative grid md:grid-cols-2 gap-8 mb-16 items-center group">
            <div className="order-2 md:order-1 pl-6 md:pl-0 md:text-right">
              <p className="text-white/50 text-sm leading-relaxed">
                Completed an intensive bootcamp mastering the MERN stack. Built
                multiple production-grade applications and collaborated on team
                projects.
              </p>
            </div>
            <div className="absolute left-[-5px] md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10 group-hover:scale-150 transition-transform" />
            <div className="order-1 md:order-2">
              <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 font-mono text-sm border border-blue-500/20 mb-2">
                2022 - 2023
              </span>
              <h3 className="text-2xl font-bold text-white">Brototype</h3>
              <p className="text-white/60">MERN Stack Trainee</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="relative grid md:grid-cols-2 gap-8 items-center group">
            <div className="md:text-right">
              <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white/60 font-mono text-sm border border-white/20 mb-2">
                2017 - 2021
              </span>
              <h3 className="text-2xl font-bold text-white">
                APJ Abdul Kalam Univ
              </h3>
              <p className="text-white/60">B.Tech Electrical & Electronics</p>
            </div>
            <div className="absolute left-[-5px] md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-white/50 rounded-full z-10 group-hover:bg-white transition-colors" />
            <div className="pl-6 md:pl-0">
              <p className="text-white/50 text-sm">
                Graduated with honors, building a strong foundation in
                engineering principles and logical problem solving.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-24 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Ready to create something amazing?
          </h3>
          <a
            href="mailto:aswinrajr07@gmail.com"
            className="inline-block px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-purple-400 hover:text-white transition-all transform hover:scale-105 shadow-xl"
          >
            Let's Talk
          </a>
          <p className="text-white/30 text-sm mt-12">
            © 2024 Aswinraj R. All rights reserved.
          </p>
        </div>
      </div>
    ),
  },
];

const ProfilePage = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div className="bg-[#050505] relative">
      <Background3D />
      <div ref={container} className="relative z-10">
        {cards.map((card, i) => {
          const targetScale = 1 - (cards.length - i) * 0.05;
          return (
            <Card
              key={i}
              index={i}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              color={card.color}
              glass={card.glass}
            >
              {card.content}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
