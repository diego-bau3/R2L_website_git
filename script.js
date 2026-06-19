const videoLibrary = {
  landing: [
    "assets/videos/landing/landing-01.mp4"
  ],
  wall: [
    "assets/videos/wall/wall-01.mp4",
    "assets/videos/wall/wall-02.mp4",
    "assets/videos/wall/wall-03.mp4",
    "assets/videos/wall/wall-04.mp4",
    "assets/videos/wall/wall-05.mp4",
    "assets/videos/wall/wall-06.mp4",
    "assets/videos/wall/wall-07.mp4",
    "assets/videos/wall/wall-08.mp4",
    "assets/videos/wall/wall-09.mp4",
    "assets/videos/wall/wall-10.mp4",
    "assets/videos/wall/wall-11.mp4",
    "assets/videos/wall/wall-12.mp4"
  ]
};

const shuffle = (items) => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
};

const methodCopy = {
  leader: {
    kicker: "Method 01",
    title: "Leader / follower robotic arm",
    body: "Human intent is translated through a leader arm and mirrored by a follower robot arm. Ideal for precise manipulation, repeatable tasks and high-fidelity motion demonstrations.",
    points: [
      "Fine-grained manipulation trajectories",
      "Synchronized human-to-robot motion",
      "Excellent for grasping, placing and tool use"
    ],
    readouts: ["SYNC: 1.00", "FORCE: nominal", "PATH: stable"]
  },
  remote: {
    kicker: "Method 02",
    title: "Remote control robotic arm",
    body: "Operators control a robotic arm remotely to collect task footage directly from the robot's point of action. Useful when the robot hardware and operating constraints matter.",
    points: [
      "Robot-native action footage",
      "Task data under real hardware limits",
      "Great for teleoperation and recovery behavior"
    ],
    readouts: ["LATENCY: low", "CTRL: active", "TASK: live"]
  },
  ego: {
    kicker: "Method 03",
    title: "Egocentric videos",
    body: "First-person human video captures how people naturally move through environments, use objects and solve everyday tasks. It gives robots context, not just isolated actions.",
    points: [
      "Human point-of-view context",
      "Natural environments and routines",
      "Strong for humanoid and embodied AI training"
    ],
    readouts: ["POV: human", "SCENE: natural", "VARIATION: high"]
  }
};

const initVideos = () => {
  const randomizedLandingSources = shuffle(videoLibrary.landing);
  const randomizedWallSources = shuffle(videoLibrary.wall);
  const deferredVideos = [];
  let landingIndex = 0;
  let wallIndex = 0;

  document.querySelectorAll("video").forEach((video, index) => {
    if (!video.closest(".observatory")) {
      video.removeAttribute("src");
      delete video.dataset.src;
      video.load();
      video.style.display = "none";
      return;
    }

    const tile = video.closest(".feed-tile");
    const useLandingVideo = tile?.classList.contains("focus-source");
    const source = useLandingVideo
      ? randomizedLandingSources[landingIndex++ % randomizedLandingSources.length]
      : randomizedWallSources[wallIndex++ % randomizedWallSources.length];
    const shouldLoadNow = video.closest(".feed-tile")?.classList.contains("focus-source");

    if (shouldLoadNow) {
      video.src = source;
    } else {
      video.dataset.src = source;
      deferredVideos.push(video);
    }

    video.playbackRate = 0.65 + ((index % 4) * 0.12);
    video.addEventListener("loadedmetadata", () => {
      if (video.videoWidth && video.videoHeight) {
        video.closest(".feed-tile")?.style.setProperty("--video-aspect", `${video.videoWidth} / ${video.videoHeight}`);
      }
      if (Number.isFinite(video.duration) && video.duration > 4) {
        video.currentTime = Math.random() * Math.max(video.duration - 2, 1);
      }
    });
    video.addEventListener("loadeddata", () => {
      video.style.opacity = "0.95";
      video.play().catch(() => {});
    });
    video.addEventListener("error", () => {
      video.style.display = "none";
    });
  });

  window.r2lLoadDeferredVideos = () => {
    deferredVideos.forEach((video) => {
      if (!video.src && video.dataset.src) {
        video.src = video.dataset.src;
        video.load();
        video.play().catch(() => {});
      }
    });
    deferredVideos.length = 0;
  };
};

const initSignalLostTiles = () => {
  const preferredTile = document.querySelector(".observatory .obs-tile:nth-child(4)");
  const excludedRandomTiles = [
    ".observatory .obs-tile:nth-child(1)",
    ".observatory .obs-tile:nth-child(5)",
    ".observatory .obs-tile:nth-child(10)"
  ].map((selector) => document.querySelector(selector));
  const candidates = [...document.querySelectorAll(".observatory .obs-tile[data-feed]")]
    .filter((tile) => !tile.classList.contains("focus-source") && tile !== preferredTile && !excludedRandomTiles.includes(tile));
  const selectedTiles = [preferredTile, ...shuffle(candidates).slice(0, 1)].filter(Boolean);

  selectedTiles.forEach((tile, index) => {
    tile.classList.add("signal-lost");
    const hudStatus = tile.querySelector(".feed-hud span:first-child");
    const hudTime = tile.querySelector(".feed-hud span:last-child");
    const overlay = tile.querySelector(".feed-overlay");
    const video = tile.querySelector("video");

    if (hudStatus) hudStatus.innerHTML = "<i></i>OFFLINE";
    if (hudTime) hudTime.textContent = index === 0 ? "00:00:00" : "--:--:--";
    if (overlay) overlay.innerHTML = "<span>SIGNAL LOST</span><span>RETRYING</span>";
    if (video) {
      video.pause();
      video.removeAttribute("src");
      delete video.dataset.src;
      video.load();
    }
  });
};

const initCursorLight = () => {
  const light = document.querySelector(".cursor-light");
  window.addEventListener("pointermove", (event) => {
    light.style.setProperty("--x", `${event.clientX}px`);
    light.style.setProperty("--y", `${event.clientY}px`);
  });
};

const initReveal = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.16 });

  document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
};

const initMethodTabs = () => {
  const tabs = document.querySelectorAll(".method-tab");
  const kicker = document.querySelector("[data-method-kicker]");
  const title = document.querySelector("[data-method-title]");
  const body = document.querySelector("[data-method-body]");
  const points = document.querySelector("[data-method-points]");
  const visual = document.querySelector("[data-method-visual]");
  const readouts = document.querySelector(".mini-readouts");
  const methodFeed = visual.querySelector("[data-feed]");

  const setMethod = (method) => {
    const copy = methodCopy[method];
    const activeTab = [...tabs].find((tab) => tab.dataset.method === method);

    tabs.forEach((item) => {
      item.classList.toggle("is-active", item === activeTab);
      item.setAttribute("aria-selected", item === activeTab ? "true" : "false");
    });

    kicker.textContent = copy.kicker;
    title.textContent = copy.title;
    body.textContent = copy.body;
    points.innerHTML = copy.points.map((point) => `<li>${point}</li>`).join("");
    readouts.innerHTML = copy.readouts.map((item) => `<span>${item}</span>`).join("");
    methodFeed.dataset.mode = method;
    visual.querySelector(".feed-overlay").innerHTML = `<span>${copy.kicker}</span><span>${copy.title}</span>`;
    methodFeed.classList.add("is-scanning");
    window.setTimeout(() => methodFeed.classList.remove("is-scanning"), 700);
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setMethod(tab.dataset.method);
    });
  });

  window.r2lSetMethod = setMethod;
};

const initDatasetToggle = () => {
  const buttons = document.querySelectorAll("[data-view]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const isRobot = button.dataset.view === "robot";
      document.body.classList.toggle("robot-view", isRobot);
      buttons.forEach((item) => item.classList.toggle("is-active", item === button));
    });
  });
};

const initScanningRhythm = () => {
  const feeds = [...document.querySelectorAll("[data-feed]")];
  let index = 0;

  window.setInterval(() => {
    feeds.forEach((feed) => feed.classList.remove("is-scanning"));
    feeds[index % feeds.length].classList.add("is-scanning");
    index += 1;
  }, 1400);
};

const initContactForm = () => {
  const form = document.querySelector(".contact-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    button.textContent = "Request queued";
    window.setTimeout(() => {
      button.textContent = "Transmit request";
    }, 2400);
  });
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const initScrollJourney = () => {
  const root = document.documentElement;
  const observatory = document.querySelector(".observatory");
  const zoomJourney = document.querySelector(".zoom-journey");
  const methods = document.querySelector(".methods");
  const methodOrder = ["leader", "remote", "ego"];
  let activeMethod = "leader";
  let targetScrollProgress = 0;
  let targetZoomProgress = 0;
  let targetWallZoomProgress = 0;
  let smoothScrollProgress = 0;
  let smoothZoomProgress = 0;
  let smoothWallZoomProgress = 0;

  const update = () => {
    const viewport = window.innerHeight || 1;

    if (observatory) {
      const rect = observatory.getBoundingClientRect();
      targetScrollProgress = clamp((0 - rect.top) / (rect.height - viewport), 0, 1);
      targetWallZoomProgress = clamp(targetScrollProgress / 0.52, 0, 1);
      if (targetWallZoomProgress > 0.04 && window.r2lLoadDeferredVideos) {
        window.r2lLoadDeferredVideos();
      }
    }

    if (zoomJourney) {
      const rect = zoomJourney.getBoundingClientRect();
      targetZoomProgress = clamp((0 - rect.top) / (rect.height - viewport), 0, 1);
    }

    if (methods && window.r2lSetMethod) {
      const rect = methods.getBoundingClientRect();
      const progress = clamp((0 - rect.top) / (rect.height - viewport), 0, 0.999);
      const nextMethod = methodOrder[Math.floor(progress * methodOrder.length)];
      if (nextMethod && nextMethod !== activeMethod) {
        activeMethod = nextMethod;
        window.r2lSetMethod(nextMethod);
      }
    }
  };

  const animate = () => {
    smoothScrollProgress += (targetScrollProgress - smoothScrollProgress) * 0.12;
    smoothZoomProgress += (targetZoomProgress - smoothZoomProgress) * 0.12;
    smoothWallZoomProgress += (targetWallZoomProgress - smoothWallZoomProgress) * 0.12;
    root.style.setProperty("--scroll-progress", smoothScrollProgress.toFixed(3));
    root.style.setProperty("--zoom-progress", smoothZoomProgress.toFixed(3));
    root.style.setProperty("--wall-zoom-progress", smoothWallZoomProgress.toFixed(3));
    window.requestAnimationFrame(animate);
  };

  update();
  animate();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
};

initVideos();
initSignalLostTiles();
initCursorLight();
initReveal();
initMethodTabs();
initDatasetToggle();
initScanningRhythm();
initContactForm();
initScrollJourney();
