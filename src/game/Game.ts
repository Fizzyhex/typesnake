import { Snake } from '../models/Snake';
import { Board } from './Board';
import { Direction } from '../models/Direction';
import { CONFIG } from './Config';
import { Random } from '../utils/Random';
import { Position } from '../models/Position';

export class Game {
  private snake: Snake;
  private board: Board;
  private isRunning: boolean;
  private food: Position | null;
  private score: number;
  private status: boolean;
  private readonly gameOverElement: HTMLElement;
  private readonly retryButton: HTMLButtonElement;
 
  constructor() {
    this.gameOverElement = document.getElementById('gameOver') as HTMLElement;
    this.retryButton = document.getElementById('retryButton') as HTMLButtonElement;
    this.board = new Board();
    this.snake = this.createSnake();
    this.isRunning = false;
    this.food=null;
    this.generateFood();
    this.score = 0;
    this.status = true;
    this.setupInputHandling();
    this.retryButton.addEventListener('click', () => this.restart());
  }

  private createSnake(): Snake {
    const startXLimit = CONFIG.BOARD_WIDTH - CONFIG.INITIAL_SNAKE_LENGTH + 1;
    const startPos = Random.getRandomPosition(startXLimit, CONFIG.BOARD_HEIGHT);
    const snake = new Snake(
      startPos.x + CONFIG.INITIAL_SNAKE_LENGTH - 1,
      startPos.y
    );
    snake.setDirection(Random.getRandomDirection());
    return snake;
  }

  private restart(): void {
    this.board.clear();
    this.snake = this.createSnake();
    this.food = null;
    this.generateFood();
    this.score = 0;
    this.status = true;
    this.isRunning = true;
    this.gameOverElement.hidden = true;
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
      scoreElement.innerText = '0';
    }
    this.gameLoop();
  }

  private generateFood(): void {
    // get snake positions
    const snakePositions = this.snake.getBody();
    let newFood: Position;

    do {
      newFood = Random.getRandomPosition(CONFIG.BOARD_WIDTH, CONFIG.BOARD_HEIGHT);
      // check if food is not on snake
    } while (snakePositions.some(pos => pos.x === newFood.x && pos.y === newFood.y));

    this.food = newFood;
  }

  private setupInputHandling(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      const currentDirection = this.snake.getDirection();

      switch (event.key) {
        case 'ArrowUp':
          // Запрещаем разворот на 180 градусов
          if (currentDirection !== Direction.DOWN) {
            this.snake.setDirection(Direction.UP);
          }
          break;
        case 'ArrowRight':
          if (currentDirection !== Direction.LEFT) {
            this.snake.setDirection(Direction.RIGHT);
          }
          break;
        case 'ArrowDown':
          if (currentDirection !== Direction.UP) {
            this.snake.setDirection(Direction.DOWN);
          }
          break;
        case 'ArrowLeft':
          if (currentDirection !== Direction.RIGHT) {
            this.snake.setDirection(Direction.LEFT);
          }
          break;
        // space for pause
        case ' ':
          this.togglePause();
          break;
      }
    });
  }

  private togglePause(): void {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      this.gameLoop();
    }
  }

  start(): void {
    this.isRunning = true;
    this.gameLoop();
  }

  private gameOver(): void {
    this.isRunning = false;
    this.status = false;
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
      finalScoreElement.innerText = `${this.score}`;
    }
    this.gameOverElement.hidden = false;
  }

  private updateScore(): void {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
      this.score++;
      scoreElement.innerText = `: ${this.score}`;
    }
  }

  private gameLoop(): void {
    if (!this.isRunning) return;

    this.update();
    this.board.render();

    if (this.isRunning) {
      setTimeout(() => this.gameLoop(), CONFIG.GAME_SPEED);
    }
  }

  private update(): void {
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
    if (head.x < 0 || head.x >= CONFIG.BOARD_WIDTH || head.y < 0 || head.y >= CONFIG.BOARD_HEIGHT) {
      this.gameOver();
      return;
    }


    // update snake body on board
    const body = this.snake.getBody();
    body.forEach((segment, index) => {
      if (index === 0) {
        this.board.setCell(segment, CONFIG.CELL_HEAD);
      } else {
        this.board.setCell(segment, CONFIG.CELL_SNAKE);
      }
    });


    if (this.food) {
      this.board.setCell(this.food, CONFIG.CELL_FOOD);
    }
  }
}