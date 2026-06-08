import type { WorldStates } from "@gurgelio/react-map/world";

export interface CountryStat {
  population: number;
  hdi: number;
  areaKm2: number;
}

export const countryStats: Partial<Record<WorldStates, CountryStat>> = {
  Argentina: { population: 46_234_000, hdi: 0.849, areaKm2: 2_780_400 },
  Australia: { population: 26_638_000, hdi: 0.951, areaKm2: 7_692_024 },
  Bangladesh: { population: 172_954_000, hdi: 0.663, areaKm2: 147_570 },
  Brazil: { population: 213_421_000, hdi: 0.754, areaKm2: 8_515_767 },
  Canada: { population: 39_566_000, hdi: 0.936, areaKm2: 9_984_670 },
  Chile: { population: 19_493_000, hdi: 0.86, areaKm2: 756_102 },
  China: { population: 1_412_600_000, hdi: 0.768, areaKm2: 9_596_961 },
  Colombia: { population: 51_883_000, hdi: 0.752, areaKm2: 1_141_748 },
  Egypt: { population: 109_655_000, hdi: 0.728, areaKm2: 1_001_450 },
  France: { population: 68_042_000, hdi: 0.903, areaKm2: 643_801 },
  Germany: { population: 84_432_000, hdi: 0.942, areaKm2: 357_022 },
  India: { population: 1_407_563_000, hdi: 0.633, areaKm2: 3_287_263 },
  Indonesia: { population: 278_696_000, hdi: 0.705, areaKm2: 1_904_569 },
  Italy: { population: 58_983_000, hdi: 0.895, areaKm2: 301_340 },
  Japan: { population: 125_124_000, hdi: 0.925, areaKm2: 377_975 },
  Mexico: { population: 130_262_000, hdi: 0.758, areaKm2: 1_964_375 },
  Netherlands: { population: 17_811_000, hdi: 0.941, areaKm2: 41_543 },
  Nigeria: { population: 218_541_000, hdi: 0.535, areaKm2: 923_768 },
  Pakistan: { population: 231_402_000, hdi: 0.557, areaKm2: 881_913 },
  Peru: { population: 33_715_000, hdi: 0.762, areaKm2: 1_285_216 },
  Poland: { population: 38_036_000, hdi: 0.876, areaKm2: 312_696 },
  Portugal: { population: 10_467_000, hdi: 0.866, areaKm2: 92_090 },
  Russia: { population: 144_104_000, hdi: 0.821, areaKm2: 17_098_242 },
  "Saudi Arabia": { population: 35_950_000, hdi: 0.875, areaKm2: 2_149_690 },
  "South Africa": { population: 59_308_000, hdi: 0.713, areaKm2: 1_221_037 },
  "South Korea": { population: 51_830_000, hdi: 0.925, areaKm2: 100_210 },
  Spain: { population: 47_432_000, hdi: 0.905, areaKm2: 505_990 },
  Turkey: { population: 85_372_000, hdi: 0.838, areaKm2: 783_562 },
  "United Kingdom": { population: 67_736_000, hdi: 0.929, areaKm2: 243_610 },
  "United States": { population: 331_893_000, hdi: 0.921, areaKm2: 9_833_517 },
  Venezuela: { population: 28_199_000, hdi: 0.691, areaKm2: 916_445 },
};
