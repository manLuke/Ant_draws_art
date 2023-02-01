// top: 0, right: 1, bottom: 2, left: 3
export const getRandomDirection = () => {
  return Math.floor(Math.random() * 4);
};

export const getRandomCoordinate = (size: number): Coordinate => {
  return { x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) };
}

export const isCollision = (c: Coordinate, size: number) => {
  return c.x < 0 || c.x >= size || c.y < 0 || c.y >= size;
}

export const nextCoordinate = (c: Coordinate, direction: number): Coordinate => {
  if (direction < 0 || direction > 3) {
    throw new Error('Direction must be between 0 and 3');
  }
  switch (direction) {
    case 0: return { x: c.x, y: c.y - 1 };
    case 1: return { x: c.x + 1, y: c.y };
    case 2: return { x: c.x, y: c.y + 1 };
    case 3: return { x: c.x - 1, y: c.y };
  }
  return c;
}
