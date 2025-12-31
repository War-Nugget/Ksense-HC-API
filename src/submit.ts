import axios from "axios";

const BASE_URL = "https://assessment.ksensetech.com";

export async function submitResults(
  apiKey: string,
  payload: {
    high_risk_patients: string[];
    fever_patients: string[];
    data_quality_issues: string[];
  }
) {
  const res = await axios.post(
    `${BASE_URL}/api/submit-assessment`,
    payload,
    { headers: { "x-api-key": apiKey } }
  );
  return res.data;
}
