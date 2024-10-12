class Game {
    constructor() {
        this.isRunning = false;
        this.player = new Player();
        this.world = new World();
        this.canvas = document.createElement('canvas');
        this.canvas.width = 856;
        this.canvas.height = 480;
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }

    start() {
        this.isRunning = true;
        this.run();
    }

    run() {
        const step = () => {
            if (!this.isRunning) return;

            this.update();
            this.render();
            requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }

    update() {
        this.player.update();
        this.world.update();
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.world.render(this.ctx);
        this.player.render(this.ctx);
    }

    stop() {
        this.isRunning = false;
    }
}

class Player {
    constructor() {
        this.x = 400;
        this.y = 240;
        this.speed = 2;
        this.size = 20;
        this.keys = new Array(256).fill(0); // Keyboard states
    }

    update() {
        if (this.keys[37]) this.x -= this.speed;  // Left arrow
        if (this.keys[39]) this.x += this.speed;  // Right arrow
        if (this.keys[38]) this.y -= this.speed;  // Up arrow
        if (this.keys[40]) this.y += this.speed;  // Down arrow
    }

    render(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    handleInput(event) {
        let i = event.type === 'keydown' ? 1 : 0;
        this.keys[event.keyCode] = i;
    }
}

class World {
    constructor() {
        this.blocks = [];
        this.generateWorld();
    }

    generateWorld() {
        for (let x = 0; x < 20; x++) {
            for (let y = 0; y < 10; y++) {
                this.blocks.push(new Block(x * 40, y * 40, 40, 40, 'green'));
            }
        }
    }

    update() {
        // Update world logic here (e.g., block interactions, physics)
    }

    render(ctx) {
        for (let block of this.blocks) {
            block.render(ctx);
        }
    }
}

class Block {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

window.addEventListener('load', () => {
    let app = new Game();
    app.start();

    window.addEventListener('keydown', (e) => app.player.handleInput(e));
    window.addEventListener('keyup', (e) => app.player.handleInput(e));
});
