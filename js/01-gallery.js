import { galleryItems } from './gallery-items.js';
// Change code below this line

const list = document.querySelector('.gallery')

// const elements = galleryItems.map(({preview, original, description}) => `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source=${original}  alt="${description}" width="250"></a></li>`).join('');


// создал шаблон разметки для галлереи in function
function createGalleryMarkup(items) {
    return items
    .map(({preview, original, description}) => `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source=${original}  alt="${description}"></a></li>`).join('');   
}

// присвоил значению функцию с нужным обьектом в аргументе 
const addGalleryMarkup = createGalleryMarkup(galleryItems)

// добавил шаблон разметки в ДОМ
list.insertAdjacentHTML("beforeend", addGalleryMarkup)

// добавляю слушателя действий на галлерею 
list.addEventListener("click", onImageClick)

//функции 
function onImageClick(event) {
    //запретил браузеру открывать картинку как ссылку 
    blockStandartAction(event)

    //проверка картинка или нет 
    if (event.target.nodeName !== "IMG") {
        return
    }

    const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`, {
	onShow: (instance) => {},
	/*
	 * Function that gets executed before the lightbox closes.
	 * Returning false will prevent the lightbox from closing.
	 */
	onClose: (instance) => {}
})
    
    instance.show();
    
    //закрытие 
    list.addEventListener("keydown", (event) => {
        if (event.code === "Escape") {
            instance.close();
        }
    })
}

function blockStandartAction(event) {
    event.preventDefault();
}



