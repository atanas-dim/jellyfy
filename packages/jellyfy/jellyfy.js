const SQUISH = "jellyfy-squish";
const PRESS_MS = 480;
const RELEASE_MS = 300;
const PEAK_PX = 8;

export const squishRule = {
  peakPx: PEAK_PX,
  pressMs: PRESS_MS,
  releaseMs: RELEASE_MS,
  peakAt: 0.42,
};

const along = (pixels, size) =>
  size <= 0 ? 1 : 1 + pixels / size;

const pose = (element) => {
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  return {
    peakX: along(PEAK_PX, width),
    peakY: along((-PEAK_PX * 2) / 7, height),
    endX: along(PEAK_PX / 7, width),
    endY: along((PEAK_PX * 2) / 7, height),
  };
};

const stopSquish = (element) => {
  element.getAnimations().forEach((animation) => {
    if (animation.id === SQUISH) animation.cancel();
  });
};

const scaleNow = (element) => {
  const value = getComputedStyle(element).transform;
  if (!value || value === "none") return [1, 1];
  const match = value.match(/matrix\(([^)]+)\)/);
  if (!match) return [1, 1];
  const [a, , , d] = match[1].split(",").map((part) => Number(part));
  return [a || 1, d || 1];
};

const canSquish = (element) =>
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !element.closest(":disabled") &&
  !element.matches(":disabled");

const press = (element) => {
  if (!canSquish(element)) return;
  const { peakX, peakY, endX, endY } = pose(element);
  element.style.transform = "";
  stopSquish(element);
  const animation = element.animate(
    [
      { transform: "scale(1, 1)", offset: 0, easing: "ease-out" },
      {
        transform: `scale(${peakX}, ${peakY})`,
        offset: 0.42,
        easing: "ease-in-out",
      },
      { transform: `scale(${endX}, ${endY})`, offset: 1 },
    ],
    { duration: PRESS_MS, fill: "forwards" },
  );
  animation.id = SQUISH;
};

const release = (element) => {
  const [x, y] = scaleNow(element);
  element.style.transform = `scale(${x}, ${y})`;
  stopSquish(element);
  const animation = element.animate(
    [
      { transform: `scale(${x}, ${y})`, easing: "ease-out" },
      { transform: "scale(1, 1)" },
    ],
    { duration: RELEASE_MS, fill: "forwards" },
  );
  animation.id = SQUISH;
  animation.onfinish = () => {
    element.style.transform = "";
    animation.cancel();
  };
};

const face = (node) => {
  const checkbox = node.closest(".checkbox");
  if (checkbox)
    return (
      checkbox.querySelector(".checkbox-box") ??
      (checkbox)
    );

  const radio = node.closest(".radio");
  if (radio)
    return (
      radio.querySelector(".radio-ring") ??
      (radio)
    );

  const slider = node.closest(".range");
  if (slider)
    return (
      slider.querySelector(".range-thumb") ??
      (slider)
    );

  const sw = node.closest(".toggle");
  if (sw)
    return (
      sw.querySelector(".toggle-track") ??
      (sw)
    );

  const control = node.closest(
    ".btn, .btn-square, .btn-surface, .input, .textarea, .select",
  );
  if (control) return control;

  return node.closest(".squish");
};

const lights = (spin) => {
  if (!spin) {
    return `<span class="jellyfy-lights">${[1.35, 1.65, 1.5]
      .map(
        (duration, index) =>
          `<span class="jellyfy-sweep ${index === 1 ? "jellyfy-sweep-shade" : "jellyfy-sweep-light"}" style="animation-duration:${duration}s;animation-delay:${[0, 0.36, 0.78][index]}s"></span>`,
      )
      .join("")}</span>`;
  }

  return `<span class="jellyfy-lights">${[
    { angle: 0, duration: 1.35, tone: "jellyfy-orbit-light" },
    { angle: 130, duration: 2.2, tone: "jellyfy-orbit-shade" },
    { angle: 240, duration: 1.6, tone: "jellyfy-orbit-light" },
  ]
    .map(
      ({ angle, duration, tone }) =>
        `<span class="jellyfy-orbit-arm" style="transform:rotate(${angle}deg)"><span class="jellyfy-orbit" style="animation-duration:${duration}s"><span class="${tone}"></span></span></span>`,
    )
    .join("")}</span>`;
};

const mountLoading = (root) => {
  root.querySelectorAll(".loading").forEach((element) => {
    if (element.querySelector(".jellyfy-lights")) return;
    const spin = element.classList.contains("btn-square");
    element.insertAdjacentHTML("afterbegin", lights(spin));
    if (!element.querySelector(".jellyfy-spinner")) {
      element.insertAdjacentHTML(
        "beforeend",
        `<svg class="jellyfy-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>`,
      );
    }
  });
};

const syncSlider = (input) => {
  const box = input.closest(".range");
  if (!box) return;
  const min = Number(input.min || 0);
  const max = Number(input.max || 100);
  const span = max - min || 1;
  box.style.setProperty(
    "--jellyfy-pct",
    String((Number(input.value) - min) / span),
  );
};

const syncSliders = () => {
  document
    .querySelectorAll(".range input")
    .forEach(syncSlider);
};

let listening = false;
let held = null;

const letGo = () => {
  if (!held) return;
  const element = held;
  held = null;
  release(element);
};

export const startJellyfy = () => {
  mountLoading(document);
  syncSliders();
  if (listening) return;
  listening = true;

  document.addEventListener("pointerdown", (event) => {
    const hit = face(event.target);
    if (!hit) return;
    if (held && held !== hit) release(held);
    held = hit;
    press(hit);
  });

  document.addEventListener("pointerup", letGo);
  document.addEventListener("pointercancel", letGo);

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (
      target instanceof HTMLInputElement &&
      target.closest(".range")
    ) {
      syncSlider(target);
    }
  });
};
