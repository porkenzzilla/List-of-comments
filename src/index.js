import './style.css';

let comments = [];
loadComments();

document.getElementById('comment-add').onclick = function(){
    let commentName = document.getElementById('comment-name');
    let commentText = document.getElementById('comment-text');

    let comment = {
        name : commentName.value,
        body : commentText.value,
        time : Math.floor(Date.now() / 1000)
    }

    commentName.value = '';
    commentText.value = '';

    comments.push(comment);
    saveComments();
    showComments();
}

function saveComments(){
    sessionStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
    if (sessionStorage.getItem('comments')) comments = JSON.parse(sessionStorage.getItem('comments'));
    showComments();
}

function showComments (){
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function(item){
        out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`;
        out += `<p class="alert alert-primary" role="alert">Name: <b>${item.name}</b></p>`;
        out += `<p class="alert alert-success" role="alert">Comment: <b>${item.body}</b></p>`;
    });
    commentField.innerHTML += out;
}

var xhr = new XMLHttpRequest();
var url = "url?data=" + encodeURIComponent(JSON.stringify({"email": "hey@mail.com", "password": "101010"}));
xhr.open("GET", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json.email + ", " + json.password);
    }
};
xhr.send();

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  /* code for get data */
  /* code for get data */
  /* code for get data */

const requestUrl = "https://jordan.ashton.fashion/api/goods/30/comments";
const button = document.getElementById("button");

function getResponse(){
    let commentField = document.getElementById('comment-field');
    let out = '';
   button.click( fetch(requestUrl).json()
    .then((data) => 
    JSON.stringify(data.data.map(function(item){
        out += `<p class="text-right small"><em>${item.updated_at}</em></p>`;
        out += `<p class="alert alert-primary" role="alert">Name: <b>${item.name}</b></p>`;
        out += `<p class="alert alert-success" role="alert">Comment: <b>${item.text}</b></p>`;
        commentField.innerHTML = out;
    })
    )
    ))
  };
