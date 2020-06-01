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
        public async Task<dynamic> MakeRequest(string url)
        {
            using var client = new HttpClient();
            //set time out for the request
            client.Timeout = TimeSpan.FromSeconds(10);
            var result = await client.GetStringAsync(url);
            return result;
        }
    }
}