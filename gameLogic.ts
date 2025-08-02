import * as readline from 'readline';
import chalk from 'chalk-advanced';

function cloneMap(matrix: string[][]): string[][] {
  return matrix.map(row => [...row]);
}

function solveMaze(maze: string[][]): [number, number][] | null {
  const length = maze.length;
  const width = maze[0].length;

  const visited = Array.from({ length }, () => Array(width).fill(false));
  const queue: { pos: [number, number]; path: [number, number][] }[] = [];
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
  ];

  let start: [number, number] = [-1, -1];

  findStart:
  for (let y = 0; y < length; y++) {
    for (let x = 0; x < width; x++) {
      if (maze[y][x] === 'P') {
        start = [y, x];
        break findStart;
      }
    }
  }

  if (start[0] === -1) return null; // No se encontró 'P'

  queue.push({ pos: start, path: [start] });
  visited[start[0]][start[1]] = true;

  while (queue.length > 0) {
    const { pos: [y, x], path } = queue.shift()!;

    for (const [dy, dx] of directions) {
      const ny = y + dy;
      const nx = x + dx;

      if (
        ny >= 0 && ny < length &&
        nx >= 0 && nx < width &&
        !visited[ny][nx] &&
        (maze[ny][nx] === ' ' || maze[ny][nx] === 'E')
      ) {
        const newPath = [...path, [ny, nx] as [number,number]];
        if (maze[ny][nx] === 'E') return newPath;
        visited[ny][nx] = true;
        queue.push({ pos: [ny, nx], path: newPath });
      }
    }
  }

  return null; 
}

export function startGame(selectedMap: string[][]) {
  const rl = readline.createInterface({  
    input: process.stdin,
    output: process.stdout,
  });

  const mazeStructure = cloneMap(selectedMap);
  let currentMap = cloneMap(mazeStructure);

  let posY = 0;
  let posX = 0;
  let moves = 0;

  for (let y = 0; y < currentMap.length; y++) {
    for (let x = 0; x < currentMap[0].length; x++) {
      if (currentMap[y][x] === 'P') {
        posY = y;
        posX = x;
        break;
      }
    }
  }

  function printMaze() {
    console.clear();
    for (const row of currentMap) {
      let coloredRow = '';
      for (const spot of row) {
        switch (spot) {
          case '#': coloredRow += chalk.black(spot) + ' '; break;
          case ' ': coloredRow += chalk.white(spot) + ' '; break;
          case '*': coloredRow += chalk.red(spot) + ' '; break;
          case 'E': coloredRow += chalk.green(spot) + ' '; break;
          case 'P': coloredRow += chalk.blue(spot) + ' '; break;
          default: coloredRow += spot + ' ';
        }
      }
      console.log(coloredRow);
    }
    console.log(`\nMovimientos: ${moves}`);
    console.log(`(Escribe 'reiniciar' para comenzar de nuevo)`);
  
  }

  function movingMines() {
    const directions: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const originalMines: [number, number][] = [];

    for (let y = 0; y < currentMap.length; y++) {
      for (let x = 0; x < currentMap[0].length; x++) {
        if (currentMap[y][x] === '*') {
          originalMines.push([y, x]);
        }
      }
    }

    for (const [y, x] of originalMines) {
      const options = directions
        .map(([dy, dx]) => [y + dy, x + dx] as [number, number])
        .filter(([ny, nx]) =>
          ny >= 0 && ny < currentMap.length &&
          nx >= 0 && nx < currentMap[0].length &&
          (currentMap[ny][nx] === ' ' || currentMap[ny][nx] === 'P')
        );

      if (options.length > 0) {
        const [newY, newX] = options[Math.floor(Math.random() * options.length)];

        if (currentMap[newY][newX] === 'P') {
          console.clear();
          console.log(chalk.red('\n💥 ¡Una mina te alcanzó! Has perdido.\n'));
          rl.question("¿Quieres intentarlo de nuevo? (s/n): ", (r) => {
            if (r.toLowerCase() === 's') {
              rl.close();
              startGame(mazeStructure);
            } else {
              rl.close();
            }
          });
          return false;
        }

        currentMap[y][x] = ' ';
        currentMap[newY][newX] = '*';
      }
    }

    return true;
  }

  function move(direction: string): boolean {
    const directions: Record<string, [number, number]> = {
      n: [-1, 0],
      s: [1, 0],
      o: [0, -1],
      e: [0, 1],
    };

    const followMines = movingMines();
    if (!followMines) return false;

    const delta = directions[direction];
    if (!delta) {
      console.log("Comando inválido. Usa: n, s, e, o, 'resolver' o 'reiniciar'");
      return true;
    }

    const newY = posY + delta[0];
    const newX = posX + delta[1];

    const insideLimits =
      newY >= 0 && newY < currentMap.length &&
      newX >= 0 && newX < currentMap[0].length;

    if (!insideLimits || currentMap[newY][newX] === '#') {
      console.log("¡No puedes moverte en esa dirección!");
      return true;
    }

    if (currentMap[newY][newX] === '*') {
      moves++;
      console.clear();
      currentMap[posY][posX] = ' ';
      currentMap[newY][newX] = 'P';
      printMaze();
      console.log(`\n🎉 ¡Has caído en una mina!`);
      rl.question("¿Quieres jugar de nuevo? (s/n): ", (answer) => {
        if (answer.toLowerCase() === 's') {
          rl.close();
          startGame(mazeStructure);
        } else {
          rl.close();
        }
      });
      return false;
    }

    if (currentMap[newY][newX] === 'E') {
      moves++;
      console.clear();
      currentMap[posY][posX] = ' ';
      currentMap[newY][newX] = 'P';
      printMaze();
      console.log(`\n🎉 ¡Has ganado en ${moves} movimientos!`);
      rl.question("¿Quieres jugar de nuevo? (s/n): ", (answer) => {
        if (answer.toLowerCase() === 's') {
          rl.close();
          startGame(mazeStructure);
        } else {
          rl.close();
        }
      });
      return false;
    }

    currentMap[posY][posX] = ' ';
    posY = newY;
    posX = newX;
    currentMap[posY][posX] = 'P';
    moves++;
    return true;
  }

function play() {
  printMaze();
  rl.question("Escribe una dirección (n, s, e, o) o 'resolver' para terminar: ", (input) => {
    const command = input.trim().toLowerCase();

    if (command === "reiniciar") {
      rl.close();
      startGame(mazeStructure);
      return;
    }

    if (command === "resolver") {
  const path = solveMaze(mazeStructure);
  if (!path) {
    console.log("No hay solución posible.");
    play();
    return;
  }

  moves=0;
  const safePath: [number, number][] = path; 

  let step = 0;
  function animateStep() {
    if (moves < safePath.length) {
      const [y, x] = safePath[moves];
      currentMap[posY][posX] = ' ';
      posY = y;
      posX = x;
      currentMap[posY][posX] = 'P';
      printMaze();
      moves++;
      setTimeout(animateStep, 300);
    } else {
      console.log(`\n¡Laberinto resuelto automáticamente en ${safePath.length - 1} pasos!`);
      rl.close();
    }
  }
  animateStep();
  return;
}

    const follow = move(command);
    if (follow) {
      setTimeout(play, 1000);
    }
  });
}

  play();
}
