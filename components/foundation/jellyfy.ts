const SQUISH = "jellyfy-squish";
const PRESS_MS = 300;
const PEAK_PX = 14;

const along = (pixels: number, size: number) =>
  size <= 0 ? 1 : 1 + pixels / size;

const pose = (element: HTMLElement) => {
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  return {
    peakX: along(PEAK_PX, width),
    peakY: along(-PEAK_PX * (0.02 / 0.07), height),
    endX: along(PEAK_PX * (0.01 / 0.07), width),
    endY: along(PEAK_PX * (0.02 / 0.07), height),
  };
};

const easeOut = (time: number) => {
  let start = 0;
  let end = 1;
  for (let step = 0; step < 10; step += 1) {
    const mid = (start + end) / 2;
    const x =
      3 * (1 - mid) ** 2 * mid * 0.58 + 3 * (1 - mid) * mid ** 2 + mid ** 3;
    if (x < time) start = mid;
    else end = mid;
  }
  const mid = (start + end) / 2;
  return 3 * (1 - mid) * mid ** 2 + mid ** 3;
};

const mix = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

const scalesAt = (element: HTMLElement, progress: number) => {
  const { peakX, peakY, endX, endY } = pose(element);
  if (progress <= 0) return [1, 1] as const;
  if (progress >= 1) return [endX, endY] as const;
  if (progress <= 0.65) {
    const amount = easeOut(progress / 0.65);
    return [mix(1, peakX, amount), mix(1, peakY, amount)] as const;
  }
  const amount = easeOut((progress - 0.65) / 0.35);
  return [mix(peakX, endX, amount), mix(peakY, endY, amount)] as const;
};

const stopSquish = (element: HTMLElement) => {
  element.getAnimations().forEach((animation) => {
    if (animation.id === SQUISH) animation.cancel();
  });
};

const canSquish = (element: HTMLElement) =>
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !element.closest(":disabled") &&
  !element.matches(":disabled");

const press = (element: HTMLElement) => {
  if (!canSquish(element)) return;
  const { peakX, peakY, endX, endY } = pose(element);
  stopSquish(element);
  const animation = element.animate(
    [
      { transform: "scale(1, 1)", offset: 0, easing: "ease-out" },
      {
        transform: `scale(${peakX}, ${peakY})`,
        offset: 0.65,
        easing: "ease-out",
      },
      { transform: `scale(${endX}, ${endY})`, offset: 1 },
    ],
    { duration: PRESS_MS, fill: "forwards" },
  );
  animation.id = SQUISH;
};

const release = (element: HTMLElement) => {
  const running = element
    .getAnimations()
    .find((animation) => animation.id === SQUISH);
  const elapsed =
    typeof running?.currentTime === "number" ? running.currentTime : PRESS_MS;
  const [x, y] = scalesAt(
    element,
    Math.min(1, Math.max(0, elapsed / PRESS_MS)),
  );
  stopSquish(element);
  const animation = element.animate(
    [
      { transform: `scale(${x}, ${y})`, easing: "ease-out" },
      { transform: "scale(1, 1)" },
    ],
    { duration: PRESS_MS, fill: "forwards" },
  );
  animation.id = SQUISH;
};

const face = (node: Element): HTMLElement | null => {
  const checkbox = node.closest(".jellyfy-checkbox");
  if (checkbox)
    return (
      checkbox.querySelector<HTMLElement>(".jellyfy-checkbox-box") ??
      (checkbox as HTMLElement)
    );

  const radio = node.closest(".jellyfy-radio");
  if (radio)
    return (
      radio.querySelector<HTMLElement>(".jellyfy-radio-ring") ??
      (radio as HTMLElement)
    );

  const slider = node.closest(".jellyfy-slider");
  if (slider)
    return (
      slider.querySelector<HTMLElement>(".jellyfy-slider-handle") ??
      (slider as HTMLElement)
    );

  const sw = node.closest(".jellyfy-switch");
  if (sw)
    return (
      sw.querySelector<HTMLElement>(".jellyfy-switch-track") ??
      (sw as HTMLElement)
    );

  return node.closest(
    ".jellyfy-button, .jellyfy-icon-button, .jellyfy-input, .jellyfy-textarea, .jellyfy-select",
  ) as HTMLElement | null;
};

const lights = (spin: boolean) => {
  if (!spin) {
    return `<span class="jellyfy-lights">${[1.35, 1.65, 1.5]
      .map(
        (duration, index) =>
          `<span class="jellyfy-sweep absolute block h-2/5 w-3/10 rounded-full blur-md ${index === 1 ? "bg-black/40" : "bg-white/40"}" style="animation-duration:${duration}s;animation-delay:${[0, 0.36, 0.78][index]}s"></span>`,
      )
      .join("")}</span>`;
  }

  return `<span class="jellyfy-lights">${[
    { angle: 0, duration: 1.35, tone: "bg-white/15" },
    { angle: 130, duration: 2.2, tone: "bg-black/10" },
    { angle: 240, duration: 1.6, tone: "bg-white/15" },
  ]
    .map(
      ({ angle, duration, tone }) =>
        `<span class="pointer-events-none absolute inset-0" style="transform:rotate(${angle}deg)"><span class="jellyfy-orbit absolute inset-0" style="animation-duration:${duration}s"><span class="absolute top-0.5 left-1/2 block size-3.5 -translate-x-1/2 rounded-full blur-[4px] ${tone}"></span></span></span>`,
    )
    .join("")}</span>`;
};

const mountLoading = (root: ParentNode) => {
  root.querySelectorAll<HTMLElement>(".jellyfy-loading").forEach((element) => {
    if (element.querySelector(".jellyfy-lights")) return;
    const spin = element.classList.contains("jellyfy-icon-button");
    element.insertAdjacentHTML("afterbegin", lights(spin));
    if (!element.querySelector(".jellyfy-spinner")) {
      element.insertAdjacentHTML(
        "beforeend",
        `<svg class="jellyfy-spinner animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>`,
      );
    }
  });
};

const syncSlider = (input: HTMLInputElement) => {
  const box = input.closest<HTMLElement>(".jellyfy-slider");
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
    .querySelectorAll<HTMLInputElement>(".jellyfy-slider input")
    .forEach(syncSlider);
};

let listening = false;
let held: HTMLElement | null = null;

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
    const hit = face(event.target as Element);
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
      target.closest(".jellyfy-slider")
    ) {
      syncSlider(target);
    }
  });
};
