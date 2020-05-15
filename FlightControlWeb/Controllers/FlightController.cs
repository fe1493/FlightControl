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
            if (Request.Query.ContainsKey("sync_all"))
            {

            }
            Flight flight = new Flight();
            List<Flight> flights = new List<Flight>();
            flights.Add(flight);
            return flights;
        }
    }
}
