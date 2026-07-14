import { useEffect } from "react";

const EVENT = "loader:done";

export function signalLoaderDone() {
  document.documentElement.dataset.loaded = "true";
  window.dispatchEvent(new Event(EVENT));
}

function isLoaderDone() {
  return (
    typeof document !== "undefined" &&
    !!document.documentElement.dataset.loaded
  );
}

export function useLoaderReveal(callback, deps = []) {
  useEffect(() => {
    let cleanup;
    // `alreadyDone` is true when the loader had already revealed before this
    // ran (e.g. the model mounted late on a fast/cached load), so callers can
    // skip any shutter-sync delay and animate in immediately.
    const run = (alreadyDone) => {
      cleanup = callback(alreadyDone);
    };

    if (isLoaderDone()) {
      run(true);
      return () => cleanup?.();
    }

    const onDone = () => run(false);
    window.addEventListener(EVENT, onDone, { once: true });
    return () => {
      window.removeEventListener(EVENT, onDone);
      cleanup?.();
    };
  }, deps);
}
