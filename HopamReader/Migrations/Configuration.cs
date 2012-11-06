namespace HopamReader.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
	using System.Web.Security;

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

            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
