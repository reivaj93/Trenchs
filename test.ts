import * as readline from 'readline';
import  chalk  from 'chalk-advanced';

const mazeStructure: string[][] = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '*', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#'],
  ['#', '#', '#', ' ', ' ', ' ', '#', '#', ' ', '#', ' ', ' ', '#'],
  ['E', ' ', '#', '#', ' ', '#', ' ', ' ', ' ', ' ', '#', '#', '#'],
  ['#', ' ', '#', '*', ' ', '#', ' ', '#', '#', ' ', ' ', ' ', '#'],
  ['#', ' ', '#', '#', ' ', '#', ' ', '#', '#', ' ', '#', '#', '#'],
  ['#', ' ', '#', ' ', ' ', ' ', ' ', '#', '#', ' ', '#', '#', '#'],
  ['#', ' ', '#', ' ', '#', ' ', ' ', '*', '#', ' ', ' ', ' ', 'P'],
  ['#', ' ', '#', ' ', '#', ' ', ' ', ' ', '#', ' ', '#', '#', '#'],
  ['#', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', '#', ' ', '#', ' ', ' ', '#', '#', ' ', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

let posY = 7;
let posX = 12;
let movimientos = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function imprimirLaberinto() {
  console.clear();
   for (const fila of mazeStructure) {
    let filaColoreada = '';
    for (const celda of fila) {
      switch (celda) {
        case '#':
          filaColoreada += chalk.black(celda) + ' ';
          break;
        case ' ':
          filaColoreada += chalk.white(celda) + ' ';
          break;
        case '*':
          filaColoreada += chalk.red(celda) + ' ';
          break;
        case 'E':
          filaColoreada += chalk.green(celda) + ' ';
          break;
        case 'P':
          filaColoreada += chalk.blue(celda) + ' ';
          break;
        default:
          filaColoreada += celda + ' ';
      }
    }
    console.log(filaColoreada);
  }
  console.log(`\nMovimientos: ${movimientos}`);
}

function mover(direccion: string) {
  const direcciones: Record<string, [number, number]> = {
    n: [-1, 0],
    s: [1, 0],
    o: [0, -1],
    e: [0, 1],
  };

  const delta = direcciones[direccion];
  if (!delta) {
    console.log("Comando inválido. Usa: n, s, e, o");
    return true;
  }

  const nuevaY = posY + delta[0];
  const nuevaX = posX + delta[1];

  const dentroDeLimites =
    nuevaY >= 0 && nuevaY < mazeStructure.length &&
    nuevaX >= 0 && nuevaX < mazeStructure[0].length;

  if (!dentroDeLimites || mazeStructure[nuevaY][nuevaX] === '#') {
    console.log("¡No puedes moverte en esa dirección!");
    return true;
  }

  if (mazeStructure[nuevaY][nuevaX] === 'E') {
    movimientos++;
    console.clear();
    mazeStructure[posY][posX] = ' ';
    mazeStructure[nuevaY][nuevaX] = 'P';
    imprimirLaberinto();
    console.log(`\n🎉 ¡Has ganado en ${movimientos} movimientos!`);
    rl.close();
    return false;
  }

  // Mover jugador
  mazeStructure[posY][posX] = ' ';
  posY = nuevaY;
  posX = nuevaX;
  mazeStructure[posY][posX] = 'P';
  movimientos++;
  return true;
}

function jugar() {
  imprimirLaberinto();
  rl.question("Escribe una dirección (n, s, e, o): ", (input) => {
    const seguir = mover(input.trim().toLowerCase());
    if (seguir) 
      setTimeout(() => {
    jugar();
  },1200)
    ;
  });
}

jugar();
