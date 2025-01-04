let dreamPoints = 0;
let realityPoints = 0;
let progressCount = 0;

const story = document.getElementById("story");
const choices = document.querySelectorAll(".choice");
const score = document.getElementById("score");
const progressBar = document.querySelectorAll(".progress-segment");

const specialEvent = document.getElementById("special-event");
const eventTitle = document.getElementById("event-title");
const eventDescription = document.getElementById("event-description");
const eventChoice1 = document.getElementById("event-choice-1");
const eventChoice2 = document.getElementById("event-choice-2");

const ending = document.getElementById("ending");
const endingTitle = document.getElementById("ending-title");
const endingDescription = document.getElementById("ending-description");
const restartGame = document.getElementById("restart-game");


choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.dataset.choice;

        if (userChoice === "dream") {
            dreamPoints += Math.floor(Math.random() * 3 + 1);
            updateStory("You followed the stars, embracing your dreams.");
        } else if (userChoice === "reality") {
            realityPoints += Math.floor(Math.random() * 3 + 1);
            updateStory("You explored the shoreline, grounding yourself in reality.");
        }

        updateProgress();
        updateScore();

        if (progressCount === 2) {
            triggerPlanetEvent("Venus");
        } else if (progressCount === 5) {
            triggerPlanetEvent("Mars");
        }

        if (progressCount === progressBar.length) {
            displayEnding();
        }
    });
});

function updateProgress() {
    if (progressCount < progressBar.length) {
        progressBar[progressCount].classList.add("active");
        if (progressCount > 0) {
            progressBar[progressCount - 1].classList.remove("active");
            progressBar[progressCount - 1].classList.add("completed");
        }
        progressCount++;
    }
}

function updateScore() {
    const harmonyLevel = Math.min(
        ((dreamPoints + realityPoints) / (progressBar.length * 3)) * 100,
        100
    ).toFixed(0);
    score.textContent = `Dream Points: ${dreamPoints} | Reality Points: ${realityPoints} | Harmony Level: ${harmonyLevel}%`;
}

function triggerPlanetEvent(planet) {
    specialEvent.classList.remove("hidden");

    if (planet === "Venus") {
        eventTitle.textContent = "Venus Offers Guidance";
        eventDescription.textContent = 
        "Venus invites you to embrace harmony. Will you follow her advice?";
        eventChoice1.textContent = "Accept Venus' Guidance";
        eventChoice2.textContent = "Decline and Proceed Alone";
        eventChoice1.onclick = () => {
            dreamPoints += 3;
            specialEvent.classList.add("hidden");
            updateScore();
        };
        eventChoice2.onclick = () => {
            realityPoints += 2;
            specialEvent.classList.add("hidden");
            updateProgress();
        };
    } else if (planet === "Mars") {
        eventTitle.textContent = "Mars Challenges You";
        eventDescription.textContent = 
        "Mars demands bold action. Will you take the risk?";
        eventChoice1.textContent = "Take the Risk";
        eventChoice2.textContent = "Play It Safe";
        eventChoice1.onclick = () => {
            dreamPoints += 5;
            specialEvent.classList.add("hidden");
            updateScore();
        };
        eventChoice2.onclick = () => {
            realityPoints += 4;
            specialEvent.classList.add("hidden");
            updateProgress();
        }; 
    }

}


function displayEnding() {
    const harmonyLevel = ((dreamPoints + realityPoints) / (progressBar.length * 3)) * 100;

    ending.classList.remove("hidden");
    if(dreamPoints > realityPoints) {
        endingTitle.textContent = "Lost in Dreams";
        endingDescription.textContent = "You followed your dreams, but reality faded away.";
    } else if (realityPoints > dreamPoints) {
        endingTitle.textContent = "Grounded in Reality";
        endingDescription.textContent =  "You chose stability but missed the magic of dreams.";
    } else {
        endingTitle.textContent = "Harmony Achieved";
        endingDescription.textContent =  "You found the perfect balance between dreams and reality.";
        const specialMessage = document.createElement("p");
        specialMessage.textContent = "Venus and Mars congratulate you for your wisdom!";
        ending.appendChild(specialMessage);
    }
    ending.classList.remove("hidden");

    restartGame.onclick = () => {
     location.reload();
    };
}

function updateStory(message) {
    story.textContent = message;
}

function updateBackground() {
    const ratio = dreamPoints / (dreamPoints + realityPoints || 1);
    const color = ratio > 0.5 ? "#1e90ff" : "#ff6347";
    document.body.style.transition = "background-color 0.5s ease";
    document.body.style.background = color;
}
