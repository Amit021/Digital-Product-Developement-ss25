async function main() {
  console.log('Seeding residents...');
  
  await prisma.resident.create({
    data: {
      name: "Sarah Müller",
      gender: "female",
      birthDate: new Date("1939-08-12"),
      insurer: "AOK Plus",
      dnr: true,
      fallRisk: "Moderate",
      vaccinations: "Influenza, COVID-19 Booster",
      hospitalHistory: "2022-06-15: Hip Surgery; 2023-01-10: Pneumonia",
      medications: "Rivaroxaban (Xarelto), 40 mg",
      weight: 72,
      height: 172,
    }
  });

  console.log('Resident 1 created');

  await prisma.resident.create({
    data: {
      name: "John Doe",
      gender: "male",
      birthDate: new Date("1955-02-20"),
      insurer: "Techniker Krankenkasse",
      dnr: false,
      fallRisk: "High",
      vaccinations: "Influenza, COVID-19",
      hospitalHistory: "2019-09-10: Knee Surgery",
      medications: "Amlodipine, 5 mg",
      weight: 85,
      height: 180,
    }
  });

  console.log('Resident 2 created');

  await prisma.resident.create({
    data: {
      name: "Anna Schmidt",
      gender: "female",
      birthDate: new Date("1948-11-05"),
      insurer: "BARMER",
      dnr: false,
      fallRisk: "Low",
      vaccinations: "COVID-19, Pneumococcal",
      hospitalHistory: "2018-07-20: Hip Replacement",
      medications: "Atorvastatin, 20 mg",
      weight: 60,
      height: 165,
    }
  });

  console.log('Resident 3 created');

  await prisma.resident.create({
    data: {
      name: "Maximilian Bauer",
      gender: "male",
      birthDate: new Date("1965-05-14"),
      insurer: "DAK-Gesundheit",
      dnr: true,
      fallRisk: "Moderate",
      vaccinations: "COVID-19, Hepatitis B",
      hospitalHistory: "2021-03-15: Heart Bypass",
      medications: "Lisinopril, 10 mg",
      weight: 90,
      height: 175,
    }
  });

  console.log('Resident 4 created');

  await prisma.resident.create({
    data: {
      name: "Eva Fischer",
      gender: "female",
      birthDate: new Date("1960-07-22"),
      insurer: "AOK Bayern",
      dnr: true,
      fallRisk: "High",
      vaccinations: "Influenza, COVID-19, Tetanus",
      hospitalHistory: "2022-02-28: Stroke Recovery",
      medications: "Warfarin, 5 mg",
      weight: 78,
      height: 168,
    }
  });

  console.log('Resident 5 created');
}

main().then(() => {
  console.log('Seeding completed');
  prisma.$disconnect();
});
