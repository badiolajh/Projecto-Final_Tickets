import React from "react";

const MainGeneral = ({ titulo, children }) => {
  return (
    <main className="flex-1 bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">{titulo}</h2>
      <div>{children}</div>
    </main>
  );
};

export default MainGeneral;
