<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="PrintPayment.aspx.cs" Inherits="Stride.PrintPayment" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<script src="Scripts/Payment.js"></script>
<link href="css/jquery-ui.css" rel="stylesheet" type="text/css">
 <script src="Scripts/jquery-1.10.2.js"></script>
<script src="Scripts/jquery-ui-1.10.3.js"></script>
     <div id="overlay" style="display: none;"></div>
        <img id="loaderImage" src="Scripts/loading.gif" width="150" height="150" style="position:absolute; margin-top:10%;margin-left:50%;display:none; z-index:1" />

     <div id="page-wrapper">
            <div class="container-fluid">

                 <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">Patient's All Payments</h4> </div>
                       <div class="col-md-2">
						<input type="text" placeholder="Patient Name" class="form-control" id="searchPatient" autocomplete="off">
						</div>
						<div class="col-md-2">
						<input type="text" placeholder="Payment Number" class="form-control" id="searchInvoice" autocomplete="off">
						</div>
						<div class="col-md-2">
						<%--<div class="btn btn-primary btn-sm" style="margin-top: 4px;" ><a id="billhref" style="color:#fff;"><i class="fa fa-plus"></i> Bill</a></div>--%>
						</div>
                    <div class="col-lg-3 col-sm-8 col-md-8 col-xs-12"> 
                        <ol class="breadcrumb">
                            <li><a href="dashboard.aspx">Stride</a></li>
                            <li class="active">Patient's All Payments</li>
                        </ol>
                      
                    </div>
                </div>
            
                <input type="hidden" id="patientCode" value="" />
                 <div class="row" id="loadallpayments">
                                
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
            loadPaymentReceiptsByPatientId(ui.item.id);
            loadaPatientDetails(ui.item.id);
        }
    };
         $('#searchPatient').autocomplete(loadcontact);
       });


       $(function () {
           var loadcontact = {
               minLength: 2,
               source: function (request, response) {
                   $.ajax({

                       url: 'WebService.asmx/getPatientPaymentList',
                       data: '{term: ' + JSON.stringify(request.term) + '}',
                       method: 'POST',
                       contentType: "application/json",
                       dataType: "json",
                       success: function (data) {
                           response($.map(data.d, function (item) {
                               return { label: item.paymentId, id: item.paymentId, pid: item.patientCode }
                           }))
                       }
                   });

               },
               select: function (event, ui) {
                   $(this).val(ui.item.label);
                   $('#searchInvoice').val(ui.item.label);
                   loadPaymentReceiptsByNumber(ui.item.id);
                   loadaPatientDetails(ui.item.pid);
               }
           };
           $('#searchInvoice').autocomplete(loadcontact);
       });
</script>

</asp:Content>
