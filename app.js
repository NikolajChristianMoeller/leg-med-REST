"use strict";

// GLOBAL VARIABLES //

const endpoint = "https://rest-db-33a92-default-rtdb.europe-west1.firebasedatabase.app";

// LOAD AND INIT APP //

window.addEventListener("load", initApp);

async function initApp() {
  updatePostsGrid();
  const posts = await getPosts(`${endpoint}/posts.json`);
  console.log(posts);
  for (const post of posts) {
    showPostInDom(post);
  }
  const users = await getUsers(`${endpoint}/users.json`);
  console.log(users);
  for (const user of users) {
    showUserInDom(user);
  }
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
  for (const post in posts) {
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

  function updateClicked() {
    updatePost(post.id, title, body, image);
  }

  function deleteClicked() {
    deletePost(post.id);
  }
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


// SEARCH FUNCTION //
function inputSearchChanged(event) {
  const value = event.target.value;
  const postsToShow = searchPosts(value);
  showPosts(postsToShow);
}

function searchPosts(searchValue) {
    searchValue = searchValue.toLowerCase();

    const results = posts.filter(checkTitle);

function checkTitle(post) {
    const title = post.title.toLowerCase();
    return title.includes(searchValue);
  }

  return results;
}

// SORT FUNCTION //
posts.sort(compareTitle);

function compareTitle(post1, post2) {
    return post1.title.localeCompare(post2.title);
}

posts.sort(compareBody);

function compareBody(post1, post2) {
    return post1.body.localeCompare(post2.body);
}

// FILTER FUNCTION //
function checkTitle(post) {
    const title = post.title.toLowerCase();
    return title.includes(searchValue);
}

// FIND FUNCTION //
function findPostById() {
    const result = posts.find(matchId);

    function matchId(post) {
        return post.id === id;
    }

    return result;
}

// HELPER FUNCTION //
// convert object of objects til an array of objects
function prepareData(dataObject) {
  const array = []; // define empty array
  // loop through every key in dataObject
  // the value of every key is an object
  for (const key in dataObject) {
    const object = dataObject[key]; // define object
    object.id = key; // add the key in the prop id
    array.push(object); // add the object to array
  }
  return array; // return array back to "the caller"
}