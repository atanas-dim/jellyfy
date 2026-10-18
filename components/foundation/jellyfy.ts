const PRESS_PEAK = 3.36;
const CROSS_PEAK = -3.2;

type Axis = "vertical" | "horizontal";

const ratio = (pixels: number, size: number) =>
  size <= 0 ? 1 : 1 + pixels / size;

const squish = (element: HTMLElement, axis: Axis) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (element.closest(":disabled") || element.matches(":disabled")) return;

  const pressSize = axis === "vertical" ? element.offsetHeight : element.offsetWidth;
  const crossSize = axis === "vertical" ? element.offsetWidth : element.offsetHeight;
  const press = ratio(PRESS_PEAK, pressSize);
  const cross = ratio(CROSS_PEAK, crossSize);
  const scaleX = axis === "vertical" ? cross : press;
  const scaleY = axis === "vertical" ? press : cross;

  element.getAnimations().forEach((animation) => animation.cancel());
  element.animate(
    [
      { transform: "none" },
      { transform: `scale(${scaleX}, ${scaleY})`, offset: 0.45 },
      { transform: "none" },
    ],
    { duration: 400, easing: "ease-out" },
  );
};

const face = (node: Element): { element: HTMLElement; axis: Axis } | null => {
  const checkbox = node.closest(".jellyfy-checkbox");
  if (checkbox) {
    return {
      element: checkbox.querySelector<HTMLElement>(".jellyfy-checkbox-box") ?? (checkbox as HTMLElement),
      axis: "vertical",
    };
  }

  const radio = node.closest(".jellyfy-radio");
  if (radio) {
    return {
      element: radio.querySelector<HTMLElement>(".jellyfy-radio-ring") ?? (radio as HTMLElement),
      axis: "vertical",
    };
  }

  const slider = node.closest(".jellyfy-slider");
  if (slider) {
    return {
      element: slider.querySelector<HTMLElement>(".jellyfy-slider-handle") ?? (slider as HTMLElement),
      axis: "horizontal",
    };
  }

  const sw = node.closest(".jellyfy-switch");
  if (sw) {
    return {
      element: sw.querySelector<HTMLElement>(".jellyfy-switch-track") ?? (sw as HTMLElement),
      axis: "horizontal",
    };
  }

  const control = node.closest(
    ".jellyfy-button, .jellyfy-icon-button, .jellyfy-input, .jellyfy-textarea, .jellyfy-select",
  );
  if (!control) return null;

  const vertical = control.classList.contains("jellyfy-button") || control.classList.contains("jellyfy-icon-button");
  return { element: control as HTMLElement, axis: vertical ? "vertical" : "horizontal" };
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
      element.insertAdjacentHTML("beforeend", `<span class="jellyfy-spinner"></span>`);
    }
  });
};

const syncSlider = (input: HTMLInputElement) => {
  const box = input.closest<HTMLElement>(".jellyfy-slider");
  if (!box) return;
  const min = Number(input.min || 0);
  const max = Number(input.max || 100);
  const span = max - min || 1;
  box.style.setProperty("--jellyfy-pct", String((Number(input.value) - min) / span));
};

export const startJellyfy = () => {
  mountLoading(document);

  document.addEventListener("pointerdown", (event) => {
    const hit = face(event.target as Element);
    if (hit) squish(hit.element, hit.axis);
  });

  document.addEventListener("focusin", (event) => {
    const hit = face(event.target as Element);
    if (hit) squish(hit.element, hit.axis);
  });

  document.querySelectorAll<HTMLInputElement>(".jellyfy-slider input").forEach((input) => {
    syncSlider(input);
    input.addEventListener("input", () => syncSlider(input));
  });
};
