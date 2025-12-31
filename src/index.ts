import dotenv from 'dotenv';
dotenv.config();

import { fetchAllPatients } from "./api.js";
import { scorePatient } from "./risk.js";
import { submitResults } from "./submit.js";

const apiKey = process.env.DEMO_MED_API_KEY;
if (!apiKey) throw new Error("Missing DEMO_MED_API_KEY");
( async () => {
    const patients = await fetchAllPatients(apiKey);
    const highRiskPatients: string[] = [];
    const feverPatients: string[] = [];
    const dataQualityIssues: string[] = [];

    for (const p of patients) {
        if (!p.patient_id) {
            console.warn("Skipping patient with missing ID", p);
            continue;
        }
    
    const r = scorePatient(p);

    if (r.total >= 4) highRiskPatients.push(r.patientId);
    if (r.hasFever) feverPatients.push(r.patientId);
    if (r.hasDataIssues) dataQualityIssues.push(r.patientId);
    }

    const result = await submitResults(apiKey, {
        high_risk_patients: highRiskPatients,
        fever_patients: feverPatients,
        data_quality_issues: dataQualityIssues,
    });
    console.log("Submission result:", result);
})();