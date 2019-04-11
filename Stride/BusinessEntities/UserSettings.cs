using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Stride.BusinessEntities
{
    public class UserSettings
    {

        public String userCode { get; set; }

        // physotherapist

        public Boolean physoAdd { get; set; }
        public Boolean physoEdit { get; set; }
        public Boolean physoDelete { get; set; }
        public Boolean physoPrint { get; set; }
        public Boolean physoView { get; set; }

        // securtiySettings

        public Boolean securityAdd { get; set; }
        public Boolean securityEdit { get; set; }
        public Boolean securityDelete { get; set; }
        public Boolean securityPrint { get; set; }
        public Boolean securityView { get; set; }

        //patient profile
        public Boolean patientProfileAdd { get; set; }
        public Boolean patientProfileEdit { get; set; }
        public Boolean patientProfileDelete { get; set; }
        public Boolean patientProfilePrint { get; set; }
        public Boolean patientProfileView { get; set; }

        //payment
        public Boolean payementAdd { get; set; }
        public Boolean payementEdit { get; set; }
        public Boolean payementDelete { get; set; }
        public Boolean payementPrint { get; set; }
        public Boolean payementView { get; set; }

        //patient Invoice

        public Boolean patientInvoiceAdd { get; set; }
        public Boolean patientInvoiceEdit { get; set; }
        public Boolean patientInvoiceDelete { get; set; }
        public Boolean patientInvoicePrint { get; set; }
        public Boolean patientInvoiceView { get; set; }

        //serviceList

        public Boolean serviceListAdd { get; set; }
        public Boolean serviceListEdit { get; set; }
        public Boolean serviceListDelete { get; set; }
        public Boolean serviceListPrint { get; set; }
        public Boolean serviceListView { get; set; }

        // paymentReport

        public Boolean paymentReportAdd { get; set; }
        public Boolean paymentReportEdit { get; set; }
        public Boolean paymentReportDelete { get; set; }
        public Boolean paymentReportPrint { get; set; }
        public Boolean paymentReportView { get; set; }


        // salesReport

        public Boolean salesReportAdd { get; set; }
        public Boolean salesReportEdit { get; set; }
        public Boolean salesReportDelete { get; set; }
        public Boolean salesReportPrint { get; set; }
        public Boolean salesReportView { get; set; }


        // outstandingReport

        public Boolean outstandingReportAdd { get; set; }
        public Boolean outstandingReportEdit { get; set; }
        public Boolean outstandingReportDelete { get; set; }
        public Boolean outstandingReportPrint { get; set; }
        public Boolean outstandingReportView { get; set; }


    }
}