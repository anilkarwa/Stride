$(document).ready(function () {
    getWidgetData();
    getDoctorDetails();
});

function getWidgetData()
{
    $.ajax({
        type: "POST",
        url: "WebService.asmx/getWidgetData",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $('#totalInvoice').text(response.d.totalInvoice);
            $('#totalPatients').text(response.d.totalPatients);
            $('#totalPayments').text(response.d.totalPayments -1 );
        },
        error: function (response) {
            alert('error');
        }

    });
}

function getDoctorDetails()
{
    $('#doctorTable tbody').empty();

    $.ajax({
        type: "POST",
        url: "WebService.asmx/GetAllDoctorDetails",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var i = 0;
            $.each(response.d, function (key, value) {
                $('#doctorTable tbody').append('<tr>' +
                    '<td>' + ++i + '</td>' +
                    '<td>' + value.doctorName + '</td>' +
                    '<td>' + value.doctorPhone + '</td>' +
                    '<td>' + value.doctorAddress + '</td>' +
                    '</tr> ');
            });

        },
        error: function (response) {
            $.toast({
                heading: 'Error Laoding Details',
                text: 'Their was error while loading all doctors details.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });

}