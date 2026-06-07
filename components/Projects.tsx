"use client";

import { projects } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const Projects = () => {
  return (
    <div id="projects" className="mt-20 xl:w-[45%] md:w-[70%] w-[80%]">
      <motion.h1
        className="font-medium text-3xl mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Projects
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Link
              href={project.url}
              target="_blank"
              className="group block rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900/80 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-neutral-900/50"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 35vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="font-medium text-[15px] tracking-tight leading-snug">
                      {project.title}
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="shrink-0 mt-0.5 p-1.5 rounded-full bg-neutral-200/80 dark:bg-neutral-800 transition-all duration-300 group-hover:bg-neutral-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-neutral-900">
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
                    />
                  </div>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
