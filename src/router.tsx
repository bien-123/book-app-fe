import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
  } from 'react-router-dom';
  import { Suspense, lazy } from "react";
  
  const LayoutPage = lazy(() => import("./layout/LayoutPage"));
  const Book = lazy(() => import("./pages/Book/Book"));
  const Author = lazy(() => import("./pages/Author/Author"));
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
            <Route
              path="/"
              element={
                <LayoutPage>
                  <Suspense>
                    <Book />
                  </Suspense>
                </LayoutPage>
              }
            />
            <Route
              path="/author"
              element={
                <LayoutPage>
                  <Suspense>
                    <Author />
                  </Suspense>
                </LayoutPage>
              }
            />
            </Route>
    )
  );
  
  export default router;
  