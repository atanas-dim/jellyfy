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

const ORBITS = [
  [0, "1.35s", "jelly-orbit-light"],
  [130, "2.2s", "jelly-orbit-shade"],
  [240, "1.6s", "jelly-orbit-light"],
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

const addOrbit = (button) => {
  if (button.querySelector(".jelly-lights")) return;
  const lights = document.createElement("span");
  lights.className = "jelly-lights";
  for (const [angle, duration, tone] of ORBITS) {
    const arm = document.createElement("span");
    arm.className = "jelly-orbit-arm";
    arm.style.transform = `rotate(${angle}deg)`;
    const orbit = document.createElement("span");
    orbit.className = "jelly-orbit";
    orbit.style.setProperty("--orbit-duration", duration);
    const dot = document.createElement("span");
    dot.className = `jelly-orbit-dot ${tone}`;
    orbit.append(dot);
    arm.append(orbit);
    lights.append(arm);
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

const pressSquish = (event, painted) => {
  const current = event.currentTarget;
  const face = painted instanceof HTMLElement ? painted : current;
  if (!(face instanceof HTMLElement) || !(current instanceof HTMLElement))
    return;
  const control = current.closest("label, button") ?? current;
  const blocked =
    current.matches(":disabled, :has(:disabled)") ||
    face.matches(":disabled, :has(:disabled)") ||
    control.matches(":disabled, :has(:disabled)") ||
    (current instanceof HTMLButtonElement && current.disabled) ||
    (control instanceof HTMLButtonElement && control.disabled);
  if (blocked) return;
  if (event.button !== 0) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  pressed.add(face);
  // Pointer capture dismisses the select menu and stops a range drag.
  const nativeGesture =
    event.target instanceof Element && event.target.closest("select, .range");
  if (!nativeGesture) {
    try {
      current.setPointerCapture(event.pointerId);
    } catch {
      /* The pointer is already gone. The press animation still runs. */
    }
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

const paintedFace = (node) => {
  if (!(node instanceof HTMLElement)) return null;
  const inner = {
    checkbox: ".checkbox-box",
    radio: ".radio-ring",
    toggle: ".toggle-track",
    range: ".range-thumb",
  };
  for (const [name, selector] of Object.entries(inner)) {
    if (!node.classList.contains(name)) continue;
    const face = node.querySelector(selector);
    return face instanceof HTMLElement ? face : null;
  }
  return node;
};

const attachSquish = (node) => {
  const face = paintedFace(node);
  if (!(face instanceof HTMLElement) || !(node instanceof HTMLElement)) return;
  if (face.dataset.jellySquish === "on") return;
  face.dataset.jellySquish = "on";
  node.addEventListener("pointerdown", (event) => pressSquish(event, face));
  node.addEventListener("pointerup", () => releaseSquish(face));
  node.addEventListener("pointercancel", () => releaseSquish(face));
};

const syncLights = () => {
  document.querySelectorAll(".btn.loading").forEach(addLights);
  document.querySelectorAll(".btn-icon.loading").forEach(addOrbit);
  document
    .querySelectorAll(
      ".btn:not(.loading) > .jelly-lights, .btn-icon:not(.loading) > .jelly-lights",
    )
    .forEach((lights) => {
      lights.remove();
    });
};

const syncRange = (input) => {
  const range = input.closest(".range");
  if (!range) return;
  const min = Number(input.min) || 0;
  const max = Number(input.max) || 100;
  const span = max - min || 1;
  range.style.setProperty(
    "--range-percent",
    String((Number(input.value) - min) / span),
  );
};

const syncRanges = () => {
  document.querySelectorAll(".range input").forEach((input) => {
    if (input instanceof HTMLInputElement) syncRange(input);
  });
};

let listening = false;
let scheduled = false;

const refresh = () => {
  syncLights();
  syncRanges();
  document
    .querySelectorAll(
      ".btn, .btn-icon, .btn-bump, .input, .textarea, .select, .checkbox, .radio, .toggle, .range, .squish",
    )
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

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement && target.closest(".range")) {
      syncRange(target);
    }
  });
};
