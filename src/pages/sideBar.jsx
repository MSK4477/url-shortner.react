import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
const navigate = useNavigate()
  useEffect(() => {
    const { pathname } = location;

    if (
      pathname !== "/" &&
      pathname !== "/login" &&
      pathname !== "/resetPassword" &&
      pathname !== "/forgotPassword"
    ) {
      setIsSidebarVisible(true);
      console.log("hello world");
    } else {
      setIsSidebarVisible(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
const toogleSideBar = () =>{
  setIsSidebarVisible(!isSidebarVisible)
} 
  return (
    <>
      {isSidebarVisible && (
       <div>
 <nav className="sidebar">
 <button style={{color:"green"}} onClick={toogleSideBar}>x</button>

          <ul>
            <li>
              <Link className = {location.pathname == "/home" ? "active" : "" } to="/home">Home</Link>
            </li>
            <li>
            <Link to="/all" className={location.pathname === "/all" ? "active" : ""}>All URL</Link>
            </li>
            <li>
            <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
            </li>

          </ul>
          <button  style={{
          position: "absolute",
          left: "0",
          bottom: "0",
          marginBottom: "40px",
          marginLeft: "10px",
          padding: "14px",
          backgroundColor: "#2c87c5",
          color: "#ffffff",
          borderStyle: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginRight: "30px",
        }}onClick={handleLogout}>Logout</button>
          </nav>
       </div>
          
      )}
<button onClick={toogleSideBar}>m</button>
              </>

  );
};

export default Sidebar;
