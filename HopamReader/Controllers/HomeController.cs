using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HopamModel;

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
			return View(_db.Songs);
		}
	}
}
