using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Stride.BusinessEntities
{
    public class Login
    {

        public string username { get; set; }
        public string password { get; set; }

        public string doctorCode { get; set; }
        public string doctorName { get; set; }

        public string doctorProfileImg { get; set; }
        public Boolean authenticationStatus { get; set; }
    }
}