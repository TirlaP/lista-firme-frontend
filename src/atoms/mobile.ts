import { atom, useAtom } from "jotai";

// Determine initial device type at the module level
const getInitialIsMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 1024;
};

// Initialize states with correct values immediately
export const isMobileAtom = atom(getInitialIsMobile());
export const mobileSidebarOpenAtom = atom(false);
export const desktopSidebarOpenAtom = atom(true);

// Track if sidebar state has been initialized to prevent flicker
export const isInitializedAtom = atom(false);

// Derived atom that returns the appropriate sidebar state based on device
export const sidebarOpenAtom = atom((get) => {
  // Don't show anything until initialized
  if (!get(isInitializedAtom)) return false;

  const isMobile = get(isMobileAtom);
  return isMobile ? get(mobileSidebarOpenAtom) : get(desktopSidebarOpenAtom);
});

// Action atoms
export const toggleSidebarAtom = atom(null, (get, set) => {
  const isMobile = get(isMobileAtom);
  if (isMobile) {
    set(mobileSidebarOpenAtom, !get(mobileSidebarOpenAtom));
  } else {
    set(desktopSidebarOpenAtom, !get(desktopSidebarOpenAtom));
  }
});

export const openSidebarAtom = atom(null, (get, set) => {
  const isMobile = get(isMobileAtom);
  if (isMobile) {
    set(mobileSidebarOpenAtom, true);
  } else {
    set(desktopSidebarOpenAtom, true);
  }
});

export const closeSidebarAtom = atom(null, (get, set) => {
  const isMobile = get(isMobileAtom);
  if (isMobile) {
    set(mobileSidebarOpenAtom, false);
  } else {
    set(desktopSidebarOpenAtom, false);
  }
});

export const updateIsMobileAtom = atom(null, (get, set, isMobile) => {
  set(isMobileAtom, isMobile);
  set(isInitializedAtom, true);
});

// Hook to use mobile-related atoms
export const useMobile = () => {
  const [isMobile] = useAtom(isMobileAtom);
  const [sidebarOpen] = useAtom(sidebarOpenAtom);
  const [isInitialized] = useAtom(isInitializedAtom);
  const [, toggleSidebar] = useAtom(toggleSidebarAtom);
  const [, openSidebar] = useAtom(openSidebarAtom);
  const [, closeSidebar] = useAtom(closeSidebarAtom);

  return {
    isMobile,
    sidebarOpen,
    isInitialized,
    toggleSidebar,
    openSidebar,
    closeSidebar,
  };
};
