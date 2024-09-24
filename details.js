document.addEventListener("DOMContentLoaded", () => {
    // Parse the URL parameter to get the product ID
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    let product = null;

    // Fetch the data from data.json
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            // Iterate through each category in the productDetails to find the product by ID
            for (const category in data.productDetails) {
                if (data.productDetails[category][productId]) {
                    product = data.productDetails[category][productId];
                    break;
                }
            }

            // Populate the HTML with product data
            if (product) {
                document.getElementById('product-image').src = product.detail_image;
                document.getElementById('product-name').textContent = product.full_name;
                document.getElementById('product-description').textContent = product.additional_info;
                document.getElementById('mini-description').innerHTML = `<b>${product.emi}</b>`;
                document.getElementById('product-price').textContent = product.price;
                document.getElementById('product-price-side').textContent = product.price;
                document.getElementById('product-discount').innerHTML = `<span style="color:#007185;"><b>M.R.P <s>${product.mrp}</s></b></span> <br> ${product.tax_info}`;
                document.getElementById('product-delivery').innerHTML = `<span style="color:#007185;">${product.delivery.price}</span> <b>${product.delivery.delivery_time}</b><br> ${product.delivery.fastest_delivery}`;
                document.getElementById('product-stock').innerHTML = `<b style="color: #007600;">${product.availability}</b> <br> <span style="color:#007185;">ships from</span> ${product.seller.shipper}<br> <span style="color:#007185;">Sold by</span> ${product.seller.sold_by}`;
            } else {
                document.querySelector('.details-container').innerHTML = 'Product not found';
            }
        })
        .catch(error => console.error('Error fetching product data:', error));

    // Add event listener for the "Buy Now" button
    document.querySelector('.buy-now').addEventListener('click', () => {
        if (product) {
            // Initialize Razorpay payment
            const options = {
                key: 'rzp_test_CQ1uNRc0EWxXYl', // Your Razorpay Key ID
                amount: product.price.replace(/[^0-9]/g, '') * 100, // Convert price to paisa
                currency: 'INR',
                name: product.full_name,
                description: product.additional_info,
                image: product.detail_image,
                handler: function (response) {
                    alert('Payment successful!');
                    console.log('Payment ID:', response.razorpay_payment_id);
                    // Redirect to a success page or log the payment info as needed
                },
                prefill: {
                    name: 'Karthik K', // Optional: prefill the user's name
                    email: 'kkarthikk50662@gmail.com', // Optional: prefill the user's email
                    contact: '7338268522' // Optional: prefill the user's phone number
                },
                notes: {
                    address: 'Karthik k' // Optional: add any notes or additional info
                },
                theme: {
                    color: '#3399cc' // Custom color for the Razorpay interface
                }
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
        }
    });
});
