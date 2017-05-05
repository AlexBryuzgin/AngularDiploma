import fs from 'fs';

export function storeImage(req, res) {
  req.body.images.forEach((elem, index) => {
    const base64Data = elem.replace(/^data:image\/png;base64,/, "");
    fs.mkdir(`images/${req.userId}`);
    const buffer = new Buffer(base64Data, 'base64');
    console.log(buffer);
    fs.writeFile(`images/${req.userId}/${index}.jpg`, buffer, {encoding: 'base64'}, function(err) {
      console.log(err);
    });
  });
  return res.send(req.body.images);
}