<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="patient-invoice.aspx.cs" Inherits="Stride.patient_invoice" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="Scripts/Bill.js"></script>
<link href="css/jquery-ui.css" rel="stylesheet" type="text/css">
 <script src="Scripts/jquery-1.10.2.js"></script>
<script src="Scripts/jquery-ui-1.10.3.js"></script>

    <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">Patient's Invoice</h4> </div>
                       <div class="col-md-2">
						<input type="text" placeholder="Patient Name" class="form-control" id="searchPatient" autocomplete="off">
						</div>
						<div class="col-md-1">
						<i class="fa fa-search" style="margin-top:11px;"></i>
						</div>
						<div class="col-md-2">
						<a class="viewInvoiceRight" id="allinvoicehref" style="color:#fff;"><div class="btn btn-primary btn-sm" style="margin-top: 4px;" ><i class="fa fa-sticky-note-o"></i> All Invoices</div></a>
						</div>
                  <div class="col-lg-4 col-sm-8 col-md-8 col-xs-12"> 
                        <ol class="breadcrumb">
                            <li><a href="dashboard.aspx">Stride</a></li>
                            <li class="active">Patient's Invoice</li>
                        </ol>
                      
                    </div>
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="white-box">
                            <h3><b>INVOICE</b><span class="pull-right" id="invoiceNumber"></span></h3>
                               
                            <hr>
                            <div class="row">
                                 <div class="col-md-12">
                                    <div class="pull-left">
                                        <address>
                                            <h3> &nbsp;<b class="text-danger">Stridephysio</b></h3>
                                            <p class="text-muted m-l-5">#34, Kaveriyappa Layout,
                                                <br/>Millers Tank Bund Road,
                                                <br/> Vasantha Nagar, 
												<br/>(Opp to Mahaveer Jain Hospital),
                                                <br/> Bengaluru -560 052.</p>

                                        </address>
                                         <h4> &nbsp;<b>Doctor:<span id="doctorName"></span></b></h4>
                                    </div>
                                    <div class="pull-right text-right">
                                        <address>
                                            <h3>To,</h3>
                                            <h4 class="font-bold"><span id="patientName" ></span></h4>
                                             <p class="text-muted" style="word-break:break-word;width:200px" id="patientAddress"></p>
                                            <p id="patientEmail"></p>
                                            <p id="patientPhone"></p>
                                            <p class="m-t-30"><b>Invoice Date :</b> <input type="text" id="invoiceDate" class="form-control mydatepicker" value="" placeholder="Invoice Date" style="width:200px;" autocomplete="off"></p>
                                            <p><b>Due Amount :</b> <i class="fa fa-inr"></i> <span id="DueAmount"></span></p>
                                        </address>
                                    </div>
                                </div>
                                
                                    
                                    <div class="col-md-7">
                                        <div class="pull-right">
                                            <input type="text" placeholder="Search Service" class="form-control" id="serviceListSearch" autocomplete="off">
                                        </div>
                                    </div>
                                <div class="col-md-5">
                                        <div class="pull-left">
                                           <a style="color:#fff;" onclick="clearSearch();"><div class="btn btn-primary btn-sm" style="margin-top: 4px;" > Clear</div></a>
                                        </div>
                                    </div>

                                
                                <div class="col-md-12">
                                    <div class="table-responsive m-t-40">
                                        <input type="hidden" id="patientCode" value="" />
                                        <table class="table table-hover" id="patientInvoiceTable">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th class="text-center">#</th>
                                                    <th>Service Name</th>
                                                    <th>Date</th>
                                                    <th >Description</th>
                                                    <th class="text-right">Quantity</th>
                                                    <th class="text-right">Charges</th>
                                                    <th class="text-right">GST</th>
                                                    <th class="text-right">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                                                  
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="pull-right m-t-30 text-right">
                                        <input type="hidden" id="totalservicenumber" value="" />
                                        <input type="hidden" id="totalservicenumberdelete" value="" />
                                        <p>Sub - Total amount:  <i class="fa fa-inr"></i><input type="hidden" id="subtotalvalue" name="subtotalvalue"  /><span id="subtotal">0</span></p>
                                        <p>GST  :  <i class="fa fa-inr"></i><input type="hidden" id="gstvalue" name="gstvalue"  /><span id="totalgst">0</span> </p>
                                        <hr>
                                        <h3><b>Total :</b> <i class="fa fa-inr"></i> <input type="hidden" id="totalvalue" name="totalvalue" " /><span id="totalamount">0</span></h3> </div>
                                    <p id="demo"></p>
                                    <div class="clearfix"></div>
                                    <hr>
                                     <div class="col-lg-10 col-md-8 col-sm-12">
                                       
                                        <button onClick="PrintInvoice('saveinvoice');" class="btn btn-default btn-outline btn-sm printInvoiceRight" type="button"> <span><i class="fa fa-print"></i> Print / Save</span> </button>
										<button class="btn btn-primary btn-sm printInvoiceRight" onclick="SendInvoiceMail('saveinvoice')" ><i class="fa fa-envelope-o"></i> Send Mail / Save </button>
                                         <button  class="btn btn-primary btn-sm addInvoiceRight" onclick="proceedToPayment('saveinvoice')" ><i class="fa fa-inr"></i> Proceed to payment /save</button>
									</div>
                                     <div class="col-lg-2 col-md-4 col-sm-12">
                                       
                                         <button  class="btn btn-primary btn-sm addInvoiceRight" onclick="saveInvoice()" ><i class="fa fa-inr"></i> Save Invoice</button>
									</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="overlay" style="display: none;"></div>
                 <img id="loaderImage" src="Scripts/loading.gif" width="150" height="150" style="position:absolute; margin-top:-40%;margin-left:40%;display:none; " />
                <!-- .row -->
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
                        return {label:item.patientName, id: item.patientCode}
                    }))                 
                }
            });

        },
        select: function (event, ui) {
            $(this).val(ui.item.label);
            $('#searchPatient').val(ui.item.label);
             $('#patientCode').val(ui.item.id);
             globalpatientcode = ui.item.id;
             globalpatientName = ui.item.label;
             getPatientDetails(ui.item.id);
             generateNewInvoiceNumber();
             patientDueAmount(ui.item.id);
             $('#patientName').text(ui.item.label);
             var a1 = document.getElementById('allinvoicehref');
             a1.setAttribute("href", "patient-all-invoice.aspx?invoicepatientCode=" + ui.item.id);
             $('#patientInvoiceTable tbody').empty();
             $('#totalservicenumber').val(0);
             $('#totalservicenumberdelete').val(0);
             $('#doctorName').text(Session.get("DoctorName"));
        }
    };
         $('#searchPatient').autocomplete(loadcontact);
             });


// Getting Service list

    $(function () {
        var serviceListLength = 0;

        var loadcontact = {
            minLength: 2,
            source: function (request, response) {
                $.ajax({

                    url: 'WebService.asmx/getAllServiceListDetails',
                    data: '{term: ' + JSON.stringify(request.term) + '}',
                    method: 'POST',
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        response($.map(data.d, function (item) {
                            return { label: item.serviceName, id: item.serviceCode, charge: item.serviceCharge, gst: item.serviceGst }
                        }))
                    }
                });

            },
             select: function (event, ui) {
                 if ($('#patientCode').val() == "")
                 {
                     $.toast({
                         heading: 'Select Patient',
                         text: 'Please select patient first.',
                         position: 'bottom-right',
                         loaderBg: '#ff6849',
                         icon: 'error',
                         hideAfter: 3500

                     });
                     return false;
                 }

                $(this).val(ui.item.label);
                
                var servicedata = [ui.item.id, ui.item.label];
                var pos = $('#totalservicenumber').val();
                var number = $('#totalservicenumberdelete').val();
                for (var k = 1; k <= pos; k++) {
                    if ($('#serviceCode' + k).val() == ui.item.id) {
                        $.toast({
                            heading: 'Service Already In List',
                            text: 'Service available in list.',
                            position: 'bottom-right',
                            loaderBg: '#ff6849',
                            icon: 'error',
                            hideAfter: 3500

                        });
                        return false;
                    }

                }
                var datePickerOptions = {
                    dateFormat: 'dd/mm/yy',
                    changeMonth: true,
                }

                for (var u = 0; u < ServiceDetails.length; u++) {
                    alert('serviDetails=' + ServiceDetails[u][0] + ' servicedata=' + servicedata[0]);
                    if (ServiceDetails[u][0] != servicedata[0]) {
                        alert('addded');
                        ServiceDetails.push(servicedata);
                    }
                }
              
                $('#patientInvoiceTable tbody').append('<tr id="rowId' + ++pos + '">' +
                    '<td><button onclick="removeInvoiceTableRow(this.id)" id="' + pos + '"><i class="fa fa-trash"></i></button></td>' +
                    '<td class="text-center" > <span id="invoiceServiceId' + ++number + '"> ' + number + ' </span><input type="hidden" id="serviceCode' + pos + '" value="' + ui.item.id + '"> </td >' +
                    '<td> <span id="serviceName' + pos + '"> ' + ui.item.label + '</span> </td>' +
                    '<td><input type="text" id="serviceDate'+pos+'" class="form-control mydatepicker" value="" placeholder="Invoice Date" style="width:150px;"></td>'+
                    '<td id="gendet"><textarea placeholder="Enter description"  cols="2" rows="2" class="form-control" name="serviceDescription' + pos + '" id="serviceDescription' + pos + '" onchange="updateBill(this.id,' + pos + ')"></textarea></td>' +
                    '<td class="text-right"><input type="number"  name="serviceQunatity' + pos + '" id="serviceQunatity' + pos + '" value="0" style="width:40px;" onchange="updateBill(this.id,' + pos + ')" style="text-align:center;" /> </td>' +
                    '<td class="text-right"> <i class="fa fa-inr"></i><input type="hidden" value="' + ui.item.charge + '" id="serviceCharge' + pos + '" name="serviceCharge' + pos + '" /><span id="updateserviceCharge' + pos + '" >0</span> </td>' +
                    '<td class="text-right"> <i class="fa fa-inr"></i><input type="hidden" value="' + ui.item.gst + '" id="serviceGst' + pos + '" name="serviceGst' + pos + '" /> <span id="updateserviceGst' + pos + '" >0</span> </td>' +
                    '<td class="text-right"><i class="fa fa-inr"><span id="rowTotal' + pos + '">0</span></td></tr >');

                $('#serviceDate' + pos).datepicker(datePickerOptions);
                $('#totalservicenumber').val(pos);
                $('#totalservicenumberdelete').val(number);
            }
        };
        $('#serviceListSearch').autocomplete(loadcontact);
    });

</script>

</asp:Content>
