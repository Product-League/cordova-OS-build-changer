const utils = require("./utils");

module.exports = function (context) {
    const confs = utils.getConfigs();
    const appId = utils.getAppIdentifier(context.opts.projectRoot + confs.configPathAndroid);

    utils.removeUnusedFolders(context.opts.projectRoot + confs.androidPath, appId);
    let indexFileContent = utils.readFile(context.opts.projectRoot + confs.androidPath + 'index.html');
    utils.indexReplacer(context.opts.projectRoot + confs.androidPath + confs.errorFile, indexFileContent);
    utils.indexJSChanger(context.opts.projectRoot + confs.androidPath + "scripts/ECOP_Mobile_PS.index.js");
    utils.minifier(context.opts.projectRoot + confs.androidPath + "scripts", '.js', {js: true});
    utils.minifier(context.opts.projectRoot + confs.androidPath + "css", '.css', {} );
    //utils.minifier(context.opts.projectRoot + confs.androidPath, '.html',{html: true});
    utils.minifier(context.opts.projectRoot + confs.androidPath, '.js', {js: true});
    utils.minifyImages(context.opts.projectRoot + confs.androidPath + 'img');

}