import { useRef, useEffect, useContext } from "react";
import vtkGenericRenderWindow from "@kitware/vtk.js/Rendering/Misc/GenericRenderWindow"
import vtkVolume  from "@kitware/vtk.js/Rendering/Core/Volume";
import vtkVolumeMapper  from "@kitware/vtk.js/Rendering/Core/VolumeMapper";
import vtkHttpDataSetReader from "@kitware/vtk.js/IO/Core/HttpDataSetReader"
import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';
import vtkColorMaps from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction/ColorMaps';
import { AppContext } from "../App";
import vtkXMLImageDataReader from "@kitware/vtk.js/IO/XML/XMLImageDataReader";


export default function VolumeTransfer() {
  //contexts
  const {vti} = useContext(AppContext)
  //refs
  const containerRef = useRef();

  useEffect(() => {
    if(!vti){
      return;
    }
    const genericRenderWindow = vtkGenericRenderWindow.newInstance();
    genericRenderWindow.setContainer(containerRef.current);
    genericRenderWindow.resize();

    const renderer = genericRenderWindow.getRenderer();
    const renderWindow = genericRenderWindow.getRenderWindow();

    const actor = vtkVolume.newInstance();
    const mapper = vtkVolumeMapper.newInstance();

    actor.setMapper(mapper)

    const lookupTable = vtkColorTransferFunction.newInstance();
    const piecewiseFun = vtkPiecewiseFunction.newInstance();

    lookupTable.applyColorMap(vtkColorMaps.getPresetByName("Cool to Warm"));
    lookupTable.setMappingRange(0,256);
    lookupTable.updateRange();

    for(let i = 0; i <= 8; i++) {
        piecewiseFun.addPoint(i * 32, i / 8)
    }

    actor.getProperty().setRGBTransferFunction(0, lookupTable);
    actor.getProperty().setScalarOpacity(0, piecewiseFun);

    // const reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });
    const reader = vtkXMLImageDataReader.newInstance();
    mapper.setInputConnection(reader.getOutputPort());

    reader.parseAsArrayBuffer(vti);
    renderer.addVolume(actor);

    const range = reader.getOutputData().getPointData().getScalars().getRange();
    lookupTable.setMappingRange(...range);
    lookupTable.updateRange();

    renderer.resetCamera();
    renderWindow.render();
    // reader
    //   .setUrl('https://kitware.github.io/vtk-js/data/volume/LIDC2.vti').then(() => {
    //     reader.loadData().then(() => {
    //       renderer.addVolume(actor);

    //       const range = reader.getOutputData().getPointData().getScalars().getRange();
    //       lookupTable.setMappingRange(...range);
    //       lookupTable.updateRange();

    //       renderer.resetCamera();
    //       renderWindow.render();
    //     })
    //   })
    }, [vti]);
  
  return <div ref={containerRef} className="container"></div>
}