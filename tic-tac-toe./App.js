import { useState } from 'react';

export default function App() {
  const initialBoard = Array(3).
  fill(null).
  map(()=>Array(3).fill(null))
  const [boards,setBoards] = useState(initialBoard)
  const [isXnext,setIsXnext] =useState(true);
  const [isGameWon,setIsGameWon] = useState(false);
  const [winner,setWinner] = useState(null);
  function handleClick(r,c){
    if(isGameWon || boards[r][c]!=null){return;}
    const newBoards = boards.map((boardRow,rowIndex)=>
      boardRow.map((boardCol,colindex)=>
        rowIndex==r && colindex==c? (isXnext?'X':'O'):boardCol
      )
    );
    setBoards(newBoards);
    if(checkWinner(newBoards)){
      setIsGameWon(true);
      setWinner(checkWinner(newBoards));
    }
    setIsXnext(!isXnext);
  }
  function checkWinner(board){
    const lines= [
      [board[0][0],board[0][1],board[0][2]],
      [board[1][0],board[1][1],board[1][2]],
      [board[2][0],board[2][1],board[2][2]],
      [board[0][0],board[1][0],board[2][0]],
      [board[0][1],board[1][1],board[2][1]],
      [board[0][2],board[1][2],board[2][2]],
      [board[0][0],board[1][1],board[2][2]],
      [board[0][2],board[1][1],board[2][0]]
    ]
    for(const line of lines){
      if(line[0] && line[0]===line[1] && line[1]===line[2]){
        return line[0];
      }
    }
    return null;
  }
  function handleReset(){
    setBoards(initialBoard);
    setIsGameWon(false);
    setIsXnext(true);
    setWinner(null);
  }
  return (<>
        {winner && <div>{`Player ${winner} wins`}</div>}
        <div>
        {boards?.map((boardRow,rowindex)=>(
          <div key={rowindex} className = "displayBoard">
          {boardRow?.map((boardCol,colindex)=>(
            <button 
            key={`${rowindex}-${colindex}`}
            onClick = {()=>handleClick(rowindex,colindex)} 
            className="buttonSize">
            {boardCol}
            </button>
        ))}
          </div>
        ))}
        </div>
        <button
        onClick = {()=>handleReset()}>Reset</button>
         </>);
}
