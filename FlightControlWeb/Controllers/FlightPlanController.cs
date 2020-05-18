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
        public FlightPlan GetFlightPlan(string id)
        {
            var fp = memoryCache.Get<FlightPlan>(id);
            if (fp == null)
            {
                return null;
            }
            return fp;


        }
            
        // POST: api/FlightPlan
        [HttpPost]
        public void Post([FromBody] FlightPlan flightPlan)
        {
            string flightPlanId = flightManager.CreateIdentifier(flightPlan);
            flightPlan.FlightPlanId = flightPlanId;
            memoryCache.Set(flightPlan.FlightPlanId, flightPlan);
            
            List<string> fpKeys = new List<string>();
            if (!memoryCache.TryGetValue("flightListKeys", out fpKeys))
            {
                fpKeys = new List<string>();
                fpKeys.Add(flightPlan.FlightPlanId);
                memoryCache.Set("flightListKeys", fpKeys);
            }
            else
            {
                fpKeys.Add(flightPlan.FlightPlanId);
                memoryCache.Remove("flightListKeys");
                memoryCache.Set("flightListKeys", fpKeys);
                
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            List<string> cache_list_keys = memoryCache.Get("flightListKeys") as List<string>;
            cache_list_keys.Remove(id);

            memoryCache.Remove(id);

        }

    }
}
