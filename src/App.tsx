import { Routes, Route} from "react-router-dom";
import { SignIn } from "./SignIn";
import { Dashboard } from "./Dashboard";
import { AddRecipe } from "./AddRecipe";
import {DetailRecipe} from "./DetailRecipe"
import { SignUp } from "./SignUp";

export const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/recipe/:recipeId" element={<DetailRecipe />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="addrecipe" element={<AddRecipe />} />
    </Routes>
  );
};
