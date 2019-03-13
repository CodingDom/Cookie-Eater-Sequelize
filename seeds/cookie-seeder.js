const defaultCookies = ['Chocolate Chip Cookes', 'Sugar Cookies', 'Thin Mints', 'Lemeon Drop Cookies', 'Double Chocolate Chip Cookies', 'Oreos'];

module.exports = function(Cookie) {
    defaultCookies.forEach(function(cookie) {
        Cookie.create({
            name: cookie, 
            devoured: Math.floor(Math.random()*2) == 1
        });
    });
};