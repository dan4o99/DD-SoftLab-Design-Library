import { toCssVar } from "../../theming/theme-tokens";

export const DD_EMPTY_STATE_CSS = `
.dd-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${toCssVar("space.lg")};
  gap: ${toCssVar("space.sm")};
  color: ${toCssVar("color.textMuted")};
}

.dd-empty-state__icon {
  font-size: 3rem;
  line-height: 1;
}

.dd-empty-state__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${toCssVar("color.text")};
}

.dd-empty-state__description {
  margin: 0;
  font-size: 0.9rem;
  max-width: 32ch;
}

.dd-empty-state__actions {
  display: flex;
  gap: ${toCssVar("space.sm")};
  margin-top: ${toCssVar("space.xs")};
}
`;
