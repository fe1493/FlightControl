using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightControlWeb.Models
{
    public class MyServerManager: IServerManager
    {
   
            List<Servers> servers = new List<Servers>();
            public Servers GetServer(int id)
            {
                return servers.Find(item => item.ServerId == id);



            }
            public void AddServer(Servers server)
            {
                servers.Add(server);
            }

        
    }
}
