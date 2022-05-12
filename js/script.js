var inputData = document.querySelector('#inputTask');
var btnAddTask = document.querySelector('#btn-add');
var btnInfo = document.querySelector('#btn-info');
var ulList = document.querySelector('#list');
var spans = document.getElementsByTagName('span');
var dataTask = new Date().toLocaleDateString();
var infoDev = document.querySelector('#btn-info');
var infoModal = document.querySelector('.modals');
var activeSum = document.querySelector('.active');
var noActiveSum = document.querySelector('.no-active');
var active = 1;
var noActive = 1;

function createTask() {
    var inputValue = inputData.value;

    if (inputData.value == '') {
        alert('Введите название');
    } else {
        var newLi = document.createElement('li');
        newLi.innerText = inputValue;
        activeSum.innerHTML = active++;

        var newSpan = document.createElement('span');
        newSpan.innerText = ' DELETE';

        var newData = document.createElement('div');
        newData.innerText = dataTask;

        newLi.append(newSpan);
        newLi.append(newData);
        ulList.append(newLi);
    }

    newLi.addEventListener('click', function () {
        newLi.classList.add('line-through');
        noActiveSum.innerHTML = noActive++;
    });

    removeTask();
}

btnAddTask.onclick = createTask;

function removeTask() {
    for (let spanItem of spans) {
        spanItem.onclick = function () {
            spanItem.parentElement.remove();
        }
    }
}

removeTask();

infoDev.addEventListener('click', function () {
    infoModal.classList.toggle('modals__block');
});



