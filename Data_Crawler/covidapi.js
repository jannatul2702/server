const axios = require("axios") ;

async function fetchCovidData(city) {
    let url = "https://public.opendatasoft.com/api/records/1.0/search/";
    let params = {
        dataset: "covid-19-germany-landkreise",
        q: city
    }

    return axios.get(url, {params: params});
}

async function get7DaysIncidence (city) {
        let resp = await fetchCovidData(city);
        return resp.data.records[0].fields.cases7_per_100k;
}

get7DaysIncidence ("Deggendorf").then ((cases) => {
        console.log("The 7 days incidence of Deggendorf is %s", cases);
})