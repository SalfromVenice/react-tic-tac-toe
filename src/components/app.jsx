import React from "react";

import Board from "./board";
import calculateWinner from "./calculateWinner";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : 'Go to game start';
      return (
        <ul>
          <li key={move}>
            <button type="button" className="btn btn-primary" onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        </ul>
      );
    });

    let status;
    let color;
    if (winner) {
      status = `Winner: ${winner}`;
      color = "green";
    } else {
      status = `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`;
      color = (this.state.xIsNext ? "blue" : "red");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div><h3 className={color}>{status}</h3></div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default App;
