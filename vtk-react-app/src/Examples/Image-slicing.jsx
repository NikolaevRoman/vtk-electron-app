import { useRef, useEffect, useContext } from "react";
import vtkGenericRenderWindow from "@kitware/vtk.js/Rendering/Misc/GenericRenderWindow";
import vtkXMLImageDataReader from "@kitware/vtk.js/IO/XML/XMLImageDataReader";
import vtkImageMapper from "@kitware/vtk.js/Rendering/Core/ImageMapper";
import vtkImageSlice from "@kitware/vtk.js/Rendering/Core/ImageSlice";
import vtkInteractorStyleImage from "@kitware/vtk.js/Interaction/Style/InteractorStyleImage"
import ImageConstants from "@kitware/vtk.js/Rendering/Core/ImageMapper/Constants";
import { AppContext } from "../App";


export default function ImageSlicing() {
  //contexts
  const {vti} = useContext(AppContext)
  //refs
  const containerRef = useRef();

  //variables
  const { SlicingMode } = ImageConstants;

  useEffect(() => {
    if(!vti){
      return;
    }
    const genericRenderWindow = vtkGenericRenderWindow.newInstance();
    genericRenderWindow.setContainer(containerRef.current);
    genericRenderWindow.resize();

    const renderer = genericRenderWindow.getRenderer();
    const renderWindow = genericRenderWindow.getRenderWindow();

    renderer.getActiveCamera().setParallelProjection(true);

    const istyle = vtkInteractorStyleImage.newInstance();
    istyle.setInteractionMode('IMAGE_SLICING');
    renderWindow.getInteractor().setInteractorStyle(istyle);


    const actor = vtkImageSlice.newInstance();
    const mapper = vtkImageMapper.newInstance();

    mapper.setSliceAtFocalPoint(true);
    mapper.setSlicingMode(SlicingMode.Z);

    actor.setMapper(mapper)

    actor.getProperty().setColorWindow(255);
    actor.getProperty().setColorLevel(127);


    // const reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });
    const reader = vtkXMLImageDataReader.newInstance();

    mapper.setInputConnection(reader.getOutputPort());


    reader.parseAsArrayBuffer(vti);

    renderer.addActor(actor);

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