import express from 'express'
import app from './app'
import s3 from './awsS3.js'

app.use(express.static('front'))

//grab url and send it back to client
app.get('/s3Url', async (req, res) => {
    const url = s3.singlePublicFileUpload()
    res.send({url})
});
