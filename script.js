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
  { story: "Stage 1: You meet someone who feels like your destiny. But soon, he drifts away.", choices: ["Chase him", "Let him go"], dream: 1, reality: 2, backgroundColor: "#1e293b" },
  { story: "Stage 2: The Moon asks, 'What is it you truly desire?'", choices: ["Follow emotions", "Seek stability"], dream: 1, reality: 2, backgroundColor: "#2b3945" },
  { story: "Stage 3: Financial struggles hit hard. Your dreams feel out of reach.", choices: ["Work harder", "Rely on others"], dream: 1, reality: 2, backgroundColor: "#3d4a5d" },
  { story: "Stage 4: Neptune tempts you to escape reality. Do you accept?", choices: ["Embrace the dream", "Ground yourself"], dream: 1, reality: 2, backgroundColor: "#4a5568" },
  { story: "Stage 5: A storm brews. Do you press on?", choices: ["Seek shelter", "Face the storm"], dream: 2, reality: 1, backgroundColor: "#2a4365" },
  { story: "Stage 6: You face betrayal from a close ally.", choices: ["Confront them", "Forgive and move on"], dream: 2, reality: 1, backgroundColor: "#1e293b" },
  { story: "Stage 7: The Moon offers guidance. Do you trust it?", choices: ["Yes", "No"], dream: 1, reality: 2, backgroundColor: "#2b3945" },
  { story: "Stage 8: A fleeting glimpse of your lost love reignites your hope.", choices: ["Chase him", "Let it go"], dream: 1, reality: 2, backgroundColor: "#3d4a5d" },
  { story: "Stage 9: Your inner self questions your purpose.", choices: ["Reaffirm your goals", "Reconsider everything"], dream: 1, reality: 2, backgroundColor: "#4a5568" },
  { story: "Stage 10: You find a key to your destiny.", choices: ["Use it", "Discard it"], dream: 1, reality: 2, backgroundColor: "#2a4365" },
  { story: "Stage 11: The final choice awaits. Will you pray for guidance or trust yourself?", choices: ["Pray", "Trust yourself"], dream: 0, reality: 0, backgroundColor: "#1e293b" },
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
    // 夢に偏ったエンディング
    endingTitle.textContent = "Lost in Dreams";
    endingDescription.innerHTML = `
      You chased your dreams relentlessly, diving deeper into the infinite cosmos.<br><br>
      Yet, the ties to reality have faded, leaving you among the stars alone.
    `;
    document.body.classList.add("lost-in-dreams");
  } else if (realityPoints > dreamPoints) {
    // 現実に偏ったエンディング
    endingTitle.textContent = "Grounded in Reality";
    endingDescription.innerHTML = `
      You chose stability, building a life rooted in the tangible world.<br><br>
      But the stars that once guided you became distant whispers.
    `;
    document.body.classList.add("grounded-in-reality");
  } else {
    // ハーモニーのエンディング
    endingTitle.textContent = "Harmony Achieved";
    endingDescription.innerHTML = `
      After countless trials, you have found your path.<br><br>
      The love you thought was lost returns, and together you create a beautiful family.<br><br>
      Your dreams and reality now coexist in perfect harmony.<br><br>
      May your journey continue to be filled with love, hope, and balance.
    `;
    document.body.classList.add("harmony-achieved");
  }
}

choicesContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("choice")) return;

  const selectedChoice = e.target.dataset.choice;

  // 最終ステージではポイントを加算しない
  if (currentStage < 10) {
    if (selectedChoice === "1") dreamPoints += stages[currentStage].dream;
    if (selectedChoice === "2") realityPoints += stages[currentStage].reality;
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

// 初期ステージをセット
updateStage(0);