import axios from "axios";

const BASE_URL = "https://assessment.ksensetech.com";
const TRANSIENT = [429, 500, 503];

export async function fetchAllPatients(apiKey: string) {
  const patients: any[] = [];
  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const res = await requestWithRetry(
      `${BASE_URL}/api/patients`,
      apiKey,
      { page, limit: 10 }
    );

    patients.push(...(res.data ?? []));
    hasNext = Boolean(res.pagination?.hasNext);
    page++;
  }

  return patients;
}

async function requestWithRetry(
  url: string,
  apiKey: string,
  params: any,
  retries = 6,
  backoff = 750
): Promise<any> {
  try {
    const res = await axios.get(url, {
      headers: { "x-api-key": apiKey },
      params,
      timeout: 15000,
    });
    return res.data;
  } catch (err: any) {
    const status = err?.response?.status;
    if (retries > 0 && TRANSIENT.includes(status)) {
      await sleep(backoff);
      return requestWithRetry(url, apiKey, params, retries - 1, backoff * 2);
    }
    throw err;
  }
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
