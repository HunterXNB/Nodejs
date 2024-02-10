const cardImage = "{%IMAGE%}"
const cardProductName = "{%PRODUCTNAME%}"
const cardNotOrganic = "{%NOT_ORGANIC%}"
const cardQuantity = "{%QUANTITY%}"
const cardPrice = "{%PRICE%}"
const cardID = "{%ID%}"
const cardFrom = "{%FROM%}"
const cardNutrients = "{%NUTRIENTS%}"
const cardDesc = "{%DESCRIPTION%}"
function replaceTemplate(temp, data) {
    const replacedTemp = temp.replaceAll(cardImage, data.image).replaceAll(cardProductName, data.productName).replaceAll(cardNotOrganic, data.organic ? "" : "not-organic").replaceAll(cardQuantity, data.quantity)
        .replaceAll(cardPrice, data.price).replaceAll(cardID, data.id)
        .replaceAll(cardFrom, data.from).replaceAll(cardNutrients, data.nutrients)
        .replaceAll(cardDesc, data.description)
    return replacedTemp
}
module.exports = replaceTemplate