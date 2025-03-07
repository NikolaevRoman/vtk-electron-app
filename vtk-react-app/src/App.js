import { useRef, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkGenericRenderWindow from "@kitware/vtk.js/Rendering/Misc/GenericRenderWindow"
import vtkConeSource from "@kitware/vtk.js/Filters/Sources/ConeSource";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkOutlineFilter from "@kitware/vtk.js/Filters/General/OutlineFilter"


function App() {
  //refs
  const containerRef = useRef();

  console.log(vtkGenericRenderWindow)

  useEffect(() => {
		const genericRenderWindow = vtkGenericRenderWindow.newInstance();
		genericRenderWindow.setContainer(containerRef.current);
		genericRenderWindow.resize();

		const renderer = genericRenderWindow.getRenderer();
		const renderWindow = genericRenderWindow.getRenderWindow();

		const coneSource = vtkConeSource.newInstance({
		  height: 1.0,
		});

		const filter = vtkOutlineFilter.newInstance();
    filter.setInputConnection(coneSource.getOutputPort());

    const outlineActor = vtkActor.newInstance();
    const outlineMapper = vtkMapper.newInstance();
    outlineActor.setMapper(outlineMapper);

    outlineMapper.setInputConnection(filter.getOutputPort());

    renderer.addActor(outlineActor);
    renderWindow.render();
    
    
		const actor = vtkActor.newInstance();
		const mapper = vtkMapper.newInstance();


		mapper.setInputConnection(coneSource.getOutputPort());
		actor.setMapper(mapper);

		renderer.addActor(actor);

		renderer.resetCamera();
		renderWindow.render();
	}, []);
  return (
    <div className="App">
      <div ref={containerRef} className="container"></div>
    </div>
  );
}

export default App;
