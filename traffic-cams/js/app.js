/*
    app.js
    main script file for this mapping application
    source data URL: https://data.seattle.gov/resource/65fc-btcc.json
*/
$(function () {
    'use strict';

    var map;
    var countSDOT = 0;
    var countWSDOT = 0;
    var pinpoints =[];
    var url = 'https://data.seattle.gov/resource/65fc-btcc.json';

    function createMap(loc, zoom) {
        map = L.map('map').setView(loc, zoom);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
    createMap([47.6097, -122.3331], 11);

    // listen to layer removed, and update counts for SDOT and WSDOT
    map.on('layerremove',function(e) {
        var layer = e.layer;
        if (layer.options.color === '#7C3BB8') {
            countSDOT--;
        } else {
            countWSDOT--;
        }

        $('#sdotCount').text(countSDOT);
        $('#wsdotCount').text(countWSDOT);
    });

    // listen to layer added, and update counts for SDOT and WSDOT
    map.on('layeradd', function(e) {
        var layer = e.layer;
        if (layer.options.color === '#7C3BB8') {
            countSDOT++;
        } else {
            countWSDOT++;
        }

        $('#sdotCount').text(countSDOT);
        $('#wsdotCount').text(countWSDOT);
    });

    // retrieve traffic camera data, draw markers accordingly
    $.getJSON(url).then(function(data) {
        data.forEach(function(loc) {
            var lat = loc.location.latitude;
            var long = loc.location.longitude;
            var image = loc.imageurl.url;
            var cameraLabel = loc.cameralabel;
            var ownership = loc.ownershipcd;
            var popupText = cameraLabel + '<img src="' + image + '">';

           var color ="";
            if (ownership == 'SDOT') {
                color = '#7C3BB8';
            } else {
                color = '#FDDD0B';
            }

            var m = new L.circleMarker([lat,long], {color: color, fillOpacity: 0.8, weight: 0.5})
                .bindPopup(popupText, {className: 'cameraImage'})
                .addTo(map);

            // keep track of each marker and associate it with its label
            pinpoints.push ({
                marker: m,
                label: cameraLabel
            });
        });

        $('#infoBar').append('<p ><span id = "sdotCount">' + countSDOT +
            '</span> by SDOT, <span id = "wsdotCount">' + countWSDOT + '</span> by WSDOT</p>');
    });

    // filter listener, change markers based on the the filter applied
    var trafficFilter = document.getElementById('traffic-filter-field');
    trafficFilter.addEventListener('keyup', function() {
        var filter = this.value.toLowerCase();

        var filterPins = pinpoints.filter(function(pinpoint) {

            // if filter doesn't match a label, remove the marker from map
            if (pinpoint.label.toLowerCase().indexOf(filter) < 0) {
                map.removeLayer(pinpoint.marker);
            } else {
                if (!map.hasLayer(pinpoint.marker)) {
                    map.addLayer(pinpoint.marker);
                }
            }
        });
    });
});