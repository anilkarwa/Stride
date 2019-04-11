<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="patient-all-invoice.aspx.cs" Inherits="Stride.patient_all_invoice" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="Scripts/Bill.js"></script>
<link href="css/jquery-ui.css" rel="stylesheet" type="text/css">
<script src="Scripts/jquery-1.10.2.js"></script>
<script src="Scripts/jquery-ui-1.10.3.js"></script>
     <div id="page-wrapper">
            <div class="container-fluid">

                 <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">Patient's All Invoice</h4> </div>
                       <div class="col-md-2">
						<input type="text" placeholder="Patient Name" class="form-control" id="searchPatient" autocomplete="off">
						</div>
						<div class="col-md-2">
						<input type="text" placeholder="Invoice Number" class="form-control" id="searchInvoice" autocomplete="off">
						</div>
						<div class="col-md-2">
						<%--<div class="btn btn-primary btn-sm" style="margin-top: 4px;" ><a id="billhref" style="color:#fff;"><i class="fa fa-plus"></i> Bill</a></div>--%>
						</div>
                    <div class="col-lg-3 col-sm-8 col-md-8 col-xs-12"> 
                        <ol class="breadcrumb">
                            <li><a href="dashboard.aspx">Stride</a></li>
                            <li class="active">Patient's All Invoice</li>
                        </ol>
                      
                    </div>
                </div>
            
                <input type="hidden" id="patientCode" value="" />
                 <div class="row" id="loadallinvoice">
                                
                     </div>
                </div>
         </div>

   <script>
    $(function () {
    var loadcontact = {
        minLength: 2,
        source: function (request, response) {
            $.ajax({

                url: 'WebService.asmx/getPatientByName',
                data: '{term: ' + JSON.stringify(request.term) + '}',
                method: 'POST',
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {label:item.patientName, id: item.patientCode}
                    }))                 
                }
            });

        },
        select: function (event, ui) {
            $(this).val(ui.item.label);
            $('#searchPatient').val(ui.item.label);
            $('#patientCode').val(ui.item.id);
            loadPatientInvoice(ui.item.id);
            globalpatientName = ui.item.label;
        }
    };
         $('#searchPatient').autocomplete(loadcontact);
       });


       $(function () {
           var loadcontact = {
               minLength: 2,
               source: function (request, response) {
                   $.ajax({

                       url: 'WebService.asmx/getInvoiceNumberList',
                       data: '{term: ' + JSON.stringify(request.term) + '}',
                       method: 'POST',
                       contentType: "application/json",
                       dataType: "json",
                       success: function (data) {
                           response($.map(data.d, function (item) {
                               return { label: item.invoiceId, id: item.invoiceId }
                           }))
                       }
                   });

               },
               select: function (event, ui) {
                   $(this).val(ui.item.label);
                   $('#searchInvoice').val(ui.item.label);
                   loadPatientInvoiceByInvoiceNumber(ui.item.id);
               }
           };
           $('#searchInvoice').autocomplete(loadcontact);
       });



       function deleteInvoice(invoiceId) {
           swal({
               title: "Are you sure?",
               text: "You are above delete one invoice!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Yes, delete it!",
               cancelButtonText: "No, cancel plz!",
               closeOnConfirm: false,
               closeOnCancel: false
           }, function (isConfirm) {
               if (isConfirm) {

                   $.ajax({
                       type: "POST",
                       url: "WebService.asmx/deleteInvoiceByInvoiceId",
                       data: '{invoiceId: ' + JSON.stringify(invoiceId) + '}',
                       contentType: "application/json",
                       dataType: "json",
                       success: function (response) {
                           swal("Deleted!", "Invoice has been deleted.", "success");
                           loadPatientInvoice(globalpatientcode);
                       },
                       error: function (response) {
                           $.toast({
                               heading: 'Error Deleting  Invoice',
                               text: 'Their was error while deleting the invoice.',
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
</script>



</asp:Content>
