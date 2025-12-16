"use client";
import React, { useEffect, useState } from "react";

export default function ClosedTasksKPI() {
  const [teamData, setTeamData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamRes, ownerRes, projectRes] = await Promise.all([
          fetch(`${apiUrl}/report/closed-tasks?groupBy=team`).then(res => res.json()),
          fetch(`${apiUrl}/report/closed-tasks?groupBy=owners`).then(res => res.json()),
          fetch(`${apiUrl}/report/closed-tasks?groupBy=project`).then(res => res.json())
        ]);

        setTeamData(teamRes.result);
        setOwnerData(ownerRes.result);
        setProjectData(projectRes.result);
      } catch (error) {
        console.error("Error fetching closed tasks:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {/* Team KPI */}
      {teamData.map((team, idx) => (
        <div
          key={idx}
          style={{
            padding: "20px",
            background: "#e0f7fa",
            borderRadius: "10px",
            minWidth: "150px",
            textAlign: "center"
          }}
        >
          <h4>{team.name || "Teams"}</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {team.totalClosedTasks}
          </p>
          <p>Closed Tasks</p>
        </div>
      ))}

      {/* Owner KPI */}
      {ownerData.map((owner, idx) => (
        <div
          key={idx}
          style={{
            padding: "20px",
            background: "#fff9c4",
            borderRadius: "10px",
            minWidth: "150px",
            textAlign: "center"
          }}
        >
          <h4>Owner {idx + 1}</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {owner.totalClosedTasks}
          </p>
          <p>Closed Tasks</p>
        </div>
      ))}

      {/* Project KPI */}
      {projectData.map((project, idx) => (
        <div
          key={idx}
          style={{
            padding: "20px",
            background: "#f8bbd0",
            borderRadius: "10px",
            minWidth: "150px",
            textAlign: "center"
          }}
        >
          <h4>{project.name|| "Projects"}</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {project.totalClosedTasks || 0}
          </p>
          <p>Closed Tasks</p>
        </div>
      ))}
    </div>
  );
}
