const employeeList = document.querySelector('#employee_list');
const form = document.querySelector('form');
const searchBar = document.querySelector('#search_bar');
var currentProfileFocus;

const profileFocus = document.querySelector('#profile_focus_wrapper');
const profileFocuseInfo1 = document.querySelector('#profile_focus_info1');
const profileFocuseInfo2 = document.querySelector('#profile_focus_info2');
const profileFocusPicture = document.querySelector('#profile_focus_picture');


//Fetch Functions 
fetch('https://randomuser.me/api/?results=50&nat=us')
    .then( response => response.json() )
    //.then( checkStatus)
    .then( data =>  {
        let employeeNum = 0; 
        data.results.forEach(employee => { 
            generateEmployee(employee, employeeNum);
            employeeNum++ 
        });
    })
    .catch()

/////////////////Helper Functions///////////////////
// function checkStatus(response) {
//     if(response.ok) {
//         return Promise.resolve(response);
//     }else {
//         return Promise.reject(new Error(response.statusText));
//     }    
// }


function generateEmployee(employee, employeeNum) {
    const employeeData = `
    <li class="employee_box">
        <img src= ${employee.picture.thumbnail} class="thumbnail">
        <span class="name"> ${employee.name.first} ${employee.name.last}</span>
        <p class="city"> ${employee.location.city}, ${employee.location.state}</p>
        <p class="email"> ${employee.email}</p>
        
        <div class="hidden">
            <img src= ${employee.picture.large} class="largePic">
            <p class="phone">${employee.phone}</p>
            <p class="street">${employee.location.street.number} ${employee.location.street.name}</p>
            <p class="dob">${convertDOB(employee.dob.date)}</p>
            <p class="postcode">${employee.location.postcode}</p> 
            <p class="employeeNum">${employeeNum}</p>
        </div>
    </li>
    `;
    
    employeeList.innerHTML += employeeData;  
}

function fillFocusProfile(profile) {
    currentProfileFocus = profile;
    console.log(profile.querySelector('.largePic').src);
    profileFocusPicture.innerHTML = `
        <img src="${profile.querySelector('.largePic').src}">
    `;

    profileFocuseInfo1.innerHTML = `
        <p class="name">${profile.querySelector('.name').innerHTML}</p>
        <p>${profile.querySelector('.city').innerHTML}</p>
        <p>${profile.querySelector('.email').innerHTML}</p>
    `;

    profileFocuseInfo2.innerHTML = `
    <p>${profile.querySelector('.phone').innerHTML}</p>
    <p>${profile.querySelector('.street').innerHTML}, <p> 
    <p>${profile.querySelector('.city').innerHTML},
    <span>${profile.querySelector('.postcode').innerHTML}</span></p>
    <p>${profile.querySelector('.dob').innerHTML}</p>
    `;
}

function convertDOB(dob) {
    return `${dob[5] + dob[6]}/${dob[8] + dob[9]}/${dob[0] + dob[1] + dob[2] +dob[3]}`;
}

function searchEmployees(query) {
    //remove hidden class from all employees prior to search
    employeeList.querySelectorAll('.rejected_query').forEach( hiddenEmployee => hiddenEmployee.classList.remove('rejected_query'));
    //add hidden class to employees that dont match query
    let currentEmployeeName;
    let matches;
    for (let i = 0 ; i<employeeList.children.length; i++) {
        currentEmployeeName = employeeList.children[i].querySelector('.name').innerHTML.trim().toLowerCase().split(' ');
        matches = currentEmployeeName.filter( (name) => {
                if (name.substring(0, query.length).includes(query.toLowerCase())) {
                    return true;
                }
            });
        if (matches.length === 0) {
            employeeList.children[i].classList.add('rejected_query');
        }    
    } 
}


///////////////////Event Listeners ///////////////////////
form.addEventListener('submit', event => {
    event.preventDefault();
    searchEmployees(searchBar.value);
});

employeeList.addEventListener('mouseover', event => {
    if(event.target.tagName === 'LI') {
        event.target.classList.add('mouseover');
    }
});

employeeList.addEventListener('mouseout', event => {
    if(event.target.tagName === 'LI') {
        event.target.classList.remove('mouseover');
    }
});


// OPEN PROFILE FOCUS
employeeList.addEventListener('click', event => {
    if(event.target.tagName === 'LI') {
        profileFocus.classList.remove('hidden');
        employeeList.classList.add('blur_background');
        fillFocusProfile(event.target);

    }
});

profileFocus.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        //CLOSE FOCUS BUTTON
        if (event.target.id === 'close_focus') {
            profileFocus.classList.add('hidden');
            employeeList.classList.remove('blur_background'); 
        }
        //NEXT BUTTON
        if (event.target.id === 'next') {
            let nextEmployeeNum = parseInt(currentProfileFocus.querySelector('.employeeNum').innerHTML) + 1;
            if (nextEmployeeNum > (employeeList.children.length - 1)) {
                nextEmployeeNum = 0;
            }
            while (employeeList.children[nextEmployeeNum].classList.contains('rejected_query')) {
                nextEmployeeNum++
                if (nextEmployeeNum > (employeeList.children.length -1)){
                    nextEmployeeNum = 0
                }
            }
            fillFocusProfile(employeeList.children[nextEmployeeNum]);
        }
        
        //PREVIOUS BUTTON
        if (event.target.id === 'previous') {
            let prevEmployeeNum = parseInt(currentProfileFocus.querySelector('.employeeNum').innerHTML) - 1;
            if (prevEmployeeNum === -1) {
                prevEmployeeNum = employeeList.children.length - 1;
            }
            while (employeeList.children[prevEmployeeNum].classList.contains('rejected_query')) {
                prevEmployeeNum--;
                if (prevEmployeeNum === -1){
                    prevEmployeeNum = employeeList.children.length - 1;
                }
            }
            fillFocusProfile(employeeList.children[prevEmployeeNum]);
        }
    }
        
});
