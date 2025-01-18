"use client";

import { projects } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Projects = () => {
  return (
    <div className="mt-20 xl:w-[45%] md:w-[70%] w-[80%]">
      <h1 className="font-medium text-3xl mb-7">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
        {projects.map((project, index) => (
          <motion.div
            className="w-[250px] group hover:text-teal-500"
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href={project.url} target="_blank">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <div>
                  <Image
                    src={project.image}
                    alt="Photo by Drew Beamer"
                    fill
                    className="h-full w-full rounded object-cover"
                  />
                </div>
              </AspectRatio>
              <div className="flex items-center justify-between mt-3">
                <span>
                  <h1 className="text-sm">{project.title}</h1>
                  <h2 className="text-xs text-zinc-500 dark:text-[#cecece] group-hover:text-teal-500">
                    {project.tech}
                  </h2>
                </span>
                <ArrowUpRight size={20} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
