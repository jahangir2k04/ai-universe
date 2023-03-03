const loadCardData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayCardData(data.data.tools);
}
const displayCardData = cards => {
    const universeContainer = document.getElementById('ai-universe-hub-container');

    // const featureItem = cards.

    cards.forEach(card => {
        console.log(card.features);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
            <div class="card h-100 p-3">
                <img src="${card.image}" class="card-img-top" alt="...">
                <div class="card-body p-0 mt-3">
                    <h5 class="card-title fw-bold">Features</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        `;
        universeContainer.appendChild(cardDiv);
    });
}



loadCardData();