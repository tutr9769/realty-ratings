function loadViewallPage(){
    console.log("yaya");
    var propContainerH = document.getElementById("fullContainer");

    let dummyProps = [
        {
            "company":"Park Rentals",
            "address":"2239 Goss Circle E, Boulder, CO 80302",
            "rent":3000,
            "bed":3,
            "bath":2,
            "rating":3.8,
            "pimage":"https://photos.zillowstatic.com/fp/cf39f66183490897431f883a494b8bd5-cc_ft_576.jpg",
        },
        {
            "company":"Ralphie's List",
            "address":"2145 Goss Circle West, Boulder, CO 80302",
            "rent":700,
            "bed":1,
            "bath":1.5,
            "rating":3.2,
            "pimage":"https://img.offcampusimages.com/jwPGXxkAEDAzAY0ZDiNYaQv0MnE=/660x440/left/top/smart/images/4fd25eeyjw1v6g7iptfk2p_g6myivww3xdyb4e7pfo4.jpeg",
        },
        {
            "company":"Some Company",
            "address":"2207 Baseline Road, Boulder, CO 80302-7755",
            "rent":1350,
            "bed":1,
            "bath":1,
            "rating":1.8,
            "pimage":"https://img.offcampusimages.com/eLk3Z3lWcS3z5R2CKGaQQwpwgsk=/660x440/left/top/smart/images/fh4ekxl9hhwg0fkpmda2giqt4y7r4_pytyzamycgscc.jpeg",
        },
        {
            "company":"Other Company",
            "address":"2233 Goss Circle E, Boulder, CO 80302",
            "rent":3000,
            "bed":4,
            "bath":5,
            "rating":2.8,
            "pimage":"https://img.offcampusimages.com/mZhZPSI6-Jzcgy_OZLKvTKWNGWg=/660x440/left/top/smart/images/mbgmsexxsjokglbjll1plw94mpgcfxews6rq2u0xnga.jpeg",
        },
        {
            "company":"Another Company",
            "address":"733 Marine Street, Boulder, CO 80302-6195",
            "rent":2000,
            "bed":1,
            "bath":1,
            "rating":0.5,
            "pimage":"https://img.offcampusimages.com/s_fJZbZz9xzNoSnghsobwqrB3vY=/660x440/left/top/smart/images/vh419lcd00n0uockhw7xdpmma_0ej6hvdv7qtdtqcya.jpeg",
        },
        {
            "company":"Park Rentals",
            "address":"2239 Goss Circle E, Boulder, CO 80302",
            "rent":3000,
            "bed":3,
            "bath":2,
            "rating":3.8,
            "pimage":"https://photos.zillowstatic.com/fp/cf39f66183490897431f883a494b8bd5-cc_ft_576.jpg",
        },
    ];

    //per property
    var propRow;
    var colLH;
    var colMH;
    var colRH;
    var imageH;
    var imageCaptionH;
    var imageHeaderH;
    var tableH;
    var tableHeaderH;
    var tableRowH;
    var tableEntryH;
    var buttonTableH;
    var buttonHeaderH;
    var propLinkH;
    var propButtonH;
    var revLinkH;
    var revButtonH;
    var buttonRowH;

    var totalProps = 15;
    var propIt;

    var propImage;
    var propManager;
    var propAddress;
    var propRent;
    var propRating;
    var propBed;
    var propBath;

    // propContainerH.style = "background-color: #f5f5f5";

    for(propIt=0;propIt<totalProps;propIt++){

        //get all these from db and iterate so each times we get a new property
        propImage = dummyProps[propIt].pimage;                        //
        propManager = dummyProps[propIt].company;                                       //
        propAddress = dummyProps[propIt].address;                               //
        propRent = dummyProps[propIt].rent;                                             // 
        propRating = dummyProps[propIt].rating;                                           //
        propBed = dummyProps[propIt].bed;                                               // 
        propBath = dummyProps[propIt].bath;                                            // 
        //--------------------------------------------------------

        //left column
        colLH = document.createElement("div");
        colLH.className = "col-sm-3";
        imageHeaderH = document.createElement("tr");
        imageH = document.createElement("img");
        imageCaptionH = document.createElement("tr");
        // imageHeaderH.innerHTML = "<center>Property image</center>";
        imageH.className = "img-responsive";
        imageH.src = propImage;
        imageH.alt = "";
        imageH.style.maxHeight = "400px";
        // imageCaptionH.innerHTML = "<center>949 Marine st.</center>";
        colLH.appendChild(imageHeaderH);
        colLH.appendChild(imageH);
        colLH.appendChild(imageCaptionH);

        //middle column
        colMH = document.createElement("div");
        colMH.className = "col-sm-6";
        tableHeaderH = document.createElement("center");
        tableHeaderH.innerHTML = "<strong> New Property </strong>";
        tableHeaderH.style = "color:#483D3F; font-family: 'Bebas Neue', cursive;font-size:18px";
        tableH = document.createElement("table");
        tableH.className = "table table-bordered";
        tableRowH = document.createElement("tr");
        tableEntryH = document.createElement("th");
        tableEntryH.className = "align-left";
        tableEntryH.rowSpan = 1; 
        tableEntryH.innerHTML = "Property Management Company: " + propManager;
        tableEntryH.style = "color: #50514F; font-family: 'Bebas Neue', cursive; font-size: 15px";
        tableRowH.appendChild(tableEntryH);
        tableH.appendChild(tableRowH);
        tableEntryH = document.createElement("th");
        tableRowH = document.createElement("tr");
        tableEntryH.className = "align-left";
        tableEntryH.rowSpan = 1; 
        tableEntryH.innerHTML = propAddress;
        tableEntryH.style = "color: #50514F; font-family: 'Bebas Neue', cursive; font-size: 15px";
        tableRowH.appendChild(tableEntryH);
        tableH.appendChild(tableRowH);
        tableEntryH = document.createElement("th");
        tableRowH = document.createElement("tr");
        tableEntryH.className = "align-left";
        tableEntryH.rowSpan = 1; 
        tableEntryH.innerHTML = "Monthly Rent: $" + propRent;
        tableEntryH.style = "color: #50514F; font-family: 'Bebas Neue', cursive; font-size: 15px";
        tableRowH.appendChild(tableEntryH);
        tableH.appendChild(tableRowH);
        tableEntryH = document.createElement("th");
        tableRowH = document.createElement("tr");
        tableEntryH.className = "align-left";
        tableEntryH.rowSpan = 1; 
        tableEntryH.innerHTML = propBed + " Bedrooms, " + propBath + " Bathrooms.";
        tableEntryH.style = "color: #50514F; font-family: 'Bebas Neue', cursive; font-size: 15px";
        tableRowH.appendChild(tableEntryH);
        tableH.appendChild(tableRowH);
        tableEntryH = document.createElement("th");
        tableRowH = document.createElement("tr");
        tableEntryH.className = "align-left";
        tableEntryH.rowSpan = 1; 
        tableEntryH.innerHTML = "Rating: " + propRating + " stars (out of 5).";
        tableEntryH.style = "color: #50514F; font-family: 'Bebas Neue', cursive; font-size: 15px";
        tableRowH.appendChild(tableEntryH);
        tableH.appendChild(tableRowH);
        colMH.appendChild(tableHeaderH);
        colMH.appendChild(tableH);

        //right column
        colRH = document.createElement("div");
        colRH.className = "col-sm-3";
        buttonHeaderH = document.createElement("center");
        buttonHeaderH.style = "color:#483D3F; text-align: center; font-family: 'Bebas Neue', cursive;font-size:18px";
        buttonHeaderH.innerHTML = "<strong>Options</strong>";
        buttonTableH = document.createElement("table");
        buttonTableH.className = "table table-bordered";
        buttonRowH = document.createElement("center");
        buttonRowH.style = "text-align:center";
        propLinkH = document.createElement("a");
        propLinkH.className = "nav-link";
        propLinkH.href = "property.html";
        propButtonH = document.createElement("button");
        propButtonH.className = "btn btn-primary";
        propButtonH.style = "background-color: #483D3F; font-family: 'Bebas Neue', cursive;font-family: 'Roboto', sans-serif; font-weight: 400";
        propButtonH.innerHTML = "View this Property";
        propLinkH.appendChild(propButtonH);
        buttonRowH.appendChild(propLinkH);
        buttonTableH.appendChild(buttonRowH);
        buttonRowH = document.createElement("center");
        buttonRowH.style = "text-align:center";
        revLinkH = document.createElement("a");
        revLinkH.href = "write_review.html";
        revLinkH.className = "nav-link";
        revButtonH = document.createElement("button");
        revButtonH.className = "btn btn-primary";
        revButtonH.style = "background-color: #483D3F;font-family: 'Bebas Neue', cursive;font-family: 'Roboto', sans-serif; font-weight: 400";
        revButtonH.innerHTML = "Rate this Property";
        revLinkH.appendChild(revButtonH);
        buttonRowH.appendChild(revLinkH);
        buttonTableH.appendChild(buttonRowH);
        colRH.appendChild(buttonHeaderH);
        colRH.appendChild(buttonTableH);

        //whole row
        propRow = document.createElement("div");
        propRow.className = "row";
        propRow.appendChild(colLH);
        propRow.appendChild(colMH);
        propRow.appendChild(colRH);
        propContainerH.appendChild(propRow);
    }

}