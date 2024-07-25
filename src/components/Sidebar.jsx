import { LuLayoutDashboard } from "react-icons/lu";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BiDollarCircle } from "react-icons/bi";
const Sidebar = ({ activeComponent, setActiveComponent, handleLogout }) => {
  const handleSidebarClick = (component) => {
    setActiveComponent(component);
  };
  return (
    <div className="side-bar">
      <div className="side-bar-container">
        <div className="side-bar-items">
          <div
            className={` side-bar-item icon ${
              activeComponent === "dashboard" ? "filter-selected" : ""
            }`}
          >
            <LuLayoutDashboard
              color={`${activeComponent === "dashboard" ? "#F11A7B" : ""}`}
              size="40px"
              onClick={() => handleSidebarClick("dashboard")}
            />{" "}
            <p>Dashboard</p>
          </div>
          <div
            className={` side-bar-item icon ${
              activeComponent === "profilepage" ? "filter-selected" : ""
            }`}
          >
            <HiOutlineUserCircle
              color={`${activeComponent === "profilepage" ? "#F11A7B" : ""}`}
              size="40px"
              onClick={() => handleSidebarClick("profilepage")}
            />{" "}
            <p>Profile</p>
          </div>
          <div
            className={` side-bar-item icon ${
              activeComponent === "profilepage" ? "filter-selected" : ""
            }`}
          >
            <BiDollarCircle
              color={`${activeComponent === "subscriptions" ? "#F11A7B" : ""}`}
              size="40px"
              onClick={() => handleSidebarClick("subscriptions")}
            />{" "}
            <p>Subscriptions</p>
          </div>

          <div
            className={`side-bar-item icon ${
              activeComponent === "settings" ? "filter-selected" : ""
            }`}
          >
            <RiLogoutBoxRLine
              size="40px"
              color={`${activeComponent === "settings" ? "#F11A7B" : ""}`}
              onClick={() => handleLogout()}
            />
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
