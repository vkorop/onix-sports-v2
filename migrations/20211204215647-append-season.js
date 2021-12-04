module.exports = {
  async up(db, client) {
    await db.collection('seasons').create({
      start: new Date(),
      end: null,
      order: 1,
      closed: false,
      notices: [],
    });
  },

  async down(db, client) {
    await db.collection('seasons').drop();
  }
};
