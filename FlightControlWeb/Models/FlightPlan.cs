using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightControlWeb.Models
{
    public class FlightPlan
    {
        public string FlightPlanId { get; set; }

        public int Passengers { get; set; }

        public string CompanyName { get; set; }
        public class Location {
            public double Longitude { get; set; }
            public double Latitude { get; set; }
            public DateTime DateTime { get; set; }
        }
        public Location InitialLocation { get; set; }
        public List<Segment> Segments { get; set; }

    }
}
