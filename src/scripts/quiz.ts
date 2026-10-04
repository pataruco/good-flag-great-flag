import "../styles/main.css";
import { flagClassifications } from "../data/flags.ts";
import type { FlagData } from "../types.ts";

// DOM elements — these are guaranteed to exist in quiz.html
const loadingEl = document.getElementById("quiz-loading") as HTMLElement;
const whereBtn = document.getElementById("where") as HTMLButtonElement;
const flagNameEl = document.getElementById("flag-name") as HTMLElement;
const flagImgEl = document.getElementById("flag-img") as HTMLImageElement;
const quizBtnsEl = document.getElementById("quiz-btns") as HTMLElement;
const badFlagBtn = document.getElementById("bad-flag") as HTMLButtonElement;
const goodFlagBtn = document.getElementById("good-flag") as HTMLButtonElement;
const renderWhereEl = document.getElementById("render-where") as HTMLElement;
const iframeWhereEl = document.getElementById(
	"iframe-where",
) as HTMLIFrameElement;
const renderAnswerEl = document.getElementById("render-answer") as HTMLElement;
const playAgainBtn = document.getElementById("play-again") as HTMLButtonElement;
const scoreEl = document.getElementById("score") as HTMLElement;
const triesEl = document.getElementById("tries") as HTMLElement;
const progressEl = document.getElementById("quiz-progress") as HTMLElement;

// State
let flags: FlagData[] = [];
let roundFlags: FlagData[] = [];
let roundIndex = 0;
let currentFlag: FlagData | null = null;
let score = 0;
let tries = 0;

const ROUND_SIZE = 10;

// Animate helper
function animateCss(el: HTMLElement, animationClass: string): void {
	el.classList.add("animated", animationClass);
	el.addEventListener(
		"animationend",
		() => {
			el.classList.remove("animated", animationClass);
		},
		{ once: true },
	);
}

// Shuffle array (Fisher-Yates) and pick first n
function pickRandom(arr: FlagData[], n: number): FlagData[] {
	const shuffled = [...arr];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled.slice(0, n);
}

function initProgress(): void {
	while (progressEl.firstChild) {
		progressEl.removeChild(progressEl.firstChild);
	}
	for (let i = 0; i < ROUND_SIZE; i++) {
		const dot = document.createElement("span");
		dot.className = "quiz-progress-dot";
		if (i === 0) dot.classList.add("active");
		dot.setAttribute("aria-hidden", "true");
		progressEl.appendChild(dot);
	}
	progressEl.setAttribute("aria-valuenow", "0");
}

function updateProgressDot(index: number, correct: boolean): void {
	const dots = progressEl.querySelectorAll(".quiz-progress-dot");
	if (dots[index]) {
		dots[index].classList.remove("active");
		dots[index].classList.add(correct ? "correct" : "wrong");
	}
	if (index + 1 < ROUND_SIZE && dots[index + 1]) {
		dots[index + 1].classList.add("active");
	}
	progressEl.setAttribute("aria-valuenow", String(index + 1));
}

function startRound(): void {
	roundFlags = pickRandom(flags, ROUND_SIZE);
	roundIndex = 0;
	score = 0;
	tries = 0;
	renderScore();
	renderTries();
	renderAnswerEl.textContent = "";
	playAgainBtn.style.display = "none";
	setButtonsEnabled(true);
	initProgress();
	renderFlag();
}

function setButtonsEnabled(enabled: boolean): void {
	badFlagBtn.disabled = !enabled;
	goodFlagBtn.disabled = !enabled;
}

// Flag SVGs are served by flagcdn.com, keyed by lowercase ISO 3166-1 alpha-2 code.
// (REST Countries used to provide these URLs, but its free API was retired.)
const FLAG_CDN_BASE = "https://flagcdn.com";

function flagSvgUrl(isoCode: string): string {
	return `${FLAG_CDN_BASE}/${isoCode.toLowerCase()}.svg`;
}

// Build the flag list from local data and start the quiz
function loadFlags(): void {
	flags = flagClassifications.map((fc) => ({
		...fc,
		svgUrl: flagSvgUrl(fc.isoCode),
		alt: `Flag of ${fc.name}`,
	}));

	loadingEl.style.display = "none";
	whereBtn.style.display = "";
	flagImgEl.style.display = "";
	quizBtnsEl.style.display = "";
	progressEl.style.display = "";

	startRound();
}

function renderFlag(): void {
	currentFlag = roundFlags[roundIndex];
	flagNameEl.textContent = currentFlag.name;
	animateCss(flagNameEl, "animate-slide-in-down");
	flagImgEl.src = currentFlag.svgUrl;
	flagImgEl.alt = currentFlag.alt;
	animateCss(flagImgEl, "animate-slide-in-right");
}

function updateWhereMap(): void {
	if (!currentFlag) return;
	const mapUrl = `https://www.google.com/maps/embed/v1/search?key=AIzaSyA00nFCVfgsnGqEIEpmO-sjelodI3op1MI&q=${encodeURIComponent(currentFlag.name)}`;
	iframeWhereEl.src = mapUrl;
}

function showWhere(): void {
	updateWhereMap();
	renderWhereEl.showPopover();
}

function hideWhere(): void {
	try {
		renderWhereEl.hidePopover();
	} catch {
		// Already hidden
	}
}

function evaluateFlag(isGood: boolean): void {
	if (!currentFlag) return;
	const correct = currentFlag.goodFlag === isGood;
	if (correct) {
		renderAnswerEl.textContent = "Correct!";
		score++;
	} else {
		renderAnswerEl.textContent = "Wrong!";
	}
	updateProgressDot(tries, correct);
	tries++;
	renderScore();
	renderTries();
	hideWhere();

	if (tries === ROUND_SIZE) {
		renderRoundComplete();
		return;
	}

	roundIndex++;
	renderFlag();
}

function renderScore(): void {
	scoreEl.textContent = String(score);
}

function renderTries(): void {
	triesEl.textContent = String(tries);
}

function renderRoundComplete(): void {
	renderAnswerEl.textContent = `You scored ${score} out of ${tries}.`;
	animateCss(renderAnswerEl, "animate-bounce-in");
	playAgainBtn.style.display = "";
	setButtonsEnabled(false);
}

// Event listeners
whereBtn.addEventListener("click", showWhere);
goodFlagBtn.addEventListener("click", () => evaluateFlag(true));
badFlagBtn.addEventListener("click", () => evaluateFlag(false));
playAgainBtn.addEventListener("click", () => startRound());

// Start
loadFlags();
