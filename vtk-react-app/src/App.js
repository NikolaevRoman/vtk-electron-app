import { useRef, useEffect } from "react";
import './App.css';
//------
// all these imports are necessary for proper loading of vtk.js lib
// without imports rendering can be completed without logging errors
import '@kitware/vtk.js/Rendering/Profiles/Volume';
import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper';
//-------
import Cone from "./Examples/Cone";
import Volume from "./Examples/Volume";
import VolumeTransfer from "./Examples/Volume-transfer";


function App() {
  return (
    <div className="App">
      {/* <Cone /> */}
      {/* <Volume /> */}
      <VolumeTransfer />
    </div>
  );
}

export default App;
