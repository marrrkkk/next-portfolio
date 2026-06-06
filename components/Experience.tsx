"use client";

import { experience } from "@/lib/data";
import { motion } from "motion/react";

const Experience = () => {
  return (
    <div className="mt-20 xl:w-[45%] md:w-[70%] w-[80%]">
      <motion.h1
        className="font-medium text-3xl mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Work Experience
      </motion.h1>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-neutral-200 dark:bg-neutral-800" />

        <div className="space-y-10">
          {experience.map((exp, index) => (
            <motion.div
              className="relative pl-8"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-[11px] h-[11px] rounded-full bg-teal-500" />

              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                {exp.date}
              </p>
              <h2 className="font-medium text-lg">{exp.title}</h2>
              <p className="text-sm text-teal-500 mb-2">{exp.company}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
