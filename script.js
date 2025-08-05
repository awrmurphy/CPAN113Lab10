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