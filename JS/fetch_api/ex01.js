//Các cách gọi API từ JS
//1. fetch()
//2. XMLHttpRequest()
//3. Thư viện: jquery ajax, axios, node fetch,...
const userApiUrl = "http://localhost:3000/users";

// fetch(userApiUrl)
//    .then((response) => response.json())
//    .then((data) => {
//       console.log(data);
//    });

// const getUsers = async () => {
//    const response = await fetch(userApiUrl);
//    const data = await response.json();
//    console.log(data);
// };

// getUsers();

// const addUser = async (data) => {
//    const response = await fetch(userApiUrl, {
//       method: "POST",
//       headers: {
//          "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//    });

//    console.log(response);
// };

// addUser({ name: "user 6", email: "user6@gmail.com", status: "active" });

// const updateUser = async (id, data) => {
//    // userApiUrl = http://localhost:3000/users + / + id
//    const response = await fetch(userApiUrl + "/" + id, {
//       method: "PATCH",
//       headers: {
//          "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//    });
//    console.log(response);
// };

// updateUser(5, { name: "user 5", email: "user5@gmail.com", status: "active" });

// const deleteUser = async (id) => {
//    const response = await fetch(userApiUrl + "/" + id, {
//       method: "DELETE",
//    });
//    console.log(response);
// };

// deleteUser(1);
