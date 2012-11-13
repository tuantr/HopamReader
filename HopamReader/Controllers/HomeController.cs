using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using HopamModel;
using HopamReader.Models;

namespace HopamReader.Controllers
{
	public class HomeController : Controller
	{
		private readonly ISongDataSource _db;

		public HomeController(ISongDataSource db)
		{
			_db = db;
		}

		public ActionResult Index()
		{
			//var model = GetData();
			return View();
		}

		List<SongViewModel> GetData()
		{
			List<SongViewModel> model = new List<SongViewModel>();
			
			var result =
				from s in _db.Songs
				orderby s.ID descending
				select new { s.ID, s.Title };
			
			foreach (var item in result)
			{
				SongViewModel song = new SongViewModel();
				song.ID = item.ID;
				song.Title = item.Title;
				model.Add(song);
			}

			return model;
		}

		public ActionResult About()
		{
			return View();
		}
	}
}
