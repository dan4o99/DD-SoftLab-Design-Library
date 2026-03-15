import { toCssVar } from "../../theming/theme-tokens";

export const DD_MODAL_CSS = `
.dd-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  animation: dd-modal-fade-in 150ms ease-out;
}

.dd-modal {
  position: relative;
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  border-radius: ${toCssVar("radius.lg")};
  box-shadow: ${toCssVar("shadow.md")};
  padding: ${toCssVar("space.lg")};
  min-width: 320px;
  max-width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
  animation: dd-modal-slide-up 200ms ease-out;
}

.dd-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${toCssVar("space.md")};
}

.dd-modal__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.dd-modal__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.sm")};
  color: ${toCssVar("color.text")};
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  font-size: 1.25rem;
  line-height: 1;
  transition: background 120ms;
}

.dd-modal__close:hover {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-modal__close:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 2px;
}

.dd-modal__body {
  margin-bottom: ${toCssVar("space.md")};
}

.dd-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: ${toCssVar("space.sm")};
  flex-wrap: wrap;
}

.dd-modal__footer > * {
  display: flex;
  justify-content: flex-end;
  gap: ${toCssVar("space.sm")};
  flex-wrap: wrap;
}

@keyframes dd-modal-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes dd-modal-slide-up {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
