export function createContainer(className, parent) {
  const container = document.createElement("div");
  container.classList.add(className);
  parent.appendChild(container);
  return container;
}
