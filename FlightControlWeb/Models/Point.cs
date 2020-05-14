using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightControlWeb.Models
{
    public class Point
    {
        private double x;
        private double y;
        public double X
        {
            get 
            { 
                return this.x; 
            }
            set
            {
                this.x = value;
            }
        }
        public double Y
        {
            get 
            {
                return this.y;
            } 
            set
            {
                this.y = value;
            } 
        }
    }
}
