import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/jobSeeker/Login";
import Register from "./pages/jobSeeker/Register";
import Dashboard from "./pages/jobSeeker/Dashboard";
import { Login as CompanyLogin } from "./pages/company/Login";
import { Register as CompanyRegister } from "./pages/company/Register";
import { Dashboard as CompanyDashboard } from "./pages/company/Dashboard";
import Profile from "./pages/jobSeeker/Profile";
import JobDetails from "./pages/jobSeeker/JobDetails";
import JobListing from "./pages/company/JobListing";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedJobSeekerRoute from "./components/ProtectedJobSeekerRoute";
import ProtectedCompanyRoute from "./components/ProtectedCompanyRoute";
import CreateListing from "./pages/company/CreateListing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobseeker/login" element={<Login />} />
        <Route path="/jobseeker/register" element={<Register />} />
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/company/register" element={<CompanyRegister />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/jobseeker" element={<ProtectedJobSeekerRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="jobdetails/:id" element={<JobDetails />} />
          </Route>
          <Route path="/company" element={<ProtectedCompanyRoute />}>
            <Route path="dashboard" element={<CompanyDashboard />} />
            <Route path="createlisting" element={<CreateListing />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
