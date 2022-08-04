function loadReviewsPage(){

    let dummyReviews = [
        {
            "author":"Tucker Travins",
            "numStars":5,
            "review":"These reviews are from The Social Network.",
        },
        {
            "author":"Nancy Yoder",
            "numStars":4,
            "review":"In its cold, almost forensic way, this is as tense and exciting as it is absorbing. It's a miracle, really.",
        },
        {
            "author":"Quinn Guerin",
            "numStars":5,
            "review":"The Social Network, just like its subject, is the pop culture phenomenon of the new generation.",
        },
        {
            "author":"Jordan Evans",
            "numStars":3,
            "review":"Fincher does, at least, make decent entertainment out of such inherently unprepossessing subjects as computer use and legal hearings.",
        },
        {
            "author":"Rocky Erdenebat",
            "numStars":2,
            "review":"The Social Network is splendid entertainment from a master storyteller, packed with energetic incident and surprising performances.",
        },
        {
            "author":"Asa Ashraf",
            "numStars":5,
            "review":"At last, a movie you can actually discuss afterward. And not just on Facebook or Twitter. No, you'll want to chew it over in person, with friends, for hours.",
        },
        {
            "author":"Santa Claus",
            "numStars":3,
            "review":"Like Zuckerberg, Fincher excels at data management, delivering vast amounts of information with the utmost clarity and speed.",
        },
        {
            "author":"Barack Obama",
            "numStars":4,
            "review":"A perfectly poignant and cautionary tale about how the biggest influencers in tech began and continue to operate today.",
        },
        {
            "author":"Donald Trump",
            "numStars":5,
            "review":"An emotional and suspenseful story...a moral tale about the sweet smell of success",
        },
        {
            "author":"Joe Biden",
            "numStars":2,
            "review":"Much, much better than a film about Facebook has any right to be...",
        },
        {
            "author":"John Deere",
            "numStars":5,
            "review":"The Social Network posits that perhaps the tastiest cinematic treat is one that renders its audience gleefully captivated until they transcend into a fugue dream state.",
        },
        {
            "author":"Second Tucker",
            "numStars":4,
            "review":"Who knew coding and depositions could be exciting? Fincher's direction is surgical, Sorkin's script is a thing of beauty and the young cast is superb. The Social Network is outstanding. [Full review in Spanish]",
        },
        {
            "author":"Ooga Booga",
            "numStars":2,
            "review":"The combination of rapid fire dialogue, driven performances, and impeccable editing give The Social Network an incredible sense of energy.",
        },
        {
            "author":"Firstname Lastname",
            "numStars":5,
            "review":"A biography cashing in on the social media hype. Sure, it had pretty amazing performances, but I highly doubt the accuracy of the depiction. Not to mention",
        },
        {
            "author":"Ungalo Bungalo",
            "numStars":4,
            "review":"Fincher's signature cinematic style works perfectly with the Social Network's sharp script and top-notch performances.",
        }
    ];

    var totalRevs = dummyReviews.length; //retrieve from DB
    var listH;
    listH = document.getElementById("reviewList");
    var revRow;
    var newRev;
    var coll;
    var colr;
    var stars;
    var user;
    var collrow;

    var propImageH = document.getElementById("propImage");
    propImageH.src = "https://photos.zillowstatic.com/fp/cf39f66183490897431f883a494b8bd5-cc_ft_576.jpg";
    
    var address = "2239 Goss Circle E, Boulder CO, 80302"; //retrieve from DB
    var addressColH = document.getElementById("addressCol");
    var addressH = document.getElementById("address");
    addressH.innerHTML = address;
    var googlelink = "https://www.google.com/maps/place/" + address;
    var googleH = document.getElementById("google");
    googleH.setAttribute("href",googlelink);
    var managerH = document.getElementById("manager");
    var manager = "Kim Park"; //retrieve from DB
    managerH.innerHTML = "Property Manager: " + manager;
    var numBed = 3; //retrieve from DB
    var numBath = 2; //retrieve from DB
    var bedBathH = document.getElementById("bedBath");
    bedBathH.innerHTML = numBed + " Bedrooms, " + numBath + " Bathrooms";
    var rentH = document.getElementById("rent");
    var rent = 3000; //retrieve from DB
    rentH.innerHTML = "Monthly Rent: $" + rent;

    var starSpanH;
    var starIt = 0;
    var totalStars = 0;
    for (var q=0;q<totalRevs;q++){
        totalStars = totalStars + dummyReviews[q].numStars;//
    }
    var avgStars =totalStars/totalRevs; //retrieve from DB
    var starSpanRowH = document.getElementById("avgStarsSpan");
    var avgStarsRound = parseInt(avgStars);
    for (starIt = 0;starIt<avgStarsRound;starIt++){
        starSpanH = document.createElement("span");
        starSpanH.setAttribute("class","fa fa-star checked");
        starSpanH.setAttribute("style","color:#edd95f");
        starSpanRowH.appendChild(starSpanH);
    }
    var missingStars = 5 - avgStarsRound;
    for (starIt = 0;starIt<missingStars;starIt++){
        starSpanH = document.createElement("span");
        starSpanH.setAttribute("class","fa fa-star checked");
        starSpanH.setAttribute("style","color:#50514F");
        starSpanRowH.appendChild(starSpanH);
    }
    var avgNumH = document.getElementById("averageNum");
    var tolRevH = document.getElementById("totalRevs");
    avgNumH.innerHTML = Math.round(avgStars * 100) / 100 + " stars.";
    tolRevH.innerHTML = "Based on " + totalRevs + " reviews."
    //uses numreviews too

    //per review:
    var numStars;
    var author;
    var reviewtext;

    for (var numRevs = 0;numRevs<totalRevs;numRevs++){
        numStars = dummyReviews[numRevs].numStars; //get from db
        author = dummyReviews[numRevs].author; //get from db
        reviewtext = dummyReviews[numRevs].review; //get from db
        newRev = document.createElement("div");
        newRev.setAttribute("class", "row");
        newRev.style.margin="5px"
        coll = document.createElement("div");
        coll.setAttribute("class", "col-8");
        colr = document.createElement("div");
        colr.setAttribute("class", "col-4");
        user = document.createElement("h6");
        collrow = document.createElement("div");
        collrow.setAttribute("class","row");
        user.style.marginLeft = "5px";
        user.style.fontSize = "medium";
        user.innerHTML = "  Reviewed by " + author;
        colr.innerHTML = "Pictures here.";
        for (var i=0;i<numStars;i++) {
            stars = document.createElement("span");
            stars.setAttribute("class","fa fa-star checked");
            stars.setAttribute("style","color:#edd95f");
            collrow.appendChild(stars);
        }
        for (var i=0;i<5-numStars;i++) {
            stars = document.createElement("span");
            stars.setAttribute("class","fa fa-star checked");
            stars.setAttribute("style","color:#50514F");
            collrow.appendChild(stars);
        }
        collrow.appendChild(user);
        revRow = document.createElement("div");
        revRow.setAttribute("class","row");
        revRow.innerHTML = reviewtext;
        coll.appendChild(collrow);
        coll.appendChild(revRow);
        newRev.appendChild(coll);
        newRev.appendChild(colr);
        listH.appendChild(newRev);
        listH.appendChild(document.createElement("br"));
    }
}
