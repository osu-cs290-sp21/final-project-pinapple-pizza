// mel 6/6:
//    - commented out functionality for 'x' button on announcement modal; 'x' button was removed 


//Sends a POST request to the server-side w/question name, text, and Room name
function createPostRequest(jsonObj, route, callback, reqType='POST')
{
    let request = new XMLHttpRequest()
    request.open(reqType, route)
    request.setRequestHeader('Content-Type','application/json')

    requestBody = JSON.stringify(jsonObj)

    request.addEventListener('load', function(event) {
        // Just in case a student tries to post an announcement with an invalid password
        if (event.target.status === 403) {
            let msg = event.target.response
            alert("Access denied: " + msg)
        }
        else if(event.target.status !== 200)
        {
            let msg = event.target.response
            alert("Error storing request in database: " + msg)
        }
        else
        {
            console.log("Uploaded question!")
            callback();
            //UPDATE UI
        }
    })
    request.send(requestBody)
}

function getRoomID()
{
    let path = window.location.pathname
    pathParts = path.split('/')
    return pathParts[1]
}

// Get the data so that we can update things
function retrieve_data(callback)
{
    let request = new XMLHttpRequest();
    request.open('GET', '/' + getRoomID() + '/all-data');

    request.addEventListener('load', function(event) {
        if(event.target.status !== 200)
        {
            let msg = event.target.response
            alert("Error retrieving data from database: " + msg);
        }
        else
        {
            console.log("Retrieved updated data!");
            //UPDATE UI
            data = JSON.parse(event.target.response);
            callback(data);
        }
    });
    request.send();
}
