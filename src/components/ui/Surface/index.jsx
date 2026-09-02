/**
 * @file index.jsx
 * @description Native semantic surface and disclosure primitive for portfolio content.
 * @module components/ui/Surface
 */

import { useId, useState } from "react";
import "./styles.css";

/**
 * Render a semantic content surface with optional native disclosure behavior.
 * Layout comes from layout-style-css, while visual and interaction states come
 * from ui-style-kit-css and interactive-surface-css.
 *
 * @param {Object} props - Surface configuration.
 * @param {React.ElementType} [props.as="div"] - Semantic element to render.
 * @param {React.ReactNode} [props.header] - Optional heading or disclosure label.
 * @param {boolean} [props.collapsible=false] - Enables a native button disclosure.
 * @param {boolean} [props.defaultExpanded=true] - Initial uncontrolled disclosure state.
 * @param {boolean} [props.expanded] - Optional controlled disclosure state.
 * @param {Function} [props.onSelect] - Called with the next expanded state and click event.
 * @param {string} [props.className=""] - Additional surface classes.
 * @param {React.ReactNode} props.children - Surface body content.
 * @returns {JSX.Element} Native semantic surface.
 */
const Surface = ({
  as: Component = "div",
  header = null,
  collapsible = false,
  defaultExpanded = true,
  expanded = undefined,
  onSelect = undefined,
  className = "",
  children,
  bordered: _bordered = undefined,
  shaded: _shaded = undefined,
  bodyFill: _bodyFill = undefined,
  eventKey: _eventKey = undefined,
  ...restProps
}) => {
  const regionId = useId();
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
  const isControlled = typeof expanded === "boolean";
  const isExpanded = collapsible ? (isControlled ? expanded : uncontrolledExpanded) : true;

  /**
   * Toggle the disclosure and notify controlled consumers.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - Native activation event.
   * @returns {void}
   */
  const handleToggle = (event) => {
    const nextExpanded = !isExpanded;

    if (!isControlled) {
      setUncontrolledExpanded(nextExpanded);
    }

    onSelect?.(nextExpanded, event);
  };

  return (
    <Component className={`surface ly-surface ${className}`.trim()} {...restProps}>
      {header && collapsible ? (
        <h2 className="surface__heading">
          <button
            type="button"
            className="surface__toggle interactive-surface"
            data-surface-variant="subtle"
            data-surface-level="1"
            aria-expanded={isExpanded}
            aria-controls={regionId}
            onClick={handleToggle}
          >
            <span className="surface__header">{header}</span>
            <span className="surface__indicator" aria-hidden="true">
              {isExpanded ? "−" : "+"}
            </span>
          </button>
        </h2>
      ) : header ? (
        <div className="surface__header">{header}</div>
      ) : null}

      {isExpanded ? (
        <div id={collapsible ? regionId : undefined} className="surface__body">
          {children}
        </div>
      ) : null}
    </Component>
  );
};

export default Surface;
