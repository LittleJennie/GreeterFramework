//creates a new object
var g = G$('John', 'Doe');
var lang;

$('#login').click(function() {
    //clean up existing message
    $('#greeting').html('');

    //get selected lanuage
    lang = $('#lang').val();

    //set lanuage
    g.setLang(lang);

    //use library to create html message
    g.HTMLGreeting('#greeting').log();
});