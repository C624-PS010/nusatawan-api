// File: prisma/seeder.js

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt"); // Untuk mengenkripsi password
const prisma = new PrismaClient();

async function main() {
  try {
    // Enkripsi password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Menambahkan data pengguna (Users)
    const user1 = await prisma.user.create({
      data: {
        username: "user1",
        email: "user1@example.com",
        password: hashedPassword,
        phone: "+1234567890",
        isAdmin: false,
      },
    });

    const user2 = await prisma.user.create({
      data: {
        username: "user2",
        email: "user2@example.com",
        password: hashedPassword,
        phone: "+1987654321",
        isAdmin: true,
      },
    });

    console.log("Seeder: Data pengguna berhasil ditambahkan");

    // Menambahkan data kategori (Categories)
    await prisma.category.createMany({
      data: [
        { name: "ekowisata", image: "public\\images\\categories\\ekowisata.jpg" },
        { name: "pantai", image: "public\\images\\categories\\pantai.jpg" },
        { name: "gunung", image: "public\\images\\categories\\gunung.jpg" },
        { name: "laut", image: "public\\images\\categories\\laut.jpg" },
        { name: "seni", image: "public\\images\\categories\\seni.jpg" },
        { name: "religi", image: "public\\images\\categories\\religi.jpg" },
        { name: "sejarah", image: "public\\images\\categories\\sejarah.jpg" },
      ],
    });

    console.log("Seeder: Data kategori berhasil ditambahkan");

    // Menambahkan data artikel (Articles)
    const article1 = await prisma.article.create({
      data: {
        title: "Artikel 1",
        content: "Ini adalah konten dari artikel 1.",
        image: "https://example.com/image1.jpg",
        location: "Jakarta",
        categoryName: "ekowisata",
        userId: user1.id,
      },
    });

    const article2 = await prisma.article.create({
      data: {
        title: "Artikel 2",
        content: "Ini adalah konten dari artikel 2.",
        image: "https://example.com/image2.jpg",
        location: "Bandung",
        categoryName: "ekowisata",
        userId: user2.id,
      },
    });

    console.log("Seeder: Data artikel berhasil ditambahkan");

    // Menambahkan data kampanye (Campaigns)
    await prisma.campaign.createMany({
      data: [
        {
          title: "Kampanye 1",
          content: "Ini adalah konten dari kampanye 1.",
          image: "https://example.com/campaign1.jpg",
          userId: user1.id,
        },
        {
          title: "Kampanye 2",
          content: "Ini adalah konten dari kampanye 2.",
          image: "https://example.com/campaign2.jpg",
          userId: user2.id,
        },
      ],
    });

    console.log("Seeder: Data kampanye berhasil ditambahkan");

    // Menambahkan data komentar (Comments)
    await prisma.comment.createMany({
      data: [
        {
          body: "Komentar artikel 1.",
          userId: user1.id,
          articleId: article1.id,
        },
        {
          body: "Komentar artikel 2.",
          userId: user2.id,
          articleId: article2.id,
        },
      ],
    });

    console.log("Seeder: Data komentar berhasil ditambahkan");
  } catch (error) {
    console.error("Seeder error:", error);
    throw error; // Anda bisa memilih untuk melempar kembali kesalahan untuk mengetahui permasalahan yang ada
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
