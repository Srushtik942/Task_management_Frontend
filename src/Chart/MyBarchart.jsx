"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

export default function MyBarchart() {
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  const apiUrl = import.meta.env.VITE_API_URL

  // Fetch all tasks
  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const res = await fetch(`${apiUrl}/tasks`)
        const data = await res.json()

        // IMPORTANT: backend returns { message, tasks }
        setTasks(data.tasks || [])

        toast.success("Tasks fetched successfully!")
      } catch (error) {
        toast.error("Unable to fetch tasks")
        console.error(error)
      }
    }

    fetchAllTasks()
  }, [apiUrl])

  // Fetch completed tasks (last week)
  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const res = await fetch(`${apiUrl}/report/last-week`)
        const data = await res.json()

        setCompletedTasks(data.getData || [])

        // toast.success("Completed tasks fetched successfully!")
      } catch (error) {
        // toast.error("Unable to fetch completed tasks")
        console.error(error)
      }
    }

    fetchCompletedTasks()
  }, [apiUrl])

  // Pie chart data
  const pieData = [
    { name: "Total Tasks", value: tasks.length },
    { name: "Completed Tasks", value: completedTasks.length },
  ]

  const COLORS = ["#4f46e5", "#10b981"]

  return (
    <div className=" p-4 rounded-lg  w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Task Completion Overview</h2>
      <p className="text-gray-600 mb-4">
        Total tasks vs completed tasks
      </p>

      <div className="flex justify-center">
        <PieChart width={350} height={300}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {pieData.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  )
}
