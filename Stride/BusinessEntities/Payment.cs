using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Stride.BusinessEntities
{
    public class Payment
    {
        public long paymentId { get; set; }
        public string patientCode { get; set; }
        public string patientName { get; set; }
        public string patientAddress { get; set; }
        public string doctorName { get; set; }
        public string doctorCode { get; set; }
        public long payableAmount { get; set; }
        public int discountAmount { get; set; }
        public long receivedAmount { get; set; }

        public string paymentType { get; set; }
        public string paymentDate { get; set; }
        public string referenceNumber { get; set; }
        public string paymentDiscription{ get; set; }

        //Transcation

        public long transcationId { get; set; }
        public long pendingAmount { get; set; }

        //payment 
        public long paymentTotal { get; set; }
        public long salesTotal { get; set; }
        public long outstandingTotal { get; set; }
        public String[][] paymentDetails { get; set; }
    }
}