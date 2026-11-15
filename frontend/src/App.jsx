import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Work from "./pages/Work";
import Project from "./pages/Project";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import useLenis from "./hooks/useLenis";
import ProjectDetails from "./components/Project/ProjectDetails";
import OpenRoles from "./pages/Careers";
import Footer from "./components/Footer";

function App() {
  useLenis();
  return (
    <BrowserRouter>
    <ScrollToTop />
    
        <Routes>
          <Route path="/website" element={<Home />} />
          <Route path="/website/work" element={<Work />} />
          <Route path="/website/project" element={<Project />} />
          <Route path="/website/project/:slug" element={<ProjectDetails />} />
          <Route path="/website/team" element={<Team />} />
          <Route path="/website/contact" element={<Contact />} />
          <Route path="/website/careers" element={<OpenRoles />} />
        </Routes>

        <Footer />

    </BrowserRouter>
  );
}

export default App;