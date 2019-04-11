using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Stride.BusinessEntities
{
    public class Invoice
    {

        public string[][] serviceData {get; set;}
        public string[][] serviceDetails { get; set; }
        public long subTotal { get; set; }
        public long gstTotal { get; set; }
       

        public long totalAmount { get; set; }

        public string patientCode { get; set; }

        public string patientName { get; set; }

        public string invoiceId { get; set; }
        public string invoiceDate { get; set; }
        public string invoiceDescription { get; set; }
        public long invoiceCharges { get; set; }
        public long invoiceGst { get; set; }
        public int invoiceQuantity { get; set; }
        public string invoiceServiceCode { get; set; }
        public long rowTotal { get; set; }
        public string serviceDate { get; set; }
        public long transcationId { get; set; }

        public DateTime fromDate { get; set; }
        public DateTime toDate { get; set; }

        public string patientAddress { get; set; }

        public string doctorCode { get; set; }
        public string doctorName { get; set; }
    }
}