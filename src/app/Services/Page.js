const app = require("app");
const { basetitle } = require("../constants");

function Page(){
	let _title = "";
	const setTitle = newtitle => _title = newtitle;
	const title = () => _title;
	return {
		title,
		setTitle
	};
}

module.exports = Page
