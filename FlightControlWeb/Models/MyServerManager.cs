using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightControlWeb.Models
{
    public class MyServerManager: IServerManager
    {
   
            List<servers> servers = new List<servers>();
            public servers GetServer(int id)
            {
                return servers.Find(item => item.ServerId == id);



            }
            public void AddServer(servers server)
            {
                servers.Add(server);
            }

        
    }
}
