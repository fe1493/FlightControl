using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightControlWeb.Models
{
   public interface IServerManager
    {
        Server GetServer(string id);
        void AddServer(Server server);
    }
}
