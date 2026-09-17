export interface Position {
  x: number;
  y: number;
}

export function pos_add(left: Position, right: Position): Position {
  return {
    x: left.x + right.x,
    y: left.y + right.y,
  };
}

export function pos_subtract(left: Position, right: Position): Position {
  return {
    x: left.x - right.x,
    y: left.y - right.y,
  };
}

export function pos_equals(left: Position, right: Position): boolean {
  return left.x === right.x && left.y === right.y;
}

export function pos_hash(pos: Position): string {
  return `${pos.x},${pos.y}`
}

export function pos_fromHash(hash: string): Position {
  const separator = hash.indexOf(",");
  return {
    x: Number(hash.slice(0, separator)),
    y: Number(hash.slice(separator + 1)),
  };
}