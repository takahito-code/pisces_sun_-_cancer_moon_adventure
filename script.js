let currentStage = 0;
let dreamPoints = 0;
let realityPoints = 0;

const storyElement = document.getElementById("story");
const choicesContainer = document.getElementById("choices");
const progressSegments = document.querySelectorAll(".progress-segment");
const endingContainer = document.getElementById("ending");
const endingTitle = document.getElementById("ending-title");
const endingDescription = document.getElementById("ending-description");
const restartButton = document.getElementById("restart-game");

const stages = [
  { story: "Stage 1: You meet someone who feels like your destiny. But soon, he drifts away.", choices: ["Chase him", "Let him go"], backgroundColor: "#1e293b" },
  { story: "Stage 2: The Moon asks, 'What is it you truly desire?'", choices: ["Follow emotions", "Seek stability"], backgroundColor: "#2b3945" },
  { story: "Stage 3: Financial struggles hit hard. Your dreams feel out of reach.", choices: ["Work harder", "Rely on others"], backgroundColor: "#3d4a5d" },
  { story: "Stage 4: Neptune tempts you to escape reality. Do you accept?", choices: ["Embrace the dream", "Ground yourself"], backgroundColor: "#4a5568" },
  { story: "Stage 5: A storm brews. Do you press on?", choices: ["Seek shelter", "Face the storm"], backgroundColor: "#2a4365" },
  { story: "Stage 6: You face betrayal from a close ally.", choices: ["Confront them", "Forgive and move on"], backgroundColor: "#1e293b" },
  { story: "Stage 7: The Moon offers guidance. Do you trust it?", choices: ["Yes", "No"], backgroundColor: "#2b3945" },
  { story: "Stage 8: A fleeting glimpse of your lost love reignites your hope.", choices: ["Chase him", "Let it go"], backgroundColor: "#3d4a5d" },
  { story: "Stage 9: Your inner self questions your purpose.", choices: ["Reaffirm your goals", "Reconsider everything"], backgroundColor: "#4a5568" },
  { story: "Stage 10: You find a key to your destiny.", choices: ["Use it", "Discard it"], backgroundColor: "#2a4365" },
  { story: "Stage 11: The final choice awaits. Will you pray for guidance or trust yourself?", choices: ["Pray", "Trust yourself"], backgroundColor: "#1e293b" },
];

function updateStage(stageIndex) {
  if (stageIndex >= stages.length) {
    displayEnding();
    return;
  }

  const currentStageData = stages[stageIndex];
  storyElement.textContent = currentStageData.story;
  document.body.style.backgroundColor = currentStageData.backgroundColor;

  choicesContainer.classList.remove("hidden");
  const buttons = choicesContainer.querySelectorAll("button");
  buttons[0].textContent = currentStageData.choices[0];
  buttons[1].textContent = currentStageData.choices[1];
}

function displayEnding() {
  choicesContainer.classList.add("hidden");
  endingContainer.classList.remove("hidden");

  if (dreamPoints > realityPoints) {
    endingTitle.textContent = "Lost in Dreams";
    endingDescription.innerHTML = `
      You chased your dreams relentlessly, diving deeper into the infinite cosmos.<br><br>
      Yet, the ties to reality have faded, leaving you among the stars alone.
    `;
    document.body.classList.add("lost-in-dreams");
  } else if (realityPoints > dreamPoints) {
    endingTitle.textContent = "Grounded in Reality";
    endingDescription.innerHTML = `
      You built a stable life, but lost the magic of your dreams.<br><br>
      Stability is yours, but the stars seem far away.
    `;
    document.body.classList.add("grounded-in-reality");
  } else {
    endingTitle.textContent = "Harmony Achieved";
    endingDescription.innerHTML = `
      You have found balance between dreams and reality.<br><br>
      The love you thought lost has returned, and your life is now in perfect harmony.
    `;
    document.body.classList.add("harmony-achieved");
  }
}

choicesContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("choice")) return;

  const selectedChoice = e.target.dataset.choice;
  if (currentStage < 10) {
    if (selectedChoice === "1") dreamPoints += Math.floor(Math.random() * 3 + 1);
    if (selectedChoice === "2") realityPoints += Math.floor(Math.random() * 2 + 1);
  }

  progressSegments[currentStage].classList.add("completed");
  currentStage++;
  updateStage(currentStage);
});

restartButton.addEventListener("click", () => {
  currentStage = 0;
  dreamPoints = 0;
  realityPoints = 0;
  endingContainer.classList.add("hidden");
  progressSegments.forEach((segment) => segment.classList.remove("completed"));
  updateStage(0);
});

updateStage(0);