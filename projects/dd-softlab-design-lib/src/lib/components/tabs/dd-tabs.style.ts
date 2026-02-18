import { toCssVar } from "../../theming/theme-tokens";

export const DD_TABS_CSS = `
.dd-tabs {
  display: flex;
  flex-direction: column;
  gap: ${toCssVar("space.md")};
  width: 100%;
}

.dd-tabs__header {
  display: flex;
  gap: ${toCssVar("space.xs")};
  box-shadow: inset 0 -1px ${toCssVar("color.border")};
  overflow-x: auto;
  overflow-y: visible;
  }

.dd-tabs__tab {
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: ${toCssVar("color.text")};
  cursor: pointer;
  font: inherit;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.dd-tabs__tab:hover {
  color: ${toCssVar("color.primary")};
}

.dd-tabs__tab--active {
  color: ${toCssVar("color.primary")};
  border-bottom-color: ${toCssVar("color.primary")};
}

.dd-tabs__tab:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: -2px;
}

.dd-tabs__tab:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dd-tabs__content {
  display: flex;
  flex-direction: column;
  gap: ${toCssVar("space.md")};
}

.dd-tabs__panel {
  display: block;
}
`;
