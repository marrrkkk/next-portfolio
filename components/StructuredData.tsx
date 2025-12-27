import { experience, projects } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marklouie.vercel.app/";

export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mark Louie Alvarez",
    jobTitle: "Full-Stack Developer",
    description: "Full-Stack Developer based in the Philippines. Specialized in React, Next.js, and modern web development.",
    url: siteUrl,
    image: `${siteUrl}/me.png`,
    sameAs: [
      "https://github.com/marrrkkk",
      "https://x.com/marrrkkk__",
      "https://www.instagram.com/marrrrkkkk__/",
      "https://www.linkedin.com/in/mark-louie-alvarez-b90162257/",
    ],
    email: "definitelynotmark13@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PH",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Full-Stack Development",
      "Web Development",
      "Frontend Development",
      "Backend Development",
    ],
  };

  const professionalProfileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Mark Louie Alvarez",
      jobTitle: "Full-Stack Developer",
      worksFor: experience.map((exp) => ({
        "@type": "Organization",
        name: exp.company,
      })),
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mark Louie Alvarez Portfolio",
    url: siteUrl,
    author: {
      "@type": "Person",
      name: "Mark Louie Alvarez",
    },
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio Projects",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        url: project.url,
        description: `A ${project.tech} project`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalProfileSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
    </>
  );
}

