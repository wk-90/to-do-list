

const toDolist = [];  //Array to store future tasks

// variables with selected elements
const addForm = document.querySelector('.add-item');
const ul = document.querySelector('ul.main-list');
const taskNumber = document.querySelector('h2 span');
const addInput = document.querySelector('#add-input');
const searchInput = document.querySelector('#search-input');



// main function
const addTask = (e) => {
    e.preventDefault();
    
    const titleTask = addInput.value;

    if(titleTask === "") return; //jeśli input Title Task pozostanie pusty, po kliknięciu 'Dodaj' nic się nie wykona
    const task = document.createElement('li');
    task.className = 'list-group-item';
    task.innerHTML = '<button class="btn btn-light"> <i class="fa fa-check"></i> </button>' + '<span>' + titleTask + '</span>' + `<button class="btn btn-danger"> <i class="fa fa-trash"></i> </button>`;
    toDolist.push(task);

    renderList();
    
    ul.appendChild(task);
    addInput.value = ""
    task.scrollIntoView();

    const btnCheck = task.querySelector('.btn-light');
    
    // checking/unchecking tasks
    let flag = true;
    const btnChange = ()=> {
        if(flag) {
        btnCheck.className = 'btn btn-success';   
        task.style.backgroundColor = 'lightgreen';
        flag = false;       
        } else {
            btnCheck.className = 'btn btn-light';
            task.style.backgroundColor = '#fff';
            flag = true;           
        } 
    }
    task.querySelector('button.btn-light').addEventListener('click', btnChange);
    
    task.querySelector('button.btn-danger').addEventListener('click', removeTask);
    taskNumber.textContent = toDolist.length;
    
    scrollList();  
    
}


addForm.addEventListener('submit', addTask);


const btnDeleteAll = document.querySelector('.delete-items .btn-danger')

// deleting all tasks
const deleteAll = ()=> {
    toDolist.splice(0);
    renderList();
    taskNumber.textContent = toDolist.length;
    scrollList();
}


btnDeleteAll.addEventListener('click', deleteAll);


// deleting each task
const removeTask = (e) => {
    // e.target.parentNode.remove();
    const index = e.target.parentNode.dataset.key;
    toDolist.splice(index, 1);
    taskNumber.textContent = toDolist.length;
    
    renderList();
    scrollList();
}

//giving tasks proper id, key
const renderList = () => {
    ul.textContent = "";
    toDolist.forEach((toDoElement, key) => {
        toDoElement.id = key;  
        toDoElement.dataset.key = key;
        ul.appendChild(toDoElement)
    })
}

// search tasks
const searchTask = (e)=> {
    const searchText = e.target.value.toLowerCase();
    let tasks = toDolist;
    tasks = tasks.filter(li=> li.textContent.toLowerCase().includes(searchText));
    ul.textContent = "";
    tasks.forEach(li=> ul.appendChild(li))
    console.log(tasks);
     
}

searchInput.addEventListener('input', searchTask);

// scrolling window to the top (inputs area) after click btnUp button 
const btnUp = document.querySelector('.btn-up');
    btnUp.addEventListener('click', ()=> {
    addForm.scrollIntoView({behavior: "smooth"});
    })

// showing btnUp button 
const scrollList = ()=> {   
    if(window.scrollY > 0) {
    btnUp.style.display = "block";
    } else {
        btnUp.style.display = "none";
    }
}







