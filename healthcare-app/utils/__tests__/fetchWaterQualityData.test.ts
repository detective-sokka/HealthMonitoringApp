import axios from "axios";
import fetchWaterQualityData, { WaterQualityData } from "../fetchWaterQualityData";
import { parse } from "csv-parse/dist/esm/sync";

// Mock the axios.get method
jest.mock("axios");

describe("fetchWaterQualityData", () => {
  const mockLat = 42.3264462;
  const mockLon = -71.0951289;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch water quality data successfully", async () => {
    const mockResponse = {
      data: `CharacteristicName,ResultMeasureValue\npH,7.2\nLead,3.4\nEscherichia coli,120\npH,7.8\nLead,2.8\nEscherichia coli,110`,
    };

    // Mocking axios.get to return the mockResponse
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchWaterQualityData(mockLat, mockLon);

    // Validate the calculations
    expect(axios.get).toHaveBeenCalledWith(
      "https://www.waterqualitydata.us/data/Result/search?within=10&lat=42.3264462&long=-71.0951289&mimeType=csv&providers=NWIS&providers=STORET&characteristicName=pH&characteristicName=Lead&characteristicName=Escherichia%20coli",
      { responseType: "text" }
    );
    expect(result).toEqual<WaterQualityData>({
      pH: 7.5,
      lead: "3 µg/L",
      eColi: "115 MPN/100mL",
    });
  });

  it("should return null if there is an error fetching water quality data", async () => {
    // Mocking axios.get to simulate an error
    (axios.get as jest.Mock).mockRejectedValue(new Error("Failed to fetch data"));

    const result = await fetchWaterQualityData(mockLat, mockLon);

    expect(result).toBeNull(); // The function should return null in case of an error
  });

  it("should return default values if no records found", async () => {
    const mockResponse = {
      data: "",
    };

    // Mocking axios.get to return empty data
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchWaterQualityData(mockLat, mockLon);

    // The function should return default values if no records in the CSV
    expect(result).toEqual<WaterQualityData>({
      pH: 0,
      lead: "0 µg/L",
      eColi: "0 MPN/100mL",
    });
  });
});
