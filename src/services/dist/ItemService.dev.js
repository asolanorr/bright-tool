"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteOnDate = exports.getItemByID = exports.onEditItem = exports.onDeleteItem = exports.createItem = exports.data = void 0;

var _firebase = require("./firebase");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var data = []; //Validate if the url value is a Jira ticket code to auto-complete the URL

exports.data = data;

var jiraValidation = function jiraValidation(item) {
  var newURL;

  if (item.url.length >= 7 && item.url.includes('WU-')) {
    newURL = 'https://jira.solarwinds.com/browse/' + item.url;
    item.url = newURL;
  }

  return item;
};

var createItem = function createItem(itemObject) {
  var newObj;
  return regeneratorRuntime.async(function createItem$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          newObj = jiraValidation(itemObject);
          _context.next = 3;
          return regeneratorRuntime.awrap(_firebase.db.collection('items').doc().set(newObj));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.createItem = createItem;

var onDeleteItem = function onDeleteItem(id) {
  return regeneratorRuntime.async(function onDeleteItem$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_firebase.db.collection('items').doc(id)["delete"]());

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.onDeleteItem = onDeleteItem;

var onEditItem = function onEditItem(itemObject, currentID) {
  var newObj;
  return regeneratorRuntime.async(function onEditItem$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          newObj = jiraValidation(itemObject);
          _context3.next = 3;
          return regeneratorRuntime.awrap(_firebase.db.collection('items').doc(currentID).update(newObj));

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.onEditItem = onEditItem;

var getItemByID = function getItemByID(id, setValues) {
  var doc;
  return regeneratorRuntime.async(function getItemByID$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_firebase.db.collection('items').doc(id).get());

        case 2:
          doc = _context4.sent;
          setValues(_objectSpread({}, doc.data()));

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}; //Delete the items whose date already past


exports.getItemByID = getItemByID;

var deleteOnDate = function deleteOnDate(dateValue, id) {
  var today, dueDate;
  return regeneratorRuntime.async(function deleteOnDate$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          today = new Date();
          dueDate = new Date(dateValue);

          if (!(today.setHours(23, 59, 0, 0) > dueDate.setHours(23, 59, 0, 0))) {
            _context5.next = 5;
            break;
          }

          _context5.next = 5;
          return regeneratorRuntime.awrap(_firebase.db.collection('items').doc(id)["delete"]());

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.deleteOnDate = deleteOnDate;