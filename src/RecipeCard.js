import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function RecipeCard(props) {
    const ingredients = props.ingredients;
    const listIngredients = ingredients.map((ingredient, i) =>
        <li key={i} className="strong">{ingredient}</li>
    );

    const measurements = props.measurements;
    const listMeasurements = measurements.map((measurement, i) =>
        <li key={i}>{measurement}</li>
    );

    return <Row className="recipe-card">
                <Col lg={3} md={5}>
                    <img src={props.img} alt='' />
                </Col>
                <Col lg={9} md={7}>
                    <h2>{props.name}</h2>
                    <div className="ingredients">
                        <ul>
                            {listMeasurements}
                        </ul>
                        <ul>
                            {listIngredients}
                        </ul>
                    </div>
                    <p>{props.instructions}</p>
                </Col>
            </Row>
    
}

export default RecipeCard