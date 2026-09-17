"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const Config_1 = require("./Config");
class Renderer {
    constructor(width, height) {
        this.canvas = document.getElementById('gameCanvas');
        this.canvas.width = width * Config_1.CONFIG.CELL_SIZE;
        this.canvas.height = height * Config_1.CONFIG.CELL_SIZE;
        this.cellSize = Config_1.CONFIG.CELL_SIZE;
        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('Could not get canvas context');
        }
        this.ctx = context;
    }
    clear() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawCell(x, y, type) {
        switch (type) {
            case 1: // snake body
                this.ctx.fillStyle = 'green';
                break;
            case 2: // snake head
                this.ctx.fillStyle = 'darkgreen';
                break;
            case 3: // food
                this.ctx.fillStyle = 'red';
                break;
            default:
                return;
        }
        this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize - 1, this.cellSize - 1);
    }
}
exports.Renderer = Renderer;
