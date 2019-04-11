$(document).ready(function () {
    
    loadDoctorName();
    paymentList();
  
    UserRights();
});

var globalPaymentprintRight = 0, globalSalesprintRight = 0, globalOutstandingprintRight=0;


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

            if (!response.d[3].payementAdd) {
                $('#AddPaymentRight').hide();
            }
            if (response.d[6].paymentReportPrint) {
                globalPaymentprintRight = 1;
                loadDataTableAfterRights();
            }
            else {
                loadDataTableAfterRights();
            }
            if (response.d[7].salesReportPrint) {
                globalSalesprintRight = 1;
                loadDataTableAfterRights();
            }
            else {
                loadDataTableAfterRights();
            }
            if (response.d[8].outstandingReportPrint) {
                globalOutstandingprintRight = 1;
                loadDataTableAfterRights();
            }
            else {
                loadDataTableAfterRights();
            }
            
            if (!response.d[3].payementPrint) {
                $('.printPaymentRight').hide();
            }
            

        },
        error: function (response) {
            alert('error');
        }

    });
}

function loadDataTableAfterRights()
{
    if (globalPaymentprintRight == 1) {
        $('#paymentreporttable').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'csv', 'excel', 'pdf', 'print'
            ],
            "bDestroy": true
        });

        getPaymentReportData();
    }
    else {
        $('#paymentreporttable').DataTable();
        getPaymentReportData();
    }
   
    if (globalSalesprintRight == 1) {
        $('#salesreporttable').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'csv', 'excel', 'pdf', 'print'
            ],
            "bDestroy": true
        });

        getSalesReportData();
    }
    else {
        $('#salesreporttable').DataTable();
        getSalesReportData();
    }

    if (globalOutstandingprintRight == 1) {
        $('#outstandingreporttable').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'csv', 'excel', 'pdf', 'print'
            ],
            "bDestroy": true

        });

        getOutstandingReportData();
    }
    else {
        $('#outstandingreporttable').DataTable();
        getOutstandingReportData();
    }

}

function paymentList()
{
    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPaymentReportData",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var table = $("#paymentlisttable").DataTable();
            table.clear().draw();
            var i = 0;
            $.each(response.d, function (key, value) {
                table.row.add($('<tr><td>' + ++i + '</td><td>' + value.patientName + '</td><td>' + value.paymentDate + '</td><td><i class="fa fa-inr"></i>' + value.payableAmount + '</td><td><i class="fa fa-inr"></i>' + value.discountAmount + '</td> <td><i class="fa fa-inr"></i>' + value.receivedAmount + '</td></tr>')).draw(false);
            });
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Payment List',
                text: 'Their was error while loading patient payment list.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}
function loadDoctorName() {
    $.ajax({
        type: "POST",
        url: "WebService.asmx/GetAllDoctorDetails",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var select = document.getElementById('doctorName');
            $('#doctorName').empty().append('<option value="">Select Doctor</option>');
            $.each(response.d, function (key, value) {

                var option = document.createElement('option');
                option.value = value.doctorCode;
                option.text = value.doctorName;
                select.add(option);

            });
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Doctor Name',
                text: 'Their was error while loading doctor name list.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function getPaymentReportData()
{
    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPaymentReportData",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var table = $("#paymentreporttable").DataTable();
            table.clear().draw();
            var i = 0;
            $.each(response.d, function (key, value) {
                table.row.add($('<tr><td>' + value.paymentId + '</td><td>' + value.paymentDate + ' </td><td>' + value.patientName + '</td><td>' + value.payableAmount + '</td><td>' + value.discountAmount + '</td><td>' + value.receivedAmount + '</td></tr>')).draw(false);
            });
            getPaymentTotalAmount();
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Payment Report',
                text: 'Their was error loading patient payment report.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}



function getSalesReportData()
{
    $.ajax({
        type: "POST",
        url: "WebService.asmx/getSalesReportData",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var table = $("#salesreporttable").DataTable();
            table.clear().draw();
            var i = 0;
            $.each(response.d, function (key, value) {
                table.row.add($('<tr><td>' + value.invoiceId + '</td><td>' + value.invoiceDate + ' </td><td>' + value.doctorName + '</td><td>' + value.patientName + '</td><td>' + value.totalAmount + '</td></tr>')).draw(false);
            });
            getSalesTotalAmount();
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Sales Report',
                text: 'Their was error loading sales report.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function getOutstandingReportData()
{
    $.ajax({
        type: "POST",
        url: "WebService.asmx/getOutstandingReportData",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var table = $("#outstandingreporttable").DataTable();
            table.clear().draw();
            var i = 0;
            
            $.each(response.d, function (key, value) {
                    table.row.add($('<tr><td>' + value.patientCode + '</td><td>' + value.patientName + ' </td><td>' + value.payableAmount + '</td><td>' + value.receivedAmount + '</td><td>' + value.pendingAmount + '</td></tr>')).draw(false);
            });
            getOutstandingTotalAmount();
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


function getPaymentReportByPatientId()
{
   

    var fromDate = $('#fromDate').val();
    var patientCode = $('#patientCode').val();
    var toDate = $('#toDate').val();

    var patientobj = {};

    if (patientCode != "") {
        patientobj.patientCode = patientCode;
    }
    if (fromDate != "")
    {
        fromDate = dateformateChange(fromDate);
        patientobj.fromDate = fromDate;
    }
    
    if (toDate != "")
    {
        toDate = dateformateChange(toDate);
        patientobj.toDate = toDate;
    }

    if (fromDate != "" && toDate != "")
    {
        if (!compareDates(fromDate, toDate))
        {
            return false;
        }
    }
   
    

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPaymentReportByPatientId",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var table = $("#paymentreporttable").DataTable();
            table.clear().draw();
            var i = 0;
            $.each(response.d, function (key, value) {
                table.row.add($('<tr><td>' + value.paymentId + '</td><td>' + value.paymentDate + ' </td><td>' + value.patientName + '</td><td>' + value.payableAmount + '</td><td>' + value.discountAmount + '</td><td>' + value.receivedAmount + '</td></tr>')).draw(false);
            });
            getPaymentTotalAmount();
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Payment Report',
                text: 'Their was error loading patient payment report.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function getPaymentTotalAmount() {

    var fromDate = $('#fromDate').val();
    var patientCode = $('#patientCode').val();
    var toDate = $('#toDate').val();
    $('#fromDate').val('');
    $('#toDate').val('');
    $('#searchPatient').val('');
    $('#patientCode').val('');
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
        url: "WebService.asmx/getPaymentTotalAmount",
        data: '{patient: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            $('#totalamount').text(response.d.paymentTotal);
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Total Amount',
                text: 'Their was error loading total  payment amount.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });


}

function getSalesTotalAmount()
{
    var fromDate = $('#fromDate').val();
    var patientCode = $('#patientCode').val();
    var toDate = $('#toDate').val();
    var doctorCode = $('#doctorName option:selected').val();
    $('#fromDate').val('');
    $('#toDate').val('');
    $('#searchPatient').val('');
    $('#patientCode').val('');
    var invoiceobj = {};

    if (patientCode != "") {
        invoiceobj.patientCode = patientCode;
    }
    if (fromDate != "") {
        fromDate = dateformateChange(fromDate);
        invoiceobj.fromDate = fromDate;
    }

    if (toDate != "") {
        toDate = dateformateChange(toDate);
        invoiceobj.toDate = toDate;
    }
    if (doctorCode != "") {
        invoiceobj.doctorCode = doctorCode;
    }

    if (fromDate != "" && toDate != "") {
        if (!compareDates(fromDate, toDate)) {
            return false;
        }
    }

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getSalesTotalAmount",
        data: '{invoice: ' + JSON.stringify(invoiceobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $('#totalsaleamount').text(response.d.salesTotal);
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Sales Total Amount',
                text: 'Their was error loading  sales total amount.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function getSalesReportByPatientId()
{
    var fromDate = $('#fromDate').val();
    var patientCode = $('#patientCode').val();
    var toDate = $('#toDate').val();
    var doctorCode = $('#doctorName option:selected').val();
    var invoiceobj = {};

    if (patientCode != "") {
        invoiceobj.patientCode = patientCode;
    }
    if (fromDate != "") {
        fromDate = dateformateChange(fromDate);
        invoiceobj.fromDate = fromDate;
    }

    if (toDate != "") {
        toDate = dateformateChange(toDate);
        invoiceobj.toDate = toDate;
    }
    if (doctorCode != "") {
        invoiceobj.doctorCode = doctorCode;
    }


    if (fromDate != "" && toDate != "") {
        if (!compareDates(fromDate, toDate)) {
            return false;
        }
    }

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getSalesReportByPatientId",
        data: '{invoice: ' + JSON.stringify(invoiceobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var table = $("#salesreporttable").DataTable();
            table.clear().draw();
            var i = 0;
            $.each(response.d, function (key, value) {
                table.row.add($('<tr><td>' + value.invoiceId + '</td><td>' + value.invoiceDate + ' </td><td>' + value.doctorName + '</td><td>' + value.patientName + '</td><td>' + value.totalAmount + '</td></tr>')).draw(false);
            });
            getSalesTotalAmount();
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Sales Report',
                text: 'Their was error loading  sales report.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function getOutstandingTotalAmount()
{
    var patientCode = $('#patientCode').val();

    $('#searchPatient').val('');
    $('#patientCode').val('');
    var patientobj = {};

    patientobj.patientCode = patientCode;




    $.ajax({
        type: "POST",
        url: "WebService.asmx/getOutstandingTotalAmount",
        data: '{payment: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $('#totaloutstandingamount').text(response.d.outstandingTotal);
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Outstanding Total Amount',
                text: 'Their was error loading patient outstanding total amount.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function getOutstandingReportByPatienId()
{
   
    var patientCode = $('#patientCode').val();
    var patientobj = {};

        patientobj.patientCode = patientCode;


    $.ajax({
        type: "POST",
        url: "WebService.asmx/getOutstandingReportByPatientId",
        data: '{payment: ' + JSON.stringify(patientobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var table = $("#outstandingreporttable").DataTable();
            table.clear().draw();
            var i = 0;
            $.each(response.d, function (key, value) {
                    table.row.add($('<tr><td>' + value.patientCode + '</td><td>' + value.patientName + ' </td><td>' + value.payableAmount + '</td><td>' + value.receivedAmount + '</td><td>' + value.pendingAmount + '</td></tr>')).draw(false);
            });
            getOutstandingTotalAmount();
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

function dateformateChange(date) {
    var datepart = date.split("/");
    return datepart[2] + "-" + datepart[1] + "-" + datepart[0];
}

function compareDates(date1, date2)
{
   
    var  datepart = date1.split("-");
    var datepart2 = date2.split("-");
  
    if (datepart2[2] < datepart[2])
    {
        
        if (datepart2[1] < datepart[1])
        {
          
            $.toast({
                heading: 'To date should be greater then from date',
                text: 'Select proper to date for report.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
            return false;
        }

        if (datepart2[1] == datepart[1]) {

            $.toast({
                heading: 'To date should be greater then from date',
                text: 'Select proper to date for report.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
            return false;
        }
    }
    else {
      
        if (datepart2[1] < datepart[1]) {
            
            $.toast({
                heading: 'To date should be greater then from date',
                text: 'Select proper to date for report.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
            return false;
        }
    }

    return true;
}
