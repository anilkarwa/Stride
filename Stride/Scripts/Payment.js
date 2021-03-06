﻿$(document).ready(function () {

    var urlParams = getParameter('patientCode');
    if (urlParams != false) {
        var urldata = urlParams;
        generatePaymentNumber();
        loadaPatientDetails(urldata);
    }

  
    UserRights();

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
});

var payableamount = 0;
var globalpaymentNumber, globalPatientEmail, globalPatientPhone;

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
            if (!response.d[3].payementPrint) {
                $('.printPaymentRight').hide();
            }

        },
        error: function (response) {
            alert('error');
        }

    });
}

function calculateAfterDiscount()
{
    var finalamount;
    if ($('#receivedAmount').val() > 0 || $('#receivedAmount').val() != "")
    {
       finalamount = payableamount - $('#discountAmount').val() - $('#receivedAmount').val();
    }

    // finalamount = payableamount - $('#discountAmount').val() - $('#receivedAmount').val();
   
    $('#pendingAmount').val(finalamount);
}

function generatePaymentNumber()
{

    $.ajax({
        type: "POST",
        url: "WebService.asmx/generatePaymentNumber",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $('#paymentNumber').val(response.d.paymentId);
            globalpaymentNumber = response.d.paymentId;
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Payment Details',
                text: 'Their was error while loading payment details.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
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
            $('#patientName').val(response.d.patientName);
            $('#patientCode').val(response.d.patientCode);
            $('#patientAddress').val(response.d.patientAddress);
            globalPatientEmail = response.d.patientEmail;
            globalPatientPhone = response.d.patientPhone;
            getPayableAmount(pcode);
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Payment Details',
                text: 'Their was error while loading payment details.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}


function getPayableAmount(pcode)
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
            $('#payableAmount').val(response.d.payableAmount);
            payableamount = response.d.payableAmount;
        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Payable Amount',
                text: 'Their was error loading payable amount of the patient.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function savePaymentData()
{
    var patientCode = $('#patientCode').val();
    var patientName = $('#patientName').val();
    var doctorCode = '-';
    var payableAmount = $('#payableAmount').val();
    var discountAmount = $('#discountAmount').val();
    var receivedAmount = $('#receivedAmount').val();
    var paymentType = $('#paymentType').val();

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
    var today = yyyy + '-' + mm + '-' + dd;

    var newPaymentData = {};
    newPaymentData.paymentId = globalpaymentNumber;
    newPaymentData.patientCode= patientCode;
    newPaymentData.patientName = patientName;
    newPaymentData.paymentDate = today;
    newPaymentData.doctorCode = doctorCode;
    newPaymentData.payableAmount = payableAmount;
    newPaymentData.discountAmount = discountAmount;
    newPaymentData.receivedAmount = receivedAmount;
    newPaymentData.paymentType = paymentType;
    newPaymentData.referenceNumber = $('#referenceNumber').val();
    newPaymentData.paymentDiscription = $('#paymentDescription').val();
    


    $.ajax({
        type: "POST",
        url: "WebService.asmx/savePaymentData",
        data: '{payment: ' + JSON.stringify(newPaymentData) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            $.toast({
                heading: 'Payment Details Saved',
                text: 'Payment details of the patient saved successfully.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
            clearPaymentForm();
        },
        error: function (response) {
            $.toast({
                heading: 'Error Saving Payment Details',
                text: 'Their was error saving payment details of the patient.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });
}

function reSendReceiptMail(pnumber) {
    var paymentObj = {};
    paymentObj.paymentId = pnumber;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientPaymentByNumber",
        data: '{payment: ' + JSON.stringify(paymentObj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            var newPaymentData = {};
            newPaymentData.paymentId = pnumber;
            newPaymentData.patientCode = response.d.patientCode;
            newPaymentData.patientName = response.d.patientName;
            newPaymentData.paymentDate = response.d.paymentDate;
            newPaymentData.patientAddress = '-';
            newPaymentData.payableAmount = response.d.payableAmount;
            newPaymentData.discountAmount = response.d.discountAmount;
            newPaymentData.receivedAmount = response.d.receivedAmount;
            newPaymentData.paymentType = response.d.paymentType;
            newPaymentData.paymentDiscription = response.d.paymentDiscription;



            $.ajax({
                type: "POST",
                url: "WebService.asmx/sendPaymentReceiptMail",
                data: '{payment: ' + JSON.stringify(newPaymentData) + '}',
                contentType: "application/json",
                dataType: "json",
                beforeSend: function () {
                    $('#loaderImage').show();
                },
                complete: function () {
                    $('#loaderImage').hide();
                },
                success: function (response) {
                    if (response.d == "true") {
                        $.toast({
                            heading: 'Mail Sent To Patient',
                            text: 'Payment Receipt was successfully mailed to patient.',
                            position: 'bottom-right',
                            loaderBg: '#ff6849',
                            icon: 'success',
                            hideAfter: 3500,
                            stack: 6
                        });
                        savePaymentData();
                    }
                    else {
                        $.toast({
                            heading: 'Error Sending Mail',
                            text: 'Their was an error while sending mail to patient.',
                            position: 'bottom-right',
                            loaderBg: '#ff6849',
                            icon: 'error',
                            hideAfter: 3500,
                            stack: 6
                        });
                    }
                },
                error: function (response) {
                    $.toast({
                        heading: 'Error Saving Payment Details',
                        text: 'Their was an error saving payment details of the patient.',
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
                heading: 'Error loading patient payment',
                text: 'Their was error while loading the patient invoice.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });

}

function sendReceiptMail()
{
    var patientCode = $('#patientCode').val();
    if (patientCode == "")
    {
        $.toast({
            heading: 'Please Select Patient',
            text: 'Select patient and send mail.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500,
            stack: 6
        });

        return false;
    }
    var patientName = $('#patientName').val();
    var payableAmount = $('#payableAmount').val();
    var discountAmount = $('#discountAmount').val();
    var receivedAmount = $('#receivedAmount').val();
    var paymentType = $('#paymentType').val();
    var paymentDiscription = $('#paymentDescription').val();

    if (paymentType == "") {
        $.toast({
            heading: 'Please Select Payment Type',
            text: 'Select payment type from dropdown list .',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500,
            stack: 6
        });
        return false;
    }

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
    var today = dd + '-' + mm + '-' + yyyy;

    var newPaymentData = {};
    newPaymentData.paymentId = globalpaymentNumber;
    newPaymentData.patientCode = patientCode;
    newPaymentData.patientName = patientName;
    newPaymentData.paymentDate = today;
    newPaymentData.patientAddress = $('#patientAddress').val();
    newPaymentData.payableAmount = payableAmount;
    newPaymentData.discountAmount = discountAmount;
    newPaymentData.receivedAmount = receivedAmount;
    newPaymentData.paymentType = paymentType;
    newPaymentData.paymentDiscription = paymentDiscription;



    $.ajax({
        type: "POST",
        url: "WebService.asmx/sendPaymentReceiptMail",
        data: '{payment: ' + JSON.stringify(newPaymentData) + '}',
        contentType: "application/json",
        dataType: "json",
        beforeSend: function () {
            $('#loaderImage').show();
        },
        complete: function () {
            $('#loaderImage').hide();
        },
        success: function (response) {
            if (response.d == "true") {
                $.toast({
                    heading: 'Mail Sent To Patient',
                    text: 'Payment Receipt was successfully mailed to patient.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'success',
                    hideAfter: 3500,
                    stack: 6
                });
                savePaymentData();
            }
            else {
                $.toast({
                    heading: 'Error Sending Mail',
                    text: 'Their was an error while sending mail to patient.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500,
                    stack: 6
                });
            }
        },
        error: function (response) {
            $.toast({
                heading: 'Error Saving Payment Details',
                text: 'Their was an error saving payment details of the patient.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });
}

function loadPaymentReceiptsByNumber(pnumber)
{
    $('#loadallpayments').empty();
    var paymentObj = {};
    paymentObj.paymentId = pnumber;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientPaymentByNumber",
        data: '{payment: ' + JSON.stringify(paymentObj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
                $('#loadallpayments').append('<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">' +
                    '<div class="panel panel-default">' +
                    '<div class="panel-heading"><h2>Invoice - ' + response.d.paymentId + '</h2> </div>' +
                    '<div class="panel-wrapper collapse in">' +
                    '<div class="panel-body">' +
                    '<h2>Name - ' + response.d.patientName + ' </h2>' +
                    '<h2>Date - ' + response.d.paymentDate + ' </h2>' +
                    '<h2>Total - <i class="fa fa-inr"></i>' + response.d.receivedAmount + ' </h2>' +
                    '</div>' +
                    '</div>' +

                    ' <div class="panel-footer" >' +
                    '<div class="text-right">' +
                    '<a class="" id="' + response.d.paymentId + '" onclick="printLoadednvoice(this.id)" style="color:#fff;"><div class="btn btn-primary btn-sm " style="margin-top: 4px;" ><i class="fa fa-print"></i> Print</div></a>&nbsp&nbsp' +
                    '<a class="" id="' + response.d.paymentId + '" onclick="reSendReceiptMail(this.id)" style="color:#fff;"><div class="btn btn-primary btn-sm " style="margin-top: 4px;" ><i class="fa fa-paper-plane"></i> Send Mail</div></a>' +
                    '</div>' +
                    '</div>' +
                    '</div >' +
                    ' </div>');
        },
        error: function (response) {
            $.toast({
                heading: 'Error loading patient payment',
                text: 'Their was error while loading the patient invoice.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function loadPaymentReceiptsByPatientId(pcode) {
    $('#loadallpayments').empty();
    var paymentsobj = {};
    paymentsobj.patientCode = pcode;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientPaymentsById",
        data: '{payment: ' + JSON.stringify(paymentsobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function (key, value) {
                $('#loadallpayments').append('<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">' +
                    '<div class="panel panel-default">' +
                    '<div class="panel-heading"><h2>Receipt - ' + value.paymentId + '</h2> </div>' +
                    '<div class="panel-wrapper collapse in">' +
                    '<div class="panel-body">' +
                    '<h2>Name - ' + value.patientName + ' </h2>' +
                    '<h2>Date - ' + value.paymentDate + ' </h2>' +
                    '<h2>Total - <i class="fa fa-inr"></i>' + value.paymentTotal + ' </h2>' +
                    '</div>' +
                    '</div>' +

                    ' <div class="panel-footer" >' +
                    '<div class="text-right">' +
                    '<a class="" id="' + value.paymentId + '" onclick="printLoadednvoice(this.id)" style="color:#fff;"><div class="btn btn-primary btn-sm " style="margin-top: 4px;" ><i class="fa fa-pencil"></i> Print</div></a>&nbsp&nbsp' +
                    '<a class="" id="' + value.paymentId + '" onclick="reSendReceiptMail(this.id)" style="color:#fff;"><div class="btn btn-primary btn-sm " style="margin-top: 4px;" ><i class="fa fa-paper-plane"></i> Send Mail</div></a>' +
                    '</div>' +
                    '</div>' +
                    '</div >' +
                    ' </div>');
            });
        },
        error: function (response) {
            $.toast({
                heading: 'Error loading patient payment',
                text: 'Their was error while loading the patient invoice.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function printLoadednvoice(pnumber) {


    var paymentNumber, today, payableAmount, discountAmount, paymentType, patientName, receivedAmount, paymentDiscription;

    var paymentObj = {};
    paymentObj.paymentId = pnumber;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientPaymentByNumber",
        data: '{payment: ' + JSON.stringify(paymentObj) + '}',
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (response) {
            paymentNumber = response.d.paymentId;
            today = response.d.paymentDate;
            patientName = response.d.patientName;
            discountAmount = response.d.discountAmount;
            payableamount = response.d.payableAmount;
            receivedAmount = response.d.receivedAmount;
            paymentType = response.d.paymentType;
            paymentDiscription = response.d.paymentDiscription;
          
        },
        error: function (response) {
            $.toast({
                heading: 'Error loading patient payment',
                text: 'Their was error while loading the patient invoice.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });


    var data = "<tr class='details'>" +
        "<td>1</td>" +
        "<td>" + today + "</td>" +
        "<td>" + payableamount + "</td>" +
        "<td>" + discountAmount + "</td>" +
        "<td>" + paymentType + "</td>"+
        "<td>" + paymentDiscription + "</td></tr > ";


    var myWindow = window.open('', 'my div', 'height=900,width=1800');

    myWindow.document.write('<html>'+
        '<head>' +
        '<meta charset="utf-8">' +
        '<title>Stride</title>' +

        '<style>' +
        '.invoice-box {' +
        'max-width: 800px;' +
        'margin: auto;' +
        'padding: 30px;' +
        'border: 1px solid #eee;' +
        'box-shadow: 0 0 10px rgba(0, 0, 0, .15);' +
        'font-size: 16px;' +
        'line-height: 24px;' +
        'font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;'+
        'color: #555;' +
        '}' +

        '.invoice-box table {' +
        'width: 100%;' +
        'line-height: inherit;' +
        'text-align: left;' +
        '}' +

        '.invoice-box table td {' +
        'padding: 5px;' +
        'vertical-align: top;' +
        '}' +

        '.invoice-box table tr td:nth-child(2) {' +
        'text-align: right;' +
        '}' +

        '.invoice-box table tr.top table td {' +
        'padding-bottom: 20px;' +
        '}' +

        '.invoice-box table tr.top table td.title {' +
        'font-size: 45px;' +
        'line-height: 45px;' +
        'color: #333;' +
        '}' +

        '.invoice-box table tr.information table td {' +
        'padding-bottom: 40px;' +
        '}' +

        '.invoice-box table tr.heading td {' +
        'background: #eee;' +
        'border-bottom: 1px solid #ddd;' +
        'font-weight: bold;' +
        '}' +

        '.invoice-box table tr.details td {' +
        'padding-bottom: 20px;' +
        '}' +

        '.invoice-box table tr.item td{' +
        'border-bottom: 1px solid #eee;' +
        '}' +

        '.invoice-box table tr.item.last td {' +
        'border-bottom: none;' +
        '}' +

        '.invoice-box table tr.total td:nth-child(2) {' +
        'border-top: 2px solid #eee;' +
        'font-weight: bold;' +
        '}' +

        '@media only screen and (max-width: 600px) {' +
        '.invoice-box table tr.top table td {' +
        'width: 100%;' +
        'display: block;' +
        'text-align: center;' +
        '}' +

        '.invoice-box table tr.information table td {' +
        'width: 100%;' +
        'display: block;' +
        'text-align: center;' +
        '}' +
        '}' +

        '.rtl {' +
        'direction: rtl;' +
        'font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;'+
        '}' +

        '.rtl table {' +
        'text-align: right;' +
        '}' +

        '.rtl table tr td:nth-child(2) {' +
        'text-align: left;' +
        '}' +
        '</style>' +
        '</head>' +

        '<body>' +
        '<div class="invoice-box">' +
        '<table cellpadding="0" cellspacing="0">' +
        '<tr class="top">' +
        '<td colspan="5">' +
        '<table>' +
        '<tr>' +
        '<td class="title">' +
        '<img src="plugins/images/Logo.jpg" width=100 height=100 alt="logo" />' +
        '    <h4>Stridephysio</h4>' +
        '</td>' +

        '<td>' +
        '    Receipt No  # ' + paymentNumber + '<br>' +
        ' Date : ' + today + ''+
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +

        '<tr class="information">' +
        '<td colspan="5">' +
        '<table>' +
        '<tr>' +
        '<td>' +
        '    #34, Kaveriyappa Layout,<br>' +
        '    Millers Tank Bund Road,<br>' +
        '    Vasantha Nagar,<br>' +
        '    (Opp to Mahaveer Jain Hospital),<br>' +
        '    Bengaluru -560 052' +
        '</td>' +

        '<td class="test">' +
        '    ' + patientName + '<br>' +
        '   ' + globalPatientEmail + ' <br>' +
        '    ' + globalPatientPhone + '' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +

        '<tr class="heading">'+
        '<td>'+
        '#' +
        '</td>' +
        '<td>' +
        'Payment Date' +
        '</td>' +
        '<td>' +
        'Due Amount' +
        '</td>' +
        '<td>' +
        'Discount' +
        '</td>' +
        '<td>' +
        'Payment Method' +
        '</td>' +
        '<td>' +
        'Payment Description' +
        '</td>' +

        '</tr>' +
            data +

        '<tr class="total">' +

        '<td></td>' +
        '<td colspan="5">' +
        'Received Amount: ' + receivedAmount+'' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</div>' +
        '</body>' +
        '</html>');

    myWindow.document.close(); // necessary for IE >= 10

    myWindow.onload = function () { // necessary if the div contain images

        myWindow.focus(); // necessary for IE >= 10
        myWindow.print();
        myWindow.close();
    };
}


function PrintPaymentReceipt() {


    var patientName = $('#patientName').val();
    var doctorName = $('#doctorName').val();
    
    if (patientName == "")
    {
        $.toast({
            heading: 'Select Patient',
            text: 'Please select patient by search on patient name input box.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    if (doctorName == "") {
        $.toast({
            heading: 'Select Doctor Name',
            text: 'Please select doctor from dropdown list.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    var payableAmount = $('#payableAmount').val();
    var discountAmount = $('#discountAmount').val();
    var receivedAmount = $('#receivedAmount').val();
    var paymentType = $('#paymentType').val();
    var paymentDiscription = $('#paymentDescription').val();

    if (paymentType == "") {
        $.toast({
            heading: 'Select Payment Type',
            text: 'Please select payment type from dropdown list',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
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
    var today = dd + '-' + mm + '-' + yyyy;


    var data = "<tr class='details'>" +
       "<td>1</td>" +
       "<td>" + today + "</td>" +
       "<td>" + payableAmount + "</td>" +
       "<td>" + discountAmount + "</td>" +
        "<td>" + paymentType + "</td>" +
        "<td>" + paymentDiscription + "</td></tr > ";


    var myWindow = window.open('', 'my div', 'height=900,width=1800');

    myWindow.document.write('<html>' +
        '<head>' +
        '<meta charset="utf-8">' +
        '<title>Stride</title>' +

        '<style>' +
        '.invoice-box {' +
        'max-width: 800px;' +
        'margin: auto;' +
        'padding: 30px;' +
        'border: 1px solid #eee;' +
        'box-shadow: 0 0 10px rgba(0, 0, 0, .15);' +
        'font-size: 16px;' +
        'line-height: 24px;' +
        'font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;' +
        'color: #555;' +
        '}' +

        '.invoice-box table {' +
        'width: 100%;' +
        'line-height: inherit;' +
        'text-align: left;' +
        '}' +

        '.invoice-box table td {' +
        'padding: 5px;' +
        'vertical-align: top;' +
        '}' +

        '.invoice-box table tr td:nth-child(2) {' +
        'text-align: right;' +
        '}' +

        '.invoice-box table tr.top table td {' +
        'padding-bottom: 20px;' +
        '}' +

        '.invoice-box table tr.top table td.title {' +
        'font-size: 45px;' +
        'line-height: 45px;' +
        'color: #333;' +
        '}' +

        '.invoice-box table tr.information table td {' +
        'padding-bottom: 40px;' +
        '}' +



        '.invoice-box table tr.heading td {' +
        'background: #eee;' +
        'border-bottom: 1px solid #ddd;' +
        'font-weight: bold;' +
        '}' +

        '.invoice-box table tr.details td {' +
        'padding-bottom: 20px;' +
        '}' +

        '.invoice-box table tr.item td{' +
        'border-bottom: 1px solid #eee;' +
        '}' +

        '.invoice-box table tr.item.last td {' +
        'border-bottom: none;' +
        '}' +

        '.invoice-box table tr.total td:nth-child(2) {' +
        'border-top: 2px solid #eee;' +
        'font-weight: bold;' +
        '}' +

        '@media only screen and (max-width: 600px) {' +
        '.invoice-box table tr.top table td {' +
        'width: 100%;' +
        'display: block;' +
        'text-align: center;' +
        '}' +

        '.invoice-box table tr.information table td {' +
        'width: 100%;' +
        'display: block;' +
        'text-align: center;' +
        '}' +
        '}' +

        '.rtl {' +
        'direction: rtl;' +
        'font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;' +
        '}' +

        '.rtl table {' +
        'text-align: right;' +
        '}' +

        '.rtl table tr td:nth-child(2) {' +
        'text-align: left;' +
        '}' +

        '.invoice-box table tr.information table td .test {' +
        'float:right;' +
        '}' +

        '</style>' +
        '</head>' +

        '<body>' +
        '<div class="invoice-box">' +
        '<table cellpadding="0" cellspacing="0">' +
        '<tr class="top">' +
        '<td colspan="5">' +
        '<table>' +
        '<tr>' +
        '<td class="title">' +
        '    <h4>Stride</h4>' +
        '</td>' +

        '<td>' +
        '    Receipt No  # ' + $('#paymentNumber').val() +'<br>' +
        ' Date : ' + today + '' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +

        '<tr class="information">' +
        '<td colspan="5">' +
        '<table>' +
        '<tr>' +
        '<td>' +
        '    #34, Kaveriyappa Layout,<br>' +
        '    Millers Tank Bund Road,<br>' +
        '    Vasantha Nagar,<br>' +
        '    (Opp to Mahaveer Jain Hospital),<br>' +
        '    Bengaluru -560 052' +
        '</td>' +

        '<td class="test">' +
        '    ' + patientName + '<br>' +
        '   ' + globalPatientEmail + ' <br>' +
        '    ' + globalPatientPhone + '' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +

        '<tr class="heading">' +
        '<td>' +
        '#' +
        '</td>' +
        '<td>' +
        'Date' +
        '</td>' +
        '<td>' +
        'Due Amount' +
        '</td>' +
        '<td>' +
        'Discount' +
        '</td>' +
        '<td>' +
        'Payment Method' +
        '</td>' +
        '<td>' +
        'Payment Description' +
        '</td>' +

        '</tr>' +
        data +

        '<tr class="total">' +

        '<td></td>' +
        '<td colspan="5">' +
        'Received Amount: ' + receivedAmount + '' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</div>' +
        '</body>' +
        '</html>');

    myWindow.document.close(); // necessary for IE >= 10

    myWindow.onload = function () { // necessary if the div contain images

        myWindow.focus(); // necessary for IE >= 10
        myWindow.print();
        myWindow.close();
    };

    savePaymentData();
}


function clearPaymentForm()
{
    $('#patientCode').val('');
    $('#patientName').val('');
    $('#paymentNumber').val('');

    $('#doctorName').val('');
    $('#payableAmount').val('');
    $('#discountAmount').val('');
    $('#receivedAmount').val('');
    $('#pendingAmount').val('');
    $('#paymentType').val('');
    $('#referenceNumber').val('');
    $('#paymentDescription').val('');
}

