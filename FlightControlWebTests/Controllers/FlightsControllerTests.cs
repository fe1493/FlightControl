using Microsoft.VisualStudio.TestTools.UnitTesting;
using FlightControlWeb.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using Moq;
using Microsoft.Extensions.Caching.Memory;
using FlightControlWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Net.Http;

namespace FlightControlWeb.Controllers.Tests
{
    [TestClass()]
    public class FlightsControllerTests
    {
        private Microsoft.Extensions.Caching.Memory.MemoryCache cache;
        private FlightPlan testFlightPlan;
        [TestInitialize]
        public void TestInitialize()
        {
            cache = new Microsoft.Extensions.Caching.Memory.MemoryCache(new MemoryCacheOptions());
            List<string> fpListOfKeys = new List<string>();
            List<Segment> segments = new List<Segment>();
            Segment segment = new Segment { Latitude = 30, Longitude = 60, TimespanSeconds = 120 };
            segments.Add(segment);
            testFlightPlan = new FlightPlan
            {
                FlightPlanId = "123",
                InitialLocation = new FlightPlan.Location { Longitude = 0, Latitude = 0, DateTime = DateTime.Parse("2020-05-30T12:00:00Z") },
                Segments = segments
            };
            fpListOfKeys.Add("123");
            cache.Set("flightListKeys", fpListOfKeys);
            cache.Set("123", testFlightPlan);
        }

        [TestMethod()]
        public async Task GetFlightsTestRetunsListOfFlights()
        {
            //Arrange
            var controllerContext = new ControllerContext();
            var mockManager = new Mock<IFlightManager>();
            Flight flight = new Flight { FlightId = "123", Latitude = 13, Longitude = 30 };
            List<Flight> expectedList = new List<Flight>();
            expectedList.Add(flight);
            mockManager.Setup(mm => mm.CreateUpdatedFlight(testFlightPlan, It.IsAny<DateTime>()))
                .Returns(flight);
            FlightsController flightsController = new FlightsController(mockManager.Object, cache);

            //Act
            var actual = await flightsController.GetFlights("2020-05-30T12:03:00Z");
            List<Flight> actualList = actual.Value as List<Flight>;

            //Assert
            Assert.AreEqual(expectedList[0].Latitude, actualList[0].Latitude);
        }
        [TestMethod()]
        public async Task GetFlightsTestRetunsEmptyList()
        {
            //Arrange
            var controllerContext = new ControllerContext();
            var mockManager = new Mock<IFlightManager>();
            mockManager.Setup(mm => mm.CreateUpdatedFlight(It.IsAny<FlightPlan>(), It.IsAny<DateTime>())).Returns((Flight)null);
            FlightsController flightsController = new FlightsController(mockManager.Object, cache);

            //Act
            var actual = await flightsController.GetFlights("2020-05-30T12:03:00Z");
            List<Flight> actualList = actual.Value as List<Flight>;

            //Assert
            Assert.AreEqual(actualList.Count, 0);
        }
        [TestMethod()]
        public void DeleteFlightReturnsOK()
        {
            //Arrange
            var mockManager = new Mock<IFlightManager>();
            FlightsController flightsController = new FlightsController(mockManager.Object, cache);

            //Act
            var actualResult = flightsController.Delete("123");
            var statusCodeResult = (StatusCodeResult)actualResult;

            //Assert
            Assert.AreEqual(200, statusCodeResult.StatusCode);


        }
        [TestMethod()]
        public void DeleteFlightReturnsBadRequest()
        {
            //Arrange
            var mockManager = new Mock<IFlightManager>();
            FlightsController flightsController = new FlightsController(mockManager.Object, cache);

            //Act
            var actualResult = flightsController.Delete("000");
            var statusCodeResult = (StatusCodeResult)actualResult;

            //Assert 
            //the Id is not found and could not be deleted
            Assert.AreEqual(400, statusCodeResult.StatusCode);


        }
    }
}