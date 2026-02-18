# dd-sidebar

A resizable sidebar component with header/content/footer slots and a draggable resizer handle.

## Usage

```html
<dd-sidebar
  [width]="280"
  [minWidth]="80"
  [maxWidth]="520"
  [collapsedWidth]="56"
  [collapsed]="isCollapsed"
  (collapsedChange)="isCollapsed = $event"
  (widthChange)="sidebarWidth = $event"
>
  <div sidebar-header>
    <h3>Project</h3>
  </div>

  <a href="#">Dashboard</a>
  <a href="#">Reports</a>
  <a href="#">Settings</a>

  <div sidebar-footer>
    <small>v1.0.0</small>
  </div>
</dd-sidebar>
```

## Slots

- sidebar-header: Optional header content.
- default: Main sidebar content (links, buttons, menus, etc.).
- sidebar-footer: Optional footer content.

## Resizing and Collapsing

- Drag the handle on the right edge to resize the sidebar.
- Click the handle to toggle collapsed/expanded state.
- Collapsing only affects width; content remains rendered.

## Inputs

- ariaLabel: Accessible label for the sidebar (default: "Sidebar").
- resizerLabel: Accessible label for the resize handle (default: "Resize sidebar").
- width: Initial width in pixels (default: 288).
- minWidth: Minimum width in pixels (default: 80).
- maxWidth: Maximum width in pixels (default: 520).
- collapsedWidth: Width in pixels when collapsed (default: 56).
- collapsed: Initial collapsed state (default: false).
- customClass: Additional CSS classes.
- customStyle: Inline style string or style object.

## Outputs

- clicked: Emits when the sidebar container is clicked.
- collapsedChange: Emits when the collapsed state changes.
- widthChange: Emits when drag resizing changes the width.
