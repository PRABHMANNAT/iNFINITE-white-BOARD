import { DEFAULT_SIDEBAR, LIBRARY_SIDEBAR_TAB } from "@excalidraw/common";
import { DefaultSidebar } from "@excalidraw/excalidraw";
import { useExcalidrawSetAppState } from "@excalidraw/excalidraw/components/App";
import { useUIAppState } from "@excalidraw/excalidraw/context/ui-appState";
import { useEffect } from "react";

export const AppSidebar = () => {
  const { openSidebar } = useUIAppState();
  const setAppState = useExcalidrawSetAppState();

  useEffect(() => {
    if (
      openSidebar?.name === DEFAULT_SIDEBAR.name &&
      (openSidebar.tab === "comments" || openSidebar.tab === "presentation")
    ) {
      setAppState({
        openSidebar: { name: DEFAULT_SIDEBAR.name, tab: LIBRARY_SIDEBAR_TAB },
      });
    }
  }, [openSidebar, setAppState]);

  return <DefaultSidebar />;
};
