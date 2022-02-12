$(readyNow);

function readyNow(){
    // console.log('jQuery running');
    $('#btn-add').on('click', newTask);
    getList();
} // End readyNow

// <GET LAND>---------------------------------------------------------------------
function getList(){
    console.log('In getList');
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log('GET /tasks response:', response);
        // Call the function to append the task list items
        appendList(response);
    }).catch(function (error) {
        console.log('Error in the getList GET:', error);
    });
} // End getList function