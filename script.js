const videos = document.querySelectorAll("video");

videos.forEach((video) => {
  video.muted = true;
  video.playsInline = true;
  video.addEventListener("loadeddata", () => {
    video.play().catch(() => {});
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("is-visible", entry.isIntersecting);
  });
}, { threshold: 0.22 });

document.querySelectorAll(".method").forEach((section) => observer.observe(section));
