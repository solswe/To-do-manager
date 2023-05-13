import 'bulma/css/bulma.min.css';
import { useRouter } from "next/router";

export default function wrongPage() {

    const router = useRouter();
    
    function redirect(){
        router.push('/todos'); 
    };

    return (
        <div>
            <h1>Page is not found</h1>
            <br></br>
            <button className="button is-danger" onClick={redirect} >
                Click to see your todo list
            </button>
        </div>
    );
  }