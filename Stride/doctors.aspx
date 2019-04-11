<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="doctors.aspx.cs" Inherits="Stride.doctors" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="Scripts/Doctor.js"></script>
<link href="css/jquery-ui.css" rel="stylesheet" type="text/css">
<script src="Scripts/jquery-1.10.2.js"></script>
<script src="Scripts/jquery-ui-1.10.3.js"></script>

      <!-- Left navbar-header end -->
        <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">Physiotherapists</h4> </div>
                     <div class="col-md-2">
						<input type="text" placeholder="Physiotherapist Name" class="form-control" id="searchPatient">
						</div>
						<div class="col-md-1">
						<i class="fa fa-search" style="margin-top:11px;"></i>
						</div>
						<div class="col-md-2" id="addPhyso">
						<a href="add-doctor.aspx" style="color:#fff;"><div class="btn btn-primary btn-sm" style="margin-top: 4px;" >Add Physiotherapist</div></a>
						</div>
                    <div class="col-lg-4 col-sm-8 col-md-8 col-xs-12">
                        <ol class="breadcrumb">
                            <li><a href="dashboard.aspx">Stride</a></li>
                            <li class="active">Physiotherapists</li>
                        </ol>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- .row -->
                <div class="row el-element-overlay scrollpane" id="doctorCards">
                    <!-- .col -->
      
                 
                </div>
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

                url: 'WebService.asmx/getDoctorDetailsByName',
                data: '{term: ' + JSON.stringify(request.term) + '}',
                method: 'POST',
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {label:item.doctorName, id: item.doctorCode}
                    }))                 
                }
            });

        },
        select: function (event, ui) {
            $(this).val(ui.item.label);
            $('#searchPatient').val(ui.item.label);
            loadDoctorById(ui.item.id);
        }
    };
         $('#searchPatient').autocomplete(loadcontact);
 });
</script>  


</asp:Content>
