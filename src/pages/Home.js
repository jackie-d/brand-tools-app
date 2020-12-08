import logo from '../assets/square-y-t.png';
import './Home.css';

import {useState, useEffect} from 'react';

import {Row, Col, Modal, Button, Card} from 'react-bootstrap';

function Home() {

  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [word, setWord] = useState('');

  const [show, setShow] = useState(false);
  const [text, setText] = useState('Opening');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleClick() {
    console.log('clicked');
    setButtonEnabled(!buttonEnabled);
  };

  function updateWord(event) {
    setWord(event.target.value);
  }

  return (
    <>
    <Row>
      <Col style={{"text-align": "center"}}>
        <div className="App-header"></div>
          <img src={logo} className="App-logo mb-2" alt="logo" />
          <p>
            Wellcome in <span style={{color: 'yellow'}}>Jackie D</span> React App demo
          </p>
          <p>
          <a
            href="https://www.jackiedeglinnocenti.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Have a look at my website profile
          </a>
          <br />
          <a
            href="https://www.linkedin.com/in/jackiedeglinnocenti"
            target="_blank"
            rel="noopener noreferrer"
          >
            Have a look at my LinkedIn profile
          </a>
          </p>
          <p>Or search me on the web: <pre>jackie-d</pre></p>

          <Card>
            <Card.Body>
              <div className={'form-inline'}>
                <div className={'form-group mb-2'}>
                  <input
                    className={'form-control'}
                    type="text"
                    onChange={(e) => updateWord(e)}
                    placeholder={"Write something"}
                  />
                </div>
                <button 
                  className={'btn btn-primary mb-2 ml-2'}
                  onClick={() => handleClick()}
                  // disabled={!buttonEnabled}
                >
                  {buttonEnabled ? 'Unbold' : 'Bold'} it!
                </button>
              </div>
              <p
                className={'Cool-paragraph' + (buttonEnabled ? ' bold' : '') }
              >
                {word}
              </p>
            </Card.Body>
          </Card>

      </Col>
    </Row>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {text}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Home;