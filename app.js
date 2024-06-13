const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const dbManager = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // User.findById(1)
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch(err => console.log(err));
});

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);


app.use(errorController.get404);


(async () => {
    try {
      const db = await dbManager.connect('mongodb://localhost:27017/', 'my_database');
      const collection = db.collection('my_collection');
        app.get('/', async (req, res) => {
        try {
        const result = await collection.findOne({});
        res.send(result);
        } catch (error) {
          res.status(500).send('Error fetching data from MongoDB');
        }
      });
  
      app.listen(3000, () => {
        console.log('Server is running on port 3000');
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  })();
  
