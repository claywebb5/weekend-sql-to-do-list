$(readyNow);

function readyNow(){
    getList();
    // Click listeners
    $('#btn-add').on('click', newTask);
    $('.list-body').on('click', '.completed-btn', completedTask);
    $('.list-body').on('click', '.delete-btn', deletedTask);
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
    }).catch(function (error) {
        console.log('Error in the getList GET:', error);
    });
} // End getList function
// <GET LAND>---------------------------------------------------------------------



// <POST LAND>------------------------------------------------------------------------
function newTask(){
    console.log('A new task is created!');
    let taskObject = {
        task: $('#task-name').val(),
        date: $('#task-due').val()
    };
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskObject
    }).then(function(response) {
        $('#task-name').val('');
        $('#task-due').val('');
        getList();
    });
} // End newTask function