import React, { useEffect } from "react";
import toast from 'react-hot-toast';
import { useState } from "react";
const Card = ({refresh}) => {
  const [projects, setProjects] = useState([]);


  const statusStyles = {
    "To Do": "bg-gray-100 text-gray-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "Completed": "bg-green-100 text-green-700",
    "Blocked": "bg-red-100 text-red-700",
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl);

  useEffect(()=>{
    const fetchProjects = async()=>{
      try{
        const response = await fetch(`${apiUrl}/projects`);
        console.log(response);

        const data = await response.json();

        if(!response.ok){
          console.error("Backend Error",data);
          toast.error(data.message || "Failed to fetch projects");
          return;
        }
      setProjects(data.projectData);
      }catch(error){
        console.log(error);
        toast.error("Error in data fetching!");
      }
    };
    fetchProjects();
  },[apiUrl, refresh]);

  return (
    <div className="grid grid-cols-3 gap-6 p-4">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-white shadow-sm rounded-xl p-5 border border-gray-100"
        >
          {/* Status badge */}
          <span
            className={`px-3 py-1 text-sm rounded-md font-medium ${statusStyles[project.status]}`}
          >
            {project.status}
          </span>

          {/* Title */}
          <h2 className="font-bold text-lg text-black mt-3">
            {project.name}
          </h2>

          {/* Due Date */}
           <p className="text-sm text-gray-500 mt-2">
              Due on: <span className="font-medium text-gray-700">    {new Date(project.createdAt).toLocaleDateString()}</span>
          </p>

          {/* Description */}
          <p className="text-gray-500 text-sm mt-2">
            {project.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Card;
