import React from 'react';
import BitMapContainer from '../Bitmap/BitMapContainer';

class Bonus extends React.Component {
    render() {
        return (<BitMapContainer isRandom={false} size={this.props.match.params.size} />)
    }
}

export default Bonus;

