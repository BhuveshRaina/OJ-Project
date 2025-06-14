const fs = require('fs');
const path = require('path');

exports.getBoilerplate = (req, res) => {
  const language = req.params.language.toLowerCase();
  const supported = ['python', 'cpp', 'java'];

  if (!supported.includes(language)) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  const filePath = path.join(__dirname, '../boilerplates', `${language}.txt`);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not load boilerplate file' });
    }

    res.json({ language, boilerplate: data });
  });
};