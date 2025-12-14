import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TaskCard = ({team, refresh}) => {
  const [tasks, setTasks] = useState([]);

  const statusStyles = {
    "To Do": "bg-gray-100 text-gray-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "Completed": "bg-green-100 text-green-700",
    "Blocked": "bg-red-100 text-red-700",
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
          const url = team
          ? `${apiUrl}/tasks?team=${encodeURIComponent(team)}`
          : `${apiUrl}/tasks`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Failed to fetch tasks");
          return;
        }

        setTasks(data.tasks);
      } catch (error) {
        console.error(error);
        toast.error("Error in task data fetching!");
      }
    };

    fetchTasks();
  }, [apiUrl,team,refresh]);



  return (
    <div className="grid grid-cols-3 gap-6 p-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white shadow-sm rounded-xl p-5 border border-gray-100"
        >
          {/* Status badge */}
          <span
            className={`px-3 py-1 text-sm rounded-md font-medium ${
              statusStyles[task.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {task.status || "To Do"}
          </span>

          {/* Title */}
          <h2 className="font-bold text-lg text-black mt-3">
            {task.name}
          </h2>

          {/* Owner */}

          <p className="font-normal text-md text-gray-600 mt-3">
            {task.owners.map((owner)=>owner.name).join(",")}
          </p>


          {/* Created Date */}
          <p className="text-sm text-gray-500 mt-2">
            Created on{" "}
            <span className="font-medium text-gray-700">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
