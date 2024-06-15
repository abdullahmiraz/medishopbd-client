import React from "react";

interface TitleProps {
  title: string;
}

const TitleStyle: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="text-xl font-bold text-center mt-12 selection: text-green-700">
      {title}
    </div>
  );
};

export default TitleStyle;
