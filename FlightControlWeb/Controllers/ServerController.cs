using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightControlWeb.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FlightControlWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ServerController : ControllerBase
    {
        
        private IServerManager serverManager;
        /*
        public ServerController(IServerManager manager)
        {
            serverManager = manager;
        }
        */
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Server/5
        [HttpGet("{id}", Name = "Get")]
        public Server Get(int id)
        {
            return new Server { ServerId = id, ServerURL = "cds" };
            
        }

        [HttpPost]
        public void Post(Server server)
        {
            serverManager.AddServer(server);
        }

        // PUT: api/Server/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
