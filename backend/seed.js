import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
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
      // add any other fields you need
    }
  });
}

main().then(() => prisma.$disconnect());
