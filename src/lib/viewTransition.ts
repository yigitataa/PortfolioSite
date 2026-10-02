type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => {
    finished: Promise<void>;
  };
};

export function withViewTransition(
  update: () => void,
  reduceMotion: boolean,
): void {
  const currentDocument = document as ViewTransitionDocument;
  if (reduceMotion || !currentDocument.startViewTransition) {
    update();
    return;
  }
  currentDocument.startViewTransition(update);
}
