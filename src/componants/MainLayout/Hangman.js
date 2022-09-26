import React from 'react'
import HangImg from './HangImg';
import './Hangman.css'
import { Container, Row, Col } from 'react-bootstrap';
import Help from '../Help';
import LivesLeft from '../LivesLeft';
import WinLose from '../WinLose';

export default function Hangman( props ) {

    // deconstruct props
    const { status, usedLetters, restart, chosenWord, hangmanState, wordBuild, updateUsedLetters} = props;

    // Alphabet array ( add special characters if you want to add more complex words )
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "-"];

    // maps the alphabet with conditionals
    let letter = letters.map( (letter, key) => {
        // If the letter has been used before, style changes
        if (usedLetters.includes( letter )) {
            return <div key={key}>
                <button value={letter} className="letterBtn used">
                    {letter}
                </button> 
            </div>
        // winner: the buttons are no longer clickable
        } else if ( status === "win" || status === "lose" ) {
            return <div key={key}>
                <button value={letter} className="letterBtn">
                    {letter}
                </button> 
            </div>
        // normal style of buttons
        } else {
            return <div key={key}>
                <button onClick={updateUsedLetters} value={letter} className="letterBtn">
                    {letter}
                </button> 
            </div>
        }
    });

    // Container styling. This holds the buttons
    const container = {
        textAlign: "center",
        display: "flex",
        flexWrap: "wrap",
        width: "570px",
        height: "fit-content",
        justifyContent: "center",
        marginTop: "40px",
        marginBottom: "30px",
        marginLeft: "auto",
        marginRight: "auto"
    }

    return (
        <div className="bodybg">
            {/* Main container for the rows */}
            <Container className="main">
                {/* Main heading */}
                <Row >
                    <div className="heading">
                        <h1>HANGMAN GAME</h1>
                    </div>
                </Row>
                {/* Game body conaining the the left and right side */}
                <Row>
                    {/* Left side */}
                    <Col className="leftSide">
                        <LivesLeft life={hangmanState} />
                        <HangImg hangmanState={hangmanState} />
                    </Col>
                    {/* Right side */}
                    <Col>
                        <div className="rightSide">
                            <h1 className="spacedLetters">{wordBuild}</h1>
                            <div style={container}>
                                {letter}
                            </div>
                            <button className="newgamebtn" onClick={restart}>New game!</button>
                            <Help />
                            <WinLose status={status} restart={restart} correctWord={chosenWord}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
