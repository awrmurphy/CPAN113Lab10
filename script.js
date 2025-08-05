document.getElementById("fetch").addEventListener("click",function(){
    fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => {
        if (!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data =>{
        console.log(data);
        display(data);
    })
    .catch(error => console.error("Error fetching data: ",error))
});

function display(data){
    const dataDiv = document.getElementById('dataHere');
    dataDiv.innerHTML = '';

    const title = document.createElement('h1');
    title.innerHTML=data.title;
    const postContent = document.createElement('p');
    postContent.innerHTML=data.body;
    dataDiv.appendChild(title);
    dataDiv.appendChild(document.createElement("br"));
    dataDiv.appendChild(postContent);
}

document.getElementById("xhr").addEventListener('click',function(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET',"https://jsonplaceholder.typicode.com/posts/2",true);

    xhr.onreadystatechange = function(){
        if (xhr.readyState===4){
            if(xhr.status===200){
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                display(data);
            } else{
                console.error('Error fetching data: ',xhr.statusText);
            }
        }
        
    };
    xhr.send();
});

document.getElementById("post").addEventListener('click',function(){
    event.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts",{
        method: "POST",

        body: JSON.stringify({
            userId: document.getElementById("userId").value,
            id: document.getElementById("postId").value,
            title: document.getElementById("userTitle").value ,
            body: document.getElementById("userContent").value
        }),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8'
        }

    }    )
    .then((response) => response.json())
  .then((json) =>{
     console.log(json)
     alert("Post Successful!")
  })
  .catch(error => console.error("Error uploading data: "+error))
});

document.getElementById("update").addEventListener('click',function(){
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    const postId = document.getElementById("postId").value;
    const post =JSON.stringify({
        userId: document.getElementById("userId").value,
        id: postId,
        title: document.getElementById("userTitle").value,
        body: document.getElementById("userContent").value
    });
    xhr.open('PUT',`https://jsonplaceholder.typicode.com/posts/${postId}`,true);

    xhr.onreadystatechange = function(){
        if (xhr.readyState===4){
            if(xhr.status===200){
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                display(data);
            } else{
                console.error('Error fetching data: ',xhr.statusText);
            }
        }
        
    };
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(post);
})