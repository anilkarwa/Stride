using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Stride.BusinessEntities
{
    public class Appointment
    {

        public string title { get; set; }
        public string title2 { get; set; }
        public string start { get; set; }
        public string end { get; set; }
        public string className { get; set; }
        public string doctorCode { get; set; }
        public string patientCode { get; set; }
        public string patientPhone { get; set; }

    }
}