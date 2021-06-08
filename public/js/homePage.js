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

//Verify input and send a POST request
function handlePostQuestion()
{
    let textValue = document.getElementById('question-text-input').value
    let nameValue = document.getElementById('question-name-input').value

    if (textValue && nameValue)
    {
        //REPLACE ROOM w/NAME
        createPostRequest({questionText: textValue, questionName: nameValue, roomID: getRoomID()}, "/question/add", function (){
            clearAndHideQuestion()

            //Update UI
            questionHTML = Handlebars.templates.question({text: textValue, name: nameValue})
            questionContainer = document.querySelector('.questions .post-container')
            questionContainer.insertAdjacentHTML('beforeend', questionHTML)
        })
    }
    else alert("Missing question or name input!")

}

let creatQButton = document.getElementById('add-question')
creatQButton.addEventListener('click', unHideQuestionModal)

let cancelButton = document.getElementById('question-cancel')
cancelButton.addEventListener('click', clearAndHideQuestion)

let modalBack = document.getElementById("create-backdrop")
modalBack.addEventListener('click', clearAndHideQuestion)

let postButton = document.getElementById('question-post')
postButton.addEventListener('click', handlePostQuestion)

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
    let textValue = document.getElementById('announcement-text-input').value;
    let authorValue = document.getElementById('announcement-author-input').value;
    let passwordValue = document.getElementById('announcement-password-input').value;

    if (textValue && authorValue && passwordValue)
    {
        createPostRequest({announcementText: textValue, announcementAuthor: authorValue, password: passwordValue, roomID: getRoomID()}, '/announcements/add', function() {
            updateQuestionsAndAnnouncements();
            clearAndHideAnnouncement();
        });
    }
    else alert("Missing announcement, author, or password input!");
}


function updateQuestionsAndAnnouncements() {
    retrieve_data(function(data) {
        // Update announcements
        let newAnnouncementsHTML = '';
        for (let i = 0; i < data.announcements.length; i++) {
            newAnnouncementsHTML += Handlebars.templates.question(data.announcements[i]);
        }

        // Update questions
        let newQuestionsHTML = '';
        for (let i = 0; i < data.questions.length; i++) {
            newQuestionsHTML += Handlebars.templates.question(data.questions[i]);
        }

        // Remove old questions and announcements
        for (node of document.querySelectorAll('.announcements .post-container *')) {
            node.remove();
        }

        for (node of document.querySelectorAll('.questions .post-container *')) {
            node.remove();
        }

        // Add announcements and questions to DOM
        announcementsContainer = document.querySelector('.announcements .post-container');
        announcementsContainer.insertAdjacentHTML('beforeend', newAnnouncementsHTML);
        // Update questions
        questionsContainer = document.querySelector('.questions .post-container');
        questionsContainer.insertAdjacentHTML('beforeend', newQuestionsHTML);
    });
}

let createAnnouncementButton = document.getElementById('add-announcement');
createAnnouncementButton.addEventListener('click', unHideAnnouncementModal);

// mel 6/6: comment out next two lines
//let closeAnnouncementButton = document.querySelector('.announcement-modal-close-button');
//closeAnnouncementButton.addEventListener('click', clearAndHideAnnouncement);

let cancelAnnouncementButton = document.querySelector('.announcement-modal-cancel-button');
cancelAnnouncementButton.addEventListener('click', clearAndHideAnnouncement);

let postAnnouncementButton = document.querySelector('.announcement-modal-accept-button');
postAnnouncementButton.addEventListener('click', postAnnouncement);

setInterval(updateQuestionsAndAnnouncements, UPDATE_INTERVAL);