//Removes .hidden class from all elements
function unHideQuestionModal()
{
    //Unhide modal by removing 'hidden' class
    document.getElementById('create-backdrop').classList.remove('hidden');
    document.getElementById('create-question').classList.remove('hidden');
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
creatQButton.addEventListener('click', unHideQuestionModal)

let cancelButton = document.getElementById('question-cancel')
cancelButton.addEventListener('click', clearAndHideQuestion)

let modalBack = document.getElementById("create-backdrop")
modalBack.addEventListener('click', clearAndHideQuestion)

let postButton = document.getElementById('question-post')
postButton.addEventListener('click', handlePost)


// Announcement modal things

function unHideAnnouncementModal() {
    //Unhide modal by removing 'hidden' class
    document.getElementById('create-announcement-backdrop').classList.remove('hidden');
    document.getElementById('create-announcement').classList.remove('hidden');
}

function clearAndHideAnnouncement() {
    document.getElementById('announcement-text-input').value = '';
    document.getElementById('announcement-author-input').value = '';
    document.getElementById('announcement-password-input').value = '';

    document.getElementById('create-announcement-backdrop').classList.add('hidden');
    document.getElementById('create-announcement').classList.add('hidden');
}

function postAnnouncement() {
    // TODO add authorization check
    let textValue = document.getElementById('announcement-text-input').value;
    let authorValue = document.getElementById('announcement-author-input').value;

    if (textValue && authorValue) 
    {
        // TODO: Ask Garrett about refactoring this, nothing major
        //createPostRequest(textValue, authorValue);
        clearAndHideAnnouncement();
    }
    else alert("Missing announcement or author input!");
}

let createAnnouncementButton = document.getElementById('add-announcement');
createAnnouncementButton.addEventListener('click', unHideAnnouncementModal);

let closeAnnouncementButton = document.querySelector('.announcement-modal-close-button');
closeAnnouncementButton.addEventListener('click', clearAndHideAnnouncement);

let cancelAnnouncementButton = document.querySelector('.announcement-modal-cancel-button');
cancelAnnouncementButton.addEventListener('click', clearAndHideAnnouncement);

let postAnnouncementButton = document.querySelector('.announcement-modal-accept-button');
postAnnouncementButton.addEventListener('click', postAnnouncement);