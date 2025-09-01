import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ExplorePage from "./pages/ExplorePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrepaidPlansPage from "./pages/PrepaidPlansPage";
import PostpaidPlansPage from "./pages/PostpaidPlansPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import ComplaintDetails from "./pages/ComplaintDetails";
import PlanDetailsPage from "./pages/PlanDetailsPage";
import PostpaidPlanDetailsPage from "./pages/PostpaidPlanDetailsPage";
import AdminDashboard from "./pages/AdminDashboard";
import PlansAdmin from "./pages/PlansAdmin"; 
import RechargesAdmin from "./pages/RechargesAdmin";
import ComplaintsAdmin from "./pages/ComplaintsAdmin"; 


import { AuthProvider } from "./context/AuthContext";


export default function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/prepaid" element={<PrepaidPlansPage />} />
      <Route path="/postpaid" element={<PostpaidPlansPage />} />
     <Route path="/complaints" element={<ComplaintsPage />} />
<Route path="/complaint-details" element={<ComplaintDetails />} />
  <Route path="/postpaid-plan" element={<PostpaidPlanDetailsPage />} />
        <Route path="/plan-details" element={<PlanDetailsPage />} />
           <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/plans" element={<PlansAdmin />} />
          <Route path="/admin/recharges" element={<RechargesAdmin />} />
          <Route path="/admin/complaints" element={<ComplaintsAdmin />} />
  
    
    </Routes>
    </AuthProvider>
  );
}
