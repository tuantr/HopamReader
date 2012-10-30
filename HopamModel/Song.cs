using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HopamModel
{
	public class Song
	{
		public virtual int ID { get; set; }
		public virtual string Title { get; set; }
		public virtual string Writer { get; set; }
		public virtual string Genre { get; set; }
		public virtual string Tone { get; set; }
		public virtual string Rhythm { get; set; }
		public virtual string Body { get; set; }
		public virtual int NumberView { get; set; }
	}
}
