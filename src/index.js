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
  localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
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

  const requestUrl = 'https://jordan.ashton.fashion/api/goods/30/comments';
  const pagination = document.getElementById("pagination");

 function getUrl(){
    fetch(requestUrl)
        .then((res) => res.json())
        .then((data) => {
        for(let i = 0; i < data.links.length; i++){
            if(JSON.stringify(data.links[i].label).match("&laquo; Previous")){
                pagination.innerHTML += `<li><a id="previous" style="pointer-events: none">
                ${data.links[i].label}</a></li>`;
                i++
            }
            if(JSON.stringify(data.links[i].label).match("Next &raquo;")){
                pagination.innerHTML += `<li><a id="next" style="pointer-events: none">
                ${data.links[i].label}</a></li>`;
                return;
            }
           pagination.innerHTML += `<li><a onclick=getResponse(${JSON.stringify(data.links[i].url)}) style="pointer-events: none">
           ${data.links[i].label}</a></li>`;
        }
    })
    }
    getUrl();
