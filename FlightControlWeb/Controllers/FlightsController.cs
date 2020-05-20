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



        public async Task<List<Flights>> Func(Servers servers)
        {
            HttpRequestClass httpRequestClass = new HttpRequestClass();
            string param = "/api/Flight";
            var response = await httpRequestClass.makeRequest(servers.ServerURL + param);
            List<Flights> fl = new List<Flights>();
            fl = JsonConvert.DeserializeObject<List<Flights>>(response);
            return fl;
        }



        [HttpGet]
        public async Task<IEnumerable<Flights>> GetFlights(DateTime relative_to)
        {
            List<Flights> flightsList = new List<Flights>();           
            if (Request.Query.ContainsKey("sync_all"))
            {
                List<string> serverIdKeysList = memoryCache.Get("serverListKeys") as List<string>;
               
                //for each id of server -> insert all id's of all its flights into a List/array
                //put map in cache
               


                foreach (var id in serverIdKeysList)
                {
                    Servers server = memoryCache.Get(id) as Servers;
                    List<Flights> fl = new List<Flights>();
                    fl = await Func(server);

                    List<string> flightsKeysList = new List<string>();
                    foreach (var flight in fl)
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
                        myDictonary.Add(id, flightsKeysList);
                        memoryCache.Remove("keyOfMyDictonary");
                        memoryCache.Set("keyOfMyDictonary", myDictonary);

                    }


                    flightsList.AddRange(fl);
                }
                
            }
            //list of keys of flight plans in our server
            List<string> fpListOfKeys = memoryCache.Get("flightListKeys") as List<string>;
            if(fpListOfKeys != null)
            {
                foreach (var id in fpListOfKeys)
                {
                    FlightPlan fp;

                    fp = memoryCache.Get<FlightPlan>(id);
                    Flights flight = flightManager.CreateUpdatedFlight(fp, relative_to);
                    
                    if(flight!= null)
                    {
                        flightsList.Add(flight);

                    }
                }
            }
           
            return flightsList;
        }
    }
}
