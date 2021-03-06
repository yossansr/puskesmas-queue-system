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
    id: db[db.length - 1].id + 1,
    name: req.body.name,
    description: req.body.description
  })

  return res.status(201).send({
    success: true,
    message: 'New Puskesmas successfully created'
  })
})
app.get('/puskesmas/:id', (req, res) => {
  let puskesmas = puskesmasdb.filter(item => item.id == req.params.id)
  if (puskesmas.length === 0) {
    return res.status(404).send({
      success: false,
      message: 'Puskesmas not found'
    })
  }
  return res.status(200).send({
    success: true,
    message: `Here is the puskesmas of id ${req.params.id}`,
    puskesmas: db.puskesmas[0]
  })
})

app.put('/puskesmas/:id', (req, res) => {
  let puskesmas = puskesmasdb.filter(item => item.id == req.params.id)
  if (puskesmas.length === 0) {
    return res.status(404).send({
      success: false,
      message: 'Puskesmas not found'
    })
  }

  puskesmasdb = puskesmasdb.map(item => {
    if (item.id == req.params.id) item = {
      id: item.id,
      ...req.body
    }
    return item
  })

  return res.status(200).send({
    success: true,
    message: 'Puskesmas successfully updated',
  })
})

app.delete('/puskesmas/:id', (req, res) => {
  let puskesmas = puskesmasdb.filter(item => item.id == req.params.id)
  if (puskesmas.length === 0) {
    return res.status(404).send({
      success: false,
      message: 'Puskesmas not found'
    })
  }

  puskesmasdb = puskesmasdb.filter(item => item.id != req.params.id)

  return res.status(200).send({
    success: true,
    message: 'puskesmas successfully deleted'
  })
})

app.get('/patient', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'Get all patient',
    patients: patientdb
  })
})

app.post('/patient', (req, res) => {
  if (req.body.name.length === 0) {
    return res.status(400).send({
      success: false,
      message: 'Patient must have a name'
    })
  }

  patientdb.push({
    id: puskesmasdb[puskesmasdb.length - 1].id + 1,
    name: req.body.name,
    description: req.body.description
  })

  return res.status(201).send({
    success: true,
    message: 'New Patient successfully created'
  })
})

app.get('/patient/:id', (req, res) => {
  let patient = patientdb.filter(item => item.id == req.params.id)
  if (patient.length === 0) {
    return res.status(404).send({
      success: false,
      message: 'Patient not found'
    })
  }
  return res.status(200).send({
    success: true,
    message: `Here is the patient of id ${req.params.id}`,
    patient: patientdb[0]
  })
})

app.put('/patient/:id', (req, res) => {
  let patient = patientdb.filter(item => item.id == req.params.id)
  if (patient.length === 0) {
    return res.status(404).send({
      success: false,
      message: 'Patient not found'
    })
  }

  patientdb = patientdb.map(item => {
    if (item.id == req.params.id) item = { id: item.id, ...req.body }
    return item
  })

  return res.status(200).send({
    success: true,
    message: 'Patient successfully updated',
  })
})

app.delete('/patient/:id', (req, res) => {
  let patient = patientdb.filter(item => item.id == req.params.id)
  if (patient.length === 0) {
    return res.status(404).send({
      success: false,
      message: 'Patient not found'
    })
  }

  patient = patientdb.filter(item => item.id != req.params.id)

  return res.status(200).send({
    success: true,
    message: 'Patient successfully deleted'
  })
})