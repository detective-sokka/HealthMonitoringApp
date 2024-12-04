import axios from "axios";
import { parse } from "csv-parse/dist/esm/sync";

export interface WaterQualityData {
  pH: number;
  lead: string;
  eColi: string;
}

const fetchWaterQualityData = async (
  lat: number,
  lon: number
): Promise<WaterQualityData | null> => {
  try {
    console.log(`latitude:${lat}, longitude:${lon}`);
    const response = await axios.get(
      "https://www.waterqualitydata.us/data/Result/search?within=10&lat=42.3264462&long=-71.0951289&mimeType=csv&providers=NWIS&providers=STORET&characteristicName=pH&characteristicName=Lead&characteristicName=Escherichia%20coli",
      { responseType: "text" }
    );

    const records = parse(response.data, {
      columns: true,
      skip_empty_lines: true,
    });

    let pHSum = 0,
      pHCount = 0;
    let leadSum = 0,
      leadCount = 0;
    let eColiSum = 0,
      eColiCount = 0;

    records.forEach((record: any) => {
      const value = parseFloat(record.ResultMeasureValue);
      switch (record.CharacteristicName) {
        case "pH":
          pHSum += value;
          pHCount++;
          break;
        case "Lead":
          if (!isNaN(value)) {
            leadSum += value;
            leadCount++;
          }
          break;
        case "Escherichia coli":
          if (!isNaN(value)) {
            eColiSum += value;
            eColiCount++;
          }
          break;
      }
    });

    return {
      pH: pHCount > 0 ? Number((pHSum / pHCount).toFixed(2)) : 0,
      lead: `${leadCount > 0 ? Math.round(leadSum / leadCount) : 0} ug/L`,
      eColi: `${
        eColiCount > 0 ? Math.round(eColiSum / eColiCount) : 0
      } MPN/100mL`,
    };
  } catch (error) {
    console.error("Error fetching water quality data:", error);
    return null;
  }
};

export default fetchWaterQualityData;
