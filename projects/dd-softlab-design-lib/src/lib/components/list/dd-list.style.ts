import { toCssVar } from "../../theming/theme-tokens";

export type DdListVariant = "unordered" | "ordered" | "none";

export const DD_LIST_CSS = `
.dd-list {
  margin: 0;
  padding: 0 0 0 1.5rem;
  color: ${toCssVar("color.text")};
  line-height: 1.7;
}

.dd-list--none {
  list-style: none;
  padding-left: 0;
}

.dd-list li + li {
  margin-top: ${toCssVar("space.xs")};
}

.dd-list--divider li + li {
  border-top: 1px solid ${toCssVar("color.border")};
  padding-top: ${toCssVar("space.xs")};
}
`;
