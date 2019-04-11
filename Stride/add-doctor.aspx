<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="add-doctor.aspx.cs" Inherits="Stride.add_doctor" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="Scripts/Doctor.js"></script>
<script src="Scripts/jquery-1.10.2.js"></script>
    <!-- Left navbar-header end -->
        <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">Add Physiotherapist</h4> </div>
                    <div class="col-md-2" id="allPhysoView">
						<a href="doctors.aspx" style="color:#fff;"><div class="btn btn-primary btn-sm" style="margin-top: 4px;" >All Physiotherapist</div></a>
						</div>
                    <div class="col-lg-7 col-sm-8 col-md-8 col-xs-12"> 
                        <ol class="breadcrumb">
                            <li><a href="dashboard.aspx">Stride</a></li>
                            <li class="active">Add Physiotherapist</li>
                        </ol>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
               <form class="form-material form-horizontal" role="form" id="newdoctor" method="post" onsubmit="saveNewDoctor(); return false;" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="white-box">
                            <h3 class="box-title">Basic Information</h3>
                            

                                 <div class="form-group">
                                    <label class="col-md-12" for="example-text">Physiotherapist Code *
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="doctorCode" name="doctorCode" class="form-control" placeholder="Enter Physiotherapist code" required="required">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="example-text">Name *
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="doctorName" name="doctorName" class="form-control" placeholder="Enter Physiotherapist name" required="required">
                                    </div>
                                </div>
                                 <div class="form-group">
                                    <label class="col-md-12" for="special">Speciality *
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="doctorSpeciality" name="doctorSpeciality" class="form-control" placeholder="e.g. Dentist" required="required">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="bdate">Date of Birth *
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="doctorDOB" name="doctorDOB" class="form-control mydatepickerDOB" placeholder="Enter your birth date" required="required">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-12">Gender *</label>
                                    <div class="col-sm-12">
                                        <select class="form-control" name="doctorGender" id="doctorGender" required="required">
                                            <option>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-12">Description</label>
                                    <div class="col-md-12">
                                        <textarea class="form-control" rows="3" name="doctorDescription" id="doctorDescription"></textarea>
                                    </div>
                                </div>
                              
                          
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="white-box">
                            <h3 class="box-title">Physiotherapist's Account Information</h3>
                            
                                <div class="form-group">
                                    <label class="col-md-12" >Email *
                                    </label>
                                    <div class="col-md-12">
                                        <input type="email" id="doctorEmail" name="doctorEmail"  class="form-control" placeholder="Enter your email" required="required" autocomplete="off">
                                    </div>
                                </div>
                             <div class="form-group">
                                    <label class="col-md-12" >Password *
                                    </label>
                                    <div class="col-md-12">
                                        <input type="password" id="doctorPassword" name="doctorPassword"  class="form-control" placeholder="Enter Physiotherapist password" required="required" autocomplete="off">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="example-phone">Mobile No *
                                    </label>
                                    <div class="col-md-12">
                                        <input type="tel" id="doctorPhone" name="doctorPhone" class="form-control" maxlength="10" pattern="[\d0-9]{10}" required="required" autocomplete="off" >
                                    </div>
                                </div>
                              <div class="form-group">
                                    <label class="col-md-12">Address </label>
                                    <div class="col-md-12">
                                        <textarea class="form-control" rows="3" name="doctorAddress" id="doctorAddress" ></textarea>
                                    </div>
                                </div>
                                 <div class="form-group">
                                    <label class="col-md-12">Aadhar *
                                    </label>
                                    <div class="col-md-12">
                                        <input type="tel" id="doctorAadhar" name="doctorAadhar" class="form-control" maxlength="12" required="required" pattern="[\d0-9]{12}" autocomplete="off">
                                    </div>
                                </div>
                                
                               <div class="form-group">
                                    <label class="col-sm-12">Profile Image</label>
                                    <div class="col-sm-12">
                                        <img class="img-responsive" id="displaydoctorProfile" alt="" style="max-width:60px;">
                                       </div>
                                    <div class="col-sm-12">
                                        <div class="fileinput fileinput-new input-group" data-provides="fileinput">
                                            <div class="form-control" data-trigger="fileinput"> <i class="glyphicon glyphicon-file fileinput-exists"></i> <span class="fileinput-filename"></span></div> <span class="input-group-addon btn btn-default btn-file"> <span class="fileinput-new">Select file</span> <span class="fileinput-exists">Change</span>
                                            <input type="file" name="doctorAchmntUpload3" id="doctorAchmntUpload3"> </span> <a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a> </div>
                                    </div>
                                </div>
                           

                        </div>
                    </div>
                             
                </div>
                    <div class="row">
                         <div class="col-sm-12">
                        <div class="white-box">
                            <h3 class="box-title">Physiotherapist's Qualifications/Work/Achievements</h3>
                          
                                <div class="form-group">
                                    <label class="col-md-12" for="furl">1.
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="doctorAchmntOption1" name="doctorAchmntOption1" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="turl">2.
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="doctorAchmntOption2" name="doctorAchmntOption2" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="gurl">3.
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="doctorAchmntOption3" name="doctorAchmntOption3" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="inurl">4.
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="doctorAchmntOption4" name="doctorAchmntOption4" class="form-control">
                                    </div>
                                </div>
                              <div class="form-group">
                                    <label class="col-sm-12">Upload 1</label>
                                   <div class="col-sm-12">
                                        <img class="img-responsive" id="displaydoctorAchmntUpload1" alt="" style="max-width:60px;">
                                       </div>
                                    <div class="col-sm-12">
                                        <div class="fileinput fileinput-new input-group" data-provides="fileinput">
                                            <div class="form-control" data-trigger="fileinput"> <i class="glyphicon glyphicon-file fileinput-exists"></i> <span class="fileinput-filename"></span></div> <span class="input-group-addon btn btn-default btn-file"> <span class="fileinput-new">Select file</span> <span class="fileinput-exists">Change</span>
                                            <input type="file" name="doctorAchmntUpload1" id="doctorAchmntUpload1"> </span> <a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a> </div>
                                    </div>
                                </div>
                              <div class="form-group">
                                 
                                    <label class="col-sm-12">Upload 2</label>
                                    <div class="col-sm-12">
                                        <img class="img-responsive" id="displaydoctorAchmntUpload2" alt="" style="max-width:60px;">
                                       </div>
                                    <div class="col-sm-12">
                                        <div class="fileinput fileinput-new input-group" data-provides="fileinput">
                                            <div class="form-control" data-trigger="fileinput"> <i class="glyphicon glyphicon-file fileinput-exists"></i> <span class="fileinput-filename"></span></div> <span class="input-group-addon btn btn-default btn-file"> <span class="fileinput-new">Select file</span> <span class="fileinput-exists">Change</span>
                                            <input type="file" name="doctorAchmntUpload2" id="doctorAchmntUpload2"> </span> <a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a> </div>
                                    </div>
                                </div>
                          <div class="text-right">
                           <button type="submit" class="btn btn-info waves-effect waves-light ">Save New Physiotherapist</button>
                          </div>
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
           <footer class="footer text-center"> 2018 &copy; Stride Physio brought to you by <a href="http://softvent.com/" target="_blank">Softvent.com</a> </footer>
        </div>
        <!-- /#page-wrapper -->


</asp:Content>
