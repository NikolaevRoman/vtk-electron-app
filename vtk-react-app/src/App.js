import React, { useState } from "react";
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
import ImageSlicing from "./Examples/Image-slicing";

export const AppContext = React.createContext();

function App() {
  //states
  const [vti, setVti] = useState();
  //functions
  const handleVtiUpload = async () => {
    const arrayBuffer = await window.electronApi.loadFile();
    setVti(arrayBuffer);
  }
  return (
    <AppContext.Provider value={{vti}}>
      <div className="App">
        <button onClick={handleVtiUpload}>Загрузить VTI...</button>
        {/* <Cone /> */}
        {/* <Volume /> */}
        {/* <VolumeTransfer /> */}
        <ImageSlicing />
      </div>
    </AppContext.Provider>
  );
}

export default App;
