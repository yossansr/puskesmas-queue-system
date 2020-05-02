const express = require('express')
let db = require('./db/db')
const puskesmasdb = db.puskesmas
const patientdb = db.patient
const PORT = process.env.PORT || 4000

// Setup express app
const app = express()

// Route
app.get('/puskesmas', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'Get all puskesmas',
    puskesmas: puskesmasdb
  })
})

app.post('/puskesmas', (req, res) => {
    if (req.body.name.length === 0) {
      return res.status(400).send({
        success: false,
        message: 'Puskesmas must have a name'
      })
    }
  
    puskesmasdb.push({
      id: db[db.length-1].id + 1,
      name: req.body.name,
      description: req.body.description
    })
  
    return res.status(201).send({
      success: true,
      message: 'New Puskesmas successfully created'
    })
  })