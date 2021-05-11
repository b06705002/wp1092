const Logger = (message_log) => {
    var d = new Date()
    var file_name = [
                        d.getFullYear(),
                        d.getMonth()+1,
                        d.getDate(),
                        d.getHours(),
                        d.getMinutes()
                    ].join('-');
    
    let fs = require('fs');
    var util = require('util');
    let log_file = fs.createWriteStream(__dirname + 'log/' + `${file_name}.log`, {flags : 'a'});
    var log_stdout = process.stdout;

    log_file.write(message_log + '\n');
    log_stdout.write(message_log + '\n');

    // console.log = function () {
    //     log_file.write(util.format.apply(null, message_log) + '\n');
    //     log_stdout.write(util.format.apply(null, message_log) + '\n');
    //   }
    //   console.error = console.log;
}

export default Logger