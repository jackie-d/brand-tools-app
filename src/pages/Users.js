import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

import {
    Container,
    Row,
    Col,
    Button,
    Collapse,
    Table
} from 'react-bootstrap';

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

const selectTodos = state => state.todos

export default function Users() {

  const todos = useSelector(selectTodos)
  const dispatch = useDispatch()

  const [text, setText] = useState();
  const [description, setDescription] = useState();

  const setTodoText = (e) => {
    setText(e.target.value);
  }

  const setTodoDescription = (e) => {
    setDescription(e.target.value);
  }

  const addTask = () => {
    dispatch({ type: 'addTodo', todo: {title: text, description: description} });
    setText('')
    setDescription('')
  }

  const deleteTodo = (id) => {
    dispatch({ type: 'removeTodo', todo: {id} });
  }

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
                    <Button onClick={() => todoMutation()}>
                        Push
                    </Button>
                    <Button onClick={() => listQuery()}>
                        Load
                    </Button>

                    <p>
                        <input class="form-control" value={text} onChange={(e) => setTodoText(e)} />
                        <input class="form-control" value={description} onChange={(e) => setTodoDescription(e)} />
                        <button class="btn btn-primary" onClick={() => addTask()}>Add</button>
                    </p>

                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                      {todos.map((todo, index) => (
                          <tr>
                            <td>1</td>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td><button class="btn btn-secondary btn-small" onClick={() => deleteTodo(todo.id)}>X</button></td>
                          </tr>
                      ))}
                      </tbody>
                    </Table>

                </Col>
            </Row>
        </Container>
    );
} 