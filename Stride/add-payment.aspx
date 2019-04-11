<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="add-payment.aspx.cs" Inherits="Stride.add_payment" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="Scripts/Payment.js"></script>
<link href="css/jquery-ui.css" rel="stylesheet" type="text/css">
 <script src="Scripts/jquery-1.10.2.js"></script>
<script src="Scripts/jquery-ui-1.10.3.js"></script>
    <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">Add Payment</h4> </div>
                    <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12"> 
                        <ol class="breadcrumb">
                            <li><a href="dashboard.aspx">Stride</a></li>
                            <li class="active">Add Payment</li>
                        </ol>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="white-box">
                            <h3 class="box-title">Payment Information</h3>
                           <form class="form-material form-horizontal" role="form" id="newpatient" method="post" onsubmit="savePaymentData(); return false;">
                               
                                <input type="hidden" id="patientCode" name="patientCode" class="form-control">
                                 <input type="hidden" id="patientAddress" />
                              

                                <div class="form-group">
                                    <label class="col-md-12" for="pname">Payment Number
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="paymentNumber" name="paymentNumber" value="" class="form-control" placeholder="" required="required" readonly="readonly">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-12" for="pname">Patient Name
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="patientName" name="patientName" value="" class="form-control" placeholder="Search patient name ..." required="required">
                                    </div>
                                </div>
                               
                                <div class="form-group">
                                    <label class="col-md-12" for="toamt">Due Amount
                                    </label>
                                    <div class="col-md-12">
                                        <input type="number" id="payableAmount" name="payableAmount" class="form-control" required="required" readonly="readonly">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="toamt">Discount
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="discountAmount" name="discountAmount" class="form-control" value="0" onchange="calculateAfterDiscount();" >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" >Received Amount
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="receivedAmount" name="receivedAmount" class="form-control"  required="required"  onchange="calculateAfterDiscount();">
                                    </div>
                                </div>
                               <div class="form-group">
                                    <label class="col-md-12" >Pending Amount
                                    </label>
                                    <div class="col-md-12">
                                        <input type="number" id="pendingAmount" name="pendingAmount" class="form-control"  required="required" readonly="readonly" >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-12">Payment Method</label>
                                    <div class="col-sm-12">
                                        <select class="form-control" id="paymentType" name="paymentType" required="required">
                                            <option value="">Select Method</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Cheque">Cheque</option>
                                            <option value="Credit Card">Credit Card</option>
                                            <option value="Debit Card">Debit Card</option>
                                            <option value="Netbanking">Netbanking</option>
                                            <option value="Insurance">Insurance</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="pname">Cheque No / Reference Number
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="referenceNumber" name="referenceNumber" value="" class="form-control" placeholder="Cheque No / Reference No" >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="pname">Payment Discription
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="paymentDescription" name="paymentDescription" value="" class="form-control" placeholder="Payment description" >
                                    </div>
                                </div>
                               <div class="row">
                              <div class="col-lg-8 col-md-6 col-sm-12">
                                <button type="submit" class="btn btn-info waves-effect waves-light m-r-10">Save</button>
                                <button type="button"  onClick="clearPaymentForm();" class="btn btn-info waves-effect waves-light m-r-10">Reset</button>
                               </div>
                               <div class="col-lg-4 col-md-6 col-sm-12">
                               <button  onClick="PrintPaymentReceipt();" class="btn btn-default btn-outline btn-sm printPaymentRight" type="button"> <span><i class="fa fa-print"></i> Print / Save </span> </button>
                               <button type="button" onClick="sendReceiptMail();" class="btn btn-info waves-effect waves-light m-r-10 printPaymentRight">Send Mail / Save</button>
                               </div>
                               </div>
                            </form>
                        </div>
                    </div>
                </div>
                 <img id="loaderImage" src="Scripts/loading.gif" width="150" height="150" style="position:absolute; margin-top:-40%;margin-left:40%;display:none; " />
                <!-- .right-sidebar -->
                <div class="right-sidebar">
                    <div class="slimscrollright">
                        <div class="rpanel-title"> Service Panel <span><i class="ti-close right-side-toggle"></i></span> </div>
                        <div class="r-panel-body">
                            <ul>
                                <li><b>Layout Options</b></li>
                                <li>
                                    <div class="checkbox checkbox-info">
                                        <input id="checkbox1" type="checkbox" class="fxhdr">
                                        <label for="checkbox1"> Fix Header </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="checkbox checkbox-warning">
                                        <input id="checkbox2" type="checkbox" class="fxsdr">
                                        <label for="checkbox2"> Fix Sidebar </label>
                                    </div>
                                </li>
                                <li>
                                    <div class="checkbox checkbox-success">
                                        <input id="checkbox4" type="checkbox" class="open-close">
                                        <label for="checkbox4"> Toggle Sidebar </label>
                                    </div>
                                </li>
                            </ul>
                            <ul id="themecolors" class="m-t-20">
                                <li><b>With Light sidebar</b></li>
                                <li><a href="javascript:void(0)" theme="default" class="default-theme">1</a></li>
                                <li><a href="javascript:void(0)" theme="green" class="green-theme">2</a></li>
                                <li><a href="javascript:void(0)" theme="gray" class="yellow-theme">3</a></li>
                                <li><a href="javascript:void(0)" theme="blue" class="blue-theme">4</a></li>
                                <li><a href="javascript:void(0)" theme="purple" class="purple-theme">5</a></li>
                                <li><a href="javascript:void(0)" theme="megna" class="megna-theme working">6</a></li>
                                <li><b>With Dark sidebar</b></li>
                                <br/>
                                <li><a href="javascript:void(0)" theme="default-dark" class="default-dark-theme">7</a></li>
                                <li><a href="javascript:void(0)" theme="green-dark" class="green-dark-theme">8</a></li>
                                <li><a href="javascript:void(0)" theme="gray-dark" class="yellow-dark-theme">9</a></li>
                                <li><a href="javascript:void(0)" theme="blue-dark" class="blue-dark-theme">10</a></li>
                                <li><a href="javascript:void(0)" theme="purple-dark" class="purple-dark-theme">11</a></li>
                                <li><a href="javascript:void(0)" theme="megna-dark" class="megna-dark-theme">12</a></li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
                <!-- /.right-sidebar -->
            </div>
            <!-- /.container-fluid -->
           <footer class="footer text-center"> 2018 &copy; Stride Physio brought to you by <a href="http://softvent.com/" target="_blank">Softvent.com</a> </footer>
        </div>
        <!-- /#page-wrapper -->


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
                        return {label:item.patientName, id: item.patientCode, address: item.patientAddress}
                    }))                 
                }
            });

        },
        select: function (event, ui) {
            $(this).val(ui.item.label);
            $('#patientName').val(ui.item.label);
            $('#patientCode').val(ui.item.id);
            $('#patientAddress').val(ui.item.address);
            getPayableAmount(ui.item.id);
            generatePaymentNumber();
        }
    };
       $('#patientName').autocomplete(loadcontact);
 });
</script>

</asp:Content>
