let body = document.body;
let presentation = document.getElementById("presentation");
let tools = document.getElementById("tools");
let restart = document.getElementById("restart");
let nextSlide = document.getElementById("nextSlide");
let previousSlide = document.getElementById("previousSlide");
let nextChapter = document.getElementById("nextChapter");
let previousChapter = document.getElementById("previousChapter");
let chapters = Array.from(document.getElementsByClassName("chapter"));
let chapterLengths = chapters.map(c => parseInt(c.style.width.slice(0, -4)));
let titles = document.getElementById("titles").children;
let chapter = 0;
let slides = [];
let t = setTimeout(fadeTools, 2500);

function init() {
	slides = chapterLengths.map((s) => 0);
	moveChapter(- chapter);
}

function translatePresentation() {
	presentation.style.translate = (slides[chapter] * -100).toString() + "vw " + (chapter * -100).toString() + "vh";
}

function moveSlide(a) {
	slides[chapter] = slides[chapter] + a;
	if (slides[chapter] < 0) {
		slides[chapter] = 0
	} else if (slides[chapter] == chapterLengths[chapter]) {
		--slides[chapter];
	}
	if (slides[chapter] == 0) {
		previousSlide.disabled = true;
	} else {
		previousSlide.disabled = false;
	}
	if (slides[chapter] == chapterLengths[chapter] - 1) {
		nextSlide.disabled = true;
	} else {
		nextSlide.disabled = false;
	}
	if (!((slides[chapter] == 0) || (slides[chapter] == chapterLengths[chapter] - 1))) {
		previousSlide.disabled = false;
		nextSlide.disabled = false;
	}
	titles[chapter].getElementsByClassName("position")[0].innerHTML = slides[chapter] + 1;
	translatePresentation();
}

function moveChapter(a) {
	titles[chapter].style.display = "none";
	chapter = chapter + a;
	if (chapter < 0) {
		chapter = 0
	} else if (chapter == chapter.length) {
		--chapter;
	}
	if (chapter == 0) {
		nextChapter.disabled = "";
		previousChapter.disabled = "disabled";
	} else if (chapter == chapters.length - 1) {
		previousChapter.disabled = "";
		nextChapter.disabled = "disabled";
	} else {
		previousChapter.disabled = "";
		nextChapter.disabled = "";
	}
	titles[chapter].style.display = "inline";
	moveSlide(0);
	unFadeTools();
	fadeToolsTimeout();
	translatePresentation();
}

function keyMove(e) {
	switch (e.key) {
		case " ":
			if (e.shiftKey) {
				moveSlide(-1);
			} else {
				moveSlide(1);
			}
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

function fadeToolsTimeout() {
	t = setTimeout(fadeTools, 2500);
}

function fadeTools() {
	tools.style.opacity = 0.05;
}

function unFadeTools(e) {
	clearTimeout(t);
	tools.style.opacity = 1;
}


nextSlide.addEventListener("click", (e) => moveSlide(1));
previousSlide.addEventListener("click", (e) => moveSlide(-1));
nextChapter.addEventListener("click", (e) => moveChapter(1));
previousChapter.addEventListener("click", (e) => moveChapter(-1));
restart.addEventListener("click", (e) => init())
tools.addEventListener("mouseenter", unFadeTools)
tools.addEventListener("mouseleave", fadeToolsTimeout)
body.addEventListener("keyup", keyMove);
init();
