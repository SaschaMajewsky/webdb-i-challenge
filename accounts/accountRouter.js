const express = require('express');
const knex = require('knex');

const dbConnection = knex({
  client: 'sqlite3',
  connection: {
    // it starts from root of the project
    filename: './data/budget.db3',
  },
  useNullAsDefault: true,
});

const router = express.Router();

// Get all accounts
router.get('/', (req, res) => {
  const { limit = 5, sortby = 'id', sortdir = 'desc' } = req.query;

  dbConnection('accounts')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Add a new account
router.post('/', async (req, res) => {
  dbConnection('accounts')
    .insert(req.body)
    .then(accountId => {
      res.status(201).json(accountId);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Get a specific account by ID
router.get('/:id', async (req, res) => {
  dbConnection('accounts')
    .where({ id: req.params.id })
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Delete an account
router.delete('/:id', async (req, res) => {
  dbConnection('accounts')
    .where({ id: req.params.id })
    .del()
    .then(successFlag => {
      successFlag > 0
        ? res.status(201).json({ message: 'The account was deleted.' })
        : res.status(404).json({ message: 'The account was not found.' });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Update an account
router.put('/:id', async (req, res) => {
  dbConnection('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(successFlag => {
      successFlag > 0
        ? res.status(201).json({ message: 'The account was updated.' })
        : res.status(404).json({ message: 'The account was not found.' });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
