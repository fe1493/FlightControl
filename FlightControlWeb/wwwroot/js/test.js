let f1 = {
    "passengers": 236,
    "company_name": "Realmo Air",
    "initial_location": {
      "latitude": 4,
      "longitude": 120,
      "date_time": "2019-04-27T19:29:26Z"
    },
    "segments": [
      {
        "longitude": 32,
        "latitude": 62,
        "timespan_seconds": 116
      },
      {
        "longitude": 13,
        "latitude": 7,
        "timespan_seconds": 956
      }
    ]
  }

let f2 = {
    "passengers": 311,
    "company_name": "Aquoavo ",
    "initial_location": {
      "latitude": 76,
      "longitude": 89,
      "date_time": "2018-12-15T15:26:51Z"
    },
    "segments": [
      {
        "longitude": 177,
        "latitude": 88,
        "timespan_seconds": 567
      },
      {
        "longitude": 180,
        "latitude": 85,
        "timespan_seconds": 420
      }
    ]
  }

  let f3 = {
    "passengers": 242,
    "company_name": "Digigen Airlines",
    "initial_location": {
      "latitude": 35,
      "longitude": 50,
      "date_time": "2019-05-20T21:24:07Z"
    },
    "segments": [
      {
        "longitude": 48,
        "latitude": 71,
        "timespan_seconds": 917
      },
      {
        "longitude": 150,
        "latitude": 48,
        "timespan_seconds": 493
      }
    ]
  }

  let f4 = {
    "passengers": 341,
    "company_name": "Emtrak Airways",
    "initial_location": {
      "latitude": 34,
      "longitude": 158,
      "date_time": "2018-02-11T12:43:35Z"
    },
    "segments": [
      {
        "longitude": 13,
        "latitude": 84,
        "timespan_seconds": 303
      },
      {
        "longitude": 10,
        "latitude": 13,
        "timespan_seconds": 490
      },
      {
        "longitude": 34,
        "latitude": 22,
        "timespan_seconds": 675
      },
      {
        "longitude": 31,
        "latitude": 76,
        "timespan_seconds": 309
      }
    ]
  }

function testFlights(){
    let currentTime = getCurrentTime();
    f1.date_time = currentTime;
    f2.date_time = currentTime;
    f3.date_time = currentTime;
    f4.date_time = currentTime;
    postflightplan(f1);
    postflightplan(f2);
    postflightplan(f3);
    postflightplan(f4);
}

function postflightplan(flightPlan){
    let url1 = "http://ronyut2.atwebpages.com/ap2/api/FlightPlan";
    $.ajax({
      url: url1,
      type: 'POST',
      contentType:'application/json',
      data: JSON.stringify(flightPlan),
      dataType:'json'
    });
}
