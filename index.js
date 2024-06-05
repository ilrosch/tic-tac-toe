import readlineSync from 'readline-sync';

const welcome = () => {
  console.log('Добро пожаловать в игру «Крести Нолики»');
  const player1 = readlineSync.question('Имя первого игрока: ');
  const player2 = readlineSync.question('Имя второго игрока: ');
  console.log(`Отлично! ${player1} vs ${player2}`);

  return [player1, player2];
};

const startGame = () => {
  const [player1, player2] = welcome();
  const cells = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  const check = () => {
    const wins = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    const x = wins.map((win) => win.every(([row, column]) => cells[row][column] === 'x'));
    const o = wins.map((win) => win.every(([row, column]) => cells[row][column] === 'o'));

    return x.includes(true) || o.includes(true);
  };

  let count = 0;
  const move = (name1, name2, symbol) => {
    console.log(`Ход ${name1}`);
    const [row, column] = readlineSync.question('Формат ввода - строка/столбец: ').split(' ').map(Number);
    if (row > 3 || row < 0 || column > 3 || column < 0) {
      console.log(`Ошибка ввода данных! Формат ввода 'строка столбец', например, 1 1. Ваш ход: строка - ${row}, столбец - ${column}`);
      move(name1, name2, symbol);
    }

    if (cells[row - 1][column - 1] !== null) {
      console.log(`Ошибка ввода данных! Вы не можете сделать такой ход (${row} ${column}) - ячейка уже занята!`);
      move(name1, name2, symbol);
    }

    cells[row - 1][column - 1] = symbol;
    cells.forEach((row) => console.log(row));
    count += 1;

    if (check()) {
      console.log(`${name1} выиграл!`);
      return;
    }

    if (count === 9) {
      console.log('Ничья!');
      return;
    }

    move(name2, name1, symbol === 'x' ? 'o' : 'x');
  };

  move(player1, player2, 'x');

  console.log('Cпасибо за игру!');
  const userAnswer = readlineSync.question('Хотите сыграть ещё (y/n): ');

  if (userAnswer === 'y') {
    startGame();
  } else {
    console.log('До свидания!');
  }
};

startGame();
