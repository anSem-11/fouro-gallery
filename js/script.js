document.addEventListener("DOMContentLoaded", function () {
    let filterItems = document.querySelectorAll('.filter-item');
    let cardWrapper = document.querySelector('.card-wrapper');

    // подтягиваем картинки
    fetch('images.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(image => {
            let img = new Image();
            img.src = image.path;
            img.alt = image.alt;
            img.title = image.title;
            img.classList.add('card-item');
            img.setAttribute('data-tags', image.tags);

            cardWrapper.appendChild(img);
        });
    })
    .catch(error => console.error(error));

    // фильтры
    filterItems.forEach(filterItem => {
        filterItem.addEventListener('click', () => {
            let selectedTag = filterItem.dataset.tag;
            let cardItems = document.querySelectorAll('.card-item');

            cardItems.forEach(cardItem => {
                let tags = cardItem.dataset.tags.split(',');

                if (selectedTag === 'all' || tags.includes(selectedTag)) {
                    cardItem.style.display = 'block';
                } else {
                    cardItem.style.display = 'none';
                }
            });

            filterItems.forEach(item => {
                item.classList.remove('active');
            });
            filterItem.classList.add('active');
        });
    });
});

