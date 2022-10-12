// var start = document.querySelector('.start');

// start.onclick = function(){
//     var text = 'Some thoughts';
//     console.log(text);

//     start.style.opacity = 0;

//     addDiv();
// };

//     var div = document.createElement("div");
//     div.style.width = "100px";
//     div.style.height = "100px";
//     div.style.background = "red";
//     div.style.color = "white";
//     div.innerHTML = "Hello";

//     document.getElementById("main").appendChild(div);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

const opers = ["/", "*", "+", "-"];

function getRandomNumbers(op) {
  const a1 = getRandomInt(1, 201);
  const a2 = getRandomInt(1, 201);
  let res;
  switch (op) {
    case "/":
      res = a1 / a2;
      break;
    case "+":
      res = a1 + a2;
      break;
    case "-":
      res = a1 - a2;
      break;
    case "*":
      res = a1 * a2;
      break;
  }
  return { a1, a2, res, op };
}

function getGarantNumbers() {
  const op = opers[getRandomInt(0, opers.length)];
  while (true) {
    const result = getRandomNumbers(op);
    if (result.res <= 200 && result.res >= 1) {
      return result;
    }
  }
}

const a1e = document.getElementById("a1");
const a2e = document.getElementById("a2");
const rese = document.getElementById("res");

function draw({ a1, a2, res }) {
  a1e.innerHTML = "";
  a1e.innerText = a1;
  a2e.innerHTML = "";
  a2e.innerText = a2;
  rese.innerHTML = "";
  rese.innerText = res;
}

let globalOP = null;

function onBtnClick(op) {
  globalOP = op;
}

function formater(sec_num) {
  var minutes = Math.floor(sec_num / 60);
  var seconds = Math.floor(sec_num - minutes * 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

let ans = 0;
let right = 0;
const times = [];

let GAME;
let game;
let timer;

function finish() {
  clearTimeout(GAME);
  clearInterval(timer);
  clearInterval(game);
  const prim_done = document.getElementById("prim_done");
  const right_done = document.getElementById("right_done");
  const avg_time = document.getElementById("avg_time");
  const max_time = document.getElementById("max_time");
  const min_time = document.getElementById("min_time");

  prim_done.innerHTML = "";
  prim_done.innerText = "Решено примеров: " + ans;

  right_done.innerHTML = "";
  right_done.innerText = "Правильно: " + right;

  avg_time.innerHTML = "";
  avg_time.innerText =
    "Среднее время решения примера: " +
    times.reduce((accumulator, currentValue) => accumulator + currentValue) /
      ans /
      10 +
    " сек";

  max_time.innerHTML = "";
  max_time.innerText =
    "Максимальное время решения примера: " +
    times.sort((a, b) => b - a)[0] / 10 +
    " секунд";

  min_time.innerHTML = "";
  min_time.innerText =
    "Миинимальное время решения примера: " +
    times.sort((a, b) => a - b)[0] / 10 +
    " секунд";
}

function start() {
  console.log("START");
  const TIME = 3;
  let timeLeft = TIME * 10;
  const timerE = document.getElementById("time");
  timerE.innerHTML = "";
  timerE.innerText = formater(timeLeft / 10);
  timer = setInterval(() => {
    timeLeft--;
    timerE.innerHTML = "";
    timerE.innerText = formater(timeLeft / 10);
  }, 100);

  let inWorking = false;
  let res;
  let startTime;
  game = setInterval(() => {
    if (!inWorking) {
      res = getGarantNumbers();
      draw(res);
      inWorking = true;
      startTime = timeLeft;
    } else {
      if (globalOP) {
        console.log({ globalOP });
        inWorking = false;
        times.push(startTime - timeLeft);
        ans++;
        right += globalOP === res.op;
        globalOP = null;
      }
    }
  }, 50);

  GAME = setTimeout(() => {
    finish();
  }, TIME * 1000);
}
