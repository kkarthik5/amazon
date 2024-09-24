document.addEventListener("DOMContentLoaded", function () {
    const shopSection = document.getElementById("shop-section");

    // Example categories data, replace with dynamic loading if necessary
    const categories = {
        "Clothes": ["cloth_1.png", "cloth_2.png", "cloth_3.png", "cloth_4.jpg", "cloth_5.png", "cloth_6.png", "cloth_7.png", "cloth_8.png"],
        "Personal Care": ["personal_1.png", "personal_2.png", "personal_3.png", "personal_4.png", "personal_5.png", "personal_6.png", "personal_7.png", "personal_8.png"],
        "Furniture": ["furn_1.png", "furn_2.png", "furn_3.png", "furn_4.png", "furn_5.png", "furn_6.png", "furn_7.png", "furn_8.png"],
        "Electronics": ["elec_1.png", "elec_2.png", "elec_3.png", "elec_4.png", "elec_5.png", "elec_6.png", "elec_7.png", "elec_8.png"],
        "Beauty Picks": ["beauty_1.png", "beauty_2.png", "beauty_3.png", "beauty_4.png", "beauty_5.png", "beauty_6.png", "beauty_7.png", "beauty_8.png"],
        "Pet Care": ["pet_1.jpg", "pet_2.jpg", "pet_3.jpg", "pet_4.jpg", "pet_5.jpg", "pet_6.jpg", "pet_7.jpg", "pet_8.jpg"],
        "New arrivals in Toys": ["toy_1.jpg", "toy_2.jpg", "toy_3.jpg", "toy_4.jpg", "toy_5.jpg", "toy_6.jpg", "toy_7.jpg", "toy_8.jpg"],
        "Fashion Trends": ["finestfit_1.jpg", "fashion_2.jpg", "fashion_3.jpg", "fashion_4.jpg", "fashion_5.jpg", "fashion_6.jpg", "fashion_7.jpg", "fashion_8.jpg"]
    };

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category && categories[category]) {
        shopSection.innerHTML = categories[category].map(image => `
            <div class="category-item">
                <img src="images/${image}" alt="${category}">
            </div>
        `).join('');
    } else {
        shopSection.innerHTML = '<p>Category not found or no images available</p>';
    }
});
