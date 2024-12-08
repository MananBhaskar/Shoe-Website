document.addEventListener('DOMContentLoaded', () => {
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    const wishlistContainer = document.getElementById('wishlist');

    wishlistButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const product = event.target.dataset.product;
            const price = event.target.dataset.price;
            const img = event.target.dataset.img;
            addToWishlist({ product, price, img });
        });
    });

    function addToWishlist(item) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const exists = wishlist.find(wishItem => wishItem.product === item.product);

        if (!exists) {
            wishlist.push(item);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert(`${item.product} has been added to your wishlist!`);
        } else {
            alert(`${item.product} is already in your wishlist!`);
        }
    }

    function loadWishlist() {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('wishlist-item');
            listItem.innerHTML = `
                <img src="${item.img}" alt="${item.product}">
                <div class="item-info">
                    <h3>${item.product}</h3>
                    <p>Price: $${item.price}</p>
                    <button class="remove-btn" data-product="${item.product}">Remove</button>
                </div>
            `;
            wishlistContainer.appendChild(listItem);
        });
    }

    if (wishlistContainer) {
        loadWishlist();
    }

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const product = event.target.dataset.product;
            removeFromWishlist(product);
            event.target.parentElement.parentElement.remove();
        }
    });

    function removeFromWishlist(product) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist = wishlist.filter(item => item.product !== product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${product} has been removed from your wishlist!`);
    }
});
