using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightControlWeb.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace FlightControlWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private IFlightManager flightManager;
        private IMemoryCache memoryCache;

        public FlightController(IFlightManager manager, IMemoryCache cache)
        {
            flightManager = manager;
            memoryCache = cache;
        }


        [HttpGet]
        public IEnumerable<Flight> GetFlights(DateTime relative_to)
        {
            List<Flight> flight_list = new List<Flight> { };

            if (Request.Query.ContainsKey("sync_all"))
            {

            }
            List<int> cache_list_keys = memoryCache.Get<List<int>?>(-1);

            foreach (var id in cache_list_keys)
            {
                FlightPlan fp;

                fp = memoryCache.Get<FlightPlan?>(id);
                DateTime date = new DateTime(0,0,0);
                Flight flight = flightManager.CreateUpdatedFlight(fp, date);
                flight_list.Add(flight);
            }
            return flight_list;

        }
    }
}
