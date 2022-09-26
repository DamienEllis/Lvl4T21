import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import './Help.css'
import '../componants/MainLayout/Hangman.css'

export default function WinLose( props ) {

    const { status, restart, correctWord } = props;

    // local variables
    let title = "";
    let body = "";

    //alters the above variables depending on the passed in props
    if (status === "win") {

        title = "YOU WON!!";
        body = "You did not get hung!"

    } else if (status === "lose") {

        title = "Oops! You lost";
        body = "The correct word was: " + correctWord + " why dont you try again?"
    }

    // if the passed in prop "status" is ignored, nothing happens
    if (status === null) {
        return null
    // the modal is shown with the title and body variables
    }else {
        return (
            <div>
                <Modal centered show={true} style={{backgroundColor:"aliceblue", width:450, borderRadius: '10px', padding: 10}}>
                    <Modal.Header className="modalTitle">
                        {title}
                    </Modal.Header>
                    <Modal.Body>
                        {body}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="newgamebtn" onClick={restart}>New game?</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    } 
}
