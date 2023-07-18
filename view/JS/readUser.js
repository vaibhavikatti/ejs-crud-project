const userDOM = document.querySelector('#users');


(function(){
    fetch(`http://localhost:4500/api/user/all`,{
        method:"GET",
        headers:{"Content-type":"application/json"}
    }).then(out => out.json())
    .then(res=>{
        console.log('user data =',res)
        printData(res.users)
    }).catch(err=>console.log(err.message))
})()

//print user data
function printData(users){
    users.forEach((item) => {
        userDOM.innerHTML += `<div class="col-md-4 mt-2 mb-2">
        <div class="card">
        <div class="card-header">
        <h4 class="text-success text-uppercase">${item.name}</h4>
        </div>
        <div class="card-body">
        <ul class="list-group">
                <li class="list-group-item">
                    <strong>Email</strong>
                    <span class="float-end text-success">${item.email}</span>
                </li>
                <li class="list-group-item">
                    <strong>Mobile</strong>
                    <span class="float-end text-success">${item.mobile}</span>
                </li>
                <li class="list-group-item">
                    <strong>Age</strong>
                    <span class="float-end text-success">${item.age}</span>
                </li>
        </ul>
          </div>
        
                <div class="card-footer">
                <a href="/edit?id=${item._id}" class="btn btn-info">Edit</a>
                <button onClick=" deleteUser('${item._id}')" class="btn btn-danger float-end">Delete</button>
                </div>
          </div>
    </div>`
    });


}

//delete user data
function deleteUser(id){
    if(window.confirm(`Are you sure to delete user `)){
        console.log(`user id =`,id);
        fetch(`http://localhost:4500/api/user/${id}`,{
            method:"DELETE",
            headers:{"Content-type":"application/json"}
        }).then(out => out.json())
        .then(res => 
            {
                alert(res.msg);
                window.location.reload();
            }
        ).catch(err => console.log(err.message))
    }
}
