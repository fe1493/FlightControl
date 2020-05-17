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
        private IMemoryCache _cache;

        // dependency injection
        public FlightPlanController(IFlightManager manager, IMemoryCache cache)
        {
            flightManager = manager;
            _cache = cache;
        }



        // GET: api/FlightPlan/5
        [HttpGet("{id}")]
        public FlightPlan GetFlightPlan(string id)
        {
            var flight_plan = new FlightPlan();

            var fp = _cache.Get<FlightPlan>(id);
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

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            List<string> cache_list_keys = _cache.Get("list_key") as List<string>;
            cache_list_keys.Remove(id);

            _cache.Remove(id);

        }

    }
}
