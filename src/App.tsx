import "./App.css";

import Loading from "./components/Loading";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import router from "./router";

const App = () => {
  return (
    <div className="app">
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};

export default App;
