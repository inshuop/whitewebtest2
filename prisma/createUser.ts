import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createUser() {
  const email = "admin@whitealumium.ae"; // Replace with desired email
  const password = "WawA12369*"; // Replace with desired password
  const name = "Admin User";
  const role ="admin" ; // Add desired name here

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create user in the database
    const user = await prisma.auth_User.create({
      data: {
        email,
        password: hashedPassword,
        name, 
        role ,// Make sure name is passed as a string
      },
    });

    console.log("User created:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createUser()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
