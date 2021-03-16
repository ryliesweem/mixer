import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import RecipeCard from './RecipeCard';

function Results(props) {

    const {recipes} = props
    const {term} = props
  
    return <Container fluid>
      {recipes && recipes.length===0 && <div className="dark-bkg pink" style={{minHeight:'95vh'}}>
        No recipes found! Try another search.
      </div>}
      {recipes && recipes.length>0 && <div className="dark-bkg pink" style={{minHeight:'95vh'}}>
        <Row>
          <Col>
            <h1>Recipes</h1>
            {term && <div style={{color: 'white'}}>Showing results for: <strong>{term}</strong></div>}
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            {recipes.map((m, i) => 
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
    </Container>
    
}

export default Results