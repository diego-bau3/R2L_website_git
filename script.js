const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const progressBetween = (value, start, end) => clamp((value - start) / (end - start), 0, 1);
const easeOut = (value) => 1 - Math.pow(1 - value, 3);
const slurpEase = (value) => 1 - Math.pow(1 - value, 5);
const lerp = (start, end, amount) => start + (end - start) * amount;

const videoManifest = {
  wall: [
    "assets/videos/wall-videos/W1.mp4",
    "assets/videos/wall-videos/W2.mp4",
    "assets/videos/wall-videos/W3.mp4",
    "assets/videos/wall-videos/W4.mp4",
    "assets/videos/wall-videos/W5.mp4",
    "assets/videos/wall-videos/W6.mp4",
    "assets/videos/wall-videos/W7.mp4",
    "assets/videos/wall-videos/W8.mp4",
    "assets/videos/wall-videos/W9.mp4",
    "assets/videos/wall-videos/W10.mp4",
    "assets/videos/wall-videos/W11.mp4",
    "assets/videos/wall-videos/W12.mp4",
    "assets/videos/wall-videos/W13.mp4",
    "assets/videos/wall-videos/W14.mp4",
    "assets/videos/wall-videos/W15.mp4",
    "assets/videos/wall-videos/W16.mp4",
    "assets/videos/wall-videos/W17.mp4",
    "assets/videos/wall-videos/W18.mp4",
    "assets/videos/wall-videos/W19.mp4",
    "assets/videos/wall-videos/W20.mp4",
    "assets/videos/wall-videos/W21.mp4",
    "assets/videos/wall-videos/W22.mp4",
    "assets/videos/wall-videos/W23.mp4",
    "assets/videos/wall-videos/W24.mp4",
    "assets/videos/wall-videos/W25.mp4",
  ],
  landingpage: [
    "assets/videos/landingpage/L1.mp4",
    "assets/videos/landingpage/L2.mp4",
    "assets/videos/landingpage/L3.mp4",
  ],
  egocentricData: [
    "assets/videos/egocentric-data/E1_Making a video.mp4",
    "assets/videos/egocentric-data/E2_Doing the dishes.mp4",
    "assets/videos/egocentric-data/E3_Doing the dishes.mp4",
    "assets/videos/egocentric-data/E4_Doing the dishes.mp4",
    "assets/videos/egocentric-data/E5_Doing the dishes.mp4",
    "assets/videos/egocentric-data/E6_Doing the dishes.mp4",
    "assets/videos/egocentric-data/E7_Opening a blender.mp4",
    "assets/videos/egocentric-data/E8_Doing the dishes.mp4",
    "assets/videos/egocentric-data/E9_Doing the dishes.mp4",
    "assets/videos/egocentric-data/E10_Doing the dishes.mp4",
    "assets/videos/egocentric-data/E11_Getting a snack.mp4",
    "assets/videos/egocentric-data/E12_Eating.mp4",
    "assets/videos/egocentric-data/E13_Cleaning up.mp4",
    "assets/videos/egocentric-data/E14_Folding clothes.mp4",
    "assets/videos/egocentric-data/E15_Tidying up.mp4",
    "assets/videos/egocentric-data/E16_Making the bed.mp4",
  ],
  leaderFollower: [
    "assets/videos/leader-follower/A1_Putting the ball in the cup.mp4",
    "assets/videos/leader-follower/A2_Playing beerpong.mp4",
    "assets/videos/leader-follower/A3_Stacking the cups.mp4",
    "assets/videos/leader-follower/A4_Teleoperating.mp4",
    "assets/videos/leader-follower/A5_Teleoperating.mp4",
    "assets/videos/leader-follower/A6_Putting the ball in the cup.mp4",
    "assets/videos/leader-follower/A7_Teleoperating.mp4",
  ],
  remoteControl: [
    "assets/videos/remote-control/R1_Remote controled robotarm.mp4",
  ],
  simulator: [],
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

const createVideoLayer = (source) => {
  const video = document.createElement("video");
  video.src = source;
  video.muted = true;
  video.autoplay = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "metadata";
  return video;
};

const createVideoSlot = (video) => {
  if (video.parentElement?.classList.contains("video-slot")) return video.parentElement;

  const slot = document.createElement("div");
  slot.className = "video-slot";
  slot.setAttribute("style", video.getAttribute("style") || "");
  slot.dataset.currentSource = video.getAttribute("src") || "";

  video.removeAttribute("style");
  video.classList.add("is-active");
  video.parentNode.insertBefore(slot, video);
  slot.appendChild(video);

  return slot;
};

const swapWallVideo = (slot, source, { randomStart = false } = {}) => {
  if (!source || slot.dataset.currentSource === source) return;

  const activeVideo = slot.querySelector("video.is-active") || slot.querySelector("video");
  const nextVideo = createVideoLayer(source);
  let isRevealed = false;

  nextVideo.classList.add("is-entering");
  slot.appendChild(nextVideo);

  const reveal = () => {
    if (isRevealed) return;
    isRevealed = true;
    nextVideo.play().catch(() => {});

    window.requestAnimationFrame(() => {
      nextVideo.classList.remove("is-entering");
      nextVideo.classList.add("is-active");

      if (activeVideo) {
        activeVideo.classList.remove("is-active");
        activeVideo.classList.add("is-leaving");
        window.setTimeout(() => activeVideo.remove(), 260);
      }

      slot.dataset.currentSource = source;
    });
  };

  nextVideo.addEventListener(
    "loadedmetadata",
    () => {
      if (randomStart) setRandomStart(nextVideo);
    },
    { once: true }
  );
  nextVideo.addEventListener("canplay", reveal, { once: true });
  nextVideo.load();

  if (nextVideo.readyState >= 3) {
    reveal();
  }
};

const swapVideo = (video, source, { randomStart = false } = {}) => {
  if (!source) return;

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
};

const startWallVideoRotation = () => {
  const wallSlots = [...document.querySelectorAll(".mini-grid > video, .side-column > video")].map(createVideoSlot);
  if (!videoManifest.wall.length) return;

  wallSlots.forEach((slot, index) => {
    const rotate = () => {
      const choices = videoManifest.wall.filter((source) => slot.dataset.currentSource !== source);
      const nextSource = randomItem(choices.length ? choices : videoManifest.wall);
      swapWallVideo(slot, nextSource, { randomStart: true });
      window.setTimeout(rotate, wallDuration);
    };

    window.setTimeout(rotate, index * 180);
  });
};

const startMethodVideoRotation = () => {
  document.querySelectorAll("[data-video-playlist]").forEach((video) => {
    const sources = videoManifest[video.dataset.videoPlaylist] || [];
    if (!sources.length) return;
    if (sources.length === 1) {
      swapVideo(video, sources[0]);
      return;
    }

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
