import React, { Component } from 'react';
import './App.css';
import Hangman from '../MainLayout/Hangman';
import raw from '../../assets/dictionary.txt';

//stores all the words
let words = [];

export default class App extends Component {

  constructor() {
    super();
    this.updateUsedLetters = this.updateUsedLetters.bind(this);
    this.state = {
      status: null,    // win or lose
      isLoaded: false, // for loading flag
      chosenWord: "",  // randomly word
      wordBuild: [],   // the word the user creates
      usedLetters: [], // letters that the user has used
      hangmanState: 0  // the current state of hangman ( used to controle what picture to show )
    }
  }

  // reads the text file
  componentDidMount(){
    fetch(raw)
    .then(r => r.text())
    .then(text => {

      // concats text to words
      words += text;

      // gets the index of the word "START" in the text file to ignore the legal information at the start
      let startLoc = words.lastIndexOf("START") + 6;

      // slices words from startLoc to the end and splits it at new line
      words = (words.slice(startLoc)).split("\n");

      // Lower 
      const randomWord = words[ Math.floor(Math.random() * words.length) ]
      
      // shows the user the letter underlines initailly
      function arr(){
        let wordArr = []
        for (let index = 0; index < randomWord.length; index++) {
          wordArr.push("_");
        }
        return wordArr
      }

      // updates the state
      this.setState({
        // randomly selects a word
        chosenWord: randomWord, 
        wordBuild: arr(),
        isLoaded: true
      }) 
    });
  }
  
  // check the games state (win/lose)
  gameState() {
    const wordBuilder = (this.state.wordBuild)
    const hangmanState = this.state.hangmanState
    
    // If the wordBuild no longer has any "_" then the word is completed
    if (!wordBuilder.includes("_")) {
      this.setState({
        status: "win"
      })
    }
    // If hangmanState is equal to 10, then there are no more lives left
    if (hangmanState === 10){
      this.setState({
        status: "lose"
      })
    }
  }

  // Adds the newly chosen letter to the usedLetters array
  updateUsedLetters = ( event ) => {
    const letterToPush = event.target.value

    let currArray = this.state.usedLetters

    // pushes the new letter to the array
    // Skipping the check if it exists because used buttons cant be clicked on
    currArray.push(letterToPush)

    // state updated and update is called
    this.setState({
      usedLetters: currArray
    }, () => this.update( letterToPush ))
  }

  // Updates the life counter and adds the newly chosen letter if it is in the word to guess
  update( letterToPush ){
    // the chosen word is lowercased as there are some words in the provided dictionary that are uppercase
    const chosenWord = this.state.chosenWord.toLowerCase();
    const buildArray = this.state.wordBuild; 
    let life = 0

    // If the letter is in the word to guess then loop through
    if (chosenWord.includes( letterToPush )) {
      // Replaces all the "_" where the letter is in the word to guess
      for (var i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letterToPush) {
          buildArray[i] = letterToPush
        // If it isnt the that position move to the next letter
        } else {
          continue;
        }
      }
    // if it isnt in the word to guess a life is lost
    } else {
      life += 1
    }
    // States are set
    this.setState({
      buildArray: buildArray,
      hangmanState: this.state.hangmanState + life
    }, () => this.gameState())
  }

  // This creates the wordBuild ( "_ _ _ _ _" ) what the user sees.
  // the length of the random chosen word is used as a count for the for loop.
  buildWord() {
    const chosen = this.state.chosenWord
    let characterArr = []

    // "_" is pushed each time
    for (let index = 0; index < chosen.length; index++) {
      characterArr.push("_");
    }
    // The state is set
    this.setState({
      wordBuild: characterArr
    })
  }

  // resets the state values
  newGame = () => {
    this.setState({
      status: null,
      isLoaded: true,
      chosenWord: words[ Math.floor(Math.random() * words.length) ],
      usedLetters: [],
      hangmanState: 0
    }, () => this.buildWord()) 
  }

  render() {

    // taking a while to load
    const isLoaded = this.state.isLoaded

    // loading...
    if (!isLoaded) {
      return (
        <div className="App">
          <p>Busy loading...</p>
        </div>
      )
    }else {
      // screen renders hangman game
      return (
        <div className="App">
          {/* Hangman componant is invoked*/}
          <Hangman 
            status={this.state.status}
            usedLetters={this.state.usedLetters}
            hangmanState={this.state.hangmanState}
            wordBuild={this.state.wordBuild}
            restart={this.newGame}
            updateUsedLetters={this.updateUsedLetters}
            chosenWord={this.state.chosenWord}
          />
        </div>
      )
    }
  }
}
