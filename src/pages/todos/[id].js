import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { getTodoWithID, deleteTodo, setComplete } from "../../modules/data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useClerk } from "@clerk/clerk-react";
import Link from 'next/link';


export default function OneTodo() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [todo, setTodo] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        async function process() {
          if (userId) {
            const token = await getToken({ template: "codehooks" });
            setTodo(await getTodoWithID(userId, id, token));
            setLoading(false);
          }
        }
        process();
    }, [isLoaded]);

    async function CompleteTodo(todo) {
        const token = await getToken({ template: "codehooks" });
        const complete = await setComplete(userId, id, id.item, id.createDate, token);
        // setNewTodo("");
        setTodo(getTodoWithID(userId, id, token));
    };

    async function DeleteTodo(todo) {
        const token = await getToken({ template: "codehooks" });
        try {
            await deleteTodo(userId, id, token);
          } catch (e) {
            console.log(e);
          }
          setTodo(getTodoWithID(userId, id, token));
    };


    if (loading){
        return(
            <div className="container">
                <div className='columns is-ancestor'>
                    <div className='column is-three-fifths'>
                        <p>Loading...</p>
                    </div>
                    <div className="column">
                        <button className="button is-danger is-light">
                            <Link href="/todos" className='is-link'>
                              Go to your to-do list
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        )
    } else{
        return (
            <>
                {console.log(todo)}
                <div className="container">
                    <div className='columns is-ancestor'>
                        <div className='column is-three-fifths'>
                            <label className="label">{todo.item}</label>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        {/* <th>Category</th> */}
                                        <th>Created date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={id}>
                                        {/* <td>{todo.item}</td> */}
                                        <td>{todo.createDate}</td>
                                        {todo.complete? (<td>Done</td>) : <td>Incomplete</td>}
                                    </tr>                         
                                </tbody>
                            </table>
                            <button className='button is-rounded is-small is-danger' onClick={() => CompleteTodo(todo)}>
                                <FontAwesomeIcon icon={faCheck} style={{color: "#ffffff",}} />
                            </button>
                            <button className='button is-rounded is-small is-danger' onClick={() => DeleteTodo(todo)}>
                                <FontAwesomeIcon icon={faTrashCan} style={{color: "#ffffff",}} />
                            </button>
                        </div>    
                        <div className="column">
                            <button className="button is-danger is-light">
                                <Link href="/todos" className='is-link'>
                                Go to your to-do list
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )   
    }
}
