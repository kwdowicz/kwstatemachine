# kwstatemachine

## Installation

```
npm install kwstatemachine --save
```

## Example

```javascript
// Import StateMachine and State classes
var StateMachine = require('kwstatemachine').StateMachine;
var State = require('kwstatemachine').State;

// Define your States by extending State class
class GameStart extends State {
  // Here you define what is a possible next state by returning true
  isValidNextState(state) {
    return state instanceof GamePlay;
  }
  // This is entry point to State
  onEnter() {
    this.stateMachine.enter(gamePlay, { value: "passed" });
  }
  // This will be executed if you attempt and success to
  // move to next state
  onExit() {}

  // This can be used to execute tick type loops (e.g.: draw() in p5js)
  onUpdate() {}
}

class GamePlay extends State {
  isValidNextState(state) {
    return state instanceof GameEnd;
  }
  onEnter(data) {
    this.data = data;
  }
  onExit() {}
  onUpdate() {}
}

class GameEnd extends State {
  onEnter() {}
  onExit() {}
  onUpdate() {}
}

// Once you got all your States defined, you need
// to extend StateMachine, you can then add update to run
// onUpdate() on your active state
class GameStateMachine extends StateMachine {
  update() {
    this.currentState.onUpdate();
  }
}

// create states
var gameStart = new GameStart();
var gamePlay = new GamePlay();
var gameEnd = new GameEnd();

// create state machine and add states
var sm = new GameStateMachine([gameStart, gamePlay, gameEnd]);

// enter initial state
sm.enter(gameStart);
```
.