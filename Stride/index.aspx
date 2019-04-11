<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="Stride.index" %>

<!DOCTYPE html>  
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<link rel="icon" type="image/png" sizes="16x16" href="plugins/images/favicon.png">
<title>STRIDE PHYSIO</title>
<!-- Bootstrap Core CSS -->
<link href="bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="plugins/bower_components/bootstrap-extension/css/bootstrap-extension.css" rel="stylesheet">
<link href="plugins/bower_components/toast-master/css/jquery.toast.css" rel="stylesheet">
<!-- animation CSS -->
<link href="css/animate.css" rel="stylesheet">
<!-- Custom CSS -->
<link href="css/style.css" rel="stylesheet">
<!-- color CSS -->
 <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<link href="css/colors/megna.css" id="theme"  rel="stylesheet">
<script src="Scripts/Login.js"></script>
<script src="Scripts/json-serialization.js"></script>
<script src="Scripts/session.js"></script>
 <script src="Scripts/ForgotPassword.js"></script>

<script>
    $(document).ready(function () {

        if ( Session.get("Session_User") !== undefined) {

            window.location = 'dashboard.aspx';
            return false;
        }
    });
</script>
<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>
<body>
<!-- Preloader -->
<div class="preloader">
  <div class="cssload-speeding-wheel"></div>
</div>
<section id="wrapper" class="login-register">
  <div class="login-box login-sidebar">
    <div class="white-box">
      <form class="form-horizontal form-material" id="loginform"  onsubmit="Login(); return false;" >
       <a class="logo" href="dashboard.html"><img src="plugins/images/Logo.jpg" alt="home" /></a> 
        
        <div class="form-group m-t-40">
          <div class="col-xs-12">
            <input class="form-control" type="email"  placeholder="Username" id="username" name="username" required="required">
          </div>
        </div>
        <div class="form-group">
          <div class="col-xs-12">
            <input class="form-control" type="password" placeholder="Password" id="password" name="password" required="required">
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-12">
            <div class="checkbox checkbox-primary pull-left p-t-0">
              <input id="checkbox-signup" type="checkbox">
              
            </div>
            <a href="javascript:void(0)" id="to-recover" class="text-dark pull-right"><i class="fa fa-lock m-r-5"></i> Forgot pwd?</a> </div>
        </div>
        <div class="form-group text-center m-t-20">
          <div class="col-xs-12">
            <button type="submit" class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" >Log In</button>
          </div>
        </div>
		
        
      </form>
      <form class="form-horizontal" id="recoverform" onSubmit="checkUserPhone(); return false;">
        <div class="form-group ">
          <div class="col-xs-12">
            <h3>Recover Password</h3>
            <p class="text-muted">Enter your phone and OTP will be sent on your phone! </p>
          </div>
        </div>
        <div class="form-group ">
          <div class="col-xs-12">
            <input class="form-control" type="text" name="doctorPhone" id="doctorPhone" required="required" placeholder="Phone Number" maxlength="10">
          </div>
        </div>
        <div class="form-group text-center m-t-20">
          <div class="col-xs-12">
            <button class="btn btn-primary btn-lg btn-block text-uppercase waves-effect waves-light" type="submit">Reset</button>
          </div>
        </div>
      </form>

        <form class="form-horizontal" id="otpForm" onSubmit="checkOtp(); return false;" style="display:none">
        <div class="form-group ">
          <div class="col-xs-12">
            <h3>Enter OTP</h3>
            <p class="text-muted">Please enter 5 digit OTP ! </p>
          </div>
        </div>
        <div class="form-group ">
          <div class="col-xs-12">
            <input class="form-control" type="text" name="otp" id="otp" required="required" placeholder="Enter OTP" maxlength="5">
          </div>
        </div>
        <div class="form-group text-center m-t-20">
          <div class="col-xs-12">
            <button class="btn btn-primary btn-lg btn-block text-uppercase waves-effect waves-light" type="submit">Submit</button>
          </div>
        </div>
      </form>

      <form class="form-horizontal" id="changePasswordForm" onSubmit="changePassword(); return false;" style="display:none">
        <div class="form-group ">
          <div class="col-xs-12">
              <input type="hidden" id="doctorCode" value="" />
            <h3>New Password</h3>
            <p class="text-muted">Hello! <span id="doctorDisplayName"></span> </p>
          </div>
        </div>
        <div class="form-group ">
          <div class="col-xs-12">
            <input class="form-control" type="text" name="Newpassword" id="Newpassword" required="required" placeholder="Enter New Password" >
          </div>
        </div>
        <div class="form-group text-center m-t-20">
          <div class="col-xs-12">
            <button class="btn btn-primary btn-lg btn-block text-uppercase waves-effect waves-light" type="submit">Save</button>
          </div>
        </div>
      </form>

    </div>
  </div>
</section>
<!-- jQuery -->
<script src="plugins/bower_components/jquery/dist/jquery.min.js"></script>
<!-- Bootstrap Core JavaScript -->
<script src="bootstrap/dist/js/tether.min.js"></script>
<script src="bootstrap/dist/js/bootstrap.min.js"></script>
<script src="plugins/bower_components/bootstrap-extension/js/bootstrap-extension.min.js"></script>
<!-- Menu Plugin JavaScript -->
<script src="plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.js"></script>
 <script src="plugins/bower_components/toast-master/js/jquery.toast.js"></script>
 <script src="js/toastr.js"></script>
<!--slimscroll JavaScript -->
<script src="js/jquery.slimscroll.js"></script>
<!--Wave Effects -->
<script src="js/waves.js"></script>
<!-- Custom Theme JavaScript -->
<script src="js/custom.min.js"></script>
<!--Style Switcher -->
<script src="plugins/bower_components/styleswitcher/jQuery.style.switcher.js"></script>
</body>
</html>

