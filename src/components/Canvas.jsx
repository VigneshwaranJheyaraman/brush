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
            canvas : null
        };
        this.canvasRef = React.createRef();
        this.resizer = this.resizer.bind(this);
        this.startDrawing = this.startDrawing.bind(this);
        this.stopDrawing = this.stopDrawing.bind(this);
        this.draw = this.draw.bind(this);
        this.performDrawing = this.performDrawing.bind(this); 
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

    componentDidUpdate()
    {
        //console.log(this.props.action); //=========================
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
        this.setState({currMouseX: mouseX, currMouseY: mouseY, prevMouseX: prevX, prevMouseY:prevY});
        if(this.state.isDrawing)
        {
            //console.log("Draggin through "+mouseX+","+mouseY); //=================================
            this.performDrawing();
        }
    }

    performDrawing()
    {
        switch(this.props.action)
        {
            case "pencil":
                let context = this.state.canvas.getContext("2d");
                context.beginPath();
                context.strokeStyle="#000";
                context.moveTo(this.state.prevMouseX,this.state.prevMouseY);
                context.lineTo(this.state.currMouseX, this.state.currMouseY);
                context.stroke();
                context.closePath();
                break;
            case "eraser":
                let context = this.state.canvas.getContext();
            default : 
                console.log("Default"); //===============================
                break;
        }
    }


    render()
    {
        return (
                <canvas ref={this.canvasRef} onMouseDown={this.startDrawing} onMouseUp ={this.stopDrawing} onMouseMove = {this.draw}/>
            );
    }
}
export default Canvas;
