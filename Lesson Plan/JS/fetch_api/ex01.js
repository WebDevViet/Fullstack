//Các cách gọi API từ JS
//1. fetch()
//2. XMLHttpRequest()
//3. Thư viện: jquery ajax, axios, node fetch,...
const userApiUrl = `http://localhost:3000/users`;

// fetch(userApiUrl)
//   .then((response) => {
//     //response.text() và response.json() ==> Promise có chứa response body từ server
//     // return response.text();
//     return response.json();
//   })
//   .then((data) => {
//     // data = JSON.parse(data);
//     console.log(data);
//   });

// const getUsers = async () => {
//   const response = await fetch(userApiUrl);
//   const data = await response.json();
//   console.log(data);
// };
// getUsers();

//http://localhost:3000/users/2

// const addUser = async (data) => {
//   const response = await fetch(userApiUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: JSON.stringify(data),
//   });
//   console.log(response);
// };

// addUser({
//   name: "User 5",
//   email: "user5@gmail.com",
//   status: "active",
// });

//urlencoded: name=hoangan&email=hoangan.gmail.com&status=active

const updateUser = async (id, data) => {
   const response = await fetch(userApiUrl + "/" + id, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
         // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data),
   });
   console.log(response);
};
// updateUser(1, {
//   name: "User 111",
//   email: "user111@gmail.com",
// });

const deleteUser = async (id) => {
   const response = await fetch(userApiUrl + "/" + id, {
      method: "DELETE",
   });
   console.log(response);
};
// deleteUser(1);

//C = Create
//R = Read
//U = Update
//D = Delete
