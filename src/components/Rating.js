import {Component} from "react";
import React from "react";
import * as PropTypes from "prop-types";

class Rating extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    generate (canvas, rate) {
        let rateColor = "white";

        if(rate  > 6) {
            rateColor = rate  > 8 ? "#14c500" : "#fae600";
        }else{
            rateColor = rate  > 3 ? "#4a75fa" : "#ff0009";
        }

        const ctx = canvas.getContext('2d');
        ctx.webkitImageSmoothingEnabled=true;

        let s = 20;
        ctx.beginPath();
        ctx.fillStyle = "#1a212c";
        ctx.arc(s, s, s, 0, Math.PI*2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = "#3a4312";
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.arc(s, s, s*0.8, 0, Math.PI*2, false);
        ctx.stroke();

        let ctr = 270 * (rate/10);
        let startAngle = (Math.PI/180) * -90;
        let endAngle = (Math.PI/180) * ctr;

        ctx.beginPath();
        ctx.strokeStyle = rateColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.arc(s, s, s*0.8, startAngle, endAngle, false);
        ctx.stroke();

        ctx.font = "15px bold sans-serif";
        ctx.fillStyle = "white";

        rate = rate.toFixed(1);
        if(rate === 0){
            rate = "NR";
        }

        ctx.fillText(rate, 10, 25);

    }

    render() {
        return <canvas ref={this.canvasRef} width={40} height={40}/>
    }

    componentDidMount() {
        this.generate(this.canvasRef.current, this.props.rate);
    }

}

Rating.propTypes = {
   rate: PropTypes.number.isRequired
};

export default Rating