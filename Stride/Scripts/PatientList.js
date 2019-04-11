$(document).ready(function () {
    UserRights();
});



var patientRowNumber = 0, globalPatientPrintRight = 0;

function loadPatientListAfterRights()
{
    
        if (globalPatientPrintRight == 1) {
            $('#patientlistTable').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'csv', 'excel', 'pdf', 'print'
                ],
                "bDestroy": true
            });
            loadAllPatientsList();
        }
        else {
            $('#patientlistTable').DataTable();
            loadAllPatientsList();
        }
}


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
                loadPatientListAfterRights();
            }
            else
            {
                globalPatientPrintRight = 0;
                loadPatientListAfterRights();
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

function loadAllPatientsList() {

    $.ajax({
        type: "POST",
        url: "WebService.asmx/GetAllPatientsDetailsList",
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
            var table = $("#patientlistTable").DataTable();
            table.clear().draw();
            var i = 0;
            $.each(response.d, function (key, value) {
                table.row.add($('<tr><td>' + ++i + '</td><td>' + value.patientCode + '</td><td>' + value.patientName + '</td><td>' + value.DOB + '</td><td>' + value.patientGender + '</td><td>' + value.patientEmail + '</td><td>' + value.patientPhone + '</td><td>' + value.patientAddress + '</td></tr>')).draw(false);
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


}