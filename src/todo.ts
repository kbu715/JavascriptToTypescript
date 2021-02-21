export {}

interface ToDoType {
    text: string;
    id: number;
}

const toDoForm = document.querySelector(".js-toDoForm") as HTMLFormElement,
    toDoInput = toDoForm.querySelector("input") as HTMLInputElement,
    toDoList = document.querySelector(".js-toDoList") as HTMLUListElement;

const TODOS_LS = 'toDos';

let toDos: ToDoType[] = [];



function deleteToDo(event: MouseEvent): void{
    
    const btn = event.target as Node;
    const li = btn.parentNode as HTMLLIElement;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo: ToDoType){
        return toDo.id !== parseInt(li.id); //li.id 가 문자열
    }); 
    console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(): void{
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //자바스크립트는 local storage에 있는 모든 데이터를 string으로 저장하려고 한다.
}

function paintToDo(text: string): void{
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener('click', deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId.toString();
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event: Event): void{
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(): void{
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos: ToDoType[] = JSON.parse(loadedToDos); //parse: 자바스크립트 object로 변환!!!
        parsedToDos.forEach((toDo: ToDoType) => {
            paintToDo(toDo.text);
        });
    }
    console.log(toDos);
}

function init(): void{
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
};

init();