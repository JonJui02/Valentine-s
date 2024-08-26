function handleButtonClick(isYes) {
  const questionDiv = document.getElementById("question");
  const buttonsDiv = document.getElementById("buttons");
  const messageDiv = document.getElementById("message");
  const sendLoveDiv = document.getElementById("sendlove");

  if (isYes) {
    questionDiv.style.display = "none";
    buttonsDiv.style.display = "none";

    // Show the text message
    messageDiv.innerText =
      "We are just kidding! Blessed Birthday Nina! Wishing you good health and success! - Love, Airdroitechies ";

    // Optionally, you can replace the existing gifs with 'dance2.gif'
    sendLoveDiv.innerHTML = '<img src="Images/dance2.gif" alt="Dance 2 GIF">';

    // Trigger the confetti animation
    confetti({
      particleCount: 350,
      spread: 190,
      origin: { y: 0.5 },
    });
  } else {
    // Change the gif to 'angry.gif'
    sendLoveDiv.innerHTML = '<img src="Images/angry.gif" alt="Angry GIF">';

    // Optionally, you can hide specific elements or perform other actions
    moveButtonAway();
  }
}

function moveButtonAway() {
  const noButton = document.getElementById("noButton");
  const maxX = window.innerWidth - noButton.offsetWidth;
  const maxY = window.innerHeight - noButton.offsetHeight;

  const maxDistanceFromEdge = 10; // Adjust this value to set the maximum distance from the edges
  const maxDistanceX = maxX - maxDistanceFromEdge;
  const maxDistanceY = maxY - maxDistanceFromEdge;

  const randomX = Math.max(
    maxDistanceFromEdge,
    Math.min(maxDistanceX, Math.random() * maxDistanceX)
  );
  const randomY = Math.max(
    maxDistanceFromEdge,
    Math.min(maxDistanceY, Math.random() * maxDistanceY)
  );

  // Calculate the distance between the current position and the random position
  const distanceX = randomX - noButton.offsetLeft;
  const distanceY = randomY - noButton.offsetTop;

  // Calculate the duration based on the distance, ensuring a minimum duration
  const duration = Math.max(
    0.5,
    Math.min(2, Math.sqrt(distanceX ** 2 + distanceY ** 2) / 100)
  );

  noButton.style.transition = `transform ${duration}s ease-out`; // Use a dynamic duration for gliding
  noButton.style.transform = `translate(${distanceX}px, ${distanceY}px`;

  // Toggle between 'dance.gif' and 'angry.gif' after the gliding animation
  setTimeout(() => {
    sendLoveDiv.innerHTML = '<img src="dance.gif" alt="Dance GIF">';
  }, duration * 1000);

  // Remove the click event listener to prevent multiple glides
  noButton.removeEventListener("click", moveButtonAway);
}
