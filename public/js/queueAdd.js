// mel 6/6:
//    - entirely new page, for adding modal functionality to queue page
//    TODO:
//    - make this work somehow



function unHideQueueModal()
{
    console.log("Show modals called")

    document.getElementById('create-backdrop').classList.remove('hidden');
    document.getElementById('create-queue').classList.remove('hidden');
}


function hideModals()
{
    console.log("Hide modals called")

    document.getElementById('create-backdrop').classList.add('hidden')
    document.getElementById('create-queue').classList.add('hidden')
}


function clearAndHideQuestion()
{
    hideModals()
}

function postQuestion(){

    clearAndHideQuestion()


    // insert DOM queries here to retrieve values
    let roomNumber = 
    let name =

    // Set this to string values: "Checkoff", or "Question" depending on which was selected
    let reqType = 

    let path = window.location.pathname

    let pathParts = path.split('/')

    let roomID = pathparts[1]


    console.log("You made a request. Breakout Room Number: ", roomNumber, " Student Name: ", name, " Request Type: ", reqType, " Lab ID: ", roomID)


    if(!roomNumber || !name || !reqType || !roomID){
        alert("All fields are required!")
    }


    let request = new XMLHttpRequest()


    request.open('PUT', '/' + roomID + '/queue/add')
    request.setRequestHeader('Content-Type','application/json')

    jsonObj = {roomNumber: roomNumber, name: name, reqType: reqType}

    requestBody = JSON.stringify(jsonObj)

    request.addEventListener('load', function(event) {
        // Just in case a student tries to post an announcement with an invalid password
        if(event.target.status !== 200)
        {
            let msg = event.target.response
            alert(msg)
            alert("Something went wrong...")
        }
        else
        {
            console.log("Posted request successfully")
        }
    })
    request.send(requestBody)
}





document.getElementById('add-queue').addEventListener('click', postQuestion)
document.getElementById('question-cancel').addEventListener('click', clearAndHideQuestion)
