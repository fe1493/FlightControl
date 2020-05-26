using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FlightControlWeb.Models
{
    public class FlightPlan
    {
        [JsonProperty("flight_id")]
        [JsonPropertyName("flight_id")]
        public string FlightPlanId { get; set; }

        public int Passengers { get; set; }

        [JsonProperty("company_name")]
        [JsonPropertyName("company_name")]
        public string CompanyName { get; set; }
        public class Location
        {
            public double Longitude { get; set; }
            public double Latitude { get; set; }
            [JsonProperty("date_time")]
            [JsonPropertyName("date_time")]
            public DateTime DateTime { get; set; }
        }
        [JsonProperty("initial_location")]
        [JsonPropertyName("initial_location")] 
        public Location InitialLocation { get; set; }
        public List<Segment> Segments { get; set; }
    }
}
