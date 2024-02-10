const http = require("http")
const url = require("url")
const fs = require("fs")
const replaceTemplate = require("./modules/replaceTemplate")
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data)
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8")
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8")
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8")
const cardsReplacement = "{%PRODUCT_CARDS%}"

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true)
    // Overview page
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, {
            "Content-type": "text/html"
        })
        const cardsHtml = dataObj.map(product => {
            return replaceTemplate(tempCard, product)
        })
        res.end(tempOverview.replace(cardsReplacement, cardsHtml))
    }
    // Product page 
    else if (pathname === "/product") {
        const product = query.id && dataObj.find(el => el.id.toString() === query.id)
        if (product) {
            res.writeHead(200, {
                "Content-type": "text/html"
            })

            const modifiedProductTemp = replaceTemplate(tempProduct, product)
            res.end(modifiedProductTemp)
        } else {

            res.writeHead(404, {
                "Content-type": "text/html",
                "my-own-header": "Hello-World"
            })
            res.end("<h1>Page not found!</h1>")
        }

    }
    //API
    else if (pathname === "/api") {
        res.writeHead(200, {
            "Content-type": "application/json"
        })
        res.end(data)
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "Hello-World"
        })
        res.end("<h1>Page not found!</h1>")
    }
})
server.listen(8000, "127.0.0.1", () => {
    console.log("listening")
})