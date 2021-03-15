import React from 'react';

import RecipeCard from './RecipeCard';

function WeeklyDrink() {

    return <div className="dark-bkg pink">
                <h1 className="pt-3">Drink of the Week</h1>
                <RecipeCard
                    name='Havana Cocktail'
                    instructions='In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.'
                    img='https://www.thecocktaildb.com\/images\/media\/drink\/59splc1504882899.jpg'
                    measurements={['1 oz', '1 oz', '1 tsp']}
                    ingredients={['Light rum', 'Pineapple juice', 'Lemon juice']}
                />
            </div>
    
}

export default WeeklyDrink