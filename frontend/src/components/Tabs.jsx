import { useState } from "react";

const Tabs = ({ setActiveTab }) => {
  const tabs = ["All", "New", "Old", "Meeting"];
  const [tabset,setTabset]= useState("All");

  const handleSubmit=(tab)=>{
    setActiveTab(tab);
    setTabset(tab);
  }

  return (
    <div className="flex space-x-4 mb-4 bg-gray-200 py-3 rounded-md">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 bg-gray-200 rounded ${tab == tabset && `bg-red-500 text-white `}`}
          onClick={()=>handleSubmit(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
