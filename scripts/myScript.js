//-----------------------------------------------------------------------
//Carousel Settings
//-----------------------------------------------------------------------
$(document).ready(function () {
    "use strict";

    //Setting the Height equal to Height of Window
    $('.fullHeight').css('height', $(window).height());



    //Adjust height of .fullHeight Elements on Window Resize
    $(window).resize(function () {
        $('.fullHeight').css('height', $(window).height());
    });


    //To set "background-size: cover" for all Slider/Carousel images
    $.each(jQuery('.carousel .item'), function (i, val) {
        $(this).css('background-image', 'url(' + $(this).find('img').attr('src') + ')').css('background-size', 'cover').find('img').css('visibility', 'hidden');
    });
});


//-----------------------------------------------------------------------
//Animation: To Initiate the WOW Animation Method
//-----------------------------------------------------------------------
$(document).ready(function () {

    "use strict";

    new WOW().init();
});


//-----------------------------------------------------------------------
//BXSlider: To Initiate BX Slider for Client Section
//-----------------------------------------------------------------------
$(document).ready(function () {
    $('.bxslider').bxSlider({
        minSlides: 6,
        maxSlides: 8,
        slideWidth: 150,
        slideMargin: 50,
        ticker: true,
        speed: 10000
    });
});


//-----------------------------------------------------------------------
//Careers: To load Careers from Careers.JSON
//-----------------------------------------------------------------------
$(document).ready(function () {

    "use strict";

    if ($('section').is('#careerPG')) {

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                var careerObj = JSON.parse(this.responseText, function (key, value) {
                    if (key == "startDate") {
                        var startDate = new Date(value);
                        var formattedStartDate = startDate.getMonth() + " / " + startDate.getDate() + " / " + startDate.getFullYear();
                        return formattedStartDate;
                    } else if (key == "endDate") {
                        var endDate = new Date(value);
                        var formattedEndDate = endDate.getMonth() + " / " + endDate.getDate() + " / " + endDate.getFullYear();
                        return formattedEndDate;
                    } else {
                        return value;
                    }
                });

                var careerContainer = document.getElementById("accordion");

                for (var i = 0; i < careerObj.length; i++) {
                    careerContainer.innerHTML += " \
                    <div class='panel panel-default'> \
                        <div class='panel-heading' role='tab' id=heading" + careerObj[i].id + "> \
                            <h4 class='panel-title'> \
                                <a class='accordion-toggle collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href=#collapse" + careerObj[i].id + " aria-expanded='false' aria-controls=collapse" + careerObj[i].id + ">" + careerObj[i].id + ". " + careerObj[i].position + "</a> \
                            </h4> \
                        </div> \
                        <div id=collapse" + careerObj[i].id + " class='panel-collapse collapse' role='tabpanel' aria-labelledby=heading" + careerObj[i].id + "> \
                            <div class='panel-body'> \
                                <dl class='dl-horizontal'> \
                                    <dt>Location: </dt> \
                                    <dd> " + careerObj[i].location + "</dd> \
                                    <dt>Start Date: </dt> \
                                    <dd> " + careerObj[i].startDate + "</dd> \
                                    <dt>End Date: </dt> \
                                    <dd> " + careerObj[i].endDate + "</dd> \
                                    <dt>Experience: </dt> \
                                    <dd> " + careerObj[i].experience + "</dd> \
                                    <dt>Job Description: </dt> \
                                    <dd> " + careerObj[i].jobDescription + "</dd> \
                                </dl> \
                            </div> \
                        </div> \
                    </div>";
                }
            }
        }

        xmlhttp.open("GET", "/careers.json", true);
        xmlhttp.send();

    }
});


//-----------------------------------------------------------------------
//Using Google Maps to show my Location
//-----------------------------------------------------------------------
$(document).ready(function () {

    "use strict";

    function googleMap() {
        var mapOptions = {
            center: new google.maps.LatLng(40.0751708, -75.4142498),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP //ROADMAP || SATELLITE || HYBRID || TERRAIN
        }

        var map = new google.maps.Map(document.getElementById("myLocation"), mapOptions);

        //Set or Point a Marker
        var marker = new google.maps.Marker({ //To set a Marker (Overlay) on the Google Map
            position: mapOptions.center,
            animation: google.maps.Animation.BOUNCE, //Bounce Animation
            icon: "../images/icons/blackMarker.png" //Custom Icon
        });
        marker.setMap(map);

        //Info Window for User
        var infoWindow = new google.maps.InfoWindow({
            content: "487 Devon Park Drive, <br />Suite #215, <br /> Philadelphia, PA 19087"
        });
        infoWindow.open(map, marker);
    }

    if ($('div').is('#myLocation')) {
        googleMap();
    }
});