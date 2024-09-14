class Logger {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    log(event) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener());
        }
    }
}

export default Logger; 
