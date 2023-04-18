"use strict";

window.addEventListener("load", initApp);

const endpoint = "https://rest-db-33a92-default-rtdb.europe-west1.firebasedatabase.app";

async function initApp() {
  const posts = await getPosts(`${endpoint}/posts.json`);
  console.log(posts);
  for (const post of posts) {
    showPost(post);
  }
  const users = await getUsers(`${endpoint}/users.json`);
  console.log(users);
  for (const user of users) {
    showPost(user);
  }
}

async function getPosts(url) {
  const response = await fetch(url);
  const data = await response.json();
  return prepareData(data);
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

function showPost(post) {
  console.log(post);
  document.querySelector("#posts").insertAdjacentHTML(
    "beforeend",
    /*html*/ `
          <div>
          <p>${post.title}</p>
          <img src="${post.image}"></img>
          <p>${post.id}</p>
          <p>${post.body}</p>
          </div>
 `
  );
}

function showUser(user) {
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

