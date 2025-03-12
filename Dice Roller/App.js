import { useState } from 'react';

export default function App() {
    const [numDice,setNumDice] = useState(1);
    const [rolls,setDiceRoll] = useState([]);
    function handleRoll(){
        const newRolls = Array.from({length:numDice},
        ()=>String.fromCodePoint(0x2680+Math.floor(Math.random()*6))
        );
        setDiceRoll(newRolls);
    }
    return(
        <>
        <h4>Number of Dice</h4>
        <div className="dice-roll">
        <input 
        type="number" 
        min="1" 
        max="12"
        value={numDice}
        onChange = {(e)=>setNumDice(Math.min(12,Math.max(1,+e.target.value)))}
        className="number-input"></input>
        <button
        className="roll-button"
        onClick = {handleRoll}>Roll</button>
        </div>
        <div>
        {rolls.length>0 && <h4>Results:</h4>}
        <div className="dice-container">
        {rolls.map((roll,index)=>(
           <span key={index} className="dice">{roll}</span>
    ))}
        </div>
        </div>
        </>
    )
  
}
