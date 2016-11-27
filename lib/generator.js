'use strict';

const jspath = require('jsonpath');
const change = require('chance');

var VERSION = "1.0.0";

module.exports = MqttGenerator;

function MqttGenerator(options) {
    this.options = options;
    this.change = new Change();
}

MqttGenerator.prototype.version = function() {
    return VERSION;
}

MqttGenerator.prototype.generate = function() {

    var _msg = this.options.message;

    for (var j = 0; j < this.options.replaces.length; j++) {
        var fn = this[this.options.replaces[j].type];
        var me = this;
        _msg =jspath.apply(_msg, this.options.replaces[j].expression,
                     function (value) {
                         return fn.call(me, me.options.replaces[j].options);
                     });
        console.log(result);
    }
}

MqttGenerator.prototype.date = function(opt) {
    return dateformat(new Date(), opt.format);
}

MqttGenerator.prototype.string = function(opt) {
    return randomstring.generate(opt.length);
}

MqttGenerator.prototype.int = function(opt) {
    return '' + this.change.integer(opt);
}

MqttGenerator.prototype.float = function(opt) {
    return '' + this.change.floating(opt);
}
