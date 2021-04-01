const fs = require("fs");
const path = require("path");

const getAllRouteFiles = (dirPath, arrayOfFiles, root) => {
  files = fs.readdirSync(dirPath);

  root = root || dirPath;
  arrayOfFiles = arrayOfFiles || [];

  files.map(file => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllRouteFiles(
        path.join(dirPath, file),
        arrayOfFiles,
        root
      );
    } else {
      // arrayOfFiles.push(path.join(dirPath, file));
      arrayOfFiles.push(
        `./${path.relative(root, path.join(dirPath, file)).replace("\\", "/")}`
      );
    }
  });

  return arrayOfFiles;
};

let src = getAllRouteFiles(__dirname);
src = src.filter(f => f !== "./index.js");

const routes = [];
src.map(r =>
  routes.push({
    route: require(r),
    name: r.replace(".", "").replace(".js", ""),
  })
);

module.exports = routes;
