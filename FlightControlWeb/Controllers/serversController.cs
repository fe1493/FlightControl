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
    public class ServersController : ControllerBase
    {

        private IServerManager serverManager;
        private IMemoryCache memoryCache;

        public ServersController(IServerManager manager, IMemoryCache cache)
        {
            serverManager = manager;
            memoryCache = cache;

        }
        // POST:  i think:   /api/servers
        [HttpGet]
        public IEnumerable<Servers> Get()
        {

            List<Servers> serverslist = new List<Servers>();


            List<string> cache_list_keys = memoryCache.Get("list_key") as List<string>;

            foreach (var id in cache_list_keys)
            {
                Servers server;

                server = memoryCache.Get<Servers>(id);

                serverslist.Add(server);
            }
            return serverslist;
        }

        // POST:  i think:   /api/servers
        [HttpPost]
        public void Post(Servers server)
        {
            memoryCache.Set(server.ServerId, server);

            List<string> keys = new List<string>();
            if (!memoryCache.TryGetValue("list_key", out keys))
            {
                keys = new List<string>();
                keys.Add(server.ServerId);
                memoryCache.Set("list_key", keys);
            }
            else
            {
                keys.Add(server.ServerId);
                memoryCache.Remove("list_key");
                memoryCache.Set("list_key", keys);

            }
        }



        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {

            List<string> cache_list_keys = memoryCache.Get("list_key") as List<string>;
            cache_list_keys.Remove(id);
            memoryCache.Remove(id);
        }
    }
}
