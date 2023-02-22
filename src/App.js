import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";
import React from "react";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  return (
    <div>
    <React.StrictMode>

      <Header height="100"/>
      <AppRouter/>
    </React.StrictMode>
    </div>
  );
};

export default App;
