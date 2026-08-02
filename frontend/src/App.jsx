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

function App() {
  useLenis();
  return (
    <BrowserRouter>
    <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/project" element={<Project />} />
          <Route path="/project/:slug" element={<ProjectDetails />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<OpenRoles />} />
        </Routes>

    </BrowserRouter>
  );
}

export default App;