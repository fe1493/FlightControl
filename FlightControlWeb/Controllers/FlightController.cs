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
        /*

        // GET: api/Flight
        [HttpGet]
        public IEnumerable<Flight> Get()
        {
            return 
        }

        // GET: api/Flight/5
        [HttpGet("{id}", Name = "Get")]
        public Flight Get(int id)
        {
            return "value";
        }
        */

        // POST: api/Flight
        [HttpPost]
        public void Post([FromBody] string value)
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
