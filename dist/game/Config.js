"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
exports.CONFIG = {
    BOARD_WIDTH: 50,
    BOARD_HEIGHT: 40,
    INITIAL_SNAKE_LENGTH: 1,
    GAME_SPEED: 100, // ms
    CELL_EMPTY: 0,
    CELL_SNAKE: 1,
    CELL_HEAD: 2,
    CELL_FOOD: 3,
    CONTROLS: {
        UP: 'ArrowUp',
        RIGHT: 'ArrowRight',
        DOWN: 'ArrowDown',
        LEFT: 'ArrowLeft',
        PAUSE: ' '
    }
};
