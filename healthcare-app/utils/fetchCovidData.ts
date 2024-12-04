import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_COVID_ACT_NOW_API_KEY; 

export interface CovidData {
    population: number,
    newCases: number,
    testPositivityRatio: number,
    vaccinationRatio:number
}

const fetchCovidData = async (stateCode: string) => {
    try {
        const response = await axios.get(
            `https://api.covidactnow.org/v2/state/${stateCode}.timeseries.json?apiKey=${API_KEY}`
        );
        const data = response.data;
        return {
            population: data.population,
            newCases: data.actuals.newCases,
            testPositivityRatio: data.metrics.testPositivityRatio,
            vaccinationRatio: data.metrics.vaccinationsCompletedRatio
        };
    } catch (error) {
        console.log('Error fetching COVID data');
        return null;
    }
}

export default fetchCovidData;
