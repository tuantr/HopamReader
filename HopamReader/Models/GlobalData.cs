using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HopamReader.Models
{
	public static class GlobalData
	{
		public static class Genre
		{
			public const string NhacTre = "Nhạc trẻ";
			public const string NhacTruTinh = "Nhạc trữ tình";
			public const string NhacTrinh = "Nhạc Trịnh";
		}

		public static class Tone
		{
			public const string Disco = "Disco";
			public const string Fox = "Fox";
			public const string Tango = "Tango";
			public const string Rumba = "Rumba";
			public const string SlowRock = "SlowRock";
			public const string Slow = "Slow";
			public const string Bolero = "Bolero";
			public const string Blue = "Blue";
			public const string Ballad = "Ballad";
		}

		public static class Rhythm
		{
			public const string Nhip24 = "Nhip 2/4";
			public const string Nhip44 = "Nhip 4/4";
			public const string Nhip34 = "Nhip 3/4";
			public const string Nhip68 = "Nhip 6/8";
		}

		public static List<SelectListItem> GenreList { get; set; }
		public static List<SelectListItem> ToneList { get; set; }
		public static List<SelectListItem> RhythmList { get; set; }

		static GlobalData()
		{
			GenreList = new List<SelectListItem>();
			GenreList.Add(new SelectListItem() { Text = Genre.NhacTre, Value = Genre.NhacTre });
			GenreList.Add(new SelectListItem() { Text = Genre.NhacTruTinh, Value = Genre.NhacTruTinh });
			GenreList.Add(new SelectListItem() { Text = Genre.NhacTrinh, Value = Genre.NhacTrinh });

			ToneList = new List<SelectListItem>();
			ToneList.Add(new SelectListItem() { Text = Tone.Ballad, Value = Tone.Ballad });
			ToneList.Add(new SelectListItem() { Text = Tone.Blue, Value = Tone.Blue });
			ToneList.Add(new SelectListItem() { Text = Tone.Bolero, Value = Tone.Bolero });
			ToneList.Add(new SelectListItem() { Text = Tone.Disco, Value = Tone.Disco });
			ToneList.Add(new SelectListItem() { Text = Tone.Fox, Value = Tone.Fox });
			ToneList.Add(new SelectListItem() { Text = Tone.Rumba, Value = Tone.Rumba });
			ToneList.Add(new SelectListItem() { Text = Tone.Slow, Value = Tone.Slow });
			ToneList.Add(new SelectListItem() { Text = Tone.SlowRock, Value = Tone.SlowRock });
			ToneList.Add(new SelectListItem() { Text = Tone.Tango, Value = Tone.Tango });

			RhythmList = new List<SelectListItem>();
			RhythmList.Add(new SelectListItem() { Text = Rhythm.Nhip24, Value = Rhythm.Nhip24 });
			RhythmList.Add(new SelectListItem() { Text = Rhythm.Nhip34, Value = Rhythm.Nhip34 });
			RhythmList.Add(new SelectListItem() { Text = Rhythm.Nhip44, Value = Rhythm.Nhip44 });
			RhythmList.Add(new SelectListItem() { Text = Rhythm.Nhip68, Value = Rhythm.Nhip68 });
		}
	}
}