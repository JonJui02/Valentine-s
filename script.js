let currentCardIndex = 0;
const cards = document.querySelectorAll("#surprise-letter .card");

function handleButtonClick(isYes) {
  const questionDiv = document.getElementById("question");
  const buttonsDiv = document.getElementById("buttons");
  const messageDiv = document.getElementById("message");
  const sendLoveDiv = document.getElementById("sendlove");
  const surpriseLetterDiv = document.getElementById("surprise-letter");

  if (isYes) {
    questionDiv.style.display = "none";
    buttonsDiv.style.display = "none";

    messageDiv.innerText =
      "We are just kidding! Blessed Birthday Nina! This is just for you! - Love, Airdroitechies ";
    messageDiv.style.color = "white";

    sendLoveDiv.innerHTML = '<img src="Images/dance2.gif" alt="Dance 2 GIF">';

    // Trigger confetti three times with a delay
    let confettiCount = 0;
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 350,
        spread: 190,
        origin: { y: 0.5 },
      });
      confettiCount++;

      // After 3 confetti pops, show the surprise letter
      if (confettiCount === 3) {
        clearInterval(confettiInterval);
        setTimeout(() => {
          surpriseLetterDiv.style.display = "block";
          updateCardVisibility();
        }, 1000); // Delay to allow the last confetti pop to finish
      }
    }, 1000); // Adjust the time between each confetti pop (in milliseconds)
  } else {
    sendLoveDiv.innerHTML = '<img src="Images/angry.gif" alt="Angry GIF">';
    moveButtonAway();
  }
}

function updateCardVisibility() {
  cards.forEach((card, index) => {
    card.style.display = "none";
  });

  cards[currentCardIndex].style.display = "block";

  document.getElementById("backButton").style.display =
    currentCardIndex > 0 ? "inline-block" : "none";
  document.getElementById("nextButton").style.display =
    currentCardIndex < cards.length - 1 ? "inline-block" : "none";
}

function viewNextCard() {
  if (currentCardIndex < cards.length - 1) {
    currentCardIndex++;
    updateCardVisibility();
  }
}

function viewPreviousCard() {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    updateCardVisibility();
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
