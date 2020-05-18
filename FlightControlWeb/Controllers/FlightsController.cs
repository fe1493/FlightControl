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
    public class FlightsController : ControllerBase
    {
        private IFlightManager flightManager;
        private IMemoryCache memoryCache;

        public FlightsController(IFlightManager manager, IMemoryCache cache)
        {
            flightManager = manager;
            memoryCache = cache;
        }


        [HttpGet]
        public IEnumerable<Flights> GetFlights(DateTime relative_to)
        {
            List<Flights> flightsList = new List<Flights>();

            if (Request.Query.ContainsKey("sync_all"))
            {

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
