company = "Google";
year = "2014";

function selectYear(yearString){
	currentYear = parseInt(yearString);
	year = currentYear;
	nextYear = currentYear + 1;
	doPage2 = nextYear <= 2019;
	$("#policy-year-1").html(currentYear+"↓");
    $("#policy-year-2").html(nextYear+"↓");
    updateMetadata(company,year);

	policy_1 = "policies/"+company.toLowerCase()+"_"+year+"_processed.html";
    policy_2 = "policies/"+company.toLowerCase()+"_"+year+"_processed.html";

    // get files
    // open files and generate html
	console.log(policy_1);
    console.log(policy_2);
    $("#policy-1-html").html(readTextFile(policy_1));
    $("#policy-2-html").html(readTextFile(policy_2));
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                return allText;
                // alert(allText);
            }
        }
    }
    console.log(rawFile.send())
    return rawFile.responseText;
}


function updateMetadata(comp, year){
	// open csv
	// find row with year and company
	// get values
	all_values = {}
	d3.csv("data/Data.csv").row(function(d) {
		all_values[d["Company"]+"_"+d["Year"]] = d;
		return d;
	})
        .get(function(error, rows) {
            console.log(rows);
            reading_level = all_values[company+"_"+year]["Reading Level"] == "" ? "?" : all_values[company+"_"+year]["Reading Level"];
            word_count = all_values[company+"_"+year]["Word Count"];
            reading_time = all_values[company+"_"+year]["Reading Time"];

            $("#company").html(comp);
            $("#reading-level").html(reading_level);
            $("#word-count").html(word_count);
            $("#reading-time").html(reading_time);
	});
}


function selectCompany(new_company){
	company = new_company;
	selectYear(2014);
}