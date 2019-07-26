import React, {Component} from 'react';
class ContextMenu extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            eraserThickness: 10,
            pencilThickness :1,
            brushThickness : 3
        };
    }
    render()
    {
        return (
            <div className="menu" style={{left: this.props.left, top:this.props.top, display:this.props.display}}>
                <ul className="menu-options">
                    <li className="menu-item">Pencil Thickness
                        <input type="range" min="1" max="100" value={this.state.pencilThickness} className="rangeSlider" onChange={(e) => {
                            this.props.setThickness(e.target.value, "pencil");
                            let val = e.target.value;
                            this.setState({pencilThickness : val});
                            }}/>
                    </li>
                    <li className="menu-item">Eraser Thickness
                        <input type="range" min="1" max="100" value={this.state.eraserThickness} className="rangeSlider" onChange={(e) => {
                            this.props.setThickness(e.target.value, "eraser");
                            let val = e.target.value;
                            this.setState({eraserThickness : val});
                            }}/>
                    </li>
                    <li className="menu-item">Brush Thickness
                        <input type="range" min="1" max="100" value={this.state.brushThickness} className="rangeSlider" onChange={(e) => {
                            this.props.setThickness(e.target.value, "brush");
                            let val = e.target.value;
                            this.setState({brushThickness : val});
                            }}/>
                    </li>
                </ul>
            </div>
        );
    }
}
export default ContextMenu;