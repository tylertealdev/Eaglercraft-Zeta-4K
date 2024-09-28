
class M {
    constructor() {
        this.M = new Array(32767).fill(0);
        this.canvas = document.createElement("canvas");
        this.canvas.width = 856;
        this.canvas.height = 480;
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.imageData = this.ctx.createImageData(214, 120);
        this.arrayOfInt1 = new Uint32Array(this.imageData.data.buffer);
        this.arrayOfInt2 = new Array(262144).fill(0);
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        this.run();
    }

    run() {
        let localRandom = Math.random;
        this.generateArrayOfInt2();
        this.generateArrayOfInt3();

        let step = () => {
            if (!this.isRunning) return;
            this.updateGraphics();
            this.ctx.putImageData(this.imageData, 0, 0);
            requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }

    generateArrayOfInt2() {
        let localRandom = Math.random;
        for (let i = 0; i < 262144; i++) {
            this.arrayOfInt2[i] = (i / 64) % 64 > 32 + Math.floor(localRandom() * 8) ? Math.floor(localRandom() * 8) + 1 : 0;
        }
    }

    generateArrayOfInt3() {
        let localRandom = Math.random;
        this.arrayOfInt3 = new Array(12288).fill(0);
        for (let j = 1; j < 16; j++) {
            let k = 255 - Math.floor(localRandom() * 96);
            for (let m = 0; m < 48; m++) {
                for (let n = 0; n < 16; n++) {
                    let color = 9858122;
                    if (j == 4) color = 8355711;
                    if (j != 4 || Math.floor(localRandom() * 3) == 0) {
                        k = 255 - Math.floor(localRandom() * 96);
                    }
                    if (j == 1 && m < (n * n * 3 + n * 81 >> 2 & 3) + 18) {
                        color = 6990400;
                    } else if (j == 1 && m < (n * n * 3 + n * 81 >> 2 & 3) + 19) {
                        k = (k * 2) / 3;
                    }

                    this.arrayOfInt3[j * m * n] = color;
                }
            }
        }
    }

    updateGraphics() {
        // Update the canvas with some simple pattern for now
        let width = this.canvas.width;
        let height = this.canvas.height;
        for (let i = 0; i < this.arrayOfInt1.length; i++) {
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            this.arrayOfInt1[i] = (r << 16) | (g << 8) | b;
        }
    }

    handleEvent(event) {
        let i = 0;
        switch (event.type) {
            case 'keydown':
                i = 1;
            case 'keyup':
                this.M[event.keyCode] = i;
                break;
            case 'mousedown':
                i = 1;
                this.M[2] = event.clientX;
                this.M[3] = event.clientY;
            case 'mouseup':
                if (event.button === 2) {
                    this.M[1] = i;
                } else {
                    this.M[0] = i;
                }
                break;
            case 'mousemove':
                this.M[2] = event.clientX;
                this.M[3] = event.clientY;
                break;
            case 'mouseout':
                this.M[2] = 0;
                break;
        }
        return true;
    }

    stop() {
        this.isRunning = false;
    }
}

window.addEventListener('load', () => {
    let app = new M();
    app.start();

    window.addEventListener('keydown', (e) => app.handleEvent(e));
    window.addEventListener('keyup', (e) => app.handleEvent(e));
    window.addEventListener('mousedown', (e) => app.handleEvent(e));
    window.addEventListener('mouseup', (e) => app.handleEvent(e));
    window.addEventListener('mousemove', (e) => app.handleEvent(e));
    window.addEventListener('mouseout', (e) => app.handleEvent(e));
});
