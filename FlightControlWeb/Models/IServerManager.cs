using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightControlWeb.Models
{
   public interface IServerManager
    {
        Servers GetServer(string id);
        void AddServer(Servers server);
    }
}
