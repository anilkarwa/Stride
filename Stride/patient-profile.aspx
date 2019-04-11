<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="patient-profile.aspx.cs" Inherits="Stride.patient_profile" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<!-- Plugins css -->
 <link href="plugins/bower_componentsdatedropper.min.css" rel="stylesheet" />
 <link href="plugins/bower_components/timedropper.min.css" rel="stylesheet" />
 <script src="plugins/ckeditor/4.9.2/ckeditor.js"></script>
<script src="Scripts/Patient.js"></script>



    <div id="overlay" style="display: none;"></div>
        <img id="loaderImage" src="Scripts/loading.gif" width="150" height="150" style="position:absolute; margin-top:10%;margin-left:50%;display:none; z-index:1" />
     <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <h4 class="page-title">Patient Profile - <span id="headerPatientName"></span></h4> </div>
                    <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12"> 
                        <ol class="breadcrumb">
                            <li><a href="#">Stride</a></li>
                            <li class="active">Patient Profile</li>
                        </ol>
                    </div>
                </div>
                <!-- /.row -->
                <!-- .row -->
                <input type="hidden" name ="patientCodeCN" id="patientCodeCN" value="" />
                <div class="row">
                    <div class="col-md-4 col-sm-6 col-xs-12">
                        <div class="white-box">
                            <div class="user-bg"> <img width="100%" alt="user" id="patientProfileImg"> </div>
                            <div class="user-btm-box">
                                <!-- .row -->
                                <div class="row text-center m-t-10">
                                    <div class="col-md-6 b-r"><strong>Name</strong>
                                        <p id="patientDisplayName"></p>
                                    </div>
                                    <div class="col-md-6"><strong>Occupation</strong>
                                       <br /> <small id="patientOccupation"></small>
                                    </div>
                                </div>
                                <!-- /.row -->
                                <hr>
                                <!-- .row -->
                                <div class="row text-center m-t-10">
                                    <div class="col-md-6 b-r"><strong>Email ID</strong>
                                       <br /> <small id="patientDisplayEmail"></small>
                                    </div>
                                    <div class="col-md-6"><strong>Phone</strong>
                                       <br /> <small id="patientDisplayPhone"></small>
                                    </div>
                                </div>
                                <!-- /.row -->
                                <hr>
                                <!-- .row -->
                                <div class="row text-center m-t-10">
                                    <div class="col-md-12"><strong>Address</strong>
                                        <br /><small id="patientDisplayAddress"></small>
                                    </div>
                                </div>
                                <input id="patientDOB" type="hidden" value ="" />
                            </div>
                        </div>
						<div class="white-box">
                            <div class="">
                                <!-- .row -->
                                <div class="row text-center m-t-10">
                                    <div class="col-md-12"><strong>Due Amount</strong>
                                        <p style="color:red;"><span id="payableAmount"></span></p>
                                    </div>
                                </div>
                                <!-- /.row -->
                                <hr>
                               <div class="row">
                               <div class="col-md-3"></div>
							   <div class="col-md-3">
                               <a  data-toggle="modal" data-target="#responsivemodal"  class="btn btn-primary btn-sm pull-right"><i class="fa fa-file-text-o"></i> Book Appointment</a>
							   </div>
							   <div class="col-md-3">
							   <a id="billHref" class="btn btn-primary btn-sm pull-right"><i class="fa fa-file-text-o"></i> Bill</a>
							   </div>
							   <div class="col-md-3">
							   <a id="paymentHref" class="btn btn-primary btn-sm pull-right"><i class="fa fa-inr"></i> Payment</a>
							   </div>
							   </div>
                            </div>
                        </div>
						
                    </div>
                    <div class="col-md-8 col-sm-6 col-xs-12">
                        <div class="white-box">
                            
							<p id="patientDisplayDescription"></p>
							<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
						
							<div class="panel panel-default">
								<div class="panel-heading" role="tab" id="headingTwo">
									<h4 class="panel-title asd">
										<a class="pa_italic collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
							  Medical History
							</a>
									</h4>
								</div>
								<div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo" style="height: 0px;">
                                    <form class="form-material form-horizontal" role="form" id="medicalHistory" method="post" onsubmit="saveMedicalHistory(); return false;" >
									<div class="panel-body panel_text">
                                        <input type="hidden" name="patientCodeMH" id="patientCodeMH" value="" />
										<div class="row" >
										<div class="col-md-3"><h4>Hypertension</h4></div>
										<div class="col-md-2"><input type="checkbox" class="form-control" id="Hypertensionchk" name="Hypertensionchk"></div>
										<div class="col-md-6"><textarea placeholder="Please Enter Text..." id="Hypertensiontxt" name="Hypertensiontxt"></textarea></div>
										</div>
										<div class="row" >
										<div class="col-md-3"><h4>Diabetic</h4></div>
										<div class="col-md-2"><input type="checkbox" class="form-control" id="Diabeticchk" name="Diabeticchk" ></div>
										<div class="col-md-6"><textarea placeholder="Please Enter Text..." id="Diabetictxt" name="Diabetictxt"></textarea></div>
										</div>
										<div class="row" >
										<div class="col-md-3"><h4>Thyroid</h4></div>
										<div class="col-md-2"><input type="checkbox" class="form-control" id="Thyroidchk" name="Thyroidchk"></div>
										<div class="col-md-6"><textarea placeholder="Please Enter Text..." id="Thyroidtxt" name="Thyroidtxt"></textarea></div>
										</div>
										<div class="row" >
										<div class="col-md-3"><h4>Heart Disease</h4></div>
										<div class="col-md-2"><input type="checkbox" class="form-control" id="Heart_Diseasechk" name="Heart_Diseasechk" ></div>
										<div class="col-md-6"><textarea  placeholder="Please Enter Text..." id="Heart_Diseasetxt" name="Heart_Diseasetxt"  ></textarea></div>
										</div>
                                        <div class="row" >
										<div class="col-md-3"><h4>Other</h4></div>
										<div class="col-md-2"><input type="checkbox" class="form-control" id="Otherchk" name="Otherchk" ></div>
										<div class="col-md-6"><textarea  placeholder="Please Enter Text..."  id="Othertxt" name="Othertxt"></textarea></div>
										</div>

                                     <div class="row">
							        <div style="margin-left:60%;">
							            <button type="submit" class="btn btn-primary  btn-sm"><i class="fa fa-floppy-o"></i> Save</button>
                                     </div>
							        </div>

									</div>
                                   </form>
								</div>

							</div>

			<div class="panel panel-default">
				<div class="panel-heading" role="tab" id="headingFour">
					<h4 class="panel-title asd">
						<a class="pa_italic collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
				Clinical Notes
			</a>
					</h4>
				</div>
				<div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
					<div class="panel-body panel_text">
									

                      <div class="col-lg-12 col-sm-12 col-xs-12">
                        <div class="white-box">
                            <h3 class="box-title">Library Of Clinical Notes</h3>
                            
                            <div class="vtabs">
                                <ul class="nav tabs-vertical ">
                                    <li class="tab nav-item active">
                                        <a onclick="loadGeneralAssSentFiles('GeneralAssesment'); return false;" aria-expanded="false" class="nav-link" data-toggle="tab" href="#GeneralAss"> <span class="visible-xs"><i class="ti-user"></i></span> <span class="hidden-xs">General Assesment</span> </a>
                                    </li>
                                    
                                </ul>
                                <div class="tab-content">

                                    <div id="GeneralAss" class="tab-pane active">

                                         <table class="table table-bordered table-hover" >
										    <thead>
										        <tr>
										        <td>#</td>
										        <td>File Name</td>
                                                <td>Edit</td>
										        </tr>
										    </thead>
										    <tbody>
                                             <tr>
										        <td>1</td>
										        <td><a href="Uploads/ClinicalNotes/Entry Sheet for Clinical Notes/General assmt sheet.docx" >Assesment Sheet.docx</a>
                                               
										        </td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/","GeneralAssesmentSheet.html","GeneralAssesment"); return false;' data-toggle="modal" data-target="#ckeditorModelAss"><i class="ti-pencil-alt"></i></a></td>
										   </tr>

                                            </tbody>
                                            </table>
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-hover" id="sendGeneralAssTable" >
                                                <thead>
                                                    <tr>
                                                        <td>#</td>
                                                        <td>Date</td>
                                                        <td>Sent File Name</td>
                                                        <td>Edit</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                
                                                </tbody>
                                             </table>
                                        </div>

                                     </div>
                                  
                                 
                                    </div>
                                     
                                    
                                </div>
                            </div>
                        </div>
                    </div>


				</div>
			</div>
	
						
							
							<div class="panel panel-default">
								<div class="panel-heading" role="tab" id="headingFive">
									<h4 class="panel-title asd">
										<a class="pa_italic collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
							 Management Plan
							</a>
									</h4>
								</div>
								<div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive" style="height: 0px;">
                                   <form role="form"  method="post" onsubmit="saveManagementPlans(); return false;" >
                                      
									<div class="panel-body panel_text">

                                        			<div class="row row1 clearfix">
											<div class="col-md-12 column">
												<table class="table table-bordered table-hover" id="tableManagementPlan">
													<thead>
														<tr >
															<th class="text-center">
																#
															</th>
															<th class="text-center">
															  Date
															</th>
															<th class="text-center">
																Description
															</th>
															<th>Action</th>
														</tr>
													</thead>
													<tbody>
														
														<tr ></tr>
													</tbody>
												</table>
											</div>
										</div>

										<div class="row row1 clearfix">
											<div class="col-md-12 column">
                                              
												<table class="table table-bordered table-hover" >
													<thead>
														<tr >
															
															<th class="text-center">
															  Date
															</th>
															<th class="text-center">
																Description
															</th>
															
														</tr>
													</thead>
													<tbody>
														<tr >
															<td>
															<input type="text"   placeholder='Date' class="form-control mydatepicker " id="mDate" />
															</td>
															<td>
															<textarea class="form-control" placeholder="Enter Text..." id="mDescription" ></textarea>
															</td>
														</tr>
														
													</tbody>
												</table>
                                              <a onclick="saveManagementPlans(); return false;" class="btn btn-default pull-right">Save</a>
											</div>
										</div>
											
									</div>
                                 </form>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading" role="tab" id="headingSix">
									<h4 class="panel-title asd">
										<a class="pa_italic" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
							  Investagations
							</a>
									</h4>
								</div>
								<div id="collapseSix" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingSix" style="height: 0px;">
									<div class="panel-body panel_text">

                                        		<div class="row clearfix">
											<div class="col-md-12 column">
												<table class="table table-bordered table-hover" id="InvestigationTable">
													<thead>
														<tr >
															<th class="text-center">
																Date
															</th>
															<th class="text-center">
															  Description
															</th>
															<th class="text-center">
																File
															</th>
															 <th>Action</th>
														</tr>
													</thead>
													<tbody>
														
														
													</tbody>
												</table>
											</div>
										</div>

                                       <form role="form" id="investigationForm" method="post" onsubmit="saveInvestigationFile(); return false;" enctype="multipart/form-data">
										<div class="row clearfix">
                                          
											<div class="col-md-12 column">
												<table class="table table-bordered table-hover" >
													<thead>
														<tr >
															
															<th class="text-center">
															  Description
															</th>
															<th class="text-center">
																File
															</th>
                                                           
															
														</tr>
													</thead>
													<tbody>
														<tr >
															<td>
															<input type="text"   placeholder='Desctiption' class="form-control" id="investigationDescription" name="investigationDescription" />
															</td>
															<td style="text-align:center;">
                                                            <label for="investigationFile">
                                                            <i class="fa fa-upload" style="font-size:20px;"></i>
                                                            </label>
															<input type="file" name='investigationFile' id="investigationFile" style="display:none;"  />
															</td>
														</tr>
														<tr ></tr>
													</tbody>
												</table>
											</div>
                                          
										</div>
								     </form>
									</div>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading" role="tab" id="headingSeven">
									<h4 class="panel-title asd">
										<a class="pa_italic collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
							 Excercise Prescription
							</a>
									</h4>
								</div>
								<div id="collapseSeven" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingSeven" style="height: 0px;">
									<div class="panel-body panel_text">
                                   
									
									<div class="vtabs">
                                    <ul class="nav tabs-vertical ">
                                   
                                    <li class="tab nav-item  active">
                                        <a onclick="loadNeckSentFiles('Neck'); return false;" data-toggle="tab" class="nav-link" href="#Neck" aria-expanded="true"> <span class="visible-xs"><i class="ti-home"></i></span> <span class="hidden-xs">Neck</span> </a>
                                    </li>
                                    <li class="tab nav-item">
                                        <a onclick="loadShoulderSentFiles('Shoulder'); return false;" data-toggle="tab" class="nav-link" href="#Shoulder" aria-expanded="false"> <span class="visible-xs"><i class="ti-user"></i></span> <span class="hidden-xs">Shoulder</span> </a>
                                    </li>
                                    <li class="tab nav-item">
                                        <a onclick="loadGluteSentFiles('Glute'); return false;" aria-expanded="false" class="nav-link" data-toggle="tab" href="#Glute"> <span class="visible-xs"><i class="ti-user"></i></span> <span class="hidden-xs">Glute</span> </a>
                                    </li>
                                    
                                     <li class="tab nav-item">
                                        <a onclick="loadCoreSentFiles('Core'); return false;" aria-expanded="false" class="nav-link" data-toggle="tab" href="#Core"> <span class="visible-xs"><i class="ti-user"></i></span> <span class="hidden-xs">Core</span> </a>
                                    </li>
                                     <li class="tab nav-item">
                                        <a onclick="loadKneeSentFiles('Knee'); return false;" aria-expanded="false" class="nav-link" data-toggle="tab" href="#Knee"> <span class="visible-xs"><i class="ti-user"></i></span> <span class="hidden-xs">Knee</span> </a>
                                    </li>
                                    <li class="tab nav-item">
                                        <a onclick="loadAnkleSentFiles('Ankle'); return false;" aria-expanded="false" class="nav-link" data-toggle="tab" href="#Ankle"> <span class="visible-xs"><i class="ti-user"></i></span> <span class="hidden-xs">Ankle</span> </a>
                                    </li>
									<li class="tab nav-item">
                                        <a  aria-expanded="false" class="nav-link" data-toggle="tab" href="#Others"> <span class="visible-xs"><i class="ti-user"></i></span> <span class="hidden-xs">Others</span> </a>
                                    </li>
                                </ul>
                                <div class="tab-content">

                                  
                                   
                                    <div id="Neck" class="tab-pane active">
                                      
                                        <div class="table-responsive">
                                        <table class="table table-bordered table-hover" >
										    <thead>
										        <tr>
										        <td>#</td>
										        <td>File Name</td>
                                                <td>Edit</td>
										        </tr>
										    </thead>
										    <tbody>
										        <tr>
										        <td>1</td>
										        <td><a href="Uploads/ClinicalNotes/1_Neck rehab/Neck 1.docx" >Neck 1.docx</a>
                                               
										        </td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Neck/","Neck1.html","Neck"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
										        <tr>
										        <td>2</td>
										        <td><a href="Uploads/ClinicalNotes/1_Neck rehab/Neck 2.docx">Neck 2.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Neck/","Neck2.html","Neck"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
										        <tr>
										        <td>3</td>
										        <td><a href="Uploads/ClinicalNotes/1_Neck rehab/Neck 3.docx">Neck 3.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Neck/","Neck3.html","Neck"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
                                               
										    </tbody>
										   </table>
                                            
                                         </div>
                                        
                                        <div class="table-responsive">
                                        <table class="table table-bordered table-hover" id="sendNeckTable" >
                                            <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>Date</td>
                                                    <td>Sent File Name</td>
                                                    <td>Edit</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                            </tbody>
                                         </table>
                                        </div>
                                      
                                    </div>

                                    <div id="Shoulder" class="tab-pane">
                                       <table class="table table-bordered table-hover" >
										    <thead>
										        <tr>
										        <td>#</td>
										        <td>File Name</td>
                                                <td>Edit</td>
										        </tr>
										    </thead>
										    <tbody>
										        <tr>
										        <td>1</td>
										        <td><a href="Uploads/ClinicalNotes/2_Shoulder exs/Shoulder 1.docx" >Shoulder 1.docx</a> </td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Shoulder/","Shoulder1.html","Shoulder"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
										        <tr>
										        <td>2</td>
										        <td><a href="Uploads/ClinicalNotes/2_Shoulder exs/Shoulder 2.docx">Shoulder 2.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Shoulder/","Shoulder2.html","Shoulder"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
										        <tr>
										        <td>3</td>
										        <td><a href="Uploads/ClinicalNotes/2_Shoulder exs/Shoulder 3.docx">Shoulder 3.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Shoulder/","Shoulder3.html","Shoulder"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
                                                <tr>
                                                <td>4</td>
                                                <td><a href="Uploads/ClinicalNotes/2_Shoulder exs/Shoulder 4.docx">Shoulder 4.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Shoulder/","Shoulder4.html","Shoulder"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
                                                </tr>

                                               
										    </tbody>
										   </table>

                                        <div class="table-responsive">
                                            <table class="table table-bordered table-hover" id="sendShoulderTable" >
                                                <thead>
                                                    <tr>
                                                        <td>#</td>
                                                        <td>Date</td>
                                                        <td>Sent File Name</td>
                                                        <td>Edit</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                
                                                </tbody>
                                             </table>
                                        </div>

                                    </div>
                                    <div id="Glute" class="tab-pane">
                                        <table class="table table-bordered table-hover" >
										    <thead>
										        <tr>
										        <td>#</td>
										        <td>File Name</td>
                                                <td>Edit</td>
										        </tr>
										    </thead>
										    <tbody>
										        <tr>
										        <td>1</td>
										        <td><a href="Uploads/ClinicalNotes/3_Glute exs/Glute 1.docx" >Glute 1.docx</a>

										        </td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Glute/","Glute1.html","Glute"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
										        <tr>
										        <td>2</td>
										        <td><a href="Uploads/ClinicalNotes/3_Glute exs/Glute 2.docx" >Glute 2.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Glute/","Glute2.html","Glute"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
										        <tr>
										        <td>3</td>
										        <td><a href="Uploads/ClinicalNotes/3_Glute exs/Glute 3.docx" >Glute 3.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Glute/","Glute3.html","Glute"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
                                               
										    </tbody>
										   </table>

                                        <div class="table-responsive">
                                            <table class="table table-bordered table-hover" id="sendGluteTable" >
                                                <thead>
                                                    <tr>
                                                        <td>#</td>
                                                        <td>Date</td>
                                                        <td>Sent File Name</td>
                                                        <td>Edit</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                
                                                </tbody>
                                             </table>
                                        </div>

                                    </div>
                                     <div id="Core" class="tab-pane">
                                         <table class="table table-bordered table-hover" >
										    <thead>
										        <tr>
										        <td>#</td>
										        <td>File Name</td>
                                                <td>Edit</td>
										        </tr>
										    </thead>
										    <tbody>
										        <tr>
										        <td>1</td>
										        <td><a href="Uploads/ClinicalNotes/4_Core Exs/Back Stretches 1.docx" >Back Stretches 1.docx</a>

										        </td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Core/","BackStreches1.html","Core"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
										        <tr>
										        <td>2</td>
										        <td><a href="Uploads/ClinicalNotes/4_Core Exs/Back Stretches 2.docx" >Back Stretches 2.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Core/","BackStreches2.html","Core"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
										        <tr>
										        <td>3</td>
										        <td><a href="Uploads/ClinicalNotes/4_Core Exs/Core Exs 1.docx" >Core Exs 1.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Core/","Core1.html","Core"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
                                                <tr>
										        <td>3</td>
										        <td><a href="Uploads/ClinicalNotes/4_Core Exs/Core Exs 2.docx" >Core Exs 2.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Core/","Core2.html","Core"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
                                                <tr>
										        <td>3</td>
										        <td><a href="Uploads/ClinicalNotes/4_Core Exs/Core Exs 3.docx" >Core Exs 3.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Core/","Core3.html","Core"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
                                                <tr>
										        <td>3</td>
										        <td><a href="Uploads/ClinicalNotes/4_Core Exs/Core Exs 4.docx" >Core Exs 4.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Core/","Core4.html","Core"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
                                               
										    </tbody>
										   </table>


                                         <div class="table-responsive">
                                            <table class="table table-bordered table-hover" id="sendCoreTable" >
                                                <thead>
                                                    <tr>
                                                        <td>#</td>
                                                        <td>Date</td>
                                                        <td>Sent File Name</td>
                                                        <td>Edit</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                
                                                </tbody>
                                             </table>
                                        </div>


                                    </div>
                                     <div id="Knee" class="tab-pane">
                                       <table class="table table-bordered table-hover" >
										    <thead>
										        <tr>
										        <td>#</td>
										        <td>File Name</td>
                                                <td>Edit</td>
										        </tr>
										    </thead>
										    <tbody>
										        <tr>
										        <td>1</td>
										        <td><a href="Uploads/ClinicalNotes/5_Knee rehab/knee 1.docx" >knee 1.docx</a>

										        </td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Knee/","Knee1.html","Knee"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
										        <tr>
										        <td>2</td>
										        <td><a href="Uploads/ClinicalNotes/5_Knee rehab/knee 2.docx" >knee 2.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Knee/","Knee2.html","Knee"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
										        <tr>
										        <td>3</td>
										        <td><a href="Uploads/ClinicalNotes/5_Knee rehab/knee 3.docx" >knee 3.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Knee/","Knee3.html","Knee"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
                                                <tr>
										        <td>3</td>
										        <td><a href="Uploads/ClinicalNotes/5_Knee rehab/knee 4.docx" >knee 4.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Knee/","Knee4.html","Knee"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
                                               
										    </tbody>
										   </table>

                                         <div class="table-responsive">
                                                <table class="table table-bordered table-hover" id="sendKneeTable" >
                                                    <thead>
                                                        <tr>
                                                            <td>#</td>
                                                            <td>Date</td>
                                                            <td>Sent File Name</td>
                                                            <td>Edit</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                
                                                    </tbody>
                                                 </table>
                                        </div>



                                    </div>
                                     <div id="Ankle" class="tab-pane">
                                        <table class="table table-bordered table-hover" >
										    <thead>
										        <tr>
										        <td>#</td>
										        <td>File Name</td>
                                                <td>Edit</td>
										        </tr>
										    </thead>
										    <tbody>
										        <tr>
										        <td>1</td>
										        <td><a href="Uploads/ClinicalNotes/ExercisePre_6_Ankle rehab/Ankle 1.docx" >Ankle 1.docx</a>
										        </td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Ankle/","Ankle1.html","Ankle"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
										        <tr>
										        <td>2</td>
										        <td><a href="Uploads/ClinicalNotes/ExercisePre_6_Ankle rehab/Ankle 2.docx" >Ankle 2.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Ankle/","Ankle2.html","Ankle"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
										        <tr>
										        <td>3</td>
										        <td><a href="Uploads/ClinicalNotes/ExercisePre_6_Ankle rehab/Ankle 3.docx" >Ankle 3.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Ankle/","Ankle3.html","Ankle"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
                                                <tr>
										        <td>3</td>
										        <td><a href="Uploads/ClinicalNotes/ExercisePre_6_Ankle rehab/Ankle 4.docx" >Ankle 4.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Ankle/","Ankle4.html","Ankle"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
                                                <tr>
										        <td>3</td>
										        <td><a href="Uploads/ClinicalNotes/ExercisePre_6_Ankle rehab/Plantar fascia 1.docx" >Plantar fascia 1.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Ankle/","PlantarFasica1.html","Ankle"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
                                                <tr>
										        <td>3</td>
										        <td><a href="Uploads/ClinicalNotes/ExercisePre_6_Ankle rehab/Plantar fascia 2.docx" >Plantar fascia 2.docx</a></td>
                                                <td><a onclick='loadPagetoEdit("C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/Files/Ankle/","PlantarFasica2.html","Ankle"); return false;' data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>
										        </tr>
                                               
										    </tbody>
										   </table>


                                         <div class="table-responsive">
                                                <table class="table table-bordered table-hover" id="sendAnkleTable" >
                                                    <thead>
                                                        <tr>
                                                            <td>#</td>
                                                            <td>Date</td>
                                                            <td>Sent File Name</td>
                                                            <td>Edit</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                
                                                    </tbody>
                                                 </table>
                                        </div>


                                    </div>
									<div id="Others" class="tab-pane">
									
										<form role="form"  method="post" onsubmit="getMailData(); return false;">
									<div class="row ">
									<table class="table table-bordered table-hover">
									<thead>
									<tr>
									<th>#</th>
									<th>Sl.No</th>
									<th>Description</th>
									<th>File</th>
									</tr>
									</thead>
									<tbody>
									<tr>
									<td><input type="checkbox" name="HypertensionExchk" id="HypertensionExchk"></td>
									<td>1</td>
									<td>Hypertension</td>
									<td><a href="Uploads/ExcerciseFiles/add_customer_form.php">Hypertension.pdf</a>
                                      
									</td>
									</tr>
									<tr>
									<td><input type="checkbox" name="HeartDiseaseExchk" id="HeartDiseaseExchk" ></td>
									<td>2</td>
									<td>Heart Disease</td>
									<td><a href="Uploads/ExcerciseFiles/config.php">HeartDisease.pdf</a>
                                        
									</td>
									</tr>
									<tr>
									<td><input type="checkbox" name="ThyroidExchk" id="ThyroidExchk"></td>
									<td>3</td>
									<td>Thyroid</td>
									<td><a href="Uploads/ExcerciseFiles/add_customer_form.php">Thyroid.pdf</a>
                                        
									</td>
									</tr>
									<tr>
									<td><input type="checkbox" name="DiabeticExchk" id="DiabeticExchk"></td>
									<td>4</td>
									<td>Diabetic</td>
									<td><a href="Uploads/ExcerciseFiles/config.php">diabetic.pdf</a>  
									</td>
									</tr>
									</tbody>
									</table>
									</div>
                                       
									<button type="submit" class="btn btn-default pull-right">Send Mail</button>
                                    </form>
									<br>
									<div class="row">
									<h4>Sent file details</h4>
									<table class="table table-bordered table-hover" id="ExcerciseTable">
									<thead>
									<tr>
									<th>Sl.No</th>
									<th>Date</th>
									<th>File</th>
									</tr>
									</thead>
									<tbody>
									
								
									</tbody>
									</table>
									</div>
									</div>
									</div>
                                    
                                </div>
									
								</div>
							</div>
							<br>
							
							
						</div>

                      <div class="panel panel-default">
						<div class="panel-heading" role="tab" id="headingEight">
						<h4 class="panel-title asd">
						<a class="pa_italic collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
							 Outstandings (Balance Amount: <span id="balanceAmount1"></span>)
							</a>
						</h4>
						</div>
					<div id="collapseEight" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingEight" style="height: 0px;">
						<div class="panel-body panel_text">
                       <table class="table table-bordered table-hover" id="outstandingTable">
						<thead>
						<tr>
						<th>Sl.No</th>
                        <th>Date</th>
						<th>Type</th>
                        <th>Invoice Amount</th>
                        <th>Paid Amount</th>
						</tr>
						</thead>
						<tbody>
									
								
						</tbody>
						</table>
                            <br /><br />
                            <button onclick="sendOutstandingMailToPatient();" class="btn btn-primary btn-sm "><i class="fa fa-paper-plane-o"></i> Send Mail</button>
                            <h2 style="color:coral;float:right">Balance Amount: <span id="balanceAmount"></span></h2>
                        </div>
					  </div>
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
          
        </div>
        <!-- /#page-wrapper -->

        <!-- /.modal -->
        <div id="responsive-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog">
               <form onsubmit="saveEditManagement(); return false;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">Edit Management Plan</h4>
                    </div>
                    <div class="modal-body">
                       
                            <input type="hidden" id="editpatientCode" />
                            <input type="hidden" id="editmanagemtId" />
                            <div class="form-group">
                                <label for="recipient-name" class="control-label">Date:</label>
                                <input type="text" class="form-control mydatepicker" id="editmanagementDate">
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="control-label">Description:</label>
                                <textarea class="form-control" id="editManagementDescription"></textarea>
                            </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-danger waves-effect waves-light" >Save changes</button>
                    </div>
                </div>
            </form>
            </div>
        </div>

<div id="responsivemodal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
         <form onsubmit="bookPatientAppointment(); return false;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title">Patien Appointment</h4>
                </div>
                <div class="modal-body">
                   
                        <div class="row">
                       <div class="col-md-12">
                        <div class="form-group">
                            <label for="recipient-name" class="control-label">Patient:</label>
                            <input type="text" class="form-control" id="appointmentPatient" readonly="readonly">
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="form-group">
                            <label for="message-text" class="control-label">From Date:</label>
                             <input type="text" id="fromDate" class="form-control mydatepicker" value="" placeholder="From Date">
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="form-group">
                            <label for="message-text" class="control-label">From Time:</label>
                             <input type="text" class="form-control " id="autoswitch" placeholder="From Time">
                        </div>
                        </div>
                   <%--      <div class="col-md-6">
                        <div class="form-group">
                            <label for="message-text" class="control-label">To Date :</label>
                            <input type="text" id="toDate" class="form-control mydatepicker" value="" placeholder="To Date">
                        </div>
                       </div>
                         <div class="col-md-6">
                        <div class="form-group">
                            <label for="message-text" class="control-label">To Time :</label>
                            <input type="text" class="form-control" id="meridians" placeholder="To Time">
                        </div>
                       </div>--%>
                         <div class="col-md-12">
                          <div class="form-group">
                            <label for="message-text" class="control-label">Message Content :</label>
                            <textarea class="form-control" id="MessageContent" placeholder="Message Content..."></textarea>
                          </div>
                        </div>

                       
                       </div>
                   
                </div>
                <div class="modal-footer">
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <input type="checkbox"  id="smscheck" checked > Send SMS &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                          
                            <button type="button" class="btn btn-default waves-effect " data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-danger waves-effect waves-light ">Book Appointment</button>
                            
                           </div>
                        <div class="col-md-12">
                            <br /><p>*Note - SMS and Email wil be sent to the patient on appointment save, if message content is left black, default message content will be sent.</p>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </form>
        </div>
     
    </div>


    <!-- Ckeditor Model -->

    <div id="ckeditorModel" class="modal fade"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none; ">
        <div class="modal-dialog modal-lg" >
            <div class="modal-content">
              
                <div class="modal-body">
                   <form>
                        <textarea name="editor1" id="editor1" rows="70" cols="80">
                            This is my textarea to be replaced with CKEditor.
                        </textarea>
                       
                    </form>      
              
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                    <button onclick="updateHtmlFile('sendMail'); return false;" class="btn btn-danger waves-effect waves-light">Send Mail</button>
                </div>
            </div>
        </div>
    </div>
   

    <!-- End Ckeditor Model -->

     <!-- Ckeditor Model for assement sheet -->

    <div id="ckeditorModelAss" class="modal fade"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-lg" >
            <div class="modal-content">
                
                <div class="modal-body" style="max-height:95%;overflow-y:auto">

                   <form>
                        <textarea name="editor1" id="editor2" rows="70" cols="80">
                            This is my textarea to be replaced with CKEditor.
                        </textarea>
                       
                    </form>      
              
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                    <button onclick="updateHtmlFile('sendMail'); return false;" class="btn btn-danger waves-effect waves-light">Send Mail</button>
                    <button onclick="updateHtmlFile(''); return false;" class="btn btn-danger waves-effect waves-light">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
   

    <!-- End Ckeditor Model -->

 <script>

    
 
     CKEDITOR.replace('editor1');
     CKEDITOR.replace('editor2');
     CKEDITOR.config.height = 500;
     var opennedFileName = '', opennedFileFolder = '', opennedFilePath = '';   

    function loadPagetoEdit(filepath, fileName,fileFolder)
    {
       
        opennedFileName = fileName;
        opennedFileFolder = fileFolder;
        opennedFilePath = filepath;
        $.ajax({
            type: "POST",
            url: "WebService.asmx/getHtmlFileData",
            data: '{filepath: ' + JSON.stringify(filepath) + ',fileName:' + JSON.stringify(fileName) +'}',
            contentType: "application/json",
            dataType: "json",
            success: function (response) {

              
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!

                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                var today = dd + '/' + mm + '/' + yyyy;
               

                var appendData = '<table align="left" border="1" cellpadding="1" cellspacing="1" style="height:133px; width:257px">'+
                    '<tbody>' +
                '<tr>' +
                    '<td>Patient Name</td>' +
                    '<td colspan="3" rowspan="1">' + $('#patientDisplayName').text() +'</td>' +
                        '</tr>' +
                    '<tr>' +
                    '<td>Age/Sex</td>' +
                    '<td colspan="3" rowspan="1">' + $('#patientDOB').val()+'</td>' +
                        '</tr>' +
                    '<tr>' +
                    '<td>Date of assmt</td>' +
                    '<td colspan="3" rowspan="1">' + today+'</td>' +
                        '</tr>' +
                    '<tr>' +
                    '<td>Medical History</td>' +
                        '<td>&nbsp;</td>' +
                        '<td>&nbsp;</td>' +
                        '<td>&nbsp;</td>' +
                        '</tr>' +
                    '<tr>' +
                    '<td>Contact Email</td>' +
                    '<td colspan="3" rowspan="1">' + $('#patientDisplayEmail').text()+'</td>' +
                        '</tr>' +
                    '<tr>' +
                    '<td>Phone No</td>' +
                    '<td colspan="3" rowspan="1">' + $('#patientDisplayPhone').text()+'</td>' +
                        '</tr>' +
	            '</tbody >'+
                '</table >';
                var resultAfterAppend = appendData.concat(response.d);
                if (fileFolder != 'GeneralAssesment') {
                    CKEDITOR.instances['editor1'].setData(response.d);
                   
                } else {
                    CKEDITOR.instances['editor2'].setData(resultAfterAppend);
                }
            },
            error: function (response) {
                $.toast({
                    heading: 'Error Loading File',
                    text: 'Their was a error loading file, please try again.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
            }

        });

     }

     function loadGeneralHtmlFileData(filepath, fileName, fileFolder, editFile)
     {
         opennedFileName = fileName;
         opennedFileFolder = fileFolder;
         opennedFilePath = filepath;
         $.ajax({
             type: "POST",
             url: "WebService.asmx/getHtmlFileData",
             data: '{filepath: ' + JSON.stringify(filepath) + ',fileName:' + JSON.stringify(fileName) + '}',
             contentType: "application/json",
             dataType: "json",
             success: function (response) {


                 var today = new Date();
                 var dd = today.getDate();
                 var mm = today.getMonth() + 1; //January is 0!

                 var yyyy = today.getFullYear();
                 if (dd < 10) {
                     dd = '0' + dd;
                 }
                 if (mm < 10) {
                     mm = '0' + mm;
                 }
                 var today = dd + '/' + mm + '/' + yyyy;


                 var appendData = '<table align="left" border="1" cellpadding="1" cellspacing="1" style="height:133px; width:257px">' +
                     '<tbody>' +
                     '<tr>' +
                     '<td>Patient Name</td>' +
                     '<td colspan="3" rowspan="1">' + $('#patientDisplayName').text() + '</td>' +
                     '</tr>' +
                     '<tr>' +
                     '<td>Age/Sex</td>' +
                     '<td colspan="3" rowspan="1">' + $('#patientDOB').val() + '</td>' +
                     '</tr>' +
                     '<tr>' +
                     '<td>Date of assmt</td>' +
                     '<td colspan="3" rowspan="1">' + today + '</td>' +
                     '</tr>' +
                     '<tr>' +
                     '<td>Medical History</td>' +
                     '<td>&nbsp;</td>' +
                     '<td>&nbsp;</td>' +
                     '<td>&nbsp;</td>' +
                     '</tr>' +
                     '<tr>' +
                     '<td>Contact Email</td>' +
                     '<td colspan="3" rowspan="1">' + $('#patientDisplayEmail').text() + '</td>' +
                     '</tr>' +
                     '<tr>' +
                     '<td>Phone No</td>' +
                     '<td colspan="3" rowspan="1">' + $('#patientDisplayPhone').text() + '</td>' +
                     '</tr>' +
                     '</tbody >' +
                     '</table >';
                 var resultAfterAppend = appendData.concat(response.d);
                 if (editFile != 'edit') {
                     CKEDITOR.instances['editor2'].setData(resultAfterAppend);

                 } else {
                     
                     CKEDITOR.instances['editor2'].setData(response.d);
                 }
             },
             error: function (response) {
                 $.toast({
                     heading: 'Error Loading File',
                     text: 'Their was a error loading file, please try again.',
                     position: 'bottom-right',
                     loaderBg: '#ff6849',
                     icon: 'error',
                     hideAfter: 3500

                 });
             }

         });
     }

     function updateHtmlFile(saveType)
     {
         if (opennedFileFolder != 'GeneralAssesment') {
             var newcontent = CKEDITOR.instances['editor1'].getData();
             $('#ckeditorModel').modal('hide');
         } else {
             var newcontent = CKEDITOR.instances['editor2'].getData();
             $('#ckeditorModelAss').modal('hide');
         }
         
         
         $.ajax({
             type: "POST",
             url: "WebService.asmx/updateHtmlFileData",
             data: '{fileName: ' + JSON.stringify(opennedFileName) + ',newcontent:' + JSON.stringify(newcontent) + ',patientCode:' + JSON.stringify($('#patientCodeMH').val()) + ',fileFolder:' + JSON.stringify(opennedFileFolder) + ',filePath:' + JSON.stringify(opennedFilePath) + ',saveType:' + JSON.stringify(saveType)+'}',
             contentType: "application/json",
             dataType: "json",
             beforeSend: function () {
                 $('#loaderImage').show();
                 $('#overlay').show();
             },
             complete: function () {
                 $('#loaderImage').hide();
                 $('#overlay').hide();
             },
             success: function (response) {
                 $.toast({
                     heading: 'File Saved Successfully',
                     text: '',
                     position: 'bottom-right',
                     loaderBg: '#ff6849',
                     icon: 'success',
                     hideAfter: 2500,
                     stack: 6
                 });
                
                 loadGeneralAssSentFiles('GeneralAssesment');
                 loadNeckSentFiles('Neck');
                 loadShoulderSentFiles('Shoulder');
                 loadGluteSentFiles('Glute');
                 loadCoreSentFiles('Core');
                 loadKneeSentFiles('Knee');
                 loadAnkleSentFiles('Ankle');
             },
             error: function (response) {
                 $.toast({
                     heading: 'Error Saving File',
                     text: 'Their was a error saving file, please try again.',
                     position: 'bottom-right',
                     loaderBg: '#ff6849',
                     icon: 'error',
                     hideAfter: 3500

                 });
             }

         });
     }

     function loadGeneralAssSentFiles(fileFolder) {
         var actionType = "edit";
         $("#sendGeneralAssTable tbody").empty();
         $.ajax({
             type: "POST",
             url: "WebService.asmx/getSentFilesList",
             data: '{fileFolder: ' + JSON.stringify(fileFolder) + ',patientCode:' + JSON.stringify($('#patientCodeMH').val()) + '}',
             contentType: "application/json",
             dataType: "json",
             success: function (response) {
                 var i = 0;
                 $.each(response.d, function (key, value) {
                     $('#sendGeneralAssTable tbody').append('<tr>' +
                         '<td>' + ++i + '</td>' +
                         '<td>' + value.Date + '</td>' +
                         '<td>' + value.FileName + '</td>' +
                         '<td><a onclick="loadGeneralHtmlFileData(\'' + value.FilePath + '\',\'' + value.FileName + '\',\'' + value.FileFolder + '\',\'' + actionType + '\'); return false;" data-toggle="modal" data-target="#ckeditorModelAss"><i class="ti-pencil-alt"></i></a></td>' +
                         '</tr> ');
                 });
             },
             error: function (response) {
                 $.toast({
                     heading: 'Error Loaing Sent Files',
                     text: 'Their was a error loading sent files, please try again.',
                     position: 'bottom-right',
                     loaderBg: '#ff6849',
                     icon: 'error',
                     hideAfter: 3500

                 });
             }

         });
     }

     function loadNeckSentFiles(fileFolder)
     {
         $("#sendNeckTable tbody").empty();
         $.ajax({
             type: "POST",
             url: "WebService.asmx/getSentFilesList",
             data: '{fileFolder: ' + JSON.stringify(fileFolder) + ',patientCode:' + JSON.stringify($('#patientCodeMH').val()) +'}',
             contentType: "application/json",
             dataType: "json",
             success: function (response) {
                 var i = 0;
                 $.each(response.d, function (key, value) {
                     $('#sendNeckTable tbody').append('<tr>' +
                         '<td>' + ++i + '</td>' +
                         '<td>' + value.Date + '</td>' +
                         '<td>' + value.FileName + '</td>' +
                         '<td><a onclick="loadPagetoEdit(\'' + value.FilePath + '\',\'' + value.FileName + '\',\'' + value.FileFolder + '\'); return false;" data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>' +
                         '</tr> ');
                 });
             },
             error: function (response) {
                 $.toast({
                     heading: 'Error Loaing Sent Files',
                     text: 'Their was a error loading sent files, please try again.',
                     position: 'bottom-right',
                     loaderBg: '#ff6849',
                     icon: 'error',
                     hideAfter: 3500

                 });
             }

         });
     }


     function loadShoulderSentFiles(fileFolder) {
         $("#sendShoulderTable tbody").empty();
         $.ajax({
             type: "POST",
             url: "WebService.asmx/getSentFilesList",
             data: '{fileFolder: ' + JSON.stringify(fileFolder) + ',patientCode:' + JSON.stringify($('#patientCodeMH').val()) + '}',
             contentType: "application/json",
             dataType: "json",
             success: function (response) {
                 var i = 0;
                 $.each(response.d, function (key, value) {
                     $('#sendShoulderTable tbody').append('<tr>' +
                         '<td>' + ++i + '</td>' +
                         '<td>' + value.Date + '</td>' +
                         '<td>' + value.FileName + '</td>' +
                         '<td><a onclick="loadPagetoEdit(\'' + value.FilePath + '\',\'' + value.FileName + '\',\'' + value.FileFolder + '\'); return false;" data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>' +
                         '</tr> ');
                 });
             },
             error: function (response) {
                 $.toast({
                     heading: 'Error Loading Sent Files',
                     text: 'Their was a error loading sent files, please try again.',
                     position: 'bottom-right',
                     loaderBg: '#ff6849',
                     icon: 'error',
                     hideAfter: 3500

                 });
             }

         });
     }

     function loadGluteSentFiles(fileFolder) {
         $("#sendGluteTable tbody").empty();
         $.ajax({
             type: "POST",
             url: "WebService.asmx/getSentFilesList",
             data: '{fileFolder: ' + JSON.stringify(fileFolder) + ',patientCode:' + JSON.stringify($('#patientCodeMH').val()) + '}',
             contentType: "application/json",
             dataType: "json",
             success: function (response) {
                 var i = 0;
                 $.each(response.d, function (key, value) {
                     $('#sendGluteTable tbody').append('<tr>' +
                         '<td>' + ++i + '</td>' +
                         '<td>' + value.Date + '</td>' +
                         '<td>' + value.FileName + '</td>' +
                         '<td><a onclick="loadPagetoEdit(\'' + value.FilePath + '\',\'' + value.FileName + '\',\'' + value.FileFolder + '\'); return false;" data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>' +
                         '</tr> ');
                 });
             },
             error: function (response) {
                 $.toast({
                     heading: 'Error Loading Sent Files',
                     text: 'Their was a error loading sent files, please try again.',
                     position: 'bottom-right',
                     loaderBg: '#ff6849',
                     icon: 'error',
                     hideAfter: 3500

                 });
             }

         });
     }

     function loadCoreSentFiles(fileFolder) {
         $("#sendCoreTable tbody").empty();
         $.ajax({
             type: "POST",
             url: "WebService.asmx/getSentFilesList",
             data: '{fileFolder: ' + JSON.stringify(fileFolder) + ',patientCode:' + JSON.stringify($('#patientCodeMH').val()) + '}',
             contentType: "application/json",
             dataType: "json",
             success: function (response) {
                 var i = 0;
                 $.each(response.d, function (key, value) {
                     $('#sendCoreTable tbody').append('<tr>' +
                         '<td>' + ++i + '</td>' +
                         '<td>' + value.Date + '</td>' +
                         '<td>' + value.FileName + '</td>' +
                         '<td><a onclick="loadPagetoEdit(\'' + value.FilePath + '\',\'' + value.FileName + '\',\'' + value.FileFolder + '\'); return false;" data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>' +
                         '</tr> ');
                 });
             },
             error: function (response) {
                 $.toast({
                     heading: 'Error Loading Sent Files',
                     text: 'Their was a error loading sent files, please try again.',
                     position: 'bottom-right',
                     loaderBg: '#ff6849',
                     icon: 'error',
                     hideAfter: 3500

                 });
             }

         });
     }

     function loadKneeSentFiles(fileFolder) {
         $("#sendKneeTable tbody").empty();
         $.ajax({
             type: "POST",
             url: "WebService.asmx/getSentFilesList",
             data: '{fileFolder: ' + JSON.stringify(fileFolder) + ',patientCode:' + JSON.stringify($('#patientCodeMH').val()) + '}',
             contentType: "application/json",
             dataType: "json",
             success: function (response) {
                 var i = 0;
                 $.each(response.d, function (key, value) {
                     $('#sendKneeTable tbody').append('<tr>' +
                         '<td>' + ++i + '</td>' +
                         '<td>' + value.Date + '</td>' +
                         '<td>' + value.FileName + '</td>' +
                         '<td><a onclick="loadPagetoEdit(\'' + value.FilePath + '\',\'' + value.FileName + '\',\'' + value.FileFolder + '\'); return false;" data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>' +
                         '</tr> ');
                 });
             },
             error: function (response) {
                 $.toast({
                     heading: 'Error Loading Sent Files',
                     text: 'Their was a error loading sent files, please try again.',
                     position: 'bottom-right',
                     loaderBg: '#ff6849',
                     icon: 'error',
                     hideAfter: 3500

                 });
             }

         });
     }


     function loadAnkleSentFiles(fileFolder) {
         $("#sendAnkleTable tbody").empty();
         $.ajax({
             type: "POST",
             url: "WebService.asmx/getSentFilesList",
             data: '{fileFolder: ' + JSON.stringify(fileFolder) + ',patientCode:' + JSON.stringify($('#patientCodeMH').val()) + '}',
             contentType: "application/json",
             dataType: "json",
             success: function (response) {
                 var i = 0;
                 $.each(response.d, function (key, value) {
                     $('#sendAnkleTable tbody').append('<tr>' +
                         '<td>' + ++i + '</td>' +
                         '<td>' + value.Date + '</td>' +
                         '<td>' + value.FileName + '</td>' +
                         '<td><a onclick="loadPagetoEdit(\'' + value.FilePath + '\',\'' + value.FileName + '\',\'' + value.FileFolder + '\'); return false;" data-toggle="modal" data-target="#ckeditorModel"><i class="ti-pencil-alt"></i></a></td>' +
                         '</tr> ');
                 });
             },
             error: function (response) {
                 $.toast({
                     heading: 'Error Loading Sent Files',
                     text: 'Their was a error loading sent files, please try again.',
                     position: 'bottom-right',
                     loaderBg: '#ff6849',
                     icon: 'error',
                     hideAfter: 3500

                 });
             }

         });
     }

    
</script>

   
</asp:Content>
