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
        

        // GET: api/Flight
        [HttpGet]
        public IEnumerable<Flight> Get()
        {
            
        }
        

        // GET: api/Flight/5
        [HttpGet("{id}", Name = "FlightGet")]
        public Flight Get(int id)
        {
            return new Flight { FlightId = 3 };
        }
        
        /* DONT THINK YOU NEED THIS IN FLIGHT- THERE IS NO POST
        // POST: api/Flight
        [HttpPost]
        public void Post([FromBody] Flight value)
        {

                
        }
        */

            /*
        // PUT: api/Flight/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }
        */

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            memoryCache.Remove(id);
             
        }
    }
}
