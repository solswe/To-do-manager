import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { getUndoneTodos, addNewTodo, setComplete, deleteTodo } from "../modules/data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useClerk } from "@clerk/clerk-react";
import Link from 'next/link';


export default function Todos() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [undoneTodos, setUndoneTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function process() {
          if (userId) {
            const token = await getToken({ template: "codehooks" });
            setUndoneTodos(await getUndoneTodos(userId, token));
            setLoading(false);
          }
        }
        process();
    }, [isLoaded]);

    async function AddTodo() {
        const token = await getToken({ template: "codehooks" });
        const add = await addNewTodo(userId, newTodo, token);
        setNewTodo("");
        setUndoneTodos(undoneTodos.concat(add));
    };

    
    function TodoList(list) {
        return (
            undoneTodos.map((todo, index) => {
            return (
              <tr key={index}>
                <td>
                    <Link key={todo.item} href={`/todos/${todo._id}`}>
                        {todo.item}
                    </Link>
                </td>
                <td>{todo.category}</td>
                <td>{todo.createDate}</td>
              </tr>
            )
          })
        )
    };

    if (loading){
        return(
            <>            
                {console.log(undoneTodos)}
                <div className="container">
                    <div className='columns is-ancestor'>
                        <div className='column is-three-fifths'>
                            <p>Loading...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    } else{
        return (
            <>
            {console.log(undoneTodos)}
            <div className="container">
                <div className='columns is-ancestor'>
                    <div className='column is-three-fifths'>
                        <label className="label has-text-danger">You have {undoneTodos.length} things to do</label>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Category</th>
                                    <th>Created date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TodoList list={undoneTodos}></TodoList>                            
                            </tbody>
                        </table>
                    </div>    
                    <div className='column is-ancestor'>
                    <div className="field has-addons">
                        <div className="control has-icons-left">
                            <input 
                                className="input is-danger is-light"
                                type="text"
                                placeholder="Add task"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)} 
                                onKeyDown = {(e)=>{if (e.key === 'Enter'){AddTodo()}}}
                            />
                            <span className="icon is-small is-left">
                                <i className="fa-solid fa-plus"></i>
                            </span>
                        </div>
                        <div className="control">
                            <button className="button is-danger is-light" onClick={AddTodo}>
                                Save
                            </button>
                        </div> 
                    </div>
                </div>
                </div>
            </div>
            </>
        );   
    }
}
