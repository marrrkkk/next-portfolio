import React from "react";
import { Button } from "./ui/button";

const PulsatingButton = () => {
  return (
    <Button className="flex items-center space-x-2 px-5 rounded-full bg-neutral-900 border hover:border-white">
      <div className="relative flex items-center justify-center h-2 w-2">
        <span className="absolute inline-block h-3 w-3 rounded-full bg-[#34d399] opacity-75 animate-ping"></span>
        <span className="relative inline-block h-2 w-2 rounded-full bg-[#34d399]" />
      </div>
      <span className="text-[#34d399] font-medium">Available</span>
    </Button>
  );
};

export default PulsatingButton;
