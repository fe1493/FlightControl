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
    public class FlightsController : ControllerBase
    {
        private IFlightManager flightManager;
        private IMemoryCache memoryCache;

        public FlightsController(IFlightManager manager, IMemoryCache cache)
        {
            flightManager = manager;
            memoryCache = cache;
        }



        public async Task<List<Flight>> Func(Server servers, string relativeTime)
        {
            HttpRequestClass httpRequestClass = new HttpRequestClass();
            string param = "/api/flights"+relativeTime;
            var response = await httpRequestClass.makeRequest(servers.ServerURL + param);
            List<Flight> flightsList = new List<Flight>();
            flightsList = JsonConvert.DeserializeObject<List<Flight>>(response);
            return flightsList;
        }



        [HttpGet]
        public async Task<IEnumerable<Flight>> GetFlights([FromQuery(Name = "relative_to")]string relativeTime)
        {
            DateTime relativeTo;
            if (!DateTime.TryParse(relativeTime, out relativeTo))
            {
                return null;
            }
            //set the urc time zone
            relativeTo = relativeTo.ToUniversalTime();

            List<Flight> flightsList = new List<Flight>();
            if (Request.Query.ContainsKey("sync_all"))
            {
                List<string> serverIdKeysList = memoryCache.Get("serverListKeys") as List<string>;
                if (serverIdKeysList != null)
                {
                    IEnumerable<Flight> remoteflights;
                    remoteflights = await GetFlightsRemoteServers(serverIdKeysList, relativeTime);
                    flightsList.AddRange(remoteflights);
                }


            }
            //list of keys of flight plans in our server
            List<string> fpListOfKeys = memoryCache.Get("flightListKeys") as List<string>;
            if (fpListOfKeys != null)
            {
                foreach (var id in fpListOfKeys)
                {
                    FlightPlan fp;

                    fp = memoryCache.Get<FlightPlan>(id);
                    Flight flight = flightManager.CreateUpdatedFlight(fp, relativeTo);

                    if (flight != null)
                    {
                        flightsList.Add(flight);

                    }
                }
            }
            return flightsList;
        }

        public async Task<IEnumerable<Flight>> GetFlightsRemoteServers(List<string> serverIdKeysList, string relativeTime)
        {
            List<Flight> flightsList = new List<Flight>();
            //for each id of server -> insert all id's of all its flights into a List/array
            //put map in cache
            foreach (var id in serverIdKeysList)
            {
                Server server = memoryCache.Get(id) as Server;
                flightsList.AddRange(await Func(server, relativeTime));

                List<string> flightsKeysList = new List<string>();
                foreach (var flight in flightsList)
                {
                    flightsKeysList.Add(flight.FlightId);
                }

                //create map/dictonary
                //key = Id of server, value = list of all id's of servers flights
                Dictionary<string, List<string>> myDictonary = new Dictionary<string, List<string>>();

                if (!memoryCache.TryGetValue("keyOfMyDictonary", out myDictonary))
                {
                    myDictonary = new Dictionary<string, List<string>>();
                    myDictonary.Add(id, flightsKeysList);
                    memoryCache.Set("keyOfMyDictonary", myDictonary);
                }
                else
                {
                    myDictonary[id] = flightsKeysList;
                    memoryCache.Remove("keyOfMyDictonary");
                    memoryCache.Set("keyOfMyDictonary", myDictonary);

                }

            }
            return flightsList;


        }
        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public ActionResult<FlightPlan> Delete(string id)
        {
            //check if other servers have the id and erase it
            List<string> fpKeys = memoryCache.Get("flightListKeys") as List<string>;

            FlightPlan fp = new FlightPlan();
            if (!memoryCache.TryGetValue(id, out fp))
            {
                return BadRequest();
            }
            else
            {
                fpKeys.Remove(id);
                memoryCache.Remove(id);
                return Ok();
            }



        }
    }
}