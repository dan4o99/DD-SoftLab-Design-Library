export type DdIconSize = "small" | "medium" | "large";

export const DD_ICON_CSS = `
.dd-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25em;
  height: 1.25em;
  vertical-align: middle;
  flex-shrink: 0;
  fill: currentColor;
  color: inherit;
}

.dd-icon--sm { width: 1em; height: 1em; }
.dd-icon--lg { width: 1.75em; height: 1.75em; }

.dd-icon svg {
  width: 100%;
  height: 100%;
  display: block;
}
`;
