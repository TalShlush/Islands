import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import './Menu.css';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            size: "",
            error: false
        }
    }

    onInputChange = ({ target }) => {
        this.setState({ size: target.value })
    }

    handleClick = (path) => {
        if (!(/^[0-9]*[x][0-9]*$/g.test(this.state.size))) {
            this.setState({ error: true, size: "" })
        }
        else {
            this.props.history.push(`/${path}/${this.state.size}`);
        }
    }

    onRandomizeClick = () => {
        this.handleClick('random');
    }

    onBonusClick = () => {
        this.handleClick('bonus');
    }

    render() {
        return (
            <div className="menu-container">
                <div>Please enter bitmap size</div>
                <Input value={this.state.size} onChange={this.onInputChange}
                    error={this.state.error}
                    type="text" placeholder="size format is 00x00" />
                <Button primary onClick={this.onRandomizeClick}>Randomize</Button>
                <Button primary onClick={this.onBonusClick}>Bonus</Button>
            </div>
        );
    }
}

export default Menu;
