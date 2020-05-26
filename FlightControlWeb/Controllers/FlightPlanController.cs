using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightControlWeb.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;


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




        public async Task<FlightPlan> GetFlightPlanByIdFromServer(Server servers, string param)
        {

            HttpRequestClass httpRequestClass = new HttpRequestClass();
            var result = await httpRequestClass.makeRequest(servers.ServerURL + param);


            FlightPlan fp = new FlightPlan();
            fp = JsonConvert.DeserializeObject<FlightPlan>(result);
            return fp;
        }

        // GET: api/FlightPlan/5
        [HttpGet("{id}")]
        public async Task<ActionResult< FlightPlan>> GetFlightPlan(string id)
        {
            var fp = memoryCache.Get<FlightPlan>(id);
            if (fp == null)
            {
                //need to check all the other servers
                Dictionary<string, List<string>> myDictonary = new Dictionary<string, List<string>>();



                if (!memoryCache.TryGetValue("keyOfMyDictonary", out myDictonary))
                {
                    // no flight plan with that id
                    return BadRequest("No flight plan with that id");
                }
                else
                {

                    foreach (KeyValuePair<string, List<string>> kvp in myDictonary)
                    {
                        List<string> list = kvp.Value;

                        foreach (var flightId in list)
                        {
                            if (flightId == id)
                            {

                                Server server = memoryCache.Get(kvp.Key) as Server;

                                //send get request to server with specific ID
                                FlightPlan flightPlan = new FlightPlan();
                                string param = "/api/FlightPlan/";
                                flightPlan = await GetFlightPlanByIdFromServer(server, param + flightId);

                                return flightPlan;
                            }
                        }
                    }
                }
            }
            return fp;
        }

        // POST: api/FlightPlan
        [HttpPost]
        public ActionResult<string> Post([FromBody] FlightPlan flightPlan)
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
            }
            return Ok(flightPlanId);
        }



    }
}