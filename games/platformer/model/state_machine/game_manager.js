class GameManager {
    constructor() {
        this.state = new StartMenu();
        this.keyBindings = {"left": 65, "right": 68, "jump": 87, "drop": 83};
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