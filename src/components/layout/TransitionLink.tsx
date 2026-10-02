import type { ComponentProps, MouseEvent } from "react";
import { flushSync } from "react-dom";
import { Link, useNavigate } from "react-router";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { withViewTransition } from "../../lib/viewTransition";

type Props = ComponentProps<typeof Link>;

export function TransitionLink({ to, onClick, ...props }: Props) {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank"
    )
      return;
    event.preventDefault();
    const hashOnly = String(to).includes("#");
    withViewTransition(
      () => flushSync(() => navigate(to)),
      reduceMotion || hashOnly,
    );
  }
  return <Link to={to} onClick={handleClick} {...props} />;
}
