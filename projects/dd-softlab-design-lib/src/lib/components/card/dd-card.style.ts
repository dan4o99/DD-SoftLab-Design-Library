import { toCssVar } from '../../theming/theme-tokens';

export const DD_CARD_CSS = `
.dd-card {
  display: block;
  background: ${toCssVar('color.surfaceAlt')};
  border: 1px solid ${toCssVar('color.border')};
  border-radius: ${toCssVar('radius.lg')};
  padding: ${toCssVar('space.lg')};
  box-shadow: ${toCssVar('shadow.sm')};
}
`;
