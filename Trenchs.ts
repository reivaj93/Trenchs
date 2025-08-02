import * as readline from 'readline';
import { startGame } from './gameLogic';
import { easyMaze, hardMaze } from './maps';
import chalk from 'chalk-advanced';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(chalk.green("🌴🌿🌱  Bienvenido a   🌱🌿🌴"))
console.log()
console.log(chalk.redBright("💀🪖🐍   T  R  E  N  C  H  S   🐍🪖💀"))
console.log()
console.log(chalk.green("En la implacable jungla de Indochina, las trincheras son una prisión de muerte silenciosa.") )
console.log(chalk.green("Cada paso puede ser el último, entre minas ocultas y sombras que acechan. Solo los más valientes logran sobrevivir a este infierno verde."))
console.log()
console.log("Selecciona el mapa a jugar:");
console.log("1. Trinchera fácil");
console.log("2. Trincehra difícil");

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