// Sidebar.jsx
import React, { useState } from "react";
import {
  FaBars,
  FaUserAlt,
  FaThList,
  FaMicrophone,
  FaCloud,
  FaMapMarkedAlt,
  FaGlobe,
} from "react-icons/fa";

function Sidebar({ selectedOption, handleOptionSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/dashboard/home",
      name: "Home",
      icon: <FaMapMarkedAlt />,
    },
    {
      path: "/dashboard/tripchecks",
      name: "Trip Checklist",
      icon: <FaThList />,
    },
    {
      path: "/dashboard/transulator",
      name: "Language Transulator",
      icon: <FaMicrophone/>,
    },
    {
      path: "/dashboard/weather",
      name: "Weather Forecast",
      icon: <FaCloud />,
    },
    {
      path: "/dashboard/experiences",
      name: "People Experiences",
      icon: <FaGlobe />,
    },
    {
      path: "/dashboard/about",
      name: "Developer Info",
      icon: <FaUserAlt />,
    },
  ];

  return (
    <div className="container">
      <div style={{ width: isOpen ? "260px" : "40px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "flex" : "none" }} className="logo">
            Menu
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <div
            key={index}
            className={`link ${selectedOption === item.path ? "active" : ""}`}
            onClick={() => handleOptionSelect(item.path)}
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "flex" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
