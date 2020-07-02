chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    let url = encodeURIComponent(tabs[0].url);
    let theSpan = document.getElementById("retUrl");
    let wrapper = document.getElementById("wrapper_elem");
    fetch("https://smllr.herokuapp.com/addUrl/" + url)
        .then(init => { 
            if (init.status === 400) {
                throw Error(init.text());
            } else {
                return init.json();
            }
         })
        .then(response => {
            theSpan.value = "http://pint.pw/" + response;
            theSpan.onclick = theSpan.select;
            theSpan.className = "easy_read";
            theSpan.select();
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            document.getElementById("main_message").innerText = "URL copied to clipboard!";
        })
        .catch(e => {
            theSpan.value = url;
            theSpan.className = "easy_read";
            wrapper.style.backgroundColor = "red";
            document.getElementById("main_message").innerText = "The URL is not valid!";
        });
});
  
