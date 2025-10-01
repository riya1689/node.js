
import Users from './components/Users'
import './App.css'

const usersPromise = fetch('http://localhost:5000/users').then(res => res.json());
function App() {
  return (
    <>
      
      <h1>simple CRUD operation</h1>
      <Users usersPromise={usersPromise}></Users>
    </>
  )
}

export default App
