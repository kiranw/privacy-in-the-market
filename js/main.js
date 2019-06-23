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

	policy_1 = company+"_"+year+".html";
    policy_2 = company+"_"+year+".html";

    // get files
    // open files and generate html

    $("#policy-1").html();
    $("#policy-2").html();
}


function updateMetadata(comp, year){
	// open csv
	// find row with year and company
	// get values
	d3.csv("data/Data.csv").row(function(d) { return {key: d.key, value: +d.value}; })
        .get(function(error, rows) {
            console.log(rows);

            reading_level = "";
            word_count = "";
            reading_time = "";

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