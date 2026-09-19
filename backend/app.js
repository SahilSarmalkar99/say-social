import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import homeRoutes from "./routes/home.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import subCategoryRoutes from "./routes/subCategory.routes.js";
import companyRoutes from "./routes/company.routes.js";
import teamRoutes from "./routes/team.routes.js";
import projectRoutes from "./routes/project.route.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import videoRoutes from './routes/videoRoutes.js';
import adminVideoRoutes from './routes/adminVideoRoutes.js';
import logoRoutes from "./routes/logoRoutes.js";
import testimonialRoutes from"./routes/testimonialRoutes.js";
import jobRoleRoutes from "./routes/jobRoleRoutes.js";
import careerSettingRoutes from "./routes/careerSettingRoutes.js";
import jobApplicationRoutes from "./routes/jobApplicationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import siteSettingRoutes from "./routes/siteSettingRoutes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174" , "https://say-social.vercel.app" , "https://say-social-admin.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

app.use("/api/home", homeRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/sub-categories", subCategoryRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/admin/videos', adminVideoRoutes);
app.use("/api/logos", logoRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/jobs",jobRoleRoutes);
app.use("/api/career-settings",careerSettingRoutes);
app.use("/api/applications",jobApplicationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/site-settings", siteSettingRoutes);

export default app;