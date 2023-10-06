import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./pages/protectedRoute";
import "./scss/App.scss";
import "./scss/login.scss";
import "./scss/mediaQuery.scss";
import Register from "./pages/register";
import Login from "./pages/login";
import Verify from "./pages/verify";
import Redirect from "./pages/redirect";
import Clicks from "./pages/clicks";
import AllURL from "./pages/all";
import Sidebar from "./pages/sideBar";
import URLDashboard from "./pages/dashboard";
import ForgotPassword from "./pages/forgotpassword";
import ResetPassword from "./pages/resetPassword.jsx";
import SimpleUrlShortener from "./pages/content";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:id" element={<ResetPassword />} />
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route
          path="/home"
          element={
            <PrivateRoute
              element={
                <>
                  <Sidebar />

                  <SimpleUrlShortener />
                </>
              }
            />
          }
        />
        <Route
          path="/rd/:urlId"
          element={<PrivateRoute element={<Redirect />} />}
        />
        <Route
          path="/clicks/:shortId"
          element={
            <PrivateRoute
              element={
                <>
                  <Sidebar />
                  <Clicks />
                </>
              }
            />
          }
        />
        <Route
          path="/all"
          element={
            <PrivateRoute
              element={
                <>
                  <Sidebar />
                  <AllURL />
                </>
              }
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={
                <>
                  <Sidebar />
                  <URLDashboard />
                </>
              }
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
