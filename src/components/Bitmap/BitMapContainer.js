import React from 'react';
import Bitmap from './Bitmap';
import { Button } from 'semantic-ui-react';
import bitmapSolver from '../hoc/BitmapSolver';
import { withRouter } from 'react-router-dom';

class BitMapContainer extends React.Component {
    componentDidMount() {
        this.initBitMap(this.props.size)
    }

    initBitMap = (size) => {
        if (!(/^[0-9]*[x][0-9]*$/g.test(size))) {
            size = "0x0"
        }

        const [rows, cols] = size.split("x")
        const bitmap = this.props.initBitMap(rows, cols, this.props.isRandom);
        this.setState({ bitmap: bitmap, islandsAmount: -1, rows, cols });
    }

    solve = () => {
        const result = this.props.solve(this.state.bitmap);
        this.setState({ bitmap: result.bitmap, islandsAmount: result.counter });
    }

    restart = () => {
        this.props.history.push('/');
    }

    renderActions = () => {
        if (this.state.islandsAmount === -1) {
            return <Button onClick={this.solve}>SOLVE</Button>;
        } else {
            return (
                <div>
                    <p>FOUND {this.state.islandsAmount} ISLANDS</p>
                    <Button onClick={this.restart}>RESTART</Button>
                </div>
            )
        }
    }

    render() {
        if (!this.state) return null
        return (<>
            <Bitmap isRandom={this.props.isRandom} rows={this.state.rows}
                cols={this.state.cols} bitmap={this.state.bitmap} />
            {this.renderActions()}
        </>);
    }
}

export default withRouter(bitmapSolver(BitMapContainer));
