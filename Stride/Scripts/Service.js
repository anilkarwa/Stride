$(document).ready(function () {
    loadServiceList();

    
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

            if (!response.d[5].serviceListAdd) {
                $('.addServiceRight').hide();
            }
            if (!response.d[5].serviceListEdit) {
                $('.editServiceRight').hide();
            }
            if (!response.d[5].serviceListDelete) {
                $('.deleteServiceRight').hide();
            }
            
        },
        error: function (response) {
            alert('error');
        }

    });
}

function saveNewService()
{
   var serviceName= $('#serviceName').val();
   var serviceCharge = $('#serviceCharges').val();
   var serviceGst = $('#serviceGST').val();

   var newServiceData = new FormData();

   newServiceData.append('serviceName', serviceName);
   newServiceData.append('serviceCharge', serviceCharge);
   newServiceData.append('serviceGst', serviceGst);

   $.ajax({
       type: "POST",
       url: "WebService.asmx/saveNewService",
       data: newServiceData,
       contentType: false,
       processData: false,
       success: function (response) {
           $.toast({
               heading: 'Service Created',
               text: 'The new service is created successfully.',
               position: 'bottom-right',
               loaderBg: '#ff6849',
               icon: 'success',
               hideAfter: 3500,
               stack: 6
           });
           loadServiceList();
           clearServiceForm();
       },
       error: function (response) {
           $.toast({
               heading: 'Error creating service',
               text: 'Their was an error creating new service, please try agian.',
               position: 'bottom-right',
               loaderBg: '#ff6849',
               icon: 'error',
               hideAfter: 3500

           });
       }
   });


}


function clearServiceForm()
{
     $('#serviceCode').val('');
     $('#serviceName').val('');
     $('#serviceCharges').val('');
     $('#serviceGST').val('');

}

function loadServiceList()
{
    $('#serviceListTable tbody').empty();
    $.ajax({
        type: "POST",
        url: "WebService.asmx/getAllServiceListDetails",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            $.each(response.d, function (key, value) {
                $('#serviceListTable tbody').append
                    ('<tr>'+
                    '<td>'+value.serviceName+'</td>'+
                    '<td>'+value.serviceCharge+'</td>'+
                    '<td>'+value.serviceGst+'%</td>'+
                    '<td><a class="editServiceRight" id="' + value.serviceCode + '" data-toggle="modal" data-target="#myModal" onclick="editService(this.id)"><i class="fa fa-pencil"></i></a><a class="deleteServiceRight" id="' + value.serviceCode +'" onclick="serviceListDelete(this.id); return false;">&nbsp&nbsp&nbsp&nbsp&nbsp<i class="fa fa-trash"></i></a></td>'+
                    '</tr>');
            });
            UserRights();

        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Service List',
                text: 'Their was an error while loading service list.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });

}

function editService(scode)
{
    var serviceobj = {};
    serviceobj.serviceCode = scode;

    $.ajax({
        type: "POST",
        url: "WebService.asmx/editServiceById",
        data: '{service: ' + JSON.stringify(serviceobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $('#editserviceCode').val(response.d.serviceCode);
            $('#editserviceName').val(response.d.serviceName);
            $('#editserviceCharges').val(response.d.serviceCharge);
            $('#editserviceGST').val(response.d.serviceGst);
        },
        error: function (response) {
            $.toast({
                heading: 'Error retrieving service',
                text: 'Their was error retrieving the service.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

function serviceUpdate()
{
    var serviceobj = {};
    serviceobj.serviceCode = $('#editserviceCode').val();
    serviceobj.serviceName = $('#editserviceName').val();
    serviceobj.serviceCharge = $('#editserviceCharges').val();
    serviceobj.serviceGst = $('#editserviceGST').val();

    $.ajax({
        type: "POST",
        url: "WebService.asmx/updateService",
        data: '{service: ' + JSON.stringify(serviceobj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.toast({
                heading: 'Service updated successfully',
                text: 'Update of the service completed.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
            loadServiceList();
            $('#myModal').modal('hide'); 

        },
        error: function (response) {
            $.toast({
                heading: 'Error updating service',
                text: 'Their was error updating the service.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}


function serviceListDelete(scode) {

    swal({
        title: "Are you sure?",
        text: "You are above delete service from list !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {

            var serviceobj = {};
            serviceobj.serviceCode = scode;

            $.ajax({
                type: "POST",
                url: "WebService.asmx/deleteService",
                data: '{service: ' + JSON.stringify(serviceobj) + '}',
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    swal("Deleted!", "Sevice has been deleted.", "success");
                    loadServiceList();
                },
                error: function (response) {
                    $.toast({
                        heading: 'Error Deleting  Service',
                        text: 'Their was error while deleting service.',
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
