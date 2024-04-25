
import { useEffect, useState } from 'react'

import './App.css'


function App() {
  
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:5000/users")
    .then(res => res.json())
    .then(data => setUsers(data));
  },[])

  const handleAddUser =  (e) => {
    e.preventDefault();
    const form = e.target;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const id = users.length + 1;
    const user = {id ,name, email}
    //sending data to backend
    fetch('http://localhost:5000/users',{
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log('inside post response', data);
      const newUsers = [...users, data]
      setUsers(newUsers);
      form.reset();
      
    })
    
  }
  return (
    <>
      
      <h1>Users Management system</h1>
      <h3>Numbers of user : {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='your name' required/>
        <br />
        <input type="email" name='email' placeholder='email'/>
        <br />
        <input type="submit" required/>
      </form>
      <div>
        {
          users.map(user => <p key={user.id} >{user.id} 
           {user.name} {user.email}</p>)
        }
      </div>
    </>
  )
}

export default App
