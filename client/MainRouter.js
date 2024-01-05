import { Route, Routes } from "react-router";
import Home from "./core/Home";

const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
