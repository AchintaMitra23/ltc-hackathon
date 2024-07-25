import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import RoutesIndex from "./routes/RoutesIndex";

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  return (
    <div>
      <Header isAuth={isAuth} setIsAuth={setIsAuth}></Header>
      <RoutesIndex isAuth={isAuth} setIsAuth={setIsAuth} />
    </div>
  );
};

export default App;
