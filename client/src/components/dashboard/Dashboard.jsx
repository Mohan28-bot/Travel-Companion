import React, { useState } from "react";
import Sidebar from "../common/Sidebar";
import Dashboardhome from "./routes/RecSystem";
import Tripchecks from "./routes/TripCheck";
import Transulator from "./routes/Transulator";
import Weather from "./routes/Weather";
import Experiences from "./routes/Experiences";
import About from "./routes/About";
import Navbar from "../common/Navbar";

function Dashboard() {
  const [selectedOption, setSelectedOption] = useState("/dashboard/home");

  const handleOptionSelect = (path) => {
    setSelectedOption(path);
  };

  return (
    <div>
        <Navbar />
      <div className="bar">
        <div>
        <Sidebar
          selectedOption={selectedOption}
          handleOptionSelect={handleOptionSelect}
        />
        </div>
        <div className="dashboard-content">
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
