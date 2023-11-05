import dbConnect from "@/lib/database/conn";
import User from "@/models/userModel";

export default async function handler(req, res, next) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Only POST request are allowed" });
  }

  dbConnect()
    .then(() => {
      console.log("Connected to db..");
    })
    .catch((err) => res.json({ status: "fail", message: err.message }));

  if (!req.body) {
    return res
      .status(400)
      .json({ status: "fail", message: "Don't have form data!" });
  }

  const { username, email, password } = req.body;

  // check duplicate users
  const checkExists = await User.findOne({ email });
  if (checkExists)
    return res
      .status(422)
      .json({ status: "fail", message: "User Already Exists!" });

  // create user
  try {
    const newUser = await User.create({
      username,
      email,
      password,
    });
    console.log(newUser);

    return res.status(200).json({ status: "success", data: { user: newUser } });
  } catch (err) {
    return res.status(500).json({ status: "fail", message: err.message });
  }
}
