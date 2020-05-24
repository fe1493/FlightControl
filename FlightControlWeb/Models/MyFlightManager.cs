using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightControlWeb.Models
{
    public class MyFlightManager : IFlightManager
    {
        //the function finds the current location of the flightplan according to the given relative time
        public Flight CreateUpdatedFlight(FlightPlan flightPlan, DateTime relativeTime)
        {
            double secondsTimeSpan = SecondsGap(flightPlan.InitialLocation.DateTime, relativeTime);
            if (secondsTimeSpan < 0)
            {
                return null;
            }
            List<Segment> segments = flightPlan.Segments;
            double totalFlightTime = 0;
            double secondsAtCurrentSegment = 0;
            Segment prevSegment = InitialLocationToSegment(flightPlan);
            int i = 0;
            for (i = 0; i < segments.Count; i++)
            {
                totalFlightTime += segments[i].TimespanSeconds;
                if (secondsTimeSpan < totalFlightTime)
                {
                    secondsAtCurrentSegment = secondsTimeSpan - totalFlightTime + segments[i].TimespanSeconds;
                    break;
                }
                prevSegment = segments[i];
            }
            if (i == segments.Count)
            {
                return null;
            }
            Point p1 = new Point { X = prevSegment.Longitude, Y = prevSegment.Latitude };
            Point p2 = new Point { X = segments[i].Longitude, Y = segments[i].Latitude };
            Line line = new Line { StartPoint = p1, EndPoint = p2 };
            Point currentPoint = line.GetPointOnLine(secondsAtCurrentSegment / segments[i].TimespanSeconds);
            Flight updatedFlight = CreateCurrentFlight(flightPlan, currentPoint, relativeTime);
            return updatedFlight;
        }

        //this function calculates the distance in seconds between the relative time to flight departure
        private double SecondsGap(DateTime flightPlanInitialTime, DateTime relativeTime)
        {
            TimeSpan timeSpan = relativeTime - flightPlanInitialTime;
            double secondsTimeSpan = timeSpan.TotalSeconds;
            return secondsTimeSpan;

        }

        private Segment InitialLocationToSegment(FlightPlan flightPlan)
        {
            Segment segment = new Segment();
            segment.Latitude = flightPlan.InitialLocation.Latitude;
            segment.Longitude = flightPlan.InitialLocation.Longitude;
            segment.TimespanSeconds = 0;
            return segment;
        }
        private Flight CreateCurrentFlight(FlightPlan flightPlan, Point currentLocation, DateTime relativeTime)
        {
            Flight flight = new Flight();
            flight.CompanyName = flightPlan.CompanyName;
            flight.FlightId = flightPlan.FlightPlanId;
            flight.IsExternal = false;
            flight.Latitude = currentLocation.Y;
            flight.Longitude = currentLocation.X;
            flight.Passengers = flightPlan.Passengers;
            flight.DateTime = relativeTime;
            return flight;
        }


        //create a random id for a flight plan
        public string CreateIdentifier(FlightPlan flightPlan)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            int length = random.Next(6, 11);
            string companyStr = flightPlan.CompanyName;
            int companyNmLen = flightPlan.CompanyName.Length;
            int j = 0;
            for (int i = 0; i < 3; i++)
            {
                char c = Char.ToUpper(companyStr[j % companyNmLen]);
                if (c >= 'A' && c <= 'Z')
                {
                    builder.Append(c);
                    j++;
                }
                else
                {
                    i--;
                    j++;
                }
            }
            for (int i = 0; i < length - 3; i++)
            {
                builder.Append(random.Next(0, 10));
            }

            return builder.ToString();
        }
        public void SetExternalFlights(IEnumerable<Flight> flightsFromServer)
        {
            foreach (var flight in flightsFromServer)
            {
                flight.IsExternal = true;
            }
        }

    }
}
