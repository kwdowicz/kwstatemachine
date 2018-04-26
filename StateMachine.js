class State {
  constructor() {
    this.stateMachine = undefined;
    this.data = {};
  }
  isValidNextState(state) {
    return false;
  }
  onEnter() {}
  onUpdate() {}
  onExit() {}
}

class StateMachine {
  constructor(states) {
    this.currentState = undefined;
    this.states = states;
    this.states.forEach(s => {
      s.stateMachine = this;
    });
  }
  enter(nextState, data = {}) {
    if (this.currentState) {
      if (!this.currentState.isValidNextState(nextState)) return;
      this.currentState.onExit();
    }
    this.currentState = nextState;
    nextState.onEnter(data);
  }
  enterNext(data = {}) {
    var availableStates = this.states.filter(s => this.currentState.isValidNextState(s))
    if(availableStates.length == 1) {
      this.enter(availableStates[0], data)
    } else {
      this.currentState.data = {};
    }
  }
  update() {}
}

module.exports = {
  State: State,
  StateMachine: StateMachine
}
