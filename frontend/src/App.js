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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobseeker_login" element={<Login />} />
        <Route path="/jobseeker_register" element={<Register />} />
        <Route path="/company_login" element={<CompanyLogin />} />
        <Route path="/company_register" element={<CompanyRegister />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedJobSeekerRoute />}>
            <Route path="/jobseeker_dashboard" element={<Dashboard />} />
            <Route path="/jobseeker_profile" element={<Profile />} />
            <Route path="/jobseeker_jobdetails/:id" element={<JobDetails />} />
          </Route>

          <Route element={<ProtectedCompanyRoute />}>
            <Route path="/company_dashboard" element={<CompanyDashboard />} />
            <Route path="/company_joblisting" element={<JobListing />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
