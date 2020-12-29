class GameManager {
    constructor() {
        this.state = new StartMenu();
        this.keyBindings = {"left": "A", "right": "D", "jump": "W", "drop": "S"};
    }

    getKeyBinding(move) {
        return this.keyBindings[move];
    }

    setKeyBinding(move, newKey) {
        this.keyBindings[move] = newKey;
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }
}
