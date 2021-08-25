const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// DB Connection

const client = new MongoClient(process.env.MONGODB_URI);

// GET /memberships

app.get('/memberships', async (req, res) => {
  try {
    const con = await client.connect();
    const getData = await con
      .db('testas')
      .collection('services')
      .find()
      .toArray();
    await con.close();
    res.send(getData);
  } catch (err) {
    res.status(500).send({ err: 'Please try again' });
  }
});

// POST /memberships

app.post('/memberships', async (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price || !description) {
    return res.status(400).send({ err: 'Incorrect data passed' });
  }
  try {
    const con = await client.connect();
    const postData = await con.db('testas').collection('services').insertOne({
      name,
      price,
      description,
    });
    await con.close();
    return res.send(postData);
  } catch (err) {
    res.status(500).send({ err: 'Please try again' });
  }
});

// DELETE /memberships/:id
app.delete('/memberships/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const con = await client.connect();
    const deleteData = await con
      .db('testas')
      .collection('services')
      .deleteOne({ _id: ObjectId(id) });
    await con.close();
    res.send({ msg: 'Membership has been deleted', deleteData });
  } catch (err) {
    res.status(500).send({ err: 'Please try again' });
  }
});

// GET /users/:order
app.get('/users/:order', async (req, res) => {
  try {
    const con = await client.connect();
    const getData = await con
      .db('testas')
      .collection('users')
      .find()
      .sort({ name: req.params.order?.toLowerCase() === 'dsc' ? -1 : 1 })
      .toArray();
    await con.close();
    res.send(getData);
  } catch (err) {
    res.status(500).send({ err: 'Please try again' });
  }
});

// POST /users
app.post('/users', async (req, res) => {
  const { name, surname, email, service_id } = req.body;
  if (!name || !surname || !email || !service_id) {
    res.status(400).send({ err: 'Incorrect data passed' });
  }
  try {
    const con = await client.connect();
    const postData = await con.db('testas').collection('users').insertOne({
      name,
      surname,
      email,
      service_id,
    });
    await con.close();
    return res.send(postData);
  } catch (err) {
    res.status(500).send({ err: 'Please try again' });
  }
});

// DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const con = await client.connect();
    const deleteData = await con
      .db('testas')
      .collection('users')
      .deleteOne({ _id: ObjectId(id) });
    await con.close();
    res.send({ msg: 'Membership has been deleted', deleteData });
  } catch (err) {
    res.status(500).send({ err: 'Please try again' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
