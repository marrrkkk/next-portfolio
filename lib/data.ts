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
    href: "#",
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
    title: "Full-Stack Developer",
    company: "Freelance",
    date: "September - October 2024",
    description:
      "Developed a custom full-stack web app for a client, handling both front-end (Nextjs) and back-end (Supabase) development. Deployed the app using cloud services, with user authentication.",
  },
  {
    title: "Front-End Developer",
    company: "Freelance",
    date: "August - September 2024",
    description:
      "Designed and built a responsive front-end for a personal blog using HTML, CSS, and React.js. Collaborated with the client to create a user-friendly, modern interface optimized for readability and mobile responsiveness.",
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
