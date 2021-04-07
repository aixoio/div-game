const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 180;
canvas.height = 165;
context.scale(15, 15);
const offset = 0;
var level = 0;
var score = 0;
var win = false;
const backgroundColors = {
  root: "#ffffff",
  wall: "#000000",
  player: "#4263ff",
  end: "#00ff00",
  bad: "#ff0000",
  score: {
    text: "#00ffff",
    item: "#ffaa00"
  }
};
var game = levelGame;
var cGame = lGame;
cGame.forEach(row => {
  Object.freeze(row);
  row.forEach(collem => {
    Object.freeze(collem);
  });
});
/* Key
  9 = wall
  0 = nothing
  5 = player
  4 = end
  3 = bad
  8 = score
*/
document.addEventListener("keydown", function (event) {
  if (!win) {
    switch (event.keyCode) {
      case 38: // up
        movePlayerUpBy(1);
        break;
      case 40: // down
        movePlayerDownBy(1);
        break;
      case 37: // left
        movePlayerLeftBy(1);
        break;
      case 39:
        movePlayerRightBy(1);
        break;
    }
  }
});
function draw(display) {
  display.forEach((row, y) => {
    row.forEach((value, x) => {
      switch (value) {
        case 9:
          context.fillStyle = backgroundColors.wall;
          context.fillRect(x, y, 1, 1);
          break;
        case 5:
          context.fillStyle = backgroundColors.player;
          context.fillRect(x, y, 1, 1);
          break;
        case 4:
          context.fillStyle = backgroundColors.end;
          context.fillRect(x, y, 1, 1);
          break;
        case 3:
          context.fillStyle = backgroundColors.bad;
          context.fillRect(x, y, 1, 1);
          break;
        case 0:
          context.fillStyle = backgroundColors.root;
          context.fillRect(x, y, 1, 1);
          break;
        case 8:
          context.fillStyle = backgroundColors.score.item;
          context.fillRect(x, y, 1, 1);
          break;
        default:
          throw new Error("Unknown tile at x:" + x + " y:" + y);
      }
    });
  });
}
function movePlayerUpBy(tiles) {
  let playerXY = getPlayerXY(game[level]);
  let x = playerXY.x;
  let y = playerXY.y;
  let yy = (playerXY.y - tiles);
  if (game[level][yy][x] !== 9) {
    game[level][y][x] = 0;
    game[level][yy][x] = 5;
    return;
  } else {
    return;
  }
}
function movePlayerDownBy(tiles) {
  let playerXY = getPlayerXY(game[level]);
  let x = playerXY.x;
  let y = playerXY.y;
  let yy = (playerXY.y + tiles);
  if (game[level][yy][x] !== 9) {
    game[level][y][x] = 0;
    game[level][yy][x] = 5;
    return;
  } else {
    return;
  }
}
function movePlayerLeftBy(tiles) {
  let playerXY = getPlayerXY(game[level]);
  let x = playerXY.x;
  let xx = (playerXY.x - tiles);
  let y = playerXY.y;
  if (game[level][y][xx] !== 9) {
    game[level][y][x] = 0;
    game[level][y][xx] = 5;
    return;
  } else {
    return;
  }
}
function movePlayerRightBy(tiles) {
  let playerXY = getPlayerXY(game[level]);
  let x = playerXY.x;
  let xx = (playerXY.x + tiles);
  let y = playerXY.y;
  if (game[level][y][xx] !== 9) {
    game[level][y][x] = 0;
    game[level][y][xx] = 5;
    return;
  } else {
    return;
  }
}
function getPlayerXY(display) {
  let playerX;
  let playerY;
  display.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value == 5) {
        playerX = x;
        playerY = y;
      }
    });
  });
  return {
    x: playerX,
    y: playerY
  };
}
function drawWin() {
  context.fillStyle = backgroundColors.wall;
  context.fillRect(0, 0, canvas.width, canvas.height);
}
function handleCollisions(display, cdisplay) {
  const player = getPlayerXY(display);
  const oldDx = cdisplay[player.y][player.x];
  const newDx = display[player.y][player.x];
  if (oldDx == 3) {
    const play = getPlayerXY(cdisplay);
    display[player.y][player.x] = 3;
    display[play.y][play.x] = 5;
  } else if (oldDx == 8) {
    const play = getPlayerXY(cdisplay);
    let added = false;
    if (!added) {
      added = true;
      score += 1;
    }
  } else if (oldDx == 4) {
    if (level == maxLevel) {
      win = true;
      drawWin();
      cancelAnimationFrame(update);
    } else {
      level += 1;
    }
  }
}
function update() {
  if (!win) {
    draw(game[level]);
  }
  if (win) {
    drawWin();
  }
  handleCollisions(game[level], cGame[level]);
  requestAnimationFrame(update);
}
update();
