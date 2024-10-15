export function createButton(className, parent) {
  const button = document.createElement("button");
  button.classList.add(className);
  parent.appendChild(button);
  return button;
}
