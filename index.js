const express = require('express');
const members = require('./Members');
const exphbs = require('express-handlebars');

const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Members App',
    members
  })
);

// About route
app.get('/about', (req, res) => res.render('about'));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} 🚀`));
