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

  const ballDimension = {
    width: 20,
    height: 20,
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

  let ballMovePerFrame = {
    x: 4,
    y: 4,
  };

  const frameRate = 1000 / 50;

  const tennisGame = () => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPlayers();
    drawBall();
    moveBall();
    changeBallDirection();
    scoreAndResetBall();
    drawScore();
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

  const scoreAndResetBall = () => {
    if (ballPosition.x <= 0) {
      scorePoint();
      throwInBall(2);
    } else if (ballPosition.x >= canvas.width - ballDimension.width) {
      scorePoint();
      throwInBall(1);
    }
  };

  const scorePoint = () => {
    ballPosition.x <= 0 ? score.playerOne++ : score.playerTwo++;
  };

  const throwInBall = (playerThrows) => {
    if (playerThrows === 1) {
      ballPosition = {
        x: canvas.width - canvas.width / 6 - ballDimension.width / 2,
        y: canvas.height / 2 - ballDimension.height / 2,
      };
      ballDirection.x = directions.left;
    } else {
      ballPosition = {
        x: canvas.width / 6 - ballDimension.width / 2,
        y: canvas.height / 2 - ballDimension.height / 2,
      };
      ballDirection.x = directions.right;
    }
    ballMovePerFrame = {
      x: 4,
      y: 4,
    };
  };

  const changeBallDirection = () => {

    //if the ball reaches top and bottom boundaries
    if (ballPosition.y <= 0) {
      ballDirection.y = directions.down;
    } else if (ballPosition.y >= canvas.height - ballDimension.height) {
      ballDirection.y = directions.up;
    }

    //if the player 1 hits back the ball
    if (ballPosition.x + ballDimension.width >= playerPosition[1].x
        && ballPosition.y - ballDimension.height / 2 >= playerPosition[1].y
        && ballPosition.y + ballDimension.height / 2 <=
        (playerPosition[1].y + playerDimensions.height)) {
      ballDirection.x = directions.left;
      curveBall();
    }

    //if the player 2 hits back the ball
    if (ballPosition.x <= playerPosition[2].x + playerDimensions.width
        && ballPosition.y - ballDimension.height / 2 >= playerPosition[2].y
        && ballPosition.y + ballDimension.height / 2 <=
        (playerPosition[2].y + playerDimensions.height)) {
      ballDirection.x = directions.right;
      curveBall();
    }
  };

  //change reflect angle a bit to bring more fun
  const curveBall = () => {
    const curveDegree = Math.ceil(Math.random() * 5) - 1;
    const positiveOrNegative = Math.random() > 0.5;
    if (positiveOrNegative) {
      ballMovePerFrame.y -= curveDegree;
      ballMovePerFrame.x += curveDegree / 2;
    } else {
      ballMovePerFrame.y += curveDegree;
      ballMovePerFrame.x -= curveDegree / 2;
    }

    if (ballMovePerFrame.y > 6) {
      ballMovePerFrame.y = 6;
    } else if (ballMovePerFrame.y < 1) {
      ballMovePerFrame.y = 1;
    }
  };

  const moveBall = () => {
    ballPosition.x = ballDirection.x === directions.right
        ? ballPosition.x + ballMovePerFrame.x
        : ballPosition.x - ballMovePerFrame.x;
    ballPosition.y = ballDirection.y === directions.down
        ? ballPosition.y + ballMovePerFrame.y
        : ballPosition.y - ballMovePerFrame.y;
  };

  const drawScore = () => {
    ctx.font = '48px sans-serif';
    ctx.fillText(score.playerTwo, 30, 50);
    ctx.fillText(score.playerOne, canvas.width - 50, 50);
  };

  setInterval(tennisGame, frameRate);
};
