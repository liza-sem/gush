document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        if (!localStorage.getItem('popupClosed')) {
            const popup = document.getElementById('ls-popupForm-container');
            popup.style.display = 'flex';
            setTimeout(() => popup.classList.add('visible'), 10);
        }
    }, 5000);

    const forms = document.querySelectorAll('.ls-form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            postData('https://hook.us1.make.com/4mbrvqc1cvjfcsvcx3me4s1nn04i84ve', data);


            const discountCode = data.recipient === "Myself" ? "GIRLSAREGUSHING" : "MAKEHERGUSH";
            const thankYouMessage = data.recipient === "Myself" ?
                "<span class='post-message-header'>You're in for a wet and wild ride!</span><br>Here is your code for 15%:" :
                "<span class='post-message-header'>You're in for a wet and wild ride!</span><br>Here is your code for 15%:";

            let messageDivId = form.id === "ls-popupForm" ? "ls-popupMessage" : "ls-footerMessage";
            let messageElement = document.getElementById(messageDivId);
            messageElement.innerHTML = `${thankYouMessage} <div class="copyCode">${discountCode}</div><p class="info">Click to copy and paste in checkout! <br><br> We'll also send this code to your email <br><br> <span class="limited">Limited to one use.</span></p>`;
            messageElement.style.display = 'flex';
            form.style.display = 'none';

            document.querySelector('.copyCode').addEventListener('click', function () {
                navigator.clipboard.writeText(this.textContent).then(() => {
                    postData('https://hook.us1.make.com/oi8xcwdudchipxymggou1ftrpqac8whh', { 
                        'DiscountCode': this.textContent,
                        'Email': data.email
                    });
                    alert('Discount code copied to clipboard!');
                });
            });
        });
    });
});

function closePopup() {
    const popup = document.getElementById('ls-popupForm-container');
    popup.classList.remove('visible');
    setTimeout(() => popup.style.display = 'none', 500);
    localStorage.setItem('popupClosed', 'true');
}

async function postData(url, data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
