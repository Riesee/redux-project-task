import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import MyVerticallyCenteredModal from "./UpdateTask";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskInServer, setSelectedTask } from "../redux/slices/taskSlice";
import { getTasksFromServer, removeTaskFromList } from './../redux/slices/taskSlice';

const TaskTable = () => {
  const { tasksList } = useSelector((state) => state.tasks);
  const dispatch = useDispatch()

  const updateTask = (task) => {
    setModalShow(true);
    dispatch(setSelectedTask(task))
  };

  useEffect(() => {
    dispatch(getTasksFromServer())
  },[dispatch])

  const deleteTask = (task) => {
    dispatch(deleteTaskInServer(task))
    .unwrap()
    .then(() => {
      dispatch(removeTaskFromList(task))
    })
  };

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasksList &&
            tasksList.map((task, index) => (
              <tr key={task.id} className="text-center">
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <Button
                    onClick={() => updateTask(task)}
                    className="mx-3"
                    variant="primary"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button onClick={() => deleteTask(task)} variant="primary">
                    <i className="bi bi-trash3"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default TaskTable;
