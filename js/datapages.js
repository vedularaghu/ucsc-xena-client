/*eslint-env browser */
/*global require: false, console: false, module: false */

'use strict';

require('base');
const React = require('react');
const datapages = require('ucsc-xena-datapages/datapages');
const session = require('ucsc-xena-datapages/session');
const connector = require('./connector');
const createStore = require('./store');
const getSessionProxy = require('./sessionProxy');

var Datapages = React.createClass({
	shouldComponentUpdated: () => false,
	componentDidMount: function () {
		console.log(datapages);
		datapages.start(this.refs.datapages);
	},
	render: () => <div ref='datapages'/>
});


var store = createStore();
var main = window.document.getElementById('main');

var controls = {
	'set-state': (state, sessionStorage) => JSON.parse(sessionStorage)
};

var identity = x => x;

var controller = {
	action: (state, [tag, ...args]) => (controls[tag] || identity)(state, ...args),
	postAction: (serverBus, state, [tag, ...args]) => (controls[tag + '-post!'] || identity)(serverBus, state, ...args)
};

var selector = state => state;

session.setSessionStorage(getSessionProxy(store.uiBus.onNext.bind(store.uiBus)));


connector({...store, controller, main, selector, Page: Datapages});
