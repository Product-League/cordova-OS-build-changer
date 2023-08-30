const utils = require("./utils");

module.exports = function (context) {

  const confs = utils.getConfigs();
  const appId = utils.getAppIdentifier(context.opts.projectRoot + confs.configPathIos);

  utils.minSDKChanger(context.opts.projectRoot, false);

  utils.removeUnusedFolders(context.opts.projectRoot, context.opts.projectRoot + confs.iosPath, appId, false);

  let indexFileContent = utils.readFile(context.opts.projectRoot + confs.iosPath + confs.indexFile);
  utils.indexReplacer(context.opts.projectRoot + confs.iosPath + confs.indexFile, indexFileContent);
  utils.indexJSChanger(context.opts.projectRoot + confs.iosPath + "scripts/ECOP_Mobile.index.js");
  
  utils.minifier(context.opts.projectRoot + confs.iosPath + "scripts", '.js', {js: true});
  utils.minifier(context.opts.projectRoot + confs.iosPath + "css", '.css', {} );
  utils.minifier(context.opts.projectRoot + confs.iosPath, '.js', {js: true});
  utils.minifyImages(context.opts.projectRoot + confs.iosPath + 'img');

  let errorFileContent = utils.readFile(context.opts.projectRoot + confs.iosPath + confs.errorFile);
  utils.errorFileReplacer(context.opts.projectRoot + confs.iosPath + confs.errorFile, errorFileContent, confs.textToReplace, '');

}