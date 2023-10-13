const body = $("body");
const presentation = $("#presentation");
const tools = $("#tools");
const restart = $("#restart");
const nextSlide = $("#nextSlide");
const previousSlide = $("#previousSlide");
const nextChapter = $("#nextChapter");
const previousChapter = $("#previousChapter");
const chapters = $(".chapter");
const chapterSlidesLength = chapters.map(function () {
  return $(this).find("section").length;
}).get();
const titles = $("#titles").children().toArray();
let chapter = 0;
let slides = [];
let fadeTimeout;

function startPresentation() {
  slides = chapterSlidesLength.map(() => 0);
  moveChapter(-chapter);
}

function translatePresentation() {
  presentation.css("transform", `translate(${-slides[chapter] * 100}vw, ${-chapter * 100}vh)`);
}

function moveSlide(delta) {
  slides[chapter] = Math.min(Math.max(slides[chapter] + delta, 0), chapterSlidesLength[chapter] - 1);
  previousSlide.prop("disabled", slides[chapter] === 0);
  nextSlide.prop("disabled", slides[chapter] === chapterSlidesLength[chapter] - 1);
  $(titles[chapter]).find(".position").html(slides[chapter] + 1);
  translatePresentation();
}

function moveChapter(delta) {
  $(titles[chapter]).css("display", "none");
  chapter = Math.min(Math.max(chapter + delta, 0), chapters.length - 1);
  previousChapter.prop("disabled", chapter === 0);
  nextChapter.prop("disabled", chapter === chapters.length - 1);
  $(titles[chapter]).css("display", "inline");
  moveSlide(0);
  translatePresentation();
}

function keyMove(e) {
  const keyFunctions = {
    " ": () => moveSlide(e.shiftKey ? -1 : 1),
    "ArrowRight": () => moveSlide(1),
    "ArrowLeft": () => moveSlide(-1),
    "ArrowDown": () => moveChapter(1),
    "ArrowUp": () => moveChapter(-1)
  };

  const keyFunction = keyFunctions[e.key];
  if (keyFunction) {
    keyFunction();
  }
}


nextSlide.on("click", function () {
  moveSlide(1);
  presentation.animate({ left: "100%" }, 7000); // slide presentation to the left
});

previousSlide.on("click", function () {
  moveSlide(-1);
  presentation.animate({ left: "+=100%" }, 500); // slide presentation to the right
});

nextChapter.on("click", function () {
  moveChapter(1);
  presentation.animate({ top: "-=100%" }, 500); // slide presentation up
});

previousChapter.on("click", function () {
  moveChapter(-1);
  presentation.animate({ top: "+=100%" }, 500); // slide presentation down
});

restart.on("click", () => startPresentation());
body.on("keyup", keyMove);
startPresentation();
