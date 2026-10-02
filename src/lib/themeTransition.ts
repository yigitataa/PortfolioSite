let activeTransition: ViewTransition | undefined;

export function withThemeTransition(
  update: () => void,
  reduceMotion: boolean,
): void {
  activeTransition?.skipTransition();

  if (reduceMotion || !document.startViewTransition) {
    update();
    return;
  }

  const root = document.documentElement;
  root.classList.add("theme-transition");

  const transition = document.startViewTransition(update);
  activeTransition = transition;
  const cleanup = () => {
    // A previous transition may finish after a newer click has started.
    if (activeTransition !== transition) return;
    activeTransition = undefined;
    root.classList.remove("theme-transition");
  };

  // An interrupted transition still applies the theme, without an animation.
  void transition.ready.catch(() => {});
  void transition.finished.then(cleanup, cleanup);
}
