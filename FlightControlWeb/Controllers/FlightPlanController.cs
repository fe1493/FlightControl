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
    public class FlightPlanController : ControllerBase
    {
        
        private IFlightManager flightManager;
        private IMemoryCache memoryCache;
       
        // dependency injection
        public FlightPlanController(IFlightManager manager, IMemoryCache cache)
        {
            flightManager = manager;
            memoryCache = cache;
            
        }
        
  
        
        // GET: api/FlightPlan/5
        [HttpGet("{id}")]
        public FlightPlan Get(int id)
        {

            var flight_plan = new FlightPlan();
            if(!memoryCache.TryGetValue(id, out flight_plan))
            {
                if(flight_plan == null)
                {

                }
                return flight_plan;
            }
           
            /*
            var fp = memoryCache.Get<FlightPlan?>(id);
            if(fp != null)
            {
                return fp;
            }
            return fp;
            */
            return null;
        }
        
        // POST: api/FlightPlan
        [HttpPost]
        public void Post([FromBody] FlightPlan flightPlan)
        {
            memoryCache.Set(flightPlan.FlightPlanId, flightPlan);

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            memoryCache.Remove(id);

        }
        
    }
}
