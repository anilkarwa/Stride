using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Stride.BusinessEntities
{
    public class BalanceAmount
    {
        public String date { get; set; }
        public String pamentType { get; set; }
        public long invoiceAmount { get; set; }
        public long paidAmount { get; set; }
}
}