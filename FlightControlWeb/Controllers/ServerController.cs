using System.Collections.Generic;
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

        private IMemoryCache memoryCache;

        public ServersController(IMemoryCache cache)
        {
            memoryCache = cache;

        }
        // GET:    /api/servers
        [HttpGet]
        public ActionResult<IEnumerable<Server>> Get()
        {

            List<Server> serverslist = new List<Server>();


            List<string> serverIdKeysList = memoryCache.Get("serverListKeys") as List<string>;
            if (serverIdKeysList == null)
            {
                return BadRequest("Could not find any servers");
            }

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
        public ActionResult Post(Server server)
        {
            Server checkIdServer = memoryCache.Get(server.ServerId) as Server;
            if (checkIdServer != null)
            {
                return BadRequest("Server id is already exist");
            }
            //remove the '/' in the end of the url, if exist
            string checkURL = server.ServerURL;
            if (checkURL[checkURL.Length-1] == '/')
            {
                server.ServerURL = checkURL.Substring(0, checkURL.Length - 1);
            }

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
            }
            return Ok();

        }



        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {

            List<string> serverIdKeysList = memoryCache.Get("serverListKeys") as List<string>;
            Server server = new Server();
            if (!memoryCache.TryGetValue(id, out server))
            {
                return BadRequest("Could not find server with this id");
            }
            else
            {
                serverIdKeysList.Remove(id);
                memoryCache.Remove(id);
                return Ok();

            }
        }
    }
}