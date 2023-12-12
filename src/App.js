import React, { useState } from "react";
import { database, ref, set, update, onValue } from "./config/firebase";

const App = () => {
  const [userData, setUserData] = useState({});
  const [status, setStatus] = useState("");

  const [fetchUserList, setFetchUserList] = useState([]);

  //ON TRANSACTION TO PREVENT .... LETS SAY WHEN YOU TRANSFER MONEY TO OTHER YOU CANNOT KEEP ON PRESSING THE BUTTON ONCE THE TRANSACTION PROCEED UNTIL ITS COMPLETED YOU MUST PREVENT

  //we create event handler for onchange event of the input fields..it is called whenever the value of an input field changes
  //the e.target.name correspond to the name attribute of the input field to the new value
  //the e.target.value the current value of the input field
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  //set is used  to insert the values inside database
  //ref is used to .. reference to which collection.. which node..which portion
  //the name of the database is set to database ,,,so we are referencing to the database  called database .. that was imported from firebase.js

  //here its written users/ so it will create a collection  named users inside the database users/ it will crea
  // in sql its called table but in nosql its called collection
  //json format like below
  //   {
  //    users: {
  //       123: {

  //       }
  //    }
  //   }

  //using SET TO insert the data inside the database

  // const insertUser = () => {
  //   setStatus("Inserting....");
  //   set(ref(database, "users/" + Date.now()), {
  //     ...userData,
  //   }).then((error) => {
  //     if (error) console.log("error occured during insertion to DB");
  //     else setStatus("successfully inserted to database");
  //   });
  // };

  //DELETING THE USER FROM THE DATABASE WE WILL USE SET FUNCTION AND SET THE DATA TO NULL INSTEAD OF ...USERDATA
  //instead of object userData we will provide null data here so to delete the data from the database
  // const deleteUser = () => {
  //   setStatus("Deleting....");
  //   set(ref(database, "users/" + userData.userID), null).then((error) => {
  //     if (error) setStatus("error occured during deletion to DB");
  //     else setStatus("successfully deleted from database");
  //   });
  // };

  //for in it will display the indx value of the object
  //SNAPSHOT HOLDS ALL THE DATA SO WE CAN PLAY WITH THE DATA ..
  const fetchUsers = () => {
    let _data = [];
    console.log(_data);
    setStatus("fetching data....");
    onValue(ref(database, "users/"), (snapshot) => {
      if (snapshot) {
        let _userList = snapshot.val();
        console.log(_userList);

        for (let i in _userList) {
          _data.push(_userList[i]);
        }
        setFetchUserList(_data);
        setStatus("fetched successfully");
      }
    });
  };
  //UPDATE THE USER FUNCTION USING UPDATE METHOD
  // const updateUser = () => {
  //   setStatus("updating....");
  //   update(ref(database, "users/" + userData.userID), {
  //     ...userData,
  //   }).then((error) => {
  //     if (error) console.log("error occured during updating  to DB");
  //     else setStatus("successfully updated to database");
  //   });
  // };
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // insertUser();
          // updateUser();
          // deleteUser();
          fetchUsers();
        }}
        autoComplete="off"
      >
        <input type="number" name="userID" placeholder="User ID" onChange={(e) => handleChange(e)} /> <br />
        <input type="text" name="username" placeholder="name" onChange={(e) => handleChange(e)} /> <br />
        <input type="text" name="address" placeholder="address" onChange={(e) => handleChange(e)} />
        {/* <button type="submit">submit</button> */}
        {/* <button type="submit">Update User</button> */}
        {/* <button type="submit">Delete User</button> */}
        <button type="submit">Fetch users</button>
      </form>

      {fetchUserList.map((user, index) => {
        return (
          <div key={index} style={{ padding: "20px", border: "1px dashed blue", marginTop: "12px" }}>
            {" "}
            {user.username} <br /> {user.address}
          </div>
        );
      })}
      <div style={{ height: "20px", width: "100vw", backgroundColor: "blue", color: "white", textAlign: "center", position: "fixed", bottom: "0px" }}>{status}</div>
    </div>
  );
};
export default App;

// import React, { useState } from "react";

// const App = () => {
//   const [userData, setUserData] = useState({});

//the initital value is in object so we pass in object here userData holds the data so to get that data we use spread operator
//fullname is assigned to name

//we are passing event.target.name and value
//when
//   const handleChange = (event) => {
//     event.preventDefault();
//     setUserData({ ...userData, [event.target.name]: event.target.value });
//     console.log(event);
//   };

//   return (
//     <div>
//       <form>
//         <input type="text" name="fullname" placeholder="Full Name" onChange={(event) => handleChange(event)} />
//         <br />
//         <input type="text" name="address" placeholder="Address" onChange={handleChange} />
//         <button type="submit">Add user</button>
//       </form>
//     </div>
//   );
// };

// export default App;
