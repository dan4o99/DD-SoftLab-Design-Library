import { toCssVar } from "../../theming/theme-tokens";

export const DD_PROGRESS_INDICATOR_CSS = `
.dd-progress-indicator {
  display: flex;
  align-items: flex-start;
  gap: 0;
}

.dd-progress-indicator--vertical {
  flex-direction: column;
}

.dd-progress-indicator__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
}

.dd-progress-indicator__step-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.dd-progress-indicator__circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid ${toCssVar("color.border")};
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.textMuted")};
  font-size: 0.875rem;
  font-weight: 600;
  z-index: 1;
  transition: border-color 200ms, background 200ms;
  flex-shrink: 0;
}

.dd-progress-indicator__step--active .dd-progress-indicator__circle {
  border-color: ${toCssVar("color.primary")};
  background: ${toCssVar("color.primary")};
  color: ${toCssVar("color.primaryContrast")};
}

.dd-progress-indicator__step--complete .dd-progress-indicator__circle {
  border-color: ${toCssVar("color.success")};
  background: ${toCssVar("color.success")};
  color: ${toCssVar("color.successContrast")};
}

.dd-progress-indicator__connector {
  flex: 1;
  height: 2px;
  background: ${toCssVar("color.border")};
  margin-top: 1rem;
  transition: background 200ms;
}

.dd-progress-indicator__step--complete + .dd-progress-indicator__step .dd-progress-indicator__connector,
.dd-progress-indicator__connector--complete {
  background: ${toCssVar("color.success")};
}

.dd-progress-indicator__label {
  margin-top: ${toCssVar("space.xs")};
  font-size: 0.8rem;
  font-weight: 500;
  color: ${toCssVar("color.textMuted")};
  text-align: center;
}

.dd-progress-indicator__step--active .dd-progress-indicator__label,
.dd-progress-indicator__step--complete .dd-progress-indicator__label {
  color: ${toCssVar("color.text")};
}
`;
