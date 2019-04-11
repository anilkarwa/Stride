var globalOTP;

function checkUserPhone()
{
    var doctorobj = {};
    doctorobj.doctorPhone = $('#doctorPhone').val();

    $.ajax({
        type: "POST",
        url: "WebService.asmx/checkDoctorByPhone",
        data: '{doctor: ' + JSON.stringify(doctorobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            if (response.d.doctorCode != null )
            {
                globalOTP = response.d.OTP;
                $('#recoverform').hide();
                $('#doctorDisplayName').text(response.d.doctorName);
                $('#doctorCode').val(response.d.doctorCode);
                $('#otpForm').show();
            }
            else {
                $.toast({
                    heading: 'No Account Associated with This Phone',
                    text: 'Their is no active account found with this phone.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
            }
            
        },
        error: function (response) {
            $.toast({
                heading: 'Error Occured, Try Again',
                text: 'Their was a error while sending data, try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function checkOtp()
{
    if ($('#otp').val() == globalOTP)
    {
        $('#otpForm').hide();
        $('#changePasswordForm').show();
    }
}

function changePassword()
{
    var doctorobj = {};
    doctorobj.doctorCode = $('#doctorCode').val();
    doctorobj.doctorPassword = $('#Newpassword').val();

    $.ajax({
        type: "POST",
        url: "WebService.asmx/changeDoctorPassword",
        data: '{doctor: ' + JSON.stringify(doctorobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            if (response.d) {
                $.toast({
                    heading: 'Password Changed Successfully',
                    text: 'Your password have been changed successfully ',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'success',
                    hideAfter: 2500,
                    stack: 6
                });

                $('#changePasswordForm').hide();
                $('#loginform').show();
            }
            else {
                $.toast({
                    heading: 'Erro Changing Password',
                    text: 'Their was error while changing password of you account.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
            }

        },
        error: function (response) {
            $.toast({
                heading: 'Error Occured, Try Again',
                text: 'Their was a error while sending data, try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}