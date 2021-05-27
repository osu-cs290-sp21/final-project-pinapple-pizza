/*

*/
function unHideModals()
{
    //Unhide modals by removing 'hidden' class
    let modals = document.querySelectorAll('.hidden')
    for(var i=0; i < modals.length; i++)
    {
        modals[i].classList.remove('hidden')
    }
}
/*

*/
function hideModals()
{
    //Hide the models by adding 'hidden' class
    let modalBack = document.getElementById('create-backdrop')
    let modalQuestion = document.getElementById('create-question')

    modalBack.classList.add('hidden')
    modalQuestion.classList.add('hidden')
}
/*

*/
function cancelQuestion()
{
    hideModals()
    let textInput = document.getElementById('question-text-input')
    let nameInput = document.getElementById('question-name-input')
    textInput.value = ''
    nameInput.value = ''
}

/*

*/
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
/*

*/
function handlePost()
{
    let textValue = document.getElementById('question-text-input').value
    let nameValue = document.getElementById('question-name-input').value

    if (textValue && nameValue) 
    {
        createPostRequest(textValue, nameValue)
        hideModals()
    }
    else alert("Missing question or name input!")

}

let creatQButton = document.getElementById('create-question-button')
creatQButton.addEventListener('click', unHideModals)

let closeButton = document.getElementById('question-close')
closeButton.addEventListener('click', cancelQuestion)

let cancelButton = document.getElementById('question-cancel')
cancelButton.addEventListener('click', cancelQuestion)

let postButton = document.getElementById('question-post')
postButton.addEventListener('click', handlePost)