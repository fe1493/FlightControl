using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightControlWeb.Models
{
    public class FlightPlan
    {
        public int FlightPlanId { get; set; }

        public int Passangers { get; set; }

        public string CompanyName { get; set; }
        public class InitialLocation {
            public double Longitude { get; set; }
            public double Latitude { get; set; }
            public DateTime DateTime { get; set; }
        }
        public List<Segment> Segments { get; set; }

    }
}
