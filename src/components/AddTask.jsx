import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addTaskToServer } from "../redux/slices/taskSlice";
import { useDispatch } from "react-redux";

const AddTask = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handlerAddTask = (e) => {
    if (title !== "" && description !== "") {
      e.preventDefault();
      dispatch(addTaskToServer({ title, description }));
      setTitle("");
      setDescription("");
    }
    else {
      alert("Please fill all the fields");
      e.preventDefault();
    }
  };

  return (
    <>
      <section className="my-5">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task title</Form.Label>
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

          <div className="text-end">
            <Button
              onClick={(e) => handlerAddTask(e)}
              variant="primary"
              type="submit"
            >
              Add Task
            </Button>
          </div>
        </Form>
      </section>
    </>
  );
};

export default AddTask;
