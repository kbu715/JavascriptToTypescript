export {}

const form = document.querySelector(".js-form") as HTMLFormElement,
    input = form.querySelector("input") as HTMLInputElement,
    greeting = document.querySelector(".js-greetings") as HTMLHeadElement;

const USER_LS = "currentUser",
    SHOWING_CN = "showing" //CN : CLASS NAME

function saveName(text: string): void{
    localStorage.setItem(USER_LS, text); //LS:LOCAL STORAGE
}   

function handleSubmit(event: Event): void {
    event.preventDefault();
    const currentValue = input.value;
    // console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(): void {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text: string): void{
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`
}

function loadName(): void {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }
    else {
        paintGreeting(currentUser);
    }
}

function init(): void{
    loadName();
}

init();