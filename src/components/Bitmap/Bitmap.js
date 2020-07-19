import React from 'react';
import { ISLAND_COLOR, FREE_BIT_COLOR } from '../../consts';

class Bitmap extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    drawBit(ctx, row, col, color) {
        ctx.fillStyle = color;
        ctx.fillRect(col * 10, row * 10, 10, 10);
        ctx.strokeStyle = ISLAND_COLOR;
        ctx.strokeRect(col * 10, row * 10, 10, 10);
    }

    drawBitMap() {
        this.bitmap = this.props.bitmap.slice(0);
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, this.props.cols * 10, this.props.rows * 10);

        for (let row = 0; row < this.props.rows; row++) {
            for (let col = 0; col < this.props.cols; col++) {
                this.drawBit(ctx, row, col, this.props.bitmap[row][col].color)
            }
        }
        if (!this.props.isRandom) {
            canvas.addEventListener('click', (event) => {
                const elemLeft = canvas.offsetLeft + canvas.clientLeft;
                const elemTop = canvas.offsetTop + canvas.clientTop;
                const x = Math.floor((event.pageX - elemLeft) / 10);
                const y = Math.floor((event.pageY - elemTop) / 10);
                const color = this.bitmap[y][x].color.toString() === ISLAND_COLOR ? FREE_BIT_COLOR : ISLAND_COLOR;
                this.drawBit(ctx, y, x, color);
                this.bitmap[y][x].color = color;
            }, false);
        }
    }

    componentDidMount() {
        this.drawBitMap();
    }

    componentDidUpdate() {
        this.drawBitMap();
    }
    render() {
        return <canvas ref={this.canvasRef} width={this.props.cols * 10 + 20} height={this.props.rows * 10 + 20}></canvas>;
    }
}

export default Bitmap;
