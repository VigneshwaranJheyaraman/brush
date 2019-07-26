import React, {useState, useEffect} from 'react';
import './App.css';
import Canvas from './components/Canvas';
import ContextMenu from './components/ContextMenu';

function App(props) {
  let rootRef = React.createRef();
  var [ parentRef , setParentRef ] = useState(null);
  var [ action, setAction ] = useState("pencil");
  var [menu, setMenu] = useState({x:0, y:0, d:"none"});
  var [penT, setPenT] = useState(1);
  var [eraseT, setEraseT] = useState(10);
  var [brushT, setBrushT] = useState(3);
  useEffect(() => {
    setParentRef(rootRef.current);
  }, [rootRef]);
  return (
    <div onContextMenu={(e) => {e.preventDefault();
      let menu = {}
      menu.x = e.pageX;
      menu.y = e.pageY;
      menu.d = "block";
      setMenu(menu);
    }} onClick = {() => {setMenu({...menu, d:"none"});}}>
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
        <button><i className="fa fa-eyedropper" style={{color:"purple"}} id="color" onClick = {(e) => {
          setAction(e.target.id);
        }}></i></button>
        <button><i className="fa fa-save" id="save" style = {{color: "green"}} onClick={(e) => {
          setAction(e.target.id);
        }}></i></button>
      </div>
      <div className={props.divClassName} ref={rootRef}>
        <Canvas parentRef={parentRef} action={action} changeAction = {() => {setAction("pencil");}} pT = {penT} eT= {eraseT} bT = {brushT}/>
      </div>
      <ContextMenu left ={menu.x} top={menu.y} display={menu.d} setThickness={(val, type) => {
        switch(type)
        {
          case "pencil":
            setPenT(parseInt(val));
            break;
          case "eraser":
            setEraseT(parseInt(val));
            break;
          case "brush":
            setBrushT(parseInt(val));
            break;
          default:
            break;
        }
      }} />
    </div>
  );
}

export default App;
