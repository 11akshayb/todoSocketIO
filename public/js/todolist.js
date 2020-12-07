// Connect to socket.io
var socket = io.connect('http://localhost:8080');
socket.on('updateTask', function(todolist) {
    $('#todolist').empty(); // Refresh the list
    todolist.forEach(function(task, index) {
        insertTask(task, index);
    });
});

$('#todolistForm').submit(function ()
{
    var task = $('#task').val(); 
    socket.emit('addTask', task); 
    insertTask(task, index);
    $('#task').val('').focus(); 
    return false; 
});
socket.on('addTask', function(data) {
    insertTask(data.task, data.index);
});

function insertTask(task, index)
{
    $('#todolist').append('<li><a class="delete" href="#" data-index="' + index + '"> X </a> ' + task  + '</li>');
}
$('body').on('click', '.delete', function()
{
    socket.emit('deleteTask', $(this).data('index'));
});
