export function measureOverride(target, reference, test, part) {
  if (!target || !reference)
    throw new Error("The selected test target is missing");
  const actual = getComputedStyle(target, part.pseudo ?? null);
  const expected = getComputedStyle(reference);
  const comparisons = test.properties.map((property) => ({
    property,
    actual: actual.getPropertyValue(property).trim(),
    expected: expected.getPropertyValue(property).trim(),
  }));
  const supported = comparisons.every(
    (value) => value.actual !== "" && value.expected !== "",
  );
  const context = Object.fromEntries(
    [
      "display",
      "position",
      "box-sizing",
      "flex-shrink",
      "flex-basis",
      "overflow",
      "min-width",
      "max-width",
      "min-height",
      "max-height",
    ].map((property) => [property, actual.getPropertyValue(property).trim()]),
  );
  const parent = target.parentElement
    ? getComputedStyle(target.parentElement)
    : null;
  context["parent-display"] = parent?.display ?? "";
  context["parent-width"] = parent?.width ?? "";
  return {
    supported,
    passed:
      supported &&
      comparisons.every((value) => value.actual === value.expected),
    comparisons,
    context,
  };
}
