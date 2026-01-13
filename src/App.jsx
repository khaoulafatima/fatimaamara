import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ExperienceTimeline from "./pages/ExperiencePage";
import EducationTimeline from "./pages/Education";
import Publications from "./pages/Publications";  
import Contact from "./pages/contact";
import Fragments from "./pages/Fragments";
import EventTimeline from "./pages/EventTimeline";
import Reviewing from "./pages/Reviewing";
import Skills from "./pages/skills.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Layout global */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="experience" element={<ExperienceTimeline />} />
           <Route path="education" element={<EducationTimeline />} />
           <Route path="Publications" element={<Publications/>} />
           <Route path="contact" element={<Contact/>} />    
           <Route path="Fragments" element={<Fragments/>} />
           <Route path="EventTimeline" element={<EventTimeline/>} />
           <Route path="Reviewing" element={<Reviewing/>} />
           <Route path="skills" element={<Skills/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App
