<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="service-list.aspx.cs" Inherits="Stride.service_list" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="Scripts/Service.js"></script>
 <script src="Scripts/jquery-1.10.2.js"></script>
      <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">Service List</h4>
                    </div>
                    <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12"> 
					
                        <ol class="breadcrumb">
                            <li><a href="dashboard.aspx">Stride</a></li>
                            <li class="active">Service List</li>
                        </ol>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!--row -->
               <form class="form-material form-horizontal" role="form" id="newpatient" method="post" onsubmit="saveNewService(); return false;" >
                <div class="row">
                    <div class="col-sm-6">
                        <div class="white-box">
                            <h3 class="box-title">Service  Information</h3>
                           
                                
                                <div class="form-group">
                                        <label class="col-md-12" for="example-text">Service Name *
                                        </label>
                                        <div class="col-md-12">
                                            <input type="text" id="serviceName" name="serviceName" class="form-control" placeholder="Enter service name" required="required">
                                        </div>
                                    </div>
                                <div class="form-group">
                                        <label class="col-md-12" for="example-text">Service Charges *
                                        </label>
                                        <div class="col-md-12">
                                            <input type="number" id="serviceCharges" name="serviceCharges" class="form-control"  required="required">
                                        </div>
                                    </div>
                                <div class="form-group">
                                        <label class="col-md-12" for="example-text">Service GST *
                                        </label>
                                        <div class="col-md-12">
                                            <input type="number" id="serviceGST" name="serviceGST" class="form-control"  required="required">
                                        </div>
                                    </div>
                                    <div class="text-right">
                                      <button type="submit" class="btn btn-info waves-effect waves-light m-l-10 addServiceRight" >Save New Service</button>
                                    </div> 
                       
                        </div>
                    </div>

                        <div class="col-sm-6">
                        <div class="white-box">
                            <h3 class="box-title m-b-0">Service List Information</h3>
                           
                            <table class="tablesaw table-bordered table-hover table" data-tablesaw-mode="swipe" id="serviceListTable">
                                <thead>
                                    <tr>
                                        <th>Service Name</th>
                                        <th>Service Charge</th>
                                        <th>Service Gst</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                                                     
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
              </form>
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

           
    <!-- Edit service list modal -->
    <div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content" style="margin-top:15%;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Edit Service</h4>
      </div>
      <div class="modal-body">
        <form class="form-material form-horizontal" role="form"  method="post" onsubmit="serviceUpdate(); return false;" >
                <div class="row">
                    <div class="col-sm-12">
                        <div class="white-box">
                   
                           
                                 <div class="form-group">
                                    <label class="col-md-12" for="example-text">Service Code
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="editserviceCode" name="editserviceCode" class="form-control" placeholder="Enter service code" required="required" readonly="readonly">
                                    </div>
                                </div>
                                <div class="form-group">
                                        <label class="col-md-12" for="example-text">Service Name
                                        </label>
                                        <div class="col-md-12">
                                            <input type="text" id="editserviceName" name="editserviceName" class="form-control" placeholder="Enter service name" required="required">
                                        </div>
                                    </div>
                                <div class="form-group">
                                        <label class="col-md-12" for="example-text">Service Charges
                                        </label>
                                        <div class="col-md-12">
                                            <input type="number" id="editserviceCharges" name="editserviceCharges" class="form-control"  required="required">
                                        </div>
                                    </div>
                                <div class="form-group">
                                        <label class="col-md-12" for="example-text">Service GST
                                        </label>
                                        <div class="col-md-12">
                                            <input type="number" id="editserviceGST" name="editserviceGST" class="form-control"  required="required">
                                        </div>
                                    </div>
                                   
                       
                        </div>
                         <div class="pull-right">
                        <button type="submit" class="btn btn-info waves-effect waves-light m-l-10" >Save Service</button>
                    </div> 
                    </div>
                    
                    </div>
            </form>
      </div>
    
    </div>

  </div>
</div>


            <!-- /.container-fluid -->
            <footer class="footer text-center"> 2018 &copy; Stride Physio brought to you by <a href="http://softvent.com/" target="_blank">Softvent.com</a> </footer>
        </div>
        <!-- /#page-wrapper -->

   

    


</asp:Content>
