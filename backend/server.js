import express from 'express'
import app from './app'
import {singlePublicFileUpload} from './awsS3.js'

app.use(express.static('front'))

//grab url and send it back to client
app.get('/s3Url', async (req, res) => {
    const url = await singlePublicFileUpload()
    res.send({url})
});
