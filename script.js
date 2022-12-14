const c = document.getElementById(`canvas`)
const ctx = c.getContext(`2d`)
const ball = {
  x: 400,
  y: 300
}
const paddleOne = {
  x: 325,
  y: 550,
  height: 50,
  weight: 150
}

const paddleTwo = {
  x: 325,
  y: 0,
  height: 50,
  weight: 150
}

let baseP1Score = 0
let baseP2Score = 0

// Basic ball bouncing template - https://medium.com/@danny.jamesbuckley/html-canvas-animation-bouncing-ball-c5c1d16ebe1a

const rad = 20
let moveX = (Math.random() * (4 - 2) + 2) * (Math.random() < 0.5 ? -1 : 1)
let moveY = (Math.random() * (3 - 2) + 2) * (Math.random() < 0.5 ? -1 : 1)
const p1Score = document.querySelector(`.p1Score`)
const p2Score = document.querySelector(`.p2Score`)
let whoScored = 0

reset = () => {
  ball.x = 400
  ball.y = 300
  paddleOne.x = 325
  paddleTwo.x = 325
  clearInterval(refreshIntervalId)
  moveX = (Math.random() * (4 - 2) + 2) * (Math.random() < 0.5 ? -1 : 1)
  moveY = (Math.random() * (3 - 2) + 2) * (Math.random() < 0.5 ? -1 : 1)

  startGame()
}
const runScorePoint = () => {
  if (whoScored === 1) {
    baseP1Score += 1
    p1Score.innerHTML = `PLAYER 1: ${baseP1Score}`
    reset()
    whoScored = 0
  } else if (whoScored === 2) {
    baseP2Score += 1
    p2Score.innerHTML = `PLAYER 2: ${baseP2Score}`
    reset()
    whoScored = 0
  }
}

const ballMotion = () => {
  //x pos, y pos, canvas width, canvas height, defining walls for the ball
  ctx.clearRect(0, 0, 800, 600)
  //If ball at pos x is greater than the canvas width minus ball size OR ball at pos x is less than radius subtract from moveX
  if (ball.x > c.width - rad || ball.x < rad) {
    moveX = -moveX
  }
  if (ball.y > c.height - rad || ball.y < rad) {
    moveY = -moveY
  }

  ball.x += moveX
  ball.y += moveY
  ctx.beginPath()
  ctx.fillStyle = '#964B00'
  ctx.arc(ball.x, ball.y, rad, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()

  ctx.beginPath()
  ctx.fillStyle = '#E0A370'
  ctx.rect(paddleOne.x, paddleOne.y, paddleOne.weight, paddleOne.height)
  ctx.fill()
  ctx.closePath()

  ctx.beginPath()
  ctx.fillStyle = '#709F9D'
  ctx.rect(paddleTwo.x, paddleTwo.y, paddleTwo.weight, paddleTwo.height)
  ctx.fill()
  ctx.closePath()

  if (
    ball.y + rad > paddleOne.y &&
    ball.x > paddleOne.x &&
    ball.x < paddleOne.x + paddleOne.weight
  ) {
    ball.y -= 10
    moveY = -moveY
  }

  if (
    ball.y < paddleTwo.y + paddleTwo.height + rad &&
    ball.x > paddleTwo.x &&
    ball.x < paddleTwo.x + paddleTwo.weight
  ) {
    ball.y += 10
    moveY = -moveY
  }

  if (ball.y + rad > paddleOne.y + 25) {
    whoScored = 2
    runScorePoint()
  } else if (ball.y < paddleTwo.y + paddleTwo.height - 10) {
    whoScored = 1
    runScorePoint()
  }
}

const paddleMotion = () => {
  window.addEventListener(`keydown`, (e) => {
    switch (e.key) {
      case `ArrowLeft`:
        if (paddleOne.x > 10) {
          paddleOne.x -= 35
        }
        break
      case `ArrowRight`:
        if (paddleOne.x < 650) {
          paddleOne.x += 35
        }
        break
    }
  })
  window.addEventListener(`keydown`, (e) => {
    switch (e.code) {
      case `KeyA`:
        if (paddleTwo.x > 10) {
          paddleTwo.x -= 35
        }
        break
      case `KeyD`:
        if (paddleTwo.x < 650) {
          paddleTwo.x += 35
        }
        break
    }
  })
}
paddleMotion()
const startGame = (e) => {
  window.addEventListener(`keypress`, startGame)
  if (e.code === `Space`) {
    refreshIntervalId = setInterval(ballMotion, 10)
    window.removeEventListener(`keypress`, startGame)
  }
}
window.addEventListener(`keypress`, startGame)
