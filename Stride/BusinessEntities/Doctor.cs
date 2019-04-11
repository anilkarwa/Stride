using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Stride.BusinessEntities
{
    public class Doctor
    {

        public string doctorCode { get; set; }
        public string doctorName { get; set; }
        public string DOB { get; set; }
        public string doctorGender { get; set; }
        public string doctorProfileImage { get; set; }
        public string doctorDescription { get; set; }
        public string doctorAddress { get; set; }
        public string doctorEmail { get; set; }
        public string doctorPhone { get; set; }

        public string doctorAadhar { get; set; }

        public string doctorSpeciality { get; set; }
        public string doctorPassword { get; set; }

        public string doctorAchmntOption1 { get; set; }
        public string doctorAchmntOption2 { get; set; }
        public string doctorAchmntOption3 { get; set; }
        public string doctorAchmntOption4 { get; set; }

        public string doctorAchmntUpload1 { get; set; }
        public string doctorAchmntUpload2 { get; set; }

        //OTP

        public string OTP { get; set; }
    }
}