import { createMainBlock } from "./assets/src/createMainBlock.js";
import { addImage } from "./assets/src/addImage.js";
import { addText } from "./assets/src/addText.js";
import { createContainer } from "./assets/src/createContainer.js";
import { words, hints } from "./assets/src/dictionary.js";
import { createButton } from "./assets/src/createButton.js";
import { keyboard } from "./assets/src/keybord.js";
import { modalWindow } from "./assets/src/ModalWindow.js";
import {
  russianKeyboardMap,
  englishToRussianMap,
} from "./assets/src/russianLetters.js";
import { blockTheButton } from "./assets/src/blockTheButton.js";
import { visibilityHuman } from "./assets/src/visibilityHuman.js";
import { removeblockButtons } from "./assets/src/removeBlockButtons.js";

// Создание основного блока и его контейнеров
const mainBlock = createMainBlock();
const leftContainer = createContainer("mainBlock__left", mainBlock);
const rightContainer = createContainer("mainBlock__right", mainBlock);
// модалка
const modalWrapper = modalWindow();
const modal = createContainer("modal__window", modalWrapper);
const modalText = createContainer("modal__text", modal);
const modalSubText = createContainer("modal__subText", modal);
const buttonAgain = createButton("modal__tryAgain-btn", modal);

// Создание элементов в левом контейнере
const leftGallows = createContainer("mainBlock__left-gallows", leftContainer);
const leftGameName = createContainer("mainBlock__left-gameName", leftContainer);

// Создание элементов в правом контейнере
const rightArray = createContainer("mainBlock__right-array", rightContainer);
const rightHints = createContainer("mainBlock__right-hints", rightContainer);
const rightGuess = createContainer("mainBlock__right-guess", rightContainer);
export const rightLetters = createContainer(
  "mainBlock__right-letters",
  rightContainer,
);

// Вставка изображения и текста в соответствующие элементы
addImage(
  leftGallows,
  "mainBlock__left-gallows_img",
  "./assets/img/gallows.jpg",
  "gallows",
);
addImage(leftGallows, "gallows__head", "./assets/img/head.jpg", "head");
addImage(leftGallows, "gallows__body", "./assets/img/body.jpg", "body");
addImage(
  leftGallows,
  "gallows__left_arm",
  "./assets/img/hand-one.jpg",
  "leftHand",
);
addImage(
  leftGallows,
  "gallows__right_arm",
  "./assets/img/hand-two.jpg",
  "rightHand",
);
addImage(
  leftGallows,
  "gallows__left_leg",
  "./assets/img/leg-one.jpg",
  "leftLeg",
);
addImage(
  leftGallows,
  "gallows__right_leg",
  "./assets/img/leg-two.jpg",
  "rightLeg",
);
addText(leftGameName, "Виселица");

// пишем логику
const modalInvisible = document.querySelector(".modal__wrapper");
const button = document.querySelector(".modal__tryAgain-btn");
let guessWord = [];
let word = words[Math.floor(Math.random() * words.length)];
console.log(word);
let answerSpace = new Array(word.length).fill("_");
let remainLettersStart = 0;
addText(rightArray, answerSpace.join(" "));
addText(rightHints, `Подсказка: ${hints[words.indexOf(word)]}`);
addText(rightGuess, `Неверные попытки: ${remainLettersStart} / 6`);

keyboard();

// события клавиатуры
// ввод мышкой
const showModalWindow = document.querySelector(".visibility");
const keys = document.querySelectorAll(".mainBlock__right-letters_key");
keys.forEach((key) => {
  key.addEventListener("click", function () {
    checkSameLetter(key);
    blockTheButton(key);
  });
});

function checkSameLetter(key) {
  let letters = word.toUpperCase().split("");
  let matchFound = false;
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === key.dataset.letter) {
      answerSpace[i] = key.dataset.letter;
      guessWord.push(key.dataset.letter);
      matchFound = true;
    }
  }
  if (matchFound) {
    addText(rightArray, answerSpace.join(" "));
  } else {
    remainLettersStart++;
    addText(rightGuess, `Неверные попытки: ${remainLettersStart} / 6`);
    showHumanParts();
  }
  loseGame();
  congratulation();
}
function loseGame() {
  if (remainLettersStart === 6) {
    showModalWindow.classList.remove("visibility");
    addText(modalText, "Ты проиграл");
    addText(modalSubText, `Правильное слово:  ${word}`);
    buttonAgain.textContent = "Еще раз";
    console.log("ТЫ ПРОСРАЛ");
  }
}
const congratulation = () => {
  if (answerSpace.length === guessWord.length) {
    showModalWindow.classList.remove("visibility");
    addText(modalText, "Ты победил");
    addText(modalSubText, `Правильное слово:  ${word}`);
    buttonAgain.textContent = "Еще раз";
    console.log("ТЫ ПОБЕДИЛ");
  }
};
// нажатие на физической клвве
let buttonMap = {};
let pressedKeys = {};
keys.forEach((key) => {
  buttonMap[key.dataset.letter] = key;
});

window.addEventListener("keydown", (event) => {
  const key = event.key;
  const isCapsLockOn = event.getModifierState("CapsLock");
  let russianKey;

  if (englishToRussianMap[key]) {
    russianKey = englishToRussianMap[key];
  } else {
    russianKey =
      russianKeyboardMap[isCapsLockOn ? key.toUpperCase() : key.toLowerCase()];
  }

  if (russianKey && !pressedKeys[russianKey]) {
    pressedKeys[russianKey] = true;
    const button = buttonMap[russianKey];
    if (button) {
      blockTheButton(button);
    }
    let letters = word.toUpperCase().split("");
    let matchFound = false;
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] === russianKey) {
        answerSpace[i] = russianKey;
        guessWord.push(russianKey);
        matchFound = true;
      }
    }
    if (matchFound) {
      addText(rightArray, answerSpace.join(" "));
    } else {
      remainLettersStart++;
      addText(rightGuess, `Неверные попытки: ${remainLettersStart} / 6`);
      showHumanParts();
    }
    loseGame();
    congratulation();
  }
});
visibilityHuman();
let humanParts = [
  { element: document.querySelector(".gallows__head"), index: 1 },
  { element: document.querySelector(".gallows__body"), index: 2 },
  { element: document.querySelector(".gallows__left_arm"), index: 3 },
  { element: document.querySelector(".gallows__right_arm"), index: 4 },
  { element: document.querySelector(".gallows__left_leg"), index: 5 },
  { element: document.querySelector(".gallows__right_leg"), index: 6 },
];

let showHumanParts = () => {
  if (remainLettersStart === 0) {
    visibilityHuman();
  } else {
    humanParts.forEach((part) => {
      if (remainLettersStart === part.index) {
        part.element.classList.toggle("visibility");
      }
    });
  }
};
// сброс игры
function restartGame() {
  button.addEventListener("click", function () {
    visibilityHuman();
    modalInvisible.classList.toggle("visibility");
    word = words[Math.floor(Math.random() * words.length)];
    guessWord = [];
    answerSpace = new Array(word.length).fill("_");
    remainLettersStart = 0;
    addText(rightArray, answerSpace.join(" "));
    addText(rightHints, `Подсказка: ${hints[words.indexOf(word)]}`);
    addText(rightGuess, `Неверные попытки: ${remainLettersStart} / 6`);
    console.log(word);
    buttonMap = {};
    pressedKeys = {};
    const keys = document.querySelectorAll(".mainBlock__right-letters_key");
    keys.forEach((key) => {
      removeblockButtons(key);
    });
  });
}
restartGame();
