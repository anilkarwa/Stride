﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="edit-security-settings.aspx.cs" Inherits="Stride.edit_security_settings" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

     <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="Scripts/UserSetting.js"></script>
<link href="css/jquery-ui.css" rel="stylesheet" type="text/css">
 <script src="Scripts/jquery-1.10.2.js"></script>
<script src="Scripts/jquery-ui-1.10.3.js"></script>

     <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title"> Edit Security Settings</h4>
                    </div>
                    <div  class="col-lg-1 col-md-4 col-sm4 col-xs-12">
                        <h4 class="page-title">Select User</h4>
                        </div>
                    <div  class="col-lg-2 col-md-4 col-sm4 col-xs-12">

                        <input type="text" id="physotherapistName" value="" placeholder="Search Physiotherapist" />
                        <input type="hidden" id="physotherapistCode" value=""  />
                    </div>
                    <div class="col-lg-6 col-sm-8 col-md-8 col-xs-12"> 
					
                        <ol class="breadcrumb">
                            <li><a href="dashboard.aspx">Stride</a></li>
                            <li class="active">Edit Security Settings</li>
                        </ol>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!--row -->
                <div class="row">
				<div class="col-md-12">
                   <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                        <form class="form-material form-horizontal" role="form" " method="post" onsubmit="UpdateSecuritySettings(); return false;">
							<div class="panel panel-default">
								
								<div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne" style="height: auto;">
									<div class="panel-body panel_text">
										<div class="row" style="overflow-x:auto;" id="gendet">
										

									<table class="table table-bordered table-striped table-hover table-condensed" id="tableMasters">
									   <thead>
										  <tr>
											 <td  align="center">SlNo</td>
											 <td  align="center">Menu Caption</td>
											 <td  align="center">Add</td>
											 <td  align="center">Edit</td>
											 <td  align="center">Delete</td>
											 <td  align="center">Print</td>
											 <td  align="center">View</td>
										  </tr>
									   </thead>
									   <tbody>
										  <tr id="tbltrM">
											 <td   align="center"> </td>
											 <td   align="center"><label id="lblmenuM"></label></td>
											 <td  align="center">
												<input class="AddM" id="chkAdd" onchange="onCheckAllAddClick();"  type="checkbox">
											 </td>
											 <td   align="center">
												<input class="EditM" id="chkEdit" onchange="onCheckAllEditClick();"  type="checkbox">
											 </td>
											 <td   align="center">
												<input class="DeleteM" id="chkDelete" onchange="onCheckAllDeleteClick();" type="checkbox">
											 </td>
											 <td   align="center">
												<input class="PrintM" id="chkPrint"  onchange="onCheckAllPrintClick();" type="checkbox">
											 </td>
											 <td   align="center">
												<input class="ViewM" id="chkView" onchange="onCheckAllViewClick();" type="checkbox">
											 </td>
										  </tr>
                                            <tr class="rowM" >
											 <td   align="center"> 1 </td>
											 <td style="width:300px;padding-left:5px;"  align="left"> <label >Physiotherapist </label></td>
											 <td   align="center"><input class="AM" id="editphysoAdd"  type="checkbox"></td>
											 <td   align="center"><input class="EM" id="editphysoEdit"  type="checkbox"></td>
											 <td   align="center"><input class="DM" id="editphysoDelete"  type="checkbox"></td>
											 <td   align="center"><input class="PM" id="editphysoPrint"  type="checkbox"></td>
											 <td   align="center"><input class="VM" id="editphysoView"  type="checkbox"></td>
										  </tr>
                                          <tr class="rowM" >
											 <td   align="center"> 2 </td>
											 <td style="width:300px;padding-left:5px;"  align="left"> <label >Security Settings </label></td>
											 <td   align="center"><input class="AM" id="editsecurityAdd"  type="checkbox"></td>
											 <td   align="center"><input class="EM" id="editsecurityEdit"  type="checkbox"></td>
											 <td   align="center"><input class="DM" id="editsecurityDelete"  type="checkbox"></td>
											 <td   align="center"><input class="PM" id="editsecurityPrint"  type="checkbox"></td>
											 <td   align="center"><input class="VM" id="editsecurityView"  type="checkbox"></td>
										  </tr>
										  <tr class="rowM" >
											 <td   align="center"> 3 </td>
											 <td style="width:300px;padding-left:5px;"  align="left"> <label > Patients Profile </label></td>
											 <td   align="center"><input class="AM" id="editpatientProfileAdd"  type="checkbox"></td>
											 <td   align="center"><input class="EM" id="editpatientProfileEdit"  type="checkbox"></td>
											 <td   align="center"><input class="DM" id="editpatientProfileDelete"  type="checkbox"></td>
											 <td   align="center"><input class="PM" id="editpatientProfilePrint"  type="checkbox"></td>
											 <td   align="center"><input class="VM" id="editpatientProfileView"  type="checkbox"></td>
										  </tr>
										  <tr class="rowM" id="tbltr1M">
											 <td   align="center"> 4 </td>
											 <td style="width:300px;padding-left:5px;"  align="left"> <label> Payments </label></td>
											 <td   align="center"><input class="AM" id="editpayementAdd"  type="checkbox"></td>
											 <td   align="center"><input class="EM" id="editpayementEdit"  type="checkbox"></td>
											 <td   align="center"><input class="DM" id="editpayementDelete"  type="checkbox"></td>
											 <td   align="center"><input class="PM" id="editpayementPrint"  type="checkbox"></td>
											 <td   align="center"><input class="VM" id="editpayementView"  type="checkbox"></td>
										  </tr>
										  <tr class="rowM" id="tbltr2M">
											 <td   align="center"> 5 </td>
											 <td   align="left"> <label id="lblmenu2M"> Patient Invoice </label></td>
											 <td   align="center"><input class="AM" id="editpatientInvoiceAdd"  type="checkbox"></td>
											 <td   align="center"><input class="EM" id="editpatientInvoiceEdit"  type="checkbox"></td>
											 <td   align="center"><input class="DM" id="editpatientInvoiceDelete"  type="checkbox"></td>
											 <td   align="center"><input class="PM" id="editpatientInvoicePrint"  type="checkbox"></td>
											 <td   align="center"><input class="VM" id="editpatientInvoiceView"  type="checkbox"></td>
										  </tr>
                                            <tr class="rowM" >
											 <td   align="center"> 6 </td>
											 <td   style="width:300px;padding-left:5px;"  align="left"> <label > Services List </label></td>
											 <td   align="center"><input class="AM" id="editserviceListAdd"  type="checkbox"></td>
											 <td   align="center"><input class="EM" id="editserviceListEdit"  type="checkbox"></td>
											 <td   align="center"><input class="DM" id="editserviceListDelete"  type="checkbox"></td>
											 <td   align="center"><input class="PM" id="editserviceListPrint"  type="checkbox"></td>
											 <td   align="center"><input class="VM" id="editserviceListView"  type="checkbox"></td>
										  </tr>
										  <tr class="rowM" >
											 <td   align="center"> 7 </td>
											 <td style="width:300px;padding-left:5px;"  align="left"> <label > Payment Report </label></td>
											 <td   align="center"><input class="AM" id="editpaymentReportAdd"  type="checkbox"></td>
											 <td   align="center"><input class="EM" id="editpaymentReportEdit"  type="checkbox"></td>
											 <td   align="center"><input class="DM" id="editpaymentReportDelete"  type="checkbox"></td>
											 <td   align="center"><input class="PM" id="editpaymentReportPrint"  type="checkbox"></td>
											 <td   align="center"><input class="VM" id="editpaymentReportView"  type="checkbox"></td>
										  </tr>
										  <tr class="rowM" >
											 <td   align="center"> 8 </td>
											 <td style="width:300px;padding-left:5px;"  align="left"><label > Sales Report </label></td>
											 <td   align="center"><input class="AM" id="editsalesReportAdd"  type="checkbox"></td>
											 <td   align="center"><input class="EM" id="editsalesReportEdit"  type="checkbox"></td>
											 <td   align="center"><input class="DM" id="editsalesReportDelete"  type="checkbox"></td>
											 <td   align="center"><input class="PM" id="editsalesReportPrint"  type="checkbox"></td>
											 <td   align="center"><input class="VM" id="editsalesReportView"  type="checkbox"></td>
										  </tr>
										 
                                           <tr class="rowM" >
											 <td   align="center"> 9 </td>
											 <td style="width:300px;padding-left:5px;"  align="left"> <label > Outstanding Report </label></td>
											 <td   align="center"><input class="AM" id="editoutstandingReportAdd"  type="checkbox"></td>
											 <td   align="center"><input class="EM" id="editoutstandingReportEdit"  type="checkbox"></td>
											 <td   align="center"><input class="DM" id="editoutstandingReportDelete"  type="checkbox"></td>
											 <td   align="center"><input class="PM" id="editoutstandingReportPrint"  type="checkbox"></td>
											 <td   align="center"><input class="VM" id="editoutstandingReportView"  type="checkbox"></td>
										  </tr>
									   </tbody>
									</table>
										</div>
									</div>
								</div>
							</div>
							
							<br>
							<div class="row pull-right">
							
							<button type="submit"  class="btn btn-primary  btn-sm"><a> <i class="fa fa-floppy-o"></i> Save </a></button>
							
							</div>
						</form>
						</div>
                </div>
              </div>
              
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

                url: 'WebService.asmx/GetAllDoctorDetails',
                data: '{term: ' + JSON.stringify(request.term) + '}',
                method: 'POST',
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return { label: item.doctorName, id: item.doctorCode}
                    }))                 
                }
            });

        },
        select: function (event, ui) {
            $(this).val(ui.item.label);
            $('#physotherapistName').val(ui.item.label);
            $('#physotherapistCode').val(ui.item.id);
            loadUserSettingForEdit(ui.item.id);
            
        }
    };
         $('#physotherapistName').autocomplete(loadcontact);
 });
</script>      

</asp:Content>
