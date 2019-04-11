<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="add-patient.aspx.cs" Inherits="Stride.add_patient" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="Scripts/Patient.js"></script>
<script src="Scripts/jquery-1.10.2.js"></script>


     <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">Add Patient</h4> </div>
                    <div class="col-md-2" id="allPatientsView">
						<a href="patients.aspx" style="color:#fff;"><i class="fa fa-users"></i><div class="btn btn-primary btn-sm" style="margin-top: 4px;" > All Patients</div></a>
						</div>
                    <div class="col-lg-7 col-sm-8 col-md-8 col-xs-12"> 
                        <ol class="breadcrumb">
                            <li><a href="dashboard.aspx">Stride</a></li>
                            <li class="active">Add Patient</li>
                        </ol>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>

                <form class="form-material form-horizontal" role="form" id="newpatient" method="post" onsubmit="saveNewPatient(); return false;" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="white-box">
                            <h3 class="box-title">Basic Information</h3>
                           
                                

                                <div class="form-group">
                                    <label class="col-md-12" for="example-text">Name *
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="patientName" name="patientName" class="form-control" placeholder="Enter patient name" required="required">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="bdate">Age *
                                    </label>
                                    <div class="col-md-12">
                                        <input type="tel" id="patientDOB" name="patientDOB" class="form-control" placeholder="Enter patient age" pattern="[\d0-9]{2}" maxlength="2"  required="required">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-12">Gender *</label> 
                                    <div class="col-sm-12">
                                        <select class="form-control" id="patientGender" name="patientGender" required="required">
                                            <option value="">Select Gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="bdate">Address
                                    </label>
                                    <div class="col-md-12">
                                        <textarea class="form-control" rows="3" name="patientAddress" id="patientAddress"></textarea>
                                    </div>
                                </div>
                            <div class="form-group">
                                    <label class="col-md-12" for="example-email">Aadhar No 
                                    </label>
                                    <div class="col-md-12">
                                        <input type="tel" id="patientAadhar" name="patientAadhar" class="form-control" pattern="[\d0-9]{12}" maxlength="12">
                                    </div>
                                </div>
                       
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="white-box">
                            <h3 class="box-title">Patients's Account Information</h3>
                            
                             <div class="form-group">
                                    <label class="col-md-12" for="example-email">Occupation
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="patientOccupation" name="patientOccupation" class="form-control" placeholder="Enter patient occupation">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="example-email">Email 
                                    </label>
                                    <div class="col-md-12">
                                        <input type="email" id="patientEmail" name="patientEmail"  class="form-control" placeholder="Enter patient email">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="example-phone">Mobile No *
                                    </label>
                                    <div class="col-md-12">
                                        <input type="tel" id="patientPhone" name="patientPhone" class="form-control" pattern="[\d0-9]{10}" maxlength="10" required="required" pattern="[\d0-9]{10}" >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-12">Profile Image</label>
                                    <div class="col-sm-12">
                                        <img class="img-responsive" id="displaypatientProfile" alt="" style="max-width:60px;">
                                       </div>
                                    <div class="col-sm-12">
                                        <div class="fileinput fileinput-new input-group" data-provides="fileinput">
                                            <div class="form-control" data-trigger="fileinput"> <i class="glyphicon glyphicon-file fileinput-exists"></i> <span class="fileinput-filename"></span></div> <span class="input-group-addon btn btn-default btn-file"> <span class="fileinput-new">Select file</span> <span class="fileinput-exists">Change</span>
                                            <input type="file" id="patientProfileImage" name="patientProfileImage"> </span> <a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a> </div>
                                    </div>
                                </div>

                                   <div class="form-group">
                                    <label class="col-md-12">Description</label>
                                    <div class="col-md-12">
                                        <textarea class="form-control" rows="3" name="patientDescription" id="patientDescription"></textarea>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-info waves-effect waves-light m-l-10">Save New Patients</button>
                                
                            </div>
                       
                    </div>
                </div>
              </form>
                <div id="overlay" style="display: none;"></div>
               <img id="loaderImage" src="Scripts/loading.gif" width="150" height="150" style="position:absolute; margin-top:-20%;margin-left:20%;display:none; " />
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
            </div>

</asp:Content>
