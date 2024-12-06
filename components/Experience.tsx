import { experience } from "@/lib/data";

const Experience = () => {
  return (
    <div className="mt-20 xl:w-[45%] md:w-[70%] w-[80%]">
      <h1 className="font-medium text-3xl mb-7">Work Experience</h1>
      {experience.map((experience, index) => (
        <div className="lg:flex lg:space-x-5 mt-5" key={index}>
          <p className="text-zinc-500 dark:text-[#cecece] text-sm">
            {experience.date}
          </p>
          <div className="lg:w-[70%]">
            <span>
              <h1 className="underline text-teal-500">{experience.company}</h1>
              <h1 className="font-medium text-xl">{experience.title}</h1>
            </span>
            <p className="text-zinc-500 dark:text-[#cecece]">
              {experience.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
