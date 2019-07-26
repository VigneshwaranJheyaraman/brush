import React, {useState, useEffect} from 'react';
import './App.css';
import Canvas from './components/Canvas';

function App(props) {
  let rootRef = React.createRef();
  var [ parentRef , setParentRef ] = useState(null);
  var [ action, setAction ] = useState("pencil");
  useEffect(() => {
    setParentRef(rootRef.current);
  }, [rootRef]);
  return (
    <div>
      <div className="sideNav">
        <button value="pencil"><i className="fa fa-pencil" onClick = {(e) => {
          setAction(e.target.id);
        }} id="pencil" style={{color:"red"}}></i></button>
        <button value="eraser"><i className="fa fa-eraser" style={{color:"cyan"}} id="eraser" onClick = {(e) => {
          setAction(e.target.id);
        }}></i></button>
        <button><i className="fa fa-paint-brush" style={{color:"brown"}} id="brush" onClick = {(e) => {
          setAction(e.target.id);
        }}></i></button>
      </div>
      <div className={props.divClassName} ref={rootRef}>
        <Canvas parentRef={parentRef} action={action}/>
      </div>
    </div>
  );
}

export default App;
