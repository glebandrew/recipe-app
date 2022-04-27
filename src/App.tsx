import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import { SignIn } from "./SignIn"
import { Dashboard } from "./Dashboard"
import { AddRecipe } from "./AddRecipe"
import { DetailRecipe } from "./DetailRecipe"
import { SignUp } from "./SignUp"
import { Profile } from "./Profile"
import { Layout } from "./Layout"
import { NotFound } from "./NotFound"

export const App:FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />} >
				<Route index element={<Dashboard />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="recipe/:recipeId" element={<DetailRecipe />} />
				<Route path="profile" element={<Profile />} />
				<Route path="addrecipe" element={<AddRecipe />} />
			</Route>
			<Route path="/signin" element={<SignIn />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
