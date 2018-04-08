npm install kwstatemachine --save

in your index.js or main.js:
var StateMachine = require('kwstatemachine').StateMachine;
var State = require('kwstatemachine').State;

class GameStart extends State {
  isValidNextState(state) {
    return state instanceof GamePlay;
  }
  onEnter() {
    console.log("enter game start");
    this.stateMachine.enter(gamePlay, { value: "ziom" });
  }
  onExit() {
    console.log("exit game start");
  }
  onUpdate() {
    console.log("update game start");
  }
}

class GamePlay extends State {
  isValidNextState(state) {
    return state instanceof GameEnd;
  }
  onEnter(data) {
    console.log("enter game play with data: " + data.value);
    this.stateMachine.enter(gameEnd);
  }
  onExit() {
    console.log("exit game play");
  }
  onUpdate() {
    console.log("update game play");
  }
}

class GameEnd extends State {
  onEnter() {
    console.log("enter game end");
  }
  onExit() {
    console.log("exit game end");
  }
  onUpdate() {
    console.log("update game end");
  }
}

class GameStateMachine extends StateMachine {
  update() {
    this.currentState.onUpdate();
  }
}

var gameStart = new GameStart();
var gamePlay = new GamePlay();
var gameEnd = new GameEnd();
var sm = new GameStateMachine([gameStart, gamePlay, gameEnd]);

sm.enter(gameStart);

