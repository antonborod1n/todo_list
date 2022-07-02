//todo
var inputData = document.querySelector('#inputTask');
var btnAddTask = document.querySelector('#btn-add');
var btnInfo = document.querySelector('#btn-info');
var ulList = document.querySelector('#list');
var spans = document.getElementsByTagName('span');
var dataTask = new Date().toLocaleDateString();
var infoDev = document.querySelector('#btn-info');
var infoModal = document.querySelector('.modals');
var itemLi = document.getElementsByTagName('li');
var activeSum = document.querySelector('.active');
var noActiveSum = document.querySelector('.no-active');
var newLi = document.createElement('li');

//localStorage buttons
var btnSave = document.querySelector('#btn-save');
var btnClear = document.querySelector('#btn-clear');

function createTask() {
    var inputValue = inputData.value;

    if (inputData.value.trim() === '') {
        alert('Введите название');
    } else {
        var newLi = document.createElement('li');
        newLi.innerText = inputValue;

        var newSpan = document.createElement('span');
        newSpan.innerText = ' DELETE';

        var newData = document.createElement('div');
        newData.innerText = dataTask;

        newLi.append(newSpan);
        newLi.append(newData);
        ulList.append(newLi);

        newLi.addEventListener('click', function () {
            newLi.classList.add('line-through');
            counterToDo();
        });
    }

    removeTask();
    counterToDo();
}

function removeTask() {
    for (let spanItem of spans) {
        spanItem.onclick = function () {
            spanItem.parentElement.remove();
        };
    }
}

removeTask();

function counterToDo() {
    var liSum = itemLi.length;

    //console.log(liSum);
    var classSum = document.getElementsByClassName('line-through').length;

    //console.log(classSum);

    activeSum.innerHTML = liSum - classSum;
    noActiveSum.innerHTML = classSum;
}

counterToDo();

//Модальное окно

infoDev.addEventListener('click', function () {
    infoModal.classList.toggle('modals__block');
});

//localStorage

btnSave.addEventListener('click', function () {
    let activeCounter = document.querySelector('.active').innerHTML;
    let noActiveCounter = document.querySelector('.no-active').innerHTML;
    let ulList = document.querySelector('#list').innerHTML;

    localStorage.setItem('active', activeCounter);
    localStorage.setItem('no-active', noActiveCounter);
    localStorage.setItem('item-li', ulList);
});

btnClear.addEventListener('click', function () {
    localStorage.clear();
});

function addContent() {
    activeSum.innerHTML = localStorage.getItem('active');
    noActiveSum.innerHTML = localStorage.getItem('no-active');
    ulList.innerHTML = localStorage.getItem('item-li');

    for (let key of itemLi) {
        key.onclick = function () {
            key.classList.add('line-through');
            counterToDo();
        };
    }
    removeTask();
}

addContent();

const getTodos = () => {
    fetch('https://todo-app014.herokuapp.com/api/post?id=1')
        .then(
            res => res.json()
        )
        .then(
            data => {
                //console.log(data);
                ulList.innerHTML = '';
                data.forEach(element => {
                    ulList.innerHTML += `
                <li>${element.content}<span> DELETE</span><div>02.07.2022</div></li>
                `;
                });
            }
        );
};

getTodos();


const postTodo = () => {
    var inputValue = inputData.value;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(
            {
                "title": "test",
                "content": inputValue,
                "user_id": 1
            }
        )
    };
    fetch('https://todo-app014.herokuapp.com/api/post', options).then(
        res => res.json()
    ).then(
        data => console.log(data)
    );
};


btnAddTask.addEventListener('click', postTodo);
btnAddTask.addEventListener('click', createTask);