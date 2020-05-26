using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net.Http;



namespace FlightControlWeb.Models
{
    public class HttpRequestClass
    {
        public async Task<dynamic> makeRequest(string url)
        {
            using var client = new HttpClient();
            client.Timeout = TimeSpan.FromSeconds(10);
            var result = await client.GetStringAsync(url);
            return result;
        }
    }
}