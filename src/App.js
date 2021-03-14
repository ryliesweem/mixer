import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import React, {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { AiOutlineSearch } from 'react-icons/ai';

import RecipeCard from './RecipeCard';
import HomePage from './HomePage';
import ScrollToTop from './ScrollToTop';

function Wrap() {
  return <Router>
    <ScrollToTop />
    <App />
  </Router>
}

function App() {
  const history = useHistory()

  const [text, setText] = useState('')
  const[term, setTerm] = useState('')
  const [recipes, setRecipes] = useState(null)
  
  async function getRecipes(){
    setTerm('')
    setRecipes(null)
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?'
    url += 's=' + text
    const r = await fetch(url)
    const j = await r.json()
    if(j.drinks) {
      setRecipes(j.drinks)
      setTerm(text)
      setText('')
    }
  }
  async function getRandom(){
    setRecipes(null)
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    const r = await fetch(url)
    const j = await r.json()
    if(j.drinks) {
      setRecipes(j.drinks)
    }
  }

  return ( <>

    <div className="header">
          <Link to="/"><h3>Mixer</h3></Link>
          <div className="searchbar">
            <AiOutlineSearch style={{marginLeft: '0.75rem', position: 'absolute', color:'#DAC62F'}} />
            <input value={text} placeholder="search drinks" onChange={e=> setText(e.target.value)} autoFocus
            onKeyPress={e=> {
              if (e.key==='Enter') {
                getRecipes()
                history.push('/recipes')
              } 
            }} />
            <Link to="/recipes"><button className="btn-1" disabled={!text} onClick={getRecipes}>
              Search
            </button></Link>
          </div>
          <div className="random-btn">
            <Link to="/recipes"><button className="btn-2" onClick={getRandom}>
              <GiPerspectiveDiceSixFacesRandom /> Random
            </button></Link>
          </div>
      </div>

      <Switch>
        <Route path="/recipes">
          <Recipes recipes={recipes} term={term} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      
    </>
  );
}
export default Wrap;

function Home() {
  return <HomePage />;
}

function Recipes(props) {
  const {recipes} = props
  const {term} = props

  return <div>
    {recipes && recipes.length===0 && <div className="dark-bkg pink">
      No recipes found! Try another search.
    </div>}
    {recipes && recipes.length>0 && <div className="dark-bkg pink">
      <Row>
        <Col>
          <h1>Recipes</h1>
          {term && <div style={{color: 'white'}}>Showing results for: <strong>{term}</strong></div>}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {recipes.map(m=> 
              <RecipeCard
                name={m.strDrink}
                instructions={m.strInstructions}
                img={m.strDrinkThumb}
                measurements={[m.strMeasure1, m.strMeasure2, m.strMeasure3, m.strMeasure4, m.strMeasure5, m.strMeasure6]}
                ingredients={[m.strIngredient1, m.strIngredient2, m.strIngredient3, m.strIngredient4, m.strIngredient5, m.strIngredient6]}
              />
          )}
        </Col>
      </Row>
    </div>}
  </div>;
}