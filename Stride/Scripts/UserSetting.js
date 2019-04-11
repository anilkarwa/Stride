$(document).ready(function () {
    UserRights();
});

function UserRights()
{
    var settingobj = {};
    settingobj.userCode = Session.get("DoctorCode");

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getAllUserSettings",
        data: '{setting: ' + JSON.stringify(settingobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            if (!response.d[1].securityEdit) {
                $('#editSettings').hide();
            }
            if (!response.d[1].securityAdd)
            {
                $('#securitySettingAddRights').hide();
            }
            
        },
        error: function (response) {
            alert('error');
        }

    });
}

function saveUserSettings()
{

    var settingObj = {};

    settingObj.userCode = $('#physotherapistCode').val();

    if ($('#physotherapistCode').val() == "")
    {
        $.toast({
            heading: 'Please Select User ',
            text: 'Select a user from the search input box and try again.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }

    // physotherapist
    var physoAdd = false, physoEdit = false, physoDelete = false, physoPrint = false, physoView = false;

    if ($('#physoAdd').is(":checked"))
    {
        physoAdd = true;
    }
    if ($('#physoEdit').is(":checked")) {
        physoEdit = true;
    }
    if ($('#physoDelete').is(":checked")) {
        physoDelete = true;
    }
    if ($('#physoPrint').is(":checked")) {
        physoPrint = true;
    }
    if ($('#physoView').is(":checked")) {
        physoView = true;
    }

    settingObj.physoAdd = physoAdd;
    settingObj.physoEdit = physoEdit;
    settingObj.physoDelete = physoDelete;
    settingObj.physoPrint = physoPrint;
    settingObj.physoView = physoView;



    // securtiySettings

    var securityAdd = false, securityEdit = false, securityDelete = false, securityPrint = false, securityView = false;
    if ($('#securityAdd').is(":checked")) {
        securityAdd = true;
    }
    if ($('#securityEdit').is(":checked")) {
        securityEdit = true;
    }
    if ($('#securityDelete').is(":checked")) {
        securityDelete = true;
    }
    if ($('#securityPrint').is(":checked")) {
        securityPrint = true;
    }
    if ($('#securityView').is(":checked")) {
        securityView = true;
    }

    settingObj.securityAdd = securityAdd;
    settingObj.securityEdit = securityEdit;
    settingObj.securityDelete = securityDelete;
    settingObj.securityPrint = securityPrint;
    settingObj.securityView = securityView;

    //patient profile

    var patientProfileAdd = false, patientProfileEdit = false, patientProfileDelete = false, patientProfilePrint = false, patientProfileView = false;
    if ($('#patientProfileAdd').is(":checked")) {
        patientProfileAdd = true;
    }
    if ($('#patientProfileEdit').is(":checked")) {
        patientProfileEdit = true;
    }
    if ($('#patientProfileDelete').is(":checked")) {
        patientProfileDelete = true;
    }
    if ($('#patientProfilePrint').is(":checked")) {
        patientProfilePrint = true;
    }
    if ($('#patientProfileView').is(":checked")) {
        patientProfileView = true;
    }


    settingObj.patientProfileAdd = patientProfileAdd;
    settingObj.patientProfileEdit = patientProfileEdit;
    settingObj.patientProfileDelete = patientProfileDelete;
    settingObj.patientProfilePrint = patientProfilePrint;
    settingObj.patientProfileView = patientProfileView;

    //payment
    var payementAdd = false, payementEdit = false, payementDelete = false, payementPrint = false, payementView = false;
    if ($('#payementAdd').is(":checked")) {
        payementAdd = true;
    }
    if ($('#payementEdit').is(":checked")) {
        payementEdit = true;
    }
    if ($('#payementDelete').is(":checked")) {
        payementDelete = true;
    }
    if ($('#payementPrint').is(":checked")) {
        payementPrint = true;
    }
    if ($('#payementView').is(":checked")) {
        payementView = true;
    }

    settingObj.payementAdd = payementAdd;
    settingObj.payementEdit = payementEdit;
    settingObj.payementDelete = payementDelete;
    settingObj.payementPrint = payementPrint;
    settingObj.payementView = payementView;

    //patient Invoice

    var patientInvoiceAdd = false, patientInvoiceEdit = false, patientInvoiceDelete = false, patientInvoicePrint = false, patientInvoiceView = false;

    if ($('#patientInvoiceAdd').is(":checked")) {
        patientInvoiceAdd = true;
    }
    if ($('#patientInvoiceEdit').is(":checked")) {
        patientInvoiceEdit = true;
    }
    if ($('#patientInvoiceDelete').is(":checked")) {
        patientInvoiceDelete = true;
    }
    if ($('#patientInvoicePrint').is(":checked")) {
        patientInvoicePrint = true;
    }
    if ($('#patientInvoiceViews').is(":checked")) {
        patientInvoiceView = true;
    }

    settingObj.patientInvoiceAdd = patientInvoiceAdd;
    settingObj.patientInvoiceEdit = patientInvoiceEdit;
    settingObj.patientInvoiceDelete = patientInvoiceDelete;
    settingObj.patientInvoicePrint = patientInvoicePrint;
    settingObj.patientInvoiceView = patientInvoiceView;

    //serviceList

    var serviceListAdd = false, serviceListEdit = false, serviceListDelete = false, serviceListPrint = false, serviceListView = false;

    if ($('#serviceListAdd').is(":checked")) {
        serviceListAdd = true;
    }
    if ($('#serviceListEdit').is(":checked")) {
        serviceListEdit = true;
    }
    if ($('#serviceListDelete').is(":checked")) {
        serviceListDelete = true;
    }
    if ($('#serviceListPrint').is(":checked")) {
        serviceListPrint = true;
    }
    if ($('#serviceListViews').is(":checked")) {
        serviceListView = true;
    }

    settingObj.serviceListAdd = serviceListAdd;
    settingObj.serviceListEdit = serviceListEdit;
    settingObj.serviceListDelete = serviceListDelete;
    settingObj.serviceListPrint = serviceListPrint;
    settingObj.serviceListView = serviceListView;

    // paymentReport
    var paymentReportAdd = false; paymentReportEdit = false, paymentReportDelete = false, paymentReportPrint = false, paymentReportView = false;

    if ($('#paymentReportAdd').is(":checked")) {
        paymentReportAdd = true;
    }
    if ($('#paymentReportEdit').is(":checked")) {
        paymentReportEdit = true;
    }
    if ($('#paymentReportDelete').is(":checked")) {
        paymentReportDelete = true;
    }
    if ($('#paymentReportPrint').is(":checked")) {
        paymentReportPrint = true;
    }
    if ($('#paymentReportViews').is(":checked")) {
        paymentReportView = true;
    }

    settingObj.paymentReportAdd = paymentReportAdd;
    settingObj.paymentReportEdit = paymentReportEdit;
    settingObj.paymentReportDelete = paymentReportDelete;
    settingObj.paymentReportPrint = paymentReportPrint;
    settingObj.paymentReportView = paymentReportView;

    // salesReport

    var salesReportAdd = false, salesReportEdit = false, salesReportDelete = false, salesReportPrint = false, salesReportView = false;

    if ($('#salesReportAdd').is(":checked")) {
        salesReportAdd = true;
    }
    if ($('#salesReportEdit').is(":checked")) {
        salesReportEdit = true;
    }
    if ($('#salesReportDelete').is(":checked")) {
        salesReportDelete = true;
    }
    if ($('#salesReportPrint').is(":checked")) {
        salesReportPrint = true;
    }
    if ($('#salesReportView').is(":checked")) {
        salesReportView = true;
    }

    settingObj.salesReportAdd = salesReportAdd;
    settingObj.salesReportEdit = salesReportEdit;
    settingObj.salesReportDelete = salesReportDelete;
    settingObj.salesReportPrint = salesReportPrint;
    settingObj.salesReportView = salesReportView;

    // outstandingReport

    var outstandingReportAdd = false, outstandingReportEdit = false, outstandingReportDelete = false, outstandingReportPrint = false, outstandingReportView = false;

    if ($('#outstandingReportAdd').is(":checked")) {
        outstandingReportAdd = true;
    }
    if ($('#outstandingReportEdit').is(":checked")) {
        outstandingReportEdit = true;
    }
    if ($('#outstandingReportDelete').is(":checked")) {
        outstandingReportDelete = true;
    }
    if ($('#outstandingReportPrint').is(":checked")) {
        outstandingReportPrint = true;
    }
    if ($('#outstandingReportViews').is(":checked")) {
        outstandingReportView = true;
    }

    settingObj.outstandingReportAdd = outstandingReportAdd;
    settingObj.outstandingReportEdit = outstandingReportEdit;
    settingObj.outstandingReportDelete = outstandingReportDelete;
    settingObj.outstandingReportPrint = outstandingReportPrint;
    settingObj.outstandingReportView = outstandingReportView;


    $.ajax({
        type: "POST",
        url: "WebService.asmx/saveUseSettings",
        data: '{setting: ' + JSON.stringify(settingObj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.toast({
                heading: 'User Settings Saved Successfully',
                text: '',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 2500,
                stack: 6
            });
            clearUserSettings();
        },
        error: function (response) {
            $.toast({
                heading: 'Error Saving  Users Settings',
                text: 'please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });

}


function loadUserSettingForEdit(usercode)
{

    var settingobj = {};
    settingobj.userCode = usercode;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getAllUserSettings",
        data: '{setting: ' + JSON.stringify(settingobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            // physotharapist
            if (response.d[0].physoAdd) {
                $('#editphysoAdd').prop('checked', true);
            }
            else {
                $('#editphysoAdd').prop('checked', false);
            }
            if (response.d[0].physoEdit) {
                $('#editphysoEdit').prop('checked', true);
            }
            else {
                $('#editphysoEdit').prop('checked', false);
            }
            if (response.d[0].physoDelete) {
                $('#editphysoDelete').prop('checked', true);
            }
            else {
                $('#editphysoDelete').prop('checked', false);
            }
            if (response.d[0].physoPrint) {
                $('#editphysoPrint').prop('checked', true);
            }
            else {
                $('#editphysoPrint').prop('checked', false);
            }
            if (response.d[0].physoView) {
                $('#editphysoView').prop('checked', true);
            }
            else {
                $('#editphysoView').prop('checked', false);
            }


                // securtiySettings
            if (response.d[1].securityAdd) {
                $('#editsecurityAdd').prop('checked', true);
            }
            else {
                $('#editsecurityAdd').prop('checked', false);
            }
            if (response.d[1].securityEdit) {
                $('#editsecurityEdit').prop('checked', true);
            }
            else {
                $('#editsecurityEdit').prop('checked', false);
            }
            if (response.d[1].securityDelete) {
                $('#editsecurityDelete').prop('checked', true);
            }
            else {
                $('#editsecurityDelete').prop('checked', false);
            }
            if (response.d[1].securityPrint) {
                $('#editsecurityPrint').prop('checked', true);
            }
            else {
                $('#editsecurityPrint').prop('checked', false);
            }
            if (response.d[1].securityView) {
                $('#editsecurityView').prop('checked', true);
            }
            else {
                $('#editsecurityView').prop('checked', false);
            }


             //patient profile
            if (response.d[2].patientProfileAdd) {
                $('#editpatientProfileAdd').prop('checked', true);
            }
            else {
                $('#editpatientProfileAdd').prop('checked', false);
            }
            if (response.d[2].patientProfileEdit) {
                $('#editpatientProfileEdit').prop('checked', true);
            }
            else {
                $('#editpatientProfileEdit').prop('checked', false);
            }
            if (response.d[2].patientProfileDelete) {
                $('#editpatientProfileDelete').prop('checked', true);
            }
            else {
                $('#editpatientProfileDelete').prop('checked', false);
            }
            if (response.d[2].patientProfilePrint) {
                $('#editpatientProfilePrint').prop('checked', true);
            }
            else {
                $('#editpatientProfilePrint').prop('checked', false);
            }
            if (response.d[2].patientProfileView) {
                $('#editpatientProfileView').prop('checked', true);
            }
            else {
                $('#editpatientProfileView').prop('checked', false);
            }


            //payment
            if (response.d[3].payementAdd) {
                $('#editpayementAdd').prop('checked', true);
            }
            else {
                $('#editpayementAdd').prop('checked', false);
            }
            if (response.d[3].payementEdit) {
                $('#editpayementEdit').prop('checked', true);
            }
            else {
                $('#editpayementEdit').prop('checked', false);
            }
            if (response.d[3].payementDelete) {
                $('#editpayementDelete').prop('checked', true);
            }
            else {
                $('#editpayementDelete').prop('checked', false);
            }
            if (response.d[3].payementPrint) {
                $('#editpayementPrint').prop('checked', true);
            }
            else {
                $('#editpayementPrint').prop('checked', false);
            }
            if (response.d[3].payementView) {
                $('#editpayementView').prop('checked', true);
            }
            else {
                $('#editpayementView').prop('checked', false);
            }


            //patient Invoice
            if (response.d[4].patientInvoiceAdd) {
                $('#editpatientInvoiceAdd').prop('checked', true);
            }
            else {
                $('#editpatientInvoiceAdd').prop('checked', false);
            }
            if (response.d[4].patientInvoiceEdit) {
                $('#editpatientInvoiceEdit').prop('checked', true);
            }
            else {
                $('#editpatientInvoiceEdit').prop('checked', false);
            }
            if (response.d[4].patientInvoiceDelete) {
                $('#editpatientInvoiceDelete').prop('checked', true);
            }
            else {
                $('#editpatientInvoiceDelete').prop('checked', false);
            }
            if (response.d[4].patientInvoicePrint) {
                $('#editpatientInvoicePrint').prop('checked', true);
            }
            else {
                $('#editpatientInvoicePrint').prop('checked', false);
            }
            if (response.d[4].patientInvoiceView) {
                $('#editpatientInvoiceView').prop('checked', true);
            }
            else {
                $('#editpatientInvoiceView').prop('checked', false);
            }

            //serviceList
            if (response.d[5].serviceListAdd) {
                $('#editserviceListAdd').prop('checked', true);
            }
            else {
                $('#editserviceListAdd').prop('checked', false);
            }
            if (response.d[5].serviceListEdit) {
                $('#editserviceListEdit').prop('checked', true);
            }
            else {
                $('#editserviceListEdit').prop('checked', false);
            }
            if (response.d[5].serviceListDelete) {
                $('#editserviceListDelete').prop('checked', true);
            }
            else {
                $('#editserviceListDelete').prop('checked', false);
            }
            if (response.d[5].serviceListPrint) {
                $('#editserviceListPrint').prop('checked', true);
            }
            else {
                $('#editserviceListPrint').prop('checked', false);
            }
            if (response.d[5].serviceListView) {
                $('#editserviceListView').prop('checked', true);
            }
            else {
                $('#editserviceListView').prop('checked', false);
            }


            // paymentReport
            if (response.d[6].paymentReportAdd) {
                $('#editpaymentReportAdd').prop('checked', true);
            }
            else {
                $('#editpaymentReportAdd').prop('checked', false);
            }
            if (response.d[6].paymentReportEdit) {
                $('#editpaymentReportEdit').prop('checked', true);
            }
            else {
                $('#editpaymentReportEdit').prop('checked', false);
            }
            if (response.d[6].paymentReportDelete) {
                $('#editpaymentReportDelete').prop('checked', true);
            }
            else {
                $('#editpaymentReportDelete').prop('checked', false);
            }
            if (response.d[6].paymentReportPrint) {
                $('#editpaymentReportPrint').prop('checked', true);
            }
            else {
                $('#editpaymentReportPrint').prop('checked', false);
            }
            if (response.d[6].paymentReportView) {
                $('#editpaymentReportView').prop('checked', true);
            }
            else {
                $('#editpaymentReportView').prop('checked', false);
            }


         // salesReport
            if (response.d[7].salesReportAdd) {
                $('#editsalesReportAdd').prop('checked', true);
            }
            else {
                $('#editsalesReportAdd').prop('checked', false);
            }
            if (response.d[7].salesReportEdit) {
                $('#editsalesReportEdit').prop('checked', true);
            }
            else {
                $('#editsalesReportEdit').prop('checked', false);
            }
            if (response.d[7].salesReportDelete) {
                $('#editsalesReportDelete').prop('checked', true);
            }
            else {
                $('#editsalesReportDelete').prop('checked', false);
            }
            if (response.d[7].salesReportPrint) {
                $('#editsalesReportPrint').prop('checked', true);
            }
            else {
                $('#editsalesReportPrint').prop('checked', false);
            }
            if (response.d[7].salesReportView) {
                $('#editsalesReportView').prop('checked', true);
            }
            else {
                $('#editsalesReportView').prop('checked', false);
            }


           // outstandingReport
            if (response.d[8].outstandingReportAdd) {
                $('#editoutstandingReportAdd').prop('checked', true);
            }
            else {
                $('#editoutstandingReportAdd').prop('checked', false);
            }
            if (response.d[8].outstandingReportEdit) {
                $('#editoutstandingReportEdit').prop('checked', true);
            }
            else {
                $('#editoutstandingReportEdit').prop('checked', false);
            }
            if (response.d[8].outstandingReportDelete) {
                $('#editoutstandingReportDelete').prop('checked', true);
            }
            else {
                $('#editoutstandingReportDelete').prop('checked', false);
            }
            if (response.d[8].outstandingReportPrint) {
                $('#editoutstandingReportPrint').prop('checked', true);
            }
            else {
                $('#editoutstandingReportPrint').prop('checked', false);
            }
            if (response.d[8].outstandingReportView) {
                $('#editoutstandingReportView').prop('checked', true);
            }
            else {
                $('#editoutstandingReportView').prop('checked', false);
            }

        },
        error: function (response) {
            $.toast({
                heading: 'Error Load User Settings',
                text: 'Please try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function UpdateSecuritySettings()
{

    var settingObj = {};

    settingObj.userCode = $('#physotherapistCode').val();

    if ($('#physotherapistCode').val() == "") {
        $.toast({
            heading: 'Please Select User ',
            text: 'Select a user from the search input box and try again.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }

    // physotherapist
    var physoAdd = false, physoEdit = false, physoDelete = false, physoPrint = false, physoView = false;

    if ($('#editphysoAdd').is(":checked")) {
        physoAdd = true;
    }
    if ($('#editphysoEdit').is(":checked")) {
        physoEdit = true;
    }
    if ($('#editphysoDelete').is(":checked")) {
        physoDelete = true;
    }
    if ($('#editphysoPrint').is(":checked")) {
        physoPrint = true;
    }
    if ($('#editphysoView').is(":checked")) {
        physoView = true;
    }

    settingObj.physoAdd = physoAdd;
    settingObj.physoEdit = physoEdit;
    settingObj.physoDelete = physoDelete;
    settingObj.physoPrint = physoPrint;
    settingObj.physoView = physoView;



    // securtiySettings

    var securityAdd = false, securityEdit = false, securityDelete = false, securityPrint = false, securityView = false;
    if ($('#editsecurityAdd').is(":checked")) {
        securityAdd = true;
    }
    if ($('#editsecurityEdit').is(":checked")) {
        securityEdit = true;
    }
    if ($('#editsecurityDelete').is(":checked")) {
        securityDelete = true;
    }
    if ($('#editsecurityPrint').is(":checked")) {
        securityPrint = true;
    }
    if ($('#editsecurityView').is(":checked")) {
        securityView = true;
    }

    settingObj.securityAdd = securityAdd;
    settingObj.securityEdit = securityEdit;
    settingObj.securityDelete = securityDelete;
    settingObj.securityPrint = securityPrint;
    settingObj.securityView = securityView;

    //patient profile

    var patientProfileAdd = false, patientProfileEdit = false, patientProfileDelete = false, patientProfilePrint = false, patientProfileView = false;
    if ($('#editpatientProfileAdd').is(":checked")) {
        patientProfileAdd = true;
    }
    if ($('#editpatientProfileEdit').is(":checked")) {
        patientProfileEdit = true;
    }
    if ($('#editpatientProfileDelete').is(":checked")) {
        patientProfileDelete = true;
    }
    if ($('#editpatientProfilePrint').is(":checked")) {
        patientProfilePrint = true;
    }
    if ($('#editpatientProfileView').is(":checked")) {
        patientProfileView = true;
    }


    settingObj.patientProfileAdd = patientProfileAdd;
    settingObj.patientProfileEdit = patientProfileEdit;
    settingObj.patientProfileDelete = patientProfileDelete;
    settingObj.patientProfilePrint = patientProfilePrint;
    settingObj.patientProfileView = patientProfileView;

    //payment
    var payementAdd = false, payementEdit = false, payementDelete = false, payementPrint = false, payementView = false;
    if ($('#editpayementAdd').is(":checked")) {
        payementAdd = true;
    }
    if ($('#editpayementEdit').is(":checked")) {
        payementEdit = true;
    }
    if ($('#editpayementDelete').is(":checked")) {
        payementDelete = true;
    }
    if ($('#editpayementPrint').is(":checked")) {
        payementPrint = true;
    }
    if ($('#editpayementView').is(":checked")) {
        payementView = true;
    }

    settingObj.payementAdd = payementAdd;
    settingObj.payementEdit = payementEdit;
    settingObj.payementDelete = payementDelete;
    settingObj.payementPrint = payementPrint;
    settingObj.payementView = payementView;

    //patient Invoice

    var patientInvoiceAdd = false, patientInvoiceEdit = false, patientInvoiceDelete = false, patientInvoicePrint = false, patientInvoiceView = false;

    if ($('#editpatientInvoiceAdd').is(":checked")) {
        patientInvoiceAdd = true;
    }
    if ($('#editpatientInvoiceEdit').is(":checked")) {
        patientInvoiceEdit = true;
    }
    if ($('#editpatientInvoiceDelete').is(":checked")) {
        patientInvoiceDelete = true;
    }
    if ($('#editpatientInvoicePrint').is(":checked")) {
        patientInvoicePrint = true;
    }
    if ($('#editpatientInvoiceView').is(":checked")) {
        patientInvoiceView = true;
    }

    settingObj.patientInvoiceAdd = patientInvoiceAdd;
    settingObj.patientInvoiceEdit = patientInvoiceEdit;
    settingObj.patientInvoiceDelete = patientInvoiceDelete;
    settingObj.patientInvoicePrint = patientInvoicePrint;
    settingObj.patientInvoiceView = patientInvoiceView;

    //serviceList

    var serviceListAdd = false, serviceListEdit = false, serviceListDelete = false, serviceListPrint = false, serviceListView = false;

    if ($('#editserviceListAdd').is(":checked")) {
        serviceListAdd = true;
    }
    if ($('#editserviceListEdit').is(":checked")) {
        serviceListEdit = true;
    }
    if ($('#editserviceListDelete').is(":checked")) {
        serviceListDelete = true;
    }
    if ($('#editserviceListPrint').is(":checked")) {
        serviceListPrint = true;
    }
    if ($('#editserviceListView').is(":checked")) {
        serviceListView = true;
    }

    settingObj.serviceListAdd = serviceListAdd;
    settingObj.serviceListEdit = serviceListEdit;
    settingObj.serviceListDelete = serviceListDelete;
    settingObj.serviceListPrint = serviceListPrint;
    settingObj.serviceListView = serviceListView;

    // paymentReport
    var paymentReportAdd = false; paymentReportEdit = false, paymentReportDelete = false, paymentReportPrint = false, paymentReportView = false;

    if ($('#editpaymentReportAdd').is(":checked")) {
        paymentReportAdd = true;
    }
    if ($('#editpaymentReportEdit').is(":checked")) {
        paymentReportEdit = true;
    }
    if ($('#editpaymentReportDelete').is(":checked")) {
        paymentReportDelete = true;
    }
    if ($('#editpaymentReportPrint').is(":checked")) {
        paymentReportPrint = true;
    }
    if ($('#editpaymentReportView').is(":checked")) {
        paymentReportView = true;
    }

    settingObj.paymentReportAdd = paymentReportAdd;
    settingObj.paymentReportEdit = paymentReportEdit;
    settingObj.paymentReportDelete = paymentReportDelete;
    settingObj.paymentReportPrint = paymentReportPrint;
    settingObj.paymentReportView = paymentReportView;

    // salesReport

    var salesReportAdd = false, salesReportEdit = false, salesReportDelete = false, salesReportPrint = false, salesReportView = false;

    if ($('#editsalesReportAdd').is(":checked")) {
        salesReportAdd = true;
    }
    if ($('#editsalesReportEdit').is(":checked")) {
        salesReportEdit = true;
    }
    if ($('#editsalesReportDelete').is(":checked")) {
        salesReportDelete = true;
    }
    if ($('#editsalesReportPrint').is(":checked")) {
        salesReportPrint = true;
    }
    if ($('#editsalesReportView').is(":checked")) {
        salesReportView = true;
    }

    settingObj.salesReportAdd = salesReportAdd;
    settingObj.salesReportEdit = salesReportEdit;
    settingObj.salesReportDelete = salesReportDelete;
    settingObj.salesReportPrint = salesReportPrint;
    settingObj.salesReportView = salesReportView;

    // outstandingReport

    var outstandingReportAdd = false, outstandingReportEdit = false, outstandingReportDelete = false, outstandingReportPrint = false, outstandingReportView = false;

    if ($('#editoutstandingReportAdd').is(":checked")) {
        outstandingReportAdd = true;
    }
    if ($('#editoutstandingReportEdit').is(":checked")) {
        outstandingReportEdit = true;
    }
    if ($('#editoutstandingReportDelete').is(":checked")) {
        outstandingReportDelete = true;
    }
    if ($('#editoutstandingReportPrint').is(":checked")) {
        outstandingReportPrint = true;
    }
    if ($('#editoutstandingReportView').is(":checked")) {
        outstandingReportView = true;
    }

    settingObj.outstandingReportAdd = outstandingReportAdd;
    settingObj.outstandingReportEdit = outstandingReportEdit;
    settingObj.outstandingReportDelete = outstandingReportDelete;
    settingObj.outstandingReportPrint = outstandingReportPrint;
    settingObj.outstandingReportView = outstandingReportView;


    $.ajax({
        type: "POST",
        url: "WebService.asmx/updateUserSettings",
        data: '{setting: ' + JSON.stringify(settingObj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.toast({
                heading: 'User Setting Saved Successfully',
                text: ' ',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 2500,
                stack: 6
            });
            clearUserSettings();
        },
        error: function (response) {
            $.toast({
                heading: 'Erro Updating User Settings',
                text: 'Please try again',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });

}

function onCheckAllAddClick()
{
    if ($('#chkAdd').is(":checked"))
    {
        $('#physoAdd').prop('checked', true);
        $('#securityAdd').prop('checked', true);
        $('#patientProfileAdd').prop('checked', true);
        $('#payementAdd').prop('checked', true);
        $('#patientInvoiceAdd').prop('checked', true);
        $('#serviceListAdd').prop('checked', true);
        $('#paymentReportAdd').prop('checked', true);
        $('#salesReportAdd').prop('checked', true);
        $('#outstandingReportAdd').prop('checked', true);
    }
    else {
        $('#physoAdd').prop('checked', false);
        $('#securityAdd').prop('checked', false);
        $('#patientProfileAdd').prop('checked', false);
        $('#payementAdd').prop('checked', false);
        $('#patientInvoiceAdd').prop('checked', false);
        $('#serviceListAdd').prop('checked', false);
        $('#paymentReportAdd').prop('checked', false);
        $('#salesReportAdd').prop('checked', false);
        $('#outstandingReportAdd').prop('checked', false);
    }


    if ($('#chkAdd').is(":checked")) {
        $('#editphysoAdd').prop('checked', true);
        $('#editsecurityAdd').prop('checked', true);
        $('#editpatientProfileAdd').prop('checked', true);
        $('#editpayementAdd').prop('checked', true);
        $('#editpatientInvoiceAdd').prop('checked', true);
        $('#editserviceListAdd').prop('checked', true);
        $('#editpaymentReportAdd').prop('checked', true);
        $('#editsalesReportAdd').prop('checked', true);
        $('#editoutstandingReportAdd').prop('checked', true);
    }
    else {
        $('#editphysoAdd').prop('checked', false);
        $('#editsecurityAdd').prop('checked', false);
        $('#editpatientProfileAdd').prop('checked', false);
        $('#editpayementAdd').prop('checked', false);
        $('#editpatientInvoiceAdd').prop('checked', false);
        $('#editserviceListAdd').prop('checked', false);
        $('#editpaymentReportAdd').prop('checked', false);
        $('#editsalesReportAdd').prop('checked', false);
        $('#editoutstandingReportAdd').prop('checked', false);
    }

}


function onCheckAllEditClick() {
    if ($('#chkEdit').is(":checked")) {
        $('#physoEdit').prop('checked', true);
        $('#securityEdit').prop('checked', true);
        $('#patientProfileEdit').prop('checked', true);
        $('#payementEdit').prop('checked', true);
        $('#patientInvoiceEdit').prop('checked', true);
        $('#serviceListEdit').prop('checked', true);
        $('#paymentReportEdit').prop('checked', true);
        $('#salesReportEdit').prop('checked', true);
        $('#outstandingReportEdit').prop('checked', true);
    }
    else {
        $('#physoEdit').prop('checked', false);
        $('#securityEdit').prop('checked', false);
        $('#patientProfileEdit').prop('checked', false);
        $('#payementEdit').prop('checked', false);
        $('#patientInvoiceEdit').prop('checked', false);
        $('#serviceListEdit').prop('checked', false);
        $('#paymentReportEdit').prop('checked', false);
        $('#salesReportEdit').prop('checked', false);
        $('#outstandingReportEdit').prop('checked', false);
    }

    if ($('#chkEdit').is(":checked")) {
        $('#editphysoEdit').prop('checked', true);
        $('#editsecurityEdit').prop('checked', true);
        $('#editpatientProfileEdit').prop('checked', true);
        $('#editpayementEdit').prop('checked', true);
        $('#editpatientInvoiceEdit').prop('checked', true);
        $('#editserviceListEdit').prop('checked', true);
        $('#editpaymentReportEdit').prop('checked', true);
        $('#editsalesReportEdit').prop('checked', true);
        $('#editoutstandingReportEdit').prop('checked', true);
    }
    else {
        $('#editphysoEdit').prop('checked', false);
        $('#editsecurityEdit').prop('checked', false);
        $('#editpatientProfileEdit').prop('checked', false);
        $('#editpayementEdit').prop('checked', false);
        $('#editpatientInvoiceEdit').prop('checked', false);
        $('#editserviceListEdit').prop('checked', false);
        $('#editpaymentReportEdit').prop('checked', false);
        $('#editsalesReportEdit').prop('checked', false);
        $('#editoutstandingReportEdit').prop('checked', false);
    }

}




function onCheckAllDeleteClick() {
    if ($('#chkDelete').is(":checked")) {
        $('#physoDelete').prop('checked', true);
        $('#securityDelete').prop('checked', true);
        $('#patientProfileDelete').prop('checked', true);
        $('#payementDelete').prop('checked', true);
        $('#patientInvoiceDelete').prop('checked', true);
        $('#serviceListDelete').prop('checked', true);
        $('#paymentReportDelete').prop('checked', true);
        $('#salesReportDelete').prop('checked', true);
        $('#outstandingReportDelete').prop('checked', true);
    }
    else {
        $('#physoDelete').prop('checked', false);
        $('#securityDelete').prop('checked', false);
        $('#patientProfileDelete').prop('checked', false);
        $('#payementDelete').prop('checked', false);
        $('#patientInvoiceDelete').prop('checked', false);
        $('#serviceListDelete').prop('checked', false);
        $('#paymentReportDelete').prop('checked', false);
        $('#salesReportDelete').prop('checked', false);
        $('#outstandingReportDelete').prop('checked', false);
    }

    if ($('#chkDelete').is(":checked")) {
        $('#editphysoDelete').prop('checked', true);
        $('#editsecurityDelete').prop('checked', true);
        $('#editpatientProfileDelete').prop('checked', true);
        $('#editpayementDelete').prop('checked', true);
        $('#editpatientInvoiceDelete').prop('checked', true);
        $('#editserviceListDelete').prop('checked', true);
        $('#editpaymentReportDelete').prop('checked', true);
        $('#editsalesReportDelete').prop('checked', true);
        $('#editoutstandingReportDelete').prop('checked', true);
    }
    else {
        $('#editphysoDelete').prop('checked', false);
        $('#editsecurityDelete').prop('checked', false);
        $('#editpatientProfileDelete').prop('checked', false);
        $('#editpayementDelete').prop('checked', false);
        $('#editpatientInvoiceDelete').prop('checked', false);
        $('#editserviceListDelete').prop('checked', false);
        $('#editpaymentReportDelete').prop('checked', false);
        $('#editsalesReportDelete').prop('checked', false);
        $('#editoutstandingReportDelete').prop('checked', false);
    }
}



function onCheckAllPrintClick() {
    if ($('#chkPrint').is(":checked")) {

        $('#physoPrint').prop('checked', true);
        $('#securityPrint').prop('checked', true);
        $('#patientProfilePrint').prop('checked', true);
        $('#payementPrint').prop('checked', true);
        $('#patientInvoicePrint').prop('checked', true);
        $('#serviceListPrint').prop('checked', true);
        $('#paymentReportPrint').prop('checked', true);
        $('#salesReportPrint').prop('checked', true);
        $('#outstandingReportPrint').prop('checked', true);
    }
    else {
        $('#physoPrint').prop('checked', false);
        $('#securityPrint').prop('checked', false);
        $('#patientProfilePrint').prop('checked', false);
        $('#payementPrint').prop('checked', false);
        $('#patientInvoicePrint').prop('checked', false);
        $('#serviceListPrint').prop('checked', false);
        $('#paymentReportPrint').prop('checked', false);
        $('#salesReportPrint').prop('checked', false);
        $('#outstandingReportPrint').prop('checked', false);
    }


    if ($('#chkPrint').is(":checked")) {

        $('#editphysoPrint').prop('checked', true);
        $('#editsecurityPrint').prop('checked', true);
        $('#editpatientProfilePrint').prop('checked', true);
        $('#editpayementPrint').prop('checked', true);
        $('#editpatientInvoicePrint').prop('checked', true);
        $('#editserviceListPrint').prop('checked', true);
        $('#editpaymentReportPrint').prop('checked', true);
        $('#editsalesReportPrint').prop('checked', true);
        $('#editoutstandingReportPrint').prop('checked', true);
    }
    else {
        $('#editphysoPrint').prop('checked', false);
        $('#editsecurityPrint').prop('checked', false);
        $('#editpatientProfilePrint').prop('checked', false);
        $('#editpayementPrint').prop('checked', false);
        $('#editpatientInvoicePrint').prop('checked', false);
        $('#editserviceListPrint').prop('checked', false);
        $('#editpaymentReportPrint').prop('checked', false);
        $('#editsalesReportPrint').prop('checked', false);
        $('#editoutstandingReportPrint').prop('checked', false);
    }

}



function onCheckAllViewClick() {
    if ($('#chkView').is(":checked")) {

        $('#physoView').prop('checked', true);
        $('#securityView').prop('checked', true);
        $('#patientProfileView').prop('checked', true);
        $('#payementView').prop('checked', true);
        $('#patientInvoiceViews').prop('checked', true);
        $('#serviceListViews').prop('checked', true);
        $('#paymentReportViews').prop('checked', true);
        $('#salesReportView').prop('checked', true);
        $('#outstandingReportViews').prop('checked', true);

    }
    else {
        $('#physoView').prop('checked', false);
        $('#securityView').prop('checked', false);
        $('#patientProfileView').prop('checked', false);
        $('#payementView').prop('checked', false);
        $('#patientInvoiceViews').prop('checked', false);
        $('#serviceListViews').prop('checked', false);
        $('#paymentReportViews').prop('checked', false);
        $('#salesReportView').prop('checked', false);
        $('#outstandingReportViews').prop('checked', false);

    }


    if ($('#chkView').is(":checked")) {

        $('#editphysoView').prop('checked', true);
        $('#editsecurityView').prop('checked', true);
        $('#editpatientProfileView').prop('checked', true);
        $('#editpayementView').prop('checked', true);
        $('#editpatientInvoiceView').prop('checked', true);
        $('#editserviceListView').prop('checked', true);
        $('#editpaymentReportView').prop('checked', true);
        $('#editsalesReportView').prop('checked', true);
        $('#editoutstandingReportView').prop('checked', true);

    }
    else {
        $('#editphysoView').prop('checked', false);
        $('#editsecurityView').prop('checked', false);
        $('#editpatientProfileView').prop('checked', false);
        $('#editpayementView').prop('checked', false);
        $('#editpatientInvoiceView').prop('checked', false);
        $('#editserviceListView').prop('checked', false);
        $('#editpaymentReportView').prop('checked', false);
        $('#editsalesReportView').prop('checked', false);
        $('#editoutstandingReportView').prop('checked', false);

    }
}


function clearUserSettings()
{
    $('#physotherapistCode').val('');
    $('#chkAdd').prop('checked', false);
    $('#chkEdit').prop('checked', false);
    $('#chkDelete').prop('checked', false);
    $('#chkPrint').prop('checked', false);
    $('#chkView').prop('checked', false);
      
        $('#physoAdd').prop('checked', false);
        $('#securityAdd').prop('checked', false);
        $('#patientProfileAdd').prop('checked', false);
        $('#payementAdd').prop('checked', false);
        $('#patientInvoiceAdd').prop('checked', false);
        $('#serviceListAdd').prop('checked', false);
        $('#paymentReportAdd').prop('checked', false);
        $('#salesReportAdd').prop('checked', false);
        $('#outstandingReportAdd').prop('checked', false);


      

        $('#editphysoAdd').prop('checked', false);
        $('#editsecurityAdd').prop('checked', false);
        $('#editpatientProfileAdd').prop('checked', false);
        $('#editpayementAdd').prop('checked', false);
        $('#editpatientInvoiceAdd').prop('checked', false);
        $('#editserviceListAdd').prop('checked', false);
        $('#editpaymentReportAdd').prop('checked', false);
        $('#editsalesReportAdd').prop('checked', false);
        $('#editoutstandingReportAdd').prop('checked', false);


   

        $('#physoEdit').prop('checked', false);
        $('#securityEdit').prop('checked', false);
        $('#patientProfileEdit').prop('checked', false);
        $('#payementEdit').prop('checked', false);
        $('#patientInvoiceEdit').prop('checked', false);
        $('#serviceListEdit').prop('checked', false);
        $('#paymentReportEdit').prop('checked', false);
        $('#salesReportEdit').prop('checked', false);
        $('#outstandingReportEdit').prop('checked', false);


        $('#editphysoEdit').prop('checked', false);
        $('#editsecurityEdit').prop('checked', false);
        $('#editpatientProfileEdit').prop('checked', false);
        $('#editpayementEdit').prop('checked', false);
        $('#editpatientInvoiceEdit').prop('checked', false);
        $('#editserviceListEdit').prop('checked', false);
        $('#editpaymentReportEdit').prop('checked', false);
        $('#editsalesReportEdit').prop('checked', false);
        $('#editoutstandingReportEdit').prop('checked', false);

        $('#physoDelete').prop('checked', false);
        $('#securityDelete').prop('checked', false);
        $('#patientProfileDelete').prop('checked', false);
        $('#payementDelete').prop('checked', false);
        $('#patientInvoiceDelete').prop('checked', false);
        $('#serviceListDelete').prop('checked', false);
        $('#paymentReportDelete').prop('checked', false);
        $('#salesReportDelete').prop('checked', false);
        $('#outstandingReportDelete').prop('checked', false);
 
        $('#editphysoDelete').prop('checked', false);
        $('#editsecurityDelete').prop('checked', false);
        $('#editpatientProfileDelete').prop('checked', false);
        $('#editpayementDelete').prop('checked', false);
        $('#editpatientInvoiceDelete').prop('checked', false);
        $('#editserviceListDelete').prop('checked', false);
        $('#editpaymentReportDelete').prop('checked', false);
        $('#editsalesReportDelete').prop('checked', false);
        $('#editoutstandingReportDelete').prop('checked', false);

       

        $('#physoPrint').prop('checked', false);
        $('#securityPrint').prop('checked', false);
        $('#patientProfilePrint').prop('checked', false);
        $('#payementPrint').prop('checked', false);
        $('#patientInvoicePrint').prop('checked', false);
        $('#serviceListPrint').prop('checked', false);
        $('#paymentReportPrint').prop('checked', false);
        $('#salesReportPrint').prop('checked', false);
        $('#outstandingReportPrint').prop('checked', false);


     

        $('#editphysoPrint').prop('checked', false);
        $('#editsecurityPrint').prop('checked', false);
        $('#editpatientProfilePrint').prop('checked', false);
        $('#editpayementPrint').prop('checked', false);
        $('#editpatientInvoicePrint').prop('checked', false);
        $('#editserviceListPrint').prop('checked', false);
        $('#editpaymentReportPrint').prop('checked', false);
        $('#editsalesReportPrint').prop('checked', false);
        $('#editoutstandingReportPrint').prop('checked', false);


     
        $('#physoView').prop('checked', false);
        $('#securityView').prop('checked', false);
        $('#patientProfileView').prop('checked', false);
        $('#payementView').prop('checked', false);
        $('#patientInvoiceViews').prop('checked', false);
        $('#serviceListViews').prop('checked', false);
        $('#paymentReportViews').prop('checked', false);
        $('#salesReportView').prop('checked', false);
        $('#outstandingReportViews').prop('checked', false);


      

        $('#editphysoView').prop('checked', false);
        $('#editsecurityView').prop('checked', false);
        $('#editpatientProfileView').prop('checked', false);
        $('#editpayementView').prop('checked', false);
        $('#editpatientInvoiceView').prop('checked', false);
        $('#editserviceListView').prop('checked', false);
        $('#editpaymentReportView').prop('checked', false);
        $('#editsalesReportView').prop('checked', false);
        $('#editoutstandingReportView').prop('checked', false);



}

