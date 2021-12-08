//DISPLAY
const quizButton = document.querySelector('.quizButton');
const quizDiv = document.querySelector('.ninjaQuiz');
const todoButton = document.querySelector('.todoButton');
const todoDiv = document.querySelector('.ninjaTodo');

quizButton.addEventListener('click', e => {
    if(quizDiv.style.display == 'none'){
        quizDiv.style.display = 'block'
    } else {
        quizDiv.style.display = 'none'
    }

});

todoButton.addEventListener('click', e => {
    if(todoDiv.style.display == 'none'){
        todoDiv.style.display = 'block'
    } else {
        todoDiv.style.display = 'none'
    }
});

// QUIZ
const correctAnswers = ['B', 'B', 'B', 'B']; //All the correct answers
const form = document.querySelector('.quiz-form');
const result = document.querySelector('.result');

form.addEventListener('submit', e => {
    e.preventDefault();

    let score = 0;

    //Save userAnswers
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

    //Check answers
    //Answer is the value, index is the position
    userAnswers.forEach((answer, index) => {
        if(answer === correctAnswers[index]){
            score += 25;
        }
    });
    // Show result on page
    window.scrollTo(0,0); //Scroll automatically to the top
    //result.querySelector('span').textContent = `${score}%`; vi har rykket den længere ned
    result.classList.remove('d-none');

    //Score animation
    let output = 0;
    const timer = setInterval(() => {
        result.querySelector('span').textContent = `${output}%`;
        if(output === score){
            clearInterval(timer);
        } else {
            output++;
        }
    }, 10) //10 milisekunder - hvor ofte callback func skal fire
});

//TODO
//Add todo
const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

const generateTemplate = (todo) => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;
    list.innerHTML += html;
};


addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if(todo.length){
        generateTemplate(todo);
        addForm.reset();
    }    
});

//Delete todos
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
});

//Keyup event - search 
const filterTodos = (term) => {
    Array.from(list.children)
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'))

    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'))
};

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
})