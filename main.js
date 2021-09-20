const startTennis = () => {
  const canvas = document.getElementById('pong-game');
  const ctx = canvas.getContext('2d');

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        movePlayer(1, directions.up);
        break;
      case 'ArrowDown':
        movePlayer(1, directions.down);
        break;
      case 'a':
        movePlayer(2, directions.up);
        break;
      case 'z':
        movePlayer(2, directions.down);
        break;
    }
  });

  const directions = {
    up: 'up',
    right: 'right',
    down: 'down',
    left: 'left',
  };

  const playerDimensions = {
    width: 10,
    height: 60,
  };

  let playerPosition = {
    1: {
      x: canvas.width - playerDimensions.width * 2,
      y: canvas.height / 2 - playerDimensions.height / 2,
    },
    2: {
      x: playerDimensions.width,
      y: canvas.height / 2 - playerDimensions.height / 2,
    },
  };

  const ballDimension = {
    width: 20,
    height: 20,
  };

  let ballPosition = {
    x: canvas.width / 2 - ballDimension.width / 2,
    y: canvas.height / 2 - ballDimension.height / 2,
  };

  let ballDirection = {
    x: directions.right,
    y: directions.down,
  };

  let score = {
    playerOne: 0,
    playerTwo: 0,
  };

  const ballMovePerFrame = 4;

  const tennisGame = () => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPlayers();
    drawBall();
    drawScore();
    moveBall();
  };

  const drawPlayers = () => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(playerPosition[1].x, playerPosition[1].y,
        playerDimensions.width,
        playerDimensions.height);
    ctx.fillRect(playerPosition[2].x, playerPosition[2].y,
        playerDimensions.width,
        playerDimensions.height);
  };

  const drawBall = () => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(ballPosition.x, ballPosition.y, ballDimension.width,
        ballDimension.height);
  };

  const movePlayer = (playerNumber, direction) => {
    playerPosition[playerNumber].y =
        direction === directions.up
            ? playerPosition[playerNumber].y - 20
            : playerPosition[playerNumber].y + 20;
  };

  const moveBall = () => {
    if (ballPosition.x <= 0) {
      scorePoint();
      ballPosition = {
        x: canvas.width / 6 - ballDimension.width / 2,
        y: canvas.height / 2 - ballDimension.height / 2,
      };
      ballDirection.x = directions.right;
    } else if (ballPosition.x >= canvas.width - ballDimension.width) {
      scorePoint();
      ballPosition = {
        x: canvas.width - canvas.width / 6 - ballDimension.width / 2,
        y: canvas.height / 2 - ballDimension.height / 2,
      };
      ballDirection.x = directions.left;
    }

    if (ballPosition.y <= 0) {
      ballDirection.y = directions.down;
    } else if (ballPosition.y >= canvas.height - ballDimension.height) {
      ballDirection.y = directions.up;
    }

    if (ballPosition.x + ballDimension.width >= playerPosition[1].x
        && ballPosition.y + ballDimension.height >= playerPosition[1].y
        && ballPosition.y <= (playerPosition[1].y + playerDimensions.height)) {
      ballDirection.x = directions.left;
    }

    if (ballPosition.x <= playerPosition[2].x + playerDimensions.width
        && ballPosition.y >= playerPosition[2].y
        && ballPosition.y <= (playerPosition[2].y + playerDimensions.height)) {
      ballDirection.x = directions.right;
    }

    ballPosition.x = ballDirection.x === directions.right
        ? ballPosition.x + ballMovePerFrame
        : ballPosition.x - ballMovePerFrame;
    ballPosition.y = ballDirection.y === directions.down
        ? ballPosition.y + ballMovePerFrame
        : ballPosition.y - ballMovePerFrame;
  };

  const drawScore = () => {
    ctx.font = '48px sans-serif';
    ctx.fillText(score.playerTwo, 30, 50);
    ctx.fillText(score.playerOne, canvas.width - 50, 50);
  };

  const scorePoint = () => {
    ballPosition.x <= 0 ? score.playerOne++ : score.playerTwo++;
  };

  setInterval(tennisGame, 1000 / 60);
};
