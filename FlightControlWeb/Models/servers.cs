using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace FlightControlWeb.Models
{
    public class Servers
    {
        public int ServerId { get; set; }
        public string ServerURL { get; set; }
    }
}
