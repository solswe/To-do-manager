const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const today = new Date().toISOString().substring(0, 10);

export async function getUndoneTodos(userId, authToken){
    const result = await fetch(backend_base+"/toods?complete=false",{
        'method': 'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Accept': 'application/json'
        } 
    })
    return await result.json();
}

export async function getTodoWithID(userId, todoItem, authToken){
    const result = await fetch(backend_base+"/toods/"+todoItem,{
        'method': 'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Accept': 'application/json'
        } 
    })
    return await result.json();
}

export async function getDoneTodos(userId, authToken){
    const result = await fetch(backend_base+"/toods?complete=true",{
        'method': 'GET',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Accept': 'application/json'
        } 
    })
    return await result.json();
}


export async function addNewTodo(userId, newTodo, authToken){
    const result = await fetch(backend_base+"/toods", {
        'method': 'POST',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            user: userId,
            item: newTodo,
            complete: false,
            createDate: today
        })
    });
    
    return await result.json();
}

export async function setComplete(userId, id, todoItem, date, authToken) {
    const result = await fetch(backend_base+"/toods/"+id,{
        'method':'PATCH',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            user: userId,
            item: todoItem,
            complete: true,
            createDate: date
        })
    })
    return await result.json();
}

export async function deleteTodo(userId, todoItem, authToken) {
    const result = await fetch(backend_base+"/toods/"+todoItem, {
        'method':'DELETE',
        'headers': {
            'Authorization': 'Bearer ' + authToken
        }
    })
    return await result.json();
}