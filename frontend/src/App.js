import "primereact/resources/themes/fluent-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import PrimeReact from "primereact/api";

import AppContainer from "./Components/AppContainer";

PrimeReact.ripple = true;
PrimeReact.autoZIndex = true;

function App() {
  return <AppContainer />;
}

export default App;
