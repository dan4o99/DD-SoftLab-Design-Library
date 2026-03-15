import { toCssVar } from "../../theming/theme-tokens";

export type DdAvatarSize = "small" | "medium" | "large";
export type DdAvatarShape = "circle" | "square";

export const DD_AVATAR_CSS = `
.dd-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  background: ${toCssVar("color.primary")};
  color: ${toCssVar("color.primaryContrast")};
  font-weight: 600;
  user-select: none;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1rem;
}

.dd-avatar--sm {
  width: 2rem;
  height: 2rem;
  font-size: 0.75rem;
}

.dd-avatar--lg {
  width: 3.5rem;
  height: 3.5rem;
  font-size: 1.25rem;
}

.dd-avatar--square {
  border-radius: ${toCssVar("radius.md")};
}

.dd-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;
