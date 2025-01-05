import React from "react";
import ObjectViewer from "./components/ObjectViewer";

const App = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const modelType = queryParams.get("model") || "mug";

  return (
    <div className="App">
      <h1>Simulateur de {modelType === "mug" ? "Mug" : "Tumbler"}</h1>
      <ObjectViewer modelType={modelType} />
    </div>
  );
};

export default App;
