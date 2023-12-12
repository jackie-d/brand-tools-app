import {
    Container,
    Row,
    Col,
    ProgressBar,
    Card,
    Collapse,
    Button,
    Form,
    Carousel,
    OverlayTrigger,
    Popover,
    Spinner,
    Badge,
    Jumbotron
} from 'react-bootstrap';

import {Link} from 'react-router-dom';

import {useState} from 'react';

import squareImg from '../assets/square-g.png';
import logo from '../assets/logo.svg';

import './Home.css';

function About(){

    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(32);
    const [isSpinnerShown, setSpinnerShown] = useState(true);

    const toggleSpinner = () => {
        setSpinnerShown(!isSpinnerShown);
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Popover right</Popover.Title>
          <Popover.Content>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
          </Popover.Content>
        </Popover>
      );

    return (
        <Row>
            <Col style={{'backgroundColor': '#eeeeee'}} className={'p-2'}>
                <h3>Design <Badge variant="secondary">Cool</Badge></h3>
                <Card className={'mb-2'}>
                    <Card.Body className={'m-2'}>
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        className={'mb-2'}
                        >
                            Animated Show Text
                        </Button>
                        <Collapse in={open}>
                        <div id="example-collapse-text">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                            labore wes anderson cred nesciunt sapiente ea proident.
                        </div>
                        </Collapse>
                    </Card.Body>
                </Card>
                <Card className={'mb-2'}>
                    <Card.Body className={'m-2'}>
                        <p>Connected components</p>
                        <ProgressBar now={progress} />
                        <Form>
                            <Form.Group controlId="formBasicRange">
                                <Form.Label>Range</Form.Label>
                                <Form.Control type="range" value={progress} onChange={(e) => setProgress(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
                <Card className={'mb-2'}>
                    <Card.Body className={'m-2'}>
                    <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={squareImg}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>Image One</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={squareImg}
                            alt="Second slide"
                            />

                            <Carousel.Caption>
                            <h3>Another Image</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={logo}
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3>The React Logo</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        </Carousel>
                    </Card.Body>
                </Card>
                <Card className={'mb-2'}>
                    <Card.Body className={'m-2'}>
                        <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                            <Button variant="success" onClick={toggleSpinner}>Waiting for your click</Button>
                        </OverlayTrigger>
                        { (isSpinnerShown) ? 
                        <Spinner animation="border" role="status" className={'ml-2'} style={{'position':'relative', 'top': '8px'}}>
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        :
                        <></>
                        }
                    </Card.Body>
                </Card>
                <Card className={'mb-2'}>
                    <Card.Body className={'m-2'}>
                        <Jumbotron>
                            <h1>Enough?</h1>
                            <p>
                                Look at some advanced data interaction on the next page!
                            </p>
                            <p>
                                <Link to="/users">
                                    <Button type="button" variant="primary">Database</Button>
                                </Link>
                            </p>
                        </Jumbotron>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default About;