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
            memoryCache.Set(-1, new List<int> { });
        }
        
  
        
        // GET: api/FlightPlan/5
        [HttpGet("{id}")]
        public FlightPlan Get(int id)
        {

            var flight_plan = new FlightPlan();

            var fp = memoryCache.Get<FlightPlan?>(id);
            if(fp != null)
            {
                //need to throw error?

                return fp;
            }
            return fp;
            
            
        }
        
        // POST: api/FlightPlan
        [HttpPost]
        public void Post([FromBody] FlightPlan flightPlan)
        {
            memoryCache.Set(flightPlan.FlightPlanId, flightPlan);

            List<int> cache_list_keys = memoryCache.Get<List<int>?>(-1);
            cache_list_keys.Add(flightPlan.FlightPlanId);

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            memoryCache.Remove(id);

        }
        
    }
}
