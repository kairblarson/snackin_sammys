$(document).ready(function () {
    let isMenuActive = false;

    $(".loader").hide();

    //quote submission handler
    $("#contact-form").on("submit", function (event) {
        event.preventDefault();
        const isValidated = performFormValidation();

        console.log("Is valid? " + isValidated);

        if (!isValidated) return false;

        $("#send-btn-text").hide();
        $(".loader").show();

        emailjs.init("GlFg3EuTZXyyfEwMz");

        event.preventDefault();

        emailjs.sendForm("service_p7xdqxu", "template_pz6vov4", this).then(
            function (response) {
                $(".loader").hide();
                $("#send-btn-text").show();
                alert("Email has been sent, we will get back to you shortly");
                document.getElementById("contact-form").reset();
            },
            function (error) {
                $(".loader").hide();
                $("#send-btn-text").show();
                alert("Email could not be sent, please try again later");
                console.log("FAILED...", error);
            }
        );
    });

    function performFormValidation() {
        const nameField = $("#from_name");
        const emailField = $("#reply_to");
        const phoneNo = $("#phone_no");
        const eventType = $("#event_type");
        const eventAddress = $("#event_address");
        const eventDate = $("#event_date");
        const eventTime = $("#event_time");
        const noOfGuests = $("#no_of_guests");
        const messageField = $("#additional_info"); //not required

        if (nameField[0].value.trim() === "") {
            nameField.addClass("invalid-field");
            alert("Please enter your name before sending an inquiry");
            return false;
        }

        if (emailField[0].value.trim() == "" || !emailField[0].value.trim().includes("@")) {
            emailField.addClass("invalid-field");
            alert("Please enter your email before sending an inquiry");
            return false;
        }

        if (phoneNo[0].value.trim() == "") {
            phoneNo.addClass("invalid-field");
            alert("Please enter a phone number before sending an inquiry");
            return false;
        }

        if (eventType[0].value.trim() == "") {
            eventType.addClass("invalid-field");
            alert("Please select an event type before sending an inquiry");
            return false;
        }

        if (eventAddress[0].value.trim() == "") {
            eventAddress.addClass("invalid-field");
            alert("Please enter an address before sending an inquiry");
            return false;
        }

        if (eventDate[0].value.trim() == "") {
            eventDate.addClass("invalid-field");
            alert("Please enter a event date before sending an inquiry");
            return false;
        }

        if (eventTime[0].value.trim() == "") {
            eventTime.addClass("invalid-field");
            alert("Please enter the event time before sending an inquiry");
            return false;
        }

        if (noOfGuests[0].value.trim() == "") {
            noOfGuests.addClass("invalid-field");
            alert("Please enter the number of guests before sending an inquiry");
            return false;
        }

        return true;
    }

    $("#merch-right-arrow").click(function () {
        const selectedImage = $(".selected-image");
        const selectedImageID = Number(selectedImage.attr("id").substring(10, selectedImage.attr("id").length));

        if (selectedImageID >= 4) {
            $("#merch-img-1").addClass("selected-image");
            $("#selected-merch-image").attr("src", $("#merch-img-1").attr("src"));
        } else {
            $(`#merch-img-${selectedImageID + 1}`).addClass("selected-image");
            $("#selected-merch-image").attr("src", $(`#merch-img-${selectedImageID + 1}`).attr("src"));
        }

        selectedImage.removeClass("selected-image");
    });

    $("#merch-left-arrow").click(function () {
        const selectedImage = $(".selected-image");
        const selectedImageID = Number(selectedImage.attr("id").substring(10, selectedImage.attr("id").length));

        if (selectedImageID <= 1) {
            $("#merch-img-3").addClass("selected-image");
            $("#selected-merch-image").attr("src", $("#merch-img-3").attr("src"));
        } else {
            $(`#merch-img-${selectedImageID - 1}`).addClass("selected-image");
            $("#selected-merch-image").attr("src", $(`#merch-img-${selectedImageID - 1}`).attr("src"));
        }

        selectedImage.removeClass("selected-image");
    });

    $(".merch-other-img").click(function (e) {
        const imgNo = e.target.id.substring(e.target.id.length - 1, e.target.id.length);

        $(".merch-other-img").removeClass("selected-image");

        $(`#merch-img-${imgNo}`).addClass("selected-image");
        $("#selected-merch-image").attr("src", $(`#merch-img-${imgNo}`).attr("src"));
    });

    //purchase link example
    $("#three-competitor-enroll-btn").on("click", function () {
        // Create a new Payment Link with the dynamic price
        const paymentLink = `https://buy.stripe.com/7sIeYc0KG8W85vqaEG`;

        // Redirect to the Payment Link
        window.location.href = paymentLink;
    });
    //

    $(".menu-container").click(function () {
        if ($("#menuCheckbox").prop("checked") == true) {
            $("#menu").animate({ left: "-=100px" }, "slow");
        } else {
            $("#menu").animate({ left: "+=100px" }, "slow");
        }
    });

    //setting the height of the gradient overlay
    const heightOfVideo = $("#content-static-background").height();
    $(".content-gif-overlay").height(heightOfVideo);

    //setting the height of the unfocused div for when the mobile menu is active
    $("#unfocused-div").height($(window).height);

    //placing the mobile menu off the screen
    const widthOfMenu = $("#mobile-menu-container").width();
    $("#mobile-menu-container").css({
        top: "0px",
        right: -(widthOfMenu + 100),
    });

    $(window).resize(function () {
        // console.log("Window resized to: " + $(window).width() + "x" + $(window).height());
        const heightOfVideo = $("#content-static-background").height();
        $(".content-gif-overlay").height(heightOfVideo);
    });

    $("#menu-container").click(function () {
        if (isMenuActive) {
            $("#mobile-menu-container").animate({ right: -200 }, "slow");
            // $("#mobile-menu-container").css("display", "none");
            $("#unfocused-div").css("display", "none");
            $(".menu-bar").css("background-color", "gainsboro");
            isMenuActive = false;
        } else {
            $("#mobile-menu-container").animate({ right: "0px" }, "slow");
            $("#mobile-menu-container").css("display", "flex");
            $("#unfocused-div").css("display", "block");
            isMenuActive = true;
            $(".menu-bar").css("background-color", "black");
        }
    });

    $("#unfocused-div").click(function () {
        if (isMenuActive) {
            $("#mobile-menu-container").animate({ right: -200 }, "slow");
            // $("#mobile-menu-container").css("display", "none");
            $("#unfocused-div").css("display", "none");
            $(".menu-bar").css("background-color", "gainsboro");
            isMenuActive = false;
        } else {
            $("#mobile-menu-container").animate({ right: "0px" }, "slow");
            $("#mobile-menu-container").css("display", "flex");
            $("#unfocused-div").css("display", "block");
            isMenuActive = true;
            $(".menu-bar").css("background-color", "black");
        }
    });

    $("#content-quote-btn").click(function () {
        if (checkIfOnIndexPage() == false) {
            window.location.href = "index.html?scrollTo=contactme";
        }
        $("html, body").animate(
            {
                scrollTop: $(".content-box-4").offset().top - 100,
            },
            1000
        );
    });

    $("#content-contactme-btn").click(function () {
        if (checkIfOnIndexPage() == false) {
            window.location.href = "index.html?scrollTo=contactme";
        }
        $("html, body").animate(
            {
                scrollTop: $(".content-box-4").offset().top - 100,
            },
            1000
        );
    });

    //main nav buttons
    $("#nav-button-home").click(function () {
        if (checkIfOnIndexPage() == false) {
            window.location.href = "index.html?scrollTo=home";
        }
        $("html, body").animate(
            {
                scrollTop: $("#main").offset().top,
            },
            1000
        );
    });

    $("#nav-button-about").click(function () {
        if (checkIfOnIndexPage() == false) {
            window.location.href = "index.html?scrollTo=about";
        }
        $("html, body").animate(
            {
                scrollTop: $(".content-box-2").offset().top - 100,
            },
            1000
        );
    });

    $("#nav-button-photos").click(function () {
        if (checkIfOnIndexPage() == false) {
            window.location.href = "index.html?scrollTo=photos";
        }
        $("html, body").animate(
            {
                scrollTop: $("#content-box-images").offset().top - 100,
            },
            1000
        );
    });

    $("#nav-button-quote").click(function () {
        if (checkIfOnIndexPage() == false) {
            window.location.href = "index.html?scrollTo=quote";
        }
        $("html, body").animate(
            {
                scrollTop: $(".content-box-4").offset().top - 100,
            },
            1000
        );
    });
    //

    //mobile nav buttons
    $("#mobile-menu-home").click(function () {
        if (checkIfOnIndexPage() == false) {
            window.location.href = "index.html?scrollTo=home";
        }
        $("html, body").animate(
            {
                scrollTop: $("#main").offset().top,
            },
            1000
        );
        hideMobileMenu();
    });

    $("#mobile-menu-about").click(function () {
        if (checkIfOnIndexPage() == false) {
            window.location.href = "index.html?scrollTo=about";
        }
        $("html, body").animate(
            {
                scrollTop: $(".content-box-2").offset().top - 100,
            },
            1000
        );
        hideMobileMenu();
    });

    $("#mobile-menu-photos").click(function () {
        if (checkIfOnIndexPage() == false) {
            window.location.href = "index.html?scrollTo=photos";
        }
        $("html, body").animate(
            {
                scrollTop: $("#content-box-images").offset().top - 100,
            },
            1000
        );
        hideMobileMenu();
    });

    $("#mobile-menu-quote").click(function () {
        if (checkIfOnIndexPage() == false) {
            window.location.href = "index.html?scrollTo=quote";
        }
        $("html, body").animate(
            {
                scrollTop: $(".content-box-4").offset().top - 100,
            },
            1000
        );
        hideMobileMenu();
    });
    //

    function hideMobileMenu() {
        $("#mobile-menu-container").animate({ right: -200 }, "slow");
        // $("#mobile-menu-container").css("display", "none");
        $("#unfocused-div").css("display", "none");
        $(".menu-bar").css("background-color", "gainsboro");
        isMenuActive = false;
    }

    //change this to check if NOT on index page so we can redirect to from a specific item as well
    function checkIfOnIndexPage() {
        if (window.location.pathname == "/index.html") {
            return true;
        } else {
            return false;
        }
    }

    scrollToSection();
    function scrollToSection() {
        if (window.location.search.includes("=")) {
            switch (window.location.search.substring(10, window.location.search.length)) {
                case "home":
                    {
                        $("html, body").animate(
                            {
                                scrollTop: $("#main").offset().top,
                            },
                            1000
                        );
                    }
                    break;
                case "about":
                    {
                        $("html, body").animate(
                            {
                                scrollTop: $(".content-box-2").offset().top - 100,
                            },
                            1000
                        );
                    }
                    break;
                case "photos":
                    {
                        $("html, body").animate(
                            {
                                scrollTop: $("#content-box-images").offset().top - 100,
                            },
                            1000
                        );
                    }
                    break;
                case "quote":
                    {
                        $("html, body").animate(
                            {
                                scrollTop: $(".content-box-4").offset().top - 100,
                            },
                            1000
                        );
                    }
                    break;
            }
        }
    }
});
