import {createAsyncThunk} from '@reduxjs/toolkit';
import {Task} from '../Pages/Home/TaskForm/interface';
import axios from 'axios';
import { Task } from '@mui/icons-material';


interface UserData {
    email: string;
    password: string;
    username?:string
    id:string|number
    accessToken?:string
}


export const loginUser = createAsyncThunk(
    'user/login',
    async (userData: any) => {
        try {
            const response = await axios.get<UserData[]>('http://localhost:4000/users');

            const currentUserData=response?.data
            ?.filter((item)=>item?.email===userData?.email)

            if(userData?.password==currentUserData?.[0]?.password)
            return currentUserData?.[0];
          else {
            throw new Error('Invalid password');
          }
        } catch (error) {
          throw new Error('An error occurred during login');
        }
    }
);

export const getUser = createAsyncThunk(
  'user/profile',
  async (accessToken: any) => {
      try {
          const response = await axios.get<UserData[]>('http://localhost:4000/users');

          const currentUserData=response?.data?.filter((item)=>item?.accessToken===accessToken)
          return currentUserData?.[0];
    
      } catch (error) {
        throw new Error('An error occurred during login');
      }
  }
);


export const registerUser = createAsyncThunk(
    'user/register',
    async (userData: UserData, { rejectWithValue }) => {
        try {
            const response = await axios.post<UserData>('http://localhost:4000/users', userData);

            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);


// CRUD operations
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (userId:string|number) => {

  
    const response = await axios.get<Task[]>('http://localhost:4000/tasks');
    
    return response.data?.filter((item:Task)=> item?.userId==userId);
  });

  export const createTask = createAsyncThunk(
    'tasks/addTask',
    async (newTask: Task) => {
      try {
        const response = await axios.post<Task>(
          'http://localhost:4000/tasks',
          newTask
        );
        return response.data;
      } catch (error) {
        console.error('error', error);
        throw error;
      }
    }
  );

  export const patchTask = createAsyncThunk(
    'tasks/patchTask',
    async (updatedTask: Task) => {
      try {
        console.log("updatedTask.id",updatedTask.id);
    
        const response = await axios.patch<Task>(
          `http://localhost:4000/tasks/${updatedTask.id}`,
          updatedTask
        );
        return response.data;
      } catch (error) {
        console.error('error', error);
        throw error;
      }
    }
  );
  
  export const deleteTaskApi = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId: number|string) => {
      try {
        await axios.delete(`http://localhost:4000/tasks/${taskId}`);
        return taskId;
      } catch (error) {
        console.error('error', error);
        throw error;
      }
    }
  );