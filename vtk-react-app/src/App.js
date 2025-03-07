import { useRef, useEffect } from "react";
import './App.css';
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import "@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper";
import Cone from "./Examples/Cone";
import Volume from "./Examples/Volume";


function App() {
  return (
    <div className="App">
      {/* <Cone /> */}
      <Volume />
    </div>
  );
}

export default App;
