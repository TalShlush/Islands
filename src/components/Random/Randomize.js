import React from 'react';
import BitMapContainer from '../Bitmap/BitMapContainer';

class Randomize extends React.Component {
   
    render() {
        return (<BitMapContainer isRandom={true} size={this.props.match.params.size}/>);
    }
}

export default Randomize;
