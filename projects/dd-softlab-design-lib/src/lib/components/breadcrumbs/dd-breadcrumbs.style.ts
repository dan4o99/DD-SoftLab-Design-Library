import { toCssVar } from "../../theming/theme-tokens";

export const DD_BREADCRUMBS_CSS = `
.dd-breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${toCssVar("space.xs")};
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
}

.dd-breadcrumbs li {
  display: flex;
  align-items: center;
  gap: ${toCssVar("space.xs")};
  color: ${toCssVar("color.textMuted")};
}

.dd-breadcrumbs li:last-child {
  color: ${toCssVar("color.text")};
  font-weight: 600;
}

.dd-breadcrumbs__separator {
  color: ${toCssVar("color.textMuted")};
  user-select: none;
}

.dd-breadcrumbs a {
  color: ${toCssVar("color.primary")};
  text-decoration: none;
}

.dd-breadcrumbs a:hover {
  text-decoration: underline;
}

.dd-breadcrumbs a:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 2px;
  border-radius: ${toCssVar("radius.sm")};
}
`;
