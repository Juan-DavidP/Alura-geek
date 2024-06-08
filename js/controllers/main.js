import { servicesProducts } from "../service/product-service.js";

const productsContainer = document.querySelector('[data-product]');
const form = document.querySelector('[data-form]');


function createCard(name, price, image, id) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="imagen-container">
            <img src="${image}" alt="${name}" />
        </div>
        <div class="card-container--info">
            <p>${name}</p>
            <div class="card-container--value">
                <p>$ ${price}</p>
                <button class="delete-button" data-id="${id}">
                    <img src="./assets/trashIcon.svg" alt="Eliminar" />
                </button>
            </div>
        </div>
    `;

    const deleteBtn = card.querySelector(`[data-id="${id}"]`);
    deleteBtn.addEventListener('click', () => {
        servicesProducts.deleteProducts(id)
            .then(() => {
                deleteBtn.remove();
            })
            .catch((err) => console.log(err));
    });

    productsContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const productList = await servicesProducts.productList();
        if (productList.length > 0) {
            productList.forEach(product => {
                productsContainer.appendChild(createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                ))
            });
        } else {
            const noElements = document.createElement('div');
            noElements.classList.add('noProducts');
            noElements.innerHTML = `<h2>No se han agregado productos</h2>`;
            productsContainer.appendChild(noElements);
            return noElements;
        }

    } catch (error) {
        console.log(error);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('[data-name]').value;
    const price = document.querySelector('[data-price]').value;
    const image = document.querySelector('[data-image]').value;

    servicesProducts.createProducts(name, price, image)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
})

render();