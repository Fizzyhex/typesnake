"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Snake_1 = require("../models/Snake");
const Board_1 = require("./Board");
const Direction_1 = require("../models/Direction");
const Config_1 = require("./Config");
const Random_1 = require("../utils/Random");
class Game {
    constructor() {
        this.board = new Board_1.Board();
        const startPos = Random_1.Random.getRandomPosition(Config_1.CONFIG.BOARD_WIDTH, Config_1.CONFIG.BOARD_HEIGHT);
        this.snake = new Snake_1.Snake(startPos.x, startPos.y);
        this.snake.setDirection(Random_1.Random.getRandomDirection());
        this.isRunning = false;
        this.food = null;
        this.generateFood();
        this.score = 0;
        this.status = true;
        this.setupInputHandling();
    }
    generateFood() {
        // get snake positions
        const snakePositions = this.snake.getBody();
        let newFood;
        do {
            newFood = Random_1.Random.getRandomPosition(Config_1.CONFIG.BOARD_WIDTH, Config_1.CONFIG.BOARD_HEIGHT);
            // check if food is not on snake
        } while (snakePositions.some(pos => pos.x === newFood.x && pos.y === newFood.y));
        this.food = newFood;
    }
    setupInputHandling() {
        document.addEventListener('keydown', (event) => {
            const currentDirection = this.snake.getDirection();
            switch (event.key) {
                case 'ArrowUp':
                    // Запрещаем разворот на 180 градусов
                    if (currentDirection !== Direction_1.Direction.DOWN) {
                        this.snake.setDirection(Direction_1.Direction.UP);
                    }
                    break;
                case 'ArrowRight':
                    if (currentDirection !== Direction_1.Direction.LEFT) {
                        this.snake.setDirection(Direction_1.Direction.RIGHT);
                    }
                    break;
                case 'ArrowDown':
                    if (currentDirection !== Direction_1.Direction.UP) {
                        this.snake.setDirection(Direction_1.Direction.DOWN);
                    }
                    break;
                case 'ArrowLeft':
                    if (currentDirection !== Direction_1.Direction.RIGHT) {
                        this.snake.setDirection(Direction_1.Direction.LEFT);
                    }
                    break;
                // space for pause
                case ' ':
                    this.togglePause();
                    break;
            }
        });
    }
    togglePause() {
        this.isRunning = !this.isRunning;
        if (this.isRunning) {
            this.gameLoop();
        }
    }
    start() {
        this.isRunning = true;
        this.gameLoop();
    }
    gameOver() {
        this.isRunning = false;
        this.status = false;
        alert(`Game Over! Your score is: ${this.score}`);
        window.location.reload();
    }
    updateScore() {
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            this.score++;
            scoreElement.innerText = `: ${this.score}`;
        }
    }
    gameLoop() {
        if (!this.isRunning)
            return;
        this.update();
        this.board.render();
        setTimeout(() => this.gameLoop(), Config_1.CONFIG.GAME_SPEED);
    }
    update() {
        this.board.clear();
        const oldHead = this.snake.getHead();
        this.snake.move();
        if (this.food &&
            this.snake.getHead().x === this.food.x &&
            this.snake.getHead().y === this.food.y) {
            this.snake.grow();
            this.updateScore();
            this.generateFood();
        }
        //check board borders
        const head = this.snake.getHead();
        if (head.x < 0 || head.x >= Config_1.CONFIG.BOARD_WIDTH || head.y < 0 || head.y >= Config_1.CONFIG.BOARD_HEIGHT) {
            this.gameOver();
            return;
        }
        // update snake body on board
        const body = this.snake.getBody();
        body.forEach((segment, index) => {
            if (index === 0) {
                this.board.setCell(segment, Config_1.CONFIG.CELL_HEAD);
            }
            else {
                this.board.setCell(segment, Config_1.CONFIG.CELL_SNAKE);
            }
        });
        if (this.food) {
            this.board.setCell(this.food, Config_1.CONFIG.CELL_FOOD);
        }
    }
}
exports.Game = Game;
