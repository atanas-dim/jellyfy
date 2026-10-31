<script setup>
import { startJellyfy } from "jellyfy";
import { onMounted } from "vue";

const colors = [
  "primary",
  "secondary",
  "tertiary",
  "neutral",
  "success",
  "error",
  "warning",
  "info",
];

const name = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  neutral: "Neutral",
  success: "Success",
  error: "Error",
  warning: "Warning",
  info: "Info",
};

const sizes = [
  { id: "sm", label: "Small" },
  { id: "md", label: "Medium" },
  { id: "lg", label: "Large" },
];

const sizeClass = (prefix, id) => (id ? `${prefix}-${id}` : "");

const openDialog = (id) => {
  const dialog = document.getElementById(id);
  if (dialog instanceof HTMLDialogElement) dialog.showModal();
};

onMounted(() => {
  startJellyfy();
});
</script>

<template>
  <main>
    <h1>Jellyfy</h1>

    <section>
      <h2>Button</h2>
      <div class="row">
        <button
          v-for="color in colors"
          :key="color"
          :class="['btn', color]"
          type="button"
        >
          {{ name[color] }}
        </button>
      </div>
      <div class="row end">
        <button
          v-for="size in sizes"
          :key="size.label"
          :class="['btn', sizeClass('btn', size.id)]"
          type="button"
        >
          {{ size.label }}
        </button>
      </div>
      <div class="row">
        <button class="btn primary loading" type="button">Loading</button>
        <button class="btn" type="button" disabled>Disabled</button>
      </div>
    </section>

    <section>
      <h2>Icon button</h2>
      <div class="row">
        <button
          v-for="color in colors"
          :key="color"
          :class="['btn-icon', color]"
          type="button"
          :aria-label="name[color]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
      <div class="row end">
        <button
          v-for="size in sizes"
          :key="size.label"
          :class="['btn-icon', sizeClass('btn', size.id)]"
          type="button"
          :aria-label="size.label"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
      <button
        class="btn-icon secondary loading"
        type="button"
        aria-label="Loading"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </section>

    <section>
      <h2>Badge</h2>
      <div class="row">
        <span v-for="color in colors" :key="color" :class="['badge', color]">{{
          name[color]
        }}</span>
      </div>
      <div class="row">
        <span
          v-for="size in sizes"
          :key="size.label"
          :class="['badge', sizeClass('badge', size.id)]"
        >
          {{ size.label }}
        </span>
      </div>
    </section>

    <section>
      <h2>Input</h2>
      <div class="grid">
        <label v-for="color in colors" :key="color" :class="['input', color]">
          <input
            placeholder=" "
            :value="color === 'neutral' ? '' : name[color]"
          />
          <span>{{ name[color] }}</span>
        </label>
      </div>
      <div class="sizes grid">
        <label
          v-for="size in sizes"
          :key="size.label"
          :class="['input', sizeClass('input', size.id)]"
        >
          <input placeholder=" " />
          <span>{{ size.label }}</span>
        </label>
      </div>
      <label class="input">
        <span class="input-start" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </span>
        <input placeholder=" " />
        <span>Search</span>
        <span class="input-end" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </label>
    </section>

    <section>
      <h2>Textarea</h2>
      <div class="grid">
        <label
          v-for="color in colors"
          :key="color"
          :class="['textarea', color]"
        >
          <textarea placeholder=" ">{{
            color === "neutral" ? "" : name[color]
          }}</textarea>
          <span>Note</span>
        </label>
      </div>
      <div class="sizes grid">
        <label
          v-for="size in sizes"
          :key="size.label"
          :class="['textarea', sizeClass('textarea', size.id)]"
        >
          <textarea placeholder=" "></textarea>
          <span>{{ size.label }}</span>
        </label>
      </div>
    </section>

    <section>
      <h2>Select</h2>
      <div class="grid">
        <label v-for="color in colors" :key="color" :class="['select', color]">
          <select>
            <option>Mint</option>
            <option selected>Rose</option>
          </select>
          <span>{{ name[color] }}</span>
          <i class="picker-icon"></i>
        </label>
      </div>
      <div class="sizes grid">
        <label
          v-for="size in sizes"
          :key="size.label"
          :class="['select', sizeClass('select', size.id)]"
        >
          <select>
            <option selected>Rose</option>
          </select>
          <span>{{ size.label }}</span>
          <i class="picker-icon"></i>
        </label>
      </div>
    </section>

    <section>
      <h2>Checkbox</h2>
      <div class="stack">
        <label
          v-for="color in colors"
          :key="color"
          :class="['checkbox', color]"
        >
          <input type="checkbox" checked />
          <span class="checkbox-box"></span>
          {{ name[color] }}
        </label>
      </div>
      <div class="row">
        <label
          v-for="size in sizes"
          :key="size.label"
          :class="['checkbox', sizeClass('checkbox', size.id)]"
        >
          <input type="checkbox" checked />
          <span class="checkbox-box"></span>
          {{ size.label }}
        </label>
      </div>
      <label class="checkbox">
        <input type="checkbox" />
        <span class="checkbox-box"></span>
        Unchecked
      </label>
    </section>

    <section>
      <h2>Message</h2>
      <div class="stack tight">
        <p class="message">Required</p>
        <p v-for="color in colors" :key="color" :class="['message', color]">
          {{ name[color] }}
        </p>
      </div>
      <div class="stack tight">
        <p
          v-for="size in sizes"
          :key="size.label"
          :class="['message', sizeClass('message', size.id)]"
        >
          {{ size.label }}
        </p>
      </div>
    </section>

    <section>
      <h2>Radio</h2>
      <div class="stack">
        <label v-for="color in colors" :key="color" :class="['radio', color]">
          <input type="radio" :name="color" checked />
          <span class="radio-ring"></span>
          {{ name[color] }}
        </label>
      </div>
      <div class="row">
        <label
          v-for="size in sizes"
          :key="size.label"
          :class="['radio', sizeClass('radio', size.id)]"
        >
          <input type="radio" :name="`size-${size.label}`" checked />
          <span class="radio-ring"></span>
          {{ size.label }}
        </label>
      </div>
    </section>

    <section>
      <h2>Switch</h2>
      <div class="stack">
        <label v-for="color in colors" :key="color" :class="['toggle', color]">
          <input type="checkbox" role="switch" checked />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
          {{ name[color] }}
        </label>
      </div>
      <div class="row">
        <label
          v-for="size in sizes"
          :key="size.label"
          :class="['toggle', sizeClass('toggle', size.id)]"
        >
          <input type="checkbox" role="switch" checked />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
          {{ size.label }}
        </label>
      </div>
      <label class="toggle">
        <input type="checkbox" role="switch" />
        <span class="toggle-track"><span class="toggle-thumb"></span></span>
        Off
      </label>
    </section>

    <section>
      <h2>Range slider</h2>
      <div class="grid">
        <label v-for="color in colors" :key="color" :class="['range', color]">
          {{ name[color] }}
          <span class="range-box">
            <span class="range-track"><span class="range-fill"></span></span>
            <span class="range-thumb"></span>
            <input type="range" value="62" />
          </span>
        </label>
      </div>
      <div class="sizes grid">
        <label
          v-for="size in sizes"
          :key="size.label"
          :class="['range', sizeClass('range', size.id)]"
        >
          {{ size.label }}
          <span class="range-box">
            <span class="range-track"><span class="range-fill"></span></span>
            <span class="range-thumb"></span>
            <input type="range" value="40" />
          </span>
        </label>
      </div>
    </section>

    <section>
      <h2>Alert</h2>
      <div class="grid">
        <div v-for="color in colors" :key="color" :class="['alert', color]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v6M12 8h.01" />
          </svg>
          <div>
            <p class="strong">{{ name[color] }}</p>
            <p>A light surface with dark text.</p>
          </div>
        </div>
      </div>
      <div class="sizes grid">
        <div
          v-for="size in sizes"
          :key="size.label"
          :class="['alert', sizeClass('alert', size.id)]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v6M12 8h.01" />
          </svg>
          <div>
            <p class="strong">{{ size.label }}</p>
            <p>A light surface with dark text.</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2>Card</h2>
      <div class="grid">
        <section class="card">
          <h3>Plain</h3>
          <p>A white jelly panel.</p>
        </section>
        <section class="card squish">
          <h3>Press</h3>
          <p>The same panel, with a press.</p>
        </section>
        <section v-for="color in colors" :key="color" :class="['card', color]">
          <h3>{{ name[color] }}</h3>
        </section>
      </div>
      <div class="sizes grid">
        <section
          v-for="size in sizes"
          :key="size.label"
          :class="['card', sizeClass('card', size.id)]"
        >
          <h3>{{ size.label }}</h3>
        </section>
      </div>
    </section>

    <section>
      <h2>Dialog</h2>
      <div class="row">
        <button class="btn" type="button" @click="openDialog('dialog-plain')">
          Plain
        </button>
        <button
          v-for="color in colors"
          :key="color"
          :class="['btn', color]"
          type="button"
          @click="openDialog(`dialog-${color}`)"
        >
          {{ name[color] }}
        </button>
      </div>
      <dialog id="dialog-plain" class="modal">
        <div class="modal-panel">
          <form method="dialog">
            <button class="btn-surface" type="submit" aria-label="Close">
              ×
            </button>
          </form>
          <h2 class="panel-title">Plain</h2>
          <p>A white panel.</p>
        </div>
      </dialog>
      <dialog
        v-for="color in colors"
        :id="`dialog-${color}`"
        :key="color"
        class="modal"
      >
        <div :class="['modal-panel', color]">
          <form method="dialog">
            <button class="btn-surface" type="submit" aria-label="Close">
              ×
            </button>
          </form>
          <h2 class="panel-title">{{ name[color] }}</h2>
          <p>The same light tint as the card.</p>
        </div>
      </dialog>
    </section>
  </main>
</template>

<style>
body {
  margin: 0;
  color: light-dark(
    var(--color-neutral-950, #0a0a0a),
    var(--color-neutral-100, #f5f5f5)
  );
  background: light-dark(var(--color-white, white), var(--color-black, black));
  font-family: ui-sans-serif, system-ui, sans-serif;
}

main {
  display: grid;
  gap: 3rem;
  max-width: 72rem;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

section {
  display: grid;
  gap: 1rem;
}

h1 {
  margin: 0;
  font-size: 1.875rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

h2 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #737373;
}

h3 {
  margin: 0;
  font-weight: 600;
}

.panel-title {
  margin: 0;
  padding-inline-end: 2rem;
  font-size: 1.125rem;
  letter-spacing: 0;
  text-transform: none;
  color: inherit;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.row.end {
  align-items: flex-end;
  row-gap: 2rem;
}

.grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stack.tight {
  gap: 0;
}

.strong {
  margin: 0;
  font-weight: 600;
}

p {
  margin: 0;
}
</style>
