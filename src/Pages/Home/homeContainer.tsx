import { useEffect, useState } from "react";
import "./styles.scss";
import { TaskForm } from "./TaskForm";
import { Task } from "./TaskForm/interface";
import { TasksList } from "./TasksList";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../Redux/tasksSlice";
import { Button } from "@mui/material";
import { fetchTasks } from "../../api/fakeApi";
import useUrlParams from "../../Hooks/URL/useUrl";
const Home: React.FC = () => {

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const dispatch = useDispatch();
  const {getParam} = useUrlParams()
  const {user} = useSelector((state: any) => state.user);
  const {tasks ,status}= useSelector((state: any) => state.tasks);
  

  const filterBy=getParam("filter")

  const filterdTasks=()=>{
      return !!filterBy ? tasks?.filter((item)=>item?.status==filterBy):tasks
  }

  useEffect(() => {
    user &&  dispatch(fetchTasks(user?.id));
  }, [user]);

  const handleOpenAddTask = () => {
    setIsAddTaskOpen(true);
  };

  const handleCloseAddTask = () => {
    setIsAddTaskOpen(false);
  };

  const handleAddTask = (task: Task) => {
    dispatch(addTask(task));
  };

  return (
    <div className={"home-page"}>
      <header className="task-content-header">
        <h1 style={{ fontSize: "24px" }}>Hi, {user?.username}</h1>
        <Button
        variant="contained"
          color="primary"
          className={"primary-button"}
          onClick={handleOpenAddTask}
        >
          Add Task
        </Button>
      </header>
      <div>
        {filterdTasks()?.length === 0 ? (
          <div>
            <img src={"/empty.jpg"} className={"empty-image"} alt="Empty state" />
            <p>No tasks yet.</p>
          </div>
        ) : (
          <TasksList tasks={tasks} />
        )}
      </div>
      <TaskForm
        open={isAddTaskOpen}
        onClose={handleCloseAddTask}
        onAddTask={handleAddTask}
      />
    </div>
  );
};
export default Home;
