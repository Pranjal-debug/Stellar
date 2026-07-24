import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Campaign from "../pages/Campaign";
import CreateCampaign from "../pages/CreateCampaign";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/explore" element={<Explore />} />

        <Route path="/campaign/:id" element={<Campaign />} />

        <Route
          path="/create"
          element={<CreateCampaign />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}