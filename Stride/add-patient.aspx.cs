using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Stride
{
    public partial class add_patient : System.Web.UI.Page
    {

        string connectionString = ConfigurationManager.ConnectionStrings["DBConStr"].ConnectionString;

        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
}