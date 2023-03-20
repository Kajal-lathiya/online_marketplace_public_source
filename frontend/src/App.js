// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Home from "./Components/Home";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./Components/Login";
// function App() {
//   return (
//     <BrowserRouter>
//       <div>
//         <Routes>
//           <Route element={<Home />} path="/" />
//           <Route element={<Login />} path="/login" />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

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
