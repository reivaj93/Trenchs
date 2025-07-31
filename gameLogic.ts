import * as readline from 'readline';
import chalk from 'chalk-advanced';

function cloneMap(matrix: string[][]): string[][] {
  return matrix.map(row => [...row]);
}

export function startGame(selectedMap: string[][]) {
  const rl = readline.createInterface({  // Mover rl aquí para recrearlo cada vez
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

  function moverMinasAleatoriamente() {
    const direcciones: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const minasOriginales: [number, number][] = [];

    for (let y = 0; y < currentMap.length; y++) {
      for (let x = 0; x < currentMap[0].length; x++) {
        if (currentMap[y][x] === '*') {
          minasOriginales.push([y, x]);
        }
      }
    }

    for (const [y, x] of minasOriginales) {
      const opciones = direcciones
        .map(([dy, dx]) => [y + dy, x + dx] as [number, number])
        .filter(([ny, nx]) =>
          ny >= 0 && ny < currentMap.length &&
          nx >= 0 && nx < currentMap[0].length &&
          (currentMap[ny][nx] === ' ' || currentMap[ny][nx] === 'P')
        );

      if (opciones.length > 0) {
        const [nuevoY, nuevoX] = opciones[Math.floor(Math.random() * opciones.length)];

        if (currentMap[nuevoY][nuevoX] === 'P') {
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
        currentMap[nuevoY][nuevoX] = '*';
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

    const minasSiguen = moverMinasAleatoriamente();
    if (!minasSiguen) return false;

    const delta = directions[direction];
    if (!delta) {
      console.log("Comando inválido. Usa: n, s, e, o o 'reiniciar'");
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
    rl.question("Escribe una dirección (n, s, e, o): ", (input) => {
      const command = input.trim().toLowerCase();

      if (command === "reiniciar") {
        rl.close();
        startGame(mazeStructure);
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
