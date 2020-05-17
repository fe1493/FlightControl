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

            List<int> cache_list_keys = new List<int>();

            if (!memoryCache.TryGetValue("list_key", out cache_list_keys))
            {
                cache_list_keys = new List<int>();
                cache_list_keys.Add(flightPlan.FlightPlanId);
                memoryCache.Set("list_key", cache_list_keys);
            }
            else
            {
                cache_list_keys.Add(flightPlan.FlightPlanId);
                memoryCache.Remove("list_key");
                memoryCache.Set("list_key", cache_list_keys);

            }



         

        }
        /*
        public void Post([FromBody] FlightPlan flightPlan)
        {
            string flightPlanId = flightManager.CreateIdentifier(flightPlan);
            flightPlan.FlightPlanId = flightPlanId;
            _cache.Set(flightPlan.FlightPlanId, flightPlan);

            List<string> keys = new List<string>();
            if (!_cache.TryGetValue("list_key", out keys))
            {
                keys = new List<string>();
                keys.Add(flightPlan.FlightPlanId);
                _cache.Set("list_key", keys);
            }
            else
            {
                keys.Add(flightPlan.FlightPlanId);
                _cache.Remove("list_key");
                _cache.Set("list_key", keys);

            }
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
