function parseBP(bp?: string): [number | null, number | null] {
  if (!bp || !bp.includes("/")) return [null, null];
  const [s, d] = bp.split("/");
  const sys = Number(s);
  const dia = Number(d);
  return Number.isFinite(sys) && Number.isFinite(dia)
    ? [sys, dia]
    : [null, null];
}

export function scorePatient(p: any) {
  const issues = new Set<string>();

  // Age
  const age = Number(p.age);
  let ageScore = 0;
  if (!Number.isFinite(age)) issues.add("age");
  else if (age >= 40 && age <= 65) ageScore = 1;
  else if (age > 65) ageScore = 2;

  // Temperature
  const temp = Number(p.temperature);
  let tempScore = 0;
  if (!Number.isFinite(temp)) issues.add("temperature");
  else if (temp >= 101) tempScore = 2;
  else if (temp >= 99.6) tempScore = 1;

  // Blood pressure
  const [sys, dia] = parseBP(p.blood_pressure);
  let bpScore = 0;
  if (sys === null || dia === null) {
    issues.add("blood_pressure");
  } else {
    const sysScore =
      sys >= 140 ? 3 :
      sys >= 130 ? 2 :
      sys >= 120 ? 1 : 0;

    const diaScore =
      dia >= 90 ? 3 :
      dia >= 80 ? 2 : 0;

    // Elevated only if both match
    if (sys >= 120 && sys <= 129 && dia < 80) bpScore = 1;
    else bpScore = Math.max(sysScore, diaScore);
  }

  const total = ageScore + tempScore + bpScore;

  return {
    patientId: p.patient_id,
    total,
    hasFever: Number.isFinite(temp) && temp >= 99.6,
    hasDataIssues: issues.size > 0
  };
}
