import React, { useEffect, useState } from "react";
import Sidebar from "../commonComponents/Sidebar";
import toast from "react-hot-toast";

const CreateMoodBoard = () => {

    const [tasks, setTasks] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;


    useEffect(()=>{
        const fetchTasks = async()=>{
            try{
                const response = await fetch(`${apiUrl}/tasks`,{
                    method: "GET"
                });
                console.log(response);
                const data = await response.json();

                setTasks(data?.tasks || []);

            }catch(error){
                toast.error("Internal Server Error")
            }
        }
        fetchTasks();
    },[])

  return (
    <div className="flex h-screen bg-white">
      {/* LEFT: Sidebar */}
      <Sidebar />

      {/* RIGHT: Main Content */}
      <div className="flex-1 p-6 text-black overflow-y-auto">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-1">Create Moodboard</h1>

        {/* Sort & Actions */}
        <div className="flex items-center justify-between mb-5 mt-2">
          {/* Sort buttons */}
          <div className="flex gap-2">
            {[
              "Priority Low-High",
              "Priority High-Low",
              "Newest First",
              "Oldest First",
            ].map((item) => (
              <button
                key={item}
                className="px-4 py-1.5 border rounded-full text-sm text-gray-600 hover:bg-gray-100"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right buttons */}
          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded-md text-gray-600">
              Filter
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              + New Task
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 text-gray-600">
              <tr>
                <th className="text-left p-3">TASKS</th>
                <th className="text-left p-3">OWNER</th>
                {/* <th className="text-left p-3">PRIORITY</th> */}
                <th className="text-left p-3">Due Days</th>
                <th className="text-left p-3">STATUS</th>
                <th className="p-3"></th>
              </tr>
            </thead>

          <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-5 text-gray-500 ">
                    No tasks found
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task._id} className="border-t cursor-pointer">
                    <td className="p-3 font-medium">{task.name}</td>

                    <td className="p-3">
                      {task.owners.map(owner=> owner.name).join(",") || "Unassigned"}
                    </td>


                    <td className="p-3 font-medium">
                      {task.timeToComplete}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    {/* <td className="p-3 text-right cursor-pointer">→</td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateMoodBoard;
