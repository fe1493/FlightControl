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

        public FlightController(IFlightManager manager)
        {
            flightManager = manager;
        }
        

        // GET: api/Flight
        [HttpGet]
        public IEnumerable<Flight> Get()
        {
            List<Flight> flights = new List<Flight>();
            flights.Add(new Flight { FlightId = 1 , CompanyName= "EL-AL", IsExternal = false});
            flights.Add(new Flight { FlightId = 3 , CompanyName="Swiss", IsExternal = false });
            return flights;
        }
        

        // GET: api/Flight/5
        [HttpGet("{id}", Name = "FlightGet")]
        public Flight Get(int id)
        {
            return new Flight { FlightId = 3 };
        }
        

        // POST: api/Flight
        [HttpPost]
        public void Post([FromBody] Flight value)
        {

                
        }

        // PUT: api/Flight/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
