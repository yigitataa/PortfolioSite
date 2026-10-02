import { StrictMode } from "react";
import { MotionConfig } from "motion/react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./app/App";
import "./styles/reset.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/glass.css";
import "./styles/motion.css";

const app = (
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>
);
const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
