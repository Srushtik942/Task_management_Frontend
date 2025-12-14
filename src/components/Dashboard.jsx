import React, { useState } from 'react';
import Sidebar from "../commonComponents/Sidebar";
import Card from "../commonComponents/Card";
import TaskCard from "../commonComponents/TaskCard";
import CreateTaskModal from "../commonComponents/CreateTaskModal";
import CreateProjectModal from "../commonComponents/CreateProjectModal";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [taskFilter, setTaskFilter] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(false);
  const [isProjectModalOpen,setIsProjectModalOpen] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);


  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 bg-white p-6 overflow-y-auto">
          {/* Search */}
          <div className="border border-gray-400 text-gray-400 rounded-sm p-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none"
            />
          </div>

          {/* Projects Header */}
          <div className="flex items-center mt-5">
            <h1 className="font-bold text-2xl text-black">Projects</h1>

            <select className="text-black border border-gray-400 rounded p-1 mx-5">
              <option>Filter</option>
              <option>1 year</option>
              <option>2 years</option>
              <option>3 years</option>
            </select>

            <div className="ml-auto">
              <button
               onClick={() => setIsProjectModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                + New Project
              </button>
            </div>
          </div>

          <Card refresh={refreshProjects}  />

          {isProjectModalOpen && (
  <CreateProjectModal
    isOpen={isProjectModalOpen}
    onClose={() => setIsProjectModalOpen(false)}
    onSuccess={() => {
      setRefreshProjects(prev => !prev);
      // toast.success("Project created successfully");
    }}
  />
)}


          {/* Tasks Header */}
          <div className="flex items-center mt-8">
            <h1 className="font-bold text-2xl text-black">My Tasks</h1>

            <select
              className="text-black border border-gray-400 rounded p-1 mx-5"
              value={taskFilter}
              onChange={(e) => setTaskFilter(e.target.value)}
            >
              <option value="">Team</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Backend">Backend Development</option>
            </select>

            <div className="ml-auto">
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                + New Task
              </button>
            </div>
          </div>

          <TaskCard team={taskFilter} refresh={refreshTasks} />
        </div>
      </div>

      {/* Modal outside of scrollable container */}
      {isTaskModalOpen && (
        <CreateTaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSuccess={() => setRefreshTasks((prev) => !prev)}
        />
      )}
    </>
  );
};

export default Dashboard;
