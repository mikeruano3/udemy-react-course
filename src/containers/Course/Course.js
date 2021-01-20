import React, { Component } from 'react';

class Course extends Component {
    state = {
        courseTitle: ''
    }
    queryParams = () => {
        const query = new URLSearchParams(this.props.location.search)
        for (const param of query.entries()) {
            if(this.state.courseTitle !== param[1]){
                this.setState({ courseTitle: param[1] })
            }
        }
    }
    componentDidMount(){
        this.queryParams()
    }

    componentDidUpdate(){
        this.queryParams()
    }

    render () {
        return (
            <div>
                <h1>{this.state.courseTitle}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;