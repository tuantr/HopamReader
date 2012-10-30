using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HopamModel;
using HopamReader.Infrastructure;
using HopamReader.Models;

namespace HopamReader.Controllers
{
    public class SongController : Controller
    {
		private readonly ISongDataSource _db;

		public SongController(ISongDataSource db)
		{
			_db = db;
		}

		[HttpGet]
        public ActionResult AddSong()
        {
			var allsongs = _db.Songs;
			var model = new SongViewModel();
			return View(model);
        }

		[HttpPost]
		public ActionResult AddSong(SongViewModel viewModel)
		{
			if (ModelState.IsValid)
			{
				if (_db.Songs.FirstOrDefault(I => I.Title == viewModel.Title) == null)
				{
					var song = new Song();
					song.Title = viewModel.Title;
					song.Writer = viewModel.Writer;
					song.Genre = viewModel.Genre;
					song.Tone = viewModel.Tone;
					song.Rhythm = viewModel.Rhythm;
					song.Body = viewModel.Body;

					_db.AddSong(song);
					_db.Save();

					return RedirectToAction("index", "home");
				}
			}

			return View(viewModel);
		}
    }
}
