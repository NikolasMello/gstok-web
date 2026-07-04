import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider, createRouter} from "@tanstack/react-router";

// Import the generated route tree
import {routeTree} from "./routeTree.gen";
import {StyledEngineProvider} from "@mui/material";

import '@fontsource/nunito/400.css'
import '@fontsource/nunito/500.css'
import '@fontsource/nunito/600.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/800.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'

// Create a new router instance
const router = createRouter({routeTree});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </StrictMode>,
  );
}
