import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { routes } from "./routes/route";
import { AppLayout } from "./layouts/app-layout";
import { ErrorBoundary } from "./shared/error-boundary";

import "./App.css";

function App() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.key}
          path={route.path}
          element={
            <AppLayout>
              <ErrorBoundary>
                <Suspense>
                  <route.component />
                </Suspense>
              </ErrorBoundary>
            </AppLayout>
          }
        />
      ))}
    </Routes>
  );
}

export default App;
