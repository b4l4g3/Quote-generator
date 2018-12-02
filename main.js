// Helper functions
let rng = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

// DOM elements
let body = document.querySelector('body');
let quoteButton = document.querySelector('.js-button-quote');
let quoteText = document.querySelector('.js-quoteText');
let quoteAuthor = document.querySelector('.js-quoteAuthor');
let socialButton = document.querySelectorAll('.button-social');
let twitterButton = socialButton[0];
let tumblrButton = socialButton[1];

let fetchLocal;
let fetchServer;

// Check if JSON server is working 
fetch("http://localhost:3000/quotes")
    .then(resp => {
        // Use the server if it's working.
        fetchServer = function () {
            return fetch(`http://localhost:3000/quotes?id=${rng(101)}`)
                .then(resp => resp.json())
                .then(resp => resp[0]) // The response array has only one element
                .then(quote => {
                    quoteText.textContent = quote.quote;
                    quoteAuthor.textContent = quote.author;
                    randomColor = `rgba(1, ${rng(250)}, ${rng(250)}, 0.4)`;
                    body.style.backgroundColor = randomColor;
                    quoteButton.style.backgroundColor = randomColor;
                    socialButton[0].style.backgroundColor = randomColor;
                    socialButton[1].style.backgroundColor = randomColor;
                })
        }
        quoteButton.addEventListener("click", fetchServer);
        fetchServer();
    })
    // Use local JSON file if the server is not working.
    .catch(error => {
        fetchLocal = function () {
            return fetch("db.json")
                    .then(resp => resp.json())
                    .then(resp => resp.quotes[rng(101)]) 
                    .then(quote => {
                        quoteText.textContent = quote.quote;
                        quoteAuthor.textContent = quote.author;
                        randomColor = `hsl(${rng(360)}, 70%, 70%)`;
                        body.style.backgroundColor = randomColor;
                        quoteButton.style.backgroundColor = randomColor;
                        socialButton[0].style.backgroundColor = randomColor;
                        socialButton[1].style.backgroundColor = randomColor;
                        console.log(randomColor)
                    })
        }
        quoteButton.addEventListener("click", fetchLocal);
        fetchLocal();
    })

twitterButton.addEventListener('click', () => {
    let a = document.createElement('a');
    a.target="_blank";
    a.href=`https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(`"${quoteText.textContent}" ${quoteAuthor.textContent}`)}`
    a.click();
});

tumblrButton.addEventListener('click', () => {
    let a = document.createElement('a');
    a.target="_blank";
    a.href = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(quoteAuthor.textContent)}&content=${encodeURIComponent(quoteText.textContent)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`
    a.click();
})


