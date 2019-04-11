using SelectPdf;
using Stride.BusinessEntities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
namespace Stride
{
    /// <summary>
    /// Summary description for WebService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService : System.Web.Services.WebService
    {

        string connectionString = ConfigurationManager.ConnectionStrings["DBConStr"].ConnectionString;

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }


        [WebMethod]
        public Login authenticateUser(Login login)
        {
            var logindata = new Login();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstDoctor where DoctorEmail='"+login.username+"' and DoctorPassword = '"+login.password+"' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            if (rdr.Read())
            {
                logindata.authenticationStatus = true;
                logindata.doctorCode = rdr.GetString(0);
                logindata.doctorName = rdr.GetString(1);
                logindata.doctorProfileImg = rdr.GetString(10);
            }
            else
            {
                login.authenticationStatus = false;
            }

            connection.Close();

            return logindata;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void addNewPatient()
        {
            string valid = "false";
            int patientId = 0;
            string profileimgname = "";
            string patientName = HttpContext.Current.Request.Form.Get("patientName");
            string patientDOB = HttpContext.Current.Request.Form.Get("patientDOB");
            string patientGender = HttpContext.Current.Request.Form.Get("patientGender");
            string patientAddress = HttpContext.Current.Request.Form.Get("patientAddress");
            string patientEmail = HttpContext.Current.Request.Form.Get("patientEmail");
            string patientPhone = HttpContext.Current.Request.Form.Get("patientPhone");
            string patientDescription = HttpContext.Current.Request.Form.Get("patientDescription");
            string patientAadhar = HttpContext.Current.Request.Form.Get("patientAadhar");
            string patientOccupation = HttpContext.Current.Request.Form.Get("patientOccupation");
            HttpPostedFile profileimg = HttpContext.Current.Request.Files["patientProfileImage"];

            if (profileimg != null && profileimg.ContentLength > 0)
            {
                profileimgname = Path.GetFileName(profileimg.FileName);
                profileimg.SaveAs(Server.MapPath(Path.Combine("~/Uploads/Images", profileimgname)));
            }
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                string query ="insert into MstPatient_info(PatientName,age,Gender,Patient_Profile_Img,PatientDescription,PatientEmail,PatientPhone,PatientAddress,PatientAadhar,Occupation,Enabled) values('"+patientName+"','"+patientDOB+"','"+patientGender+"','"+profileimgname+"','"+patientDescription+"','"+patientEmail+"','"+patientPhone+"','"+patientAddress+ "','" + patientAadhar + "','" + patientOccupation + "','Y' ) SELECT SCOPE_IDENTITY()";
                SqlCommand cmd = new SqlCommand(query, connection);
                patientId = (int)(decimal)cmd.ExecuteScalar();

            }
            finally
            {
                connection.Close();
            }

            String temp = "{patientCode:"+patientId+"}";
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(temp));
        }

        [WebMethod]
        public string editPatient()
        {
            string valid = "false";
            string profileimgname = "";
            string querystring = "";
            string patientCode = HttpContext.Current.Request.Form.Get("patientCode");
            string patientName = HttpContext.Current.Request.Form.Get("patientName");
            string patientDOB = HttpContext.Current.Request.Form.Get("patientDOB");
            string patientGender = HttpContext.Current.Request.Form.Get("patientGender");
            string patientAddress = HttpContext.Current.Request.Form.Get("patientAddress");
            string patientEmail = HttpContext.Current.Request.Form.Get("patientEmail");
            string patientPhone = HttpContext.Current.Request.Form.Get("patientPhone");
            string patientDescription = HttpContext.Current.Request.Form.Get("patientDescription");
            string patientAadhar = HttpContext.Current.Request.Form.Get("patientAadhar");
            string patientOccupation = HttpContext.Current.Request.Form.Get("patientOccupation");
            HttpPostedFile profileimg = HttpContext.Current.Request.Files["patientProfileImage"];

            if (profileimg != null && profileimg.ContentLength > 0)
            {
                profileimgname = Path.GetFileName(profileimg.FileName);
                profileimg.SaveAs(Server.MapPath(Path.Combine("~/Uploads/Images", profileimgname)));
                querystring = "update MstPatient_info set PatientName= '" + patientName + "',age='" + patientDOB + "',Gender='" + patientGender + "',PatientDescription='" + patientDescription + "', PatientEmail='" + patientEmail + "', PatientPhone='" + patientPhone + "',PatientAddress='" + patientAddress + "',PatientAadhar='" + patientAadhar + "',Occupation='" + patientOccupation + "', Patient_Profile_Img='"+ profileimgname + "' where PatientCode= '" + patientCode + "' ";
            }
            else
            {
                querystring = "update MstPatient_info set PatientName= '"+ patientName + "',age='"+ patientDOB + "',Gender='"+ patientGender + "',PatientDescription='"+ patientDescription + "', PatientEmail='"+ patientEmail + "', PatientPhone='"+ patientPhone + "',PatientAddress='"+ patientAddress + "',PatientAadhar='"+ patientAadhar + "',Occupation='"+ patientOccupation + "' where PatientCode= '"+ patientCode + "' ";
            }
            SqlConnection connection = new SqlConnection(connectionString);
            
            try
            {
                connection.Open();
                SqlCommand command = new SqlCommand(querystring, connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }
            return valid;
        }

        [WebMethod]

        public List<Patient> GetAllPatientsDetails(string num)
        {
            var patients = new List<Patient>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstPatient_Info order by PatientName asc offset "+num+" rows Fetch next 12 rows only", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var patientdata = new Patient();
                patientdata.patientCode = rdr.GetString(0);
                patientdata.patientName = rdr.GetString(1);
                patientdata.patientEmail = rdr.GetString(6);
                patientdata.patientPhone = rdr.GetString(7);
                patientdata.patientOccupation = rdr.GetString(10);
                patientdata.Enabled = rdr.GetString(11);
                if (!rdr.IsDBNull(rdr.GetOrdinal("Patient_Profile_Img"))) { patientdata.patientProfileImage = rdr.GetString(4); } else { patientdata.patientProfileImage = ""; }

                patients.Add(patientdata);
            }

            connection.Close();


            return patients;
        }

        [WebMethod]
        public List<Patient> GetAllPatientsDetailsList()
        {
            var patients = new List<Patient>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstPatient_Info order by PatientName asc", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var patientdata = new Patient();
                patientdata.patientCode = rdr.GetString(0);
                patientdata.patientName = rdr.GetString(1);
                patientdata.patientEmail = rdr.GetString(6);
                patientdata.patientPhone = rdr.GetString(7);
                patientdata.patientOccupation = rdr.GetString(10);
                patientdata.DOB = rdr.GetString(2);
                patientdata.patientGender = rdr.GetString(3);
                patientdata.patientAddress = rdr.GetString(8);
                patientdata.patientDescription = rdr.GetString(5);
                

                patients.Add(patientdata);
            }

            connection.Close();


            return patients;
        }

        [WebMethod]
        public string saveMedicalHistory()
        {
            string valid = "false";
            string pcode = HttpContext.Current.Request.Form.Get("patientCode");

            string Hypertension = HttpContext.Current.Request.Form.Get("Hypertension");
            string Diabetic = HttpContext.Current.Request.Form.Get("Diabetic");
            string Thyroid = HttpContext.Current.Request.Form.Get("Thyroid");
            string HeartDisease = HttpContext.Current.Request.Form.Get("HeartDisease");
            string Other = HttpContext.Current.Request.Form.Get("Other");

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("UPDATE Patient_Medical_History SET Hypertension= '" + Hypertension + "',Diabetic='"+ Diabetic + "',Throid='"+ Thyroid + "',Heart_Disease ='"+ HeartDisease + "',Other='"+ Other + "'  WHERE PatientCode = '"+ pcode + "' IF @@ROWCOUNT = 0 " +
                    "insert into Patient_Medical_History(PatientCode,Hypertension,Diabetic,Throid,Heart_Disease,Other) values('" + pcode + "','" + Hypertension + "','" + Diabetic + "','" + Thyroid + "','" + HeartDisease + "','" + Other + "' )");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            return valid;

        }


        [WebMethod]
        public string saveManagementPlan()
        {
            string valid = "false";

            string pcode = HttpContext.Current.Request.Form.Get("patientCode");
            string mDate = HttpContext.Current.Request.Form.Get("mDate");
            string mDescription = HttpContext.Current.Request.Form.Get("mDescription");

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("insert into Patient_Management_Plan(PatientCode,Date,Description) values('" + pcode + "','" + mDate + "','" + mDescription + "')");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }


            return valid;
        }

        [WebMethod]
        public string saveClinicalNotesData()
        {
            string valid = "false";
            string profileimgname = "";
            string pcode = HttpContext.Current.Request.Form.Get("patientCode");
            DateTime today = DateTime.Now;
            HttpPostedFile profileimg = HttpContext.Current.Request.Files["ClinicalNotesFile"];

            if (profileimg != null && profileimg.ContentLength > 0)
            {
                profileimgname = Path.GetFileName(profileimg.FileName);
                profileimg.SaveAs(Server.MapPath(Path.Combine("~/Uploads/ClinicalNotes/Uploaded", profileimgname)));
            }
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("insert into Patient_Clinical_Notes(PatientCode,Date,Clinical_Notes) values('" + pcode + "','" + today + "','" + profileimgname + "')");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public string saveInvestigationData()
        {
            string valid = "false";

            string investigationname = "";
            string pcode = HttpContext.Current.Request.Form.Get("patientCode");
            DateTime today = DateTime.Now;

            string nDescription = HttpContext.Current.Request.Form.Get("nDescription");
            HttpPostedFile profileimg = HttpContext.Current.Request.Files["investigationFile"];

            if (profileimg != null && profileimg.ContentLength > 0)
            {
                investigationname = Path.GetFileName(profileimg.FileName);
                profileimg.SaveAs(Server.MapPath(Path.Combine("~/Uploads/Investegation/Uploaded", investigationname)));
            }
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("insert into Patient_Investigation(PatientCode,Date,Investigation_File,Description) values('" + pcode + "','" + today + "','" + investigationname + "','"+ nDescription + "')");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }


            return valid;
        }


        [WebMethod]
        public void sendMail()
        {
            SqlConnection connection = new SqlConnection(connectionString);
            string pcode = HttpContext.Current.Request.Form.Get("patientCode");
            DateTime today = DateTime.Now;
            string mailarray = HttpContext.Current.Request.Form.Get("mailData");
            string[] data = mailarray.Split(',');
            string Hypertension = HttpContext.Current.Request.Form.Get("Hypertension");
            string HeartDisease = HttpContext.Current.Request.Form.Get("HeartDisease");
            string Thyroid = HttpContext.Current.Request.Form.Get("Thyroid");
            string Diabetic = HttpContext.Current.Request.Form.Get("Diabetic");


            Boolean enableSsl = Boolean.Parse(HttpContext.Current.Request.Form.Get("enableSsl"));
            Boolean IsBodyHtml = Boolean.Parse(HttpContext.Current.Request.Form.Get("IsBodyHtml"));


            // email settings

            string smtpUsername = "", smtpPassword = "", smtpPort = "", smtClient = "", senderEmailId = "";
            SqlCommand readcommand2 = new SqlCommand("select * from EmailSetting ", connection);
            connection.Open();
            SqlDataReader rdr2 = readcommand2.ExecuteReader();
            while (rdr2.Read())
            {
                smtClient = rdr2.GetString(1);
                smtpUsername = rdr2.GetString(2);
                smtpPassword = rdr2.GetString(3);
                smtpPort = rdr2.GetString(4);
                senderEmailId = rdr2.GetString(5);

            }

            connection.Close();
            string HypertensionFileName = "", HypertensionFilePath = "", HeartDiseaseFileName = "", HeartDiseaseFilePath = "", ThyroidFileName = "", ThyroidFilePath = "", DiabeticFileName = "", DiabeticFilePath = "";
            SqlCommand readcommand3 = new SqlCommand("select * from ExcerciseFileDetails where ExcerciseFileName like '%Hypertension%' ", connection);
            connection.Open();
            SqlDataReader rdr3 = readcommand3.ExecuteReader();
            while (rdr3.Read())
            {
                HypertensionFileName = rdr3.GetString(1);
                HypertensionFilePath = rdr3.GetString(2);

            }

            connection.Close();

            SqlCommand readcommand4 = new SqlCommand("select * from ExcerciseFileDetails where ExcerciseFileName like '%HeartDisease%' ", connection);
            connection.Open();
            SqlDataReader rdr4 = readcommand4.ExecuteReader();
            while (rdr4.Read())
            {
                HeartDiseaseFileName = rdr4.GetString(1);
                HeartDiseaseFilePath = rdr4.GetString(2);

            }

            connection.Close();


            SqlCommand readcommand5 = new SqlCommand("select * from ExcerciseFileDetails where ExcerciseFileName like '%Thiroyd%' ", connection);
            connection.Open();
            SqlDataReader rdr5 = readcommand5.ExecuteReader();
            while (rdr5.Read())
            {
                ThyroidFileName = rdr5.GetString(1);
                ThyroidFilePath = rdr5.GetString(2);

            }

            connection.Close();

            SqlCommand readcommand6 = new SqlCommand("select * from ExcerciseFileDetails where ExcerciseFileName like '%Diabetic%' ", connection);
            connection.Open();
            SqlDataReader rdr6 = readcommand6.ExecuteReader();
            while (rdr6.Read())
            {
                DiabeticFileName = rdr6.GetString(1);
                DiabeticFilePath = rdr6.GetString(2);

            }

            connection.Close();

            MailMessage mailMsg = new MailMessage();
            mailMsg.Subject = data[7];
            //  mailMsg.Body = data[8];
            mailMsg.Body = "Greetings from Stride,<br/>Thank you for choosing Stride Physio<br/><br/> Please find the excersice files attached below.<br/><br/><h6><i><b>Note*: This is an auto-generated mail from system, kindly do not reply.</b></i></h6><br/><br/>Thank you <br/>Stride Physio<br/>Phone : +91 9448760810<br/>Email : physiostride@gmail.com";
            mailMsg.From = new MailAddress(senderEmailId);

            if (data[4].Equals("High"))
            {
                mailMsg.Priority = MailPriority.High;
            }
            else
            {
                mailMsg.Priority = MailPriority.Normal;
            }
            
            if (Hypertension.Equals("checked"))
            {
                string currentDirectory = Directory.GetCurrentDirectory();
                string filePath = System.IO.Path.Combine(HypertensionFilePath, HypertensionFileName);
                string FileName = HypertensionFileName;
                MemoryStream ms = new MemoryStream(File.ReadAllBytes(filePath));
                mailMsg.Attachments.Add(new System.Net.Mail.Attachment(ms, FileName));

                
                SqlCommand command = connection.CreateCommand();
                try
                {
                    connection.Open();
                    command.CommandText = ("insert into Patient_Exercise_Presc(PatientCode,Date,Excercise_File_Name) values('" + pcode + "','" + today + "','" + FileName + "')");
                    command.ExecuteNonQuery();

                }
                finally
                {
                    connection.Close();
                }
            }
            if (HeartDisease.Equals("checked"))
            {
                string currentDirectory = Directory.GetCurrentDirectory();
                string filePath = System.IO.Path.Combine(HeartDiseaseFilePath, HeartDiseaseFileName);
                string FileName = HeartDiseaseFileName;
                MemoryStream ms = new MemoryStream(File.ReadAllBytes(filePath));
                mailMsg.Attachments.Add(new System.Net.Mail.Attachment(ms, FileName));

                
                SqlCommand command = connection.CreateCommand();
                try
                {
                    connection.Open();
                    command.CommandText = ("insert into Patient_Exercise_Presc(PatientCode,Date,Excercise_File_Name) values('" + pcode + "','" + today + "','" + FileName + "')");
                    command.ExecuteNonQuery();

                }
                finally
                {
                    connection.Close();
                }
            }
            if (Thyroid.Equals("checked"))
            {
                string currentDirectory = Directory.GetCurrentDirectory();
                string filePath = System.IO.Path.Combine(ThyroidFilePath, ThyroidFileName);
                string FileName = ThyroidFileName;
                MemoryStream ms = new MemoryStream(File.ReadAllBytes(filePath));
                mailMsg.Attachments.Add(new System.Net.Mail.Attachment(ms, FileName));


               
                SqlCommand command = connection.CreateCommand();
                try
                {
                    connection.Open();
                    command.CommandText = ("insert into Patient_Exercise_Presc(PatientCode,Date,Excercise_File_Name) values('" + pcode + "','" + today + "','" + FileName + "')");
                    command.ExecuteNonQuery();

                }
                finally
                {
                    connection.Close();
                }
            }
            if (Diabetic.Equals("checked"))
            {
                string currentDirectory = Directory.GetCurrentDirectory();
                string filePath = System.IO.Path.Combine(DiabeticFilePath, DiabeticFileName);
                string FileName = DiabeticFileName;
                MemoryStream ms = new MemoryStream(File.ReadAllBytes(filePath));
                mailMsg.Attachments.Add(new System.Net.Mail.Attachment(ms, FileName));

                
                SqlCommand command = connection.CreateCommand();
                try
                {
                    connection.Open();
                    command.CommandText = ("insert into Patient_Exercise_Presc(PatientCode,Date,Excercise_File_Name) values('" + pcode + "','" + today + "','" + FileName + "')");
                    command.ExecuteNonQuery();

                }
                finally
                {
                    connection.Close();
                }
            }

            if (!String.IsNullOrEmpty(data[6]))
            {
                String[] to = data[6].Split(';');
                for (int i = 0; i < to.Length; i++)
                    if (!String.IsNullOrEmpty(to[i]))
                        mailMsg.To.Add(new MailAddress(to[i]));
            }

            if (!String.IsNullOrEmpty(data[9]))
            {
                String[] arrBCC = data[9].Split(';');
                for (int i = 0; i < arrBCC.Length; i++)
                    if (!String.IsNullOrEmpty(arrBCC[i]))
                        mailMsg.Bcc.Add(new MailAddress(arrBCC[i]));
            }

            if (!String.IsNullOrEmpty(data[10]))
            {
                String[] arrBCC = data[10].Split(';');
                for (int i = 0; i < arrBCC.Length; i++)
                    if (!String.IsNullOrEmpty(arrBCC[i]))
                        mailMsg.Bcc.Add(new MailAddress(arrBCC[i]));
            }

            mailMsg.IsBodyHtml = IsBodyHtml;
            try
            {

                SmtpClient smtpClient = new SmtpClient(smtClient);
                NetworkCredential networkCredential = new NetworkCredential();
                networkCredential.UserName = smtpUsername;
                networkCredential.Password = smtpPassword;
                smtpClient.Credentials = networkCredential;
                smtpClient.Port = Convert.ToInt32(smtpPort);


                smtpClient.EnableSsl = enableSsl;

                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

                smtpClient.Send(mailMsg);


            }
            catch (SmtpException ex)
            {

            }


        }


        [WebMethod]

        public Patient getPatientById(Patient patient)
        {
            var patientData = new Patient();


            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstPatient_Info where PatientCode=@PatientCode", connection);
            readcommand.Parameters.AddWithValue("@PatientCode", patient.patientCode);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {

                patientData.patientCode = rdr.GetString(0);
                patientData.patientName = rdr.GetString(1);
                patientData.patientGender = rdr.GetString(3);
                patientData.DOB = rdr.GetString(2);
                patientData.patientProfileImage = rdr.GetString(4);
                patientData.patientDescription = rdr.GetString(5);
                patientData.patientEmail = rdr.GetString(6);
                patientData.patientPhone = rdr.GetString(7);
                patientData.patientAddress = rdr.GetString(8);
                patientData.patientAadhar = rdr.GetString(9);
                patientData.patientOccupation = rdr.GetString(10);
                patientData.Enabled = rdr.GetString(11);
            }

            connection.Close();

            return patientData;
        }

        [WebMethod]
        public string DisablePatient(Patient patient)
        {
            string valid = "false";

            SqlConnection connection = new SqlConnection(connectionString);
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update MstPatient_Info set Enabled='"+patient.Enabled+"' where PatientCode ='"+patient.patientCode+"' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }
            return valid;
        }

        [WebMethod]

        public Patient getPatientMedicalHistoryById(Patient patient)
        {
            var patientData = new Patient();


            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from Patient_Medical_History where PatientCode=@PatientCode", connection);
            readcommand.Parameters.AddWithValue("@PatientCode", patient.patientCode);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {

                patientData.HypertensionMH = rdr.GetString(1);
                patientData.DiabeticMH = rdr.GetString(2);
                patientData.ThroidMH = rdr.GetString(3);
                patientData.HeartDiseaseMH = rdr.GetString(4);
                patientData.OtherMH = rdr.GetString(5);

            }

            connection.Close();

            return patientData;
        }


        [WebMethod]
        public List<Patient> getPatientClinicalNotesById(Patient patient)
        {
            var patientList = new List<Patient>();


            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from Patient_Clinical_Notes where PatientCode=@PatientCode", connection);
            readcommand.Parameters.AddWithValue("@PatientCode", patient.patientCode);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var patientData = new Patient();
                patientData.clinicalNoteId = rdr.GetInt64(3);
                patientData.DateCN = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                patientData.ClinicalNotesCN = rdr.GetString(2);
                patientList.Add(patientData);
            }

            connection.Close();

            return patientList;
        }
        [WebMethod]
        public string deleteClinicalNotesFile(Patient patient)
        {
            string valid = "false";

            SqlConnection connection = new SqlConnection(connectionString);
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" delete from Patient_Clinical_Notes where Id='"+patient.clinicalNoteId+"' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }
            return valid;
        }

        [WebMethod]
        public string deleteManagementPlan(Patient patient)
        {
            string valid = "false";

            SqlConnection connection = new SqlConnection(connectionString);
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" delete from Patient_Management_Plan where ManagementPlanId='" + patient.ManagementPlanId + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }
            return valid;
        }

        [WebMethod]
        public string saveEditManagementPlanData (Patient patient)
        {
            string valid = "false";

            SqlConnection connection = new SqlConnection(connectionString);
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update Patient_Management_Plan set Date='"+patient.DateMP+"', Description='"+patient.DescriptionMP+"' where ManagementPlanId='"+patient.ManagementPlanId+"'  ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }
            return valid;
        }

        [WebMethod]
        public Patient getManagementPlanByManagementId(Patient patient)
        {
            var patientList = new Patient();


            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from Patient_Management_Plan where ManagementPlanId=@ManagementPlanId", connection);
            readcommand.Parameters.AddWithValue("@ManagementPlanId", patient.ManagementPlanId);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {

                patientList.ManagementPlanId = rdr.GetInt64(3);
                patientList.DateMP = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                patientList.DescriptionMP = rdr.GetString(2);
   
            }

            connection.Close();

            return patientList;
        }


        [WebMethod]
        public List<Patient> getPatientManagementPlanById(Patient patient)
        {
            var patientList = new List<Patient>();


            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from Patient_Management_Plan where PatientCode=@PatientCode", connection);
            readcommand.Parameters.AddWithValue("@PatientCode", patient.patientCode);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var patientData = new Patient();
                patientData.ManagementPlanId = rdr.GetInt64(3);
                patientData.DateMP = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                patientData.DescriptionMP = rdr.GetString(2);
                patientList.Add(patientData);
            }

            connection.Close();

            return patientList;
        }

        [WebMethod]

        public List<Patient> getPatientInvestigationDataById(Patient patient)
        {
            var patientList = new List<Patient>();


            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from Patient_Investigation where PatientCode=@PatientCode", connection);
            readcommand.Parameters.AddWithValue("@PatientCode", patient.patientCode);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var patientData = new Patient();
                patientData.investigationId = rdr.GetInt64(4);
                patientData.DateIN = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                patientData.DescriptionIN = rdr.GetString(3);
                patientData.InvestigationFile = rdr.GetString(2);
                patientList.Add(patientData);
            }

            connection.Close();

            return patientList;

        }

        [WebMethod]
        public string deletInvestigationFile(Patient patient)
        {
            string valid = "false";

            SqlConnection connection = new SqlConnection(connectionString);
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" delete from Patient_Investigation where Id='" + patient.investigationId + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }
            return valid;
        }

        [WebMethod]
        public List<Patient> getPatientExcerciseDataById(Patient patient)
        {
            var patientList = new List<Patient>();


            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from Patient_Exercise_Presc where PatientCode=@PatientCode", connection);
            readcommand.Parameters.AddWithValue("@PatientCode", patient.patientCode);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var patientData = new Patient();
                patientData.DateEX = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                patientData.ExerciseFileName = rdr.GetString(2);
                patientList.Add(patientData);
            }

            connection.Close();

            return patientList;
        }

        [WebMethod]
        public List<Patient> getPatientByName(string term)
        {
            var patientList = new List<Patient>();


            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select top 15 * from MstPatient_Info  where (PatientName like '%" + term + "%' or PatientEmail like '%" + term + "%' or PatientPhone like '%" + term + "%' or PatientDescription like '%" + term + "%' or PatientCode like '%" + term + "%') and Enabled='Y' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var patientdata = new Patient();
                patientdata.patientCode = rdr.GetString(0);
                patientdata.patientName = rdr.GetString(1);
                patientdata.patientAddress = rdr.GetString(8);
                patientList.Add(patientdata);

            }

            connection.Close();

            return patientList;
        }

        [WebMethod]
        public string addNewDoctor()
        { 
            string valid = "false";
            string profileimgname = "";
            string uploadimg1name = "";
            string uploadimg2name = "";

            string doctorCode = HttpContext.Current.Request.Form.Get("doctorCode");
            string doctorName = HttpContext.Current.Request.Form.Get("doctorName");
            string doctorDOB = HttpContext.Current.Request.Form.Get("doctorDOB");
            string doctorGender = HttpContext.Current.Request.Form.Get("doctorGender");
            string doctorAddress = HttpContext.Current.Request.Form.Get("doctorAddress");
            string doctorEmail = HttpContext.Current.Request.Form.Get("doctorEmail");
            string doctorPhone = HttpContext.Current.Request.Form.Get("doctorPhone");
            string doctorDescription = HttpContext.Current.Request.Form.Get("doctorDescription");
            string doctorAadhar = HttpContext.Current.Request.Form.Get("doctorAadhar");
            string doctorSpeciality = HttpContext.Current.Request.Form.Get("doctorSpeciality");
            string doctorPassword = HttpContext.Current.Request.Form.Get("doctorPassword");
            string doctorAchmntOption1 = HttpContext.Current.Request.Form.Get("doctorAchmntOption1");
            string doctorAchmntOption2 = HttpContext.Current.Request.Form.Get("doctorAchmntOption2");
            string doctorAchmntOption3 = HttpContext.Current.Request.Form.Get("doctorAchmntOption3");
            string doctorAchmntOption4 = HttpContext.Current.Request.Form.Get("doctorAchmntOption4");

            HttpPostedFile profileimg = HttpContext.Current.Request.Files["doctorProfileImg"];
            HttpPostedFile uploadimg1 = HttpContext.Current.Request.Files["doctorAchmntUpload1"];
            HttpPostedFile uploadimg2 = HttpContext.Current.Request.Files["doctorAchmntUpload2"];

            if (uploadimg1 != null && uploadimg1.ContentLength > 0)
            {
                uploadimg1name = Path.GetFileName(uploadimg1.FileName);
                uploadimg1.SaveAs(Server.MapPath(Path.Combine("~/Uploads/Images", uploadimg1name)));
            }


            if (uploadimg2 != null && uploadimg2.ContentLength > 0)
            {
                uploadimg2name = Path.GetFileName(uploadimg2.FileName);
                uploadimg2.SaveAs(Server.MapPath(Path.Combine("~/Uploads/Images", uploadimg2name)));
            }


            if (profileimg != null && profileimg.ContentLength > 0)
            {
                profileimgname = Path.GetFileName(profileimg.FileName);
                profileimg.SaveAs(Server.MapPath(Path.Combine("~/Uploads/Images", profileimgname)));
            }

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("insert into MstDoctor(DoctorCode,DoctorName,DoctorSpeciality,DOB,Gender,DoctorDescription,DoctorEmail,DoctorPhone,DoctorAddress,DoctorAadhar,DoctorPassword,DoctorProfileImg,DoctorAchmntOption1,DoctorAchmntOption2,DoctorAchmntOption3,DoctorAchmntOption4,DoctorAchmntUpload1,DoctorAchmntUpload2,Enabled) " +
                    "values('" + doctorCode + "','" + doctorName + "','"+ doctorSpeciality + "','" + doctorDOB + "','" + doctorGender + "','" + doctorDescription + "','" + doctorEmail + "','" + doctorPhone + "','" + doctorAddress + "','" + doctorAadhar + "','" + doctorPassword + "','" + profileimgname + "','" + doctorAchmntOption1 + "','" + doctorAchmntOption2 + "','" + doctorAchmntOption3 + "','" + doctorAchmntOption4 + "','" + uploadimg1name + "','" + uploadimg2name + "','Y' )");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }
            return valid;
        }

        [WebMethod]
        public string editDoctorDetails()
        {
            string valid = "false";
            string querystring = "";
            string profileimgname = "";
            string uploadimg1name = "";
            string uploadimg2name = "";
            int imgflag1 = 0, imgflag2 = 0,imgflag3 = 0;

            string doctorCode = HttpContext.Current.Request.Form.Get("doctorCode");
            string doctorName = HttpContext.Current.Request.Form.Get("doctorName");
            string doctorDOB = HttpContext.Current.Request.Form.Get("doctorDOB");
            string doctorGender = HttpContext.Current.Request.Form.Get("doctorGender");
            string doctorAddress = HttpContext.Current.Request.Form.Get("doctorAddress");
            string doctorEmail = HttpContext.Current.Request.Form.Get("doctorEmail");
            string doctorPhone = HttpContext.Current.Request.Form.Get("doctorPhone");
            string doctorDescription = HttpContext.Current.Request.Form.Get("doctorDescription");
            string doctorAadhar = HttpContext.Current.Request.Form.Get("doctorAadhar");
            string doctorSpeciality = HttpContext.Current.Request.Form.Get("doctorSpeciality");
            string doctorPassword = HttpContext.Current.Request.Form.Get("doctorPassword");
            string doctorAchmntOption1 = HttpContext.Current.Request.Form.Get("doctorAchmntOption1");
            string doctorAchmntOption2 = HttpContext.Current.Request.Form.Get("doctorAchmntOption2");
            string doctorAchmntOption3 = HttpContext.Current.Request.Form.Get("doctorAchmntOption3");
            string doctorAchmntOption4 = HttpContext.Current.Request.Form.Get("doctorAchmntOption4");

            HttpPostedFile profileimg = HttpContext.Current.Request.Files["doctorProfileImg"];
            HttpPostedFile uploadimg1 = HttpContext.Current.Request.Files["doctorAchmntUpload1"];
            HttpPostedFile uploadimg2 = HttpContext.Current.Request.Files["doctorAchmntUpload2"];

            if (uploadimg1 != null && uploadimg1.ContentLength > 0)
            {
                imgflag1 = 1;
                uploadimg1name = Path.GetFileName(uploadimg1.FileName);
                uploadimg1.SaveAs(Server.MapPath(Path.Combine("~/Uploads/Images", uploadimg1name)));

                querystring = "update MstDoctor set DoctorName='" + doctorName + "',DoctorSpeciality = '" + doctorSpeciality + "',DOB= '" + doctorDOB + "',Gender= '" + doctorGender + "',  " +
                                "DoctorDescription='"+ doctorDescription + "',DoctorEmail= '"+ doctorEmail + "',DoctorPhone= '"+ doctorPhone + "',DoctorAadhar= '"+ doctorAadhar + "'," +
                                " DoctorAddress= '"+ doctorAddress + "', DoctorAchmntOption1 = '"+ doctorAchmntOption1 + "', DoctorAchmntOption2 = '" + doctorAchmntOption2 + "', DoctorAchmntOption3 = '" + doctorAchmntOption3 + "', DoctorAchmntOption4 = '" + doctorAchmntOption4 + "',DoctorAchmntUpload1 ='"+ uploadimg1name + "' where DoctorCode= '"+ doctorCode + "' ";
            }


            if (uploadimg2 != null && uploadimg2.ContentLength > 0)
            {
                imgflag2 = 1;
                uploadimg2name = Path.GetFileName(uploadimg2.FileName);
                uploadimg2.SaveAs(Server.MapPath(Path.Combine("~/Uploads/Images", uploadimg2name)));

                querystring = "update MstDoctor set DoctorName='" + doctorName + "',DoctorSpeciality = '" + doctorSpeciality + "',DOB= '" + doctorDOB + "',Gender= '" + doctorGender + "',  " +
                                "DoctorDescription='" + doctorDescription + "',DoctorEmail= '" + doctorEmail + "',DoctorPhone= '" + doctorPhone + "',DoctorAadhar= '" + doctorAadhar + "'," +
                                " DoctorAddress= '" + doctorAddress + "', DoctorAchmntOption1 = '" + doctorAchmntOption1 + "', DoctorAchmntOption2 = '" + doctorAchmntOption2 + "', DoctorAchmntOption3 = '" + doctorAchmntOption3 + "', DoctorAchmntOption4 = '" + doctorAchmntOption4 + "',DoctorAchmntUpload2 ='" + uploadimg2name + "' where DoctorCode= '" + doctorCode + "' ";
            }


            if (profileimg != null && profileimg.ContentLength > 0)
            {
                imgflag3 = 1;
                profileimgname = Path.GetFileName(profileimg.FileName);
                profileimg.SaveAs(Server.MapPath(Path.Combine("~/Uploads/Images", profileimgname)));

                querystring = "update MstDoctor set DoctorName='" + doctorName + "',DoctorSpeciality = '" + doctorSpeciality + "',DOB= '" + doctorDOB + "',Gender= '" + doctorGender + "',  " +
                                "DoctorDescription='" + doctorDescription + "',DoctorEmail= '" + doctorEmail + "',DoctorPhone= '" + doctorPhone + "',DoctorAadhar= '" + doctorAadhar + "'," +
                                " DoctorAddress= '" + doctorAddress + "', DoctorAchmntOption1 = '" + doctorAchmntOption1 + "', DoctorAchmntOption2 = '" + doctorAchmntOption2 + "', DoctorAchmntOption3 = '" + doctorAchmntOption3 + "', DoctorAchmntOption4 = '" + doctorAchmntOption4 + "',DoctorProfileImg ='" + profileimgname + "' where DoctorCode= '" + doctorCode + "' ";

            }

            if(imgflag1 ==1 && imgflag2 == 1)
            {
                querystring = "update MstDoctor set DoctorName='" + doctorName + "',DoctorSpeciality = '" + doctorSpeciality + "',DOB= '" + doctorDOB + "',Gender= '" + doctorGender + "',  " +
                               "DoctorDescription='" + doctorDescription + "',DoctorEmail= '" + doctorEmail + "',DoctorPhone= '" + doctorPhone + "',DoctorAadhar= '" + doctorAadhar + "'," +
                               " DoctorAddress= '" + doctorAddress + "', DoctorAchmntOption1 = '" + doctorAchmntOption1 + "', DoctorAchmntOption2 = '" + doctorAchmntOption2 + "', DoctorAchmntOption3 = '" + doctorAchmntOption3 + "', DoctorAchmntOption4 = '" + doctorAchmntOption4 + "',DoctorAchmntUpload2 ='" + uploadimg2name + "',DoctorAchmntUpload1 ='" + uploadimg1name + "' where DoctorCode= '" + doctorCode + "' ";
            }
            if(imgflag1 == 1 && imgflag3 == 1)
            {
                querystring = "update MstDoctor set DoctorName='" + doctorName + "',DoctorSpeciality = '" + doctorSpeciality + "',DOB= '" + doctorDOB + "',Gender= '" + doctorGender + "',  " +
                                "DoctorDescription='" + doctorDescription + "',DoctorEmail= '" + doctorEmail + "',DoctorPhone= '" + doctorPhone + "',DoctorAadhar= '" + doctorAadhar + "'," +
                                " DoctorAddress= '" + doctorAddress + "', DoctorAchmntOption1 = '" + doctorAchmntOption1 + "', DoctorAchmntOption2 = '" + doctorAchmntOption2 + "', DoctorAchmntOption3 = '" + doctorAchmntOption3 + "', DoctorAchmntOption4 = '" + doctorAchmntOption4 + "',DoctorProfileImg ='" + profileimgname + "',DoctorAchmntUpload1 ='" + uploadimg1name + "' where DoctorCode= '" + doctorCode + "' ";
            }
            if (imgflag2 == 1 && imgflag3 == 1)
            {
                querystring = "update MstDoctor set DoctorName='" + doctorName + "',DoctorSpeciality = '" + doctorSpeciality + "',DOB= '" + doctorDOB + "',Gender= '" + doctorGender + "',  " +
                                "DoctorDescription='" + doctorDescription + "',DoctorEmail= '" + doctorEmail + "',DoctorPhone= '" + doctorPhone + "',DoctorAadhar= '" + doctorAadhar + "'," +
                                " DoctorAddress= '" + doctorAddress + "', DoctorAchmntOption1 = '" + doctorAchmntOption1 + "', DoctorAchmntOption2 = '" + doctorAchmntOption2 + "', DoctorAchmntOption3 = '" + doctorAchmntOption3 + "', DoctorAchmntOption4 = '" + doctorAchmntOption4 + "',DoctorProfileImg ='" + profileimgname + "',DoctorAchmntUpload2 ='" + uploadimg2name + "' where DoctorCode= '" + doctorCode + "' ";
            }

            if (imgflag2 == 1 && imgflag3 == 1 && imgflag1 == 1)
            {
                querystring = "update MstDoctor set DoctorName='" + doctorName + "',DoctorSpeciality = '" + doctorSpeciality + "',DOB= '" + doctorDOB + "',Gender= '" + doctorGender + "',  " +
                                "DoctorDescription='" + doctorDescription + "',DoctorEmail= '" + doctorEmail + "',DoctorPhone= '" + doctorPhone + "',DoctorAadhar= '" + doctorAadhar + "'," +
                                " DoctorAddress= '" + doctorAddress + "', DoctorAchmntOption1 = '" + doctorAchmntOption1 + "', DoctorAchmntOption2 = '" + doctorAchmntOption2 + "', DoctorAchmntOption3 = '" + doctorAchmntOption3 + "', DoctorAchmntOption4 = '" + doctorAchmntOption4 + "',DoctorProfileImg ='" + profileimgname + "',DoctorAchmntUpload2 ='" + uploadimg2name + "',DoctorAchmntUpload1 ='" + uploadimg1name + "' where DoctorCode= '" + doctorCode + "' ";
            }

            if(imgflag2 == 0 && imgflag3 == 0 && imgflag1 == 0)
            {
                querystring = "update MstDoctor set DoctorName='" + doctorName + "',DoctorSpeciality = '" + doctorSpeciality + "',DOB= '" + doctorDOB + "',Gender= '" + doctorGender + "',  " +
                                "DoctorDescription='" + doctorDescription + "',DoctorEmail= '" + doctorEmail + "',DoctorPhone= '" + doctorPhone + "',DoctorAadhar= '" + doctorAadhar + "'," +
                                " DoctorAddress= '" + doctorAddress + "', DoctorAchmntOption1 = '" + doctorAchmntOption1 + "', DoctorAchmntOption2 = '" + doctorAchmntOption2 + "', DoctorAchmntOption3 = '" + doctorAchmntOption3 + "', DoctorAchmntOption4 = '" + doctorAchmntOption4 + "' where DoctorCode= '" + doctorCode + "' ";
            }

            SqlConnection connection = new SqlConnection(connectionString);
            try
            {
             
                connection.Open();
                SqlCommand command = new SqlCommand(querystring, connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }
            return valid;
        }

        [WebMethod]

        public List<Doctor> GetAllDoctorDetails()
        {
            var doctors = new List<Doctor>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select top 15 * from MstDoctor where Enabled='Y' order by DoctorName asc", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var doctordata = new Doctor();
                doctordata.doctorCode = rdr.GetString(0);
                doctordata.doctorName = rdr.GetString(1);
                doctordata.doctorSpeciality = rdr.GetString(2);
                doctordata.doctorAddress = rdr.GetString(11);
                doctordata.doctorPhone = rdr.GetString(7);
                if (!rdr.IsDBNull(rdr.GetOrdinal("DoctorProfileImg"))) { doctordata.doctorProfileImage = rdr.GetString(10); } else { doctordata.doctorProfileImage = ""; }

                doctors.Add(doctordata);
            }

            connection.Close();


            return doctors;
        }

        [WebMethod]
        public Doctor getDoctorById(Doctor doctor)
        {
            var doctorData = new Doctor();


            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstDoctor where DoctorCode=@DoctorCode and Enabled='Y' ", connection);
            readcommand.Parameters.AddWithValue("@DoctorCode", doctor.doctorCode);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {

                doctorData.doctorCode = rdr.GetString(0);
                doctorData.doctorName = rdr.GetString(1);
                doctorData.doctorGender = rdr.GetString(4);
                doctorData.DOB = rdr.GetDateTime(3).ToString("dd/MM/yyyy");
                doctorData.doctorProfileImage = rdr.GetString(10);
                doctorData.doctorDescription = rdr.GetString(5);
                doctorData.doctorEmail = rdr.GetString(6);
                doctorData.doctorPhone = rdr.GetString(7);
                doctorData.doctorAddress = rdr.GetString(11);
                doctorData.doctorAadhar = rdr.GetString(8);
                doctorData.doctorSpeciality = rdr.GetString(2);
                doctorData.doctorAchmntOption1 = rdr.GetString(12);
                doctorData.doctorAchmntOption2 = rdr.GetString(13);
                doctorData.doctorAchmntOption3 = rdr.GetString(14);
                doctorData.doctorAchmntOption4 = rdr.GetString(15);
                doctorData.doctorAchmntUpload1 = rdr.GetString(16);
                doctorData.doctorAchmntUpload2 = rdr.GetString(17);
            }

            connection.Close();

            return doctorData;
        }

        [WebMethod]
        public List<Doctor> getDoctorDetailsByName(string term)
        {
            var doctorList = new List<Doctor>();


            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstDoctor  where DoctorName like '%" + term + "%'", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var doctordata = new Doctor();
                doctordata.doctorCode = rdr.GetString(0);
                doctordata.doctorName = rdr.GetString(1);
                doctorList.Add(doctordata);

            }

            connection.Close();

            return doctorList;
        }
        [WebMethod]
        public string deleteDoctor(Doctor doctor)
        {
            string valid = "false";

            SqlConnection connection = new SqlConnection(connectionString);
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update MstDoctor set Enabled='N' where DoctorCode = '" + doctor.doctorCode + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public List<Service> getAllServiceListDetails()
        {
            var serviceList = new List<Service>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstService where Enabled ='Y' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var servicedata = new Service();
                servicedata.serviceCode = rdr.GetInt64(0);
                servicedata.serviceName= rdr.GetString(1);
                servicedata.serviceCharge = rdr.GetDecimal(2);
                servicedata.serviceGst = rdr.GetInt32(3);
                
                serviceList.Add(servicedata);
            }

            connection.Close();


            return serviceList;
        }

        [WebMethod]
        public Service editServiceById(Service service)
        {
            var servicedata = new Service();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstService where ServiceCode=@ServiceCode ", connection);
            readcommand.Parameters.AddWithValue("@ServiceCode", service.serviceCode);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                
                servicedata.serviceCode = rdr.GetInt64(0);
                servicedata.serviceName = rdr.GetString(1);
                servicedata.serviceCharge = rdr.GetDecimal(2);
                servicedata.serviceGst = rdr.GetInt32(3);

                
            }

            connection.Close();


            return servicedata;


        }

        [WebMethod]
        public string updateService(Service service)
        {
            string valid = "false";

            SqlConnection connection = new SqlConnection(connectionString);
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update MstService set ServiceName='"+service.serviceName+"', ServiceCharge= '"+service.serviceCharge+"', ServiceGst= '"+service.serviceGst+"' where ServiceCode = '"+service.serviceCode+"' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }
            return valid;
        }

        [WebMethod]
        public string saveNewService()
        {
            string valid = "false";

            string serviceCode = HttpContext.Current.Request.Form.Get("serviceCode");
            string serviceName = HttpContext.Current.Request.Form.Get("serviceName");
            string serviceCharge =  HttpContext.Current.Request.Form.Get("serviceCharge");
            string serviceGst = HttpContext.Current.Request.Form.Get("serviceGst");
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("insert into MstService(ServiceName,ServiceCharge,ServiceGst,Enabled) values('" + serviceName + "','" + serviceCharge + "','" + serviceGst + "','Y')");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public string deleteService(Service service)
        {
            string valid = "false";

            SqlConnection connection = new SqlConnection(connectionString);
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update MstService set Enabled='N' where ServiceCode = '" + service.serviceCode + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public Invoice generateInvoiceNumber()
        {
            var invoicedata = new Invoice();
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();

            SqlCommand readcommand = new SqlCommand("select top 1 InvoiceId from InvoiceDetails order by InvoiceId desc ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                int id = int.Parse(rdr.GetString(0));
                id = id + 1;
                invoicedata.invoiceId = id.ToString() ;

            }

            connection.Close();

            return invoicedata;
        }

        [WebMethod]
        public string saveInvoiceData(Invoice invoice)
        {

            string valid = "false";
            long trnid = 0;
            var invoiceData = new Invoice();
     
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();

            SqlCommand readcommand2 = new SqlCommand("select top 1 TranscationId from MstTranscation order by TranscationId desc ", connection);
            connection.Open();
            SqlDataReader rdr2 = readcommand2.ExecuteReader();
            while (rdr2.Read())
            {

                trnid = rdr2.GetInt64(0);

            }

            connection.Close();

            trnid = trnid + 1;

            for (int i = 0; i < invoice.serviceData.Length; i++)
            {
                try
                {
                    connection.Open();
                    command.CommandText = ("insert into InvoiceDetails(InvoiceId,quantity,charges,gstamount,serviceCode,serviceDescription,patientCode,rowTotal,serviceDate) values('" + invoice.invoiceId + "','" + invoice.serviceData[i][1] + "','" + invoice.serviceData[i][2] + "','"+ invoice.serviceData[i][3] + "','"+ invoice.serviceData[i][0] + "','" + invoice.serviceData[i][4] + "','" + invoice.patientCode + "','" + invoice.serviceData[i][5] + "','" + invoice.serviceData[i][6] + "')");
                    command.ExecuteNonQuery();

                }
                finally
                {
                    connection.Close();
                }
            }

            try
            {
                connection.Open();
                command.CommandText = ("insert into Invoice(InvoiceId,InvoiceDate,subtotal,gsttotal,totalamount,patientCode,TranscationId,doctorCode) values('" + invoice.invoiceId + "','" + invoice.invoiceDate + "','" + invoice.subTotal + "','" + invoice.gstTotal + "','" + invoice.totalAmount + "','" + invoice.patientCode + "','"+trnid+ "','" + invoice.doctorCode + "')");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            try
            {
                connection.Open();
                command.CommandText = ("insert into MstTranscation(TranscationId,DrAmount,CrAmount,PatientCode,doctorCode) values('" + trnid + "','" + invoice.totalAmount + "','0','" + invoice.patientCode + "','" + invoice.doctorCode + "')");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }


            return valid;
        }

        [WebMethod] public String deleteInvoiceByInvoiceId(String invoiceId)
        {
            String valid = "false";
            long transcationId = 0;
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();


            SqlCommand readcommand2 = new SqlCommand(" select TranscationId from Invoice where InvoiceId = '" + invoiceId + "' ", connection);
            connection.Open();
            SqlDataReader rdr2 = readcommand2.ExecuteReader();
            while (rdr2.Read())
            {

                transcationId = rdr2.GetInt64(0);

            }

            connection.Close();


            try
            {
                connection.Open();
                command.CommandText = ("delete from Invoice where InvoiceId='"+invoiceId+"' ");
                command.ExecuteNonQuery();
                valid = "true";
            }
            catch (Exception)
            {
                valid = "false";
            }
            finally
            {
                connection.Close();
            }

            try
            {
                connection.Open();
                command.CommandText = ("delete from MstTranscation where TranscationId='" + transcationId + "' ");
                command.ExecuteNonQuery();
                valid = "true";
            }
            catch (Exception)
            {
                valid = "false";
            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public List<Invoice> getPatientInvoices(Invoice invoice)
        {
            var invoiceList = new List<Invoice>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select i.*,p.PatientName from Invoice as i , MstPatient_Info as p where i.patientCode=@patientCode and i.patientCode = p.PatientCode ", connection);
            readcommand.Parameters.AddWithValue("@patientCode", invoice.patientCode);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var invoicedata = new Invoice();
                invoicedata.invoiceId = rdr.GetString(0);
                invoicedata.subTotal = rdr.GetInt64(2);
                invoicedata.gstTotal = rdr.GetInt64(3);
                invoicedata.totalAmount = rdr.GetInt64(4);
                invoicedata.invoiceDate = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                invoicedata.patientCode = rdr.GetString(5);
                invoicedata.patientName = rdr.GetString(8);
                invoiceList.Add(invoicedata);

            }

            connection.Close();
            
            return invoiceList;

        }

        [WebMethod]
        public List<Payment> getPatientPaymentsById(Payment payment)
        {
            var paymentList = new List<Payment>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstPayment where PatientCode=@PatientCode ", connection);
            readcommand.Parameters.AddWithValue("@PatientCode", payment.patientCode);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var paymentdata = new Payment();
                paymentdata.paymentId = rdr.GetInt64(0);
                paymentdata.patientName = rdr.GetString(2);
                paymentdata.paymentDate = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
               var temp = rdr.GetInt64(7);
                paymentdata.paymentTotal = temp + rdr.GetInt32(6);
                paymentList.Add(paymentdata);

            }

            connection.Close();

            return paymentList;

        }

        [WebMethod]
        public Invoice getPatientInvoicesByInvoiceNumber(Invoice invoice)
        {

            var invoicedata = new Invoice();
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select i.*,p.PatientName from Invoice as i , MstPatient_Info as p where i.InvoiceId=@invoiceId and i.patientCode = p.PatientCode ", connection);
            readcommand.Parameters.AddWithValue("@invoiceId", invoice.invoiceId);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
               
                invoicedata.invoiceId = rdr.GetString(0);
                invoicedata.subTotal = rdr.GetInt64(2);
                invoicedata.gstTotal = rdr.GetInt64(3);
                invoicedata.totalAmount = rdr.GetInt64(4);
                invoicedata.invoiceDate = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                invoicedata.patientCode = rdr.GetString(5);
                invoicedata.patientName = rdr.GetString(8);
              

            }

            connection.Close();

            return invoicedata;

        }

        [WebMethod]
        public List<Payment> getPatientPaymentList(string term)
        {

            var paymentList = new List<Payment>();
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select top 10 * from MstPayment where PaymentId > 1000000 and PaymentId  like '%"+term+"%' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var paymentdata = new Payment();
                paymentdata.paymentId = rdr.GetInt64(0);
                paymentdata.patientCode = rdr.GetString(3);
                paymentList.Add(paymentdata);
            }

            connection.Close();

            return paymentList;

        }
        [WebMethod]
        public Payment getPatientPaymentByNumber(Payment payment)
        {

            var paymentdata = new Payment();
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstPayment where PaymentId = '"+payment.paymentId+"' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                paymentdata.paymentId = rdr.GetInt64(0);
                paymentdata.paymentDate = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                paymentdata.patientName = rdr.GetString(2);
                paymentdata.patientCode = rdr.GetString(3);
                paymentdata.discountAmount = rdr.GetInt32(6);
                paymentdata.payableAmount = rdr.GetInt64(5);
                paymentdata.receivedAmount = rdr.GetInt64(7);
                paymentdata.paymentType = rdr.GetString(8);
                paymentdata.paymentDiscription = rdr.GetString(10);

            }

            connection.Close();

            return paymentdata;

        }

        [WebMethod]
        public List<Invoice> getInvoiceNumberList(string term)
        {
            var invoiceList = new List<Invoice>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from InvoiceDetails where InvoiceId like '%" + term + "%'", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var invoicedata = new Invoice();
                invoicedata.invoiceId = rdr.GetString(0);
                invoiceList.Add(invoicedata);

            }

            connection.Close();

            return invoiceList;

        }

        [WebMethod]
        public List<Invoice> getPatientInvoiceFullDetails(Invoice invoice)
        {
            var invoiceList = new List<Invoice>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from InvoiceDetails where InvoiceId= @InvoiceId and patientCode=@patientCode ", connection);
            readcommand.Parameters.AddWithValue("@InvoiceId", invoice.invoiceId);
            readcommand.Parameters.AddWithValue("@patientCode", invoice.patientCode);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var invoicedata = new Invoice();
                invoicedata.invoiceId = rdr.GetString(0);
                invoicedata.invoiceQuantity = rdr.GetInt32(1);
                invoicedata.invoiceCharges = rdr.GetInt64(2);
                invoicedata.invoiceGst = rdr.GetInt64(3);
                invoicedata.invoiceServiceCode = rdr.GetString(4);
                invoicedata.invoiceDescription = rdr.GetString(5);
                invoicedata.patientCode = rdr.GetString(6);
                invoicedata.rowTotal = rdr.GetInt64(7);
                invoicedata.serviceDate = rdr.GetString(8);
                invoiceList.Add(invoicedata);

            }

            connection.Close();

            return invoiceList;
        }

        [WebMethod]
        public Invoice getPatientInvoicesById(Invoice invoice)
        {
            var invoicedata = new Invoice();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from Invoice where InvoiceId=@InvoiceId and patientCode=@patientCode ", connection);
            readcommand.Parameters.AddWithValue("@InvoiceId", invoice.invoiceId);
            readcommand.Parameters.AddWithValue("@patientCode", invoice.patientCode);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                
                invoicedata.invoiceId = rdr.GetString(0);
                invoicedata.subTotal = rdr.GetInt64(2);
                invoicedata.gstTotal = rdr.GetInt64(3);
                invoicedata.totalAmount = rdr.GetInt64(4);
                invoicedata.invoiceDate = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                invoicedata.patientCode = rdr.GetString(5);
                invoicedata.transcationId = rdr.GetInt64(6);

            }

            connection.Close();

            return invoicedata;

        }

        [WebMethod]
        public string updatePatientInvoice(Invoice invoice)
        {
            string valid = "false";
            DateTime today = DateTime.Now;
            SqlConnection connection = new SqlConnection(connectionString);
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" delete from InvoiceDetails where InvoiceId='" + invoice.invoiceId + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

           
            for (int i = 0; i < invoice.serviceData.Length; i++)
            {
              

                try
                {

                    connection.Open();
                    SqlCommand command = new SqlCommand("insert into InvoiceDetails(InvoiceId,quantity,charges,gstamount,serviceCode,serviceDescription,patientCode,rowTotal,serviceDate) values('" + invoice.invoiceId + "','" + invoice.serviceData[i][1] + "','" + invoice.serviceData[i][2] + "','" + invoice.serviceData[i][3] + "','" + invoice.serviceData[i][0] + "','" + invoice.serviceData[i][4] + "','" + invoice.patientCode + "','" + invoice.serviceData[i][5] + "','" + invoice.serviceData[i][6] + "') ", connection);
                    command.ExecuteNonQuery();

                }
                finally
                {
                    connection.Close();
                }
            }
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update Invoice set InvoiceDate='" + today + "', subtotal= '" + invoice.subTotal + "', gsttotal= '" + invoice.gstTotal + "',totalamount='" + invoice.totalAmount + "' where InvoiceId = '" + invoice.invoiceId + "'  ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update MstTranscation set DrAmount='" + invoice.totalAmount + "' where TranscationId = '" + invoice.transcationId + "'  ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public Payment getPayableAmount(Patient patient)
        {
            var invoicedata = new Payment();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select (SUM(DrAmount)-SUM(CrAmount)) as payableAmount from MstTranscation where  PatientCode =@PatientCode group by PatientCode ", connection);
            readcommand.Parameters.AddWithValue("@patientCode", patient.patientCode);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            if(rdr.HasRows)
            {
                rdr.Read();
                invoicedata.payableAmount = rdr.GetInt64(0);
                
            }

            connection.Close();

            return invoicedata;
        }

        [WebMethod]
        public Payment generatePaymentNumber()
        {
            var paymentdata = new Payment();
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();

            SqlCommand readcommand = new SqlCommand("select top 1 PaymentId from MstPayment order by PaymentId desc ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {

                paymentdata.paymentId = rdr.GetInt64(0)+1;

            }

            connection.Close();

            return paymentdata;
        }

        [WebMethod]
        public string savePaymentData(Payment payment)
        {
            string valid = "false";
            long transcationId =0;

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();

            
            SqlCommand readcommand2 = new SqlCommand("select top 1 TranscationId from MstTranscation order by TranscationId desc ", connection);
            connection.Open();
            SqlDataReader rdr2 = readcommand2.ExecuteReader();
            while (rdr2.Read())
            {

                transcationId = rdr2.GetInt64(0);

            }

            connection.Close();

           
            transcationId = transcationId + 1;


            try
            {
                connection.Open();
                command.CommandText = ("insert into MstPayment(PaymentId,PaymentDate,PatientName,PatientCode,DoctorCode,PayableAmoun,DiscountGiven,ReceivedAmount,PaymentType,ReferenceNumber,PaymentDiscription) values('" + payment.paymentId + "','" + payment.paymentDate + "','" + payment.patientName + "','" + payment.patientCode + "','" + payment.doctorCode + "','" + payment.payableAmount + "','" + payment.discountAmount + "','" + payment.receivedAmount + "','"+payment.paymentType+"','"+payment.referenceNumber+"','"+payment.paymentDiscription + "')");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }


            var receivedTotalAmount = payment.discountAmount + payment.receivedAmount;

            try
            {
                connection.Open();
                command.CommandText = ("insert into MstTranscation(TranscationId,DrAmount,CrAmount,PatientCode,doctorCode) values('" + transcationId + "','0','" + receivedTotalAmount + "','" + payment.patientCode + "','"+payment.doctorCode+"')");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public List<Payment> getPaymentReportData()
        {
            var paymentList = new List<Payment>();
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database

            SqlCommand readcommand = new SqlCommand("select p.* from MstPayment as p where p.PaymentId > 1000000   order by PaymentId desc ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var paymentData = new Payment();
                paymentData.paymentId = rdr.GetInt64(0);
                paymentData.paymentDate = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                paymentData.patientName = rdr.GetString(2);
                paymentData.payableAmount = rdr.GetInt64(5);
                paymentData.discountAmount = rdr.GetInt32(6);
                paymentData.receivedAmount = rdr.GetInt64(7);
                paymentList.Add(paymentData);
            }

            connection.Close();

           

            return paymentList;
        }
        [WebMethod]
        public Payment getPaymentTotalAmount(Patient patient)
        {
            string query2 = "";
            var paymentData = new Payment();

            if ((patient.fromDate != DateTime.MinValue || patient.toDate != DateTime.MinValue) && patient.patientCode != null )
            {
                
                query2 = "select Sum(p.ReceivedAmount) from MstPayment as p where p.PatientCode='" + patient.patientCode + "' and p.PaymentDate between '" + patient.fromDate + "' and '" + patient.toDate + "'  group by p.PatientCode ";
            }
            if ((patient.fromDate != DateTime.MinValue || patient.toDate != DateTime.MinValue) && patient.patientCode == null )
            {

                query2 = "select Sum(p.ReceivedAmount) from MstPayment as p where  p.PaymentDate between '" + patient.fromDate + "' and '" + patient.toDate + "' ";
            }
   
            if ((patient.fromDate == DateTime.MinValue || patient.toDate == DateTime.MinValue) && patient.patientCode != null)
            {
              
                query2 = "select Sum(p.ReceivedAmount) from MstPayment as p where p.PatientCode='" + patient.patientCode + "'   group by p.PatientCode ";
            }
            if ((patient.fromDate == DateTime.MinValue || patient.toDate == DateTime.MinValue) && patient.patientCode == null )
            {
                
                query2 = "select Sum(p.ReceivedAmount) from MstPayment as p  where p.PaymentId > 1000000  ";
            }


            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand readcommand2 = new SqlCommand(query2, connection);
            connection.Open();
            SqlDataReader rdr2 = readcommand2.ExecuteReader();
            while (rdr2.Read())
            {

                paymentData.paymentTotal = rdr2.GetInt64(0);
               
            }

            connection.Close();

            return paymentData;
        }

        [WebMethod]
        public List<Payment> getPaymentReportByPatientId(Patient patient)
        {
            var paymentList = new List<Payment>();
           
            SqlConnection connection = new SqlConnection(connectionString);
            string query = "";
            if( (patient.fromDate != DateTime.MinValue || patient.toDate != DateTime.MinValue) && patient.patientCode != null  )
            {
                query = "select p.*, (p.PayableAmoun - p.ReceivedAmount) from MstPayment as p  where p.PatientCode='"+patient.patientCode+"'  and p.PaymentDate between '"+patient.fromDate+"' and '"+patient.toDate+ "'  order by p.PatientCode,p.PaymentDate  asc ";

            }
            if ((patient.fromDate != DateTime.MinValue || patient.toDate != DateTime.MinValue) && patient.patientCode == null )
            {
                query = "select p.*,(p.PayableAmoun - p.ReceivedAmount) from MstPayment as p where  p.PaymentDate between '" + patient.fromDate + "' and '" + patient.toDate + "'  order by p.PaymentDate  asc ";

            }
            
            if ((patient.fromDate == DateTime.MinValue || patient.toDate == DateTime.MinValue) && patient.patientCode != null )
            {
                query = "select p.*, (p.PayableAmoun - p.ReceivedAmount) from MstPayment as p where p.PatientCode='" + patient.patientCode + "'  order by p.PatientCode asc ";

                
            }
            if ((patient.fromDate == DateTime.MinValue || patient.toDate == DateTime.MinValue) && patient.patientCode == null )
            {
                query = "select p.*, (p.PayableAmoun - p.ReceivedAmount) from MstPayment as p where p.PaymentId > 1000000   order by PatientCode desc  ";

               
            }

            // Read CURID and customerCode from database

            SqlCommand readcommand = new SqlCommand(query, connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var paymentData = new Payment();
                paymentData.paymentId = rdr.GetInt64(0);
                paymentData.paymentDate = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                paymentData.patientName = rdr.GetString(2);
                paymentData.payableAmount = rdr.GetInt64(5);
                paymentData.discountAmount = rdr.GetInt32(6);
                paymentData.receivedAmount = rdr.GetInt64(7);
                paymentData.pendingAmount = rdr.GetInt64(11);
                paymentList.Add(paymentData);
            }

            connection.Close();

            return paymentList;
        }
        [WebMethod]
        public Payment getSalesTotalAmount(Invoice invoice)
        {
            var paymentData = new Payment();

            SqlConnection connection = new SqlConnection(connectionString);
            string query = "";
            if ((invoice.fromDate != DateTime.MinValue || invoice.toDate != DateTime.MinValue) && invoice.patientCode != null && invoice.doctorCode != null)
            {
                query = "select SUM(i.totalamount) from Invoice as i where i.patientCode='"+invoice.patientCode+ "' and InvoiceDate between '" + invoice.fromDate + "' and '" + invoice.toDate + "' and i.doctorCode='" + invoice.doctorCode+ "' group by i.patientCode ";
            }
            if ((invoice.fromDate != DateTime.MinValue || invoice.toDate != DateTime.MinValue) && invoice.patientCode == null && invoice.doctorCode == null)
            {
                query = "select SUM(i.totalamount) from Invoice as i where  InvoiceDate between '" + invoice.fromDate + "' and '" + invoice.toDate + "' ";
            }
            if ((invoice.fromDate != DateTime.MinValue || invoice.toDate != DateTime.MinValue) && invoice.patientCode == null && invoice.doctorCode != null)
            {
                query = "select SUM(i.totalamount) from Invoice as i where InvoiceDate between '" + invoice.fromDate + "' and '" + invoice.toDate + "' and i.doctorCode='" + invoice.doctorCode + "' group by i.doctorCode ";
            }
            if ((invoice.fromDate != DateTime.MinValue || invoice.toDate != DateTime.MinValue) && invoice.patientCode != null && invoice.doctorCode == null)
            {
                query = "select SUM(i.totalamount) from Invoice as i where InvoiceDate between '" + invoice.fromDate + "' and '" + invoice.toDate + "'  group by i.patientCode ";
            }
            if ((invoice.fromDate == DateTime.MinValue || invoice.toDate == DateTime.MinValue) && invoice.patientCode != null && invoice.doctorCode != null)
            {
                query = "select SUM(i.totalamount) from Invoice as i where i.patientCode='" + invoice.patientCode + "' and i.doctorCode='" + invoice.doctorCode + "' group by i.patientCode ";
            }
            if ((invoice.fromDate == DateTime.MinValue || invoice.toDate == DateTime.MinValue) && invoice.patientCode != null && invoice.doctorCode == null)
            {
                query = "select SUM(i.totalamount) from Invoice as i where i.patientCode='" + invoice.patientCode + "'  group by i.patientCode ";
            }
            if ((invoice.fromDate == DateTime.MinValue || invoice.toDate == DateTime.MinValue) && invoice.patientCode == null && invoice.doctorCode != null)
            {
                query = "select SUM(i.totalamount) from Invoice as i where  i.doctorCode='" + invoice.doctorCode + "' group by i.doctorCode ";
            }
            if ((invoice.fromDate == DateTime.MinValue || invoice.toDate == DateTime.MinValue) && invoice.patientCode == null && invoice.doctorCode == null)
            {
                query = "select SUM(i.totalamount) from Invoice as i ";
            }

            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand(query, connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                paymentData.salesTotal = rdr.GetInt64(0);
               
            }

            connection.Close();

            return paymentData;
        }

        [WebMethod]
        public List<Invoice> getSalesReportData()
        {
            var invoiceList = new List<Invoice>();
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select i.*,p.PatientName,d.DoctorName from Invoice as i ,MstPatient_Info as p, MstDoctor as d where i.InvoiceId > 1000000 and i.patientCode = p.PatientCode and i.doctorCode = d.DoctorCode order by InvoiceId desc ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var invoiceData = new Invoice();
                invoiceData.invoiceId = rdr.GetString(0);
                invoiceData.invoiceDate = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                invoiceData.totalAmount = rdr.GetInt64(4);
                invoiceData.patientCode = rdr.GetString(5);
                invoiceData.patientName = rdr.GetString(8);
                invoiceData.doctorName = rdr.GetString(9);
                invoiceList.Add(invoiceData);
            }

            connection.Close();

          
            return invoiceList;
        }

        [WebMethod]
        public List<Invoice> getSalesReportByPatientId(Invoice invoice)
        {
            var invoiceList = new List<Invoice>();

            SqlConnection connection = new SqlConnection(connectionString);
            string query = "";
            if ((invoice.fromDate != DateTime.MinValue || invoice.toDate != DateTime.MinValue) && invoice.patientCode != null && invoice.doctorCode != null)
            {
                query = "select i.*,p.PatientName,d.DoctorName from Invoice as i ,MstPatient_Info as p,MstDoctor d where i.patientCode='" + invoice.patientCode + "'  and i.patientCode = p.PatientCode and InvoiceDate between '" + invoice.fromDate + "' and '" + invoice.toDate + "' and  d.DoctorCode='" + invoice.doctorCode+ "' and i.doctorCode = d.DoctorCode order by i.InvoiceDate,i.patientCode,i.doctorCode  asc ";
            }
            if ((invoice.fromDate != DateTime.MinValue || invoice.toDate != DateTime.MinValue) && invoice.patientCode == null && invoice.doctorCode == null)
            {
                query = "select i.*,p.PatientName,d.DoctorName from Invoice as i ,MstPatient_Info as p,MstDoctor d where  i.patientCode = p.PatientCode and InvoiceDate between '" + invoice.fromDate + "' and '" + invoice.toDate + "' and   i.doctorCode = d.DoctorCode order by InvoiceDate asc ";
            }
            if ((invoice.fromDate != DateTime.MinValue || invoice.toDate != DateTime.MinValue) && invoice.patientCode == null && invoice.doctorCode != null)
            {
                query = "select i.*,p.PatientName,d.DoctorName from Invoice as i ,MstPatient_Info as p,MstDoctor d where InvoiceDate between '" + invoice.fromDate + "' and '" + invoice.toDate + "' and i.patientCode = p.PatientCode and d.DoctorCode='" + invoice.doctorCode + "' and i.doctorCode = d.DoctorCode order by InvoiceDate,i.doctorCode asc";
            }
            if ((invoice.fromDate != DateTime.MinValue || invoice.toDate != DateTime.MinValue) && invoice.patientCode != null && invoice.doctorCode == null)
            {
                query = "select i.*,p.PatientName,d.DoctorName from Invoice as i ,MstPatient_Info as p,MstDoctor d where InvoiceDate between '" + invoice.fromDate + "' and '" + invoice.toDate + "' and i.patientCode='" + invoice.patientCode + "'  and i.patientCode = p.PatientCode and i.doctorCode = d.DoctorCode order by InvoiceDate, i.patientCode asc";
            }
            if ((invoice.fromDate == DateTime.MinValue || invoice.toDate == DateTime.MinValue) && invoice.patientCode != null && invoice.doctorCode != null )
            {
                query = "select i.*,p.PatientName,d.DoctorName from Invoice as i ,MstPatient_Info as p,MstDoctor d where i.patientCode='" + invoice.patientCode + "' and i.patientCode = p.PatientCode and d.DoctorCode='" + invoice.doctorCode + "' and i.doctorCode = d.DoctorCode order by InvoiceDate asc";
            }
            if ((invoice.fromDate == DateTime.MinValue || invoice.toDate == DateTime.MinValue) && invoice.patientCode != null && invoice.doctorCode == null)
            {
                query = "select i.*,p.PatientName,d.DoctorName from Invoice as i ,MstPatient_Info as p,MstDoctor d where i.patientCode='" + invoice.patientCode + "' and i.patientCode = p.PatientCode and i.doctorCode = d.DoctorCode order by InvoiceDate asc";
            }
            if ((invoice.fromDate == DateTime.MinValue || invoice.toDate == DateTime.MinValue) && invoice.patientCode == null && invoice.doctorCode != null)
            {
                query = "select i.*,p.PatientName,d.DoctorName from Invoice as i ,MstPatient_Info as p,MstDoctor d where  i.patientCode = p.PatientCode and d.DoctorCode='" + invoice.doctorCode + "' and i.doctorCode = d.DoctorCode order by InvoiceDate asc";
            }
            if ((invoice.fromDate == DateTime.MinValue || invoice.toDate == DateTime.MinValue) && invoice.patientCode == null && invoice.doctorCode == null)
            {
                query = "select i.*,p.PatientName,d.DoctorName from Invoice as i ,MstPatient_Info as p,MstDoctor d where i.InvoiceId > 1000000 and i.patientCode = p.PatientCode and i.doctorCode = d.DoctorCode order by InvoiceDate desc ";
            }

            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand(query, connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var invoiceData = new Invoice();
                invoiceData.invoiceId = rdr.GetString(0);
                invoiceData.invoiceDate = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                invoiceData.doctorName = rdr.GetString(9);
                invoiceData.patientName = rdr.GetString(8);
                invoiceData.totalAmount = rdr.GetInt64(4);
                invoiceList.Add(invoiceData);
            }

            connection.Close();

            return invoiceList;
        }

        [WebMethod]
        public List<Payment> getOutstandingReportData()
        {
            var paymentList = new List<Payment>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select Sum(t.DrAmount) as payableAmount,Sum(t.CrAmount) as receivedAmount,(Sum(t.DrAmount)-Sum(t.CrAmount)) as pendingAmount,t.PatientCode,p.PatientName from MstTranscation as t, MstPatient_Info as p where TranscationId > 1000000 and t.PatientCode= p.PatientCode  group by t.PatientCode,p.PatientName order by t.PatientCode asc", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var paymentData = new Payment();
                paymentData.payableAmount = rdr.GetInt64(0);
                paymentData.receivedAmount = rdr.GetInt64(1);
                paymentData.pendingAmount = rdr.GetInt64(2);
                paymentData.patientCode = rdr.GetString(3);
                paymentData.patientName = rdr.GetString(4);
                paymentList.Add(paymentData);
            }

            connection.Close();

            return paymentList;
        }
        [WebMethod]
        public Payment getOutstandingTotalAmount(Payment payment)
        {
            var paymentdata = new Payment();

            SqlConnection connection = new SqlConnection(connectionString);
            string query = "";

            if (payment.patientCode != "")
            {
                query = "select (Sum(t.DrAmount)-Sum(t.CrAmount)) from MstTranscation as t where t.PatientCode='" + payment.patientCode + "' group by t.PatientCode";
            }
            else
            {
                query = "select (Sum(t.DrAmount)-Sum(t.CrAmount)) from MstTranscation as t ";
            }

            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand(query, connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                paymentdata.outstandingTotal = rdr.GetInt64(0);
                
            }

            connection.Close();

            return paymentdata;
        }

        [WebMethod]
        public List<Payment> getOutstandingReportByPatientId(Payment payment)
        {
            var paymentList = new List<Payment>();

            SqlConnection connection = new SqlConnection(connectionString);
            string query = "";

            if(payment.patientCode != "" )
            {
                query = "select Sum(t.DrAmount) as payableAmount,Sum(t.CrAmount) as receivedAmount,(Sum(t.DrAmount)-Sum(t.CrAmount)) as pendingAmount,t.PatientCode,p.PatientName from MstTranscation as t, MstPatient_Info as p where TranscationId > 1000000 and t.PatientCode='"+payment.patientCode+"' and t.PatientCode= p.PatientCode group by t.PatientCode,p.PatientName";
            }
            else
            {
                query = "select Sum(t.DrAmount) as payableAmount,Sum(t.CrAmount) as receivedAmount,(Sum(t.DrAmount)-Sum(t.CrAmount)) as pendingAmount,t.PatientCode,p.PatientName from MstTranscation as t, MstPatient_Info as p where TranscationId > 1000000 and t.PatientCode= p.PatientCode  group by t.PatientCode,p.PatientName order by t.PatientCode";
            }

            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand(query, connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var paymentData = new Payment();
                paymentData.payableAmount = rdr.GetInt64(0);
                paymentData.receivedAmount = rdr.GetInt64(1);
                paymentData.pendingAmount = rdr.GetInt64(2);
                paymentData.patientCode = rdr.GetString(3);
                paymentData.patientName = rdr.GetString(4);
                paymentList.Add(paymentData);
            }

            connection.Close();

            return paymentList;
        }

        [WebMethod]
        public string sendPaymentReceiptMail(Payment payment)
        {
            
            var data = "";
            string patientEmail = "";

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select PatientEmail from MstPatient_Info where PatientCode='" + payment.patientCode+"' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
               
                patientEmail = rdr.GetString(0);
           
            }

            connection.Close();

            data += "<tr> " +
                "<td style='height: 40px; width: 40px; ' align='center'>1</td>" +
                "<td style='height: 40px; width: 100px; ' align='center'>" + payment.paymentDate + "</td>" +
                "<td style='height: 40px; width: 40px; ' align='center'>" + payment.payableAmount + "</td>" +
                "<td style='height: 40px; width: 40px; ' align='center'>" + payment.discountAmount + "</td>" +
                "<td style='height: 40px; width: 40px; ' align='center'>" + payment.paymentType + "</td>"+
                 "<td style='height: 40px; width: 40px; ' align='center'>" + payment.paymentDiscription + "</td></tr>";
     

            string htmlString = "<html lang='en'>" +
        "<head>" +
        "</head>" +
        "<body>" +
        "<div id='page-wrapper'>" +
        "<div class='container-fluid'>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<div class='white-box'>" +
        "<br><br> <br><br> <br><br>" +
         "<table style='width: 100%'>" +
        "<tr>" +
        "<td style ='width:10%' ><b><h3> Payment </h3></b></td>" +
        "<td style ='width:83%' align='center'><img src='plugins/images/Logo.jpg' width=130 height=100/> </td>" +
        "<td style ='width:15%' ><b><h3>#" + payment.paymentId + "</h3></b></td></tr> </table >" +
        "<hr>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<div class='pull-left'>" +
        "<table style = 'width:100%'>" +
        "<tr>" +
        "<td style ='width:15%'><address> <b><h3> Stridephysio </h3></b></address></td>" +
        "<td style ='width:55%' ></td>" +
        "<td style = 'width:20%' ><b><h3> " + payment.patientName + " </h3></b></td>" +
        "</tr>" +
        "<tr>" +
        "<td style = 'width:10%' ><address >#34, Kaveriyappa Layout," +
        "<br /> Millers Tank Bund Road," +
        "<br /> Vasantha Nagar, " +
        "<br /> (Opp to Mahaveer Jain Hospital)," +
        "<br /> Bengaluru - 560 052.</ address ></td>" +
        "<td style = 'width:60%' ></td>" +
        "<td style = 'width:20%' ><address> " + payment.patientAddress + " </address></td>" +
        "</tr>" +
        "<tr>" +
        "<td style = 'width:15%' ></td>" +
        "<td style = 'width:60%' ></td>" +
        "<td style = 'width:10%' ><b><h3> " + payment.paymentDate + " </ h3></b></td>" +
        "</tr>" +
        "</table>" +
        "</div>" +
        "</div>" +
        "<div class='col-md-12'>" +
        "<div class='table-responsive m-t-40'>" +
        "<br/><br/><br/><br/><table style=' border - collapse: collapse; width: 1000px; margin-left:2 %; margin - top:100px; ' cellpadding='0' cellspacing='0' border='1'>" +
        "<thead>" +
        "<tr style='height: 40px; width: 100%; margin: 0; '>" +
        " <th class='text-center'>#</th>" +
        "<th>Date</th>" +
        "<th>Due Amount</th>" +
        "<th>Discount</th>" +
        "<th>Payment Type</th>" +
         "<th>Payment Description</th>" +
        "</tr>" +
        " </thead>" +
        " <tbody>" +
          data +
        "</tbody>" +
        " </table>" +
        "</div>" +
        " </div>" +
        " <div class='col-md-12'>" +
        "<hr>" +
        "<table style = ' border-collapse: collapse; width:1000px;' cellpadding = '0' cellspacing = '0' border = '0' >" +
        "<tr>" +
        "<td style = 'height:40px; width:500px;' ></td>" +
        "<td style = 'height:40px; width:140px;' ><h3> Received Amount :</h3></td>" +
        "<td style = 'height:40px; width:40px;' align = 'center'><h3> " + payment.receivedAmount + "</h3 </td>" +
        "</tr>" +
        "</table>" +
        "<hr>" +
        "</div>" +
        "</div>" +
        " </div>" +
        " </div>" +
        "  </div>" +
        " </div>" +
        "</div>" +
        "</body></html>";

            string baseUrl = "file://C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/";
            string pdf_page_size = "A4";
            PdfPageSize pageSize = (PdfPageSize)Enum.Parse(typeof(PdfPageSize),
             pdf_page_size, true);
            
            string pdf_orientation = "Portrait";
            PdfPageOrientation pdfOrientation =
                (PdfPageOrientation)Enum.Parse(typeof(PdfPageOrientation),
                pdf_orientation, true);

            int webPageWidth = 1024;
            int webPageHeight = 0;

            HtmlToPdf converter = new HtmlToPdf();

            // set converter options
            converter.Options.PdfPageSize = pageSize;
            converter.Options.PdfPageOrientation = pdfOrientation;
            converter.Options.WebPageWidth = webPageWidth;
            converter.Options.WebPageHeight = webPageHeight;
            string sentmailstatus;
            try
            {
                // create a new pdf document converting an url
                PdfDocument doc = converter.ConvertHtmlString(htmlString, baseUrl);
                MemoryStream pdfStream = new MemoryStream();

                // save pdf document into a MemoryStream
                doc.Save(pdfStream);
                // reset stream position
                pdfStream.Position = 0;

                //get email settings

                string smtpUsername = "", smtpPassword = "", smtpPort = "", smtClient = "", senderEmailId = "";
                SqlCommand readcommand2 = new SqlCommand("select * from EmailSetting ", connection);
                connection.Open();
                SqlDataReader rdr2 = readcommand2.ExecuteReader();
                while (rdr2.Read())
                {
                    smtClient = rdr2.GetString(1);
                    smtpUsername = rdr2.GetString(2);
                    smtpPassword = rdr2.GetString(3);
                    smtpPort = rdr2.GetString(4);
                    senderEmailId = rdr2.GetString(5);

                }

                connection.Close();

                // create email message

                MailMessage mailMsg = new MailMessage();
                mailMsg.Subject = "Stride Payment Receipt";
                mailMsg.Body = "Greetings from Stride,<br/>Thank you for choosing Stride Physio<br/><br/> Please find your payment receipt attached below.<br/><br/><h6><i><b>Note*: This is an auto-generated mail from system, kindly do not reply.</b></i></h6><br/><br/>Thank you <br/>Stride Physio<br/>Phone : +91 9448760810<br/>Email : physiostride@gmail.com";
                mailMsg.From = new MailAddress(senderEmailId);
                mailMsg.Priority = MailPriority.High;
                mailMsg.Attachments.Add(new Attachment(pdfStream, "PaymentReceipt" + payment.paymentDate + ".pdf"));

                // send email
                mailMsg.To.Add(patientEmail);
                mailMsg.IsBodyHtml = true;

                SmtpClient smtpClient = new SmtpClient(smtClient);
                NetworkCredential networkCredential = new NetworkCredential();
                networkCredential.UserName = smtpUsername;
                networkCredential.Password = smtpPassword;
                smtpClient.Credentials = networkCredential;
                smtpClient.Port = Convert.ToInt32(smtpPort);
                smtpClient.EnableSsl = true;

                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

                smtpClient.Send(mailMsg);

                // close pdf document
                doc.Close();

                sentmailstatus = "true";
            }
            catch (Exception ex)
            {
                sentmailstatus = "false" + ex;
            }

            return sentmailstatus;
        }

        [WebMethod]
        public string sendInvoiceMailToPatient(Invoice invoice)
        {
            
            var data = "";
            var count = 0;


            for (var i = 0; i < invoice.serviceData.Length; i++)
            {
               
                data += "<tr> " +
                    "<td style='height: 40px; width: 40px; margin: 0; ' align='center'>" + ++count + "</td>" +
                    "<td style='height: 40px; width: 40px; margin: 0; ' align='center'>" + invoice.serviceData[i][8] + "</td>" +
                    "<td style='height: 40px; width: 40px; margin: 0; ' align='center'> "+invoice.serviceData[i][6] + "</td>" +
                    "<td style='height: 40px; width: 40px; margin: 0; ' align='center'>" + invoice.serviceData[i][4] + "</td>" +
                    "<td style='height: 40px; width: 40px; margin: 0; ' align='center'>" + invoice.serviceData[i][1] + "</td>" +
                    "<td style='height: 40px; width: 40px; margin: 0; ' align='center'>" + invoice.serviceData[i][2] + "</td>" +
                    "<td style='height: 40px; width: 40px; margin: 0; ' align='center'>" + invoice.serviceData[i][3] + "</td>" +
                    "<td style='height: 40px; width: 40px; margin: 0; ' align='center'>" + invoice.serviceData[i][5] + "</td></tr>";
            }
          
            var patientName = invoice.patientName;
            var subtotal = invoice.subTotal;
            var gsttotal = invoice.gstTotal;
            var totalAmount = invoice.totalAmount;

            string patientEmail = "";

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select PatientEmail from MstPatient_Info where PatientCode='" + invoice.patientCode + "' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {

                patientEmail = rdr.GetString(0);

            }

            connection.Close();

            string htmlString = "<html lang='en'>" +
        "<head>" +
        "</head>" +
        "<body>" +
        "<div id='page-wrapper'>" +
        "<div class='container-fluid'>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<div class='white-box'>" +
        "<br><br> <br><br> <br><br>" +
        "<table style='width: 100%'>"+
        "<tr>"+
        "<td style ='width:10%' ><b><h3> INVOICE </h3></b></td>"+
        "<td style ='width:83%'><img src='plugins/images/Logo.jpg' width=130 height=100/> </td>" +
        "<td style ='width:15%' ><b><h3>#"+invoice.invoiceId+"</h3></b></td></tr> </table >" + 
        "<hr>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<div class='pull-left'>" +
        "<table style = 'width:100%'>" +
        "<tr>" +
        "<td style ='width:15%'><address><b><h3> Stridephysio </h3></b></address></td>" +
        "<td style ='width:55%' ></td>" +
        "<td style = 'width:10%' ><b><h3> "+invoice.patientName+" </h3></b></td>" +
        "</tr>" +
        "<tr>" +
        "<td style = 'width:10%' ><address >#34, Kaveriyappa Layout," +
        "<br /> Millers Tank Bund Road," +
        "<br /> Vasantha Nagar, " +
        "<br /> (Opp to Mahaveer Jain Hospital)," +
        "<br /> Bengaluru - 560 052.</ address ></td>" +
        "<td style = 'width:60%' ></td>" +
        "<td style = 'width:10%' ><address> "+invoice.patientAddress+" </address></td>" +
        "</tr>" +
        "<tr>" +
        "<td style = 'width:15%' ></td>" +
        "<td style = 'width:60%' ></td>" +
        "<td style = 'width:10%' ><b><h3> "+invoice.invoiceDate+" </ h3></b></td>" +
        "</tr>" +
         "</tr>" +
        "<tr>" +
        "<td style = 'width:15%' >Doctor:</td>" +
        "<td style = 'width:60%' ></td>" +
        "<td style = 'width:10%' ></td>" +
        "</tr>" +
        "<tr>" +
        "<td style = 'width:15%' >"+invoice.doctorName+"</td>" +
        "<td style = 'width:60%' ></td>" +
        "<td style = 'width:10%' ></td>" +
        "</tr>" +
        "</table>" +
        "</div>" +
        "</div>" +
        "<div class='col-md-12'>" +
        "<div class='table-responsive m-t-40'>" +
        "<br/><br/><br/><br/><table style=' border - collapse: collapse; width: 1000px; margin - left:2 %; margin - top:100px; ' cellpadding='0' cellspacing='0' border='1'>" +
        "<thead>" +
        "<tr style='height: 40px; width: 100 %; margin: 0; '>" +
        " <th class='text-center'>#</th>" +
        "<th>Item Name</th>" +
        "<th>Date</th>"+
        "<th >Description</th>" +
        "<th >Quantity</th>" +
        "<th>Charges</th>" +
        "<th>Gst</th>" +
        " <th>Total</th>" +
        "</tr>" +
        " </thead>" +
        " <tbody>" +
          data +
        "</tbody>" +
        " </table>" +
        "</div>" +
        " </div>" +
        " <div class='col-md-12'>" +
        "<table style = ' border-collapse: collapse; width:1000px;' cellpadding = '0' cellspacing = '0' border = '0' >"+
        "<tr>"+
        "<td style = 'height:40px; width:400px;' ></td>" +    
        "<td style = 'height:40px; width:100px;' > Sub - Total amount:</td>" +           
        "<td style = 'height:40px; width:40px;' align = 'center' > "+subtotal+" </td>" +            
        "</tr>" +
        "<tr> " +            
        "<td style = 'height:40px; width:400px;' ></td>"+               
        "<td style = 'height:40px; width:100px;' > GST :</td>"+                    
        "<td style = 'height:40px; width:40px;' align = 'center'> "+gsttotal+" </td>"+                       
        "</tr>"+                       
        "</table>"+
        "<hr>" +                     
        "<table style = ' border-collapse: collapse; width:800px;' cellpadding = '0' cellspacing = '0' border = '0' >"+                             
        "<tr>"+                            
        "<td style = 'height:40px; width:500px;' ></td>"+                              
        "<td style = 'height:40px; width:140px;' ><h3> Total :</h3></td>"+                                     
        "<td style = 'height:40px; width:40px;' align = 'center'><h3> "+totalAmount+"</h3 </td>"+
        "</tr>"+                                       
        "</table>"+                                        
        "<hr>"+
        "</div>" +
        "</div>" +
        " </div>" +
        " </div>" +
        "  </div>" +
        " </div>" +
        "</div>" +
        "</body></html>";

            string baseUrl = "file://C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/";
            string pdf_page_size = "A4";
            PdfPageSize pageSize = (PdfPageSize)Enum.Parse(typeof(PdfPageSize),
             pdf_page_size, true);

            string pdf_orientation = "Portrait";
            PdfPageOrientation pdfOrientation =
                (PdfPageOrientation)Enum.Parse(typeof(PdfPageOrientation),
                pdf_orientation, true);

            int webPageWidth = 1024;
            int webPageHeight = 0;
            
            HtmlToPdf converter = new HtmlToPdf();

            // set converter options
            converter.Options.PdfPageSize = pageSize;
            converter.Options.PdfPageOrientation = pdfOrientation;
            converter.Options.WebPageWidth = webPageWidth;
            converter.Options.WebPageHeight = webPageHeight;
            string sentmailstatus;
            try
            {
                // create a new pdf document converting an url
                PdfDocument doc = converter.ConvertHtmlString(htmlString, baseUrl);
                MemoryStream pdfStream = new MemoryStream();

                // save pdf document into a MemoryStream
                doc.Save(pdfStream);
                // reset stream position
                pdfStream.Position = 0;


                //get email settings

                string smtpUsername = "", smtpPassword = "", smtpPort = "", smtClient = "", senderEmailId = "";
                SqlCommand readcommand2 = new SqlCommand("select * from EmailSetting ", connection);
                connection.Open();
                SqlDataReader rdr2 = readcommand2.ExecuteReader();
                while (rdr2.Read())
                {
                    smtClient = rdr2.GetString(1);
                    smtpUsername = rdr2.GetString(2);
                    smtpPassword = rdr2.GetString(3);
                    smtpPort = rdr2.GetString(4);
                    senderEmailId = rdr2.GetString(5);

                }

                connection.Close();
                // create email message

                MailMessage mailMsg = new MailMessage();
                mailMsg.Subject = "Stride Invoice";
                mailMsg.Body = "Greetings from Stride,<br/>Thank you for choosing Stride Physio<br/><br/> Please find your invoice attached below.<br/><br/><h6><i><b>Note*: This is an auto-generated mail from system, kindly do not reply.</b></i></h6><br/><br/>Thank you <br/>Stride Physio<br/>Phone : +91 9448760810<br/>Email : physiostride@gmail.com";
                mailMsg.From = new MailAddress(senderEmailId);
                mailMsg.Priority = MailPriority.High;
                mailMsg.Attachments.Add(new Attachment(pdfStream, "Invoice_" + invoice.invoiceDate+ ".pdf"));

                // send email
                mailMsg.To.Add(patientEmail);
                mailMsg.IsBodyHtml = true;

                SmtpClient smtpClient = new SmtpClient(smtClient);
                NetworkCredential networkCredential = new NetworkCredential();
                networkCredential.UserName = smtpUsername;
                networkCredential.Password = smtpPassword;
                smtpClient.Credentials = networkCredential;
                smtpClient.Port = Convert.ToInt32(smtpPort);
                smtpClient.EnableSsl = true;

                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

                smtpClient.Send(mailMsg);

                // close pdf document
                doc.Close();

                sentmailstatus = "true";
            }
            catch (Exception ex)
            {
                sentmailstatus = "false" +ex;
            }

            return sentmailstatus;

        }

        [WebMethod]
        public List<BalanceAmount> patientBalanceAmountById(Patient patient)
        {
            var balanceList = new List<BalanceAmount>();

            SqlConnection connection = new SqlConnection(connectionString);
            string query = "select i.InvoiceDate as date,'Invoice' as type ,i.totalamount as invoiceAmount,'' as paidAmount from Invoice as i where i.patientCode = '"+ patient.patientCode+"' " +
                "union All select p.PaymentDate as date,'Payment' as type,'' as invoiceAmount,p.ReceivedAmount as paidAmount  from MstPayment as p where p.PatientCode = '" + patient.patientCode + "' order by date";
            

            // Read CURID and customerCode from database

            SqlCommand readcommand = new SqlCommand(query, connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var balanceData = new BalanceAmount();

                balanceData.date = rdr.GetDateTime(0).ToString("dd/MM/yyyy");
                balanceData.pamentType = rdr.GetString(1);
                balanceData.invoiceAmount = rdr.GetInt64(2);
                balanceData.paidAmount = rdr.GetInt64(3);
                
                balanceList.Add(balanceData);
            }

            connection.Close();

            return balanceList;
        }


        [WebMethod]
        public String sendOutstandingMailByPatientId(Payment payment)
        {
            var data = "";
            var count = 0;


            for (var i = 0; i < payment.paymentDetails.Length; i++)
            {

                data += "<tr> " +

                    "<td style='height: 40px; width: 40px; margin: 0; ' align='center'>" + payment.paymentDetails[i][0] + "</td>" +
                    "<td style='height: 40px; width: 40px; margin: 0; ' align='center'> " + payment.paymentDetails[i][1] + "</td>" +
                    "<td style='height: 40px; width: 40px; margin: 0; ' align='center'>" + payment.paymentDetails[i][2] + "</td>" +
                    "<td style='height: 40px; width: 40px; margin: 0; ' align='center'>" + payment.paymentDetails[i][3] + "</td>" +
                    "</tr>";
            }

            var patientName = payment.patientName;
            var totalAmount = payment.pendingAmount;

            string patientEmail = "";

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select PatientEmail from MstPatient_Info where PatientCode='" + payment.patientCode + "' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {

                patientEmail = rdr.GetString(0);

            }

            connection.Close();

            string htmlString = "<html lang='en'>" +
        "<head>" +
        "</head>" +
        "<body>" +
        "<div id='page-wrapper'>" +
        "<div class='container-fluid'>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<div class='white-box'>" +
        "<br><br> <br><br> <br><br>" +
        "<table style='width: 100%'>" +
        "<tr>" +
        "<td style ='width:10%' ><b><h3> Payments </h3></b></td>" +
        "<td style ='width:83%'><img src='plugins/images/Logo.jpg' width=130 height=100/> </td>" +
        "<td style ='width:15%' ><b><h3></h3></b></td></tr> </table >" +
        "<hr>" +
        "<div class='row'>" +
        "<div class='col-md-12'>" +
        "<div class='pull-left'>" +
        "<table style = 'width:100%'>" +
        "<tr>" +
        "<td style ='width:15%'><address><b><h3> Stridephysio </h3></b></address></td>" +
        "<td style ='width:55%' ></td>" +
        "<td style = 'width:10%' ><b><h3> " + payment.patientName + " </h3></b></td>" +
        "</tr>" +
        "<tr>" +
        "<td style = 'width:10%' ><address >#34, Kaveriyappa Layout," +
        "<br /> Millers Tank Bund Road," +
        "<br /> Vasantha Nagar, " +
        "<br /> (Opp to Mahaveer Jain Hospital)," +
        "<br /> Bengaluru - 560 052.</ address ></td>" +
        "<td style = 'width:60%' ></td>" +
        "<td style = 'width:10%' ><address>" + payment.patientAddress + " </address></td>" +
        "</tr>" +
        "<tr>" +
        "<td style = 'width:15%' ></td>" +
        "<td style = 'width:60%' ></td>" +
        "<td style = 'width:10%' ><b><h3> " + payment.paymentDate + " </ h3></b></td>" +
        "</tr>" +
         "</tr>" +
        "<tr>" +
        "<td style = 'width:15%' ></td>" +
        "<td style = 'width:60%' ></td>" +
        "<td style = 'width:10%' ></td>" +
        "</tr>" +
        "<tr>" +
        "<td style = 'width:15%' ></td>" +
        "<td style = 'width:60%' ></td>" +
        "<td style = 'width:10%' ></td>" +
        "</tr>" +
        "</table>" +
        "</div>" +
        "</div>" +
        "<div class='col-md-12'>" +
        "<div class='table-responsive m-t-40'>" +
        "<br/><br/><br/><br/><table style=' border - collapse: collapse; width: 1000px; margin - left:2 %; margin - top:100px; ' cellpadding='0' cellspacing='0' border='1'>" +
        "<thead>" +
        "<tr style='height: 40px; width: 100 %; margin: 0; '>" +
        "<th style = 'width:25%' >Date</th>" +
        "<th style = 'width:25%'>Type</th>" +
        "<th style = 'width:25%'>Invoice Amount</th>" +
        "<th style = 'width:25%'>Paid Amount</th>" +
        "</tr>" +
        " </thead>" +
        " <tbody>" +
          data +
        "</tbody>" +
        " </table>" +
        "</div>" +
        " </div>" +
        " <div class='col-md-12'>" +
        "<hr>" +
        "<table style = ' border-collapse: collapse; width:800px;' cellpadding = '0' cellspacing = '0' border = '0' >" +
        "<tr>" +
        "<td style = 'height:40px; width:500px;' ></td>" +
        "<td style = 'height:40px; width:140px;' ><h3> Balance Amount :</h3></td>" +
        "<td style = 'height:40px; width:40px;' align = 'center'><h3> " + totalAmount + "</h3 </td>" +
        "</tr>" +
        "</table>" +
        "<hr>" +
        "</div>" +
        "</div>" +
        " </div>" +
        " </div>" +
        "  </div>" +
        " </div>" +
        "</div>" +
        "</body></html>";

            string baseUrl = "file://C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/";
            string pdf_page_size = "A4";
            PdfPageSize pageSize = (PdfPageSize)Enum.Parse(typeof(PdfPageSize),
             pdf_page_size, true);

            string pdf_orientation = "Portrait";
            PdfPageOrientation pdfOrientation =
                (PdfPageOrientation)Enum.Parse(typeof(PdfPageOrientation),
                pdf_orientation, true);

            int webPageWidth = 1024;
            int webPageHeight = 0;

            HtmlToPdf converter = new HtmlToPdf();

            // set converter options
            converter.Options.PdfPageSize = pageSize;
            converter.Options.PdfPageOrientation = pdfOrientation;
            converter.Options.WebPageWidth = webPageWidth;
            converter.Options.WebPageHeight = webPageHeight;
            string sentmailstatus;
            try
            {
                // create a new pdf document converting an url
                PdfDocument doc = converter.ConvertHtmlString(htmlString, baseUrl);
                MemoryStream pdfStream = new MemoryStream();

                // save pdf document into a MemoryStream
                doc.Save(pdfStream);
                // reset stream position
                pdfStream.Position = 0;


                //get email settings

                string smtpUsername = "", smtpPassword = "", smtpPort = "", smtClient = "", senderEmailId = "";
                SqlCommand readcommand2 = new SqlCommand("select * from EmailSetting ", connection);
                connection.Open();
                SqlDataReader rdr2 = readcommand2.ExecuteReader();
                while (rdr2.Read())
                {
                    smtClient = rdr2.GetString(1);
                    smtpUsername = rdr2.GetString(2);
                    smtpPassword = rdr2.GetString(3);
                    smtpPort = rdr2.GetString(4);
                    senderEmailId = rdr2.GetString(5);

                }

                connection.Close();
                // create email message

                MailMessage mailMsg = new MailMessage();
                mailMsg.Subject = "Stride Invoice";
                mailMsg.Body = "Greetings from Stride,<br/>Thank you for choosing Stride Physio<br/><br/> Please find your payment history and balance amount attached below.<br/><br/><h6><i><b>Note*: This is an auto-generated mail from system, kindly do not reply.</b></i></h6><br/><br/>Thank you <br/>Stride Physio<br/>Phone : +91 9448760810<br/>Email : physiostride@gmail.com";
                mailMsg.From = new MailAddress(senderEmailId);
                mailMsg.Priority = MailPriority.High;
                mailMsg.Attachments.Add(new Attachment(pdfStream, "payment" + payment.paymentDate + ".pdf"));

                // send email
                mailMsg.To.Add(patientEmail);
                mailMsg.IsBodyHtml = true;

                SmtpClient smtpClient = new SmtpClient(smtClient);
                NetworkCredential networkCredential = new NetworkCredential();
                networkCredential.UserName = smtpUsername;
                networkCredential.Password = smtpPassword;
                smtpClient.Credentials = networkCredential;
                smtpClient.Port = Convert.ToInt32(smtpPort);
                smtpClient.EnableSsl = true;

                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

                smtpClient.Send(mailMsg);

                // close pdf document
                doc.Close();

                sentmailstatus = "true";
            }
            catch (Exception ex)
            {
                sentmailstatus = "false" + ex;
            }

            return sentmailstatus;
        }


        [WebMethod]
        public string saveUseSettings(UserSettings setting)
        {
            string valid = "false";

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();

            // physotherapist

            try
            {
                connection.Open();
                command.CommandText = ("insert into UserSettings(category,addrights,editrights,deleterights,printrights,viewrights,userCode) values('physotherapist', '" + setting.physoAdd+ "','" + setting.physoEdit + "','" + setting.physoDelete + "','" + setting.physoPrint + "','" + setting.physoView + "','" + setting.userCode + "' )");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            // securtiySettings
            try
            {
                connection.Open();
                command.CommandText = ("insert into UserSettings(category,addrights,editrights,deleterights,printrights,viewrights,userCode) values('securtiySettings', '" + setting.securityAdd + "','" + setting.securityEdit + "','" + setting.securityDelete + "','" + setting.securityPrint + "','" + setting.securityView + "','" + setting.userCode + "' )");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            // patient profile
            try
            {
                connection.Open();
                command.CommandText = ("insert into UserSettings(category,addrights,editrights,deleterights,printrights,viewrights,userCode) values('patientProfile', '" + setting.patientProfileAdd + "','" + setting.patientProfileEdit + "','" + setting.patientProfileDelete + "','" + setting.patientProfilePrint + "','" + setting.patientProfileView + "','" + setting.userCode + "' )");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }


           // payment
            try
            {
                connection.Open();
                command.CommandText = ("insert into UserSettings(category,addrights,editrights,deleterights,printrights,viewrights,userCode) values('payment', '" + setting.payementAdd + "','" + setting.payementEdit + "','" + setting.payementDelete + "','" + setting.payementPrint + "','" + setting.payementView + "','" + setting.userCode + "' )");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            //patient Invoice
            try
            {
                connection.Open();
                command.CommandText = ("insert into UserSettings(category,addrights,editrights,deleterights,printrights,viewrights,userCode) values('patientInvoice', '" + setting.patientInvoiceAdd + "','" + setting.patientInvoiceEdit + "','" + setting.patientInvoiceDelete + "','" + setting.patientInvoicePrint + "','" + setting.patientInvoiceView + "','" + setting.userCode + "' )");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            //serviceList
            try
            {
                connection.Open();
                command.CommandText = ("insert into UserSettings(category,addrights,editrights,deleterights,printrights,viewrights,userCode) values('serviceList', '" + setting.serviceListAdd + "','" + setting.serviceListEdit + "','" + setting.serviceListDelete + "','" + setting.serviceListPrint + "','" + setting.serviceListView + "','" + setting.userCode + "' )");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            // paymentReport
            try
            {
                connection.Open();
                command.CommandText = ("insert into UserSettings(category,addrights,editrights,deleterights,printrights,viewrights,userCode) values('paymentReport', '" + setting.paymentReportAdd + "','" + setting.paymentReportEdit + "','" + setting.paymentReportDelete + "','" + setting.paymentReportPrint + "','" + setting.paymentReportView + "','" + setting.userCode + "' )");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            // salesReport
            try
            {
                connection.Open();
                command.CommandText = ("insert into UserSettings(category,addrights,editrights,deleterights,printrights,viewrights,userCode) values('salesReport', '" + setting.salesReportAdd + "','" + setting.salesReportEdit + "','" + setting.salesReportDelete + "','" + setting.salesReportPrint + "','" + setting.salesReportView + "','" + setting.userCode + "' )");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            // outstandingReport
            try
            {
                connection.Open();
                command.CommandText = ("insert into UserSettings(category,addrights,editrights,deleterights,printrights,viewrights,userCode) values('outstandingReport', '" + setting.outstandingReportAdd + "','" + setting.outstandingReportEdit + "','" + setting.outstandingReportDelete + "','" + setting.outstandingReportPrint + "','" + setting.outstandingReportView + "','" + setting.userCode + "' )");
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }



            return valid;
        }

        [WebMethod]
        public string updateUserSettings(UserSettings setting)
        {
            string valid = "false";


            SqlConnection connection = new SqlConnection(connectionString);
            //physotherapist
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update UserSettings set addrights='"+setting.physoAdd+"', deleterights='"+setting.physoDelete+"',viewrights='"+setting.physoView+"', editrights='"+setting.physoEdit+"',printrights='"+setting.physoPrint+ "' where category ='physotherapist' and userCode='"+setting.userCode+"' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            // securtiySettings
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update UserSettings set addrights='" + setting.securityAdd + "', deleterights='" + setting.securityDelete + "',viewrights='" + setting.securityView + "', editrights='" + setting.securityEdit + "',printrights='" + setting.securityPrint + "' where category ='securtiySettings' and userCode='" + setting.userCode + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            //patient profile
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update UserSettings set addrights='" + setting.patientProfileAdd + "', deleterights='" + setting.patientProfileDelete + "',viewrights='" + setting.patientProfileView + "', editrights='" + setting.patientProfileEdit + "',printrights='" + setting.patientProfilePrint + "' where category ='patientProfile' and userCode='" + setting.userCode + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }


            //payment
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update UserSettings set addrights='" + setting.payementAdd + "', deleterights='" + setting.payementDelete + "',viewrights='" + setting.payementView + "', editrights='" + setting.payementEdit + "',printrights='" + setting.payementPrint + "' where category ='payment' and userCode='" + setting.userCode + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            //patient Invoice
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update UserSettings set addrights='" + setting.patientInvoiceAdd + "', deleterights='" + setting.patientInvoiceDelete + "',viewrights='" + setting.patientInvoiceView + "', editrights='" + setting.patientInvoiceEdit + "',printrights='" + setting.patientInvoicePrint + "' where category ='patientInvoice' and userCode='" + setting.userCode + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            //serviceList
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update UserSettings set addrights='" + setting.serviceListAdd + "', deleterights='" + setting.serviceListDelete + "',viewrights='" + setting.serviceListView + "', editrights='" + setting.serviceListEdit + "',printrights='" + setting.serviceListPrint + "' where category ='serviceList' and userCode='" + setting.userCode + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            // paymentReport
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update UserSettings set addrights='" + setting.paymentReportAdd + "', deleterights='" + setting.paymentReportDelete + "',viewrights='" + setting.paymentReportView + "', editrights='" + setting.paymentReportEdit + "',printrights='" + setting.paymentReportPrint + "' where category ='paymentReport' and userCode='" + setting.userCode + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            // salesReport
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update UserSettings set addrights='" + setting.salesReportAdd + "', deleterights='" + setting.salesReportDelete + "',viewrights='" + setting.salesReportView + "', editrights='" + setting.salesReportEdit + "',printrights='" + setting.salesReportPrint + "' where category ='salesReport' and userCode='" + setting.userCode + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            // outstandingReport
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update UserSettings set addrights='" + setting.outstandingReportAdd + "', deleterights='" + setting.outstandingReportDelete + "',viewrights='" + setting.outstandingReportView + "', editrights='" + setting.outstandingReportEdit + "',printrights='" + setting.outstandingReportPrint + "' where category ='outstandingReport' and userCode='" + setting.userCode + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }



            return valid;
        }

        [WebMethod]
        public List<UserSettings> getAllUserSettings(UserSettings setting)
        {
            var userList = new List<UserSettings>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from UserSettings where userCode='"+setting.userCode+"' order by id asc ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var userdata = new UserSettings();
                 
                if(rdr.GetString(1) == "physotherapist")
                {
                    userdata.physoAdd = rdr.GetBoolean(2);
                    userdata.physoEdit = rdr.GetBoolean(5);
                    userdata.physoDelete = rdr.GetBoolean(3);
                    userdata.physoPrint = rdr.GetBoolean(6);
                    userdata.physoView = rdr.GetBoolean(4);

                    userList.Add(userdata);
                }
                if (rdr.GetString(1) == "securtiySettings")
                {
                    userdata.securityAdd = rdr.GetBoolean(2);
                    userdata.securityEdit = rdr.GetBoolean(5);
                    userdata.securityDelete = rdr.GetBoolean(3);
                    userdata.securityPrint = rdr.GetBoolean(6);
                    userdata.securityView = rdr.GetBoolean(4);
                    userList.Add(userdata);
                }
                if (rdr.GetString(1) == "patientProfile")
                {
                    userdata.patientProfileAdd = rdr.GetBoolean(2);
                    userdata.patientProfileEdit = rdr.GetBoolean(5);
                    userdata.patientProfileDelete = rdr.GetBoolean(3);
                    userdata.patientProfilePrint = rdr.GetBoolean(6);
                    userdata.patientProfileView = rdr.GetBoolean(4);
                    userList.Add(userdata);
                }
                if (rdr.GetString(1) == "payment")
                {
                    userdata.payementAdd = rdr.GetBoolean(2);
                    userdata.payementEdit = rdr.GetBoolean(5);
                    userdata.payementDelete = rdr.GetBoolean(3);
                    userdata.payementPrint = rdr.GetBoolean(6);
                    userdata.payementView = rdr.GetBoolean(4);
                    userList.Add(userdata);
                }
                if (rdr.GetString(1) == "patientInvoice")
                {
                    userdata.patientInvoiceAdd = rdr.GetBoolean(2);
                    userdata.patientInvoiceEdit = rdr.GetBoolean(5);
                    userdata.patientInvoiceDelete = rdr.GetBoolean(3);
                    userdata.patientInvoicePrint = rdr.GetBoolean(6);
                    userdata.patientInvoiceView = rdr.GetBoolean(4);
                    userList.Add(userdata);
                }
                if (rdr.GetString(1) == "serviceList")
                {
                    userdata.serviceListAdd = rdr.GetBoolean(2);
                    userdata.serviceListEdit = rdr.GetBoolean(5);
                    userdata.serviceListDelete = rdr.GetBoolean(3);
                    userdata.serviceListPrint = rdr.GetBoolean(6);
                    userdata.serviceListView = rdr.GetBoolean(4);
                    userList.Add(userdata);
                }
                if (rdr.GetString(1) == "paymentReport")
                {
                    userdata.paymentReportAdd = rdr.GetBoolean(2);
                    userdata.paymentReportEdit = rdr.GetBoolean(5);
                    userdata.paymentReportDelete = rdr.GetBoolean(3);
                    userdata.paymentReportPrint = rdr.GetBoolean(6);
                    userdata.paymentReportView = rdr.GetBoolean(4);
                    userList.Add(userdata);
                }
                if (rdr.GetString(1) == "salesReport")
                {
                    userdata.salesReportAdd = rdr.GetBoolean(2);
                    userdata.salesReportEdit = rdr.GetBoolean(5);
                    userdata.salesReportDelete = rdr.GetBoolean(3);
                    userdata.salesReportPrint = rdr.GetBoolean(6);
                    userdata.salesReportView = rdr.GetBoolean(4);
                    userList.Add(userdata);
                }
                if (rdr.GetString(1) == "outstandingReport")
                {
                    userdata.outstandingReportAdd = rdr.GetBoolean(2);
                    userdata.outstandingReportEdit = rdr.GetBoolean(5);
                    userdata.outstandingReportDelete = rdr.GetBoolean(3);
                    userdata.outstandingReportPrint = rdr.GetBoolean(6);
                    userdata.outstandingReportView = rdr.GetBoolean(4);
                    userList.Add(userdata);
                }


            }

            connection.Close();

            return userList;
        }

        [WebMethod]
        public Dashboard getWidgetData()
        {
            var widgetData = new Dashboard();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select Count(*) from MstPatient_Info ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                widgetData.totalPatients = rdr.GetInt32(0);

            }

            connection.Close();

            SqlCommand readcommand2 = new SqlCommand("select Count(*) from Invoice ", connection);
            connection.Open();
            SqlDataReader rdr2 = readcommand2.ExecuteReader();
            while (rdr2.Read())
            {
                widgetData.totalInvoice = rdr2.GetInt32(0);

            }

            connection.Close();



            SqlCommand readcommand3 = new SqlCommand("select Count(*) from MstPayment ", connection);
            connection.Open();
            SqlDataReader rdr3 = readcommand3.ExecuteReader();
            while (rdr3.Read())
            {
                widgetData.totalPayments = rdr3.GetInt32(0);

            }

            connection.Close();


            return widgetData;
        }

        [WebMethod]
        public string saveNewAppointment(Appointment appointment)
        {
            string valid = "false";

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            string query = " IF EXISTS (select * from MstAppointment where eventStart = '" + appointment.start + "' and eventEnd = '" + appointment.end + "' and doctorCode ='" + appointment.doctorCode + "' )"+
                "BEGIN update MstAppointment set eventType = '" + appointment.className + "' where doctorCode = '" + appointment.doctorCode + "' END ELSE BEGIN "+
                "insert into MstAppointment(title, eventStart, eventEnd, eventType, doctorCode,patientPhone,patientCode) values('" + appointment.title + "', '" + appointment.start + "', '" + appointment.end + "', '" + appointment.className + "', '" + appointment.doctorCode + "','"+appointment.patientPhone+"','"+appointment.patientCode+"')"+
                " END ";
            try
            {
                connection.Open();
                command.CommandText = (query);
                 command.ExecuteNonQuery();
               
            }
            finally
            {
                
                connection.Close();
            }


            return valid;
        }

        [WebMethod]
        public string updateDoctorAppointment(Appointment appointment)
        {
            string valid = "false";

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            string query = "update MstAppointment set title= '"+appointment.title+"', eventStart='"+appointment.start+"', eventEnd='"+appointment.end+"' where doctorCode='"+appointment.doctorCode+"' and title like '%"+appointment.title2+"%' and eventStart ='"+appointment.start+"' and eventEnd ='"+appointment.end+"' ";
            try
            {
                connection.Open();
                command.CommandText = (query);
                command.ExecuteNonQuery();

            }
            finally
            {
                valid = "true";
                connection.Close();
            }


            return valid;
        }

        [WebMethod]
        public string deleteDoctorAppointment(Appointment appointment)
        {
            string valid = "false";

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            string query = "delete from MstAppointment  where doctorCode='" + appointment.doctorCode + "' and title like '%" + appointment.title + "%' and eventStart ='" + appointment.start + "' and eventEnd ='" + appointment.end + "' ";
            try
            {
                connection.Open();
                command.CommandText = (query);
                command.ExecuteNonQuery();

            }
            finally
            {
                valid = "true";
                connection.Close();
            }


            return valid;
        }


        [WebMethod]
        public List<Appointment> getDoctorAppointmentsList(Appointment appointment)
        {
            var appointmentList = new List<Appointment>();

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand readcommand3 = new SqlCommand("select * from MstAppointment where doctorCode = '"+appointment.doctorCode+"' ", connection);
            connection.Open();
            SqlDataReader rdr3 = readcommand3.ExecuteReader();
            while (rdr3.Read())
            {
                var appointmentData = new Appointment();
                appointmentData.title = rdr3.GetString(1);
                appointmentData.start = rdr3.GetString(2);
                appointmentData.end = rdr3.GetString(3);
                appointmentData.className = rdr3.GetString(4);
                appointmentList.Add(appointmentData);

            }

            connection.Close();

            return appointmentList;
        }

        [WebMethod]
        public Doctor checkDoctorByPhone(Doctor doctor)
        {

            var doctorData = new Doctor();
            var smsUrl = "";
            var smsUsername = "";
            var smsPassword = "";
            var smsSenderId = "";

            string numbers = "1234567890";

            string characters = numbers;

            int length = 5;
            string otp = string.Empty;
            for (int i = 0; i < length; i++)
            {
                string character = string.Empty;
                do
                {
                    int index = new Random().Next(0, characters.Length);
                    character = characters.ToCharArray()[index].ToString();
                } while (otp.IndexOf(character) != -1);
                otp += character;
            }
            doctorData.OTP = otp;

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand2 = new SqlCommand("select * from MstSMSGateway ", connection);
            readcommand2.Parameters.AddWithValue("@DoctorPhone", doctor.doctorPhone);
            connection.Open();
            SqlDataReader rdr2 = readcommand2.ExecuteReader();
            if (rdr2.Read())
            {
                smsUrl = rdr2.GetString(1);
                smsUsername = rdr2.GetString(2);
                smsPassword = rdr2.GetString(3);
                smsSenderId = rdr2.GetString(4);

            }

            connection.Close();

            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstDoctor where DoctorPhone=@DoctorPhone and Enabled='Y' ", connection);
            readcommand.Parameters.AddWithValue("@DoctorPhone", doctor.doctorPhone);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            if (rdr.Read())
            {
                doctorData.doctorCode = rdr.GetString(0);
                doctorData.doctorName = rdr.GetString(1);
                doctorData.doctorPhone = rdr.GetString(7);
                string strUrl = smsUrl+"username="+smsUsername+"&password="+smsPassword+"&to=91"+ rdr.GetString(7)+"&text="+ doctorData.OTP+" is your OTP for changing password, Stride.&from="+smsSenderId;
                // Create a request object  
                WebRequest request = HttpWebRequest.Create(strUrl);
                // Get the response back  
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream s = (Stream)response.GetResponseStream();
                StreamReader readStream = new StreamReader(s);
                string dataString = readStream.ReadToEnd();
                response.Close();
                s.Close();
                readStream.Close();

            }

            connection.Close();

            return doctorData;
        }


        [WebMethod]
        public string changeDoctorPassword(Doctor doctor)
        {
            string valid = "false";

            SqlConnection connection = new SqlConnection(connectionString);
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update MstDoctor set DoctorPassword='" + doctor.doctorPassword + "' where DoctorCode = '" + doctor.doctorCode + "' ", connection);
                command.ExecuteNonQuery();

                valid = "true";

            }
            finally
            {
                connection.Close();
              
            }
            return valid;
        }

        [WebMethod]
        public Dashboard getTotalOfMasters()
        {
            var dashboardData = new Dashboard();
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select count(*) from MstDoctor where Enabled='Y'", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            if (rdr.Read())
            {
                dashboardData.doctorTotal = rdr.GetInt32(0).ToString();
            }

            connection.Close();

            SqlCommand readcommand2 = new SqlCommand("select count(*) from MstPatient_Info ", connection);
            connection.Open();
            SqlDataReader rdr2 = readcommand2.ExecuteReader();
            if (rdr2.Read())
            {
                dashboardData.patientTotal = rdr2.GetInt32(0).ToString();
            }

            connection.Close();

            SqlCommand readcommand3 = new SqlCommand("select count(*) from MstService where Enabled='Y' ", connection);
            connection.Open();
            SqlDataReader rdr3 = readcommand3.ExecuteReader();
            if (rdr3.Read())
            {
                dashboardData.seviceTotal = rdr3.GetInt32(0).ToString();
            }

            connection.Close();

            SqlCommand readcommand4 = new SqlCommand("select count(*) from Invoice ", connection);
            connection.Open();
            SqlDataReader rdr4 = readcommand4.ExecuteReader();
            if (rdr4.Read())
            {
                dashboardData.invoiceTotal = rdr4.GetInt32(0).ToString();
            }

            connection.Close();

            SqlCommand readcommand5 = new SqlCommand("select count(*) from MstPayment", connection);
            connection.Open();
            SqlDataReader rdr5 = readcommand5.ExecuteReader();
            if (rdr5.Read())
            {
                dashboardData.paymentTotal = (rdr5.GetInt32(0)-1).ToString();
            }

            connection.Close();


            return dashboardData;
        }

        [WebMethod]
        public List<Shortcut> getGotoPage(string term)
        {
            var shortcutList = new List<Shortcut>();


            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstTabShortcut where TabName like '%" + term + "%' or TabShortcut like '%" + term + "%'", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var shortcutdata = new Shortcut();

                shortcutdata.tabName = rdr.GetString(1);
                shortcutdata.tabShortcut = rdr.GetString(2);
                shortcutdata.tabUrl = rdr.GetString(3);
                shortcutList.Add(shortcutdata);

            }

            connection.Close();

            return shortcutList;
        }
        [WebMethod]
        public String getHtmlFileData(String filepath, String fileName)
        {

            string html = File.ReadAllText(@filepath+fileName);
            return html;

        }

        [WebMethod]
        public String updateHtmlFileData(String fileName, String newcontent, String patientCode,String fileFolder,String filePath, String saveType)
        
        {
            DateTime today = DateTime.Now;
            String dateformat = today.ToString("mmss");
            String newFileName = patientCode + "-" + dateformat + " - " + fileName;
            String newFileName2 = fileName;
            
            String newFileName3 = "";
            String[] namearray = newFileName2.Split('-');
            String temp = namearray[0];

            if (temp.Equals(patientCode))
            {
                newFileName3 = fileName;
            }
            else
            {
                newFileName3 = patientCode + "-" + fileName;
            }
            String valid = "true";
            String path = @"C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/SentFiles/" + newFileName;
            String path2 = @"C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/SentFiles/" + newFileName3;
            if (fileFolder == "GeneralAssesment")
            {
                using (StreamWriter sw = File.CreateText(path2))
                {
                    sw.WriteLine(newcontent);

                }

                SqlConnection connection = new SqlConnection(connectionString);
                try
                {

                    connection.Open();
                    SqlCommand command = new SqlCommand("IF EXISTS (select * from MstClinialNoteSentFiles where FileFolder='GeneralAssesment' and PatientCode='" + patientCode + "' ) BEGIN update MstClinialNoteSentFiles set FileFolder ='" + fileFolder+ "' where FileFolder='GeneralAssesment' and PatientCode='" + patientCode+"' END ELSE BEGIN insert into MstClinialNoteSentFiles values('" + today + "','C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/SentFiles/','" + newFileName3 + "','" + fileFolder + "','" + patientCode + "') END", connection);
                    command.ExecuteNonQuery();

                    valid = "true";

                }
                catch(Exception ex)
                {
                    return ex.ToString();
                }
                finally
                {
                    connection.Close();

                }
                if(saveType == "sendMail")
                {
                    sendClinicalNotesFileToPatient(patientCode, newcontent, newFileName);
                }
                
            }
            else {
                using (StreamWriter sw = File.CreateText(path))
                {
                    sw.WriteLine(newcontent);

                }

                SqlConnection connection = new SqlConnection(connectionString);
                try
                {

                    connection.Open();
                    SqlCommand command = new SqlCommand("insert into MstClinialNoteSentFiles values('" + today + "','C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/Uploads/ClinicalNotes/Modified/SentFiles/','" + newFileName + "','" + fileFolder + "','" + patientCode + "') ", connection);
                    command.ExecuteNonQuery();

                    valid = "true";

                }
                finally
                {
                    connection.Close();

                }
                sendClinicalNotesFileToPatient(patientCode, newcontent, newFileName);
            }
           

            return valid;
        }

        [WebMethod]
        public List<SendFilesEntitie> getSentFilesList(String fileFolder, String patientCode)
        {
            var sendFileList = new List<SendFilesEntitie>();


            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstClinialNoteSentFiles where FileFolder='"+fileFolder+"' and PatientCode='"+patientCode+"' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var sendFiledata = new SendFilesEntitie();

                sendFiledata.Date = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                sendFiledata.FilePath = rdr.GetString(2);
                sendFiledata.FileName = rdr.GetString(3);
                sendFiledata.FileFolder = rdr.GetString(4);
                sendFileList.Add(sendFiledata);

            }

            connection.Close();

            

            return sendFileList;
        }

        public void sendClinicalNotesFileToPatient(String patientCode, String mailContent, String fileName)
        {
           
            string patientEmail = "";

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select PatientEmail from MstPatient_Info where PatientCode='" +patientCode + "' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                patientEmail = rdr.GetString(0);
            }

            connection.Close();

            string htmlString = mailContent;

            string baseUrl = "file://C:/Softvent/WebApps/DemoProjects/Stride/Stride/Stride/";
            string pdf_page_size = "A4";
            PdfPageSize pageSize = (PdfPageSize)Enum.Parse(typeof(PdfPageSize),
             pdf_page_size, true);

            string pdf_orientation = "Portrait";
            PdfPageOrientation pdfOrientation =
                (PdfPageOrientation)Enum.Parse(typeof(PdfPageOrientation),
                pdf_orientation, true);

            int webPageWidth = 1524;
            int webPageHeight = 0;

            HtmlToPdf converter = new HtmlToPdf();

            // set converter options
            converter.Options.PdfPageSize = pageSize;
            converter.Options.PdfPageOrientation = pdfOrientation;
           // converter.Options.WebPageWidth = webPageWidth;
           // converter.Options.WebPageHeight = webPageHeight;
            string sentmailstatus;
            try
            {
                // create a new pdf document converting an url
                PdfDocument doc = converter.ConvertHtmlString(htmlString, baseUrl);
                PdfFont font1 = doc.AddFont(PdfStandardFont.Helvetica);
                font1.Size = 14;

                MemoryStream pdfStream = new MemoryStream();
                
                // save pdf document into a MemoryStream
                doc.Save(pdfStream);
                // reset stream position
                pdfStream.Position = 0;


                //get email settings

                string smtpUsername = "", smtpPassword = "", smtpPort = "", smtClient = "", senderEmailId = "";
                SqlCommand readcommand2 = new SqlCommand("select * from EmailSetting ", connection);
                connection.Open();
                SqlDataReader rdr2 = readcommand2.ExecuteReader();
                while (rdr2.Read())
                {
                    smtClient = rdr2.GetString(1);
                    smtpUsername = rdr2.GetString(2);
                    smtpPassword = rdr2.GetString(3);
                    smtpPort = rdr2.GetString(4);
                    senderEmailId = rdr2.GetString(5);

                }

                connection.Close();
                // create email message

                MailMessage mailMsg = new MailMessage();
                mailMsg.Subject = "Excercise Files";
                mailMsg.Body = "Greetings from Stride,<br/>Thank you for choosing Stride Physio<br/><br/> Please find your excercise files attached below.<br/><br/><h6><i><b>Note*: This is an auto-generated mail from system, kindly do not reply.</b></i></h6><br/><br/>Thank you <br/>Stride Physio<br/>Phone : +91 9448760810<br/>Email : physiostride@gmail.com";
                mailMsg.From = new MailAddress(senderEmailId);
                mailMsg.Priority = MailPriority.High;
                mailMsg.Attachments.Add(new Attachment(pdfStream, "Excercise - " +fileName + ".pdf"));

                // send email
                mailMsg.To.Add(patientEmail);
                mailMsg.IsBodyHtml = true;

                SmtpClient smtpClient = new SmtpClient(smtClient);
                NetworkCredential networkCredential = new NetworkCredential();
                networkCredential.UserName = smtpUsername;
                networkCredential.Password = smtpPassword;
                smtpClient.Credentials = networkCredential;
                smtpClient.Port = Convert.ToInt32(smtpPort);
                smtpClient.EnableSsl = true;

                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

                smtpClient.Send(mailMsg);

                // close pdf document
                doc.Close();

                sentmailstatus = "true";
            }
            catch (Exception ex)
            {
                sentmailstatus = "false" + ex;
            }

            
        }

        [WebMethod]
        public String sendAppointmentSMS(String patientCode, String appDate, String appTime,String msgcontent)
        {
            String valid = "false";
            String PatientEmail = "";
            String patientName = "";
            String smsUrl = "", smsUsername = "", smsPassword = "", smsSenderId = "";
            String content = "";
            
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand2 = new SqlCommand("select * from MstSMSGateway ", connection);
            connection.Open();
            SqlDataReader rdr2 = readcommand2.ExecuteReader();
            if (rdr2.Read())
            {
                smsUrl = rdr2.GetString(1);
                smsUsername = rdr2.GetString(2);
                smsPassword = rdr2.GetString(3);
                smsSenderId = rdr2.GetString(4);

            }

            connection.Close();

            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstPatient_Info where PatientCode= '"+patientCode+"'  and Enabled='Y' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            if (rdr.Read())
            {
                PatientEmail = rdr.GetString(6);
                patientName = rdr.GetString(1);
                if (msgcontent == "")
                {
                    content = "Hello " + rdr.GetString(1) + ", your appointment is fixed at " + appDate + " - " + appTime + " ";
                }
                else
                {
                    content = msgcontent;
                }
                string strUrl = smsUrl + "username=" + smsUsername + "&password=" + smsPassword + "&to=91" + rdr.GetString(7) + "&text="+content+", Stride.&from=" + smsSenderId;
                // Create a request object  
                WebRequest request = HttpWebRequest.Create(strUrl);
                // Get the response back  
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream s = (Stream)response.GetResponseStream();
                StreamReader readStream = new StreamReader(s);
                string dataString = readStream.ReadToEnd();
                response.Close();
                s.Close();
                readStream.Close();

            }

            connection.Close();

            sendAppointmentMail(PatientEmail, patientName, appDate, appTime);

            return valid;
        }

        public void sendAppointmentMail(String patientEmail, String patientName, String appDate, String appTime)
        {
            string smtpUsername = "", smtpPassword = "", smtpPort = "", smtClient = "", senderEmailId = "";

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand readcommand2 = new SqlCommand("select * from EmailSetting ", connection);
            connection.Open();
            SqlDataReader rdr2 = readcommand2.ExecuteReader();
            while (rdr2.Read())
            {
                smtClient = rdr2.GetString(1);
                smtpUsername = rdr2.GetString(2);
                smtpPassword = rdr2.GetString(3);
                smtpPort = rdr2.GetString(4);
                senderEmailId = rdr2.GetString(5);

            }

            connection.Close();
            // create email message

            MailMessage mailMsg = new MailMessage();
            mailMsg.Subject = "Stride Appointment Confirmation";
            mailMsg.Body = "Hello <b>" + patientName + "</b>,<br/> <br/> your appointment is confirmed at  - "+appDate+" - "+appTime+ ".<br/><br/><h6><i><b>Note*: This is an auto-generated mail from system, kindly do not reply.</b></i></h6><br/><br/>Thank you <br/>Stride Physio<br/>Phone : +91 9448760810<br/>Email : physiostride@gmail.com";
            mailMsg.From = new MailAddress(senderEmailId);
            mailMsg.Priority = MailPriority.High;
           

            // send email
            mailMsg.To.Add(patientEmail);
            mailMsg.IsBodyHtml = true;

            SmtpClient smtpClient = new SmtpClient(smtClient);
            NetworkCredential networkCredential = new NetworkCredential();
            networkCredential.UserName = smtpUsername;
            networkCredential.Password = smtpPassword;
            smtpClient.Credentials = networkCredential;
            smtpClient.Port = Convert.ToInt32(smtpPort);
            smtpClient.EnableSsl = true;

            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

            smtpClient.Send(mailMsg);

            
           }

    }

}
