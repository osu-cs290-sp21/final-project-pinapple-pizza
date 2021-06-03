
let joinButton = document.getElementById('join-lab-button')
joinButton.addEventListener('click', handleJoinLab)


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

            // Go to the lab's home page (ex. localhost:3000/####)
            document.location = "/" + joinPinObj.pin
        }
        else
        {
            // Show invalid pin error message.
            document.getElementById('invalid-pin').classList.remove('hidden')
        }
    })

    request.send(requestBody)
}