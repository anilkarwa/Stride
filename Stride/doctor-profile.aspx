<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="doctor-profile.aspx.cs" Inherits="Stride.doctor_profile" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
     <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="Scripts/Doctor.js"></script>

     <!-- Left navbar-header end -->
        <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">Doctor Profile</h4> </div>
                    <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12"> 
                        <ol class="breadcrumb">
                            <li><a href="#">Hospital</a></li>
                            <li class="active">Doctor Profile</li>
                        </ol>
                    </div>
                </div>
                <!-- /.row -->
                <!-- .row -->
                <div class="row">
                    <div class="col-md-4 col-xs-12">
                        <div class="white-box">
                            <div class="user-bg"> <img width="100%" alt="user" id="doctorProfileImage"> </div>
                            <div class="user-btm-box">
                                <!-- .row -->
                                <div class="row text-center m-t-10">
                                    <div class="col-md-6"><strong>Name</strong>
                                        <p id="doctorDisplyName"></p>
                                    </div>
                                    <div class="col-md-6"><strong>Speciality</strong>
                                        <p id="doctorDisplaySpeciality"></p>
                                    </div>
                                </div>
                                <!-- /.row -->
                                <hr>
                                <!-- .row -->
                                <div class="row text-center m-t-10">
                                    <div class="col-md-6 b-r"><strong>Email ID</strong>
                                        <p id="doctorDisplayEmail"> </p>
                                    </div>
                                    <div class="col-md-6"><strong>Phone</strong>
                                        <p id="doctorDisplayPhone"></p>
                                    </div>
                                </div>
                                <!-- /.row -->
                                <hr>
                                <!-- .row -->
                                <div class="row text-center m-t-10">
                                    <div class="col-md-12"><strong>Address</strong>
                                        <p id="doctorDisplayAddress"></p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 col-xs-12">
                        <div class="white-box">
						<h3>About</h3>
                         
                            <!-- /.tabs -->
                            <div class="tab-content">
                                <!-- .tabs 1 -->
                                <div class="tab-pane active" id="home">
                                    <div class="steamline">
                                        <div class="sl-item">
                                            <div class="sl-left"> <img id="doctorProfileImage2" alt="user" class="img-circle" /> </div>
                                            <div class="sl-right">
                                                <div class="m-l-40"><a href="#" class="text-info"><strong ><span id="doctorDisplyName2"></span></strong></a> <span class="sl-date" id="doctorDisplaySpeciality2"></span>
                                                   <ul>
												   <li id="doctorAchmtOptionDisplay1"> <i class="fa fa-arrow-right"></i> </li>
												   <li id="doctorAchmtOptionDisplay2"><i class="fa fa-arrow-right"></i>  </li>
												   <li id="doctorAchmtOptionDisplay3"><i class="fa fa-arrow-right"></i>  </li>
												   <li id="doctorAchmtOptionDisplay4"><i class="fa fa-arrow-right"></i> </li>
												  
												   </ul>
                                                    <div class="m-t-20 row"><img id="doctorUploadImg1" alt="user" width="300" height="200" class="col-md-3 col-xs-12" />  <img id="doctorUploadImg2" alt="user" width="300" height="200" class="col-md-3 col-xs-12" /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr>
                                        
                                    </div>
                                </div>
                                <!-- /.tabs1 -->
                                <!-- .tabs 2 -->
                                <div class="tab-pane" id="biography">
                                    <div class="row">
                                        <div class="col-md-3 col-xs-6 b-r"> <strong>Full Name</strong>
                                            <br>
                                            <p class="text-muted">Johnathan Deo</p>
                                        </div>
                                        <div class="col-md-3 col-xs-6 b-r"> <strong>Mobile</strong>
                                            <br>
                                            <p class="text-muted">(123) 456 7890</p>
                                        </div>
                                        <div class="col-md-3 col-xs-6 b-r"> <strong>Email</strong>
                                            <br>
                                            <p class="text-muted">johnathan@admin.com</p>
                                        </div>
                                        <div class="col-md-3 col-xs-6"> <strong>Location</strong>
                                            <br>
                                            <p class="text-muted">London</p>
                                        </div>
                                    </div>
                                    <hr>
                                    <p class="m-t-30">Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries </p>
                                    <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                    <h4 class="m-t-30">Skill Set</h4>
                                    <hr>
                                    <h5>Wordpress <span class="pull-right">80%</span></h5>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width:80%;"> <span class="sr-only">50% Complete</span> </div>
                                    </div>
                                    <h5>HTML 5 <span class="pull-right">90%</span></h5>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-custom" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="width:90%;"> <span class="sr-only">50% Complete</span> </div>
                                    </div>
                                    <h5>jQuery <span class="pull-right">50%</span></h5>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:50%;"> <span class="sr-only">50% Complete</span> </div>
                                    </div>
                                    <h5>Photoshop <span class="pull-right">70%</span></h5>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%;"> <span class="sr-only">50% Complete</span> </div>
                                    </div>
                                    <h4 class="m-t-30">Education</h4>
                                    <hr>
                                    <ul>
                                        <li>M.B.B.S from AIIMS</li>
                                        <li>M.B.B.S from AIIMS</li>
                                        <li>M.D from AIIMS</li>
                                        <li>D.N.B AIIMS</li>
                                        <li>M.S from AIIMS</li>
                                        <li>D.N.B from AIIMS</li>
                                    </ul>
                                    <h4 class="m-t-30">Experience</h4>
                                    <hr>
                                    <ul>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                        <li>Excepteur sint occaecat cupidatat non proident.</li>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                        <li>Excepteur sint occaecat cupidatat non proident.</li>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                        <li>Excepteur sint occaecat cupidatat non proident.</li>
                                    </ul>
                                    <h4 class="m-t-30">Accomplishments</h4>
                                    <hr>
                                    <ul>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                        <li>Excepteur sint occaecat cupidatat non proident.</li>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                        <li>Excepteur sint occaecat cupidatat non proident.</li>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                        <li>Excepteur sint occaecat cupidatat non proident.</li>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                    </ul>
                                </div>
                                <!-- /.tabs2 -->
                                <!-- .tabs 3 -->
                                <div class="tab-pane" id="update">
                                    <form class="form-material form-horizontal">
                                        <div class="form-group">
                                            <label class="col-md-12" for="example-text">Name</span>
                                            </label>
                                            <div class="col-md-12">
                                                <input type="text" id="example-text" name="example-text" class="form-control" placeholder="enter your name" value="Jonathan Doe">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-12" for="bdate">Date of Birth</span>
                                            </label>
                                            <div class="col-md-12">
                                                <input type="text" id="bdate" name="bdate" class="form-control mydatepicker" placeholder="enter your birth date" value="12/10/2017">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-12">Gender</label>
                                            <div class="col-sm-12">
                                                <select class="form-control">
                                                    <option>Select Gender</option>
                                                    <option selected="selected">Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-12">Profile Image</label>
                                            <div class="col-sm-12">
                                                <img class="img-responsive" src="plugins/images/big/d2.jpg" alt="" style="max-width:120px;">
                                            </div>
                                            <div class="col-sm-12">
                                                <div class="fileinput fileinput-new input-group" data-provides="fileinput">
                                                    <div class="form-control" data-trigger="fileinput"> <i class="glyphicon glyphicon-file fileinput-exists"></i> <span class="fileinput-filename"></span></div> <span class="input-group-addon btn btn-default btn-file"> <span class="fileinput-new">Select file</span> <span class="fileinput-exists">Change</span>
                                                    <input type="file" name="..."> </span> <a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a> </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-12" for="special">Speciality</span>
                                            </label>
                                            <div class="col-md-12">
                                                <input type="text" id="special" name="special" class="form-control" placeholder="e.g. Dentist" value="Neurosurgeon">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-12">Description</label>
                                            <div class="col-md-12">
                                                <textarea class="form-control" rows="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</textarea>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-12" for="url">Website URL</span>
                                            </label>
                                            <div class="col-md-12">
                                                <input type="text" id="url" name="url" class="form-control" placeholder="your website" value="http://www.example-website.com">
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-info waves-effect waves-light m-r-10">Submit</button>
                                        <button type="submit" class="btn btn-inverse waves-effect waves-light">Cancel</button>
                                    </form>
                                </div>
                                <!-- /.tabs 3 -->
                            </div>
                        </div>
                    </div>
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

</asp:Content>
