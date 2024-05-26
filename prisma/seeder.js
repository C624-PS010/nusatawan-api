// prisma/seeder.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // Buat pengguna (users)
  const user1 = await prisma.user.create({
    data: {
      username: "user1",
      email: "user1@example.com",
      password: "222",
      phone: "+1234567890",
      isAdmin: false,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "user2",
      email: "user2@example.com",
      password: "222",
      phone: "+1987654321",
      isAdmin: true,
    },
  });

  // Buat artikel (articles)
  const article1 = await prisma.article.create({
    data: {
      title: "Article 1",
      content: "Content of article 1",
      image: "https://example.com/image1.jpg",
      userId: user1.id,
    },
  });

  const article2 = await prisma.article.create({
    data: {
      title: "Article 2",
      content: "Content of article 2",
      image: "https://example.com/image2.jpg",
      userId: user2.id,
    },
  });

  // Buat kampanye (campaigns)
  const campaign1 = await prisma.campaign.create({
    data: {
      title: "Campaign 1",
      content: "Content of campaign 1",
      image: "https://example.com/campaign1.jpg",
      userId: user1.id,
    },
  });

  const campaign2 = await prisma.campaign.create({
    data: {
      title: "Campaign 2",
      content: "Content of campaign 2",
      image: "https://example.com/campaign2.jpg",
      userId: user2.id,
    },
  });

  // Buat komentar (comments)
  const comment1 = await prisma.comment.create({
    data: {
      comment: "Comment on Article 1",
      userId: user2.id,
      articleId: article1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      comment: "Comment on Article 2",
      userId: user1.id,
      articleId: article2.id,
    },
  });

  // Buat kategori (categories)
  const category1 = await prisma.category.create({
    data: {
      name: "Technology",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Politics",
    },
  });

  console.log("Seeder executed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
