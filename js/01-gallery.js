import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onImageClick);

function createGalleryMarkup(galleryItems) {
	return galleryItems
		.map(({ preview, original, description }) => {
			return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</div>`;
		})
		.join("");
}

function onImageClick(e) {
	e.preventDefault();
	if (!e.target.classList.contains("gallery__image")) {
		return;
	}
	const imgHighUrl = e.target.dataset.source;
	const instance = basicLightbox.create(
		`
    <img src="${imgHighUrl}" width="800"> heigth="auto">`,
		{
			onShow: () => document.addEventListener("keydown", onModalClose),
			onClose: () =>
				document.removeEventListener("keydown", onModalClose),
		}
	);

	instance.show();

	function onModalClose(e) {
		if (e.code === "Escape") {
			instance.close();
		}
	}
}
