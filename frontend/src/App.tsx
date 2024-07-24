import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import RoutesIndex from "./routes/RoutesIndex";

const App = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <div>
      <Header></Header>
      <RoutesIndex isLogin={isLogin} setIsLogin={setIsLogin} />
    </div>
  );
};

export default App;
