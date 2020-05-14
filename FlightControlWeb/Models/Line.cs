using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightControlWeb.Models
{
    public class Line
    {
        private Point startPoint;
        private Point endPoint;

        public Point StartPoint 
        { 
            get
            { 
                return this.startPoint; 
            }
            set
            {
                this.startPoint = value;
            } 
        } 
        public Point EndPoint
        {
            get
            {
                return this.endPoint;
            }
            set
            {
                this.endPoint = value;
            }
        }
        //the function returns the propotionl point on the line according to the parameter that is a fraction
        public Point GetPointOnLine(double fraction)
        {
            //check valid parameter
            if (fraction >1)
            {
                return null;
            }
            double xDistance = (endPoint.X - startPoint.X)*fraction;
            double yDistance = (endPoint.Y - startPoint.Y)*fraction;
            Point newPoint = new Point { X = startPoint.X + xDistance, Y = startPoint.Y + yDistance };
            
            return newPoint;
        }

    }
}
