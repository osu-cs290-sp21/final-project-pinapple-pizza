//Removes .hidden class from all elements
function unHideModals()
{
    //Unhide modals by removing 'hidden' class
    let modals = document.querySelectorAll('.hidden')
    for(var i=0; i < modals.length; i++)
    {
        modals[i].classList.remove('hidden')
    }
}

//Adds .hidden class back to modals
function hideModals()
{
    //Hide the models by adding 'hidden' class
    let modalBack = document.getElementById('create-backdrop')
    let modalQuestion = document.getElementById('create-question')

    modalBack.classList.add('hidden')
    modalQuestion.classList.add('hidden')
}

//Hides modals and clears input values
function clearAndHideQuestion()
{
    hideModals()
    let textInput = document.getElementById('question-text-input')
    let nameInput = document.getElementById('question-name-input')
    textInput.value = ''
    nameInput.value = ''
}

//Sends a POST request to the server-side w/question name, text, and Room name
function createPostRequest(textValue, nameValue)
{
    let request = new XMLHttpRequest()
    request.open('POST', '/question/add')
    request.setRequestHeader('Content-Type','application/json')

    //REPLACE ROOM w/NAME
    questionObj = {questionText: textValue, questionName: nameValue, roomName: "room1"}
    requestBody = JSON.stringify(questionObj)

    request.addEventListener('load', function(event) {
        if(event.target.status !== 200) 
        {
            let msg = event.target.response
            alert("Error storing request in database: ", msg)
        }
        else
        {
            console.log("Uploaded question!")
            //UPDATE UI
        }
    })
    request.send(requestBody)
}

//Verify input and send a POST request
function handlePost()
{
    let textValue = document.getElementById('question-text-input').value
    let nameValue = document.getElementById('question-name-input').value

    if (textValue && nameValue) 
    {
        createPostRequest(textValue, nameValue)
        clearAndHideQuestion()
    }
    else alert("Missing question or name input!")

}

let creatQButton = document.getElementById('create-question-button')
creatQButton.addEventListener('click', unHideModals)

let cancelButton = document.getElementById('question-cancel')
cancelButton.addEventListener('click', clearAndHideQuestion)

let modalBack = document.getElementById("create-backdrop")
modalBack.addEventListener('click', clearAndHideQuestion)

let postButton = document.getElementById('question-post')
postButton.addEventListener('click', handlePost)