export function createMainBlock() {
  const mainBlock = document.createElement("main");
  mainBlock.classList.add("mainBlock");
  document.body.appendChild(mainBlock);
  return mainBlock;
}
