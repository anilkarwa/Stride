<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="payment-report.aspx.cs" Inherits="Stride.payment_report" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="Scripts/Reports.js"></script>
<link href="css/jquery-ui.css" rel="stylesheet" type="text/css">
 <script src="Scripts/jquery-1.10.2.js"></script>
<script src="Scripts/jquery-ui-1.10.3.js"></script>

     <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title"> Reports </h4>
                    </div>
                    <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12"> 
                        <ol class="breadcrumb">
                            <li><a href="dashboard.aspx">Stride</a></li>
                            <li class="active">Payment Report</li>
                        </ol>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- row -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="white-box">
						<div class="row">
						<div class="col-md-3">
						<h3 class="box-title m-b-0">Payment Report</h3>
						</div>
						<div class="col-md-2">
						<input type="text" id="fromDate" class="form-control mydatepicker" value="" placeholder="From Date">
						</div>
						<div class="col-md-2">
						<input type="text" id="toDate" class="form-control mydatepicker" value="" placeholder="To Date">
						</div>
                        
						<div class="col-md-3">
						<input type="text" class="form-control" placeholder="Patient Name" id="searchPatient">
						</div>
						<div class="col-md-2">
						<button class="btn btn-primary" onclick="getPaymentReportByPatientId(); return false;">Ok</button>
						</div>
						</div>
                            <input type="hidden" id="patientCode" value="" />
                            <hr>
                           <div class="table-responsive">
                                <table id="paymentreporttable" class="display nowrap" >
                                    <thead>
                                        <tr>
                                            <th>Receipt No</th>
                                            <th>Receipt Date</th>
                                            <th>Patient Name</th>
                                            <th>Payable Amount</th>
                                            <th>Discount</th>
                                            <th>Receipt Amount</th>
                                            
                                        </tr>
                                    </thead>
                                   
                                    <tbody>
                                    </tbody>
                                </table>
							</div>
                            <br /><br /><br /><br />
                            <div class="text-right"><h3><b>Total Amount : <span id="totalamount"></span></b></h3></div>
                         
                        </div>
                    </div>
                </div>
                <!-- .row -->
                <div class="row">
                    <!-- /.row -->
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
                                            <input id="checkbox2" type="checkbox" checked="" class="fxsdr">
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
                                     return { label: item.patientName, id: item.patientCode }
                                 }))
                             }
                         });

                     },
                     select: function (event, ui) {
                         $(this).val(ui.item.label);
                         $('#searchPatient').val(ui.item.label);
                         $('#patientCode').val(ui.item.id);
                     }
                 };
                 $('#searchPatient').autocomplete(loadcontact);
             });
             </script>

</asp:Content>
