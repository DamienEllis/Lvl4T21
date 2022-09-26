import React from 'react'

// returns a string based off the prop
export default function LivesLeft( props ) {
    const lives = props.life

    // different messages are shown depending on the users life count
    function livesLeft(){
        // lives represents the image the hangman is on ( goes up to 10 )
        let livesLeft = 10 - lives

        if (livesLeft === 1) {
            return "You only have " + livesLeft + " life left!"
        } else if (livesLeft === 0) {
            return "R.I.P"
        } else if (livesLeft <= 3) {
            return "Warning: you have " + livesLeft + " lives left!"
        } else {
            return "You have " + livesLeft + " lives left."
        }
    }
    
    //string is returned
    return (
        <div>
            {livesLeft()}
        </div>
    )
}
