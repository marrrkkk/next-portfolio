"use client";

import { techs } from "@/lib/data";
import { motion } from "motion/react";
import Image from "next/image";

const Tech = () => {
  return (
    <div className="mt-40 xl:w-[45%] md:w-[70%] w-[80%]">
      <motion.h1
        className="font-medium text-3xl mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        My Technologies
      </motion.h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {techs.map((tech, index) => (
          <motion.div
            className="group relative dark:bg-neutral-900/80 bg-neutral-100 rounded-xl p-4 flex flex-col items-center text-center space-y-3 transition-colors duration-300"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="p-3 rounded-lg"
              style={{ backgroundColor: tech.color }}
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Image
                src={tech.icon}
                alt={tech.name}
                width={32}
                height={32}
                style={{ height: "auto" }}
              />
            </motion.div>
            <div>
              <h2 className="font-medium text-sm">{tech.name}</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {tech.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tech;
