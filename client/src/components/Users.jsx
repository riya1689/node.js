import React,{use, useState} from 'react';
const Users = ({usersPromise})=>{
    const initialUsers = use(usersPromise);
    const [users, setUser] = useState(initialUsers)
    //const users = use(usersPromise);
    console.log(users);
    //onSubmit info need to go to server
    const handleAddUser =e =>{
        e.preventDefault();
        const name= e.target.name.value;
        const email=e.target.email.value;
        const user ={name, email}
        console.log(user);
        /**
         * mention method
         * create user
         * what type of data
         */
        //create user in the server
        fetch('http://localhost:3000/users',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data =>{
            console.log('data after post',data);
            const newUsers =[...users, data];
            setUser(newUsers);
            e.target.reset();//reset default after submit 
        })
    }
    return(
        <div>

            <form onSubmit={handleAddUser}>
                <input name='name' type="text" />
                <br />
                <input name='email' type="email" />
                <br />
                <input type="submit" value="Add user" />
            </form>
            <div>
                {
                users.map(user=><p key={user.id}>{user.name} : {user.email}</p>)
            }
            </div>
        </div>
    );
};

export default Users;