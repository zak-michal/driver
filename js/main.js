import LegoBoost from 'lego-boost-browser';

function controller() {
  this.boost = null;
  this.v = 0.0;
  this.direction = 0.0;
  this.accelerometer = new Accelerometer()

  this.drive = function (v, direction) {
    this.v = v;
    this.direction = direction
  }
  this.move = function () {
    let a = this.v * (this.direction > 0 ? (1.0 - this.direction) : 1)
    let b = this.v * (this.direction < 0 ? (1.0 + this.direction) : 1)
    this.boost.motorTime("A", 0.5, a);
    this.boost.motorTime("B", 0.5, b);
  }
}

const ctx = new controller();

function showAcc() {
  let acc = document.getElementById('acc')
  acc.innerText = `${ctx.accelerometer.x} ${ctx.accelerometer.y} ${ctx.accelerometer.z}`
}

function init() {

  document.getElementById('start').onclick = start;
  document.getElementById('fw').onclick = () => ctx.drive(100, 0);
  document.getElementById('left').onclick = () => ctx.drive(100, 1);
  document.getElementById("right").onclick = () => ctx.drive(100, -1);
  document.getElementById("stop").onclick = () => ctx.drive(0, 0);

  setInterval(showAcc, 300);
}

function start() {
  let boost = new LegoBoost();
  boost.connect().then(() => {
    ctx.boost = boost
    setInterval(() => ctx.move(), 100)
  })
  console.info(boost);
}

document.addEventListener('DOMContentLoaded', init);


