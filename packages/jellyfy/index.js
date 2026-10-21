const pressed = new WeakSet();

const time = (value, fallback) => {
  const parsed = parseFloat(value);
  if (!Number.isFinite(parsed)) return fallback;
  return value.trim().endsWith("ms") ? parsed : parsed * 1000;
};

const ratio = (value, fallback) => {
  const match = value.match(/calc\(\s*([\d.]+)\s*\/\s*([\d.]+)\s*\)/);
  if (match) return Number(match[1]) / Number(match[2]);
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const SHEENS = [
  ["jelly-sheen-light", "1.35s", "0s"],
  ["jelly-sheen-shade", "1.65s", "0.36s"],
  ["jelly-sheen-light", "1.5s", "0.78s"],
];

const addLights = (button) => {
  if (button.querySelector(".jelly-lights")) return;
  const lights = document.createElement("span");
  lights.className = "jelly-lights";
  for (const [tone, duration, delay] of SHEENS) {
    const sheen = document.createElement("span");
    sheen.className = `jelly-sheen ${tone}`;
    sheen.style.setProperty("--sheen-duration", duration);
    sheen.style.setProperty("--sheen-delay", delay);
    lights.append(sheen);
  }
  button.prepend(lights);
};

const releaseSquish = (face) => {
  if (!pressed.has(face)) return;
  pressed.delete(face);
  const transform = getComputedStyle(face).transform;
  face.getAnimations().forEach((animation) => animation.cancel());
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const releaseTime = time(
    getComputedStyle(face).getPropertyValue("--squish-release-time"),
    300,
  );
  face.animate([{ transform }, { transform: "scale(1, 1)" }], {
    duration: releaseTime,
    easing: "ease-out",
    fill: "forwards",
  });
};

const pressSquish = (event) => {
  const face = event.currentTarget;
  if (!(face instanceof HTMLElement)) return;
  if (face instanceof HTMLButtonElement && face.disabled) return;
  if (face.matches(":has(:disabled)")) return;
  if (event.button !== 0) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  pressed.add(face);
  try {
    face.setPointerCapture(event.pointerId);
  } catch {
    /* The pointer is already gone. The press animation still runs. */
  }
  const styles = getComputedStyle(face);
  const distance = parseFloat(styles.getPropertyValue("--squish-distance"));
  const heightRatio = ratio(
    styles.getPropertyValue("--squish-height-ratio"),
    2 / 7,
  );
  const settleRatio = ratio(
    styles.getPropertyValue("--squish-settle-ratio"),
    1 / 7,
  );
  const peakAt = parseFloat(styles.getPropertyValue("--squish-peak-at"));
  const pressTime = time(styles.getPropertyValue("--squish-press-time"), 480);
  const width = face.offsetWidth;
  const height = face.offsetHeight;
  const scale = (across, down) =>
    `scale(${1 + across / width}, ${1 + down / height})`;
  face.getAnimations().forEach((animation) => animation.cancel());
  face.animate(
    [
      { transform: "scale(1, 1)", easing: "ease-out" },
      {
        transform: scale(distance, -(heightRatio * distance)),
        offset: peakAt,
        easing: "ease-in-out",
      },
      { transform: scale(settleRatio * distance, heightRatio * distance) },
    ],
    { duration: pressTime, fill: "forwards" },
  );
};

const attachSquish = (face) => {
  if (pressed.has(face) || face.dataset.jellySquish === "on") return;
  face.dataset.jellySquish = "on";
  face.addEventListener("pointerdown", pressSquish);
  face.addEventListener("pointerup", () => releaseSquish(face));
  face.addEventListener("pointercancel", () => releaseSquish(face));
};

const syncLights = () => {
  document.querySelectorAll(".btn.loading").forEach(addLights);
  document
    .querySelectorAll(".btn:not(.loading) > .jelly-lights")
    .forEach((lights) => {
      lights.remove();
    });
};

let listening = false;
let scheduled = false;

const refresh = () => {
  syncLights();
  document
    .querySelectorAll(".btn, .input, .textarea, .squish")
    .forEach(attachSquish);
};

const scheduleRefresh = () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    refresh();
  });
};

export const startJellyfy = () => {
  refresh();
  if (listening) return;
  listening = true;

  new MutationObserver(scheduleRefresh).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });
};
