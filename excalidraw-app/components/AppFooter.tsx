import { Footer } from "@excalidraw/excalidraw/index";
import { GithubIcon } from "@excalidraw/excalidraw/components/icons";
import { APP_NAME } from "@excalidraw/common";
import React from "react";

import {
  isExcalidrawPlusSignedUser,
  PROJECT_GITHUB_URL,
} from "../app_constants";

import { DebugFooter, isVisualDebuggerEnabled } from "./DebugCanvas";
import { EncryptedIcon } from "./EncryptedIcon";

export const AppFooter = React.memo(
  ({ onChange }: { onChange: () => void }) => {
    return (
      <Footer>
        <div className="project-footer-links">
          <span className="project-credit">
            Developed with love and code by{" "}
            <a
              href="https://github.com/PRABHMANNAT"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prabhmannat
            </a>
          </span>
          <a
            className="project-star-button"
            href={PROJECT_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Star ${APP_NAME} on GitHub`}
          >
            {GithubIcon}
            <span>Star on GitHub</span>
          </a>
        </div>
        <div
          style={{
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
          }}
        >
          {isVisualDebuggerEnabled() && <DebugFooter onChange={onChange} />}
          {!isExcalidrawPlusSignedUser && <EncryptedIcon />}
        </div>
      </Footer>
    );
  },
);
