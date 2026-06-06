"use client";

import { experience } from "@/lib/data";
import { motion } from "motion/react";

const Experience = () => {
  return (
    <div className="mt-20 xl:w-[45%] md:w-[70%] w-[80%]">
      <motion.h1
        className="font-medium text-3xl mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Work Experience
      </motion.h1>
      <div className="space-y-0">
        {experience.map((exp, index) => (
          <motion.div
            className="relative group"
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.12,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex flex-col md:flex-row md:gap-12 py-6 border-t border-neutral-200 dark:border-neutral-800">
              {/* Left column — date & company */}
              <div className="md:w-[180px] shrink-0 mb-2 md:mb-0 md:pt-0.5">
                <p className="text-[13px] tracking-wide text-neutral-400 dark:text-neutral-500">
                  {exp.date}
                </p>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {exp.company}
                </p>
              </div>

              {/* Right column — role & description */}
              <div className="flex-1">
                <h2 className="text-lg font-medium tracking-tight leading-snug">
                  {exp.title}
                </h2>
                <p className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed mt-2">
                  {exp.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
