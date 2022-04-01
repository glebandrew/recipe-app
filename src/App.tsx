import { Routes, Route} from "react-router-dom";
import { SignIn } from "./SignIn";
import { Dashboard } from "./Dashboard";
import { AddRecipe } from "./AddRecipe";

export const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="addrecipe" element={<AddRecipe />} />
    </Routes>
  );
};
