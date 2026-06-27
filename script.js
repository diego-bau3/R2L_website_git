const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const progressBetween = (value, start, end) => clamp((value - start) / (end - start), 0, 1);
const easeOut = (value) => 1 - Math.pow(1 - value, 3);
const slurpEase = (value) => 1 - Math.pow(1 - value, 5);
const lerp = (start, end, amount) => start + (end - start) * amount;

const videoManifest = {
  wall: [
    "assets/videos/wall-videos/simulator-01.mp4",
    "assets/videos/wall-videos/wall-01.mp4",
    "assets/videos/wall-videos/wall-02.mp4",
    "assets/videos/wall-videos/wall-03.mp4",
    "assets/videos/wall-videos/wall-04.mp4",
    "assets/videos/wall-videos/wall-06.mp4",
    "assets/videos/wall-videos/wall-07.mp4",
    "assets/videos/wall-videos/wall-08.mp4",
    "assets/videos/wall-videos/wall-09.mp4",
    "assets/videos/wall-videos/wall-10.mp4",
    "assets/videos/wall-videos/wall-11.mp4",
    "assets/videos/wall-videos/wall-12.mp4",
    "assets/videos/wall-videos/wall-13.mp4",
    "assets/videos/wall-videos/x_20260514_202251.mp4",
    "assets/videos/wall-videos/x_20260514_202811.mp4",
    "assets/videos/wall-videos/x_20260514_225803.mp4",
    "assets/videos/wall-videos/x_20260514_230009.mp4",
    "assets/videos/wall-videos/x_20260517_232317.mp4",
    "assets/videos/wall-videos/x_20260517_232433.mp4",
    "assets/videos/wall-videos/x_20260517_232828.mp4",
    "assets/videos/wall-videos/x_20260517_234012.mp4",
    "assets/videos/wall-videos/x_20260617_142331.mp4",
    "assets/videos/wall-videos/x_20260617_144418.mp4",
    "assets/videos/wall-videos/x_20260617_144717.mp4",
    "assets/videos/wall-videos/x_20260617_145317.mp4",
    "assets/videos/wall-videos/x_20260617_145603.mp4",
    "assets/videos/wall-videos/x_20260617_164847.mp4",
    "assets/videos/wall-videos/x_20260617_204852.mp4",
    "assets/videos/wall-videos/x_20260617_212645.mp4",
    "assets/videos/wall-videos/x_20260617_220044.mp4",
    "assets/videos/wall-videos/x_20260617_220620.mp4",
    "assets/videos/wall-videos/x_20260617_220925.mp4",
    "assets/videos/wall-videos/x_20260617_221300.mp4",
    "assets/videos/wall-videos/x_20260618_001727.mp4",
  ],
  egocentricData: [
    "assets/videos/egocentric-data/simulator-01.mp4",
    "assets/videos/egocentric-data/x_20260514_202251.mp4",
    "assets/videos/egocentric-data/x_20260514_202811.mp4",
    "assets/videos/egocentric-data/x_20260514_225803.mp4",
    "assets/videos/egocentric-data/x_20260514_230009.mp4",
    "assets/videos/egocentric-data/x_20260517_232317.mp4",
    "assets/videos/egocentric-data/x_20260517_232433.mp4",
    "assets/videos/egocentric-data/x_20260517_232828.mp4",
    "assets/videos/egocentric-data/x_20260517_234012.mp4",
    "assets/videos/egocentric-data/x_20260617_142331.mp4",
    "assets/videos/egocentric-data/x_20260617_144418.mp4",
    "assets/videos/egocentric-data/x_20260617_144717.mp4",
    "assets/videos/egocentric-data/x_20260617_145317.mp4",
    "assets/videos/egocentric-data/x_20260617_145603.mp4",
    "assets/videos/egocentric-data/x_20260617_164847.mp4",
    "assets/videos/egocentric-data/x_20260617_204852.mp4",
    "assets/videos/egocentric-data/x_20260617_212645.mp4",
    "assets/videos/egocentric-data/x_20260617_220044.mp4",
    "assets/videos/egocentric-data/x_20260617_220620.mp4",
    "assets/videos/egocentric-data/x_20260617_220925.mp4",
    "assets/videos/egocentric-data/x_20260617_221300.mp4",
    "assets/videos/egocentric-data/x_20260618_001727.mp4",
  ],
  leaderFollower: [
    "assets/videos/leader-follower/egocentric-data-01.mp4",
    "assets/videos/leader-follower/landing-01.mp4",
    "assets/videos/leader-follower/leader-follower-01.mp4",
    "assets/videos/leader-follower/remote-control-01.mp4",
  ],
  remoteControl: [
    "assets/videos/remote-control/WhatsApp Video 2026-06-13 at 15.25.18.mp4",
  ],
  simulator: [
    "assets/videos/simulator/x_20260514_230009.mp4",
  ],
};

const wallDuration = 6000;
const methodDuration = 6000;

const videos = document.querySelectorAll("video");
const methodSections = document.querySelectorAll(".method");

videos.forEach((video) => {
  video.muted = true;
  video.playsInline = true;
  video.addEventListener("loadeddata", () => {
    video.play().catch(() => {});
  });
});

const methodObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.34, rootMargin: "0px 0px -12% 0px" }
);

methodSections.forEach((section) => methodObserver.observe(section));

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

const shuffle = (items) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
};

const createPlaylist = (sources) => {
  let queue = [];
  let lastSource = "";

  return () => {
    if (!queue.length) {
      queue = shuffle(sources);
      if (queue.length > 1 && queue[0] === lastSource) {
        [queue[0], queue[1]] = [queue[1], queue[0]];
      }
    }

    lastSource = queue.shift();
    return lastSource;
  };
};

const setRandomStart = (video) => {
  if (!Number.isFinite(video.duration) || video.duration <= 1.5) return;
  video.currentTime = Math.random() * Math.max(video.duration - 0.8, 0);
};

const swapVideo = (video, source, { randomStart = false } = {}) => {
  if (!source) return;
  video.style.setProperty("--slot-fade", "0");

  window.setTimeout(() => {
    const currentSource = decodeURI(video.currentSrc || "");
    const isSameSource = currentSource.endsWith(source) || video.getAttribute("src") === source;
    const reveal = () => {
      if (randomStart) setRandomStart(video);
      video.play().catch(() => {});
      video.style.setProperty("--slot-fade", "1");
    };

    if (isSameSource) {
      video.currentTime = 0;
      reveal();
      return;
    }

    video.addEventListener("loadedmetadata", reveal, { once: true });
    video.src = source;
    video.load();

    if (video.readyState >= 1) {
      reveal();
    }
  }, 160);
};

const startWallVideoRotation = () => {
  const wallVideos = document.querySelectorAll(".mini-grid video");
  if (!videoManifest.wall.length) return;

  wallVideos.forEach((video, index) => {
    const rotate = () => {
      const choices = videoManifest.wall.filter((source) => !video.currentSrc.endsWith(source));
      const nextSource = randomItem(choices.length ? choices : videoManifest.wall);
      swapVideo(video, nextSource, { randomStart: true });
      window.setTimeout(rotate, wallDuration);
    };

    window.setTimeout(rotate, index * 180);
  });
};

const startMethodVideoRotation = () => {
  document.querySelectorAll("[data-video-playlist]").forEach((video) => {
    const sources = videoManifest[video.dataset.videoPlaylist] || [];
    if (!sources.length) return;

    const nextSource = createPlaylist(sources);
    swapVideo(video, nextSource());
    window.setInterval(() => swapVideo(video, nextSource()), methodDuration);
  });
};

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
    if (scrollIndicator) {
      scrollIndicator.style.setProperty("--indicator", rect.bottom <= viewport * 1.02 ? "1" : "0");
    }

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

  methodSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const travel = Math.max(rect.height - viewport, 1);
    const progress = clamp((-rect.top) / travel, 0, 1);
    const revealProgress = easeOut(progressBetween(viewport - rect.top, viewport * 0.34, viewport * 0.58));
    const methodProgress = easeOut(progressBetween(progress, 0.06, 0.82));
    const titleLockProgress = easeOut(progressBetween(methodProgress, 0, 0.72));
    const titleOverVideo = easeOut(progressBetween(methodProgress, 0.4, 0.66));
    section.style.setProperty("--method-reveal", revealProgress.toFixed(4));
    section.style.setProperty("--method", methodProgress.toFixed(4));
    section.style.setProperty("--title-lock", titleLockProgress.toFixed(4));
    section.style.setProperty("--title-over", titleOverVideo.toFixed(4));
  });
};

startWallVideoRotation();
startMethodVideoRotation();
updateJourney();
window.addEventListener("scroll", updateJourney, { passive: true });
window.addEventListener("resize", updateJourney);
