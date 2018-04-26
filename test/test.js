var assert = require("assert");
var StateMachine = require("../StateMachine").StateMachine;
var State = require("../StateMachine").State;

class GameStart extends State {
  isValidNextState(state) {
    return (state instanceof GamePlay || state instanceof GameEnd);
  }
  onEnter(data) {
    this.data = data;
  }
  onExit() {}
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
  isValidNextState(state) {
    return state instanceof GameStart;
  }
  onEnter() {}
  onExit() {}
  onUpdate() {}
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

describe("GameStateMachine", function() {
  describe("Create 3 states and Game State Machine", function() {
    it("should have 3 states", function() {
      assert.equal(sm.states.length, 3);
    });
    it("should current state be a gameStart", function() {
      assert.ok(sm.currentState instanceof GameStart);
    });
    it("should current state be a gamePlay", function() {
      sm.enter(gamePlay, { value: "passed" });
      assert.ok(sm.currentState instanceof GamePlay);
    });
    it("should have data object and prop value == 'passed' ", function() {
      assert.equal(sm.currentState.data.value, "passed");
    });
    it("should current state be a gameEnd", function() {
      sm.enter(gameEnd);
      assert.ok(sm.currentState instanceof GameEnd);
    });
    it("should data.value be undefined", function() {
      assert.equal(sm.currentState.data.value, undefined);
    });
  });
  describe("Entering from GameEnd to GamePlay", function() {
    it("should current state remain GameEnd", function() {
      sm.enter(gamePlay);
      assert.ok(sm.currentState instanceof GameEnd);
    });
  });
  describe("Entering next available state from GameEnd", function() {
    it("should current state be GameStart", function() {
      sm.enterNext({ dataPassed: "someData" });
      assert.ok(sm.currentState instanceof GameStart);
    });
    it("should have dataPassed: someData", function() {
      assert.equal(sm.currentState.data.dataPassed, "someData");
    })
  });
  describe("Being now in GameStart", function() {
    it("should remain in GameStart calling nextState as GameStart has more than one exit", function() {
      sm.enterNext({ dataPassed: "someData" });
      assert.ok(sm.currentState instanceof GameStart);
    });
    it("should have no dataPassed: someData", function() {
      assert.notEqual(sm.currentState.data.dataPassed, "someData");
    });
  });
});
