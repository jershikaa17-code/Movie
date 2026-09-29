import { useEffect, useRef, useState } from "react";

function isStandalone() {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    window.navigator.standalone === true // legacy iOS Safari flag
  );
}

function isIOSDevice() {
  const ua = window.navigator.userAgent;
  return /iphone|ipad|ipod/i.test(ua) && !window.MSStream;
}

export function useInstallPrompt() {
  const deferredPromptRef = useRef(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(isStandalone);
  const [isIOS] = useState(isIOSDevice);

  useEffect(() => {
    if (isInstalled) return;

    const onBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPromptRef.current = e;
      setCanInstall(true);
    };

    const onAppInstalled = () => {
      deferredPromptRef.current = null;
      setCanInstall(false);
      setIsInstalled(true);
    };

    const displayModeQuery = window.matchMedia("(display-mode: standalone)");
    const onDisplayModeChange = (e) => {
      if (e.matches) setIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    displayModeQuery.addEventListener?.("change", onDisplayModeChange);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
      displayModeQuery.removeEventListener?.("change", onDisplayModeChange);
    };
  }, [isInstalled]);

  const promptInstall = async () => {
    const deferred = deferredPromptRef.current;
    if (!deferred) return null;

    deferred.prompt();
    const choice = await deferred.userChoice;

    deferredPromptRef.current = null;
    setCanInstall(false);
    if (choice.outcome === "accepted") setIsInstalled(true);

    return choice.outcome;
  };

  return {
    canInstall,
    isInstalled,
    isIOS: isIOS && !isInstalled,
    promptInstall,
  };
}
