"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const Position_1 = require("../models/Position");
const Config_1 = require("./Config");
const Renderer_1 = require("./Renderer");
class Board {
    constructor() {
        this.grid = Array(Config_1.CONFIG.BOARD_HEIGHT)
            .fill(0)
            .map(() => Array(Config_1.CONFIG.BOARD_WIDTH).fill(Config_1.CONFIG.CELL_EMPTY));
        this.renderer = new Renderer_1.Renderer(Config_1.CONFIG.BOARD_WIDTH, Config_1.CONFIG.BOARD_HEIGHT);
        this.specialTileMap = {};
    }
    setCell(position, value) {
        const hash = (0, Position_1.pos_hash)(position);
        if (value === Config_1.CONFIG.CELL_EMPTY || value === Config_1.CONFIG.CELL_SNAKE || value === Config_1.CONFIG.CELL_HEAD) {
            delete this.specialTileMap[hash];
        }
        else {
            this.specialTileMap[hash] = value;
        }
        this.grid[position.y][position.x] = value;
    }
    getCell(position) {
        return this.grid[position.y][position.x];
    }
    clear() {
        this.grid = this.grid.map(row => row.map(() => Config_1.CONFIG.CELL_EMPTY));
        this.renderer.clear();
        this.specialTileMap = {};
    }
    render() {
        this.renderer.clear();
        for (let y = 0; y < Config_1.CONFIG.BOARD_HEIGHT; y++) {
            for (let x = 0; x < Config_1.CONFIG.BOARD_WIDTH; x++) {
                if (this.grid[y][x] !== Config_1.CONFIG.CELL_EMPTY) {
                    this.renderer.drawCell(x, y, this.grid[y][x]);
                }
            }
        }
    }
}
exports.Board = Board;
