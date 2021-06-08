


function goToLab(pin){
    // Go to the lab's home page (ex. localhost:3000/####)
    // mel 6/5: redirect "join" button to room
    // document.location = "/rooms/" + pin
    document.location = pin
}




// JOINING LABS //

let joinButton = document.getElementById('join-lab-button')
joinButton.addEventListener('click', handleJoinLab)

let invalidPinText = document.getElementById('invalid-pin')


// Send a join lab request with entered pin.
function handleJoinLab(){

    console.log("Handle join lab")

    // Create a POST request.
    let request = new XMLHttpRequest()
    request.open('POST', '/rooms/join')
    request.setRequestHeader('Content-Type','application/json')


    // Store the pin from the input.
    let joinPinObj = {pin: document.getElementById('join-lab-input').value}
    requestBody = JSON.stringify(joinPinObj)


    // Add a callback to load the page/display error once we get a response from server.
    request.addEventListener('load', function(event) {

        if (event.target.status === 200) {
            goToLab(joinPinObj.pin)
        }
        else
        {
            // Show invalid pin error message.
            invalidPinText.classList.remove('hidden')
        }
    })

    request.send(requestBody)
}



// CREATING LABS //

// Send a post request with the proposed lab name, id, and password.
function createLab(){

    let pin = document.getElementById("create-lab-pin-input").value
    let name = document.getElementById("create-lab-name-input").value
    let password = document.getElementById("create-lab-password-input").value

    console.log("PIN: ", pin, " NAME: ", name, " PASSWORD: ", password)


    if(pin && name && password){
        // Create the request
        createRoomRequest(pin, name, password)
    }
    else{
        showCreateLabError()
        alert("Pin, name, or password were empty. These are all required fields to create a lab.")
    }

    console.log("Create pressed with info: ", pin, name, password)
}


function createRoomRequest(pin, name, password){
    let request = new XMLHttpRequest()
    request.open('POST', '/rooms/create')
    request.setRequestHeader('Content-Type','application/json')

    jsonObj = {roomID: pin, roomName: name, roomPassword: password}

    requestBody = JSON.stringify(jsonObj)

    request.addEventListener('load', function(event) {
        // Just in case a student tries to post an announcement with an invalid password
        if(event.target.status !== 200)
        {
            let msg = event.target.response
            alert(msg)
            showCreateLabError()
        }
        else
        {
            console.log("Created room!")

            // Go to the lab's home page (ex. localhost:3000/####)
            goToLab(pin)
        }
    })
    request.send(requestBody)
}

createLabError = document.getElementById('invalid-create-lab')


function showCreateLabError(){
    // Unhide the error text if it was hidden.
    if(createLabError.classList.contains('hidden')){
        createLabError.classList.remove('hidden')
    }
}


function hideCreateLabError(){
    if(!createLabError.classList.contains('hidden')){
        createLabError.classList.add('hidden')
    }
}


let openLabCreatorButton = document.getElementById('create-lab-open-button')
openLabCreatorButton.addEventListener('click', openLabCreatorModule)


function openLabCreatorModule(){

    // Hide the error text if there was any
    hideCreateLabError()

    // Unhide modal by removing 'hidden' class
    document.getElementById('create-backdrop').classList.remove('hidden');
    document.getElementById('create-lab').classList.remove('hidden');
}

function closeLabCreatorModule(){

    for(i = 0; i < document.getElementsByTagName('textarea').length; i++){
        document.getElementsByTagName('textarea')[i].value = ""
    }

    document.getElementById('create-backdrop').classList.add('hidden');
    document.getElementById('create-lab').classList.add('hidden');
}



let createLabCreateButton = document.getElementById('create-lab-create-button')
createLabCreateButton.addEventListener('click', createLab)



let createLabCancelButton = document.getElementById('create-lab-cancel-button')
createLabCancelButton.addEventListener('click', closeLabCreatorModule)


let createLabBackdrop = document.getElementById('create-backdrop')
createLabBackdrop.addEventListener('click', closeLabCreatorModule)
