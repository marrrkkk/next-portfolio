import React from "react";
import { Activity, HomeIcon, Mail, ScrollText, SunMoon } from "lucide-react";

export const links = [
  {
    title: "Home",
    icon: React.createElement(HomeIcon),
    href: "#",
  },
  {
    title: "Activity",
    icon: React.createElement(Activity),
    href: "https://wakatime.com/@marrkkk",
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
    icon: React.createElement(SunMoon),
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
    name: "Figma",
    description: "Design Tool",
    icon: "/figma.svg",
    color: "#0acf8333",
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
    title: "Frontend Developer",
    company: "Nyvora",
    date: "July 2025 - Present",
    description:
      "Developed responsive front-end features using React and Tailwind CSS. Collaborated with designers and integrated APIs to deliver a smooth user experience.",
  },
  {
    title: "Web Developer",
    company: "Freelance",
    date: "Aug 2024 - July 2025",
    description:
      "Created landing pages and full-stack web apps for clients using React, Next.js, and Supabase. Handled full development cycle from requirements to deployment.",
  },
];

export const projects = [
  {
    title: "NoteMe",
    tech: "Nextjs, Supabase",
    image: '/projects/01.webp',
    url: 'https://notemelink.vercel.app/'
  },
  {
    title: "Movie Browser",
    tech: "Nextjs, Shadcn",
    image: '/projects/02.webp',
    url: 'https://nextjs-movie-search.vercel.app/'
  },
  {
    title: "Saas Landing Page",
    tech: "Nextjs, Supabase",
    image: '/projects/03.webp',
    url: 'https://saas-landing-page-mark.vercel.app/'
  },
  {
    title: "Github Card Generator",
    tech: "Nexjs, Github API",
    image: '/projects/04.webp',
    url: 'https://github-stats-card-generator.vercel.app/'
  },
];
