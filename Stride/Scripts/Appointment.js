$(document).ready(function () {

});

var printarray = [];

function saveAppointments(eventObj)
{
    
    var appointmentObj = {};
    appointmentObj.title = eventObj['title'];
    appointmentObj.start = eventObj['start'];
    appointmentObj.end = eventObj['end'];
    appointmentObj.className = eventObj['className'];
    appointmentObj.doctorCode = Session.get("DoctorCode");

    $.ajax({
        type: "POST",
        url: "WebService.asmx/saveNewAppointment",
        data: '{appointment: ' + JSON.stringify(appointmentObj) + '}',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

        },
        error: function (response) {
            $.toast({
                heading: 'Error Saving Appointment',
                text: 'Their was a error while saving appointment, try again.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

 function getDoctorAppointments()
 {
     var eventData = [];
    var appoinmentObj = {};
    appoinmentObj.doctorCode = Session.get("DoctorCode");

    $.ajax({
        type: "POST",
        url: "WebService.asmx/getDoctorAppointmentsList",
        data: '{appointment: ' + JSON.stringify(appoinmentObj) + '}',
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (response) {
            $.each(response.d, function (key, value) {
                printarray.push({ 'title': value.title, 'start': value.start, 'end': value.end, 'className': value.className });
            });

        },
        error: function (response) {
            $.toast({
                heading: 'Error Loading Appointments',
                text: 'Their was a error while loading your appointment list.',
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 3500

            });
        }

    });
}

 function updateDoctorAppointments(calEvent)
 {

     var appointmentObj = {};
     appointmentObj.title = calEvent.title;
     appointmentObj.title2 = calEvent.title2;
     appointmentObj.start = calEvent.start.toISOString();
     if (calEvent["end"] != undefined ) {
         
         appointmentObj.end = calEvent.end.toISOString();
     } else {
         appointmentObj.end = "";
     }
     appointmentObj.doctorCode = Session.get("DoctorCode");

     $.ajax({
         type: "POST",
         url: "WebService.asmx/updateDoctorAppointment",
         data: '{appointment: ' + JSON.stringify(appointmentObj) + '}',
         contentType: "application/json",
         dataType: "json",
         success: function (response) {
             $.toast({
                 heading: 'Appointment Changed Successfully',
                 text: '',
                 position: 'bottom-right',
                 loaderBg: '#ff6849',
                 icon: 'success',
                 hideAfter: 2500,
                 stack: 6
             });
         },
         error: function (response) {
             $.toast({
                 heading: 'Error Saving Appointment',
                 text: 'Their was a error while saving appointment, try again.',
                 position: 'bottom-right',
                 loaderBg: '#ff6849',
                 icon: 'error',
                 hideAfter: 3500

             });
         }

     });
 }

 function deleteDoctorAppointment(calEvent)
 {
     var appointmentObj = {};
     appointmentObj.title = calEvent.title;

     appointmentObj.start = calEvent.start.toISOString();
     if (calEvent["end"] != undefined) {
         appointmentObj.end = calEvent.end.toISOString();
     }
     else {
         appointmentObj.end = "";
     }
     appointmentObj.doctorCode = Session.get("DoctorCode");

     $.ajax({
         type: "POST",
         url: "WebService.asmx/deleteDoctorAppointment",
         data: '{appointment: ' + JSON.stringify(appointmentObj) + '}',
         contentType: "application/json",
         dataType: "json",
         success: function (response) {
             $.toast({
                 heading: 'Appointment Deleted Successfully',
                 text: '',
                 position: 'bottom-right',
                 loaderBg: '#ff6849',
                 icon: 'success',
                 hideAfter: 2500,
                 stack: 6
             });
         },
         error: function (response) {
             $.toast({
                 heading: 'Error Saving Appointment',
                 text: 'Their was a error while saving appointment, try again.',
                 position: 'bottom-right',
                 loaderBg: '#ff6849',
                 icon: 'error',
                 hideAfter: 3500

             });
         }

     });
 }


