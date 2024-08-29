import Link from "next/link";
import React from "react";

interface TitleProps {
  title: string;
  link?: any;
}

const TitleStyle: React.FC<TitleProps> = ({ title, link }) => {
  return (
    <div className="text-xl md:text-2xl font-bold text-center mt-24 selection: text-cyan-600 uppercase mx-auto">
      {link ? (
        <Link href={link}>
          <span className="   border-b-2 border-b-cyan-500 w-80">{title}</span>
        </Link>
      ) : (
        <span className="   border-b-2 border-b-cyan-500 w-80">{title}</span>
      )}
    </div>
  );
};

export default TitleStyle;
