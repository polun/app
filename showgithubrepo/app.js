function createALink() {
    var domA = document.createElement('a');
    domA.setAttribute('class', 'dropdown-item');
    domA.setAttribute('href', '/polunzh?tab=repositories');
    domA.setAttribute('data-ga-click', 'Header, go to repositories list, text:your repositories');
    domA.appendChild(document.createTextNode('Your repos'));

    return domA;
}

var githubDomain = 'github.com';
var url = window.location.href;
url = url.substring(url.indexOf('//') + 2);
url = url.substr(0, url.indexOf('/'));
if (url === githubDomain) {
    var userProfileDom = document.querySelectorAll('.dropdown-menu,.dropdown-menu-sw');
    if (userProfileDom && userProfileDom.length > 0) {
        var existAElement = userProfileDom[1].querySelectorAll('a')[1];
        userProfileDom[1].insertBefore(createALink(), existAElement);
    }
}