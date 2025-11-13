import React from 'react';
import { useState } from 'react';
import { use } from 'react';
const Users =({usersPromise})=>{
    const initialUsers = use(usersPromise);
    const [users, setUsers] = useState(initialUsers)
    console.log(initialUsers);
    const handleAddUser = e =>{
        e.preventDefault();
        const name = e.target.name.value;
        const email= e.target.email.value;
        const newUser={name, email}
        console.log(newUser);
        //create user (client side) in the db (using the fetch API)
        fetch('http://localhost:5000/users',{
            method:'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(newUser)
        }) 
        .then(res => res.json())
        .then(data =>{
            console.log('data after creating user in the db', data);
            if(data.insertedId){
                newUser._id = data.insertedId;
                const newUsers =[...users, newUser];
                setUsers(newUsers);
                alert('user added successfully.')
                e.target.reset();
            }

        })
    }
    const handleUserDelete =(id) =>{
        console.log('delete this user', id)
        fetch(`http://localhost:5000/users/${id}`,{
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data =>{
                if(data.deletedCount){
                    const remainingUsers = users.filter(user => user._id !== id);
                    setUsers(remainingUsers);
                    console.log('after delete', data);
                }
            })
        
    }
    return(
        <div>
            <div>
                {/* add User */}
                <h4>User: {users.length}</h4>
                <form onSubmit={handleAddUser}>
                    <input type="text" name='name' />
                    <br />
                    <input type="email" name='email' />
                    <br />
                    <input type="submit" value="Add User" />
                </form>
            </div>
                {/* view users */}
                <div>
                    {
                        users.map(user => <p 
                            key={user._id}>
                                {user.name} : {user.email}
                                <button onClick={() => handleUserDelete(user._id)}>x</button>
                                </p>)
                                
                    }
                </div>
        </div>
    );
};
export default Users;