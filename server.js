const express = require("express")
const mongoose = require("mongoose")
const ShortUrl = require("./models/ShortUrl")
const app = express()

app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost:27017/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
})

//Routes 
app.get('/',async (req,res) => {
    const Urls = await ShortUrl.find()
    res.render("index",{ShortUrls: Urls})
})

app.post('/Urls',async (req,res) => {
    console.log("done")
    await ShortUrl.create({full: req.body.fullUrl})
    res.redirect("/")
})

app.get('/:otherUrl',async (req,res) => {
    console.log("done")
    const Url = await ShortUrl.findOne({short: req.params.otherUrl})
    if(Url == null){
        return res.sendStatus(404)
    }
    return res.redirect(Url.full)
})

app.listen(process.env.PORT || 5000)