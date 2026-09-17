import { Position } from './Position';
import { Direction } from './Direction';
import { CONFIG } from '../game/Config';

export class Snake {
  private body: Position[];
  private direction: Direction;
  private growing: boolean = false;

  constructor(startX: number, startY: number) {
    this.body = Array.from(
      { length: CONFIG.INITIAL_SNAKE_LENGTH },
      (_, index) => ({ x: startX - index, y: startY })
    );
    this.direction = Direction.RIGHT;
  }

  getBody(): Position[] {
    return [...this.body];
  }

  getHead(): Position {
    return { ...this.body[0] };
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  getDirection(): Direction {
    return this.direction;
  }

  grow(): void {
    this.growing = true;
  }

  move(): void {
    const head = this.body[0];
    let newHead: Position;
    switch (this.direction) {
      case Direction.UP:
        newHead = { 
          x: head.x, 
          y: head.y - 1 
        };
        break;
      case Direction.RIGHT:
        newHead = { 
          x: head.x + 1, 
          y: head.y 
        };
        break;
      case Direction.DOWN:
        newHead = { 
          x: head.x, 
          y: head.y + 1 
        };
        break;
      case Direction.LEFT:
        newHead = { 
          x: head.x - 1, 
          y: head.y 
        };
        break;
    }

  
    this.body.unshift(newHead);
  
    if (!this.growing) {
      this.body.pop();
    } else {
      this.growing = false;
    }
  }
}