import React, { Component } from "react";
import Transition from 'react-transition-group/Transition'

import "./App.css";
import ManualModal from "./components/ManualModal/Modal";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {

    state = {
        modalIsOpen: false,
        manualModalIsOpen: false,
        showBlock: false
    }

    showModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }

    render() {
        return (
            <div className="App">
                <h1>React Animations</h1>
                <button className="Button" onClick={() => this.setState(prev => ({ showBlock: !prev.showBlock }))}>Toogle</button>
                <hr />
                {this.state.showBlock || true ?
                    <Transition
                        in={this.state.showBlock}
                        timeout={300}
                        mountOnEnter
                        unmountOnExit
                    >
                        {state => (
                            <div style={{
                                backgroundColor: "red",
                                width: '20vh',
                                height: '50vh',
                                margin: 'auto',
                                transition: 'opacity 1s ease-out',
                                opacity: state === 'exiting' ? 0 : 1
                            }}>
                            </div>
                        )}

                    </Transition>
                    : null}

                <Modal show={this.state.modalIsOpen} closed={this.closeModal} />

                {this.state.modalIsOpen  || this.state.manualModalIsOpen ?
                    <React.Fragment>
                        <Backdrop show={this.state.modalIsOpen} />
                    </React.Fragment> : null}
                {this.state.manualModalIsOpen ?
                    <ManualModal show={true} closed={() => this.setState({ manualModalIsOpen: false })} />
                    : null
                }
                <div>
                    <button className="Button" onClick={this.showModal}>
                        Open Modal</button>
                    <button className="Button" onClick={() => this.setState({ manualModalIsOpen: true })}>
                        Open My Modal</button>
                </div>




                <h3>Animating Lists</h3>
                <List />
            </div>
        );
    }
}

export default App;
