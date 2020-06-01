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
    public class serversController : ControllerBase
    {

        private IServerManager serverManager;
        private IMemoryCache memoryCache;

        public serversController(IServerManager manager, IMemoryCache cache)
        {
            serverManager = manager;
            memoryCache = cache;

        }
        // GET:    /api/servers
        [HttpGet]
        public IEnumerable<Server> Get()
        {

            List<Server> serverslist = new List<Server>();


            List<string> serverIdKeysList = memoryCache.Get("serverListKeys") as List<string>;

            foreach (var id in serverIdKeysList)
            {
                Server server;

                server = memoryCache.Get<Server>(id);

                serverslist.Add(server);
            }
            return serverslist;

        }

        // POST:    /api/servers
        [HttpPost]
        public void Post(Server server)
        {
            memoryCache.Set(server.ServerId, server);


            List<string> serverIdKeysList = new List<string>();
            if (!memoryCache.TryGetValue("serverListKeys", out serverIdKeysList))
            {
                serverIdKeysList = new List<string>();
                serverIdKeysList.Add(server.ServerId);
                memoryCache.Set("serverListKeys", serverIdKeysList);
            }
            else
            {
                serverIdKeysList.Add(server.ServerId);
                memoryCache.Remove("serverListKeys");
                memoryCache.Set("serverListKeys", serverIdKeysList);

            }

        }



        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {

            List<string> serverIdKeysList = memoryCache.Get("serverListKeys") as List<string>;
            serverIdKeysList.Remove(id);
            memoryCache.Remove(id);
        }
    }
}