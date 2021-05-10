import MealsSummary from './MealsSummary';
import AvailableMaels from './AvailableMeals';
import { Fragment } from 'react';

const Meals = () => {
    return(
        <Fragment>
            <MealsSummary />
            <AvailableMaels />
        </Fragment>
    )
};

export default Meals;

