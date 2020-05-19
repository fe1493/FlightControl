using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net.Http;



namespace FlightControlWeb.Models
{
    public  class HttpRequestClass
    {
        
        public  async Task<List<Flights>> makeRequest(string url)
        {
            using var client = new HttpClient();
            var result = await client.GetStringAsync("http://localhost:54753/api/Flight");
            List <Flights> listFlights = JsonConvert.DeserializeObject<List<Flights>>(result);
            return listFlights;
        }
        
    }
}
