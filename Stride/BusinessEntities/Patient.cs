using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Stride.BusinessEntities
{
    public class Patient
    {
        public string patientCode { get; set; }
        public string patientName { get; set; }
        public string DOB { get; set; }
        public string patientGender { get; set; }
        public string patientProfileImage { get; set; }
        public string patientDescription { get; set; }
        public string patientAddress { get; set; }
        public string patientEmail { get; set; }
        public string patientPhone { get; set; }

        public string patientAadhar { get; set; }

        public string patientOccupation { get; set; }


        //Medical History 

        public string HypertensionMH { get; set; }
        public string DiabeticMH { get; set; }
        public string ThroidMH { get; set; }
        public string HeartDiseaseMH { get; set; }
        public string OtherMH { get; set; }
        public string Enabled { get; set; }


        //Clinical Notes
        public long clinicalNoteId { get; set; }
        public string DateCN { get; set; }
        public string ClinicalNotesCN { get; set; }

        //Management Plan
        public long ManagementPlanId { get; set; }
        public string DateMP { get; set; }
        public string DescriptionMP { get; set; }

        //Investigation
        public long investigationId { get; set; }
        public string DateIN { get; set; }
        public string InvestigationFile { get; set; }
        public string DescriptionIN { get; set; }

        //Excercise 

        public string DateEX { get; set; }
        public string ExerciseFileName { get; set; }

        //Reports

        public DateTime fromDate { get; set; }
        public DateTime toDate { get; set; }
        public string doctorCode { get; set; }

    }
}