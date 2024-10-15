export function addImage(parent, className, src, alt) {
  const img = document.createElement("img");
  img.classList.add(className);
  img.src = src;
  img.alt = alt;
  parent.appendChild(img);
}
