import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
    const user = { name, email };

    //post data to server
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json)
      .then((data) => {
        const newUsers = [...user, data];
        setUsers(newUsers);
        console.log("Success:", data);
      });
  };
  return (
    <div className="App">
      <h1>My own data: {users.length} </h1>
      <form onSubmit={handleUser}>
        <input type="text" name="name" placeholder="Your Name" id="" required />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          id=""
          required
        />
        <input type="submit" value="Add User" />
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Id: {user.id}, Name: {user.name}, Email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
