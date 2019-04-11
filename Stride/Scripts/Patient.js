$(document).ready(function () {
    loadAllPatients();
    // call user rights

    UserRights();

    $("#investigationFile").change(function () {
        saveInvestigationFile();
    });

    $("#ClinicalNotesFile").change(function () {
        saveClinicalNotesFile();
    });


    var urlParams = getParameter('patientCode');
    console.log(urlParams);
    if (urlParams != false) {
        var urldata = urlParams;
        loadMedicalHistory(urldata);
        loadClinicalNote(urldata);
        loadManagementPlan(urldata);
        loadInvestigationData(urldata);
        loadExcerciseData(urldata);
        loadPatienDues(urldata);
        loadPatientOutstanding(urldata);
        loadaPatientDetails(urldata);
        var a = document.getElementById('paymentHref');
        a.setAttribute("href", "add-payment.aspx?patientCode=" + urldata);
    }

    urlParams = getParameter('editpatientCode');
    console.log(urlParams);
    if (urlParams != false)
    {
        loadEditPatientDetails(urlParams);
    }



    $("#mDescription").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            saveManagementPlans();
        }
    });
    
    
    function getParameter(theParameter) {
        var params = window.location.search.substr(1).split('&');

        for (var i = 0; i < params.length; i++) {
            var p = params[i].split('=');
            if (p[0] == theParameter) {
                return decodeURIComponent(p[1]);
            }
        }
        return false;
    }
   
    function previewImage1(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            if (!input.files[0].type.match('image.*')) {
                $.toast({
                    heading: 'Select Only Image',
                    text: 'Please select image file only to upload.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
                $('#displaypatientProfile').val('');
                return false;
            }


            if (input.files[0].size > 3000000) {
                $.toast({
                    heading: 'Image size should be less than 3 MB',
                    text: 'Please select image file with size less than 3 MB.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
                $('#doctorAchmntUpload3').val('');
                return false;
            }
            reader.onload = function (e) {
                $('#displaypatientProfile').attr('src', e.target.result);

            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#patientProfileImage").change(function () {

        previewImage1(this);
    });

    function previewImage2(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            if (!input.files[0].type.match('image.*')) {
                $.toast({
                    heading: 'Select Only Image',
                    text: 'Please select image file only to upload.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
                $('#editpatientProfileImage').val('');
                return false;
            }


            if (input.files[0].size > 3000000) {
                $.toast({
                    heading: 'Image size should be less than 3 MB',
                    text: 'Please select image file with size less than 3 MB.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
                $('#editpatientProfileImage').val('');
                return false;
            }
            reader.onload = function (e) {
                $('#displaypatientProfile').attr('src', e.target.result);
                $('#editprofileimage').attr('src', "");
                $('#editprofileimage').val('');
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#editpatientProfileImage").change(function () {

        previewImage2(this);
    });


    $(window).scroll(function () {
       
        if (($(window).scrollTop() == $(document).height() - $(window).height())) {
            loadAllPatients();
        }
    });

    

});




var patientRowNumber = 0, globalPatientPrintRight = 0;

function UserRights() {
    var settingobj = {};
    settingobj.userCode = Session.get("DoctorCode");

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getAllUserSettings",
        data: '{setting: ' + JSON.stringify(settingobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            if (!response.d[2].patientProfileView) {
                $('#allPatientsView').hide();
            }
            if (!response.d[2].patientProfileAdd) {
                $('#addPatientRight').hide();
            }
            if (!response.d[2].patientProfileEdit) {
                $('.editPatientRight').hide();
            }
            if (response.d[2].patientProfilePrint) {
                globalPatientPrintRight = 1;
            }

            
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Rights',
                text: 'Their was a error loading  doctor rights, please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function bookPatientAppointment()
{
    var now = "01/01/2018";
    var fromDate = dateformateChange2($("#fromDate").val());
    var fromTime = $("#autoswitch").val();
    var toDate = dateformateChange2($("#fromDate").val());
    var toTime = $("#autoswitch").val();
    var msgcontent = $("#MessageContent").val();

    var fromFullDateTime = now + " " + fromTime;
    var toFullDateTime = now + " " + toTime;

    var fromTimeHourse = new Date(fromFullDateTime).getHours();
    var fromTimeMinutes = new Date(fromFullDateTime).getMinutes();
    var toTimeHourse = new Date(toFullDateTime).getHours();
    var toTimeMinutes = new Date(toFullDateTime).getMinutes();

    var FinalFromDateTime = fromDate + " " + fromTimeHourse + ":" + fromTimeMinutes;
    var FinalToDateTime = toDate + " " + toTimeHourse + ":" + toTimeMinutes;
   
    var start = new Date(FinalFromDateTime+' UTC');
    var end = new Date(FinalToDateTime + ' UTC');
    

    var appointmentObj = {};
    appointmentObj.title = $("#appointmentPatient").val();
    appointmentObj.start = start.toISOString();
    appointmentObj.end = end.toISOString();
    appointmentObj.className = 'bg-success';
    appointmentObj.doctorCode = Session.get("DoctorCode");
    appointmentObj.patientCode = $("#patientCodeMH").val();
    appointmentObj.patientPhone = $('#patientDisplayPhone').text();


    $.ajax({
        type: "POST",
        url: "WebService.asmx/saveNewAppointment",
        data: '{appointment: ' + JSON.stringify(appointmentObj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            
                $('#responsivemodal').modal('hide');
                $.toast({
                    heading: 'Patient Appointment Successfully',
                    text: '',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'success',
                    hideAfter: 2500,
                    stack: 6
                });
            

            if ($("#smscheck").is(':checked')) {
                sendAppointmentSMS($('#patientCodeMH').val(), $("#fromDate").val(), $("#autoswitch").val(), msgcontent);
                }
            
        },
        error: function (response) {
            $.toast({
                heading: 'Error Saving Appointment',
                text: 'Their was a error while saving appointment, try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function sendAppointmentSMS(patienCode,appDate, appTime,msgcontent)
{
    $.ajax({
        type: "POST",
        url: "WebService.asmx/sendAppointmentSMS",
        data: '{patientCode: ' + JSON.stringify(patienCode) + ',appDate:' + JSON.stringify(appDate) + ',appTime:' + JSON.stringify(appTime) + ',msgcontent:' + JSON.stringify(msgcontent) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            
        },
        error: function (response) {
            $.toast({
                heading: 'Error Send  Appointment SMS',
                text: 'Their was a error while saving appointment, try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function loadPatientOutstanding(pcode) {
    var fromDate = "";
    var patientCode = pcode;
    var toDate = "";

    var patientobj = {};

    if (patientCode != "") {
        patientobj.patientCode = patientCode;
    }
    if (fromDate != "") {
        fromDate = dateformateChange(fromDate);
        patientobj.fromDate = fromDate;
    }

    if (toDate != "") {
        toDate = dateformateChange(toDate);
        patientobj.toDate = toDate;
    }

    if (fromDate != "" && toDate != "") {
        if (!compareDates(fromDate, toDate)) {
            return false;
        }
    }


    $.ajax({
        type: "POST",
        url: "WebService.asmx/patientBalanceAmountById",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var table = $("#outstandingTable").DataTable();
            table.clear().draw();
            var i = 0;
            $.each(response.d, function (key, value) {
                table.row.add($('<tr><td>' + ++i + '</td><td>' + value.date + ' </td><td>' + value.pamentType + '</td><td>' + value.invoiceAmount + '</td><td>' + value.paidAmount + '</td></tr>')).draw(false);
            });
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Outstanding Report',
                text: 'Their was error loading patient outstanding report.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function sendOutstandingMailToPatient() {

    var paymentObj = {};

    var fromDate = "";
    var patientCode = $('#patientCodeMH').val();
    var toDate = "";

    var patientobj = {};

    if (patientCode != "") {
        patientobj.patientCode = patientCode;
    }
    if (fromDate != "") {
        fromDate = dateformateChange(fromDate);
        patientobj.fromDate = fromDate;
    }

    if (toDate != "") {
        toDate = dateformateChange(toDate);
        patientobj.toDate = toDate;
    }

    if (fromDate != "" && toDate != "") {
        if (!compareDates(fromDate, toDate)) {
            return false;
        }
    }

    var tempArrary = [];
    $.ajax({
        type: "POST",
        url: "WebService.asmx/patientBalanceAmountById",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var i = 0;
            $.each(response.d, function (key, value) {
                tempArrary[i] = [value.date, value.pamentType, value.invoiceAmount, value.paidAmount];
                ++i;
            });
            paymentObj.paymentDetails = tempArrary
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }

            paymentObj.patientCode = $('#patientCodeMH').val();
            paymentObj.patientName = $('#patientDisplayName').text();
            paymentObj.patientAddress = $('#patientDisplayAddress').text();
            paymentObj.paymentDate = dd + '/' + mm + '/' + yyyy;
            paymentObj.pendingAmount = $("#balanceAmount").text();

            $.ajax({
                type: "POST",
                url: "WebService.asmx/sendOutstandingMailByPatientId",
                data: '{payment: ' + JSON.stringify(paymentObj) + '}',
                contentType: "application/json",
                dataType: "json",
                beforeSend: function () {
                    $('#loaderImage').show();
                    $('#overlay').show();
                },
                complete: function () {
                    $('#loaderImage').hide();
                    $('#overlay').hide();
                },
                success: function (response) {
                    $.toast({
                        heading: 'Mail Send Successfully',
                        text: '',
                        position: 'bottom-right',
                        loaderBg: '#ff6849',
                        icon: 'success',
                        hideAfter: 2500,
                        stack: 6
                    });
                },
                error: function (response) {
                    $.toast({
                        heading: 'Error Sending Outstanding Mail',
                        text: 'Their was a error sending outstanding report to patient, please try again.',
                        position: 'bottom-right',
                        loaderBg: '#ff6849',
                        icon: 'error',
                        hideAfter: 3500

                    });
                }

            });
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Outstanding Report',
                text: 'Their was error loading patient outstanding report.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });

   
      
}


function loadPatienDues(pcode)
{
    var patientobj = {};
    patientobj.patientCode = pcode;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPayableAmount",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $('#payableAmount').text(response.d.payableAmount);
            $('#balanceAmount').text(response.d.payableAmount);
            $('#balanceAmount1').text(response.d.payableAmount);
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Patient Dues',
                text: 'Their was a error loading  patient due amount, please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function loadEditPatientDetails(pcode)
{
    var patientobj = {};
    patientobj.patientCode = pcode;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientById",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $('#editpatientCode').val(response.d.patientCode);
            $('#editpatientName').val(response.d.patientName);
            $('#editpatientDOB').val(response.d.DOB);
            $('#editpatientGender').val(response.d.patientGender);
             $('#editpatientDescription').val(response.d.patientDescription);
             $('#editpatientAddress').val(response.d.patientAddress);
             $('#editpatientEmail').val(response.d.patientEmail);
             $('#editpatientPhone').val(response.d.patientPhone);
             $('#editpatientAadhar').val(response.d.patientAadhar);
             $('#editpatientOccupation').val(response.d.patientOccupation);
             var src1 = "Uploads/Images/" + response.d.patientProfileImage;
             $('#displaypatientProfile').attr("src", src1);
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Patient',
                text: 'Their was a error loading  patient, please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function loadPatientById(pcode)
{
    var cards = $('#UserCards');
    $('#UserCards').empty();
    var patientobj = {};
    patientobj.patientCode = pcode;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientById",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            if (response.d.patientProfileImage !== "") {
                cards.append('<div class="col-lg-2 col-md-2 col-sm-3 col-xs-12"> ' +
                    '<div class="white-box">' +
                    ' <div class="el-card-item">' +
                    ' <div class="el-card-avatar el-overlay-1"> <img src="Uploads/Images/' + response.d.patientProfileImage + '" style="width:100px;height:100px" />' +
                    '<div class="el-overlay">' +
                    ' <ul class="el-info">' +
                    '<li><a class="btn default btn-outline" href="patient-profile.aspx?patientCode=' + response.d.patientCode + '"><i class="fa fa-eye"></i></a></li>' +
                    ' </ul>' +
                    ' </div>' +
                    '</div>' +
                    ' <div class="el-card-content">' +
                    ' <h3 class="box-title">' + response.d.patientName + '</h3> <small>' + response.d.patientEmail + '</small><br><small>' + response.d.patientPhone + '</small><br>' +
                    '<div class="row">' +
                    '<div class="col-md-6 col-sm-6" >' +
                    '<label class="switch">'+
                    '<input class="editPatientRight" type="checkbox" id="patientChkbox-' + response.d.patientCode + '" onchange="patientDisable(this.id)">' +
                    '<span class="slider round editPatientRight"></span>'+
                    '</label>'+
                    '</div>' +
                    '<div class="col-md-6 col-sm-6"> ' +
                    '<a class="editPatientRight" href="edit-patient.aspx?editpatientCode=' + response.d.patientCode + '" style="color:#fff;"><div class="btn btn-info btn-sm pull-right">Edit</div></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    ' </div>' +
                    '</div>' +
                    ' </div >');
               
                if (response.d.Enabled == "Y") {
                   
                    $('#patientChkbox-' + response.d.patientCode).prop('checked', true);
                }
                UserRights();
            }
            else {
                cards.append('<div class="col-lg-2 col-md-2 col-sm-3 col-xs-12"> ' +
                    '<div class="white-box">' +
                    ' <div class="el-card-item">' +
                    ' <div class="el-card-avatar el-overlay-1"> <img src="plugins/images/users/placeholder-user.png" style="width:100px;height:100px;" />' +
                    '<div class="el-overlay">' +
                    ' <ul class="el-info">' +
                    '<li><a class="btn default btn-outline" href="patient-profile.aspx?patientCode=' + response.d.patientCode + '"><i class="fa fa-eye"></i></a></li>' +
                    ' </ul>' +
                    ' </div>' +
                    '</div>' +
                    ' <div class="el-card-content">' +
                    ' <h3 class="box-title">' + response.d.patientName + '</h3> <small>' + response.d.patientEmail + '</small><br><small>' + response.d.patientPhone + '</small><br>' +
                    '<div class="row">' +
                    '<div class="col-md-6 col-sm-6" >' +
                    '<label class="switch">' +
                    '<input class="editPatientRight" type="checkbox" id="patientChkbox-' + response.d.patientCode + '" onchange="patientDisable(this.id)">' +
                    '<span class="slider round editPatientRight"></span>' +
                    '</label>' +
                    '</div>' +
                    '<div class="col-md-6 col-sm-6"> ' +
                    '<a class="editPatientRight" href="edit-patient.aspx?editpatientCode=' + response.d.patientCode + '" style="color:#fff;"><div class="btn btn-info btn-sm pull-right">Edit</div></a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    ' </div>' +
                    '</div>' +
                    ' </div >');
               
                if (response.d.Enabled == "Y") {
                   
                    $('#patientChkbox-' + response.d.patientCode).prop('checked', true);
                }
                UserRights();
            }
            

        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Patient',
                text: 'Their was a error loading  patient, please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function loadAllPatients()
{
    var cards = $('#UserCards');

    $.ajax({
        type: "POST",
        url: "WebService.asmx/GetAllPatientsDetails",
        data: '{num: ' + JSON.stringify(patientRowNumber) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            $.each(response.d, function (key, value) {
                if (value.patientProfileImage === "") {
                    cards.append('<div class="col-lg-2 col-md-2 col-sm-3 col-xs-12"> ' +
                        '<div class="white-box">' +
                        ' <div class="el-card-item">' +
                        ' <div class="el-card-avatar el-overlay-1">  <img src="plugins/images/users/placeholder-user.png" style="width:100px;height:100px;" />' +
                        '<div class="el-overlay">' +
                        ' <ul class="el-info">' +
                        '<li><a class="btn default btn-outline" href="patient-profile.aspx?patientCode=' + value.patientCode + '"><i class="fa fa-eye"></i></a></li>' +
                        ' </ul>' +
                        ' </div>' +
                        '</div>' +
                        ' <div class="el-card-content">' +
                        ' <h3 class="box-title">' + value.patientName + '</h3> <small>' + value.patientEmail + '</small><br><small>' + value.patientPhone + '</small><br>' +
                        '<div class="row">' +
                        '<div class="col-md-6 col-sm-6" >' +
                        '<label class="switch">' +
                        '<input class="editPatientRight" type="checkbox" id="patientChkbox-' + value.patientCode + '" onchange="patientDisable(this.id)">' +
                        '<span class="slider round editPatientRight"></span>' +
                        '</label>' +
                        '</div>' +
                        '<div class="col-md-6 col-sm-6"> ' +
                        '<a class="editPatientRight" href="edit-patient.aspx?editpatientCode=' +value.patientCode + '" style="color:#fff;"><div class="btn btn-info btn-sm pull-right">Edit</div></a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        ' </div>' +
                        '</div>' +
                        ' </div >');
                    var chkstatus = value.Enabled;
                    if (chkstatus == "Y") {
                      
                      $('#patientChkbox-' + value.patientCode).prop('checked', true);
                    }
                    UserRights();
                }
                else {
                   
                    cards.append('<div class="col-lg-2 col-md-2 col-sm-3 col-xs-12"> ' +
                        '<div class="white-box">' +
                        ' <div class="el-card-item">' +
                        ' <div class="el-card-avatar el-overlay-1">  <img src="Uploads/Images/' + value.patientProfileImage + '" style="width:100px;height:100px" />' +
                        '<div class="el-overlay">' +
                        ' <ul class="el-info">' +
                        '<li><a class="btn default btn-outline" href="patient-profile.aspx?patientCode=' + value.patientCode + '"><i class="fa fa-eye"></i></a></li>' +
                        ' </ul>' +
                        ' </div>' +
                        '</div>' +
                        ' <div class="el-card-content">' +
                        ' <h3 class="box-title">' + value.patientName + '</h3> <small>' + value.patientEmail + '</small><br><small>' + value.patientPhone + '</small><br>' +
                        '<div class="row">' +
                        '<div class="col-md-6 col-sm-6" >' +
                        '<label class="switch">' +
                        '<input class="editPatientRight" type="checkbox" id="patientChkbox-' + value.patientCode + '" onchange="patientDisable(this.id)">' +
                        '<span class="slider round editPatientRight"></span>' +
                        '</label>' +
                        '</div>' +
                        '<div class="col-md-6 col-sm-6"> ' +
                        '<a class="editPatientRight" href="edit-patient.aspx?editpatientCode=' + value.patientCode + '" style="color:#fff;"><div class="btn btn-info btn-sm pull-right">Edit</div></a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        ' </div>' +
                        '</div>' +
                        ' </div >');
                    
                    var chkstatus = value.Enabled;

                    if (chkstatus == "Y"){
                        
                      $('#patientChkbox-' + value.patientCode).prop('checked', true);
                    }
                    UserRights();
                    
                }

            });


            
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Patient',
                text: 'Their was a error loading  patient, please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
    patientRowNumber += 12;

}

function patientDisable(chkboxId)
{
    var pcode = chkboxId.split("-");
    var patientobj = {};
    patientobj.patientCode = pcode[1];

    if ($('#' + chkboxId).is(':checked')) {
        patientobj.Enabled = 'Y';
    }
    else {
        patientobj.Enabled = 'N';
    }


    $.ajax({
        type: "POST",
        url: "WebService.asmx/DisablePatient",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.toast({
                heading: 'Patient Saved Successfully',
                text: '',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 2500,
                stack: 6
            });
        },
        error: function (response) {
            $.toast({
                heading: 'Error Saving  Patient',
                text: 'Their was a error loading  patient, please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });

}




function saveNewPatient()
{
    var patientCode = $('#patientCode').val();
    var patientName = $('#patientName').val();
    var patientDOB = $('#patientDOB').val();
    var patientGenderdata = document.getElementById('patientGender');
    var patientGender = patientGenderdata.options[patientGenderdata.selectedIndex].value;
    var patientDescription = $('#patientDescription').val();
    var patientAddress = $('#patientAddress').val();
    var patientEmail = $('#patientEmail').val();
    var patientPhone = $('#patientPhone').val();
    if (patientPhone.length > 10 || patientPhone.length < 10) {
        $.toast({
            heading: 'Mobile No Should be 10 digits',
            text: 'Please enter 10 digit mobile no.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    var patientAadhar = $('#patientAadhar').val();
    
    var patientOccupation = $('#patientOccupation').val();

    var newPatientData = new FormData();

    newPatientData.append('patientName', patientName);
    newPatientData.append('patientDOB', patientDOB);
    newPatientData.append('patientGender', patientGender);
    newPatientData.append('patientAddress', patientAddress);
    newPatientData.append('patientEmail', patientEmail);
    newPatientData.append('patientPhone', patientPhone);
    newPatientData.append('patientDescription', patientDescription);
    newPatientData.append('patientAadhar', patientAadhar);
    newPatientData.append('patientOccupation', patientOccupation);
    newPatientData.append('patientProfileImage', $('#patientProfileImage')[0].files[0]);


    $.ajax({
        type: "POST",
        url: "WebService.asmx/addNewPatient",
        data: newPatientData,
        contentType: false,
        processData: false,
        beforeSend: function () {
            $('#loaderImage').show();
            $('#overlay').show();
        },
        complete: function () {
            $('#loaderImage').hide();
            $('#overlay').hide();
        },
        success: function (response) {
            var parse = JSON.parse(response);
            parse = parse.substring(parse.indexOf(":") + 1);
            parse = parse.substring(0, parse.indexOf("}"));
           
            $.toast({
                heading: 'Patient Saved Successfully',
                text: 'New patient is created ',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 2500,
                stack: 6
            });

            clearAddPatientForm();
            window.location = "patient-profile.aspx?patientCode=P" + parse;
            

        },
        error: function (response)
        {
            $.toast({
                heading: 'Error Creating Patient',
                text: 'Their was a error creating new patient please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });



}

function editPatientById()
{

    var patientCode = $('#editpatientCode').val();
    var patientName = $('#editpatientName').val();
    var patientDOB = $('#editpatientDOB').val();
    var patientGenderdata = document.getElementById('editpatientGender');
    var patientGender = patientGenderdata.options[patientGenderdata.selectedIndex].value;
    var patientDescription = $('#editpatientDescription').val();
    var patientAddress = $('#editpatientAddress').val();
    var patientEmail = $('#editpatientEmail').val();
    var patientPhone = $('#editpatientPhone').val();
    if (patientPhone.length > 10 || patientPhone.length < 10) {
        $.toast({
            heading: 'Mobile No Should be 10 digits',
            text: 'Please enter 10 digit mobile no.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    
  
    var patientAadhar = $('#editpatientAadhar').val(); 
    
    var patientOccupation = $('#editpatientOccupation').val();

    var newPatientData = new FormData();

    newPatientData.append('patientCode', patientCode);
    newPatientData.append('patientName', patientName);
    newPatientData.append('patientDOB', patientDOB);
    newPatientData.append('patientGender', patientGender);
    newPatientData.append('patientAddress', patientAddress);
    newPatientData.append('patientEmail', patientEmail);
    newPatientData.append('patientPhone', patientPhone);
    newPatientData.append('patientDescription', patientDescription);
    newPatientData.append('patientAadhar', patientAadhar);
    newPatientData.append('patientOccupation', patientOccupation);

    newPatientData.append('patientProfileImage', $('#editpatientProfileImage')[0].files[0]);
    


    $.ajax({
        type: "POST",
        url: "WebService.asmx/editPatient",
        data: newPatientData,
        contentType: false,
        processData: false,
        beforeSend: function () {
            $('#overlay').show();
            $('#loaderImage').show();
        },
        complete: function () {
            $('#loaderImage').hide();
            $('#overlay').hide();
        },
        success: function (response) {
            $.toast({
                heading: 'Patient Edit Completed',
                text: 'Patient details was saved successfully. ',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 2500,
                stack: 6
            });
           
            loadEditPatientDetails(patientCode);
        },
        error: function (response) {
            $.toast({
                heading: 'Error Editing Patient',
                text: 'Their was a error while editing patient details please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });
}

function clearAddPatientForm()
{
     $('#patientCode').val('');
     $('#patientName').val('');
     $('#patientDOB').val('');
     $('#patientDescription').val('');
     $('#patientAddress').val('');
     $('#patientEmail').val('');
     $('#patientPhone').val('');
     $('#patientAadhar').val('');
     $('#patientOccupation').val('');
     document.getElementById("patientProfileImage").value = "";
}

function loadaPatientDetails(pcode)
{

    var patientobj = {};
    patientobj.patientCode = pcode;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientById",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            
            
                if (response.d.patientProfileImage != "")
                {
                    var src1 = "Uploads/Images/" + response.d.patientProfileImage;
                    $('#patientProfileImg').attr("src", src1);
                }
                else {

                    var src1 = "plugins/images/users/placeholder-user.png";
                    $('#patientProfileImg').attr("src", src1);
                }
                $('#patientCodeMH').val(response.d.patientCode);
                $('#patientCodeCN').val(response.d.patientCode);
                $('#patientDisplayName').append(response.d.patientName);
                $('#headerPatientName').text(response.d.patientName);
                $('#patientOccupation').append(response.d.patientOccupation);
                $('#patientDisplayEmail').append(response.d.patientEmail);
                $('#patientDisplayPhone').append(response.d.patientPhone);
                $('#patientDisplayAddress').append(response.d.patientAddress);
                $('#patientDisplayName2').append(response.d.patientName);
                $('#patientDisplayPhone2').append(response.d.patientPhone);
                $('#patientDisplayEmail2').append(response.d.patientEmail);
                $('#patientDisplayDescription').append(response.d.patientDescription);
                $('#patientCode').val(response.d.patientCode);
                $('#patientName').val(response.d.patientName);
                $('#patientDOB').val(response.d.DOB);
                $('#patientPhone').val(response.d.patientPhone);
                $('#patientAadhar').val(response.d.patientAadhar);
                $('#patientEmail').val(response.d.patientEmail);
                $("#appointmentPatient").val(response.d.patientName);

                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!

                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                var today = dd + '/' + mm + '/' + yyyy;
                $("#fromDate").val(today);
                $("#toDate").val(today);


                var a = document.getElementById('billHref');
                a.setAttribute("href", "patient-invoice.aspx?patientCode=" + response.d.patientCode);
                //$.each(response.d, function (key, value) {
                //                 });
                loadGeneralAssSentFiles('GeneralAssesment');
                loadNeckSentFiles('Neck');

        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Patient Details',
                text: 'Their was a error while loading patient details please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function loadMedicalHistory(pcode)
{
    var patientobj = {};
    patientobj.patientCode = pcode;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientMedicalHistoryById",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            if (response.d.HypertensionMH != null  ) 
            {
                if (response.d.HypertensionMH != "") {
                    $('#Hypertensionchk').prop('checked', true);
                    $('#Hypertensiontxt').append(response.d.HypertensionMH);
                }
            }

            if (response.d.DiabeticMH != null) {
                if (response.d.DiabeticMH != "") {
                    $('#Diabeticchk').prop('checked', true);
                    $('#Diabetictxt').append(response.d.DiabeticMH);
                }
            }


            if (response.d.ThroidMH != null) {
                if (response.d.ThroidMH != "") {
                    $('#Thyroidchk').prop('checked', true);
                    $('#Thyroidtxt').append(response.d.ThroidMH);
                }
            }


            if (response.d.HeartDiseaseMH != null) {
                if (response.d.HeartDiseaseMH != "") {
                    $('#Heart_Diseasechk').prop('checked', true);
                    $('#Heart_Diseasetxt').append(response.d.HeartDiseaseMH);
                }
            }


            if (response.d.OtherMH != null) {
                if (response.d.OtherMH != "") {
                    $('#Otherchk').prop('checked', true);
                    $('#Othertxt').append(response.d.OtherMH);
                }
            }

            
            //$.each(response.d, function (key, value) {
            //                 });

        },
        error: function (response) {
            $.toast({
                heading: 'Error Editing Medical History',
                text: 'Their was a error while loading patient medical history.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}


function loadClinicalNote(pcode)
{
    var patientobj = {};
    patientobj.patientCode = pcode;
    $('#clinicalNotesData tbody').empty();
    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientClinicalNotesById",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            $.each(response.d, function (key, value) {
                $('#clinicalNotesData tbody').append(' <tr><td>' + value.DateCN + ' </td >'+
                    '<td><a href="Uploads/ClinicalNotes/Uploaded/' + value.ClinicalNotesCN + '">' + value.ClinicalNotesCN + '</a></td>'+
                    '<td><a href="" id="' + value.clinicalNoteId +','+pcode+'" onclick="clinicalNoteDelete(this.id); return false;">&nbsp&nbsp&nbsp&nbsp<i class="fa fa-trash"></i></a></td></tr > ');
            });

        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Clinical Notes',
                text: 'Their was a error while loading patient clinical notes.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });

  
}

function clinicalNoteDelete(id)
{

    var res = id.split(",");

    swal({
        title: "Are you sure?",
        text: "You are above to delete file !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plz!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {

            var patientobj = {};
            patientobj.clinicalNoteId = res[0];

            $.ajax({
                type: "POST",
                url: "WebService.asmx/deleteClinicalNotesFile",
                data: '{patient: ' + JSON.stringify(patientobj) + '}',
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    swal("Deleted!", "File has been deleted.", "success");
                    loadClinicalNote(res[1]);
                },
                error: function (response) {
                    $.toast({
                        heading: 'Error Deleting Clinical Notes',
                        text: 'Their was a error while deleting clinical notes, please try again.',
                        position: 'bottom-right',
                        loaderBg: '#ff6849',
                        icon: 'error',
                        hideAfter: 3500

                    });
                }

            });

        } else {
            swal("Cancelled", "Your operation is cancelled :)", "error");
        }
    });
}

function loadManagementPlan(pcode)
{
    var patientobj = {};
    patientobj.patientCode = pcode;
    $('#tableManagementPlan tbody').empty();
    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientManagementPlanById",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var i = 0;
            $.each(response.d, function (key, value) {
                $('#tableManagementPlan tbody').append(' <tr><td align="center">' + ++i +'</td><td align="center">' + value.DateMP + ' </td >' +
                    '<td align="center">' + value.DescriptionMP + '</td>' +
                    '<td><a href="" id="' + value.ManagementPlanId + ',' + pcode + '"  onclick="managementPlanEdit(this.id); return false;" data-toggle="modal" data-target="#responsive-modal">&nbsp&nbsp&nbsp&nbsp<i class="fa fa-edit"></i></a><a href="" id="' + value.ManagementPlanId + ',' + pcode + '"  onclick="managementPlanDelete(this.id); return false;">&nbsp&nbsp&nbsp&nbsp<i class="fa fa-trash"></i></a></td>' +
                   ' </tr> ');
            });

            $('#mDate').val('');
            $('#mDescription').val('');

        },
        error: function (response) {
            $.toast({
                heading: 'Error Loaing Management Plan',
                text: 'Their was a error while loading management plans.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function saveEditManagement()
{
    var patientobj = {};
    patientobj.ManagementPlanId = $('#editmanagemtId').val();
    patientobj.DateMP = $('#editmanagementDate').val();
    patientobj.DescriptionMP = $('#editManagementDescription').val();


    $.ajax({
        type: "POST",
        url: "WebService.asmx/saveEditManagementPlanData",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $('#responsive-modal').modal('hide');
            loadManagementPlan($('#editpatientCode').val());
        },
        error: function (response) {
            $.toast({
                heading: 'Error Saving Management Plan',
                text: 'Their was a error while loading management plans.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });

}

function managementPlanEdit(id) {
    var res = id.split(",");

    var patientobj = {};
    patientobj.ManagementPlanId = res[0];
    $('#tableManagementPlan tbody').empty();
    $.ajax({
        type: "POST",
        url: "WebService.asmx/getManagementPlanByManagementId",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $('#editpatientCode').val(res[1]);
            $('#editmanagemtId').val(response.d.ManagementPlanId);
            $('#editmanagementDate').val(response.d.DateMP);
            $('#editManagementDescription').val(response.d.DescriptionMP);

        },
        error: function (response) {
            $.toast({
                heading: 'Error Saving Management Plan',
                text: 'Their was a error while loading management plans.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function managementPlanDelete(id) {
    
    var res = id.split(",");


    swal({
        title: "Are you sure?",
        text: "You are above to delete file !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plz!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {

            var patientobj = {};
            patientobj.ManagementPlanId = res[0];

            $.ajax({
                type: "POST",
                url: "WebService.asmx/deleteManagementPlan",
                data: '{patient: ' + JSON.stringify(patientobj) + '}',
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    swal("Deleted!", "Record has been deleted.", "success");
                    loadManagementPlan(res[1]);
                },
                error: function (response) {
                    $.toast({
                        heading: 'Error Deleting Management Plan',
                        text: 'Their was a error while deleting clinical notes, please try again.',
                        position: 'bottom-right',
                        loaderBg: '#ff6849',
                        icon: 'error',
                        hideAfter: 3500

                    });
                }

            });

        } else {
            swal("Cancelled", "Your operation is cancelled :)", "error");
        }
    });
}

function loadInvestigationData(pcode)
{
    var patientobj = {};
    patientobj.patientCode = pcode;
    $('#InvestigationTable tbody').empty();
    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientInvestigationDataById",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
        
            $.each(response.d, function (key, value) {
                $('#InvestigationTable tbody').append(' <tr><td>' + value.DateIN + '</td><td>' + value.DescriptionIN + ' </td >' +
                    '<td> <a href="Uploads/Investegation/Uploaded/' + value.InvestigationFile + '"> ' + value.InvestigationFile + '</a></td>'+
                    '<td><a href="" id="' + value.investigationId +','+pcode+'" onclick="investigationFileDelete(this.id); return false;">&nbsp&nbsp&nbsp&nbsp<i class="fa fa-trash"></i></a></td></tr > ');
            });
            $('#investigationDescription').val('');

        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Investigation Data',
                text: 'Their was a error while loading investigation data, please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function investigationFileDelete(id)
{
    var res = id.split(",");

    swal({
        title: "Are you sure?",
        text: "You are above delete file !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {

            var patientobj = {};
            patientobj.investigationId = res[0];

            $.ajax({
                type: "POST",
                url: "WebService.asmx/deletInvestigationFile",
                data: '{patient: ' + JSON.stringify(patientobj) + '}',
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    swal("Deleted!", "File has been deleted.", "success");
                    loadInvestigationData(res[1]);
                },
                error: function (response) {
                    $.toast({
                        heading: 'Error Deleting  Investigation File',
                        text: 'Their was a error while deleting investigation file, please try again.',
                        position: 'bottom-right',
                        loaderBg: '#ff6849',
                        icon: 'error',
                        hideAfter: 3500

                    });
                }

            });

        } else {
            swal("Cancelled", "Your operation is cancelled :)", "error");
        }
    });
}

function loadExcerciseData(pcode)
{
    var patientobj = {};
    patientobj.patientCode = pcode;
    $('#ExcerciseTable tbody').empty();
    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientExcerciseDataById",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var i = 0;
            $.each(response.d, function (key, value) {
                $('#ExcerciseTable tbody').append(' <tr><td>' + ++i + '</td><td>' + value.DateEX + ' </td >' +
                    '<td> ' + value.ExerciseFileName + '</td></tr>');
            });

        },
        error: function (response) {
            $.toast({
                heading: 'Error Excercise Data',
                text: 'Their was a error while loading exercise data, please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function saveMedicalHistory()
{
    var Hypertension = "", Diabetic = "", Thyroid = "", HeartDisease = "", Other = "";

    if ($('#Hypertensionchk').is(":checked"))
    {
        Hypertension = $('#Hypertensiontxt').val();
    }
    if ($('#Diabeticchk').is(":checked")) {
        Diabetic = $('#Diabetictxt').val();
    }
    if ($('#Thyroidchk').is(":checked")) {
        Thyroid = $('#Thyroidtxt').val();
    }
    if ($('#Heart_Diseasechk').is(":checked")) {
        HeartDisease = $('#Heart_Diseasetxt').val();
    }
    if ($('#Otherchk').is(":checked")) {
        Other = $('#Othertxt').val();
    }

    var newPMedicalHistoryData = new FormData();
    newPMedicalHistoryData.append('patientCode', $('#patientCodeMH').val());
    newPMedicalHistoryData.append('Hypertension', Hypertension);
    newPMedicalHistoryData.append('Diabetic', Diabetic);
    newPMedicalHistoryData.append('Thyroid', Thyroid);
    newPMedicalHistoryData.append('HeartDisease', HeartDisease);
    newPMedicalHistoryData.append('Other', Other);

    $.ajax({
        type: "POST",
        url: "WebService.asmx/saveMedicalHistory",
        data: newPMedicalHistoryData,
        contentType: false,
        processData: false,
        success: function (response) {
            $.toast({
                heading: 'Medical History Saved',
                text: 'Medical history of the patient was saved successfully.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
            loadMedicalHistory($('#patientCodeMH').val());
        },
        error: function (response) {
            $.toast({
                heading: 'Error Saving Medical History',
                text: 'Their was a error while saving medical history, please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });

   

}

function saveManagementPlans()
{
    var mDate = dateformateChange( $('#mDate').val());
    var mDescription = $('#mDescription').val();


    var newManagementPlan = new FormData();
    newManagementPlan.append('patientCode', $('#patientCodeCN').val());
    newManagementPlan.append('mDate', mDate);
    newManagementPlan.append('mDescription', mDescription);

    $.ajax({
        type: "POST",
        url: "WebService.asmx/saveManagementPlan",
        data: newManagementPlan,
        contentType: false,
        processData: false,
        success: function (response) {

            $.toast({
                heading: 'Saved Management Plans ',
                text: 'Management plans saved successfully.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });

            loadManagementPlan($('#patientCodeCN').val());
        },
        error: function (response) {
            $.toast({
                heading: 'Error Saving Management Plan',
                text: 'Their was a error while saving management plans,please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });

   

}

function saveClinicalNotesFile()
{


    var newClinicalNotesData = new FormData();
    newClinicalNotesData.append('patientCode', $('#patientCodeCN').val());
    newClinicalNotesData.append('ClinicalNotesFile', $('#ClinicalNotesFile')[0].files[0]);


    $.ajax({
        type: "POST",
        url: "WebService.asmx/saveClinicalNotesData",
        data: newClinicalNotesData,
        contentType: false,
        processData: false,
        success: function (response) {
            $.toast({
                heading: 'Saved Clinical Notes',
                text: 'Clinical notes  saved successfully.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
            loadClinicalNote($('#patientCodeCN').val());
        },
        error: function (response) {
            $.toast({
                heading: 'Error Saving Clinical Notes',
                text: 'Their was a error while saving clinical notes, please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });

 
}


function saveInvestigationFile()
{
    var nDescription = $('#investigationDescription').val();
    var newInvestigationData = new FormData();
    newInvestigationData.append('patientCode', $('#patientCodeCN').val());
    newInvestigationData.append('nDescription', nDescription);
    newInvestigationData.append('investigationFile', $('#investigationFile')[0].files[0]);


    $.ajax({
        type: "POST",
        url: "WebService.asmx/saveInvestigationData",
        data: newInvestigationData,
        contentType: false,
        processData: false,
        success: function (response) {
            $.toast({
                heading: 'Saved Investigation File',
                text: 'Investigation file saved successfully.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
            loadInvestigationData($('#patientCodeCN').val());
        },
        error: function (response) {
            $.toast({
                heading: 'Error Saving Investigation File',
                text: 'Their was a error while saving investigation file, please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });

    
}


function getMailData() {
    var smtpHost = "smtp.gmail.com", smtpUsername = "", smtpPassword = "", smtpPort = "", mailPriority = "High";
    var mFrom = "", mTo = $('#patientDisplayEmail').text(), subject = "Excersice Files", mailcontent = "", mCC = "", mBCC = "";
    var enableSsl = true, IsBodyHtml = true;

    var Hypertension = "", HeartDisease = "", Thyroid = "", Diabetic = "";
    if ($('#HypertensionExchk').is(":checked"))
    {
        Hypertension = "checked";
    }
    if ($('#HeartDiseaseExchk').is(":checked")) {
        HeartDisease = "checked";
    }
    if ($('#ThyroidExchk').is(":checked")) {
        Thyroid = "checked";
    }
    if ($('#DiabeticExchk').is(":checked")) {
        Diabetic = "checked";
    }

    var mailData = [smtpHost, smtpUsername, smtpPassword, smtpPort, mailPriority, mFrom, mTo, subject, mailcontent, mCC, mBCC];

    var maildata = new FormData();
    maildata.append('patientCode', $('#patientCodeCN').val());
    maildata.append('mailData', mailData);
    maildata.append('enableSsl', enableSsl);
    maildata.append('IsBodyHtml', IsBodyHtml);
    maildata.append('Hypertension', Hypertension);
    maildata.append('HeartDisease', HeartDisease);
    maildata.append('Thyroid', Thyroid);
    maildata.append('Diabetic', Diabetic);

    $.ajax({
        type: "POST",
        url: "WebService.asmx/sendMail",
        data: maildata,
        contentType: false,
        processData: false,
        beforeSend: function () {
            $('#loaderImage').show();
            $('#overlay').show();
        },
        complete: function () {
            $('#loaderImage').hide();
            $('#overlay').hide();
        },
        success: function (response) {
            $.toast({
                heading: 'Mail Sent',
                text: 'Excercise file are send on patient mail successfully.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
            loadExcerciseData($('#patientCodeCN').val());
        },
        error: function (response) {
            $.toast({
                heading: 'Error Sending Mail',
                text: 'Their was an error sending mail to patient, please try agian.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });

   
}

function dateformateChange(date) {
    var datepart = date.split("/");
    return datepart[2] + "-" + datepart[1] + "-" + datepart[0];
}

function dateformateChange2(date) {
    var datepart = date.split("/");
    return datepart[1] + "/" + datepart[0] + "/" + datepart[2];
}