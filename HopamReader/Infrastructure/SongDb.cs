using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using HopamModel;

namespace HopamReader.Infrastructure
{
	public class SongDb : DbContext , ISongDataSource
	{
		public SongDb()
			: base("DefaultConnection")
		{
		}

		public DbSet<Song> Songs { get; set; }
		
		IQueryable<Song> ISongDataSource.Songs
		{
			get { return Songs; }
		}

		void ISongDataSource.Save()
		{
			var result = SaveChanges();
		}


		void ISongDataSource.AddSong(Song song)
		{
			Songs.Add(song);
		}
	}
}