export function modalWindow() {
  const modalWindow = document.createElement("div");
  modalWindow.classList.add("modal__wrapper");
  modalWindow.classList.add("visibility");
  document.body.appendChild(modalWindow);
  return modalWindow;
}
