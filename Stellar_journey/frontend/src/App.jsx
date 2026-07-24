import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Create from "./pages/CreateCampaign";
import CampaignDetails from "./pages/CampaignDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<Create />} />
        <Route path="/campaign/:id" element={<CampaignDetails />}/> 
      </Routes>
    </BrowserRouter>
  );
}