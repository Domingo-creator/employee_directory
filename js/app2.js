const employeeWindow = document.querySelector('#employee_window');
const head = document.querySelector('head');
var seed;

const profileFocus = document.querySelector('#profile_focus_wrapper');
const profileFocuseInfo1 = document.querySelector('#profile_focus_info1');
const profileFocuseInfo2 = document.querySelector('#profile_focus_info2');
const profileFocusPicture = document.querySelector('#profile_focus_picture');


//Fetch Functions 
fetch('https://randomuser.me/api/?results=50&nat=us')
    .then( response => response.json() )
    .then( employees =>  {
            seed = employees.results.seed; 
            generateEmployeeList(employees.results) 
        })
    .catch()


//Helper Functions
function checkStatus() {

}

function generateEmployeeList(data) {
    data.forEach(employee => generateEmployee(employee));
} 

function generateEmployee(employee) {
    const employeeData = `
    <li class="employee_box">
        <img src= ${employee.picture.thumbnail} class="thumbnail">
        <span class="name"> ${employee.name.first} ${employee.name.last}</span>
        <p class="email"> ${employee.email}</p>
        <p class="city"> ${employee.location.city}, ${employee.location.state}</p>
        
        <div class="hidden">
            <img src= ${employee.picture.large} class="largePic">
            <p class="phone">${employee.phone}</p>
            <p class="street">${employee.location.street}</p>
            <p class="dob">${employee.dob.date}</p>
            <p class="postcode">${employee.postcode}</p> 
        </div>
    </li>
    `;
    
    employeeWindow.innerHTML += employeeData;  
}


//Event Listeners 
employeeWindow.addEventListener('click', event => {
    if(event.target.tagName === 'LI') {
        profileFocus.classList.remove('hidden');
        //profileFocusPicture = `${event.target.querySelector('.largePic').innerHTML}`
        //copy to name, email, and city to info1
        profileFocuseInfo1.innerHTML = `
            <p>${event.target.querySelector('.name').innerHTML}</p>
            <p>${event.target.querySelector('.email').innerHTML}</p>
            <p>${event.target.querySelector('.city').innerHTML}</p>
        `
        //copy to phone number, address, and birthday to info2
        profileFocuseInfo2.innerHTML = `
        <p>${event.target.querySelector('.phone').innerHTML}</p>
        <span>${event.target.querySelector('.street').innerHTML}, </span> 
        <span>${event.target.querySelector('.city').innerHTML}, </span>
        <span>${event.target.querySelector('.postcode').innerHTML}</span>
        <p>${event.target.querySelector('.dob').innerHTML}</p>
        `;
    }

});

profileFocus.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        if (event.target.id === 'close_focus') {
            profileFocus.classList.add('hidden'); 
        }
        if (event.target.id === 'next') {

        }
        if (event.target.id === 'previous') {

        }
        
    }
    
});


//async funtions?  Load more employees when user scrolls down