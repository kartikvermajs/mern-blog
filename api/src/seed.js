import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "./models/user.model.js";
import Post from "./models/post.model.js";
import Comment from "./models/comment.model.js";

dotenv.config();
const uploadImage = async (url, folder) => {
  const formData = new FormData();
  formData.append("file", url);
  formData.append("upload_preset", "mern-blog");
  formData.append("folder", folder);

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dbnvbi1th/image/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  if (!res.ok) {
    console.log("Cloudinary error:", data);
    throw new Error("Image upload failed");
  }

  return data.secure_url;
};

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("DB connected");

    await User.deleteMany();
    await Post.deleteMany();
    await Comment.deleteMany();

    // ----------- USERS -----------
    const profileImages = [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/women/4.jpg",
    ];

    const hashedPassword = bcrypt.hashSync("123456", 10);

    // Admins
    const admins = [];
    for (let i = 1; i <= 3; i++) {
      const img = await uploadImage(
        randomFrom(profileImages),
        "mern-blog/profile",
      );

      const admin = await User.create({
        username: `admin${i}`,
        email: `admin${i}@mail.com`,
        password: hashedPassword,
        profilePicture: img,
        isAdmin: true,
      });

      admins.push(admin);
    }

    // Normal Users
    const users = [];
    for (let i = 1; i <= 15; i++) {
      const img = await uploadImage(
        randomFrom(profileImages),
        "mern-blog/profile",
      );

      const user = await User.create({
        username: `user${i}`,
        email: `user${i}@mail.com`,
        password: hashedPassword,
        profilePicture: img,
      });

      users.push(user);
    }

    // ----------- POSTS -----------
    const categories = ["reactjs", "nextjs", "javascript"];

    const postImages = [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    ];

    const posts = [];

    for (let i = 0; i < admins.length; i++) {
      for (let j = 1; j <= 4; j++) {
        const category = categories[i % categories.length];

        const uploadedImage = await uploadImage(
          randomFrom(postImages),
          "mern-blog/posts",
        );

        const title = `${category} guide ${j} by ${admins[i].username}`;

        const post = await Post.create({
          userId: admins[i]._id.toString(),
          title,
          content: `<h1>${title}</h1><p>This is a detailed post about ${category}. Covers concepts, best practices, and real-world usage.</p>`,
          category,
          image: uploadedImage,
          slug: title.toLowerCase().replace(/ /g, "-"),
        });

        posts.push(post);
      }
    }

    // ----------- COMMENTS -----------
    const commentsText = [
      "Great post!",
      "Very helpful 🚀",
      "Loved the explanation",
      "This clarified my doubts",
      "Amazing content!",
    ];

    for (let post of posts) {
      const numberOfComments = Math.floor(Math.random() * 5) + 3;

      for (let i = 0; i < numberOfComments; i++) {
        const user = randomFrom(users);

        await Comment.create({
          content: randomFrom(commentsText),
          postId: post._id.toString(),
          userId: user._id.toString(),
          likes: [],
          numberOfLikes: 0,
        });
      }
    }

    console.log("🌱 Seeding complete");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
