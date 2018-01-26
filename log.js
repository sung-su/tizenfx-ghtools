
function _pring(level, msg) {
  console.log('[' + level + '] ' + msg)
};

module.exports = {
  debug: function(msg) {
    _pring('DEBUG', msg)
  },
  info: function(msg) {
    _pring('INFO', msg)
  },
  warn: function(msg) {
    _pring('WARN', msg)
  },
  error: function(msg) {
    _pring('ERROR', msg)
  }
};
