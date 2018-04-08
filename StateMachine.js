class State {
  constructor() {
    this.stateMachine = undefined;
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
  update() {}
}

module.exports = {
  State: State,
  StateMachine: StateMachine
}
