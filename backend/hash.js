import bcrypt from "bcryptjs";

const run = async () => {
  const hashed = await bcrypt.hash("shaikh", 10);
  console.log("Hashed password:", hashed);
};

run();