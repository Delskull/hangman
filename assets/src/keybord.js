import { createButton } from "./createButton.js";
import { rightLetters } from "../../index.js";

export function keyboard() {
  const letters = [
    "Й",
    "Ц",
    "У",
    "К",
    "Е",
    "Н",
    "Г",
    "Ш",
    "Щ",
    "З",
    "Х",
    "Ъ",
    "Ф",
    "Ы",
    "В",
    "А",
    "П",
    "Р",
    "О",
    "Л",
    "Д",
    "Ж",
    "Э",
    "Я",
    "Ч",
    "С",
    "М",
    "И",
    "Т",
    "Ь",
    "Б",
    "Ю",
  ];
  let container = [
    { className: "mainBlock__right-letters_top", count: 12 },
    { className: "mainBlock__right-letters_center", count: 11 },
    { className: "mainBlock__right-letters_bottom", count: 9 },
  ];
  let letterIndex = 0;
  container.forEach((item) => {
    const div = document.createElement("div");
    div.className = item.className;
    for (let i = 0; i <= item.count - 1; i++) {
      const letter = letters[letterIndex];
      const button = createButton(`mainBlock__right-letters_key`, rightLetters);
      button.textContent = letter;
      button.dataset.letter = letter;
      div.appendChild(button);
      letterIndex++;
    }
    rightLetters.appendChild(div);
  });
}
