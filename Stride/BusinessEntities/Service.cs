using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Stride.BusinessEntities
{
    public class Service
    {
        public long serviceCode { get; set; }
        public string serviceName { get; set; }
        public decimal serviceCharge { get; set; }
        public int serviceGst { get; set; }
    }
}