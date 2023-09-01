"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPromos = exports.promosFailed = exports.promosLoading = exports.fetchPromos = exports.addComments = exports.commentsFailed = exports.fetchComments = exports.addDishes = exports.dishesFailed = exports.dishesLoading = exports.fetchDishes = exports.addComment = void 0;

var ActionTypes = _interopRequireWildcard(require("./ActionTypes"));

var _baseURL = require("../components/shared/baseURL");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var addComment = function addComment(dishId, rating, author, comment) {
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment
    }
  };
};

exports.addComment = addComment;

var fetchDishes = function fetchDishes() {
  return function (dispatch) {
    dispatch(dishesLoading(true));
    return fetch(_baseURL.baseURL + 'dishes').then(function (response) {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, function (error) {
      var errmess = new Error(error.message);
      throw errmess;
    }).then(function (response) {
      return response.json();
    }).then(function (dishes) {
      return dispatch(addDishes(dishes));
    })["catch"](function (error) {
      return dispatch(dishesFailed(error.message));
    });
  };
};

exports.fetchDishes = fetchDishes;

var dishesLoading = function dishesLoading() {
  return {
    type: ActionTypes.DISHES_LOADING
  };
};

exports.dishesLoading = dishesLoading;

var dishesFailed = function dishesFailed(errmess) {
  return {
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
  };
};

exports.dishesFailed = dishesFailed;

var addDishes = function addDishes(dishes) {
  return {
    type: ActionTypes.ADD_DISHES,
    payload: dishes
  };
};

exports.addDishes = addDishes;

var fetchComments = function fetchComments() {
  return function (dispatch) {
    return fetch(_baseURL.baseURL + 'comments').then(function (response) {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, function (error) {
      var errmess = new Error(error.message);
      throw errmess;
    }).then(function (response) {
      return response.json();
    }).then(function (comments) {
      return dispatch(addComments(comments));
    })["catch"](function (error) {
      return dispatch(commentsFailed(error.message));
    });
  };
};

exports.fetchComments = fetchComments;

var commentsFailed = function commentsFailed(errmess) {
  return {
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
  };
};

exports.commentsFailed = commentsFailed;

var addComments = function addComments(comments) {
  return {
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
  };
};

exports.addComments = addComments;

var fetchPromos = function fetchPromos() {
  return function (dispatch) {
    dispatch(promosLoading(true));
    return fetch(_baseURL.baseURL + 'promotions').then(function (response) {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, function (error) {
      var errmess = new Error(error.message);
      throw errmess;
    }).then(function (response) {
      return response.json();
    }).then(function (promos) {
      return dispatch(addPromos(promos));
    })["catch"](function (error) {
      return dispatch(promosFailed(error.message));
    });
  };
};

exports.fetchPromos = fetchPromos;

var promosLoading = function promosLoading() {
  return {
    type: ActionTypes.PROMOS_LOADING
  };
};

exports.promosLoading = promosLoading;

var promosFailed = function promosFailed(errmess) {
  return {
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
  };
};

exports.promosFailed = promosFailed;

var addPromos = function addPromos(promos) {
  return {
    type: ActionTypes.ADD_PROMOS,
    payload: promos
  };
};

exports.addPromos = addPromos;