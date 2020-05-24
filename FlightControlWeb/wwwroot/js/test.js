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
      "date_time": "2020-05-24T18:07:15Z"
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
    f1.initial_location.date_time = currentTime;
    f2.initial_location.date_time = currentTime;
    f3.initial_location.date_time = currentTime;
    f4.initial_location.date_time = currentTime;
    postflightplan(f1);
    postflightplan(f2);
    postflightplan(f3);
    postflightplan(f4);
}

function postflightplan(flightPlan) {
    (async () => {
        const rawResponse = await fetch("https://localhost:44389/api/flightplan", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flightPlan)
        });
        const content = await rawResponse.json();
    })();
}