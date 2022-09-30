import React, { useState } from "react";
import AddUser from "./components/users/AddUser";
import UsersList from "./components/users/UsersList";

function App() {
  const [usersLists, setUsersList] = useState([]);

  const onGetUserList = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        { userName: uName, age: uAge, key: Math.random() },
      ];
    });

    console.log(usersLists, " usersLists");
  };
  return (
    <>
      <AddUser onGetUserList={onGetUserList}></AddUser>
      <UsersList users={usersLists}></UsersList>
    </>
  );
}

export default App;
