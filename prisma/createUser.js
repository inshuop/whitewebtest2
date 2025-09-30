import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createUser() {
  const email = "admin2@whitealuminium.ae"; // Replace with desired email
  const password = "123456"; // Replace with desired password
  const name = "Admin ";
  const role ="admin" ; // Replace with desired name

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database with name
    const user = await prisma.auth_User.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        role : role ,// Add the name field
      },
    });

    console.log("User created:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
