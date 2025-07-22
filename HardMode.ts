import * as readline from 'readline';
import chalk from 'chalk-advanced';

const originalMaze: string[][] = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#','#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#','#', '#', '#', '#', '#', '#', '#', '#', '#','#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', '#', '#', '#', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','#'],
  ['#', ' ', '#', '#', '#', '#', ' ', '#', '#', '#', ' ', '#', '#','#', ' ', '#', '#', '#', ' ', '#', ' ', '#', ' ', '#', ' ', '#','#', '#', '#', '#', '#', '#', '#', '#', ' ','#'],
  ['#', ' ', '#', '#', '#', '#', ' ', '#', '#', '#', ' ', '#', '#','#', ' ', '#', ' ', ' ', ' ', '#', ' ', ' ', ' ', '#', ' ', '#','#', '#', '#', '#', '#', '#', '#', '#', ' ','#'],
  ['#', ' ', '#', ' ', ' ', ' ', ' ', '*', '#', '#', ' ', '#', '#','#', ' ', '#', ' ', '#', '#', '#', '#', '#', '#', '#', ' ', '#','#', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ','#'],
  ['#', ' ', '#', ' ', '#', '#', ' ', '#', '#', '#', '#', '#', '#','#', ' ', '#', ' ', '#', '#', '#', '#', '#', '#', '#', ' ', '#','#', ' ', '#', '#', '#', '#', ' ', '#', ' ','#'],
  ['#', ' ', '#', ' ', '#', '#', ' ', '#', '#', '#', '#', '#', '#','#', ' ', '#', ' ', '#', '#', '#', '#', '#', '#', '#', ' ', '#','#', ' ', ' ', ' ', ' ', '#', ' ', '#', ' ','#'],
  ['#', ' ', '#', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', '#','#', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#','#', '#', ' ', '#', ' ', ' ', ' ', '#', ' ','#'],
  ['#', ' ', '#', '#', ' ', '#', ' ', '#', '#', '#', '#', '#', '#','#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#','#', '#', ' ', '#', ' ', '#', '#', '#', ' ','#'],
  ['#', ' ', '#', '#', ' ', '#', ' ', '#', '#', '#', '#', '#', '#','#', ' ', '#', ' ', ' ', '#', '#', ' ', ' ', ' ', '#', ' ', '#','#', '#', ' ', '#', ' ', '#', '#', '#', ' ','#'],
  ['#', '*', '#', '#', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', '#','#', ' ', '#', ' ', '#', '#', '#', ' ', '#', ' ', '#', ' ', '#','#', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ','#'],
  ['#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#','#', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', '#','#', '#', '#', '#', '#', '#', '#', '#', ' ','#'],
  ['#', '*', ' ', ' ', ' ', '#', '#', '#', '#', '#', ' ', '#', '#','#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#','#', '#', '#', '#', '#', '#', '#', '#', ' ','#'],
  ['#', '#', ' ', '#', ' ', ' ', '#', ' ', ' ', ' ', ' ', '#', '#','#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#','#', '#', '#', '#', '#', '#', ' ', ' ', ' ','#'],
  ['#', '#', ' ', '#', '#', ' ', '#', ' ', '#', '#', ' ', '#', '#','#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', ' ', ' ', '#','#', '#', '#', '#', '#', '#', ' ', '#', ' ','#'],
  ['#', '#', ' ', ' ', ' ', ' ', '#', ' ', '#', '#', ' ', '#', '#','#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ','#'],
  ['#', '#', '#', ' ', '#', ' ', '#', ' ', '#', '#', ' ', '#', '#','#', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', ' ', '#','#', '#', '#', '#', '#', '#', '#', '#', ' ','#'],
  ['#', '#', '#', ' ', '#', ' ', '#', ' ', '#', '#', ' ', '#', '#','#', ' ', '#', ' ', '#', ' ', '#', ' ', '#', '#', '#', ' ', '#','#', '#', '#', '#', '#', '#', '#', '#', ' ','#'],
  ['P', ' ', ' ', ' ', '#', ' ', ' ', ' ', '#', '#', ' ', '#', '#','#', ' ', '#', ' ', '#', ' ', '#', ' ', '#', '#', '#', ' ', '#','#', '#', '#', '#', '#', '#', '#', '#', ' ','#'],
  ['#', '#', '#', '#', '#', '#', ' ', '#', ' ', ' ', ' ', ' ', ' ','#', ' ', '#', ' ', ' ', ' ', '#', ' ', ' ', ' ', '#', ' ', '#','#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','#'],
  ['#', '#', ' ', ' ', ' ', ' ', ' ', '#', ' ', '#', ' ', '#', '#','#', ' ', '#', '#', '#', '#', '#', '#', '#', ' ', '#', ' ', '#','#', ' ', '#', '#', '#', '#', '#', '#', ' ','#'],
  ['#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', ' ', '#', '#','#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', ' ', '#','#', ' ', '#', '#', '#', '#', '#', '#', ' ','#'],
  ['#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', '#', ' ', '#', '#','#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', '#','#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','#'],
  ['#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#','#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#','#', '#', '#', '#', '#', '#', '#', '#', ' ','#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#','#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#','#', '#', '#', '#', '#', '#', '#', '#', ' ','#'],
  ['#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#','#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ',' ', ' ', ' ', '#', '#', '#', '#', '#', ' ','#'],
  ['#', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', ' ', '#', '#','#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', ' ', '#', '#','#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ','#'],
  ['#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#','#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#','#', '#', '#', ' ', '#', '#', '#', '#', ' ','#'],
  ['#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#','#', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', '#', '#','#', '#', '#', ' ', '#', '*', ' ', '#', ' ','#'],
  ['#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', ' ', ' ',' ', ' ', '#', ' ', '#', ' ', '#', ' ', '#', '#', ' ', '#', '#',' ', ' ', ' ', ' ', '#', '#', ' ', '#', ' ','#'],
  ['#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '*', '#','#', ' ', '#', ' ', '#', ' ', ' ', ' ', '#', '#', ' ', '#', '#','#', '#', '#', ' ', '#', '#', ' ', '#', ' ','#'],
  ['#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#','#', ' ', '#', '*', '#', ' ', '#', ' ', '#', '#', ' ', '#', ' ',' ', '#', '#', ' ', ' ', '#', ' ', '#', ' ','#'],
  ['#', ' ', ' ', ' ', ' ', '#', ' ', '#', '#', '#', '#', ' ', '#','#', ' ', '#', '#', '#', '*', '#', '#', '#', '#', ' ', '#', '#',' ', '#', '#', ' ', ' ', ' ', ' ', '#', ' ','#'],
  ['#', ' ', '#', '#', ' ', '#', ' ', '#', '#', '#', '#', '#', '#','#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#',' ', '#', '#', '#', '#', '#', '#', '#', ' ','#'],
  ['#', ' ', '#', '#', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#','#', '#', '#', '#', 'E', '#', '#', '#', '#', '#', '#', '#', '#','#', '#', '#', '#', '#', '#', '#', '#', '#','#'],
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function cloneMap(matrix: string[][]): string[][] {
  return matrix.map(row => [...row]);
}

function startGame() {
  let mazeStructure = cloneMap(originalMaze);
  let posY = 18;
  let posX = 0;
  let moves = 0;

  function printMaze() {
    console.clear();
    for (const row of mazeStructure) {
      let coloredRow = '';
      for (const spot of row) {
        switch (spot) {
          case '#':
            coloredRow += chalk.black(spot) + ' ';
            break;
          case ' ':
            coloredRow += chalk.white(spot) + ' ';
            break;
          case '*':
            coloredRow += chalk.red(spot) + ' ';
            break;
          case 'E':
            coloredRow += chalk.green(spot) + ' ';
            break;
          case 'P':
            coloredRow += chalk.blue(spot) + ' ';
            break;
          default:
            coloredRow += spot + ' ';
        }
      }
      console.log(coloredRow);
    }
    console.log(`\nMovimientos: ${moves}`);
    console.log(`(Escribe 'reiniciar' para comenzar de nuevo)`);
  }

  function moverMinasAleatoriamente() {
    const direcciones: [number, number][] = [[-1,0], [1,0], [0,-1], [0,1]];
    const minasOriginales: [number, number][] = [];

    // Buscar minas
    for (let y = 0; y < mazeStructure.length; y++) {
      for (let x = 0; x < mazeStructure[0].length; x++) {
        if (mazeStructure[y][x] === '*') {
          minasOriginales.push([y, x]);
        }
      }
    }

<<<<<<< HEAD:HardMode.ts
    for (const [y, x] of minasOriginales) {
      const opciones = direcciones
        .map(([dy, dx]) => [y + dy, x + dx] as [number, number])
        .filter(([ny, nx]) =>
          ny >= 0 && ny < mazeStructure.length &&
          nx >= 0 && nx < mazeStructure[0].length &&
          (mazeStructure[ny][nx] === ' ' || mazeStructure[ny][nx] === 'P')
        );
=======
function mover(direccion: string) {
  const direcciones: Record<string, [number, number]> = {
    n: [-1, 0],
    s: [1, 0],
    o: [0, -1],
    e: [0, 1],
  };
>>>>>>> fb8178b079deda9893ae3565224d1af5b83a31d4:BigTest.ts

      if (opciones.length > 0) {
        const [nuevoY, nuevoX] = opciones[Math.floor(Math.random() * opciones.length)];

        if (mazeStructure[nuevoY][nuevoX] === 'P') {
          console.clear();
          console.log(chalk.red('\n💥 ¡Una mina te alcanzó! Has perdido.\n'));
          rl.question("¿Quieres intentarlo de nuevo? (s/n): ", (r) => {
            if (r.toLowerCase() === 's') startGame();
            else rl.close();
          });
          return false;
        }

        mazeStructure[y][x] = ' ';
        mazeStructure[nuevoY][nuevoX] = '*';
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

    const dentroDeLimites =
      newY >= 0 && newY < mazeStructure.length &&
      newX >= 0 && newX < mazeStructure[0].length;

    if (!dentroDeLimites || mazeStructure[newY][newX] === '#') {
      console.log("¡No puedes moverte en esa dirección!");
      return true;
    }

    if (mazeStructure[newY][newX] === '*') {
      moves++;
      console.clear();
      mazeStructure[posY][posX] = ' ';
      mazeStructure[newY][newX] = 'P';
      printMaze();
      console.log(`\n🎉 ¡Has caído en una mina!`);
      rl.question("¿Quieres jugar de nuevo? (s/n): ", (answer) => {
        if (answer.toLowerCase() === 's') {
          startGame();
        } else {
          console.log("¡Gracias por jugar!");
          rl.close();
        }
      });
      return false;
    }

    if (mazeStructure[newY][newX] === 'E') {
      moves++;
      console.clear();
      mazeStructure[posY][posX] = ' ';
      mazeStructure[newY][newX] = 'P';
      printMaze();
      console.log(`\n🎉 ¡Has ganado en ${moves} movimientos!`);
      rl.question("¿Quieres jugar de nuevo? (s/n): ", (answer) => {
        if (answer.toLowerCase() === 's') {
          startGame();
        } else {
          console.log("¡Gracias por jugar!");
          rl.close();
        }
      });
      return false;
    }

    mazeStructure[posY][posX] = ' ';
    posY = newY;
    posX = newX;
    mazeStructure[posY][posX] = 'P';
    moves++;
    return true;
  }

  function play() {
    printMaze();
    rl.question("Escribe una dirección (n, s, e, o): ", (input) => {
      const command = input.trim().toLowerCase();

      if (command === "reiniciar") {
        startGame();
        return;
      }

      const seguir = move(command);
      if (seguir) {
        setTimeout(play, 1000); 
      }
    });
  }

  play();
}

startGame();
