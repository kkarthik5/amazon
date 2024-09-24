document.addEventListener('DOMContentLoaded', () => {
    const seeMoreLinks = document.querySelectorAll('.see-more');
    const shopSection = document.querySelector('#shop-section');

    seeMoreLinks.forEach(link => {
        link.addEventListener('click', () => {
            const category = link.getAttribute('data-category');
            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    const images = data.categories[category];

                    // Check if the category section already exists and remove it
                    const existingSection = document.querySelector(`.category-section[data-category="${category}"]`);
                    if (existingSection) {
                        existingSection.remove();
                    }

                    // Create a new section for the images of the clicked category
                    const categorySection = document.createElement('div');
                    categorySection.classList.add('category-section');
                    categorySection.setAttribute('data-category', category);

                    images.forEach(image => {
                        const boxDiv = document.createElement('div');
                        boxDiv.classList.add('box');

                        const imgElement = document.createElement('img');
                        imgElement.src = `images/${image}`;
                        imgElement.alt = category;

                        boxDiv.appendChild(imgElement);
                        categorySection.appendChild(boxDiv);
                    });

                    // Append the new section to the shop section
                    shopSection.appendChild(categorySection);
                })
                .catch(error => console.error('Error fetching data:', error));
        });
    });
});
