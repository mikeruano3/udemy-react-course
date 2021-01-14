import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent'
import CharComponent from './CharComponent'

class App extends Component {
  state = {
    inputWord: ''
  }

  setWord = (event) => {
    this.setState({inputWord: event.target.value})
  }

  handleClickOnParagraph = (index) =>{
    //const newString = this.state.inputWord.split('').filter( (value, idx) => idx !== index )
    const st = this.state.inputWord.split('')
    st.splice(index, 1)
    this.setState({ inputWord: st.join('')})
  }

  render() {
    return (
      <div className="App">
        <input type="text" onChange={this.setWord} value={this.state.inputWord}/>
        <ValidationComponent size={this.state.inputWord.length} />
        {
          this.state.inputWord.split('').map((value, index) =>{
            return <CharComponent paragraph={value} key={index} onClick={()=>this.handleClickOnParagraph(index)} />
          })
        }
        <ol>
          {/*
            <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
          */}
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
      </div>
    );
  }
}

export default App;
