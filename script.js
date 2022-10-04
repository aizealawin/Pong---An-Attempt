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

// Basic ball bouncing template - https://medium.com/@danny.jamesbuckley/html-canvas-animation-bouncing-ball-c5c1d16ebe1a

// Set rules to increase speed with each successful collision
const speed = 3
// Create a random starting angle integer
const startingAngle = Math.floor(Math.random() * 361)
// Ball size
const rad = 20

let moveX = Math.cos((Math.PI / 180) * startingAngle) * speed
let moveY = Math.sin((Math.PI / 180) * startingAngle) * speed

const p1Score = document.querySelector(`.p1Score`)
const p2Score = document.querySelector(`.p2Score`)
let whoScored = 0

const runScorePoint = () => {
  if (whoScored === 1) {
    p1Score.innerHTML = parseInt(p1Score.innerHTML) + 1
    whoScored = 0
  } else if (whoScored === 2) {
    p2Score.innerHTML = parseInt(p2Score.innerHTML) + 1
    reset()
    whoScored = 0
  }
  console.log(`hello`)
}

const reset = () => {
  ball.x = 400
  ball.y = 300
}

const ballMotion = () => {
  //x pos, y pos, canvas width, canvas height, defining walls for the ball
  ctx.clearRect(0, 0, 800, 600)
  //If ball at pos x is greater than the canvas width minus ball size OR ball at pos x is less than radius subtract from moveX
  if (ball.x > c.width - rad || ball.x < rad) {
    moveX = -moveX
    // speed += 1
  }
  if (ball.y > c.height - rad || ball.y < rad) {
    moveY = -moveY
    // speed += 1
  }

  ball.x += moveX
  ball.y += moveY
  // speed += 1
  ctx.beginPath()
  ctx.fillStyle = 'black'
  ctx.arc(ball.x, ball.y, rad, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()

  ctx.beginPath()
  ctx.fillStyle = 'blue'
  ctx.rect(paddleOne.x, paddleOne.y, paddleOne.weight, paddleOne.height)
  ctx.fill()
  ctx.closePath()

  ctx.beginPath()
  ctx.fillStyle = 'blue'
  ctx.rect(paddleTwo.x, paddleTwo.y, paddleTwo.weight, paddleTwo.height)
  ctx.fill()
  ctx.closePath()

  if (
    ball.y + rad > paddleOne.y &&
    ball.x > paddleOne.x &&
    ball.x < paddleOne.x + paddleOne.weight
  ) {
    moveY = -moveY
  }
  if (
    ball.y < paddleTwo.y + paddleTwo.height + rad &&
    ball.x > paddleTwo.x &&
    ball.x < paddleTwo.x + paddleTwo.weight
  ) {
    moveY = -moveY
  }

  if (ball.y + rad > paddleOne.y + paddleOne.height) {
    whoScored = 2
    runScorePoint()
    reset()
  }
}

const keyLogger = {
  ArrowLeft: false,
  ArrowRight: false,
  KeyA: false,
  KeyD: false
}

const paddleMotion = () => {
  window.addEventListener(`keydown`, (e) => {
    switch (e.key) {
      case `ArrowLeft`:
        keyLogger.ArrowLeft = true
        paddleOne.x -= 10

        break
      case `ArrowRight`:
        keyLogger.ArrowRight = true
        paddleOne.x += 10
        break
    }
  })
  window.addEventListener(`keydown`, (e) => {
    switch (e.code) {
      case `KeyA`:
        keyLogger.KeyA = true
        paddleTwo.x -= 10
        break
      case `KeyD`:
        keyLogger.KeyD = true
        paddleTwo.x += 10
        break
    }
  })
  window.addEventListener(`keyup`, (e) => {
    switch (e.code) {
      case `KeyA`:
        keyLogger.KeyA = false
      case `KeyD`:
        keyLogger.KeyD = false
        break
      case `ArrowLeft`:
        keyLogger.ArrowLeft = false
        break
      case `ArrowRight`:
        keyLogger.ArrowRight = false
    }
  })
}
paddleMotion()
window.addEventListener('keypress', (e) => {
  if (e.code === `Space`) {
    setInterval(ballMotion, 10)
  }
})

// const paddleOneMotion = () => {}
// paddleOneMotion()
