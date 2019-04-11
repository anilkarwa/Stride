$(document).ready(function () {
    loadAllDoctors();
   

    var urlParams = getParameter('doctorCode');
    if (urlParams != false) {
      
        var urldata = urlParams;
        getDoctorDetailById(urldata);

    }
    urlParams = getParameter('editdoctorCode');
    if (urlParams != false) {
        
        loadEditDoctorDetails(urlParams);
    }

    function previewImage1(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            if (!input.files[0].type.match('image.*')) {
                $.toast({
                    heading: 'Select Only Image',
                    text: 'Please select image file only to upload.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
                $('#doctorAchmntUpload3').val('');
                $('#editdoctorProfileImg').val('');
                return false;
            }


            if (input.files[0].size > 3000000) {
                $.toast({
                    heading: 'Image size should be less than 3 MB',
                    text: 'Please select image file with size less than 3 MB.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
                $('#doctorAchmntUpload3').val('');
                $('#editdoctorProfileImg').val('');
                return false;
            }
            reader.onload = function (e) {
                $('#displaydoctorProfile').attr('src', e.target.result);

            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#doctorAchmntUpload3").change(function () {

        previewImage1(this);
    });
    $("#editdoctorProfileImg").change(function () {

        previewImage1(this);
    });


    function previewImage2(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            if (!input.files[0].type.match('image.*')) {
                $.toast({
                    heading: 'Select Only Image',
                    text: 'Please select image file only to upload.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
                $('#doctorAchmntUpload1').val('');
                $('#editdoctorAchmntUpload1').val('');
                return false;
            }


            if (input.files[0].size > 3000000) {
                $.toast({
                    heading: 'Image size should be less than 3 MB',
                    text: 'Please select image file with size less than 3 MB.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
                $('#doctorAchmntUpload1').val('');
                $('#editdoctorAchmntUpload1').val('');
                return false;
            }
            reader.onload = function (e) {
                $('#displaydoctorAchmntUpload1').attr('src', e.target.result);

            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#doctorAchmntUpload1").change(function () {

        previewImage2(this);
    });
    $("#editdoctorAchmntUpload1").change(function () {

        previewImage2(this);
    });



    function previewImage3(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            if (!input.files[0].type.match('image.*')) {
                $.toast({
                    heading: 'Select Only Image',
                    text: 'Please select image file only to upload.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
                
                $('#doctorAchmntUpload2').val('');
                $('#editdoctorAchmntUpload2').val('');
                return false;
            }


            if (input.files[0].size > 3000000) {
                $.toast({
                    heading: 'Image size should be less than 3 MB',
                    text: 'Please select image file with size less than 3 MB.',
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500

                });
                $('#doctorAchmntUpload2').val('');
                $('#editdoctorAchmntUpload2').val('');
                return false;
            }
            reader.onload = function (e) {
                $('#displaydoctorAchmntUpload2').attr('src', e.target.result);

            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#doctorAchmntUpload2").change(function () {

        previewImage3(this);
    });
    $("#editdoctorAchmntUpload2").change(function () {

        previewImage3(this);
    });


    function getParameter(theParameter) {
        var params = window.location.search.substr(1).split('&');

        for (var i = 0; i < params.length; i++) {
            var p = params[i].split('=');
            if (p[0] == theParameter) {
                return decodeURIComponent(p[1]);
            }
        }
        return false;
    }


});

function UserRights() {
    var settingobj = {};
    settingobj.userCode = Session.get("DoctorCode");

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getAllUserSettings",
        data: '{setting: ' + JSON.stringify(settingobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            if (!response.d[0].physoView)
            {
               $('#allPhysoView').hide();
            }

            if (!response.d[0].physoAdd)
            {
                $('#addPhyso').hide();
            }
            
            if (!response.d[0].physoEdit) {
                $('.editPhyso').hide();
            }
            if (!response.d[0].physoDelete) {
                $('.deletePhyso').hide();
            }
            

        },
        error: function (response) {
            alert('error');
        }

    });
}

function saveNewDoctor()
{
    var doctorCode = $('#doctorCode').val();
    var doctorName = $('#doctorName').val();
    var doctorDOB = dateformateChange($('#doctorDOB').val());
    var doctorGenderdata = document.getElementById('doctorGender');
    var doctorGender = doctorGenderdata.options[doctorGenderdata.selectedIndex].value;
    var doctorDescription = $('#doctorDescription').val();
    var doctorAddress = $('#doctorAddress').val();
    var doctorEmail = $('#doctorEmail').val();
    var doctorPhone = $('#doctorPhone').val();
    if (doctorPhone.length > 10 || doctorPhone.length < 10)
    {
        $.toast({
            heading: 'Mobile No Should be 10 digits',
            text: 'Please enter 10 digit mobile no.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    var doctorAadhar = $('#doctorAadhar').val();
    if (doctorAadhar.length > 12 || doctorAadhar.length < 12)
    {
        $.toast({
            heading: 'Aadhar No Should be 12 digits',
            text: 'Please enter 12 digit aadhar no.',
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500

        });
        return false;
    }
    var doctorSpeciality = $('#doctorSpeciality').val();
    var doctorPassword = $('#doctorPassword').val();
    var doctorAchmntOption1 = $('#doctorAchmntOption1').val();
    var doctorAchmntOption2 = $('#doctorAchmntOption2').val();
    var doctorAchmntOption3 = $('#doctorAchmntOption3').val();
    var doctorAchmntOption4 = $('#doctorAchmntOption4').val();



    var newDoctorData = new FormData();

    newDoctorData.append('doctorCode', doctorCode);
    newDoctorData.append('doctorName', doctorName);
    newDoctorData.append('doctorDOB', doctorDOB);
    newDoctorData.append('doctorGender', doctorGender);
    newDoctorData.append('doctorAddress', doctorAddress);
    newDoctorData.append('doctorEmail', doctorEmail);
    newDoctorData.append('doctorPhone', doctorPhone);
    newDoctorData.append('doctorDescription', doctorDescription);
    newDoctorData.append('doctorAadhar', doctorAadhar);
    newDoctorData.append('doctorSpeciality', doctorSpeciality);
    newDoctorData.append('doctorPassword', doctorPassword);
    newDoctorData.append('doctorAchmntOption1', doctorAchmntOption1);
    newDoctorData.append('doctorAchmntOption2', doctorAchmntOption2);
    newDoctorData.append('doctorAchmntOption3', doctorAchmntOption3);
    newDoctorData.append('doctorAchmntOption4', doctorAchmntOption4);
    newDoctorData.append('doctorProfileImg', $('#doctorAchmntUpload3')[0].files[0]);
    newDoctorData.append('doctorAchmntUpload1', $('#doctorAchmntUpload1')[0].files[0]);
    newDoctorData.append('doctorAchmntUpload2', $('#doctorAchmntUpload2')[0].files[0]);

    $.ajax({

        type: "POST",
        url: "WebService.asmx/addNewDoctor",
        data: newDoctorData,
        contentType: false,
        processData: false,
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
                heading: 'Physotherapist Saved Successfully',
                text: 'New Physotherapist saved successfully.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
            
            cleardata();
            setTimeout(function () {
                location.reload();
            }, 2000);
        },
        error: function (response) {
            $.toast({
                heading: 'Error saving physotherapist',
                text: 'Their was error saving the physotherapist details.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });

}



function editDoctorDetails()
{
    var doctorCode = $('#editdoctorCode').val();
    var doctorName = $('#editdoctorName').val();
    var doctorDOB = dateformateChange($('#editdoctorDOB').val());
    var doctorGenderdata = document.getElementById('editdoctorGender');
    var doctorGender = doctorGenderdata.options[doctorGenderdata.selectedIndex].value;
    var doctorDescription = $('#editdoctorDescription').val();
    var doctorAddress = $('#editdoctorAddress').val();
    var doctorEmail = $('#editdoctorEmail').val();
    var doctorPhone = $('#editdoctorPhone').val();
    var doctorAadhar = $('#editdoctorAadhar').val();
    var doctorSpeciality = $('#editdoctorSpeciality').val();
    var doctorPassword = $('#editdoctorPassword').val();
    var doctorAchmntOption1 = $('#editdoctorAchmntOption1').val();
    var doctorAchmntOption2 = $('#editdoctorAchmntOption2').val();
    var doctorAchmntOption3 = $('#editdoctorAchmntOption3').val();
    var doctorAchmntOption4 = $('#editdoctorAchmntOption4').val();



    var newDoctorData = new FormData();

    newDoctorData.append('doctorCode', doctorCode);
    newDoctorData.append('doctorName', doctorName);
    newDoctorData.append('doctorDOB', doctorDOB);
    newDoctorData.append('doctorGender', doctorGender);
    newDoctorData.append('doctorAddress', doctorAddress);
    newDoctorData.append('doctorEmail', doctorEmail);
    newDoctorData.append('doctorPhone', doctorPhone);
    newDoctorData.append('doctorDescription', doctorDescription);
    newDoctorData.append('doctorAadhar', doctorAadhar);
    newDoctorData.append('doctorSpeciality', doctorSpeciality);
    newDoctorData.append('doctorPassword', doctorPassword);
    newDoctorData.append('doctorAchmntOption1', doctorAchmntOption1);
    newDoctorData.append('doctorAchmntOption2', doctorAchmntOption2);
    newDoctorData.append('doctorAchmntOption3', doctorAchmntOption3);
    newDoctorData.append('doctorAchmntOption4', doctorAchmntOption4);
    newDoctorData.append('doctorProfileImg', $('#editdoctorProfileImg')[0].files[0]);
    newDoctorData.append('doctorAchmntUpload1', $('#editdoctorAchmntUpload1')[0].files[0]);
    newDoctorData.append('doctorAchmntUpload2', $('#editdoctorAchmntUpload2')[0].files[0]);


    $.ajax({

        type: "POST",
        url: "WebService.asmx/editDoctorDetails",
        data: newDoctorData,
        contentType: false,
        processData: false,
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
                heading: 'Doctor Updated Successfully',
                text: 'Update of the doctor details completed successfully.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
            cleardata();

        },
        error: function (response) {
            $.toast({
                heading: 'Error updating doctor',
                text: 'Their was error updating the doctor details.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }
    });
}

function loadEditDoctorDetails(dcode)
{
    var doctorobj = {};
    doctorobj.doctorCode = dcode;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getDoctorById",
        data: '{doctor: ' + JSON.stringify(doctorobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            $('#editdoctorCode').val(response.d.doctorCode);
            $('#editdoctorName').val(response.d.doctorName);
            $('#editdoctorDOB').val(response.d.DOB);
            $('#editdoctorGender').val(response.d.doctorGender);
            $('#editdoctorDescription').val(response.d.doctorDescription);
            $('#editdoctorAddress').val(response.d.doctorAddress);
            $('#editdoctorEmail').val(response.d.doctorEmail);
            $('#editdoctorPhone').val(response.d.doctorPhone);
            $('#editdoctorAadhar').val(response.d.doctorAadhar);
            $('#editdoctorSpeciality').val(response.d.doctorSpeciality);
            $('#editdoctorAchmntOption1').val(response.d.doctorAchmntOption1);
            $('#editdoctorAchmntOption2').val(response.d.doctorAchmntOption2);
            $('#editdoctorAchmntOption3').val(response.d.doctorAchmntOption3);
            $('#editdoctorAchmntOption4').val(response.d.doctorAchmntOption4);

            var src1 = "Uploads/Images/" + response.d.doctorProfileImage;
            $('#displaydoctorProfile').attr("src", src1);
            var src2 = "Uploads/Images/" + response.d.doctorAchmntUpload1;
            $('#displaydoctorAchmntUpload1').attr("src", src2);
            var src3 = "Uploads/Images/" + response.d.doctorAchmntUpload2;
            $('#displaydoctorAchmntUpload2').attr("src", src3);

        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Details',
                text: 'Their was error while loading doctor details.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function cleardata()
{
   $('#doctorCode').val('');
   $('#doctorName').val('');
   $('#doctorDOB').val('');
   $('#doctorDescription').val('');
   $('#doctorAddress').val('');
   $('#doctorEmail').val('');
   $('#doctorPhone').val('');
   $('#doctorAadhar').val('');
   $('#doctorSpeciality').val('');
   $('#doctorPassword').val('');
   $('#doctorAchmntUpload3').val('');
   $('#doctorAchmntOption1').val('');
   $('#doctorAchmntOption2').val('');
   $('#doctorAchmntOption3').val('');
   $('#doctorAchmntOption4').val('');
   $('#doctorAchmntUpload1').val('');
   $('#doctorAchmntUpload2').val('');


   $('#editdoctorCode').val('');
   $('#editdoctorName').val('');
   $('#editdoctorDOB').val('');
   $('#editdoctorDescription').val('');
   $('#editdoctorAddress').val('');
   $('#editdoctorEmail').val('');
   $('#editdoctorPhone').val('');
   $('#editdoctorAadhar').val('');
   $('#editdoctorSpeciality').val('');
   $('#editdoctorPassword').val('');
   $('#editdoctorAchmntUpload3').val('');
   $('#editdoctorAchmntOption1').val('');
   $('#editdoctorAchmntOption2').val('');
   $('#editdoctorAchmntOption3').val('');
   $('#editdoctorAchmntOption4').val('');
   $('#editdoctorAchmntUpload1').val('');
   $('#editdoctorAchmntUpload2').val('');


}


function loadAllDoctors() {
    var cards = $('#doctorCards');
    cards.empty();
    $.ajax({
        type: "POST",
        url: "WebService.asmx/GetAllDoctorDetails",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            $.each(response.d, function (key, value) {
                if (value.doctorProfileImage === "") {
                    cards.append('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12"> ' +
                        '<div class="white-box">' +
                        ' <div class="el-card-item">' +
                        ' <div class="el-card-avatar el-overlay-1">  <img src="plugins/images/users/placeholder-user.png" style="width:100px;height:100px;" />' +
                        '<div class="el-overlay">' +
                        ' <ul class="el-info">' +
                        '<li><a class="btn default btn-outline" href="doctor-profile.aspx?doctorCode=' + value.doctorCode + '"><i class="fa fa-eye"></i></a></li>' +
                        ' </ul>' +
                        ' </div>' +
                        '</div>' +
                        ' <div class="el-card-content">' +
                        ' <h3 class="box-title">' + value.doctorName + '</h3> <small>' + value.doctorSpeciality + '</small><br><small>' + value.doctorPhone + '</small><br><br>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-md-6 col-sm-6" >' +
                        '<a  class="deletePhyso" onclick="deleteDoctor(this.id)" id="' + value.doctorCode + '" style="color:#fff;"><div class="btn btn-danger btn-sm pull-right">Delete</div></a>&nbsp;&nbsp;' +
                        '</div>' +
                        '<div class="col-md-6 col-sm-6"> ' +
                        '<a class="editPhyso" href="edit-doctor.aspx?editdoctorCode=' + value.doctorCode + '" style="color:#fff;"><div class="btn btn-info btn-sm pull-right">Edit</div></a>' +
                        '</div>' +
                        '</div>' +
                        ' </div>' +
                        '</div>' +
                        ' </div >');
                    UserRights();
                }
                else {
                    cards.append('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12"> ' +
                        '<div class="white-box">' +
                        ' <div class="el-card-item">' +
                        ' <div class="el-card-avatar el-overlay-1">  <img src="Uploads/Images/' + value.doctorProfileImage+'" style="width:100px;height:100px" />' +
                        '<div class="el-overlay">' +
                        ' <ul class="el-info">' +
                        '<li><a class="btn default btn-outline" href="doctor-profile.aspx?doctorCode=' + value.doctorCode + '"><i class="fa fa-eye"></i></a></li>' +
                        ' </ul>' +
                        ' </div>' +
                        '</div>' +
                        ' <div class="el-card-content">' +
                        ' <h3 class="box-title">' + value.doctorName + '</h3> <small>' + value.doctorSpeciality + '</small><br><small>' + value.doctorPhone + '</small><br><br>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-md-6 col-sm-6" >' +
                        '<a  class="deletePhyso" onclick="deleteDoctor(this.id)" id="' + value.doctorCode + '" style="color:#fff;"><div class="btn btn-danger btn-sm pull-right">Delete</div></a>&nbsp;&nbsp;' +
                        '</div>' +
                        '<div class="col-md-6 col-sm-6"> ' +
                        '<a class="editPhyso" href="edit-doctor.aspx?editdoctorCode=' + value.doctorCode + '" style="color:#fff;"><div class="btn btn-info btn-sm pull-right">Edit</div></a>' +
                        '</div>' +
                        '</div>' +
                        ' </div>' +
                        '</div>' +
                        ' </div >');
                    UserRights();
                }

            });

        },
        error: function (response) {
            $.toast({
                heading: 'Error Laoding Details',
                text: 'Their was error while loading all doctors details.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });

}

function loadDoctorById(dcode)
{
    var cards = $('#doctorCards');

    var doctorobj = {};
    doctorobj.doctorCode = dcode;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getDoctorById",
        data: '{doctor: ' + JSON.stringify(doctorobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            if (response.d.doctorProfileImage === "") {
                cards.empty().append('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12"> ' +
                    '<div class="white-box">' +
                    ' <div class="el-card-item">' +
                    ' <div class="el-card-avatar el-overlay-1">  <img src="plugins/images/users/placeholder-user.png" style="width:100px;height:100px;" />' +
                    '<div class="el-overlay">' +
                    ' <ul class="el-info">' +
                    '<li><a class="btn default btn-outline" href="doctor-profile.aspx?doctorCode=' + response.d.doctorCode + '"><i class="fa fa-eye"></i></a></li>' +
                    ' </ul>' +
                    ' </div>' +
                    '</div>' +
                    ' <div class="el-card-content">' +
                    ' <h3 class="box-title">' + response.d.doctorName + '</h3> <small>' + response.d.doctorSpeciality + '</small><br><small>' + response.d.doctorPhone + '</small><br><br>' +
                    '</div>' +
                    '<div class="row">' +
                    '<div class="col-md-6 col-sm-6" >' +
                    '<a  class="deletePhyso" onclick="deleteDoctor(this.id)" id="' + response.d.doctorCode + '" style="color:#fff;"><div class="btn btn-danger btn-sm pull-right">Delete</div></a>&nbsp;&nbsp;' +
                    '</div>' +
                    '<div class="col-md-6 col-sm-6"> ' +
                    '<a class="editPhyso" href="edit-doctor.aspx?editdoctorCode=' + response.d.doctorCode + '" style="color:#fff;"><div class="btn btn-info btn-sm pull-right">Edit</div></a>' +
                    '</div>' +
                    '</div>' +
                    ' </div>' +
                    '</div>' +
                    ' </div >');
                UserRights();
            }
            else
            {
                cards.empty().append('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12"> ' +
                    '<div class="white-box">' +
                    ' <div class="el-card-item">' +
                    ' <div class="el-card-avatar el-overlay-1">  <img src="Uploads/Images/' + response.d.doctorProfileImage + '" style="width:100px;height:100px;" />' +
                    '<div class="el-overlay">' +
                    ' <ul class="el-info">' +
                    '<li><a class="btn default btn-outline" href="doctor-profile.aspx?doctorCode=' + response.d.doctorCode + '"><i class="fa fa-eye"></i></a></li>' +
                    ' </ul>' +
                    ' </div>' +
                    '</div>' +
                    ' <div class="el-card-content">' +
                    ' <h3 class="box-title">' + response.d.doctorName + '</h3> <small>' + response.d.doctorSpeciality + '</small><br><small>' + response.d.doctorPhone + '</small><br><br>' +
                    '</div>' +
                    '<div class="row">' +
                    '<div class="col-md-6 col-sm-6" >' +
                    '<a  class="deletePhyso" onclick="deleteDoctor(this.id)" id="' + response.d.doctorCode + '" style="color:#fff;"><div class="btn btn-danger btn-sm pull-right">Delete</div></a>&nbsp;&nbsp;' +
                    '</div>' +
                    '<div class="col-md-6 col-sm-6"> ' +
                    '<a class="editPhyso" href="edit-doctor.aspx?editdoctorCode=' + response.d.doctorCode + '" style="color:#fff;"><div class="btn btn-info btn-sm pull-right">Edit</div></a>' +
                    '</div>' +
                    '</div>' +
                    ' </div>' +
                    '</div>' +
                    ' </div >');
                UserRights();
            }

        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Details',
                text: 'Their was error while loading doctor details.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function getDoctorDetailById(dcode)
{
    var doctorobj = {};
    doctorobj.doctorCode = dcode;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getDoctorById",
        data: '{doctor: ' + JSON.stringify(doctorobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            var src1 = "Uploads/Images/" + response.d.doctorProfileImage;
            var src2 = "Uploads/Images/" + response.d.doctorAchmntUpload1;
            var src3 = "Uploads/Images/" + response.d.doctorAchmntUpload2;

            $('#doctorProfileImage').attr("src", src1);
            $('#doctorProfileImage2').attr("src", src1);
            $('#doctorUploadImg1').attr("src", src2);
            $('#doctorUploadImg2').attr("src", src3);
            $('#doctorDisplyName').append(response.d.doctorName);
            $('#doctorDisplyName2').append(response.d.doctorName);
            $('#doctorDisplaySpeciality').append(response.d.doctorSpeciality);
            $('#doctorDisplaySpeciality2').append(response.d.doctorSpeciality);
            $('#doctorDisplayEmail').append(response.d.doctorEmail);
            $('#doctorDisplayPhone').append(response.d.doctorPhone);
            $('#doctorDisplayAddress').append(response.d.doctorAddress);
            $('#doctorAchmtOptionDisplay1').append(response.d.doctorAchmntOption1);
            $('#doctorAchmtOptionDisplay2').append(response.d.doctorAchmntOption2);
            $('#doctorAchmtOptionDisplay3').append(response.d.doctorAchmntOption3);
            $('#doctorAchmtOptionDisplay4').append(response.d.doctorAchmntOption4);

        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Details',
                text: 'Their was error while loading doctors details.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function deleteDoctor(Did)
{
    swal({
        title: "Are you sure?",
        text: "You are above delete physotherapist from system !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plz!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {

            var doctorobj = {};
            doctorobj.doctorCode = Did;

            $.ajax({
                type: "POST",
                url: "WebService.asmx/deleteDoctor",
                data: '{doctor: ' + JSON.stringify(doctorobj) + '}',
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    swal("Deleted!", "Physotherapist has been deleted.", "success");
                    loadAllDoctors();
                },
                error: function (response) {
                    $.toast({
                        heading: 'Error Deleting  Doctor',
                        text: 'Their was error while deleting doctor.',
                        position: 'bottom-right',
                        loaderBg: '#ff6849',
                        icon: 'error',
                        hideAfter: 3500

                    });
                }

            });
            

        } else {
            swal("Cancelled", "Your operation is cancelled :)", "error");
        }
    });
}


function dateformateChange(date) {
    var datepart = date.split("/");
    return datepart[2] + "-" + datepart[1] + "-" + datepart[0];
}