import {
    Container,
    Row,
    Col,
    Button,
    Collapse
} from 'react-bootstrap';

import {useState} from 'react';

import API, { graphqlOperation } from '@aws-amplify/api';

const listTodos = `query listTodos {
    listTodos{
      items{
        id
        name
        description
      }
    }
  }`;

  const addTodo = `mutation createTodo($name:String! $description: String!) {
    createTodo(input:{
      name:$name
      description:$description
    }){
      id
      name
      description
    }
  }`;

export default function Users() {

    const [open, setOpen] = useState(false);

    const todoMutation = async () => {
        const todoDetails = {
            name: 'Party tonight!',
            description: 'Amplify CLI rocks!'
        };
        
        const newTodo = await API.graphql(graphqlOperation(addTodo, todoDetails));
        alert(JSON.stringify(newTodo));
    };

    const listQuery = async () => {
        console.log('listing todos');
        const allTodos = await API.graphql(graphqlOperation(listTodos));
        alert(JSON.stringify(allTodos));
    };

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    >
                    click
                    </Button>
                    <Collapse in={open}>
                    <div id="example-collapse-text">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                        labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                    </Collapse>
                    <Button onClick={() => todoMutation()}>
                        Push
                    </Button>
                    <Button onClick={() => listQuery()}>
                        Load
                    </Button>
                </Col>
            </Row>
        </Container>
    );
} 