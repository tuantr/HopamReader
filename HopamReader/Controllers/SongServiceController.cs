using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Mvc;
using HopamModel;
using HopamReader.Infrastructure;

namespace HopamReader.Controllers
{
    public class SongServiceController : ApiController
    {
		private SongDb db;

		public SongServiceController()
		{
			db = new SongDb();
			db.Configuration.ProxyCreationEnabled = false;
		}

        // GET api/songservice
        public IEnumerable<Song> GetAllSongs()
        {
			return db.Songs;
        }

        // GET api/songservice/5
        public Song Get(int id)
        {
			var song = db.Songs.Find(id);
			if (song == null)
			{
				throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
			}
			return song;
        }

        // POST api/songservice
        public void Post(string value)
        {
        }

        // PUT api/songservice/5
        public void Put(int id, string value)
        {
        }

        // DELETE api/songservice/5
        public void Delete(int id)
        {
        }
    }
}
