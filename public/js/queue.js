function updateQueue() {
    retrieve_data(function(data) {
        // Update queue
        let newQueueHTML = '';

        // Check if this is the TA page
        if (window.location.pathname.split('/').length === 4) {
            let roomID = getRoomID();
            let password = document.querySelector('.password-container').getAttribute('password');
            for (let i = 0; i < data.people.length; i++) {
                let context = data.people[i];
                context.roomID = roomID;
                context.password = password;
                newQueueHTML += Handlebars.templates.queueEntry(context);
            }
        }
        else {
            for (let i = 0; i < data.people.length; i++) {
                newQueueHTML += Handlebars.templates.queueEntry(data.people[i]);
            }
        }

        // Remove old queue
        for (node of document.querySelectorAll('tbody tr:not(.table-header)')) {
            node.remove();
        }

        // Write new queue to DOM
        questionsContainer = document.querySelector('tbody');
        questionsContainer.insertAdjacentHTML('beforeend', newQueueHTML);
    });
}

function queueRemoveClicked(index, password) {
    let roomID = getRoomID();
    let jsonObj = {
        roomID: roomID,
        index: index - 1,
        password: password
    };
    createPostRequest(jsonObj, '/' + roomID + '/queue/remove', function() {
        updateQueue();
    }, 'DELETE');
}

// Queue modal things
function unHideQueueModal() {
    //Unhide modal by removing 'hidden' class
    document.getElementById('create-queue-backdrop').classList.remove('hidden');
    document.getElementById('create-queue').classList.remove('hidden');
}

function clearAndHideQueue() {
    document.getElementById('queue-name-input').value = '';
    document.getElementById('room-number-input').value = '';
    // TODO: Fix these, maybe use radio buttons instead of checkboxes? or a dropdown
    document.getElementById('request-type-question').value = false;
    document.getElementById('request-type-checkoff').value = false;

    document.getElementById('create-queue-backdrop').classList.add('hidden');
    document.getElementById('create-queue').classList.add('hidden');
}

function postQueue() {
    let name = document.getElementById('queue-name-input').value;
    let roomNumber = document.getElementById('room-number-input').value;
    // TODO: Fix these, maybe use radio buttons instead of checkboxes? or a dropdown
    let question = document.getElementById('request-type-question').value;
    let checkoff = document.getElementById('request-type-checkoff').value;


    if (name && roomNumber)
    {
        // TODO: fix reqType
        createPostRequest({name: name, roomNumber: roomNumber, reqType: question ? 'Question' : 'Checkoff', roomID: getRoomID()}, '/' + getRoomID() + '/queue/add', function() {
            updateQueue();
            clearAndHideQueue();
        }, 'PUT');
    }
    else alert("Missing name or room number!");
}




//let cancelQueueButton = document.getElementById('queue-cancel');
//document.getElementById('queue-cancel').addEventListener('click', clearAndHideQueue);

let cancelQueueButton = document.getElementById('queue-cancel');
cancelQueueButton.addEventListener('click', clearAndHideQueue);


let postQueueButton = document.getElementById('queue-post');
postQueueButton.addEventListener('click', postQueue);

let addToQueueButton = document.getElementById('add-queue');
addToQueueButton.addEventListener('click', unHideQueueModal);

let taSignInButton = document.getElementById('ta-signin');
taSignInButton.addEventListener('click', function() {location.href = 'queue/ta';});

let addToQueueBack = document.getElementById('create-queue-backdrop');
addToQueueBack.addEventListener('click', clearAndHideQueue);


//setInterval(updateQueue, 30000);
setInterval(updateQueue, UPDATE_INTERVAL);

