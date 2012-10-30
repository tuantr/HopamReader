using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HopamModel
{
	public interface ISongDataSource
	{
		IQueryable<Song> Songs { get; }
		void AddSong(Song song);
		void Save();
	}
}
