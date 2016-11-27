'use strict';

const Chance = require('chance');
const inplace = require('json-in-place');

var VERSION = "1.0.0";

module.exports = MqttGenerator;

function MqttGenerator(options) {
    this.options = options;
    this.chance = new Chance();
}

MqttGenerator.prototype.version = function() {
    return VERSION;
}

MqttGenerator.prototype.generate = function() {

    var result = this.options.message;

    for (var j = 0; j < this.options.replaces.length; j++) {
        var fn = this[this.options.replaces[j].type];
        var me = this;
/*        _msg =jspath.apply(_msg, this.options.replaces[j].expression,
                     function (value) {
                         return fn.call(me, me.options.replaces[j].options);
                         });*/
        var result = inplace(JSON.stringify(result))
            .set(this.options.replaces[j].expression, fn.call(me, me.options.replaces[j].options))
            .toString();
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
    return '' + this.chance.integer(opt);
}

MqttGenerator.prototype.float = function(opt) {
    return '' + this.chance.floating(opt);
}
