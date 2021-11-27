// const urlbase = 'http://localhost:8080/api/user'; //<-- Url para el localhost
const urlbase = 'http://144.22.225.244:8080/api/user'; //<-- url para la maquina virtual

function validationUser(){

    var validations = 0;
    const name = $('#name').val();
    const emailForm = $('#email').val();
    const passwordForm = $('#password').val();
    const confirmPassword = $('#passwordConfirm').val();

    const body = {
        email: emailForm,
        password: passwordForm,
        name: name
    }; 

    if(name.length == 0 || emailForm.length == 0){
        validationMessage('error', 'Todos los campos deben estar completos');
    }

    if (passwordForm.length < 6) {
        validationMessage('warning', 'La contraseña debe tener minimo 6 caracteres');
    } else {
        validations += 1;
    }
    
    
    if (passwordForm !== confirmPassword) {
        validationMessage('warning', 'las contraseñas no coinciden');
    }else{
        validations += 1;
    }

    var regularExpresion = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var correctEmail = regularExpresion.test(emailForm);
    if(correctEmail == false){
        validationMessage('warning', 'El email no es valido, te falta <strong>@</strong> o <strong>.com</strong>');
    }else{
        validations +=1;
    }

    $.ajax({
        url: urlbase + "/all",
        type: "GET",
        dataType: 'json',
        crossDomain: true,

        success: function(respuesta){
            var flag = 0;
            if(respuesta.length != 0){
                for (var i = 0; i < respuesta.length; i++) {
                    if(respuesta[i].email == emailForm){
                        validationMessage('warning', 'Ya existe una cuenta con este correo');
                        flag += 1;
                    }else if(respuesta[i].password == passwordForm){
                        validationMessage('warning', 'Ya existe una contraseña asi');
                        flag +=1;
                    }
                }
            }
            if(validations == 3 && flag == 0){
                createUser(body);
            }
        },
        error: function (xhr, status) {
            alert('Error');
        }
        
    });
}

function createUser(body){

    $.ajax({
        url: urlbase + "/new",
        data: JSON.stringify(body),
        type: "POST",
        contentType: 'application/json',


        success: function (respuesta){
            $('#name').prop("disabled", true);
            $('#email').prop("disabled", true);
            $('#password').prop("disabled", true);
            $('#passwordConfirm').prop("disabled", true);

            validationMessage('success', 'El usuario se ha creado exitosamente');
            $('.spiner').append(
                '<div class="d-flex align-items-center" style="padding: 20px 0 0 0; margin: 0">'+
                    '<strong>Cargando...</strong>'+
                    '<div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>'+
                '</div>'
            );
            setTimeout( 
                function(){ 
                    window.location.href = "home.html"; 
                }, 4000 
            );
        },
        error: function (xhr, status) {
            console.log(xhr +" "+ status);
        },
    });

}

function login(){
    
    const email = $("#email").val();
    const password = $("#password").val();

    if (email.length === 0 || password.length === 0) {
        validationMessage('error', 'Todos los campos deben estar completos');
    }

    var regularExpresion = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var correctEmail = regularExpresion.test(email);
    if(correctEmail == false){
        validationMessage('warning', 'El email no es valido, te falta <strong>@</strong> o <strong>.com</strong>');
    }

    $.ajax({
        url: `${urlbase}/${email}/${password}`,
        type: 'GET',
        dataType: 'json',

        success: function (respuesta) {
            if (respuesta.id === null){
                validationMessage('info', 'El correo y/o contraseña son incorrectos');
            }else{
                $('#email').prop("disabled", true);
                $('#password').prop("disabled", true);
                validationMessage('success', 'Bienvenido(a) '+ respuesta.name +'!');
                $('.spiner').append(
                    '<div class="d-flex align-items-center" style="padding: 20px 0 0 0; margin: 0">'+
                        '<strong>Cargando...</strong>'+
                        '<div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>'+
                    '</div>'
                );
                setTimeout( 
                    function(){ 
                        window.location.href = "home.html";     
                    }, 4000 
                );
            }
        },
        error: function (xhr, status) {
            console.log(xhr + " " + status);
        }
    });

}

function traerName(){
    alert("Hola " + datos);
    console.log(datos);
}
function closeSesion(){
    window.location.href = "index.html";
}

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}


function validationMessage(type, message) {
    toastr[type](message);
}
