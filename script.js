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
      "We are just kidding! This is just for you! - Love, Airdroitechies ";
    messageDiv.style.color = "white";
    sendLoveDiv.innerHTML = '<img src="Images/dance2.gif" alt="Dance 2 GIF">';

    let confettiCount = 0;
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 350,
        spread: 190,
        origin: { y: 0.5 },
      });
      confettiCount++;

      if (confettiCount === 3) {
        clearInterval(confettiInterval);
        setTimeout(() => {
          surpriseLetterDiv.style.display = "block";
          updateCardVisibility();
        }, 1000);
      }
    }, 1000);
  } else {
    sendLoveDiv.innerHTML = '<img src="Images/angry.gif" alt="Angry GIF">';
    moveButtonAway();
  }
}

function updateCardVisibility() {
  cards.forEach((card) => (card.style.display = "none"));
  cards[currentCardIndex].style.display = "block";

  const nextButton = document.getElementById("nextButton");

  if (currentCardIndex === cards.length - 1) {
    nextButton.innerText = "For You";
    nextButton.onclick = showFinalMessage;
  } else {
    nextButton.innerText = "Next";
    nextButton.onclick = viewNextCard;
  }

  document.getElementById("backButton").style.display =
    currentCardIndex > 0 ? "inline-block" : "none";
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

function showFinalMessage() {
  const surpriseLetterDiv = document.getElementById("surprise-letter");
  const finalMessageDiv = document.getElementById("final-message");

  surpriseLetterDiv.style.display = "none";
  finalMessageDiv.innerHTML = `
        <div class="popup">
            <img src="Images/happy_birthday.jpg" alt="Happy Birthday Image" />
            <p>HAPPY BIRTHDAY NINA! WE LOVE YOU!</p>
        </div>
    `;
  finalMessageDiv.style.display = "block";
}

function moveButtonAway() {
  const noButton = document.getElementById("noButton");
  const maxX = window.innerWidth - noButton.offsetWidth;
  const maxY = window.innerHeight - noButton.offsetHeight;

  const maxDistanceFromEdge = 10;
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

  const distanceX = randomX - noButton.offsetLeft;
  const distanceY = randomY - noButton.offsetTop;

  const duration = Math.max(
    0.5,
    Math.min(2, Math.sqrt(distanceX ** 2 + distanceY ** 2) / 100)
  );

  noButton.style.transition = `transform ${duration}s ease-out`;
  noButton.style.transform = `translate(${distanceX}px, ${distanceY}px`;

  setTimeout(() => {
    document.getElementById("sendlove").innerHTML =
      '<img src="Images/dance.gif" alt="Dance GIF">';
  }, duration * 1000);

  noButton.removeEventListener("click", moveButtonAway);
}
