using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightControlWeb.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace FlightControlWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private IFlightManager flightManager;
        private IMemoryCache memoryCache;
        private MyServerManager myServerManager;

        public FlightsController(IFlightManager manager, IMemoryCache cache)
        {
            flightManager = manager;
            memoryCache = cache;
        }



        public async Task<List<Flights>> Func(Servers servers)
        {
            HttpRequestClass httpRequestClass = new HttpRequestClass();
            // string response = await httpRequestClass.makeRequest(servers.ServerURL);
            List<Flights> fl = await httpRequestClass.makeRequest(servers.ServerURL);
         //   Console.WriteLine(response);
          //  List<Flights> fl = new List<Flights>();
          //  fl = JsonConvert.DeserializeObject<List<Flights>>(response);
            return fl;
        }



        [HttpGet]
        public async Task<IEnumerable<Flights>> GetFlights(DateTime relative_to)
        {
            List<Flights> flightsList = new List<Flights>();

            if (Request.Query.ContainsKey("sync_all"))
            {
                List<string> serverIdKeysList = memoryCache.Get("serverListKeys") as List<string>;
               
                foreach (var id in serverIdKeysList)
                {
                    Servers server = memoryCache.Get(id) as Servers;
                    List<Flights> fl = new List<Flights>();
                    fl = await Func(server);

                    flightsList.AddRange(fl);
                }
                return flightsList;
            }
            List<string> fpListOfKeys = memoryCache.Get("flightListKeys") as List<string>;

            foreach (var id in fpListOfKeys)
            {
                FlightPlan fp;

                fp = memoryCache.Get<FlightPlan>(id);
                Flights flight = flightManager.CreateUpdatedFlight(fp, relative_to);
                flightsList.Add(flight);
            }
            return flightsList;
        }
    }
}
