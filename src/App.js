// CPSC 458-01
// Jeevan Acharya
// ID: 2313321

import React from "react";
import { Routes, Route } from "react-router-dom";
import {Signin} from './Components/Pages/Signin/Signin';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import Home from './Components/Pages/Home/Home';
import Settings from './Components/Pages/Settings/Settings';
import AllLights from './Components/Pages/Lights/AllLights';
import PageNotFound from './Components/Pages/404/PageNotFound';
import Switches from './Components/Pages/Switches/Switches';
import Plugs from './Components/Pages/Plugs/Plug';

const App = () => {
  
  return (
    <div>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="smart_lights" element={<AllLights />} />
          <Route path="smart_switches" element={<Switches />} />
          <Route path="smart_plugs" element={<Plugs />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
