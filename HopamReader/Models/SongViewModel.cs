using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HopamReader.Models
{
	public class SongViewModel
	{
		public int ID { get; set; }

		[Required]
		public string Title { get; set; }

		public string Writer { get; set; }
		
		public string Genre { get; set; }
		
		public string Tone { get; set; }
		
		public string Rhythm { get; set; }

		[Required]
		public string Body { get; set; }
	}
}