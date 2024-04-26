const fs = require("fs");

const makeId = require("../pkg/strings");

// 1 byte = 8 bit
// 1 KB = 1024 bytes
// 1 MB = 1024 KB
// 1 GB = 1024 MB
// 1 TB = 1024 GB

const MAX_FILESIZE = 1048576; // 1024 * 1024 = 1 MB

const ALLOWED_FILETYPES = [
    "application/pdf",
    "text/plain"
];

const upload = (req, res) => {
    // req.files -> contains files
    if(MAX_FILESIZE < req.files.document.size){
        return res.status(400).send("File exceeeds max file size");
    }
    if(!ALLOWED_FILETYPES.includes(req.files.document.mimetype)){
        return res.status(400).send("File type is not allowed Only .pdf and .txt allowed!");
    }

    const userDir = `user_${req.auth.id}`; // vnatre vo folderot
    const userDirPath = `${__dirname}/../uploads/${userDir}`; // patekata do toj folder na korisnikot

    if(!fs.existsSync(userDirPath)){
        // dokolku ne postoi toj folder na korisnikot
        fs.mkdirSync(userDirPath); //kreiraj go
    }

    const fileName = `${makeId(10)}_${req.files.document.name}`;
    const filePath = `${userDirPath}/${fileName}`;

    req.files.document.mv(filePath, (err) => {
        if(err){
            return res.status(500).send("Internal Server Error");
        }
        return res.status(200).send({file_name: fileName});
    })
};

const download = async (req, res) => {
    const userDir = `user_${req.auth.id}`;
    const userDirPath = `${__dirname}/../uploads/${userDir}`;
    const filePath = `${userDirPath}/${req.params.filename}`;

    if(!fs.existsSync(filePath)){
        return res.status(404).send("File not found");
    }
    res.download(filePath);
};

const listFiles = async(req, res) => {
    // od koj direktorium(folder) sakam da gi procitam
    // Ako direktoriumot ima fajlovi izlistaj gi
    // dali userDir postoi
    // dali userDirPath postoi -> dokolku ne korisnikot momentalno nema uploads

    const userDir = `user_${req.auth.id}`;
    const userDirPath = `${__dirname}/../uploads/${userDir}`;

    if(!fs.existsSync(userDirPath)){
        return res.status(400).send("You don't have any uploads yet");
    }

    const files = fs.readdirSync(userDirPath);
    return res.status(200).send(files);
};

const removeFile = async (req, res) => {
    const userDir = `user_${req.auth.id}`;
    const userDirPath = `${__dirname}/../uploads/${userDir}`;
    const fileName = req.params.filename;

    if(!fs.existsSync(`${userDirPath}/${fileName}`)){
        return res.status(404).send("File already deleted!");
    }

    const filesInDir = fs.readdirSync(userDirPath);

    try{
        fs.unlinkSync(`${userDirPath}/${fileName}`);
        console.log("File has been sucessfully deleted");
    }catch(err){
        console.error("Error deleting file", err);
    }

    if (filesInDir.length === 1){
        fs.rmdirSync(userDirPath);
    }

    res.status(200).send({ msg: "Deleted a file", deletedFile: fileName});
};

module.exports = {
    upload,
    download,
    listFiles,
    removeFile
}