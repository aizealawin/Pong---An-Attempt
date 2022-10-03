const c = document.getElementById(`canvas`)
const ctx = c.getContext(`2d`)
const ball = {
  x: 25,
  y: 25
}

// Set rules to increase speed with each successful collision
const speed = 3
// Create a random starting angle integer
const startingAngle = 20
// Ball size
const rad = 20

let moveX = Math.cos((Math.PI / 180) * startingAngle) * speed
let moveY = Math.sin((Math.PI / 180) * startingAngle) * speed
const drawMe = () => {
  //x pos, y pos, canvas width, canvas height
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
}
setInterval(drawMe, 10)
