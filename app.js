"use strict";

window.addEventListener("load", initApp);

const endpoint = "https://rest-db-33a92-default-rtdb.europe-west1.firebasedatabase.app";

async function initApp() {
  updatePostsGrid();
  const posts = await getPosts(`${endpoint}/posts.json`);
  console.log(posts);
  for (const post of posts) {
    showPosts(post);
  }
  const users = await getUsers(`${endpoint}/users.json`);
  console.log(users);
  for (const user of users) {
    showPosts(user);
  }
  createPost(
    "images.unsplash.com/photo-1642034554560-a344b6f059dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyOTA4MTB8MHwxfGFsbHw3fHx8fHx8Mnx8MTY0MjA3NTAwMQ&ixlib=rb-1.2.1&q=80&w=400",
    "ullabadullahansen@idiot.dk",
    "Ulla Badulla Hansen",
    "72 24 12 09",
    "Tutor test"
  );
}

async function deletePost(id) {
		const url = `${endpoint}/posts/${id}.json`;
    const response = await fetch(url, { method: "DELETE" });
    console.log(response);
}

// CREATE (POST) //
async function createPost(image, mail, name, phone, title) {
  const newPost = {
    image: image,
    mail: mail,
    name: name,
    phone: phone,
    title: title,
  };
  console.log(newPost);
  const postAsJson = JSON.stringify(newPost);
  const response = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: postAsJson,
  });

  const json = await response.json();
  console.log(json);
  showPosts(newPost);
}

// UPDATE (PUT) //
async function updatePost(id, title, image) {
  const postToUpdate = { title, image };
  const postAsJson = JSON.stringify(postToUpdate);
  const url = `${endpoint}/posts/${id}.json`;

  const res = await fetch(url, { method: "PUT", body: postAsJson });
  const data = await res.json();
  console.log(data);
}

// DELETE (DELETE) //
async function deletePost(id) {
  const url = `${endpoint}/posts/${id}.json`;
  const response = await fetch(url, { method: "DELETE" });
  console.log(response);
  if (response.ok) {
    updatePostsGrid();
  }
}

async function getPosts(url) {
  const response = await fetch(url);
  const data = await response.json();
  return prepareData(data);
}

async function updatePostsGrid() {
  const postList = await getPosts();
  showPosts(postList);
}

async function getUsers(url) {
  const response = await fetch(url);
  const data = await response.json();
  return prepareData(data);
}

function prepareData(dataObject) {
  const postArray = [];
  for (const key in dataObject) {
    const post = dataObject[key];
    post.id = key;
    console.log(post);
    postArray.push(post);
  }
  console.log(postArray);
  return postArray;
}

function showPosts(posts) {
  document.querySelector("#posts").innerHTML = "";
  for (const post of posts) {
    showPostInDom(post);
  }
}

function showPostInDom(post) {
  console.log(post);
  document.querySelector("#posts").insertAdjacentHTML(
    "beforeend",
    /*html*/ `
          <div>
          <p>${post.title}</p>
          <img src="${post.image}"></img>
          <p>${post.id}</p>
          <p>${post.body}</p>
          <p id="btns">
          <button class="btn-delete">Delete</button>
            <button class="btn-update">Update</button>
          ></p>
          </div>
 `
  );

  document.querySelector("#posts p:last-child .btn-delete").addEventListener("click", deleteClicked);
  document.querySelector("#posts p:last-child .btn-update").addEventListener("click", updateClicked);
}

function deleteClicked() {
  deletePost(post.id);
}

function updateClicked() {
  updatePost(post.id, title, body, image);
}

function showUsers(users) {
  for (const user of users) {
    showUserInDom(user);
  }
}

function showUserInDom(user) {
  console.log(user);
  document.querySelector("#users").insertAdjacentHTML(
    "beforeend",
    /*html*/ `
          <div>
          <img src="${user.image}"></img>
          <p>${user.mail}</p>
          <p>${user.name}</p>
          <p>${user.phone}</p>
          <p>${user.title}</p>
          </div>
 `
  );
}

