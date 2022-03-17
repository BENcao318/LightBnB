module.exports = function(router, database) {

  router.get('/properties', (req, res) => {
    database.query(database.getAllProperties(req.query, 20).queryString, database.getAllProperties(req.query, 20).queryParams)
    .then(properties => res.send({properties}))
    .catch(e => {
      console.error(e);
      res.send(e);
    }); 
  });

  router.get('/reservations', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
    database.query(database.getAllReservations(userId).queryString)
    .then(reservations => res.send({reservations}))
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  router.post('/properties', (req, res) => {
    const userId = req.session.userId;
    database.query(database.addProperty({...req.body, owner_id: userId}).queryString, database.addProperty({...req.body, owner_id: userId}).queryParams)
      .then(property => {
        res.send(property);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
}