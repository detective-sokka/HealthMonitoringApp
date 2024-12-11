// utils/AlertService.ts
import { THRESHOLDS } from '../constants/thresholds';
import { sendNotification } from './NotificationService';
import { AirPollutionData } from './fetchAirPollutionData';
import { WaterQualityData } from './fetchWaterQualityData';
import { PollenData } from './fetchPollenData';
import { CovidData } from './fetchCovidData';

interface HealthData {
  airPollutionData: AirPollutionData | null;
  waterQualityData: WaterQualityData | null;
  pollenData: PollenData | null;
  covidData: CovidData | null;
}

const extractNumericValue = (value: string): number => {
  return Number(value.split(' ')[0]);
};

export const checkThresholdsAndNotify = async (data: HealthData) => {
  const { airPollutionData, waterQualityData, pollenData, covidData } = data;

  if (airPollutionData) {
    if (airPollutionData.pm10 > THRESHOLDS.airQuality.pm10) {
      await sendNotification('Air Quality Alert', 'PM10 levels are high');
    }
    if (airPollutionData.pm2_5 > THRESHOLDS.airQuality.pm2_5) {
      await sendNotification('Air Quality Alert', 'PM2.5 levels are high');
    }
    if (airPollutionData.aqi > THRESHOLDS.airQuality.aqi) {
      await sendNotification('Air Quality Alert', 'Air Quality Index is poor');
    }
  }

  if (pollenData) {
    Object.entries(THRESHOLDS.pollen).forEach(async ([key, threshold]) => {
      if (pollenData[key as keyof PollenData] === threshold) {
        await sendNotification('Pollen Alert', `${key} pollen levels are high`);
      }
    });
  }

  if (covidData) {
    if (covidData.testPositivityRatio > THRESHOLDS.covid.testPositivityRatio) {
      await sendNotification('COVID-19 Alert', 'Test positivity rate is high');
    }
    if (covidData.vaccinationRatio < THRESHOLDS.covid.vaccinationRatio) {
      await sendNotification('COVID-19 Alert', 'Vaccination rate is low');
    }
  }

  if (waterQualityData) {
    if (waterQualityData.pH > THRESHOLDS.waterQuality.pH) {
      await sendNotification('Water Quality Alert', 'pH levels are high');
    }
    if (extractNumericValue(waterQualityData.lead) > THRESHOLDS.waterQuality.lead) {
      await sendNotification('Water Quality Alert', 'Lead concentration is high');
    }
    if (extractNumericValue(waterQualityData.eColi) > THRESHOLDS.waterQuality.eColi) {
      await sendNotification('Water Quality Alert', 'E. Coli levels are high');
    }
  }
};
