import { CONFIG } from './Config';

export class Renderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private cellSize: number;
  
    constructor(width: number, height: number) {
      this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
      this.canvas.width = width * CONFIG.CELL_SIZE;
      this.canvas.height = height * CONFIG.CELL_SIZE;
      this.cellSize = CONFIG.CELL_SIZE;
      
      
      const context = this.canvas.getContext('2d');
      if (!context) {
        throw new Error('Could not get canvas context');
      }
      this.ctx = context;
    }
  
    clear(): void {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    drawCell(x: number, y: number, type: number): void {
      switch(type) {
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
      
      this.ctx.fillRect(
        x * this.cellSize, 
        y * this.cellSize, 
        this.cellSize - 1, 
        this.cellSize - 1
      );
    }
  }