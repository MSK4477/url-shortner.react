import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Sidebar = ({toggleSidebar, isVisible}) => {
  const location = useLocation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
const navigate = useNavigate()
  useEffect(() => {
    const { pathname } = location;
console.log(toggleSidebar)
console.log(isVisible)
    if (
      pathname !== "/" &&
      pathname !== "/login" &&
      pathname !== "/resetPassword" &&
      pathname !== "/forgotPassword"
    ) {
      setIsSidebarVisible(true);
    } else {
      setIsSidebarVisible(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {isSidebarVisible && (

<div>

        <nav  className={   isVisible ? "side":"sidebar" }>

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
<button className="logout" style={{
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
<button onClick={toggleSidebar}>hell no</button>
</nav>
<button onClick={toggleSidebar}>xxx</button>
      

       </div>
          
      )}
              </>

  );
};

export default Sidebar;
