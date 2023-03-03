const loadCardData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayCardData(data.data.tools);
}
const displayCardData = cards => {
    const universeContainer = document.getElementById('ai-universe-hub-container');
    
    cards.forEach(card => {
        console.log(card.features);
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
                
            </div>
        `;
        universeContainer.appendChild(cardDiv);
    });
}



loadCardData();