export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert("musics", [
    {
      title: "The Man Who Sold The World",
      artist: "Nirvana",
      duration: "4:18",

      // caminho relativo à pasta uploads/
      cover: "covers/Theman.jpg",
      path: "musics/Theman.mp3",

      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete("musics", null, {});
}
