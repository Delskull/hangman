export function blockTheButton(button) {
  button.setAttribute("disabled", "");
  button.classList.add("inactiveColor");
}
