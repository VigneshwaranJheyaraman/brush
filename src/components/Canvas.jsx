import React, {Component} from 'react';
class Canvas extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            canvasResizeFactor : 5,
            isDrawing: false,
            prevMouseX:0,
            prevMouseY:0,
            currMouseX:0,
            currMouseY:0,
            eraserWidth : 0,
            lineWidth:0,
            brushWidth:0,
            drawColor:"#000",
            colorClicked : false,
            canvas : null
        };
        this.canvasRef = React.createRef();
        this.colorPickerRef = React.createRef();
        this.resizer = this.resizer.bind(this);
        this.startDrawing = this.startDrawing.bind(this);
        this.stopDrawing = this.stopDrawing.bind(this);
        this.draw = this.draw.bind(this);
        this.performDrawing = this.performDrawing.bind(this);
        this.changeColorOfSketch = this.changeColorOfSketch.bind(this);
        this.checkActionChange = this.checkActionChange.bind(this);
    }

    componentWillMount()
    {
        window.addEventListener("resize", this.resizer, false);
    }

    componentDidMount()
    {
        this.setState({canvas : this.canvasRef.current}, () => {
            this.resizer();
        });
    }

    checkActionChange()
    {
        switch(this.props.action)
        {
            case "pencil":
                this.state.canvas.style.cursor = "crosshair";
                break;
            case "eraser":
                this.state.canvas.style.cursor = "cell";
                break;
            case "brush":
                this.state.canvas.style.cursor = "crosshair";
                break;
            case "color":
                this.colorPickerRef.current.click();
                this.props.changeAction();
                break;
            default:
                break;
        }
    }

    componentDidUpdate()
    {
        //console.log(this.state.action); //=========================
        this.checkActionChange();
    }
    componentWillUnmount()
    {
        window.removeEventListener("resize", this.resizer, false);
    }

    resizer()
    {
        try
        {
            if(this.props.parentRef !==  null)
            {
                let canvas = this.state.canvas;
                canvas.width = this.props.parentRef.clientWidth - this.state.canvasResizeFactor;
                canvas.height = this.props.parentRef.clientHeight - this.state.canvasResizeFactor;
                this.setState({canvas :  canvas}, () => {
                    //console.log("Canvas rendered");//================
                });
            }
            else
            {
                throw new Error("No Parent Reference Found in the canvas");
            }
        }
        catch(err)
        {
            console.error(err);
        }
    }

    startDrawing(e)
    {
        this.setState({isDrawing : true}, () => {
            //console.log("Drawing Started"+e.which); //=============================
        });
    }

    stopDrawing()
    {

        this.setState({isDrawing : false}, () => {
            //console.log("Drawing stopped"); //=============================
        })
    }

    draw(e)
    {
        let prevX = this.state.currMouseX;
        let prevY = this.state.currMouseY;
        let rect = this.state.canvas.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;
        this.setState({currMouseX: mouseX, currMouseY: mouseY, prevMouseX: prevX, prevMouseY:prevY,  lineWidth: this.props.pT, eraserWidth: this.props.eT, brushWidth: this.props.bT});
        if(this.state.isDrawing)
        {
            //console.log("Draggin through "+mouseX+","+mouseY); //=================================
            this.performDrawing();
        }
    }

    performDrawing()
    {
        let context;
        switch(this.props.action)
        {
            case "pencil":
                context= this.state.canvas.getContext("2d");
                context.beginPath();
                context.strokeStyle=this.state.drawColor;
                context.moveTo(this.state.prevMouseX,this.state.prevMouseY);
                context.lineTo(this.state.currMouseX, this.state.currMouseY);
                context.lineWidth = this.state.lineWidth;
                context.stroke();
                context.closePath();
                break;
            case "eraser":
                context = this.state.canvas.getContext("2d");
                context.beginPath();
                context.clearRect(this.state.currMouseX, this.state.currMouseY, (this.state.eraserWidth),(this.state.eraserWidth));
                context.closePath();
                break;
            case "brush":
                context = this.state.canvas.getContext("2d");
                context.beginPath();
                context.strokeStyle=this.state.drawColor;
                context.lineWidth = this.state.brushWidth;
                context.moveTo(this.state.prevMouseX, this.state.prevMouseY);
                context.lineTo(this.state.currMouseX, this.state.currMouseY);
                context.stroke();
                context.closePath();
                break;
            default : 
                console.log("Default"); //===============================
                break;
        }
    }

    changeColorOfSketch(e)
    {
        let color = e.target.value;
        this.setState({drawColor : color});
    }

    render()
    {
        return (
                <div>
                    <canvas ref={this.canvasRef} onMouseDown={this.startDrawing} onMouseUp ={this.stopDrawing} onMouseMove = {this.draw}/>
                    <input type="color" ref={this.colorPickerRef} hidden={true} onChange={this.changeColorOfSketch}/>
                </div>
            );
    }
}
export default Canvas;
