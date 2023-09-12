//your code here
document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("gameContainer");
    const scoreDisplay = document.getElementById("score");
    let snake = [{ row: 20, col: 1 }];
    let food = generateFood();
    let direction = "right";
    let score = 0;
    let gameInterval;

    // Initialize the game grid
    for (let row = 1; row <= 40; row++) {
        for (let col = 1; col <= 40; col++) {
            const pixel = document.createElement("div");
            pixel.className = "pixel";
            pixel.id = `pixel${row}_${col}`;
            gameContainer.appendChild(pixel);
        }
    }

    // Initialize the snake
    function initializeSnake() {
        snake.forEach((pixel) => {
            const snakePixel = document.getElementById(`pixel${pixel.row}_${pixel.col}`);
            snakePixel.classList.add("snakeBodyPixel");
        });
    }

    // Generate random food
    function generateFood() {
        const row = Math.floor(Math.random() * 40) + 1;
        const col = Math.floor(Math.random() * 40) + 1;
        const foodPixel = document.getElementById(`pixel${row}_${col}`);
        if (!foodPixel.classList.contains("snakeBodyPixel")) {
            foodPixel.classList.add("food");
            return { row, col };
        } else {
            return generateFood();
        }
    }

    // Update the score display
    function updateScore() {
        scoreDisplay.textContent = score;
    }

    // Handle key press events to change direction
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" && direction !== "down") direction = "up";
        else if (event.key === "ArrowDown" && direction !== "up") direction = "down";
        else if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
        else if (event.key === "ArrowRight" && direction !== "left") direction = "right";
    });

    // Move the snake
    function moveSnake() {
        let newRow = snake[0].row;
        let newCol = snake[0].col;

        if (direction === "up") newRow--;
        else if (direction === "down") newRow++;
        else if (direction === "left") newCol--;
        else if (direction === "right") newCol++;

        // Check for collision with food
        if (newRow === food.row && newCol === food.col) {
            score++;
            updateScore();
            food = generateFood();
        } else {
            // Remove the tail of the snake
            const tail = snake.pop();
            const tailPixel = document.getElementById(`pixel${tail.row}_${tail.col}`);
            tailPixel.classList.remove("snakeBodyPixel");
        }

        // Check for collision with walls or self
        if (newRow < 1 || newRow > 40 || newCol < 1 || newCol > 40 || isColliding(newRow, newCol)) {
            clearInterval(gameInterval);
            alert("Game Over! Your score is: " + score);
            return;
        }

        // Add the new head of the snake
        snake.unshift({ row: newRow, col: newCol });
        const newHeadPixel = document.getElementById(`pixel${newRow}_${newCol}`);
        newHeadPixel.classList.add("snakeBodyPixel");
    }

    // Check if the snake collides with itself
    function isColliding(row, col) {
        return snake.some((pixel) => pixel.row === row && pixel.col === col);
    }

    // Start the game
    initializeSnake();
    gameInterval = setInterval(moveSnake, 100);
});
