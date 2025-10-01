import React from 'react';
import { use } from 'react';
const Users =({usersPromise})=>{
    const initialUsers = use(usersPromise);
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
                alert('user added successfully.')
                e.target.reset();
            }

        })
    }
    return(
        <div>
            <div>
                {/* add User */}
                <form onSubmit={handleAddUser}>
                    <input type="text" name='name' />
                    <br />
                    <input type="email" name='email' />
                    <br />
                    <input type="submit" value="Add User" />
                </form>
            </div>

        </div>
    );
};
export default Users;