using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Stride.BusinessEntities
{
    public class Dashboard
    {

        public long totalPatients { get; set; }
        public long totalInvoice { get; set; }
        public long totalPayments { get; set; }

        public long invoices { get; set; }
        public long payments { get; set; }


        public string doctorTotal { get; set; }
        public string patientTotal { get; set; }
        public string invoiceTotal { get; set; }
        public string seviceTotal { get; set; }
        public string paymentTotal { get; set; }

    }
}