const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const progressBetween = (value, start, end) => clamp((value - start) / (end - start), 0, 1);
const easeOut = (value) => 1 - Math.pow(1 - value, 3);
const slurpEase = (value) => 1 - Math.pow(1 - value, 5);
const lerp = (start, end, amount) => start + (end - start) * amount;

const videos = document.querySelectorAll("video");

videos.forEach((video) => {
  video.muted = true;
  video.playsInline = true;
  video.addEventListener("loadeddata", () => {
    video.play().catch(() => {});
  });
});

const updateJourney = () => {
  const viewport = window.innerHeight || 1;
  const intro = document.querySelector(".intro-sequence");
  const dataTitle = document.querySelector(".data-title");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  if (scrollIndicator) {
    const maxScroll = Math.max(document.documentElement.scrollHeight - viewport, 1);
    scrollIndicator.style.setProperty("--scroll", (window.scrollY / maxScroll).toFixed(4));
  }

  if (intro) {
    const rect = intro.getBoundingClientRect();
    const progress = clamp((-rect.top) / Math.max(rect.height - viewport, 1), 0, 1);
    intro.style.setProperty("--intro", progress.toFixed(4));

    const miniGrid = intro.querySelector(".mini-grid");
    const artboard = intro.querySelector(".artboard");
    const gridProgress = slurpEase(progressBetween(progress, 0.06, 0.92));

    intro.style.setProperty("--grid", gridProgress.toFixed(4));
    if (miniGrid) miniGrid.style.setProperty("--grid", gridProgress.toFixed(4));

    if (artboard && miniGrid) {
      const artRect = artboard.getBoundingClientRect();
      const gridRect = miniGrid.getBoundingClientRect();
      const gridStyles = getComputedStyle(miniGrid);
      const artWidth = artRect.width;
      const artHeight = artRect.height;
      const gridWidth = miniGrid.offsetWidth;
      const gridHeight = miniGrid.offsetHeight;
      const columnGap = parseFloat(gridStyles.columnGap) || 0;
      const rowGap = parseFloat(gridStyles.rowGap) || 0;
      const inset = Math.max(8, Math.min(window.innerWidth * 0.0075, 14));
      const cellWidth = (gridWidth - columnGap * 2) / 3;
      const cellHeight = (gridHeight - rowGap * 2) / 3;
      const targetLeft = gridRect.left - artRect.left + cellWidth + columnGap;
      const targetTop = gridRect.top - artRect.top + cellHeight + rowGap;
      const settle = easeOut(progressBetween(progress, 0.02, 0.76));

      intro.style.setProperty("--landing-left", `${lerp(inset, targetLeft, settle).toFixed(2)}px`);
      intro.style.setProperty("--landing-top", `${lerp(inset, targetTop, settle).toFixed(2)}px`);
      intro.style.setProperty("--landing-width", `${lerp(artWidth - inset * 2, cellWidth, settle).toFixed(2)}px`);
      intro.style.setProperty("--landing-height", `${lerp(artHeight - inset * 2, cellHeight, settle).toFixed(2)}px`);
      intro.querySelector(".landing-panel")?.classList.toggle("is-docked", settle > 0.92);
    }
  }

  if (dataTitle) {
    const rect = dataTitle.getBoundingClientRect();
    const progress = clamp((-rect.top) / Math.max(rect.height - viewport, 1), 0, 1);
    dataTitle.style.setProperty("--data", easeOut(progress).toFixed(4));
  }
};

updateJourney();
window.addEventListener("scroll", updateJourney, { passive: true });
window.addEventListener("resize", updateJourney);
