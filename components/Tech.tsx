"use client";

import { techs } from "@/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";

const Tech = () => {
  return (
    <div className="mt-40 xl:w-[45%] md:w-[70%] w-[80%]">
      <h1 className="font-medium text-3xl mb-7">My Technologies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-items-center">
        {techs.map((tech, index) => (
          <motion.div
            className="dark:bg-neutral-900 bg-neutral-100 lg:w-[250px] w-full rounded-lg flex items-center space-x-3 p-2"
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div
              className={`p-3 rounded-md`}
              style={{ backgroundColor: tech.color }}
            >
              <Image src={tech.icon} alt={tech.name} width={30} height={30} />
            </div>
            <span>
              <h1>{tech.name}</h1>
              <h2 className="text-sm">{tech.description}</h2>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tech;
