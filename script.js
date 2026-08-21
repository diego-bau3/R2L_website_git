const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const progressBetween = (value, start, end) => clamp((value - start) / (end - start), 0, 1);
const easeOut = (value) => 1 - Math.pow(1 - value, 3);
const slurpEase = (value) => 1 - Math.pow(1 - value, 5);
const lerp = (start, end, amount) => start + (end - start) * amount;
const easeInOutCubic = (value) =>
  value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;

const animateValue = (startValue, endValue, duration = 1900, onUpdate = () => {}, onComplete = () => {}) => {
  const distance = endValue - startValue;
  const startTime = performance.now();
  let isCancelled = false;
  let frame = 0;

  const step = (time) => {
    if (isCancelled) return;
    const progress = clamp((time - startTime) / duration, 0, 1);
    onUpdate(startValue + distance * easeInOutCubic(progress));

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
    "assets/videos/wall-videos/NEW-WALL-01.mp4",
    "assets/videos/wall-videos/NEW-WALL-02.mp4",
    "assets/videos/wall-videos/MECH-WALL-01.mp4",
    "assets/videos/wall-videos/NEW-WALL-03.mp4",
    "assets/videos/wall-videos/W2.mp4",
    "assets/videos/wall-videos/MECH-WALL-02.mp4",
    "assets/videos/wall-videos/NEW-WALL-04.mp4",
    "assets/videos/wall-videos/NEW-WALL-05.mp4",
    "assets/videos/wall-videos/MECH-WALL-03.mp4",
    "assets/videos/wall-videos/NEW-WALL-06.mp4",
    "assets/videos/wall-videos/W3.mp4",
    "assets/videos/wall-videos/MECH-WALL-04.mp4",
    "assets/videos/wall-videos/NEW-WALL-07.mp4",
    "assets/videos/wall-videos/NEW-WALL-08.mp4",
    "assets/videos/wall-videos/MECH-WALL-05.mp4",
    "assets/videos/wall-videos/NEW-WALL-09.mp4",
    "assets/videos/wall-videos/W4.mp4",
    "assets/videos/wall-videos/MECH-WALL-06.mp4",
    "assets/videos/wall-videos/NEW-WALL-10.mp4",
    "assets/videos/wall-videos/NEW-WALL-11.mp4",
    "assets/videos/wall-videos/MECH-WALL-07.mp4",
    "assets/videos/wall-videos/NEW-WALL-12.mp4",
    "assets/videos/wall-videos/W5.mp4",
    "assets/videos/wall-videos/MECH-WALL-08.mp4",
    "assets/videos/wall-videos/NEW-WALL-13.mp4",
    "assets/videos/wall-videos/NEW-WALL-14.mp4",
    "assets/videos/wall-videos/MECH-WALL-09.mp4",
    "assets/videos/wall-videos/NEW-WALL-15.mp4",
    "assets/videos/wall-videos/W6.mp4",
    "assets/videos/wall-videos/MECH-WALL-10.mp4",
    "assets/videos/wall-videos/NEW-WALL-16.mp4",
    "assets/videos/wall-videos/NEW-WALL-17.mp4",
    "assets/videos/wall-videos/MECH-WALL-11.mp4",
    "assets/videos/wall-videos/NEW-WALL-18.mp4",
    "assets/videos/wall-videos/W7.mp4",
    "assets/videos/wall-videos/MECH-WALL-12.mp4",
    "assets/videos/wall-videos/NEW-WALL-19.mp4",
    "assets/videos/wall-videos/NEW-WALL-20-CLIP-01.mp4",
    "assets/videos/wall-videos/NEW-WALL-20-CLIP-02.mp4",
    "assets/videos/wall-videos/NEW-WALL-20-CLIP-03.mp4",
    "assets/videos/wall-videos/MECH-WALL-13.mp4",
    "assets/videos/wall-videos/NEW-WALL-21.mp4",
    "assets/videos/wall-videos/W8.mp4",
    "assets/videos/wall-videos/MECH-WALL-14.mp4",
    "assets/videos/wall-videos/NEW-WALL-22.mp4",
    "assets/videos/wall-videos/NEW-WALL-23.mp4",
    "assets/videos/wall-videos/MECH-WALL-15.mp4",
    "assets/videos/wall-videos/NEW-WALL-24.mp4",
    "assets/videos/wall-videos/W9-CLIP-01.mp4",
    "assets/videos/wall-videos/W9-CLIP-02.mp4",
    "assets/videos/wall-videos/W9-CLIP-03.mp4",
    "assets/videos/wall-videos/MECH-WALL-16.mp4",
    "assets/videos/wall-videos/NEW-WALL-25.mp4",
    "assets/videos/wall-videos/NEW-WALL-26.mp4",
    "assets/videos/wall-videos/MECH-WALL-17.mp4",
    "assets/videos/wall-videos/NEW-WALL-27.mp4",
    "assets/videos/wall-videos/W10-CLIP-01.mp4",
    "assets/videos/wall-videos/W10-CLIP-02.mp4",
    "assets/videos/wall-videos/W10-CLIP-03.mp4",
    "assets/videos/wall-videos/MECH-WALL-18.mp4",
    "assets/videos/wall-videos/NEW-WALL-28.mp4",
    "assets/videos/wall-videos/NEW-WALL-29.mp4",
    "assets/videos/wall-videos/MECH-WALL-19.mp4",
    "assets/videos/wall-videos/NEW-WALL-30.mp4",
    "assets/videos/wall-videos/W11-CLIP-01.mp4",
    "assets/videos/wall-videos/W11-CLIP-02.mp4",
    "assets/videos/wall-videos/W11-CLIP-03.mp4",
    "assets/videos/wall-videos/W11-CLIP-04.mp4",
    "assets/videos/wall-videos/MECH-WALL-20.mp4",
    "assets/videos/wall-videos/NEW-WALL-31.mp4",
    "assets/videos/wall-videos/NEW-WALL-32.mp4",
    "assets/videos/wall-videos/MECH-WALL-21.mp4",
    "assets/videos/wall-videos/NEW-WALL-33.mp4",
    "assets/videos/wall-videos/W12.mp4",
    "assets/videos/wall-videos/MECH-WALL-22.mp4",
    "assets/videos/wall-videos/NEW-WALL-34.mp4",
    "assets/videos/wall-videos/NEW-WALL-35.mp4",
    "assets/videos/wall-videos/MECH-WALL-23.mp4",
    "assets/videos/wall-videos/NEW-WALL-36.mp4",
    "assets/videos/wall-videos/W13.mp4",
    "assets/videos/wall-videos/MECH-WALL-24.mp4",
    "assets/videos/wall-videos/NEW-WALL-37.mp4",
    "assets/videos/wall-videos/NEW-WALL-38.mp4",
    "assets/videos/wall-videos/MECH-WALL-25.mp4",
    "assets/videos/wall-videos/NEW-WALL-39.mp4",
    "assets/videos/wall-videos/W14.mp4",
    "assets/videos/wall-videos/MECH-WALL-26.mp4",
    "assets/videos/wall-videos/NEW-WALL-40.mp4",
    "assets/videos/wall-videos/NEW-WALL-41.mp4",
    "assets/videos/wall-videos/MECH-WALL-27.mp4",
    "assets/videos/wall-videos/NEW-WALL-42.mp4",
    "assets/videos/wall-videos/W15.mp4",
    "assets/videos/wall-videos/MECH-WALL-28.mp4",
    "assets/videos/wall-videos/NEW-WALL-43.mp4",
    "assets/videos/wall-videos/NEW-WALL-44.mp4",
    "assets/videos/wall-videos/MECH-WALL-29.mp4",
    "assets/videos/wall-videos/NEW-WALL-45.mp4",
    "assets/videos/wall-videos/W16.mp4",
    "assets/videos/wall-videos/MECH-WALL-30.mp4",
    "assets/videos/wall-videos/NEW-WALL-46.mp4",
    "assets/videos/wall-videos/NEW-WALL-47.mp4",
    "assets/videos/wall-videos/MECH-WALL-31.mp4",
    "assets/videos/wall-videos/NEW-WALL-48.mp4",
    "assets/videos/wall-videos/W17-CLIP-01.mp4",
    "assets/videos/wall-videos/W17-CLIP-02.mp4",
    "assets/videos/wall-videos/W17-CLIP-03.mp4",
    "assets/videos/wall-videos/W17-CLIP-04.mp4",
    "assets/videos/wall-videos/MECH-WALL-32.mp4",
    "assets/videos/wall-videos/NEW-WALL-49.mp4",
    "assets/videos/wall-videos/NEW-WALL-50.mp4",
    "assets/videos/wall-videos/MECH-WALL-33.mp4",
    "assets/videos/wall-videos/MECH-WALL-34.mp4",
    "assets/videos/wall-videos/MECH-WALL-35.mp4",
    "assets/videos/wall-videos/MECH-WALL-36.mp4",
    "assets/videos/wall-videos/MECH-WALL-37.mp4",
  ],
  landingpage: [
    "assets/videos/landingpage/landing-main-web-1080.mp4",
  ],
};

const videos = document.querySelectorAll("video");
const wallSlots = document.querySelectorAll(".mini-grid .video-slot");
const playableWallSlots = Array.from(wallSlots).filter(
  (slot) => !slot.classList.contains("is-center-placeholder"),
);
const captureTime = document.querySelector(".capture-time");
const captureOverlay = document.querySelector(".capture-overlay");
const wallVideos = document.querySelectorAll(".mini-grid video");
const isMobileViewport = () => window.matchMedia("(max-width: 760px)").matches;
const maxMobilePlayingWallVideos = 18;
const mobileWallPlaybackIndexes = new Set(
  Array.from({ length: maxMobilePlayingWallVideos }, (_, index) => {
    const lastIndex = Math.max(playableWallSlots.length - 1, 0);
    return Math.round((index * lastIndex) / Math.max(maxMobilePlayingWallVideos - 1, 1));
  }),
);
let wallVideosHydrated = false;
let wallPlaybackEnabled = false;
let sceneProgress = 0;
let sceneTarget = 0;
let sceneTransitionCancel = null;
let introTouchStartY = 0;
let captureOverlayIdleTimer = 0;
let captureTimerValue = "";
const siteStartedAt = performance.now();

const posterForSource = (source) => source.replace(/\.mp4$/i, ".jpg");

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

const isWallVideo = (video) => video.closest(".mini-grid") !== null;

const canPlayWallVideo = (video) => {
  if (!isMobileViewport()) return true;

  const slot = video.closest(".video-slot");
  const slotIndex = playableWallSlots.indexOf(slot);
  return mobileWallPlaybackIndexes.has(slotIndex);
};

const formatElapsedTimestamp = (elapsedMs) => {
  const totalFrames = Math.floor((elapsedMs / 1000) * 30);
  const frames = totalFrames % 30;
  const totalSeconds = Math.floor(totalFrames / 30);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
};

const updateCaptureTimer = () => {
  if (captureTime) {
    const nextValue = formatElapsedTimestamp(performance.now() - siteStartedAt);
    if (nextValue !== captureTimerValue) {
      captureTimerValue = nextValue;
      captureTime.textContent = nextValue;
    }
  }

  window.requestAnimationFrame(updateCaptureTimer);
};

const showCaptureOverlay = () => {
  if (!captureOverlay) return;

  captureOverlay.classList.remove("is-idle");
  window.clearTimeout(captureOverlayIdleTimer);

  if (sceneProgress < 0.72 && sceneTarget !== 1) return;

  captureOverlayIdleTimer = window.setTimeout(() => {
    captureOverlay.classList.add("is-idle");
  }, 2400);
};

const shuffle = (items) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
};

const randomWallStart = (video) => {
  if (!Number.isFinite(video.duration) || video.duration < 4) return 0;
  return Math.random() * Math.min(video.duration - 1, video.duration * 0.45);
};

const wallSourceType = (source) => {
  if (source.includes("/MECH-WALL-")) return "mechanical";
  if (/\/W\d+(?:-CLIP-\d+)?\.mp4$/i.test(source)) return "old";
  return "new";
};

const wallSourceGroups = () => {
  return videoManifest.wall.reduce(
    (groups, source) => {
      groups[wallSourceType(source)].push(source);
      return groups;
    },
    { mechanical: [], old: [], new: [] },
  );
};

const spreadSources = (sources, count) => {
  if (!sources.length || !count) return [];

  const result = [];
  const used = new Set();
  let index = 0;
  const step = 17;

  while (result.length < count && used.size < sources.length) {
    const source = sources[index % sources.length];
    if (!used.has(source)) {
      result.push(source);
      used.add(source);
    }
    index += step;
  }

  return result;
};

const balancedWallSources = (count) => {
  const groups = wallSourceGroups();
  const types = ["mechanical", "old", "new"];
  const base = Math.floor(count / types.length);
  const remainder = count % types.length;
  const quotas = types.reduce((result, type, index) => {
    result[type] = base + (index < remainder ? 1 : 0);
    return result;
  }, {});

  const selected = types.flatMap((type) => spreadSources(groups[type], quotas[type]));

  return shuffle(selected);
};

const assignInitialWallSources = () => {
  const sources = balancedWallSources(playableWallSlots.length);

  playableWallSlots.forEach((slot, index) => {
    const active = slot.querySelector("video.is-active");
    if (!active || !sources[index]) return;

    active.dataset.src = sources[index];
    active.removeAttribute("src");
    const posterSource = posterForSource(sources[index]);
    if (posterSource) active.poster = posterSource;
    else active.removeAttribute("poster");
  });
};

assignInitialWallSources();

videos.forEach((video) => {
  video.muted = true;
  video.playsInline = true;
  video.addEventListener("loadeddata", () => {
    if (video.classList.contains("is-buffering")) {
      video.pause();
      return;
    }

    if (isWallVideo(video) && (!wallPlaybackEnabled || !canPlayWallVideo(video))) {
      video.pause();
      return;
    }

    if (video.dataset.inView !== "false" && !video.classList.contains("is-buffering")) {
      video.play().catch(() => {});
    }
  });
});

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
  return currentSource.endsWith(source) || video.getAttribute("src") === source || video.dataset.src === source;
};

const setBufferedSource = (video, source) => {
  if (!source || videoHasSource(video, source)) return;
  video.pause();
  const posterSource = posterForSource(source);
  if (posterSource) video.poster = posterSource;
  else video.removeAttribute("poster");
  video.src = source;
  video.load();
  video.pause();
};

const hydrateVideo = (video) => {
  const source = video?.dataset.src;
  if (!source || video.getAttribute("src")) return;

  const posterSource = posterForSource(source);
  if (posterSource) video.poster = posterSource;
  else video.removeAttribute("poster");
  video.preload = "auto";
  video.addEventListener(
    "loadedmetadata",
    () => {
      video.currentTime = randomWallStart(video);
    },
    { once: true },
  );
  video.src = source;
  video.load();
};

const hydrateWallVideos = () => {
  if (wallVideosHydrated) return;
  wallVideosHydrated = true;

  playableWallSlots.forEach((slot) => {
    const active = slot.querySelector("video.is-active");
    if (!active) return;

    if (!canPlayWallVideo(active)) return;
    hydrateVideo(active);
    if (wallPlaybackEnabled && active.dataset.inView !== "false") active.play().catch(() => {});
  });
};

const setWallPlayback = (enabled) => {
  if (enabled === wallPlaybackEnabled) return;
  wallPlaybackEnabled = enabled;

  if (enabled) {
    hydrateWallVideos();
  }

  wallVideos.forEach((video) => {
    if (video.classList.contains("is-buffering")) {
      video.pause();
      return;
    }

    if (enabled && canPlayWallVideo(video) && video.dataset.inView !== "false" && video.getAttribute("src")) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
};

const startWallVideoRotation = () => {
  if (!videoManifest.wall.length) return;

  const sourceFromVideo = (video) => {
    const current = decodeURI(video.currentSrc || "");
    const source = video.getAttribute("src") || video.dataset.src || "";
    return videoManifest.wall.find((item) => current.endsWith(item) || source === item) || "";
  };

  const sourcesInUse = () => {
    const sources = new Set();

    playableWallSlots.forEach((slot) => {
      slot.querySelectorAll("video").forEach((video) => {
        const manifestSource = sourceFromVideo(video);
        if (manifestSource) sources.add(manifestSource);
      });
    });

    return sources;
  };

  const activeSourceCounts = (ignoredVideo) => {
    return playableWallSlots.reduce(
      (counts, slot) => {
        const active = slot.querySelector("video.is-active");
        if (!active || active === ignoredVideo) return counts;
        const source = sourceFromVideo(active);
        if (source) counts[wallSourceType(source)] += 1;
        return counts;
      },
      { mechanical: 0, old: 0, new: 0 },
    );
  };

  const nextBalancedType = (active) => {
    const counts = activeSourceCounts(active);
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0) + 1;
    const target = total / 3;
    return ["mechanical", "old", "new"].sort((a, b) => {
      return target - counts[b] - (target - counts[a]);
    })[0];
  };

  playableWallSlots.forEach((slot) => {
    const getActive = () => slot.querySelector("video.is-active");
    const getBuffer = () => slot.querySelector("video.is-buffering");
    const pickNextSource = () => {
      const active = getActive();
      const buffer = getBuffer();
      const usedSources = sourcesInUse();
      const preferredType = nextBalancedType(active);
      const available = videoManifest.wall.filter((source) => {
        return !usedSources.has(source) && !videoHasSource(active, source) && !videoHasSource(buffer, source);
      });
      const choices = available.filter((source) => wallSourceType(source) === preferredType);

      return randomItem(choices.length ? choices : available.length ? available : videoManifest.wall);
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
      if (!buffer.getAttribute("src")) prepareNext();

      const finishSwap = () => {
        active.pause();
        active.classList.remove("is-active");
        active.classList.add("is-buffering");
        buffer.classList.remove("is-buffering");
        buffer.classList.add("is-active");
        buffer.currentTime = randomWallStart(buffer);
        if (wallPlaybackEnabled && canPlayWallVideo(buffer) && buffer.dataset.inView !== "false") buffer.play().catch(() => {});
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

    const active = getActive();
    if (active) active.preload = "none";
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

        if (isWallVideo(video) && (!wallPlaybackEnabled || !canPlayWallVideo(video))) {
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

const renderJourney = (progress = sceneProgress) => {
  const viewport = window.innerHeight || 1;
  const intro = document.querySelector(".intro-sequence");
  const scrollIndicator = document.querySelector(".scroll-indicator");
  sceneProgress = clamp(progress, 0, 1);

  if (scrollIndicator) {
    scrollIndicator.style.setProperty("--scroll", sceneProgress.toFixed(4));
  }

  if (intro) {
    const isMobile = isMobileViewport();
    intro.style.setProperty("--intro", sceneProgress.toFixed(4));

    if (scrollIndicator) {
      scrollIndicator.style.setProperty("--indicator", sceneProgress > 0.02 ? "1" : "0");
    }

    const miniGrid = intro.querySelector(".mini-grid");
    const artboard = intro.querySelector(".artboard");
    const gridProgress = slurpEase(progressBetween(sceneProgress, 0.06, 0.92));

    intro.style.setProperty("--grid", gridProgress.toFixed(4));
    if (miniGrid) miniGrid.style.setProperty("--grid", gridProgress.toFixed(4));
    setWallPlayback(sceneTarget === 1 || sceneProgress > 0.08);

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
      const gridColumns = isMobile ? 3 : 7;
      const gridRows = isMobile ? 14 : 6;
      const landingColumn = isMobile ? 2 : 4;
      const landingRow = isMobile ? 7 : 3;
      const cellWidth = (gridWidth - columnGap * (gridColumns - 1)) / gridColumns;
      const cellHeight = (gridHeight - rowGap * (gridRows - 1)) / gridRows;
      const targetLeft = gridRect.left - artRect.left + (cellWidth + columnGap) * (landingColumn - 1);
      const targetTop = gridRect.top - artRect.top + (cellHeight + rowGap) * (landingRow - 1);
      const settle = easeOut(progressBetween(sceneProgress, 0.02, 0.76));

      intro.style.setProperty("--landing-left", `${lerp(inset, targetLeft, settle).toFixed(2)}px`);
      intro.style.setProperty("--landing-top", `${lerp(inset, targetTop, settle).toFixed(2)}px`);
      intro.style.setProperty("--landing-width", `${lerp(artWidth - inset * 2, cellWidth, settle).toFixed(2)}px`);
      intro.style.setProperty("--landing-height", `${lerp(artHeight - inset * 2, cellHeight, settle).toFixed(2)}px`);
      intro.querySelector(".landing-panel")?.classList.toggle("is-docked", settle > 0.92);
    }
  }
};

const setSceneProgress = (progress) => {
  renderJourney(progress);
  document.body.dataset.scene = sceneProgress > 0.5 ? "wall" : "landing";

  if (captureOverlay && sceneProgress < 0.55) {
    window.clearTimeout(captureOverlayIdleTimer);
    captureOverlay.classList.remove("is-idle");
  }
};

const startSceneTransition = (targetProgress) => {
  const nextTarget = clamp(targetProgress, 0, 1);
  if (sceneTransitionCancel) sceneTransitionCancel();

  sceneTarget = nextTarget;
  document.body.dataset.scene = sceneTarget === 1 ? "wall" : "landing";
  showCaptureOverlay();
  sceneTransitionCancel = animateValue(
    sceneProgress,
    sceneTarget,
    2100,
    setSceneProgress,
    (completed) => {
      if (completed) setSceneProgress(sceneTarget);
      showCaptureOverlay();
      sceneTransitionCancel = null;
    },
  );
};

const handleSceneWheel = (event) => {
  if (Math.abs(event.deltaY) < 2) return;
  event.preventDefault();

  if (event.deltaY > 0 && sceneTarget !== 1) {
    startSceneTransition(1);
  } else if (event.deltaY < 0 && sceneTarget !== 0) {
    startSceneTransition(0);
  }
};

const handleSceneTouchStart = (event) => {
  introTouchStartY = event.touches?.[0]?.clientY || 0;
};

const handleSceneTouchMove = (event) => {
  if (!introTouchStartY) return;
  const currentY = event.touches?.[0]?.clientY || introTouchStartY;
  const deltaY = introTouchStartY - currentY;
  if (Math.abs(deltaY) < 18) return;

  event.preventDefault();
  if (deltaY > 0 && sceneTarget !== 1) {
    startSceneTransition(1);
  } else if (deltaY < 0 && sceneTarget !== 0) {
    startSceneTransition(0);
  }
  introTouchStartY = currentY;
};

const updateJourney = () => {
  renderJourney(sceneProgress);
};

startVideoVisibilityControl();
startWallVideoRotation();
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);
setSceneProgress(0);
updateCaptureTimer();
window.addEventListener("wheel", handleSceneWheel, { passive: false });
window.addEventListener("touchstart", handleSceneTouchStart, { passive: true });
window.addEventListener("touchmove", handleSceneTouchMove, { passive: false });
window.addEventListener("pointermove", showCaptureOverlay, { passive: true });
window.addEventListener("keydown", showCaptureOverlay);
window.addEventListener("resize", updateJourney);
