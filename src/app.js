document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        currentProduct: {},
        showModal: false,
        items: [{
                id: 1,
                name: 'Ruijie Reyee 5port',
                img: '1.jpg',
                price: 100000,
                description: 'Ruijie Reyee 5-Port Switch adalah solusi jaringan yang efisien dan handal untuk kebutuhan konektivitas di rumah atau kantor kecil. Dengan lima port Ethernet yang mendukung kecepatan gigabit, perangkat ini memastikan transfer data yang cepat dan stabil untuk berbagai perangkat seperti komputer, printer, dan kamera IP.'
            },
            {
                id: 2,
                name: 'HTB 6 FO',
                img: '2.jpg',
                price: 200000,
                description: 'HTB 6 FO adalah solusi canggih untuk kebutuhan koneksi jaringan fiber optik. Perangkat ini dirancang untuk menyediakan koneksi yang cepat, stabil, dan efisien, mendukung berbagai aplikasi jaringan dengan bandwidth tinggi.'
            },
            {
                id: 3,
                name: 'Ruijie Reyee 8port',
                img: '3.jpg',
                price: 122000,
                description: 'Ruijie Reyee 8-Port Switch adalah solusi ideal untuk memperluas jaringan di rumah atau kantor kecil hingga menengah. Dengan delapan port Ethernet yang mendukung kecepatan gigabit, switch ini memastikan koneksi yang cepat dan stabil untuk berbagai perangkat seperti komputer, printer, dan perangkat jaringan lainnya. '
            },
            {
                id: 4,
                name: 'Router F663V3a',
                img: '4.jpg',
                price: 155000,
                description: 'F663V3a adalah router fiber optik yang dirancang untuk memberikan performa tinggi dan konektivitas yang stabil di lingkungan rumah atau kantor. Dengan dukungan untuk teknologi fiber optik, perangkat ini menawarkan kecepatan internet yang sangat cepat dan latensi rendah, ideal untuk streaming video berkualitas tinggi, gaming online, dan penggunaan internet yang intensif.'
            },
            {
                id: 5,
                name: 'Joint Closure 12 Core',
                img: '5.jpg',
                price: 72000,
                description: 'Joint Closure 12 Core adalah perangkat penting dalam sistem jaringan fiber optik yang dirancang untuk menghubungkan dan melindungi sambungan antara kabel fiber optik. Dengan kapasitas untuk menampung hingga 12 inti serat optik, perangkat ini memastikan sambungan yang andal dan aman, serta melindungi koneksi dari kerusakan dan lingkungan eksternal.'
            },
            {
                id: 6,
                name: 'TOTOLINK N300RT',
                img: '6.jpg',
                price: 228000,
                description: 'TOTOLINK N300RT adalah router nirkabel yang dirancang untuk memberikan konektivitas internet yang stabil dan cepat di rumah atau kantor kecil. Dengan dukungan untuk standar nirkabel IEEE 802.11n, router ini menawarkan kecepatan hingga 300 Mbps, memungkinkan pengalaman browsing, streaming, dan gaming yang lancar.'
            },
            {
                id: 7,
                name: 'ODP 8 core',
                img: '7.jpg',
                price: 98000,
                description: 'ODP 8 Core adalah perangkat Optical Distribution Point (ODP) yang dirancang untuk mengelola distribusi dan pengaturan kabel serat optik dalam jaringan fiber optik. Dengan kapasitas untuk menampung hingga 8 core fiber, ODP ini ideal untuk digunakan dalam instalasi jaringan fiber optik di area residensial, komersial, atau industri.'
            },
            {
                id: 8,
                name: 'HTB Single Netlink',
                img: '8.jpg',
                price: 90000,
                description: 'HTB Single Netlink adalah perangkat terintegrasi yang dirancang untuk memfasilitasi konektivitas dan manajemen jaringan. Dengan fitur yang dirancang untuk mendukung jaringan tunggal, perangkat ini cocok untuk penggunaan di lingkungan komersial dan rumah tangga yang memerlukan solusi jaringan yang efisien dan sederhana.'
            },
        ],


    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            const cartItem = this.items.find((item) => item.id === newItem.id);
            if (!cartItem) {
                this.items.push({
                    ...newItem,
                    quantity: 1,
                    total: newItem.price
                });
                this.quantity++;
                this.total += newItem.price;
            } else {
                this.items = this.items.map((item) => {
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id) {
            const cartItem = this.items.find((item) => item.id === id);

            if (cartItem.quantity > 1) {
                this.items = this.items.map((item) => {
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else {
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });
});

// form validation
const checkoutbutton = document.querySelector('.checkout-button');
checkoutbutton.disabled = true;

const form = document.querySelector('#checkoutForm');
form.addEventListener('keyup', function () {
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value.length !== 0) {
            checkoutbutton.classList.remove('disabled');
            checkoutbutton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutbutton.disabled = false;
    checkoutbutton.classList.remove('disabled');
});



// kirim data
checkoutbutton.addEventListener('click', async function (e) {
    e.preventDefault();
    const formData = new FormData(form)
    const data = new URLSearchParams(formData);
    const objdata = Object.fromEntries(data);

    // minta transaction token menggunakan ajax/fetch
    try {
        const response = await fetch('/php/payment.php', {
            method: 'POST',
            body: data,
        });
        const token = await response.text();
        window.snap.pay(token, {
            onSuccess: function (result) {
                Swal.fire({
                    title: 'Pembayaran Berhasil!',
                    text: 'Terima kasih atas pembayaran Anda.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                console.log(result);
            },
            onPending: function (result) {
                Swal.fire({
                    title: 'Pembayaran Pending!',
                    text: 'Pembayaran Anda sedang diproses. Silakan tunggu konfirmasi.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                console.log(result);
            },
            onError: function (result) {
                Swal.fire({
                    title: 'Pembayaran Gagal!',
                    text: 'Maaf, terjadi kesalahan saat memproses pembayaran Anda.',
                    icon: 'error',
                    confirmButtonText: 'Coba Lagi'
                });
                console.log(result);
            },
            onClose: function () {
                Swal.fire({
                    title: 'Pembayaran Dibatalkan!',
                    text: 'Anda menutup popup sebelum menyelesaikan pembayaran.',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
            }
        });
    } catch (err) {
        console.log(err.message);
    }
});


// format message
const formatmessage = (obj) => {
    return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No HP: ${obj.phone}
    Alamat: ${obj.address}
    
Data Pesanan
    ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
    TOTAL : ${rupiah(obj.total)} 
    Terima Kasih.`;
};




document.addEventListener('DOMContentLoaded', () => {
    const contactbtn = document.querySelector('#contactButton');
    const contactform = document.querySelector('#contactform');

    if (!contactbtn || !contactform) {
        console.error('Tombol atau form tidak ditemukan');
        return;
    }

    // Fungsi validasi form
    const validateForm = () => {
        const elements = contactform.elements;
        let isValid = true;

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element.required && element.value.trim() === '') {
                isValid = false;
                break;
            }
        }

        contactbtn.disabled = !isValid;
        contactbtn.classList.toggle('disabled', !isValid);
    };

    // Memanggil validasi setiap ada input
    contactform.addEventListener('input', validateForm);



    // Kirim data ke WhatsApp
    contactbtn.addEventListener('click', async function (e) {
        e.preventDefault(); // Mencegah form dari pengiriman default

        const formData = new FormData(contactform);
        const data = new URLSearchParams(formData);
        const objdata = Object.fromEntries(data);

        const message = formatMessage(objdata);
        const waUrl = 'https://api.whatsapp.com/send?phone=6282142944326&text=' + encodeURIComponent(message);
        window.open(waUrl, '_blank');

    });
    // Format pesan untuk WhatsApp
    const formatMessage = (obj) => {
        return `Data Customer\nNama: ${obj.name}\nEmail: ${obj.email}\nNo HP: ${obj.phone}\nAlamat: ${obj.address}\nPesan:...\n\nTerima kasih telah menghubungi kami! Kami akan segera merespons pesan Anda.`;
    };
});