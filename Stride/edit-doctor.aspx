<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="edit-doctor.aspx.cs" Inherits="Stride.edit_doctor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="Scripts/Doctor.js"></script>
    <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">Edit Physiotherapist</h4> </div>
                        <div class="col-md-2">
						 <a href="add-doctor.aspx" style="color:#fff;"> <div class="btn btn-primary btn-sm" style="margin-top: 4px;" >Add Physiotherapist</div></a>
						</div>
                        <div class="col-md-2">
						  <a href="doctors.aspx" style="color:#fff;"><div class="btn btn-primary btn-sm" style="margin-top: 4px;" >All Physiotherapist</div></a>
						</div>
                    <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12"> 
                        <ol class="breadcrumb">
                         
                        </ol>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                  <form class="form-material form-horizontal" role="form" id="newdoctor" method="post" onsubmit="editDoctorDetails(); return false;" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="white-box">
                            <h3 class="box-title">Basic Information</h3>
                            

                                 <div class="form-group">
                                    <label class="col-md-12" for="example-text">Physiotherapist Code
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="editdoctorCode" name="editdoctorCode" class="form-control" placeholder="Enter Physiotherapist code">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="example-text">Name
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="editdoctorName" name="editdoctorName" class="form-control" placeholder="Enter Physiotherapist name">
                                    </div>
                                </div>
                                 <div class="form-group">
                                    <label class="col-md-12" for="special">Speciality
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="editdoctorSpeciality" name="editdoctorSpeciality" class="form-control" placeholder="e.g. Dentist">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="bdate">Date of Birth
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="editdoctorDOB" name="editdoctorDOB" class="form-control mydatepickerEditDOB" placeholder="Enter your birth date">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-12">Gender</label>
                                    <div class="col-sm-12">
                                        <select class="form-control" name="editdoctorGender" id="editdoctorGender">
                                            <option>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-12">Description</label>
                                    <div class="col-md-12">
                                        <textarea class="form-control" rows="3" name="editdoctorDescription" id="editdoctorDescription"></textarea>
                                    </div>
                                </div>
                              
                          
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="white-box">
                            <h3 class="box-title">Physiotherapist's Account Information</h3>
                            
                                <div class="form-group">
                                    <label class="col-md-12" >Email
                                    </label>
                                    <div class="col-md-12">
                                        <input type="email" id="editdoctorEmail" name="editdoctorEmail"  class="form-control" placeholder="Enter your email">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="example-phone">Mobile No
                                    </label>
                                    <div class="col-md-12">
                                        <input type="tel" id="editdoctorPhone" name="editdoctorPhone" class="form-control" pattern="[\d0-9]{10}" max-length="10" >
                                    </div>
                                </div>
                              <div class="form-group">
                                    <label class="col-md-12">Address</label>
                                    <div class="col-md-12">
                                        <textarea class="form-control" rows="3" name="editdoctorAddress" id="editdoctorAddress"></textarea>
                                    </div>
                                </div>
                                 <div class="form-group">
                                    <label class="col-md-12">Aadhar
                                    </label>
                                    <div class="col-md-12">
                                        <input type="tel" id="editdoctorAadhar" name="editdoctorAadhar" class="form-control" pattern="[\d0-9]{12}"  max-length="12" >
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
                                            <input type="file" name="editdoctorProfileImg" id="editdoctorProfileImg"> </span> <a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a> </div>
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
                                        <input type="text" id="editdoctorAchmntOption1" name="editdoctorAchmntOption1" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="turl">2.
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="editdoctorAchmntOption2" name="editdoctorAchmntOption2" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="gurl">3.
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="editdoctorAchmntOption3" name="editdoctorAchmntOption3" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12" for="inurl">4.
                                    </label>
                                    <div class="col-md-12">
                                        <input type="text" id="editdoctorAchmntOption4" name="editdoctorAchmntOption4" class="form-control">
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
                                            <input type="file" name="editdoctorAchmntUpload1" id="editdoctorAchmntUpload1"> </span> <a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a> </div>
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
                                            <input type="file" name="editdoctorAchmntUpload2" id="editdoctorAchmntUpload2"> </span> <a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a> </div>
                                    </div>
                                </div>
                          
                           <div class="text-right">
                           <button type="submit" class="btn btn-info waves-effect waves-light  ">Save Physiotherapist</button>
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
<%--   <script src="plugins/bower_components/jquery/dist/jquery.min.js"></script> --%>

</asp:Content>
