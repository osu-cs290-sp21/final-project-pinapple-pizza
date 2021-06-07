// mel 6/6:
//    - entirely new page, for adding modal functionality to queue page
//    TODO:
//    - make this work somehow


function unHideQueueModal()
{
  console.log('here')
    //Unhide modal by removing 'hidden' class
    document.getElementById('create-backdrop').classList.remove('hidden');
    document.getElementById('create-queue').classList.remove('hidden');
}

function hideModals()
{
    //Hide the models by adding 'hidden' class
    let modalBack = document.getElementById('create-backdrop')
    let modalQueue = document.getElementById('create-queue')

    modalBack.classList.add('hidden')
    modalQueue.classList.add('hidden')
}

function clearAndHideQuestion()
{
    hideModals()
}

let addToQueueButton = document.getElementById('add-queue')
addToQueueButton.addEventListener('click', unHideQueueModal)

let cancelButton = document.getElementById('question-cancel')
cancelButton.addEventListener('click', clearAndHideQuestion)
