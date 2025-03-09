import { useRef, useEffect } from "react";
import vtkGenericRenderWindow from "@kitware/vtk.js/Rendering/Misc/GenericRenderWindow"
import vtkVolume  from "@kitware/vtk.js/Rendering/Core/Volume";
import vtkVolumeMapper  from "@kitware/vtk.js/Rendering/Core/VolumeMapper";
import vtkHttpDataSetReader from "@kitware/vtk.js/IO/Core/HttpDataSetReader"

export default function Volume() {
  const containerRef = useRef();

  useEffect(() => {
		const genericRenderWindow = vtkGenericRenderWindow.newInstance();
		genericRenderWindow.setContainer(containerRef.current);
		genericRenderWindow.resize();

		const renderer = genericRenderWindow.getRenderer();
		const renderWindow = genericRenderWindow.getRenderWindow();

		const actor = vtkVolume.newInstance();
    const mapper = vtkVolumeMapper.newInstance();

    actor.setMapper(mapper)

    const reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });
    
    mapper.setInputConnection(reader.getOutputPort());
    
    reader
      .setUrl('https://kitware.github.io/vtk-js/data/volume/LIDC2.vti').then(() => {
        reader.loadData().then(() => {
          renderer.addVolume(actor);
          renderer.resetCamera();
          renderWindow.render();
        })
      })
    }, []);
  
  return <div ref={containerRef} className="container"></div>
}