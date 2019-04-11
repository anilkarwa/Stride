$(document).ready(function () {

});

function Login()
{
    var username = $('#username').val();
    var password = $('#password').val();

    var loginobj = {};
    loginobj.username = username;
    loginobj.password = password;
    $.ajax({
        type: "POST",
        url: "WebService.asmx/authenticateUser",
        data: '{login: ' + JSON.stringify(loginobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            if (response.d.authenticationStatus) {
                Session.set("Session_User", 'true');
                Session.set("DoctorCode", response.d.doctorCode);
                Session.set("DoctorName", response.d.doctorName);
                Session.set("DoctorProfileImg", response.d.doctorProfileImg);
                Session.set("DoctorCode", response.d.doctorCode);
                window.location = "dashboard.aspx";
            }
            else
            {
                Session.set("Session_User", 'false');
                $.toast({
                    heading: 'Invalid Credetinals',
                    text: 'Please enter valid Username and Password.',
                    position: 'top-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
            }
        },
         error: function (response) {
                $.toast({
                    heading: 'Error while authenicating user',
                    text: 'Their was a error authenicating user.',
                    position: 'top-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
        }

    });
}