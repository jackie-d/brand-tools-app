import {
    Container,
    Row,
    Col,
    ProgressBar
} from 'react-bootstrap';

function About(){
    return (
        <Container fluid> 
            <Row>
                <Col>
                    <p>About</p>
                    <ProgressBar now={60} />
                </Col>
            </Row>
        </Container>
    );
}

export default About;