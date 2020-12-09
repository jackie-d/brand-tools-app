import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

import { CloudArrowDownFill, CloudArrowUpFill, ExclamationDiamond, Trash } from 'react-bootstrap-icons';

import {
    Container,
    Row,
    Col,
    Button,
    Collapse,
    Table,
    Card,
    Modal
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

  const addTodo = `mutation saveTodos($id: ID! $name:String! $description: String) {
    createTodo(input:{
      id:$id
      name:$name
      description:$description
    }){
      id
      name
      description
    }
  }`;

  const deleteTodoDb = `mutation deleteTodo($id: ID!) {
    deleteTodo(input:{
      id:$id
    }){
      id
    }
  }`;

const selectTodos = state => state.todos

export default function Users() {

  const todos = useSelector(selectTodos)
  const dispatch = useDispatch()

  const [text, setText] = useState();
  const [description, setDescription] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const reloadAndClose = () => {
    handleClose();
    listQuery();
  }

  const setTodoText = (e) => {
    setText(e.target.value);
  }

  const setTodoDescription = (e) => {
    setDescription(e.target.value);
  }

  const addTask = () => {
    if ( !text || text == '' ) {
      return;
    }
    dispatch({ type: 'addTodo', todo: {title: text, description: description} });
    setText('')
    setDescription('')
  }

  const deleteTodo = (id) => {
    dispatch({ type: 'removeTodo', todo: {id} });
  }

  const todoMutation = async () => {
      // delete all previous
      const allTodos = await API.graphql(graphqlOperation(listTodos));
      if ( allTodos && allTodos.data && allTodos.data.listTodos && allTodos.data.listTodos.items ) {
        for ( let item of allTodos.data.listTodos.items ) {
          try{
            const deleteTodo = await API.graphql(graphqlOperation(deleteTodoDb, {id: item.id}));
          }catch(error) {
            console.error('delete', error);
          }
        }
      }
      // save new ones
      for ( let todo of todos ) {
        const todoDetails = {
            id: todo.id,
            name: todo.title,
            description: todo.description
        };
        console.log('create -', todo, todoDetails);
        try{
          const newTodo = await API.graphql(graphqlOperation(addTodo, todoDetails));
        }catch(error) {
          console.error('create', error);
        }
      }
  };

  const listQuery = async () => {

      console.log('listing todos');
      const allTodos = await API.graphql(graphqlOperation(listTodos));
      if ( allTodos && allTodos.data && allTodos.data.listTodos && allTodos.data.listTodos.items ) {
        dispatch({ type: 'reloadTodos', todos: allTodos.data.listTodos.items });
      }
  };

  return (
      <Container fluid>
          <Row>
              <Col>
                  <Card className={'mt-2 mb-2'}>
                    <Card.Body className={'m-2'}>
                      <Button onClick={() => todoMutation()} className={'mr-2'}>
                          <CloudArrowUpFill />
                          &nbsp; Save
                      </Button>
                      <Button onClick={() => handleShow()}>
                          <CloudArrowDownFill />
                          &nbsp; Reload
                      </Button>
                    </Card.Body>
                  </Card>

                  <Card className={'mb-2'}>
                    <Card.Body className={'m-2'}>
                        <p>Create new todo task</p>
                        <input placeholder="Title" class="form-control mb-2" value={text} onChange={(e) => setTodoText(e)} />
                        <input placeholder="Description" class="form-control mb-2" value={description} onChange={(e) => setTodoDescription(e)} />
                        <button class="btn btn-primary" onClick={() => addTask()}>Add</button>
                      </Card.Body>
                  </Card>

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
                        <tr key={index}>
                          <td>1</td>
                          <td>{todo.title || todo.name}</td>
                          <td>{todo.description}</td>
                          <td><button class="btn btn-secondary btn-small" onClick={() => deleteTodo(todo.id)}><Trash /></button></td>
                        </tr>
                    ))}
                    </tbody>
                  </Table>

              </Col>
          </Row>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <ExclamationDiamond /> &nbsp;
                Overwrite local data?
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Be sure to save your data to the cloud before a reload. Do you want to continue and reload the data from the cloud?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>No, cancel</Button>
              <Button variant="primary" onClick={reloadAndClose}>Yes, reload</Button>
            </Modal.Footer>
          </Modal>

      </Container>
  );
} 