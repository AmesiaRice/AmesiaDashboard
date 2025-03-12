import { useState } from "react";

const Tabs = ({ setActiveTab }) => {
  const tabs = ["All", "New", "Old", "Meeting"];

  return (
    <div className="flex space-x-4 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
