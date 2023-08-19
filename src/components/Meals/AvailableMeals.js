import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [httpError, setHttpError] = useState(null);

	useEffect(() => {
		const fetchMeals = async () => {
			setIsLoading(true);
			const response = await fetch(
				"https://react-test-8c1f7-default-rtdb.firebaseio.com/Meals.json"
			);
			if (!response.ok) {
				throw new Error("Something is wrong");
			}
			const data = await response.json();
			console.log(data);

			let loadedMeals = [];

			for (const key in data) {
				loadedMeals.push({
					id: key,
					name: data[key].name,
					description: data[key].description,
					price: data[key].price,
				});
			}

			setMeals(loadedMeals);
			setIsLoading(false);
		};

		fetchMeals().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
			console.log(error.message);
		});
	}, []);

	if (httpError) {
		return (
			<section className={classes.MealsError}>
				<p>{httpError}</p>
			</section>
		);
	}

	if (isLoading) {
		return (
			<section className={classes.MealsLoading}>
				<p>Loading..........</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
