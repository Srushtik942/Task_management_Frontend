import React from "react";
import Sidebar from "./Sidebar";
import PendingChart from "../Chart/PendingChart";
import MyBarchart from "../Chart/MyBarchart";
import GroupChart from "../Chart/GroupChart"
const Report = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold text-black mb-6">
          Report Overview
        </h1>

        <div className="w-full mb-6 ">
          <div className=" bg-white p-4 rounded-lg shadow w-full">
            <PendingChart />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/*  Pie Chart */}
          <div className="flex-1 bg-white p-4 rounded-lg shadow">
            <MyBarchart />
          </div>

          {/*  KPI Cards */}
          <div className="flex-1 bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-xl mb-6 mt-2">Group By</h2>
            <GroupChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
