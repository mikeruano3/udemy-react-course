import React, { Component } from 'react';

class ValidationComponent extends Component {

    render() {
        return (<div>
            { this.props.size >=5 ? <p>Text long enough</p> : <p>Text too short</p> }
        </div>)
    }
}

export default ValidationComponent