const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const progressBetween = (value, start, end) => clamp((value - start) / (end - start), 0, 1);
const easeOut = (value) => 1 - Math.pow(1 - value, 3);
const slurpEase = (value) => 1 - Math.pow(1 - value, 5);
const lerp = (start, end, amount) => start + (end - start) * amount;
const easeInOutCubic = (value) =>
  value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;

const animateScrollTo = (targetY, duration = 1500, onComplete = () => {}) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();
  let isCancelled = false;
  let frame = 0;

  const step = (time) => {
    if (isCancelled) return;
    const progress = clamp((time - startTime) / duration, 0, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));

    if (progress < 1) {
      frame = window.requestAnimationFrame(step);
      return;
    }

    onComplete(true);
  };

  frame = window.requestAnimationFrame(step);

  return () => {
    if (isCancelled) return;
    isCancelled = true;
    window.cancelAnimationFrame(frame);
    onComplete(false);
  };
};

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
    "assets/videos/landingpage/landing-main (2).mp4",
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
  simulator: [
    "assets/videos/simulator/sally-recording-2026-06-27T08-22-06.mp4",
    "assets/videos/simulator/sally-recording-2026-06-27T08-27-54.mp4",
    "assets/videos/simulator/sally-recording-2026-06-27T08-31-09.mp4",
  ],
};

const methodDuration = 6000;

const videos = document.querySelectorAll("video");
const methodSections = document.querySelectorAll(".method");
const siteFooter = document.querySelector(".site-footer");
const captureTime = document.querySelector(".capture-time");
const isMobileViewport = () => window.matchMedia("(max-width: 760px)").matches;
let introSoftSnapActive = false;
let introSoftSnapDone = false;
let introSoftSnapTimer = 0;
let introSoftSnapCancel = null;
let lastScrollY = window.scrollY;

videos.forEach((video) => {
  video.muted = true;
  video.playsInline = true;
  video.addEventListener("loadeddata", () => {
    if (video.classList.contains("is-buffering")) {
      video.pause();
      return;
    }

    if (video.dataset.inView !== "false" && !video.classList.contains("is-buffering")) {
      video.play().catch(() => {});
    }
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

  const currentSource = decodeURI(video.currentSrc || "");
  const isSameSource = currentSource.endsWith(source) || video.getAttribute("src") === source;
  const playVideo = () => {
    if (randomStart) setRandomStart(video);
    if (video.dataset.inView !== "false") video.play().catch(() => {});
  };

  if (isSameSource) {
    video.currentTime = 0;
    playVideo();
    return;
  }

  video.addEventListener("loadedmetadata", playVideo, { once: true });
  video.preload = "auto";
  video.src = source;
  video.load();

  if (video.readyState >= 1) {
    playVideo();
  }
};

const videoHasSource = (video, source) => {
  const currentSource = decodeURI(video.currentSrc || "");
  return currentSource.endsWith(source) || video.getAttribute("src") === source;
};

const setBufferedSource = (video, source) => {
  if (!source || videoHasSource(video, source)) return;
  video.pause();
  video.src = source;
  video.load();
  video.pause();
};

const startWallVideoRotation = () => {
  const wallSlots = document.querySelectorAll(".mini-grid .video-slot");
  if (!videoManifest.wall.length) return;

  wallSlots.forEach((slot, index) => {
    const getActive = () => slot.querySelector("video.is-active");
    const getBuffer = () => slot.querySelector("video.is-buffering");
    const pickNextSource = () => {
      const active = getActive();
      const buffer = getBuffer();
      const choices = videoManifest.wall.filter((source) => {
        return !videoHasSource(active, source) && !videoHasSource(buffer, source);
      });

      return randomItem(choices.length ? choices : videoManifest.wall);
    };
    const prepareNext = () => {
      const buffer = getBuffer();
      if (!buffer) return;
      buffer.pause();
      buffer.loop = false;
      buffer.muted = true;
      buffer.playsInline = true;
      buffer.preload = "auto";
      setBufferedSource(buffer, pickNextSource());
    };
    const activateBuffer = () => {
      const active = getActive();
      const buffer = getBuffer();
      if (!active || !buffer) return;

      const finishSwap = () => {
        active.pause();
        active.classList.remove("is-active");
        active.classList.add("is-buffering");
        buffer.classList.remove("is-buffering");
        buffer.classList.add("is-active");
        buffer.currentTime = 0;
        if (buffer.dataset.inView !== "false") buffer.play().catch(() => {});
        prepareNext();
      };

      if (buffer.readyState >= 1) {
        finishSwap();
      } else {
        buffer.addEventListener("loadedmetadata", finishSwap, { once: true });
      }
    };

    slot.querySelectorAll("video").forEach((video) => {
      video.loop = false;
      video.addEventListener("ended", () => {
        if (video.classList.contains("is-active")) activateBuffer();
      });
    });

    prepareNext();
    window.setTimeout(() => {
      const video = getActive();
      if (video.dataset.inView !== "false") video.play().catch(() => {});
    }, index * 180);
  });
};

const startMethodVideoRotation = () => {
  document.querySelectorAll("[data-video-playlist]").forEach((video) => {
    const sources = videoManifest[video.dataset.videoPlaylist] || [];
    if (!sources.length) return;

    const nextSource = createPlaylist(sources);
    const firstSource = video.dataset.src;
    const rotate = () => {
      const source =
        firstSource && video.dataset.firstSourceLoaded !== "true" ? firstSource : nextSource();
      video.dataset.firstSourceLoaded = "true";
      swapVideo(video, source);
    };
    const start = () => {
      if (video.dataset.rotationStarted === "true") return;
      video.dataset.rotationStarted = "true";
      rotate();
      window.setInterval(() => {
        if (video.dataset.inView !== "false" && video.readyState >= 1) rotate();
      }, methodDuration);
    };

    if (video.closest(".landing-panel")) {
      start();
      return;
    }

    const section = video.closest(".method");
    const lazyObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          lazyObserver.disconnect();
        }
      },
      { rootMargin: "120% 0px", threshold: 0.01 }
    );

    lazyObserver.observe(section || video);
  });
};

const startVideoVisibilityControl = () => {
  const playbackObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        video.dataset.inView = entry.isIntersecting ? "true" : "false";

        if (video.classList.contains("is-buffering")) {
          video.pause();
          return;
        }

        if (entry.isIntersecting) {
          if (!video.classList.contains("is-buffering")) video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { rootMargin: "18% 0px", threshold: 0.01 }
  );

  videos.forEach((video) => playbackObserver.observe(video));
};

const cancelIntroSoftSnap = () => {
  if (!introSoftSnapActive) return;

  if (introSoftSnapCancel) {
    introSoftSnapCancel();
    introSoftSnapCancel = null;
  }

  introSoftSnapActive = false;
  introSoftSnapDone = true;
};

const cancelIntroSoftSnapOnKey = (event) => {
  const scrollKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
  if (scrollKeys.includes(event.key)) cancelIntroSoftSnap();
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
    const isMobile = isMobileViewport();
    const rect = intro.getBoundingClientRect();
    const progress = clamp((-rect.top) / Math.max(rect.height - viewport, 1), 0, 1);
    const scrollingDown = window.scrollY >= lastScrollY;
    intro.style.setProperty("--intro", progress.toFixed(4));
    if (scrollIndicator) {
      scrollIndicator.style.setProperty("--indicator", rect.bottom <= viewport * 1.02 ? "1" : "0");
    }

    if (progress < 0.28) introSoftSnapDone = false;
    if (progress >= 0.76) introSoftSnapDone = true;
    window.clearTimeout(introSoftSnapTimer);
    if (isMobile) {
      cancelIntroSoftSnap();
      introSoftSnapDone = true;
    }

    if (
      !isMobile &&
      scrollingDown &&
      !introSoftSnapActive &&
      !introSoftSnapDone &&
      progress > 0.35 &&
      progress < 0.68
    ) {
      introSoftSnapTimer = window.setTimeout(() => {
        const freshRect = intro.getBoundingClientRect();
        const travel = Math.max(freshRect.height - viewport, 1);
        const freshProgress = clamp((-freshRect.top) / travel, 0, 1);
        if (freshProgress < 0.35 || freshProgress > 0.7) return;

        const targetY = window.scrollY + ((0.76 - freshProgress) * travel);
        introSoftSnapActive = true;
        introSoftSnapDone = true;
        introSoftSnapTimer = 0;
        introSoftSnapCancel = animateScrollTo(targetY, 1500, () => {
          introSoftSnapActive = false;
          introSoftSnapCancel = null;
        });
      }, 160);
    }

    const miniGrid = intro.querySelector(".mini-grid");
    const artboard = intro.querySelector(".artboard");
    const gridProgress = slurpEase(progressBetween(progress, 0.06, 0.92));
    if (captureTime) {
      const totalFrames = Math.floor(gridProgress * 32 * 30);
      const seconds = Math.floor(totalFrames / 30);
      const minutes = Math.floor(seconds / 60);
      const frames = totalFrames % 30;
      captureTime.textContent = `00:${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
    }

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
      const inset = 0;
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
    const methodsWord = dataTitle.querySelector(".methods");
    const maxTravel = methodsWord
      ? parseFloat(getComputedStyle(methodsWord).getPropertyValue("--word-start-y")) || 38
      : 38;
    const wordProgress = progressBetween(progress, 0, 0.5);
    const videoPeekProgress = easeOut(progressBetween(progress, 0.66, 0.9));
    dataTitle.style.setProperty("--data", progress.toFixed(4));
    dataTitle.style.setProperty("--data-travel", `${(wordProgress * maxTravel).toFixed(4)}svh`);
    document.documentElement.style.setProperty("--data-video-peek", videoPeekProgress.toFixed(4));
  }

  if (methodSections.length) {
    const firstMethodRect = methodSections[0].getBoundingClientRect();
    const footerRect = siteFooter?.getBoundingClientRect();
    const snapZoneStarted = firstMethodRect.top <= viewport * 0.25;
    const snapZoneEnded = footerRect ? footerRect.bottom < viewport * 0.1 : false;
    document.documentElement.classList.toggle(
      "snap-methods",
      !isMobileViewport() && snapZoneStarted && !snapZoneEnded
    );
  }

  methodSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const travel = Math.max(rect.height - viewport, 1);
    const progress = clamp((-rect.top) / travel, 0, 1);
    const methodOneReveal = section.classList.contains("method-one")
      ? easeOut(progressBetween(viewport - rect.top, viewport * 0.5, viewport))
      : 1;
    const revealProgress = easeOut(progressBetween(viewport - rect.top, viewport * 0.34, viewport * 0.58));
    const methodProgress = easeOut(progressBetween(progress, 0.06, 0.82));
    const titleLockProgress = easeOut(progressBetween(methodProgress, 0, 0.72));
    const titleOverVideo = easeOut(progressBetween(methodProgress, 0.4, 0.66));
    const simulatorExit = section.classList.contains("simulator")
      ? easeOut(progressBetween(progress, 0, 1))
      : 0;
    if (section.classList.contains("simulator") && siteFooter) {
      siteFooter.style.setProperty("--footer-reveal", simulatorExit.toFixed(4));
    }
    section.style.setProperty("--method-one-reveal", methodOneReveal.toFixed(4));
    section.style.setProperty("--method-reveal", revealProgress.toFixed(4));
    section.style.setProperty("--method", methodProgress.toFixed(4));
    section.style.setProperty("--sim-exit", simulatorExit.toFixed(4));
    section.style.setProperty("--title-lock", titleLockProgress.toFixed(4));
    section.style.setProperty("--title-over", titleOverVideo.toFixed(4));
  });

  lastScrollY = window.scrollY;
};

startVideoVisibilityControl();
startWallVideoRotation();
startMethodVideoRotation();
updateJourney();
window.addEventListener("wheel", cancelIntroSoftSnap, { passive: true });
window.addEventListener("touchstart", cancelIntroSoftSnap, { passive: true });
window.addEventListener("keydown", cancelIntroSoftSnapOnKey);
window.addEventListener("scroll", updateJourney, { passive: true });
window.addEventListener("resize", updateJourney);
