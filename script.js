// Get the button to add a user and store its initial text
const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;

// Get the username input field and the table for displaying records
const usernameTextField = document.getElementById('username');
const recordsDisplay = document.getElementById('records');

let userArray = []; 
let edit_id = null; 

// Retrieve and parse stored user data from localStorage
let objStr = localStorage.getItem('users');
console.log(objStr);
if (objStr != null) {
    userArray = JSON.parse(objStr);
}

// Display existing user information when the page loads
DisplayInfo();

// Event listener for the button click to add or edit a user
addUserBtn.onclick = () => {
    const name = usernameTextField.value.trim(); 
    
    if (name === '') {
        alert('Name cannot be empty.');
        return;
    }
    
    if (edit_id != null) {
       
        userArray.splice(edit_id, 1, {
            'name': name,
            'dateTime': new Date().toLocaleString() 
        });
        edit_id = null; // Reset edit_id for future entries
    } else {
        
        userArray.push({
            'name': name,
            'dateTime': new Date().toLocaleString() 
        });
    }

    // Save the updated userArray and clear the input field
    SaveInfo(userArray);
    usernameTextField.value = ''; 
    addUserBtn.innerText = btnText; 
}

// Function to save user information to localStorage
function SaveInfo(userArray) {
    let str = JSON.stringify(userArray); 
    localStorage.setItem('users', str); 
    DisplayInfo(); 
}

// Function to display user information in the records table
function DisplayInfo() {
    let statement = ''; 
    userArray.forEach((user, i) => {
        
        statement += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${user.name}</td>
            <td>${user.dateTime}</td>
            <td>
                <i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i>
                <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i>
            </td>
        </tr>`;
    });
   
    recordsDisplay.innerHTML = statement;
}

// Function to set up the edit form with the selected user's information
function EditInfo(id) {
    edit_id = id; 
    usernameTextField.value = userArray[id].name; 
    addUserBtn.innerText = 'Save Changes'; 
}

// Function to delete a user from the userArray and update localStorage
function DeleteInfo(id) {
    userArray.splice(id, 1);
    SaveInfo(userArray); 
}
