import React from 'react'
import hang1 from '../../assets/images/hangman-images/state1.GIF'
import hang2 from '../../assets/images/hangman-images/state2.GIF'
import hang3 from '../../assets/images/hangman-images/state3.GIF'
import hang4 from '../../assets/images/hangman-images/state4.GIF'
import hang5 from '../../assets/images/hangman-images/state5.GIF'
import hang6 from '../../assets/images/hangman-images/state6.GIF'
import hang7 from '../../assets/images/hangman-images/state7.GIF'
import hang8 from '../../assets/images/hangman-images/state8.GIF'
import hang9 from '../../assets/images/hangman-images/state9.GIF'
import hang10 from '../../assets/images/hangman-images/state10.GIF'
import hang11 from '../../assets/images/hangman-images/state11.GIF'
import './HangImg.css'

// function to return the right image depending on the amount of lives left
export default function HangImg( props ) {

    const { hangmanState } = props;

    // Initialized to null
    let image = null;
    
    // depending on the prop value, return appropriate image
    switch (hangmanState) {
        case 0:
            image = hang1;
            break;
        case 1:
            image = hang2;
            break;
        case 2:
            image = hang3;
            break;
        case 3:
            image = hang4;
            break;
        case 4:
            image = hang5;
            break;
        case 5:
            image = hang6;
            break;
        case 6:
            image = hang7;
            break;
        case 7:
            image = hang8;
            break;
        case 8:
            image = hang9;
            break;
        case 9:
            image = hang10;
            break;
        case 10:
            image = hang11;
            break;
        default:
            image = null;
            break;
    }

    // image variable is returned
    return (
        <div className="imgDiv">
            <img alt="hangman-state" src={image}></img>
        </div>
    )
}
