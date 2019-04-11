var invoicearray = [];
var ServiceDetails = [];
var printInvoiceServieArray = [];
var globalpatientName, globaldoctorName = Session.get("DoctorName"),globalpatientEmail,globalpatientPhone ;
var globalsubtotal, globalgsttotal, globaltotalamount, globalpatientcode, globalInvoiceNumber, globalDueAmount, globalPatientAddress, globalToday;

$(document).ready(function () {
    $('#totalservicenumber').val(0);
    var urlParams = getParameter('invoicepatientCode');

    if (urlParams != false) {
        var urldata2 = urlParams;
        getPatientDetails(urldata2);
        globalpatientcode = urldata2;
        loadPatientInvoice(urldata2);
    }
    urlParams = getParameter('editpatientCode');
    if (urlParams != false) {
        var urldata3 = urlParams;
		$('#patientCode').val(urldata3);
        var urldata4 = getParameter('invoiceId');
        globalpatientcode = urldata3;
        getPatientDetails(urldata3);
        patientDueAmount(urldata3);
        loadEditBillDetails(urldata3, urldata4);
        var a1 = document.getElementById('allinvoicehref');
        a1.setAttribute("href", "patient-all-invoice.aspx?invoicepatientCode=" + urldata3);
        $('#doctorName').text(globaldoctorName);
    }
    else {
        urlParams = getParameter('patientCode');
        if (urlParams != false) {
            var urldata = urlParams;
            $('#patientCode').val(urldata);
            globalpatientcode = urldata;
            getPatientDetails(urldata);
            generateNewInvoiceNumber();
            patientDueAmount(urldata);
            var a1 = document.getElementById('allinvoicehref');
            a1.setAttribute("href", "patient-all-invoice.aspx?invoicepatientCode=" + urldata);
            $('#doctorName').text(globaldoctorName);

        }
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

            if (!response.d[4].patientInvoiceView) {
                $('.viewInvoiceRight').hide();
            }
            if (!response.d[4].patientInvoicePrint) {
                $('.printInvoiceRight').hide();
            }
            if (!response.d[4].patientInvoiceAdd) {
                $('.addInvoiceRight').hide();
            }
            if (!response.d[4].patientInvoiceEdit) {
                $('.editInvoiceRight').hide();
            }

        },
        error: function (response) {
            alert('error');
        }

    });
}


function patientDueAmount(pcode)
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
            globalDueAmount = response.d.payableAmount;

                $('#DueAmount').text('0');

                $('#DueAmount').text(response.d.payableAmount);
            
            
        },
        error: function (response) {
            alert('error');
        }

    });
}

function generateNewInvoiceNumber()
{
    $.ajax({
        type: "POST",
        url: "WebService.asmx/generateInvoiceNumber",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            globalInvoiceNumber = response.d.invoiceId;
            $('#invoiceNumber').text('#'+response.d.invoiceId);

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
            $('#invoiceDate').val(dd + '/' + mm + '/' + yyyy);
            globalToday = dd + '-' + mm + '-' + yyyy;
            
        },
        error: function (response) {
            $.toast({
                heading: 'Error retrieving patient details',
                text: 'Their was error retrieving retrieving data.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}
function getPatientDetails(pcode)
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
            globalpatientName = response.d.patientName;
            globalPatientAddress = response.d.patientAddress;
            globalpatientEmail = response.d.patientEmail;
            globalpatientPhone = response.d.patientPhone;
            $('#patientName').text(response.d.patientName);
            $('#patientAddress').text(response.d.patientAddress);
            $('#patientEmail').text(response.d.patientEmail);
            $('#patientPhone').text(response.d.patientPhone);

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
            $('#invoiceDate').val(dd + '/' + mm + '/' + yyyy);
            globalToday = dd + '-' + mm + '-' + yyyy;
        },
        error: function (response) {
            $.toast({
                heading: 'Error retrieving patient details',
                text: 'Their was error retrieving retrieving data.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function loadAllServiceList()
{
    $('#patientInvoiceTable tbody').empty();


    $.ajax({
        type: "POST",
        url: "WebService.asmx/getAllServiceListDetails",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var i = 0;
            $.each(response.d, function (key, value) {
                var servicedata = [value.serviceCode, value.serviceName];
                ServiceDetails.push(servicedata);
                $('#patientInvoiceTable tbody').append('<tr>' +
                    '<td class="text-center" > ' + ++i + ' <input type="hidden" id="serviceCode' + i + '" value="' + value.serviceCode + '"> </td >' +
                    '<td> '+ value.serviceName +' </td>'+
                    '<td id="gendet"><textarea placeholder="Enter description"  cols="2" rows="2" class="form-control" name="serviceDescription' + i + '" id="serviceDescription' + i + '" onchange="updateBill(this.id,' + i +')"></textarea></td>'+
                    '<td class="text-right"><input type="number"  name="serviceQunatity' + i + '" id="serviceQunatity' + i + '" value="0" style="width:40px;" onchange="updateBill(this.id,' + i +')" style="text-align:center;" /> </td>'+
                    '<td class="text-right"> <i class="fa fa-inr"></i><input type="hidden" value="' + value.serviceCharge + '" id="serviceCharge' + i + '" name="serviceCharge' + i +'" /><span id="updateserviceCharge'+i+'" >0</span> </td>'+
                    '<td class="text-right"> <i class="fa fa-inr"></i><input type="hidden" value="' + value.serviceGst + '" id="serviceGst' + i + '" name="serviceGst' + i + '" /> <span id="updateserviceGst' + i +'" >0</span> </td>'+
                    '<td class="text-right"><i class="fa fa-inr"><span id="rowTotal'+i+'">0</span></td></tr >');

            });
            $('#totalservicenumber').val(i);
            
        },
        error: function (response) {
            $.toast({
                heading: 'Error retrieving service list',
                text: 'Their was error retrieving service list.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function removeInvoiceTableRow(rowid)
{
    var deleteservicecode = $('#invoiceServiceId' + rowid).text();
    var arrayLength = invoicearray.length;

    $('#rowId' + rowid).remove();
      

     
        var totalservices = $('#totalservicenumber').val();
        var subtotalamount = 0, gsttotalamount = 0, totalamount = 0;

        for (var j = 1; j <= totalservices; j++) {
            if ($('#updateserviceCharge' + j).text() != "") {
                
                subtotalamount += parseInt($('#updateserviceCharge' + j).text());
                gsttotalamount += parseInt($('#updateserviceGst' + j).text());
            }

        }

        totalamount = subtotalamount + gsttotalamount;

        globalsubtotal = subtotalamount;
        globalgsttotal = gsttotalamount;
        globaltotalamount = totalamount;

        $('#subtotalvalue').val(subtotalamount);
        $('#gstvalue').val(gsttotalamount);
        $('#totalvalue').val(totalamount);
        $('#subtotal').text(subtotalamount);
        $('#totalgst').text(gsttotalamount);
        $('#totalamount').text(totalamount);

        for (var k = 0; k < arrayLength; k++) {
            if (invoicearray[k][7] === deleteservicecode) {
                invoicearray.splice(k, 1);

            }

        }
        var totalservices2 = $('#totalservicenumberdelete').val();
        $('#totalservicenumberdelete').val(totalservices2 - 1);
       
}

function updateBill(id, index)
{
    var serviceCode = $('#serviceCode' + index).val();
    var invoiceServiceId = $('#invoiceServiceId' + index).text();
    var serviceName = $('#serviceName' + index).text();
        var serviceCharge = $('#serviceCharge' + index).val();
        var serviceGst = $('#serviceGst' + index).val();
        var quantity = $('#serviceQunatity' + index).val();
        if (quantity < 0)
        {
            $.toast({
                heading: 'Quantity Error',
                text: 'Please select quantity greater then 0 .',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
            return false;
        }
        var serviceDescription = $('#serviceDescription' + index).val();
        var serviceDate = $('#serviceDate' + index).val();

        var updateserviceCharge = serviceCharge * quantity;
        var updateserviceGst = (updateserviceCharge * serviceGst) / 100;
        var rowtotal = updateserviceCharge + updateserviceGst;

        $('#updateserviceCharge' + index).text(updateserviceCharge);
        $('#updateserviceGst' + index).text(updateserviceGst);

        var totalservices = $('#totalservicenumber').val();
        var subtotalamount = 0, gsttotalamount = 0, totalamount = 0;

        for (var j = 1; j <= totalservices; j++) {
            if ($('#updateserviceCharge' + j).text() != "") {
              
                subtotalamount += parseInt($('#updateserviceCharge' + j).text());
                gsttotalamount += parseInt($('#updateserviceGst' + j).text());
            }

        }

        totalamount = subtotalamount + gsttotalamount;

        globalsubtotal = subtotalamount;
        globalgsttotal = gsttotalamount;
        globaltotalamount = totalamount;

        $('#subtotalvalue').val(subtotalamount);
        $('#gstvalue').val(gsttotalamount);
        $('#totalvalue').val(totalamount);
        $('#rowTotal' + index).text(rowtotal);
        $('#subtotal').text(subtotalamount);
        $('#totalgst').text(gsttotalamount);
        $('#totalamount').text(totalamount);

        var serviceinvoice = [serviceCode, quantity, updateserviceCharge, updateserviceGst, serviceDescription, rowtotal, serviceDate, invoiceServiceId, serviceName];



        var arrayLength = invoicearray.length;

        if (arrayLength == 0) {
            invoicearray[0] = serviceinvoice;
        }
        else {
            var flag = 0;
            for (var k = 0; k < arrayLength; k++) {
                if (invoicearray[k][7] == invoiceServiceId) {

                    invoicearray[k] = serviceinvoice;
                    flag = 1;
                }

            }
            if (flag == 0) {
                invoicearray[arrayLength] = serviceinvoice;
            }
        }
    
}

function saveInvoice()
{
    var patientCode = $('#patientCode').val();
    if (patientCode == "")
    {
        $.toast({
            heading: 'Select Patient',
            text: 'Please select Patient first.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }

    if (globalInvoiceNumber == "")
    {
        $.toast({
            heading: 'Select Patient',
            text: 'Please select Patient again.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }

    if (globalInvoiceNumber == null) {
        $.toast({
            heading: 'Select Patient',
            text: 'Please select Patient again.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }


    var invoicesubtotal = $('#subtotalvalue').val();
    var gsttotal = $('#gstvalue').val();
    var totalamount = $('#totalvalue').val();



    var invoiceObj = {};
    invoiceObj.invoiceId = globalInvoiceNumber;
    invoiceObj.invoiceDate = dateformateChange($('#invoiceDate').val());
    invoiceObj.patientName = globalpatientName
    invoiceObj.patientCode = patientCode;
    invoiceObj.serviceData = invoicearray;
    invoiceObj.subTotal = invoicesubtotal;
    invoiceObj.gstTotal = gsttotal;
    invoiceObj.totalAmount = totalamount;
    invoiceObj.doctorCode = Session.get("DoctorCode");


    var i = 0;
    var size = invoicearray.length;
    while ( size >= i+1 ) {
        if (invoicearray[i][1] == 0) {
            invoicearray.splice(i, 1);
            size = invoicearray.length;
        } else {
            i++;
        }
    }


    $.ajax({
        type: "POST",
        url: "WebService.asmx/saveInvoiceData",
        data: '{invoice: ' + JSON.stringify(invoiceObj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.toast({
                heading: 'Invoice Saved Successfully',
                text: 'Patient invoice was save successfully.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
            window.location.href = "add-payment.aspx?patientCode=" + globalpatientcode;
            $('#patientCode').val('');
            $('#patientInvoiceTable tbody').empty();
            $('gstvalue').val('');
            $('#totalvalue').val('');
            $('#subtotal').html("");
            $('#totalgst').html("");
            $('#totalamount').text(0);
            $('#patientName').html("");
            $('#patientAddress').html("");
            $('#patientEmail').html("");
            $('#patientPhone').html("");
            $('#DueAmount').html("");
        },
        error: function (response) {
            $.toast({
                heading: 'Error Saved Invoice',
                text: 'Their was error saving invoice details patient.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });
}

function SendInvoiceMail(invoiceType)
{
    if (invoiceType == 'saveinvoice')
    {

        saveInvoice();
    }
    if (invoiceType == 'editinvoice')
    {
        updateInvoiceBill();
    }

    var patientCode = $('#patientCode').val();
    if (patientCode == "") {
        $.toast({
            heading: 'Select Patient',
            text: 'Please select Patient first.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }

    if (globalInvoiceNumber == "") {
        $.toast({
            heading: 'Select Patient',
            text: 'Please select Patient again.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }

    var invoicesubtotal = $('#subtotalvalue').val();
    var gsttotal = $('#gstvalue').val();
    var totalamount = $('#totalvalue').val();

    var invoiceObj = {};
    invoiceObj.invoiceId = globalInvoiceNumber;
    invoiceObj.invoiceDate = $('#invoiceDate').val();
    invoiceObj.patientAddress = globalPatientAddress;
    invoiceObj.patientName = globalpatientName;
    invoiceObj.patientCode = patientCode;
    invoiceObj.serviceData = invoicearray;
    invoiceObj.subTotal = invoicesubtotal;
    invoiceObj.gstTotal = gsttotal;
    invoiceObj.totalAmount = totalamount;
    invoiceObj.doctorName = globaldoctorName;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/sendInvoiceMailToPatient",
        data: "{invoice: " + JSON.stringify(invoiceObj) + "}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loaderImage').show();
            $('#overlay').show();
        },
        complete: function () {
            $('#loaderImage').hide();
            $('#overlay').hide();
        },
        success: function (response) {
            if (response.d == "true") {
                $.toast({
                    heading: 'Mail send successfully',
                    text: 'Invoice was mailed to patient.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'success',
                    hideAfter: 3500,
                    stack: 6
                });
            }
            else {
                $.toast({
                    heading: 'Error in sending mail',
                    text: 'Their was error sending mail to patient.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
            }
        },
        error: function (response) {
            $.toast({
                heading: 'Error in sending mail',
                text: 'Their was error sending mail to patient.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });
}


function proceedToPayment(invoiceType)
{
    if (invoiceType == 'saveinvoice') {
        saveInvoice();
    }
    if (invoiceType == 'editinvoice') {
        updateInvoiceBill();
    }
 
   
}


function loadPatientInvoice(pcode)
{
    $('#loadallinvoice').empty();
    var invoiceobj = {};
    invoiceobj.patientCode = pcode;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientInvoices",
        data: '{invoice: ' + JSON.stringify(invoiceobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function (key, value) {
                $('#loadallinvoice').append('<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">' +
                    '<div class="panel panel-default">' +
                    '<div class="panel-heading"><h2>Invoice - ' + value.invoiceId + '</h2> </div>' +
                    '<div class="panel-wrapper collapse in">' +
                    '<div class="panel-body">' +
                    '<h2>Name - ' + value.patientName + ' </h2>' +
                    '<h2>Date - ' + value.invoiceDate + ' </h2>' +
                    '<h2>Total - <i class="fa fa-inr"></i>' + value.totalAmount + ' </h2>' +
                    '</div>' +
                    '</div>' +

                    ' <div class="panel-footer" >' +
                    '<div class="text-right">'+
                    '<a class="editInvoiceRight" href="edit-patient-invoice.aspx?editpatientCode=' + value.patientCode + '&invoiceId=' + value.invoiceId + '" style="color:#fff;"><div class="btn btn-primary btn-sm " style="margin-top: 4px;" ><i class="fa fa-pencil"></i> Edit</div></a>&nbsp&nbsp&nbsp' +
                    '<a class="deleteInvoiceRight"  onclick="deleteInvoice(' + value.invoiceId+'); return false;" style="color:#fff;"><div class="btn btn-danger btn-sm " style="margin-top: 4px;" ><i class="fa fa-pencil"></i> Delete</div></a>' +
                    '</div>'+
                    '</div>' +
                    '</div >' +
                    ' </div>');
            });
        },
        error: function (response) {
            $.toast({
                heading: 'Error loading patient invoice',
                text: 'Their was error while loading the patient invoice.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function loadPatientInvoiceByInvoiceNumber(invoiceId) {
    $('#loadallinvoice').empty();
    var invoiceobj = {};
    invoiceobj.invoiceId = invoiceId;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientInvoicesByInvoiceNumber",
        data: '{invoice: ' + JSON.stringify(invoiceobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
          
                $('#loadallinvoice').append('<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">' +
                    '<div class="panel panel-default">' +
                    '<div class="panel-heading"><h2>Invoice - ' + response.d.invoiceId + '</h2> </div>' +
                    '<div class="panel-wrapper collapse in">' +
                    '<div class="panel-body">' +
                    '<h2>Name - ' + response.d.patientName + ' </h2>' +
                    '<h2>Date - ' + response.d.invoiceDate + ' </h2>' +
                    '<h2>Total - <i class="fa fa-inr"></i>' + response.d.totalAmount + ' </h2>' +
                    '</div>' +
                    '</div>' +
                    ' <div class="panel-footer" >' +
                    '<div class="text-right">' +
                    '<a class="editInvoiceRight" href="edit-patient-invoice.aspx?editpatientCode=' + response.d.patientCode + '&invoiceId=' + response.d.invoiceId + '" style="color:#fff;"><div class="btn btn-primary btn-sm " style="margin-top: 4px;" ><i class="fa fa-pencil"></i> Edit</div></a>&nbsp&nbsp&nbsp' +
                    '<a class="deleteInvoiceRight"  onclick="deleteInvoice(' + response.d.invoiceId +'); return fasle;"  style="color:#fff;"><div class="btn btn-danger btn-sm " style="margin-top: 4px;" ><i class="fa fa-pencil"></i> Delete</div></a>' +
                    '</div>' +
                    '</div>' +
                    '</div >' +
                    ' </div>');
        },
        error: function (response) {
            $.toast({
                heading: 'Error loading patient invoice',
                text: 'Their was error while loading the patient invoice.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}



function loadEditBillDetails(pcode,invoiceid)
{
    var invoiceobj = {};
    invoiceobj.patientCode = pcode;
    invoiceobj.invoiceId = invoiceid;


    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientInvoicesById",
        data: '{invoice: ' + JSON.stringify(invoiceobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $('#invoiceNumber').text('#' + response.d.invoiceId);
            globalInvoiceNumber = response.d.invoiceId;
            $('#subtotal').text(response.d.subTotal);
            $('#subtotalvalue').val(response.d.subTotal);
            $('#totalgst').text(response.d.gstTotal);
            $('#gstvalue').val(response.d.gstTotal);
            $('#totalamount').text(response.d.totalAmount);
            $('#totalvalue').val(response.d.totalAmount);
            $('#transcationId').val(response.d.transcationId);
            globalsubtotal = response.d.subTotal;
            globalgsttotal = (response.d.gstTotal);
            globaltotalamount = (response.d.totalAmount);

        },
        error: function (response) {
            $.toast({
                heading: 'Error loading invoice details',
                text: 'Their was error while loading  invoice details.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getPatientInvoiceFullDetails",
        data: '{invoice: ' + JSON.stringify(invoiceobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var servicelength = 0;
            $.each(response.d, function (key, value) {

                var serviceobj = {};
                serviceobj.serviceCode = value.invoiceServiceCode;
                $.ajax({
                    type: "POST",
                    url: "WebService.asmx/editServiceById",
                    data: '{service: ' + JSON.stringify(serviceobj) + '}',
                    contentType: "application/json",
                    dataType: "json",
                    success: function (response) {
                        var servicedata = [response.d.serviceCode, response.d.serviceName];
                        ServiceDetails.push(servicedata);
                        var i = servicelength;

                        var datePickerOptions = {
                            dateFormat: 'dd/mm/yy',
                            changeMonth: true,
                        }


                        $('#patientInvoiceTable tbody').append('<tr>' +
                            '<td></td>'+
                            '<td class="text-center" ><span id="invoiceServiceId'+ ++i +'">' + i + '</span><input type="hidden" id="serviceCode' + i + '" value="' + response.d.serviceCode + '"> </td >' +
                            '<td><span id="serviceName' + i + '"> ' + response.d.serviceName + '</span> </td>' +
                            '<td><input type="text" id="serviceDate' + i + '" class="form-control mydatepicker" value="" placeholder="Invoice Date" style="width:150px;" onchange="updateBill(this.id,' + i + ')" ></td>'+
                            '<td id="gendet"><textarea placeholder="Enter description"  cols="2" rows="2" class="form-control" name="serviceDescription' + i + '" id="serviceDescription' + i + '" onchange="updateBill(this.id,' + i + ')" ></textarea></td>' +
                            '<td class="text-right"><input type="number"  name="serviceQunatity' + i + '" id="serviceQunatity' + i + '" value="0" style="width:40px;" onchange="updateBill(this.id,' + i + ')"  style="text-align:center;" /> </td>' +
                            '<td class="text-right"> <i class="fa fa-inr"></i><input type="hidden" value="' + response.d.serviceCharge + '" id="serviceCharge' + i + '" name="serviceCharge' + i + '" /><span id="updateserviceCharge' + i + '" >0</span> </td>' +
                            '<td class="text-right"> <i class="fa fa-inr"></i><input type="hidden" value="' + response.d.serviceGst + '" id="serviceGst' + i + '" name="serviceGst' + i + '" /> <span id="updateserviceGst' + i + '" >0</span> </td>' +
                            '<td class="text-right"><i class="fa fa-inr"><span id="rowTotal' + i + '">0</span></td></tr >');

                        $('#serviceDate' + i).datepicker(datePickerOptions);

                        $('#totalservicenumber').val(i);
                        $('#totalservicenumberdelete').val(i);
                        servicelength = i;
                        var serviceinvoice = [value.invoiceServiceCode, value.invoiceQuantity, value.invoiceCharges, value.invoiceGst, value.invoiceDescription, value.rowTotal, value.serviceDate, i,response.d.serviceName];
                        invoicearray.push(serviceinvoice);

                        $('#invoiceId').val(value.invoiceId);
                        $('#patientCode').val(value.patientCode);
                        var i = servicelength;
                        var scode = $('#serviceCode' + i).val();
                       
                        if (scode == value.invoiceServiceCode) {
                            $('#serviceDescription' + i).val(value.invoiceDescription);
                            $('#serviceQunatity' + i).val(value.invoiceQuantity);
                            $('#updateserviceCharge' + i).text(value.invoiceCharges);
                            $('#updateserviceGst' + i).text(value.invoiceGst);
                            $('#rowTotal' + i).text(value.rowTotal);
                            $('#serviceDate' + i).val(value.serviceDate);
                        }
                        
                    },
                    error: function (response) {
                        alert('error');
                    },
                   
                });

           

            });
        },
        error: function (response) {
            $.toast({
                heading: 'Error loading invoice details',
                text: 'Their was error while loading  invoice details.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });


  
}

function updateInvoiceBill()
{
    var patientCode = $('#patientCode').val();
    if (patientCode == "") {
        $.toast({
            heading: 'Select Patient',
            text: 'Please select Patient first.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }

    if (globalInvoiceNumber == "") {
        $.toast({
            heading: 'Select Patient',
            text: 'Please select Patient again.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }


    var invoicesubtotal = $('#subtotalvalue').val();
    var gsttotal = $('#gstvalue').val();
    var totalamount = $('#totalvalue').val();
    var transcationId = $('#transcationId').val();
    var invoiceId = $('#invoiceId').val();

    var invoiceObj = {};
    invoiceObj.invoiceId = invoiceId;
    invoiceObj.invoiceDate = dateformateChange($('#invoiceDate').val());
    invoiceObj.patientName = globalpatientName
    invoiceObj.serviceDetails = ServiceDetails;
    invoiceObj.patientCode = patientCode;
    invoiceObj.serviceData = invoicearray;
    invoiceObj.subTotal = invoicesubtotal;
    invoiceObj.gstTotal = gsttotal;
    invoiceObj.totalAmount = totalamount;
    invoiceObj.transcationId = transcationId;


    var i = 0;
    var size = invoicearray.length;
    while ( size >= i+1 ) {
        if (invoicearray[i][1] == 0) {
            invoicearray.splice(i, 1);
            size = invoicearray.length;
        } else {
            i++;
        }
    }


    $.ajax({
        type: "POST",
        url: "WebService.asmx/updatePatientInvoice",
        data: '{invoice: ' + JSON.stringify(invoiceObj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.toast({
                heading: 'Invoice Saved Successfully',
                text: 'Patient invoice was save successfully.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
            window.location.href = "add-payment.aspx?patientCode=" + globalpatientcode;
            $('#patientCode').val('');
            $('#patientInvoiceTable tbody').empty();
            $('gstvalue').val('');
            $('#totalvalue').val('');
            $('#subtotal').html("");
            $('#totalgst').html("");
            $('#totalamount').text(0);
            $('#patientName').html("");
            $('#patientAddress').html("");
            $('#patientEmail').html("");
            $('#patientPhone').html("");
            $('#DueAmount').html("");

        },
        error: function (response) {
            $.toast({
                heading: 'Error Saved Invoice',
                text: 'Their was error saving invoice details patient.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });
}

/*function updateInvoiceBill()
{
    var patientCode = $('#patientCode').val();
    if (patientCode == "") {
        alert('Select Patient');
        return false;
    }

    var invoicesubtotal = $('#subtotalvalue').val();
    var gsttotal = $('#gstvalue').val();
    var totalamount = $('#totalvalue').val();
    var invoiceId = $('#invoiceId').val();
    var transcationId = $('#transcationId').val();

    var invoiceObj = {};
    invoiceObj.serviceDetails = ServiceDetails;
    invoiceObj.patientCode = patientCode;
    invoiceObj.serviceData = invoicearray;
    invoiceObj.subTotal = invoicesubtotal;
    invoiceObj.gstTotal = gsttotal;
    invoiceObj.totalAmount = totalamount;
    invoiceObj.invoiceId = invoiceId;
    invoiceObj.transcationId = transcationId;




    $.ajax({
        type: "POST",
        url: "WebService.asmx/updatePatientInvoice",
        data: '{invoice: ' + JSON.stringify(invoiceObj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.toast({
                heading: 'Updated invoice successfully',
                text: 'Update of the invoice completed.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
           
        },
        error: function (response) {
            $.toast({
                heading: 'Error updating invoice',
                text: 'Their was error while updating  invoice details.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });


    
}*/

function PrintInvoice(invoiceType)
{
    if (invoiceType == 'saveinvoice')
    {
        saveInvoice();
    }
    if (invoiceType == 'editinvoice')
    {
        updateInvoiceBill();
    }

    var patientCode = $('#patientCode').val();
    if (patientCode == "") {
        $.toast({
            heading: 'Select Patient',
            text: 'Please select Patient first.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }

    if (globalInvoiceNumber == "") {
        $.toast({
            heading: 'Select Patient',
            text: 'Please select Patient again.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    var data= "";
    var count = 0;

    var subtotal = $('#subtotalvalue').val();
    var gsttotal = $('#gstvalue').val();
    var totalvalue = $('#totalvalue').val();



    for (var i = 0; i < invoicearray.length; i++) {
       
   
        data += '<tr class="details">' +
            '<td>' + ++count + '</td>' +
            '<td>' + invoicearray[i][8] + '</td>' +
            '<td>' + invoicearray[i][6] + '</td>' +
            '<td>' + invoicearray[i][4] + '</td>' +
            '<td>' + invoicearray[i][2] + '</td>' +
            '<td>' + invoicearray[i][1] + '</td>' +
            '<td>' + invoicearray[i][3] + '</td>' +
            '<td>' + invoicearray[i][5] + '</td>' +
            '</tr>';
         }




    var myWindow = window.open('', 'my div', 'height=900,width=1800');

    myWindow.document.write('<html>' +
        '<head>' +
        '<meta charset="utf-8">' +
        '<title> Stridephysio</title>' +

        '<style>' +
        '.invoice-box {' +
        'max-width: 800px;' +
        'margin: auto;' +
        'padding: 30px;' +
        'border: 1px solid #eee;' +
        'box-shadow: 0 0 10px rgba(0, 0, 0, .15);' +
        'font-size: 16px;' +
        'line-height: 24px;' +
        'font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;' +
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
        'border-bottom: 1px normal #ddd;' +
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
        'font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;'+
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
        '<td colspan="8">' +
        '<table>' +
        '<tr>' +
        '<td class="title">' +
        '<img src="../plugins/images/Logo.jpg" width=100 height=100 alt="logo" />'+
        '    <h4>Stridephysio</h4>' +
        '</td>' +

        '<td>' +
        '    Invoice : #' + globalInvoiceNumber + '<br>' +
        '    Doctor : ' + globaldoctorName + '<br>'+
        '    Created: ' + $('#invoiceDate').val() + '<br>' +
        '    Due: ' + globalDueAmount + '' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +

        '<tr class="information">' +
        '<td colspan="8">' +
        '<table>' +
        '<tr>' +
        '<td>' +
        '    #34, Kaveriyappa Layout,<br>' +
        '    Millers Tank Bund Road,<br>' +
        '    Vasantha Nagar,<br>' +
        '    (Opp to Mahaveer Jain Hospital),<br>' +
        '    Bengaluru -560 052' +
        '</td>' +

        '<td>' +
        '    ' + globalpatientName + '<br>' +
        '    ' + globalpatientEmail + '<br>' +
        '    ' + globalpatientPhone + '' +
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
        'Service Name' +
        '</td>' +
        '<td>' +
        'Date' +
        '</td>' +
        '<td>' +
        'Description' +
        '</td>' +
        '<td>Charges</td>'+
        '<td>' +
        'Quantity' +
        '</td>' +
        '<td>' +
        'Gst' +
        '</td>' +
        '<td>' +
        'Subtotal' +
        '</td>' +
        '</tr>' +
        data +
        '<tr class="total">' +

        '<td></td>' +
        '<td colspan="7">' +
        'Subtotal: ' + subtotal +'<br>' +
        'Gst :  ' + gsttotal +'<br>'+
        'Total:  ' + totalvalue +' '+
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

function clearSearch()
{
    $('#serviceListSearch').val('');
}

function dateformateChange(date) {
    var datepart = date.split("/");
    return datepart[2] + "-" + datepart[1] + "-" + datepart[0];
}
