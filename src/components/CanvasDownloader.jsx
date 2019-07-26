import React, {Component} from 'react';
class CanvasDownloader extends Component
{   
    constructor(props)
    {
        super(props);
        this.downloadRef  = React.createRef();
    }

    componentDidMount()
    {
        this.downloadRef.current.click();
        this.props.end();
    }
    render()
    {
        return(
            <a href={this.props.downloadLink} download ={this.props.downloadName} ref={this.downloadRef}/>
        );
    }
}
export default CanvasDownloader;