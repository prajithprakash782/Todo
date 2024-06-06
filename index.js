let todos = []
let currentView = 'all';
const eve = document.querySelector(".inp")
let drop = document.querySelector("#drop")
let lt = document.querySelector(".list")
let items = document.querySelector(".items")
let footer = document.querySelector(".btn")
let tab = document.querySelectorAll(".tab")
let footerChild;

function addTask(task) {
    todos.unshift({
        todo: task,
        status: false,
    });
    // TODO: Clear the input placeholder
    eve.value = ""

}

function deleteTask(index) {
    console.log(index);
    todos.splice(index, 1);
    renderTasks();
}

lt.addEventListener("click", (e) => {
    // console.log({ e });
    const { index } = e.target.dataset;
    if (e.target.className === 'delete') {
        deleteTask(index);
    }

    if (e.target.className === 'checkbox') {

        completedTasks(index)
        // toggleCompleted()
    }

});

function completedTasks(todoIndex) {

    todos.forEach((item, index) => {
        console.log(todoIndex, index);
        if (todoIndex == index) {
            item['status'] = !item['status'];

        }
        renderTasks()
    });
    // console.log(todos);

}
//Completed Tasks
function completedView() {

    currentView = 'completed';
    let tempTasks = todos;
    todos = todos.filter(task => task["status"] == true);

    renderTasks();

    todos = tempTasks;
}
//All Tasks
function allTasks() {

    currentView = 'all';
    tab.forEach(node=>{
        if(currentView === "all"){
            node.classList.add("selected-border")
        }
        else{
            node.classList.remove("selected-border")
        }
    })
        
    
    renderTasks();

}
//Active Tasks
function activeTasks() {
    let tempTasks = todos;
    currentView = 'active';
    const activeTasksArr = todos.filter(task => task["status"] == false);
    todos = activeTasksArr;
    renderTasks();
    todos = tempTasks;
}
//Clear Completed Tasks
function clearCompleted() {

    todos = todos.filter(task => task["status"] == false);
    if (currentView === 'completed') {
        completedView();
    }
    else if (currentView === 'active') {
        activeTasks();
    }
    else {
        allTasks();
    }
}

//Mark all 
function markAll(){
    todos.forEach((item) => {
        item['status'] = !item['status'];

        
        
})
renderTasks()
}

function getTasksByView(tasksArr, view) {
    let filteredArr = [];
    if (view === 'all') {
        filteredArr = tasksArr;
    } else {
        filteredArr = tasksArr.filter(task => {
            const { status } = task;

            if (view === 'active') {
                return status === false;
            } else if (view === 'completed') {
                return status === true;
            }
        });
    }

    return filteredArr;
}

function updateHilightTab() {
    tab.forEach(node => {
        const { tab } = node.dataset;

        if (tab === currentView) {
            node.classList.add('selected-border');
            console.log('eligible');
        } else {
            node.classList.remove('selected-border');
            console.log('not eligible');

        }
    })
}

//Display the tasks
function renderTasks() {
    lt.textContent = ""; // Clear the text content of the list before new rendering
    const tasksArrByView = getTasksByView(todos, currentView);
    tasksArrByView.forEach((item, index) => {
        let textDec = 'none';
        let checkbox = 'unchecked';

        if (item["status"] === true) {
            textDec = 'line-through'
            checkbox = 'checked'
        }


        // let node = document.createElement("li");
        // let inp = document.createElement("INPUT");
        // let btn = document.createElement("BUTTON");
        // console.log(btn);
        // inp.setAttribute("type", "checkbox");
        // btn.innerText = "X"
        // btn.setAttribute("name", "button");

        // node.textContent = `${item}`
        // node.appendChild(inp);
        // node.appendChild(btn);
        // lt.appendChild(node)
        // btn.removeChild(btn.firstElementChild);
        lt.innerHTML += 
        `<label style="text-decoration: ${textDec};" for="task">
        <input data-index="${index}" class="checkbox" type="checkbox" id="task" ${checkbox}/>
        ${item.todo}
        </label>
        <button data-index="${index}" class="delete" id="close">X</button>
        <hr>
        `
        drop.innerHTML = `<i class="fa-solid fa-angle-down"></i>`

        // let completedBorder = ""
        // let allBorder = "";
        // let activeBorder = ""
        // switch (currentView) {
        //     case "completed":
        //         // completedBorder: "1px solid rgb(206, 48, 48)";
        //         currentView.classList.add()
        //         break;

        //     case "all":
        //         allBorder: "1px solid rgb(206, 48, 48)";
        //         break;
        //     case "active":
        //         activeBorder: "1px solid rgb(206, 48,48)";
        //         break;
        //}
        // footer.innerHTML = ``
        // btn.innerHTML = `<button onclick=${toggleAll()}>All</button>
        // <button onclick=toggleActive()>Active</button>
        // <button onclick=${toggleCompleted()}>Completed</button>
        // <button onclick=clearCompleted()>Clear Completed</button>`
        const activeTasksCount = todos.filter(task => task["status"] == false).length;
        footerChild = document.querySelector('.tab')
        if (todos.length > 0) {
            items.innerHTML = `${activeTasksCount} items left`
        }
        else{
            // console.log(todos);
            todos=[]
            items.innerHTML = "0 item left"
        }
       

    })
    updateHilightTab();
}
eve.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        if (eve.value === "") {
            return
        }
        else {
            // Add the task to the list
            addTask(eve.value)

            // Render the elements
            renderTasks();
        }


        // node.innerText = ""

        // lt.appendChild(html)

        //     todos.map(items => {
        //         items.push(eve.value)
        //         list.innerHTML = `<div class="ex">
        //     <input type="radio" id="html">
        //     <label for="html">${items.value}</label>
        // </div>


        // <div class="itemser">
        //     <p>1 items left</p>
        //     <button>All</button>
        //     <button>Completed</button>
        // </div>`

        //     })
    }
})


