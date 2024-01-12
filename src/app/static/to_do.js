// // Class for making toDo Objects 

class ToDoObject { 
  constructor(toDoInfo, checked) { 
      this.toDoInfo = toDoInfo; 
      this.checked = checked; 
      this.id = Date.now(); 
  } 
} 

// // Data for work 

const input = document.getElementById('input'); 
const addButton = document.getElementById('addToDo'); 
const toDoContainer = document.getElementById('toDoContainer'); 
const container = document.getElementById('container'); 
const iDs = []; 
const toDoArr = []; 

// // functions 
 
const createTodo = function (object) { 
    const toDoInfo = object.content; 
    const doing = object.checked ? 'toDoTextDone' : 'toDoText'; 
    const checked = object.checked ? 'checked' : null; 
    const id = object.id; 
    return ( 
        ` <div class='toDoForm' data-id = '${id}'> 
<div class='checkbox-wrapper-23'> 
    <input class='checkbox' type='checkbox' id=${id} ${checked}/> 
    <label for=${id} style='--size: 30px'> 
        <svg viewBox='0,0,50,50'> 
            <path d='M5 30 L 20 45 L 45 5'></path> 
        </svg> 
    </label> 
</div> 
<strong> 
  <div class='textWrapper'> 
    <p class=${doing}> ${toDoInfo}</p> 
  </div>  
</strong> 
<button data-class = 'del' class='deleteButton'> 
    <svg  class='svg' data-class = 'del' xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='none' 
        viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'> 
        <path data-class = 'del' stroke-linecap='round' stroke-linejoin='round' 
            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /> 
            <div data-class = 'del' class = 'delete'></div> 
    </svg> 
</button> 
</div>` 
    ); 
}; 
 
const updateUi = function () { 
  toDoContainer.innerHTML = ''
    let requestData = ''
    fetch('http://127.0.0.1:8000/get/')
    .then(res => res.json())
    .then(data => data['get request'].forEach(todo =>  toDoContainer.insertAdjacentHTML('afterbegin', createTodo(todo))))
} 

 
const addToDo = function () { 
if(input.value.length){
    const postData = {
        id: String(Date.now()),
        content: input.value,
        checked:''
      };
    fetch('http://127.0.0.1:8000/post/', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Response:', data);
          toDoContainer.insertAdjacentHTML('afterbegin', createTodo(postData)) 
        })
        .catch(error => {
          console.error('Error:', error);
          if (error.response) {
            console.error('Server responded with:', error.response.status);
          }
        })};
}; 
 
const buttonFunc = function (e) { 
 if(e.target.className === 'checkbox'){
 const wrapper = e.target.closest('.toDoForm'); 
 const elemId = wrapper.dataset.id; 
} 
    
    if (e.target.checked && e.target.className === 'checkbox' || !e.target.checked && e.target.className === 'checkbox') {  
        const wrapper = e.target.closest('.toDoForm'); 
        const elemId = wrapper.dataset.id; 

        const putRequest = function(){
          const id = elemId; 
const updateData = {
    id:id,
    checked: e.target.checked? 'checked': '' 
};

fetch(`http://127.0.0.1:8000/todolist/put/${id}/`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData)
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Updated data:', data);
       
    })
    .catch(error => {
        console.error('There was a problem with the PUT request:', error);
    });
        }

        const text = e.target.checked && e.target.className === 'checkbox' ? 
            wrapper.querySelector('.toDoText') : !e.target.checked && e.target.className === 'checkbox' ? 
                wrapper.querySelector('.toDoTextDone') : {}; 
        
        if (text.className === 'toDoText') { 
            text.classList.remove('toDoText'); 
            text.classList.add('toDoTextDone'); 
        } else { 
            text.classList.remove('toDoTextDone'); 
            text.classList.add('toDoText'); 
        } 

        putRequest()
    }; 
    
    if (e.target.dataset.class === 'del') { 
      
        const wrapper = e.target.closest('.toDoForm'); 
        const elemId = wrapper.dataset.id; 
        
       
fetch(`${'http://127.0.0.1:8000/todolist/del/'}${elemId}/`, {
  method: 'DELETE',
  headers: {
      'Content-Type': 'application/json',
  },
})
.then(response => {
  if (response.ok) {
      console.log('Item deleted successfully');
      wrapper.remove()
  } else {
      console.error('Failed to delete item');
  }
})
.catch(error => {
  console.error('Error:', error);
}); 
    } 
}; 

updateUi(); 
 
addButton.addEventListener('click', addToDo); 
 
container.addEventListener('click', buttonFunc);

input.addEventListener('keydown', (event) => {
if (event. key === 'Enter') {
  addToDo()
}
});