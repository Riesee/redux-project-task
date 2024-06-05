/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskInServer } from './../redux/slices/taskSlice';

const MyVerticallyCenteredModal = (props) => {

  const { selectedTask } = useSelector((state) => state.tasks)
  
  
  const dispatch = useDispatch();



  const handlerUpdateTask = () => {
    props.onHide();
    dispatch(updateTaskInServer({ title, description, id}))
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    if (Object.keys(selectedTask).length > 0) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setId(selectedTask.id);
    }
  }, [selectedTask]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-end">
          <Button
            onClick={(e) => handlerUpdateTask(e)}
            variant="primary"
            type="submit"
          >
            Update Task
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
