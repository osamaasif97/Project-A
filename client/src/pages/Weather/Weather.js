
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'

const Weather = () => {

    const apiKey = "3b42f99f3b8d393b56ff698b59956e48"

    function fetchWeather(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city +
            "&units=metric&appid="
            + apiKey
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.cod === '404') {
                    swal({
                        title: "Error",
                        text: "City not Found",
                        icon: "warning",
                        button: "Continue",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    })
                }
                else if (data.cod !== '404') {
                    displayWeather(data)
                }
                console.log(data);
            }
            )
            .catch((e) => { throw e })

    }
    function displayWeather(data) {
        const { name } = data
        const { icon, description } = data.weather[0]
        const { temp, humidity, feels_like } = data.main
        const { speed } = data.wind
        // console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".city").innerText = "Weather in " + name
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".description").innerText = description
        document.querySelector(".city").innerText = name
        document.querySelector(".temp").innerText = temp + "°C"
        document.querySelector(".feels-like").innerText = "Feels like: " + feels_like + "°C"
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%"
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h"
        document.querySelector(".weather").classList.remove("loading")
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
    }

    const searchLOC = async () => {
        await fetchWeather(document.querySelector(".search-bar").value)
        // console.log(document.querySelector(".search-bar"))
    }

    let geocode = {
        reverseGeocode: function (latitude, longitude) {
            var api_key = '9fff6b22e4b542999f73dd5eeee640a2';

            var api_url = 'https://api.opencagedata.com/geocode/v1/json'

            var request_url = api_url
                + '?'
                + 'key=' + api_key
                + '&q=' + encodeURIComponent(latitude + ',' + longitude)
                + '&pretty=1'
                + '&no_annotations=1';

            // see full list of required and optional parameters:
            // https://opencagedata.com/api#forward

            var request = new XMLHttpRequest();
            request.open('GET', request_url, true);

            request.onload = function () {
                // see full list of possible response codes:
                // https://opencagedata.com/api#codes

                if (request.status === 200) {
                    // Success!
                    var data = JSON.parse(request.responseText);
                    fetchWeather(data.results[0].components.city)
                    // alert(data.results[0].components.city); // print the location

                } else if (request.status <= 500) {
                    // We reached our target server, but it returned an error

                    console.log("unable to geocode! Response code: " + request.status);
                    var data2 = JSON.parse(request.responseText);
                    console.log('error msg: ' + data2.status.message);
                } else {
                    console.log("server error");
                }
            };

            request.onerror = function () {
                // There was a connection error of some sort
                console.log("unable to connect to server");
            };

            request.send();  // make the request
        },
        getLocation: function () {
            function success(data) {
                geocode.reverseGeocode(data.coords.latitude, data.coords.longitude)
            }
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, console.error)
            }
            else {
                fetchWeather("Lahore")
            }
        }
    }

    useEffect(() => {
        // fetchWeather("Lahore")
        document.querySelector('.search button').addEventListener("click", function () {
            searchLOC()
        })
        document.querySelector('.search-bar').addEventListener("keyup", function (e) {
            if (e.key === 'Enter') {
                searchLOC()
            }
        })
        geocode.getLocation()
    }, [])

    return <>

        <div className='weather-body' >
            <div className='card'>
                <div className='search'>
                    <input type="text" className="search-bar" placeholder='Search' />
                    <button className="search-button">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className='weather loading'>
                    <h2 className='city'>Lahore</h2>
                    <h4 className="feels-like">Feels like: 26.8°C</h4>
                    <h1 className='temp'>20°C</h1>
                    <div className='flex'>
                        <img src='' alt='' className='icon' />
                        <div className='description'>Cloudy</div>
                    </div>
                    <div className='humidity'>Humidity: 60%</div>
                    <div className='wind'> Wind Speed: 4 Km/h</div>
                    <a href='/home' style={{ float: 'right', "text-decoration": 'rgb(145, 135, 135)', position: 'relative', bottom: '21px', color: 'white' }}>Go Home</a>
                </div>
            </div>
        </div>
    </>
}

export default Weather