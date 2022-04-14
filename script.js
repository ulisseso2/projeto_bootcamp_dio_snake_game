let canvas = document.querySelector('#snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box
};
let direction = 'right';
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

let fast = 100;

function createBG() {
  context.fillStyle = '#333';
  context.fillRect(0, 0, 16 * box, 16 * box)
}

function createSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = 'White';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drowFood() {
  context.fillStyle = '#a00a2f';
  context.fillRect(food.x, food.y, box, box)

}

document.addEventListener('keydown', update);
function update(e) {
  if (e.keyCode == 37 && direction != 'right') direction = 'left';
  if (e.keyCode == 38 && direction != 'down') direction = 'up';
  if (e.keyCode == 39 && direction != 'left') direction = 'right';
  if (e.keyCode == 40 && direction != 'up') direction = 'down';
}

function startGame() {
  if (snake[0].x > 14 * box && direction == 'right') direction = 'left';
  if (snake[0].x < 1 * box && direction == 'left') direction = 'right';
  if (snake[0].y > 14 * box && direction == 'down') direction = 'up';
  if (snake[0].y < 1 * box && direction == 'up') direction = 'down';

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert('Fim de Jogo')
      btn.className = 'restart'
    }

  }

  createBG();
  createSnake()
  drowFood()
  let snakex = snake[0].x;
  let snakey = snake[0].y;

  if (direction == 'right') snakex += box;
  if (direction == 'left') snakex -= box;
  if (direction == 'up') snakey -= box;
  if (direction == 'down') snakey += box;

  if (snakex != food.x || snakey != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box,
      food.y = Math.floor(Math.random() * 15 + 1) * box
  }




  let newHead = {
    x: snakex,
    y: snakey,
  }

  snake.unshift(newHead);
}

let btn = document.querySelector("#refresh");
btn.addEventListener("click", function () {
  location.reload();
});

let game = setInterval(startGame, fast)
