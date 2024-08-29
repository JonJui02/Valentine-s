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
    sendLoveDiv.innerHTML = '<img src="Images/dance2.gif" alt="Dance 2 GIF">';

    // Trigger confetti three times with a delay
    let confettiCount = 0;
    const confettiInterval = setInterval(() => {
      playConfettiSound(); // Play sound with each confetti pop
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
          messageDiv.style.display = "none";
          updateCardVisibility();
        }, 1000); // Delay to allow the last confetti pop to finish
      }
    }, 1000); // Adjust the time between each confetti pop (in milliseconds)
  } else {
    sendLoveDiv.innerHTML = '<img src="Images/sad.gif" alt="Angry GIF">';
    moveButtonAway();
  }
}

function updateCardVisibility() {
  const messageDiv = document.getElementById("message");
  const backButton = document.querySelector(
    ".button-container button:first-child"
  );
  const nextButton = document.querySelector(
    ".button-container button:last-child"
  );

  messageDiv.style.display = "none";
  cards.forEach((card, index) => {
    card.style.display = "none";
  });

  cards[currentCardIndex].style.display = "block";

  if (currentCardIndex === cards.length - 1) {
    nextButton.innerText = "Finish";
    nextButton.onclick = displayFinalSurprise;
  } else {
    nextButton.innerText = "Next";
    nextButton.onclick = viewNextCard;
  }

  backButton.style.display = currentCardIndex > 0 ? "inline-block" : "none";
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

function displayFinalSurprise() {
  const surpriseLetterDiv = document.getElementById("surprise-letter");
  surpriseLetterDiv.innerHTML = `
    <div>
      <h2>Airdroitech Presents...</h2>
      <iframe id="surprise-video" width="560" height="315" src="https://www.youtube.com/embed/EuciKoS6Hms?autoplay=1&fs=1&enablejsapi=1"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen></iframe>
    </div>
  `;

  // Initial confetti pop when the video starts playing
  playConfettiSound();
  confetti({
    particleCount: 500,
    spread: 200,
    origin: { y: 0.6 },
  });

  // Add an event listener for messages from the iframe
  window.addEventListener("message", function (event) {
    // Ensure the message is coming from the correct origin
    if (event.origin === "https://www.youtube.com") {
      const data = JSON.parse(event.data);

      // Check if the video has ended
      if (data.event === "onStateChange" && data.info === 0) {
        // Video ended, trigger confetti twice
        triggerConfettiTwice();
      }
    }
  });

  // Function to initialize the YouTube player (required for postMessage API)
  function onYouTubeIframeAPIReady() {
    new YT.Player("surprise-video", {
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
  }
}

function triggerConfettiTwice() {
  let confettiCount = 0;
  const confettiInterval = setInterval(() => {
    playConfettiSound(); // Play sound with each confetti pop
    confetti({
      particleCount: 500,
      spread: 200,
      origin: { y: 0.6 },
    });
    confettiCount++;

    if (confettiCount === 2) {
      clearInterval(confettiInterval);
    }
  }, 1000); // Delay between each confetti pop (in milliseconds)
}

// Function to play confetti sound
function playConfettiSound() {
  const audio = new Audio("Images/firework.mp3");

  // Lower the initial volume (e.g., 50% of the original volume)
  audio.volume = 0.35;

  // Play the audio
  audio.play();

  // Duration of the fade-out effect in milliseconds
  const fadeDuration = 1000; // 1 second
  const fadeStep = 0.005; // The amount to decrease the volume each step
  const fadeInterval = fadeDuration / (audio.volume / fadeStep);

  // Function to gradually reduce the volume
  function fadeOutAudio() {
    const fadeIntervalId = setInterval(() => {
      if (audio.volume > fadeStep) {
        audio.volume -= fadeStep; // Decrease the volume
      } else {
        audio.pause(); // Stop the audio
        audio.currentTime = 0; // Reset to the beginning
        clearInterval(fadeIntervalId); // Stop the interval
      }
    }, fadeInterval);
  }

  // Set a timeout to start fading out after the desired play duration
  const playDuration = 2000; // 2 seconds
  setTimeout(fadeOutAudio, playDuration);
}
