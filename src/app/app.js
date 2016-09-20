const m = require("mithril");
const Home = require("./components/Home");
const Profile = require("./components/Profile");
window.m = m;
let mount = document.getElementById("mount");
m.route(mount, "/", {
	"/": Home,
	"/player/:id": Profile
})
