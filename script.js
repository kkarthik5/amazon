document.addEventListener("DOMContentLoaded", function () {
    // Add click event listener to "See more" buttons
    const seeMoreButtons = document.querySelectorAll('.see-more');

    seeMoreButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            if (category) {
                // Redirect to the same page with a query parameter
                window.location.search = `?category=${encodeURIComponent(category)}`;
            }
        });
    });

    // Handling the category section on the same page
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        fetch('data/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const categoryData = data.categories[category];
                const container = document.getElementById('shop-section');
                if (container) {
                    // Clear the section first
                    container.innerHTML = '';
                    if (categoryData) {
                        // Append images or relevant data for the category
                        container.innerHTML = categoryData.map(item => `
                            <div class="category-item">
                                <img src="images/${item.image}" alt="${item.name}" data-product-id="${item.product_id}">
                            </div>
                        `).join('');

                        // Add click event listeners to the images
                        const images = container.querySelectorAll('.category-item img');
                        images.forEach(image => {
                            image.addEventListener('click', function () {
                                const productId = this.getAttribute('data-product-id');
                                if (productId) {
                                    // Redirect to the product description page
                                    window.location.href = `details.html?id=${encodeURIComponent(productId)}`;
                                }
                            });
                        });
                    } else {
                        container.innerHTML = '<p>Category not found</p>';
                    }
                } else {
                    console.error('Element with ID "shop-section" not found.');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                const container = document.getElementById('shop-section');
                if (container) {
                    container.innerHTML = '<p>Error loading data</p>';
                }
            });
    }
});
