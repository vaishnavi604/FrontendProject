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
  <Route path="/postpaid-plan/:id" element={<PostpaidPlanDetailsPage />} />
        <Route path="/plan-details" element={<PlanDetailsPage />} />

    </Routes>
    </AuthProvider>
  );
}
