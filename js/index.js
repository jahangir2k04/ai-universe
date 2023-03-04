const loadCardData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayCardData(data.data.tools);
}
// display  data in card
const displayCardData = cards => {
    const universeContainer = document.getElementById('ai-universe-hub-container');
    
    cards.forEach(card => {
        console.log(card.published_in);
        // features data
        const featureItem = card.features.map(item =>`<li>${item}</li>`).join('');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
            <div class="card h-100 p-3">
                <img style="height: 200px;" src="${card.image}" class="card-img-top" alt="...">
                <div class="card-body p-0 mt-3">
                    <h5 class="card-title fw-bold">Features</h5>
                    <ol class="ps-3">${featureItem}</ol>
                </div>
                <div class="card-footer bg-white p-0 d-flex align-items-center">
                    <div>
                        <h5 class="card-title fw-bold my-3">${card.name}</h5>
                        <div class="d-flex gap-2">
                            <p><span class="material-symbols-outlined">calendar_month<span>
                            </p>
                            <p>${card.published_in}</p>
                        </div>
                    </div>
                    <div class="ms-auto">
                        <span class="material-symbols-outlined text-danger bg-danger-subtle rounded-circle p-2">arrow_right_alt</span>
                    </div>
                </div>
            </div>
        `;
        universeContainer.appendChild(cardDiv);
    });
}



loadCardData();