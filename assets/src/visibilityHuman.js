export function visibilityHuman() {
  const gallowsParts = document.querySelectorAll(
    ".gallows__head, .gallows__body, .gallows__left_arm, .gallows__right_arm, .gallows__left_leg, .gallows__right_leg",
  );
  gallowsParts.forEach((part) => part.classList.add("visibility"));
}
