import {
    Switch,
    Route,
    Link
  } from "react-router-dom";

import React, {useState} from 'react';

import {ReactComponent as ReactLogo} from './drink.svg';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Results from './Results';
import WeeklyDrink from "./WeeklyDrink";

import { FaCocktail } from 'react-icons/fa';
import { FaWineBottle } from 'react-icons/fa';
import { FaGlassWhiskey } from 'react-icons/fa';
import { BiDrink } from 'react-icons/bi';
import { GiGrapes } from 'react-icons/gi';
import { GiAgave } from 'react-icons/gi';

function HomePage() {
    const [recipes, setRecipes] = useState(null)
    const[term, setTerm] = useState('')
    
    async function getRecipes(props){
        setTerm('')
        setRecipes(null)
        let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?'
        url += 's=' + props
        const r = await fetch(url)
        const j = await r.json()
        if(j.drinks) {
            setRecipes(j.drinks)
            setTerm(props)
        } 
    }

    return <Switch>
            <Route exact path="/">
                <Categories getRecipes={getRecipes} />
            </Route>
            <Route exact path="/ingredient">
                <Ingredient recipes={recipes} term={term} />
            </Route>
        </Switch> 
}

export default HomePage

function Categories(props) {

    const categories = [
        {label:'Tequila', name:'tequila', Icon: GiAgave},
        {label:'Vodka', name:'vodka', Icon: FaCocktail},
        {label:'Rum', name:'rum', Icon: FaWineBottle},
        {label:'Brandy', name:'brandy', Icon: GiGrapes},
        {label:'Whiskey', name:'whiskey', Icon: FaGlassWhiskey},
        {label:'Gin', name:'gin', Icon: BiDrink},
      ]

    return <Container fluid>
        <div className="dark-bkg blue">
            <Row>
                <div className="col-lg-7 align-content-center pt-md-4">
                    <h1>Explore new recipes and mix it up with Mixer!</h1>
                </div>
                <div className="col-lg-3 col-8 offset-2 offset-lg-1">
                    <ReactLogo style={{maxWidth: '20rem'}}/>
                </div>
            </Row>
            <h4 style={{marginBottom: '2rem', marginTop: '4rem'}}>Search by spirit:</h4>
            <Row className="pb-3">
                {categories.map(c=>{
                    const {Icon, name, label} = c
                    return <Link to='/ingredient' className="col search-card" onClick={()=> props.getRecipes(name)}>
                    <h4><Icon /></h4>
                    <p>{label}</p>
                    </Link>
                })}
            </Row>
        </div>
        <WeeklyDrink />
    </Container>;
}

function Ingredient(props) {
    const {recipes} = props
    const {term} = props

    return <Results recipes={recipes} term={term} />;
}