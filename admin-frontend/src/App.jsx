import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";

import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import CompanyPage from "./pages/CompanyPage";
import TeamPage from "./pages/TeamPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectEditorPage from "./components/project/ProjectEditorPage";
import PortfolioPage from "./pages/PortfolioPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/categories" element={<CategoryPage />} />

        <Route path="/sub-categories" element={<SubCategoryPage />} />

        <Route path="/companies" element={<CompanyPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/project" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectEditorPage />} />

        <Route path="/project/new" element={<ProjectEditorPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Route>
    </Routes>
  );
}
