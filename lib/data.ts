import React from "react";
import { HomeIcon, FolderOpen, Github, Linkedin, ScrollText, Mail, Sun, Moon } from "lucide-react";

export const links = [
  {
    title: "Home",
    icon: React.createElement(HomeIcon),
    href: "#",
  },
  {
    title: "Projects",
    icon: React.createElement(FolderOpen),
    href: "#projects",
  },
  {
    title: "GitHub",
    icon: React.createElement(Github),
    href: "https://github.com/marrrkkk",
  },
  {
    title: "LinkedIn",
    icon: React.createElement(Linkedin),
    href: "https://www.linkedin.com/in/mark-louie-alvarez-b90162257/",
  },
  {
    title: "Resume",
    icon: React.createElement(ScrollText),
    href: "/resume.pdf",
  },
  {
    title: "Email",
    icon: React.createElement(Mail),
    href: "mailto:definitelynotmark13@gmail.com",
  },
  {
    title: "Theme",
    icon: React.createElement(Sun),
    href: "#",
  },
];

export const techs = [
  {
    name: "NextJS",
    description: "Full-Stack Framework",
    icon: "/next.svg",
    color: "#3c3c3c",
  },
  {
    name: "ReactJS",
    description: "Frontend Framework",
    icon: "/react.svg",
    color: "#61dafb33",
  },
  {
    name: "Tailwind",
    description: "CSS Framework",
    icon: "/tailwind.svg",
    color: "#0ea5e933",
  },
  {
    name: "Claude Code",
    description: "AI Agent",
    icon: "/claude.svg",
    color: "#d4783733",
  },
  {
    name: "Supabase",
    description: "Backend Tool",
    icon: "/supabase.svg",
    color: "#3ecf8e33",
  },
  {
    name: "Express",
    description: "Backend Framework",
    icon: "/express.svg",
    color: "#3c3c3c",
  },
];

export const experience = [
  {
    title: "Software Development Intern",
    company: "Open iT",
    date: "Feb 2026 - Present",
    description: "Gaining hands-on experience in real-world software development by working in an Agile Scrum environment, practicing test-driven development (TDD), and contributing to CI/CD pipelines on production-level code."
  },
  {
    title: "Full Stack Developer",
    company: "Nyvora",
    date: "July 2025 - Nov 2025",
    description:
      "Built responsive front-end features with React and developed Django-based backend APIs, integrating both to deliver a seamless end-to-end user experience.",
  },
  {
    title: "Freelance Web Developer",
    company: "Self-employed",
    date: "Aug 2024 - Present",
    description:
      "Built landing pages and full-stack web applications using React, Next.js, and Supabase, managing the entire development lifecycle from requirements to deployment.",
  },
];

export const projects = [
  {
    title: "Upclass",
    tech: "Nextjs, Supabase",
    image: '/projects/01.webp',
    url: 'https://upclass.xyz/'
  },
  {
    title: "Saas Landing Page",
    tech: "Nextjs, Shadcn",
    image: '/projects/02.webp',
    url: 'https://saas-landing-page-mark.vercel.app/'
  },
  {
    title: "Github Card Generator",
    tech: "Nextjs, Github API",
    image: '/projects/03.webp',
    url: 'https://github-stats-card-generator.vercel.app/'
  },
  {
    title: "NoteMe",
    tech: "Nexjs, Clerk",
    image: '/projects/04.webp',
    url: 'https://notemelink.vercel.app/'
  },
];
