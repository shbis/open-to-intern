// ----------------dataValidation----------------
const dataValidation = (data) => {
    if (Object.keys(data).length != 0)
        return true
    return false
}

// -------------------------------------fullName-----------------------------------------
const validFullName = (fullName) => {
    if ((typeof fullName == "String" && fullName.trim().length != 0 || fullName.match(/^[a-zA-Z ]+$/)))
        return true
    return false
}

// ----------------------------------------name-----------------------------------------
const validName = (name) => {
    if (typeof name == "string" && name.trim().length != 0 && name.match(/^[a-z.]{2,10}$/i))
        return true
    return false
}

// -------------------------------------------logo------------------------------------------
const url = (url) => {
    let urlReg = /(https|http?:\/\/.*\.(?:png|gif|webp|jpeg|jpg))/i;
    if (urlReg.test(url))
        return true;
};

// ----------------------------------------mail------------------------------------
const mail = (mail) => {
    if (typeof mail == "string" && mail.match(/^([a-z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/))
        return true
    return false
}


module.exports = { dataValidation, validName, url, mail, validFullName }