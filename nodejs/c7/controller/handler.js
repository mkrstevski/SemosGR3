function getAnalysis(req, res) {
    res.render("analiza", { inputData: "", vkupnoKarakteri: 0, zborovi: [], vkupnoZborovi: 0, pogolemiOd5: 0, pomaliOd5: 0, ednakviNa5: 0, vkupnoRecenici: 0, vkupnoSamoglaski: 0 });
}


function postAnalysis(req, res) {
    const inputData = req.body.data

    if (!inputData) {
        return getAnalysis(req, res)
    }

    const vkupnoKarakteri = inputData.length
    const zborovi = inputData.split(/\s+/)
    const vkupnoZborovi = zborovi.length
    let pomaliOd5 = 0
    let pogolemiOd5 = 0
    let ednakviNa5 = 0
    let vkupnoRecenici = 0
    let vkupnoSamoglaski = 0

    zborovi.forEach(zbor => {
        if (zbor.length < 5) {
            pomaliOd5++
        } else if (zbor.length > 5) {
            pogolemiOd5++
        } else {
            ednakviNa5++
        }
        const prvaBukva = zbor.charAt(0).toLowerCase()
        if (["a", "e", "i", "o", "u"].includes(prvaBukva)) {
            vkupnoSamoglaski++
        }

    })

    vkupnoRecenici = inputData.split(/[.!?]/).length - 1 // da ne dodava plus 1 element vo array posle split.

    res.render("analiza", {
        inputData,
        vkupnoKarakteri,
        zborovi,
        vkupnoZborovi,
        pogolemiOd5,
        pomaliOd5,
        ednakviNa5,
        vkupnoRecenici,
        vkupnoSamoglaski,
    })
}

module.exports = {
    getAnalysis,
    postAnalysis,
}