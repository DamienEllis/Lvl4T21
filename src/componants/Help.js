import {React, Component} from 'react'
import './Help.css'
import {Modal} from 'react-bootstrap'
import Exit from '../assets/images/redX.png'

// this component shows the help modal
export default class Help extends Component {
    constructor() {
        super()
        this.state = {
            show: false
        }
    }

    // reverses the boolean state when called
    handleHelp = () =>{
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        return (
            <div className="help-div">
                <button onClick={this.handleHelp}  className="helpBtn">Help!</button>
                {/* MODAL SECTION */}
                <Modal style={{backgroundColor:"aliceblue", width:450, borderRadius: '10px', padding: 10}} show={this.state.show} centered>
                    <Modal.Header className="modalTitle">
                        help?
                        <img alt="close" onClick={this.handleHelp} className="exitModal" src={Exit}></img>
                    </Modal.Header>
                    <Modal.Body>
                        Hangman is a word guessing game. Try and guess an unknown word by unlocking unkown letters. You have 10 chances. If you run out of live you get "Hanged".
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
