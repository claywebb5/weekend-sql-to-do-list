$(readyNow);

function readyNow(){
    // console.log('jQuery running');
    $('#btn-add').on('click', newTask);
    getList();
} // End readyNow

// <GET LAND>---------------------------------------------------------------------
function getList(){
    console.log('In getList');
    // prevent the entire list to append each time
    $('.list-body').empty();
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log('GET /tasks response:', response);
        // append data to the dom
        for (let i = 0; i < response.length; i++) {
            if (response[i].status === false) {
                $('.list-body').append(`
                <tr data-id=${response[i].id}>
                    <td>${response[i].task}</td>
                    <td>${response[i].date}</td>
                    <td>Not Complete</td>
                    <td><button class="completed-btn">Completed Task</button></td>
                    <td><button class="delete-btn">Delete Task</button></td>
                </tr>
                `);
            } else if (response[i].status === true) {
                $('.list-body').append(`
                <tr class="completed-task" data-id=${response[i].id}>
                    <td>${response[i].task}</td>
                    <td>${response[i].date}</td>
                    <td>Completed!!</td>
                    <td><button class="delete-btn">Delete Task</button></td>
                </tr>
                `);
            }
            
        }
        // Click listeners for the created buttons
        $('.completed-btn').on('click', completedTask);
        $('.delete-btn').on('click', deletedTask);

    }).catch(function (error) {
        console.log('Error in the getList GET:', error);
    });
} // End getList function
// <GET LAND>---------------------------------------------------------------------

// 

// <POST LAND>------------------------------------------------------------------------
