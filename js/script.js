// Initial variables
const navbarnav = document.querySelector('.navbar-nav');
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
const shoppingCart = document.querySelector('.shopping-cart');
const itemdetailmodal = document.querySelector('#item-detail-modal');
const autocompleteList = document.querySelector('#autocomplete-list');

// Page transition
document.querySelector('.transition').onclick = () => {
    window.location.href = '#shop';
    searchForm.classList.remove('active');
};

// Hamburger menu toggle
document.querySelector('#hamburger-menu').onclick = (e) => {
    navbarnav.classList.toggle('active');
    e.preventDefault();
};

// Search form toggle
document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

// Shopping cart toggle
document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
};

// Close search form, navbar, and shopping cart when clicking outside of them
document.addEventListener('click', function (e) {
    const hm = document.querySelector('#hamburger-menu');
    const sb = document.querySelector('#search-button');
    const sc = document.querySelector('#shopping-cart-button');

    if (!hm.contains(e.target) && !navbarnav.contains(e.target)) {
        navbarnav.classList.remove('active');
    }
    if (!sb.contains(e.target) && !searchForm.contains(e.target) && !autocompleteList.contains(e.target)) {
        searchForm.classList.remove('active');
    }
    if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});

// Prevent click inside autocomplete from closing the search form
if (autocompleteList) {
    autocompleteList.addEventListener('click', function (e) {
        e.stopPropagation();
    });
}

// Live search and autocomplete functionality
document.addEventListener('DOMContentLoaded', () => {
    const productSearchBox = document.querySelector('#search-box');
    const products = document.querySelectorAll('.product-content h3');
    const productCards = document.querySelectorAll('.product-card'); // Assuming product cards have this class

    if (!productSearchBox || !autocompleteList) {
        return;
    }

    // Get product names for autocomplete
    const productNames = Array.from(products).map(product => product.textContent.trim());

    productSearchBox.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        autocompleteList.innerHTML = ''; // Clear previous suggestions

        if (!query) {
            filterProducts(''); // Reset filter
            return; // Stop if the input is empty
        }

        // Filter product names based on input
        const filteredNames = productNames.filter(name => name.toLowerCase().includes(query));

        // Display suggestions
        filteredNames.forEach(name => {
            const suggestion = document.createElement('div');
            suggestion.textContent = name;
            suggestion.onclick = () => {
                productSearchBox.value = name;
                autocompleteList.innerHTML = ''; // Clear suggestions
                filterProducts(name.toLowerCase());
            };
            autocompleteList.appendChild(suggestion);
        });

        // Filter product cards based on input
        filterProducts(query);
    });

    function filterProducts(query) {
        productCards.forEach(productCard => {
            const productTitle = productCard.querySelector('.product-content h3').textContent.toLowerCase(); // Adjust selector if necessary
            if (productTitle.includes(query)) {
                productCard.style.display = 'block';
            } else {
                productCard.style.display = 'none';
            }
        });
    }

    // Close autocomplete list when clicking outside
    document.addEventListener('click', function (e) {
        if (!autocompleteList.contains(e.target) && e.target !== productSearchBox) {
            autocompleteList.innerHTML = '';
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Mendapatkan referensi elemen modal dan tombol detail item
    const itemDetailButtons = document.querySelectorAll(".item-detail-button");
    const modal = document.querySelector("#item-detail-modal");
    const modalCloseIcon = modal.querySelector(".close-icon");

    // Menangani pembukaan modal saat tombol detail item diklik
    itemDetailButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            // Mendapatkan produk saat ini
            const currentProduct = this.closest('.product-card');

            if (currentProduct) {
                // Mengambil detail produk dari kartu produk saat ini
                const productImgSrc = currentProduct.querySelector('.product-image img').getAttribute('src');
                const productName = currentProduct.querySelector('.product-content h3').textContent;
                const productPrice = currentProduct.querySelector('.product-price span').textContent;
                const productDesc = currentProduct.querySelector('.product-content p').textContent; // Update variable name

                // Memperbarui konten modal
                document.querySelector('#modal-product-img').setAttribute('src', productImgSrc);
                document.querySelector('#modal-product-name').textContent = productName;
                document.querySelector('#modal-product-price').textContent = productPrice;
                document.querySelector('#modal-product-description').textContent = productDesc; // Fix the selector here

                // Menampilkan modal
                modal.classList.add("active");
            }
        });
    });

    // Menangani penutupan modal saat ikon tutup diklik
    modalCloseIcon.addEventListener("click", function (e) {
        e.preventDefault();
        modal.classList.remove("active"); // Menyembunyikan modal
    });

    // Opsional: Menutup modal jika pengguna mengklik di luar konten modal
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
});