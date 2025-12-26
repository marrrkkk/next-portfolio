import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { FileText } from "lucide-react";

const ResumeButton = () => {
  return (
    <Button
      asChild
      className="flex items-center space-x-2 px-5 py-2 rounded-full transition-all duration-300"
    >
      <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
        <FileText className="w-4 h-4" />
        <span className="font-medium">Resume</span>
      </Link>
    </Button>
  );
};

export default ResumeButton;
