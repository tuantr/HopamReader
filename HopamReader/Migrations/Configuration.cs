namespace HopamReader.Migrations
{
	using System;
	using System.Data.Entity;
	using System.Data.Entity.Migrations;
	using System.Data.SqlClient;
	using System.Linq;
	using System.Web.Security;
	using HopamModel;

    internal sealed class Configuration : DbMigrationsConfiguration<HopamReader.Infrastructure.SongDb>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(HopamReader.Infrastructure.SongDb context)
        {
			// add role
			if (!Roles.RoleExists("Admin"))
			{
				Roles.CreateRole("Admin");
			}
			if (!Roles.RoleExists("User"))
			{
				Roles.CreateRole("User");
			}

			if (Membership.GetUser("hopamAdmin") == null)
			{
				Membership.CreateUser("hopamAdmin", "P@ssw0rd");
				Roles.AddUserToRole("hopamAdmin", "Admin");
			}

			//string azureConnectionString = "";
			//string queryString = "SELECT * from dbo.Songs";
			//using (SqlConnection connection =
			//new SqlConnection(azureConnectionString))
			//{
			//	SqlCommand command = new SqlCommand(queryString, connection);
			//	try
			//	{
			//		connection.Open();
			//		SqlDataReader reader = command.ExecuteReader();
			//		while (reader.Read())
			//		{
			//			context.Songs.AddOrUpdate(s => s.Title,
			//				new Song
			//				{
			//					Title = reader[1].ToString(),
			//					Writer = reader[2].ToString(),
			//					Genre = reader[3].ToString(),
			//					Tone = reader[4].ToString(),
			//					Rhythm = reader[5].ToString(),
			//					Body = reader[6].ToString(),
			//					CreatedBy = reader[7].ToString()
			//				});
			//		}
			//		reader.Close();
			//	}
			//	catch (Exception ex)
			//	{
			//	}
			//}
        }
    }
}
