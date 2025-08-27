import React, { useState } from "react";
import { useParams } from "react-router-dom";   // 👈 import useParams
import Sidebar from "../common/Sidebar";
import Dashboardhome from "./routes/RecSystem";
import Tripchecks from "./routes/TripCheck";
import Transulator from "./routes/Transulator";
import Weather from "./routes/Weather";
import Experiences from "./routes/Experiences";
import About from "./routes/About";
import Navbar from "../common/Navbar";

function Dashboard() {
  // 👇 get username and userid from the route (/dashboard/:username/:userid)
  const { username, userid } = useParams();

  // 👇 default option = home
  const [selectedOption, setSelectedOption] = useState("/dashboard/home");

  const handleOptionSelect = (path) => {
    setSelectedOption(path);
  };

  return (
    <div>
      <Navbar />
      <div className="bar">
        <Sidebar
          selectedOption={selectedOption}
          handleOptionSelect={handleOptionSelect}
        />

        <div className="dashboard-content">
          {/* 👇 show login success info */}
          <h2>Welcome {username}!</h2>
          <p>Your ID: {userid}</p>

          {/* 👇 render based on selected option */}
          {selectedOption === "/dashboard/home" && <Dashboardhome />}
          {selectedOption === "/dashboard/tripchecks" && <Tripchecks />}
          {selectedOption === "/dashboard/transulator" && <Transulator />}
          {selectedOption === "/dashboard/weather" && <Weather />}
          {selectedOption === "/dashboard/experiences" && <Experiences />}
          {selectedOption === "/dashboard/about" && <About />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
