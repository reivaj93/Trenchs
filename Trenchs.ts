import * as readline from 'readline';
import { startGame } from './gameLogic';
import { easyMaze, hardMaze } from './maps';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Selecciona el mapa a jugar:");
console.log("1. Laberinto fácil");
console.log("2. Laberinto difícil");

rl.question("Ingresa el número de mapa (1 o 2): ", (answer) => {
  let selectedMap: string[][] | null = null;

  switch (answer.trim()) {
    case '1':
      selectedMap = easyMaze;
      break;
    case '2':
      selectedMap = hardMaze;
      break;
    default:
      console.log("Opción inválida.");
      rl.close();
      return;
  }

  rl.close();
  startGame(selectedMap);
});