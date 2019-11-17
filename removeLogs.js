const fs = require("fs");
const chalk = require("chalk");
module.exports = class RemoveLogs {
  apply(compiler) {
    compiler.hooks.done.tap("RemoveLogs", stats => {
      const { path, filename } = stats.compilation.options.output;
      try {
        let filePath = path + "/" + filename;
        fs.readFile(filePath, "utf8", (err, data) => {
          const rgx = /console.log\(['|"](.*?)['|"]\)/;
          const newdata = data.replace(rgx, "");
          if (err)
            console.log(chalk.bold.bgRed("Exception:"), chalk.bold.red(err));
          fs.writeFile(filePath, newdata, function(err) {
            if (err) {
              return console.log(
                chalk.bold.bgRed("Exception:"),
                chalk.bold.red(err)
              );
            }
            console.log(chalk.bold.green("Logs Removed"));
          });
        });
      } catch (error) {
        console.log(
          chalk.bold.bgRed("Exception:"),
          chalk.bold.red(error.message)
        );
      }
    });
  }
};
