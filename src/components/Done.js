import 'bulma/css/bulma.min.css';
import Link from 'next/link';
import { useClerk } from "@clerk/clerk-react";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import { getDoneTodos } from "../modules/data";

export default function Done() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [doneTodos, setDoneTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function process() {
        if (userId) {
          const token = await getToken({ template: "codehooks" });
          setDoneTodos(await getDoneTodos(userId, token));
          setLoading(false);
        }
      }
      process();
  }, [isLoaded]);

    
  function redirect(){
    const router = useRouter();
    router.push('/todos'); 
  };

  function TodoList(list) {
    return (
        doneTodos.map((todo, index) => {
        return (
          <tr key={index}>
            <td>{todo.item}</td>
            <td>{todo.category}</td>
            <td>
              <button className='button is-rounded is-small is-danger'>Done!</button>
            </td>
          </tr>
        )
      })
    )
};

  return (
    <div>
      <div className="container">
        <div className='columns is-ancestor'>
          <div className='column is-three-fifths'>
            <label className="label">{doneTodos.length} things you did</label>
            <table className='table'>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                <TodoList list={doneTodos}></TodoList>                            
              </tbody>
            </table>
          </div>
          <div className='column'>
            <button className="button is-danger is-light">
                <Link href="/todos" className='is-link'>
                  Go to your to-do list
                </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
