import '@babel/polyfill';	

window.alert = (msg) => { console.log(msg); };	// test alert message in console
window.matchMedia = () => ({});
window.scrollTo = () => { };