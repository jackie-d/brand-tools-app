import logo from '../logo.svg';
import './Home.css';

import {useState, useEffect} from 'react';

import {Modal, Button} from 'react-bootstrap';

function Home() {

  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [word, setWord] = useState('');

  const [show, setShow] = useState(false);
  const [text, setText] = useState('Opening');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setText('Opening');
    setShow(true);
    return () => {
      setText('Closing');
    setShow(true);
    }
  },[])

  function handleClick() {
    console.log('clicked');
    setButtonEnabled(!buttonEnabled);
  };

  function updateWord(event) {
    setWord(event.target.value);
  }

  return (
    <>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Jackie D is the Queen
        </p>
        <a
          className="App-link"
          href="https://www.jackiedeglinnocenti.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discover with me
        </a>
        <button 
          className="Cool-button" 
          onClick={() => handleClick()}
          // disabled={!buttonEnabled}
        >
          Ya! B-)
        </button>
        <input
          className="Cool-input"
          type="text"
          onChange={(e) => updateWord(e)}
        />
        <p
          className={'Cool-paragraph' + (buttonEnabled ? ' bold' : '') }
        >
          {word}
        </p>
      </header>
    </div>

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