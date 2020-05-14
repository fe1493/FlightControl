using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightControlWeb.Models
{
    public class MyServerManager: IServerManager
    {
   
               List<Server> servers = new List<Server>();
            public Server GetServer(int id)
            {
                return servers.Find(item => item.ServerId == id);

            }
            public void AddServer(Server server)
            {
                servers.Add(server);
            }

        
    }
}
