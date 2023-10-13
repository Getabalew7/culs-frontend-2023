const body = document.body;
const presentation = document.getElementById("presentation");
const tools = document.getElementById("tools");
const restart = document.getElementById("restart");
const nextSlide = document.getElementById("nextSlide");
const previousSlide = document.getElementById("previousSlide");
const nextChapter = document.getElementById("nextChapter");
const previousChapter = document.getElementById("previousChapter");
const chapters = Array.from(document.getElementsByClassName("chapter"));
const chapterLengths = chapters.map(c => parseInt(c.style.width.slice(0, -4)));
const titles = Array.from(document.getElementById("titles").children);
let chapter = 0;
let slides = [];
let fadeTimeout;

function init() {
  slides = chapterLengths.map(() => 0);
  moveChapter(-chapter);
}

function translatePresentation() {
  presentation.style.transform = `translate(${-slides[chapter] * 100}vw, ${-chapter * 100}vh)`;
}

function moveSlide(delta) {
  slides[chapter] = Math.min(Math.max(slides[chapter] + delta, 0), chapterLengths[chapter] - 1);
  previousSlide.disabled = slides[chapter] === 0;
  nextSlide.disabled = slides[chapter] === chapterLengths[chapter] - 1;
  titles[chapter].getElementsByClassName("position")[0].innerHTML = slides[chapter] + 1;
  translatePresentation();
  resetFadeTimeout();
}

function moveChapter(delta) {
  titles[chapter].style.display = "none";
  chapter = Math.min(Math.max(chapter + delta, 0), chapters.length - 1);
  previousChapter.disabled = chapter === 0;
  nextChapter.disabled = chapter === chapters.length - 1;
  titles[chapter].style.display = "inline";
  moveSlide(0);
  unFadeTools();
  resetFadeTimeout();
  translatePresentation();
}

function keyMove(e) {console.log(e.key);
  switch (e.key) {
    case " ":
      moveSlide(e.shiftKey ? -1 : 1);
      break;
    case "ArrowRight":
      moveSlide(1);
      break;
    case "ArrowLeft":
      moveSlide(-1);
      break;
    case "ArrowDown":
      moveChapter(1);
      break;
    case "ArrowUp":
      moveChapter(-1);
      break;
  }
}

function resetFadeTimeout() {
  clearTimeout(fadeTimeout);
  fadeTimeout = setTimeout(fadeTools, 2500);
}

function fadeTools() {
  tools.style.opacity = 0.05;
}

function unFadeTools() {
  clearTimeout(fadeTimeout);
  tools.style.opacity = 1;
}

nextSlide.addEventListener("click", () => moveSlide(1));
previousSlide.addEventListener("click", () => moveSlide(-1));
nextChapter.addEventListener("click", () => moveChapter(1));
previousChapter.addEventListener("click", () => moveChapter(-1));
restart.addEventListener("click", () => init());
tools.addEventListener("mouseenter", unFadeTools);
tools.addEventListener("mouseleave", resetFadeTimeout);
body.addEventListener("keyup", keyMove);
init();
