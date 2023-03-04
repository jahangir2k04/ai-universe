const loadCardData = async (limit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayCardData(data.data.tools, limit);
}
// display  data in card
const displayCardData = (cards, limit) => {
    const universeContainer = document.getElementById('ai-universe-hub-container');
    universeContainer.textContent = '';
    // show by default 6 cards
    const showAllbtn = document.getElementById('show-all');
    if(limit && cards.length > 6){
        cards = cards.slice(0, 6);
        showAllbtn.classList.remove('d-none')
    }else{
        showAllbtn.classList.add('d-none')
    }

    cards.forEach(card => {
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
                        <button onclick="loadCardDetail('${card.id}')" class="btn border-0" data-bs-toggle="modal" data-bs-target="#cardDetailModal">
                            <span class="material-symbols-outlined text-danger bg-danger-subtle rounded-circle p-2">arrow_right_alt</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        universeContainer.appendChild(cardDiv);
    });
    toogleSpinner(false);
}

// loading toogle spinner
const toogleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if(isLoading){
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}
toogleSpinner(true);

// load card detail in modal 
const loadCardDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCardDetail(data.data);
}

// display card detail
const displayCardDetail = card => {
    console.log( card.pricing);
    // modal card description
    document.getElementById('modal-card-des').innerText = card.description;
    // plan basic
    document.getElementById('plan-basic').innerHTML = `
        <p class="mb-0">${card.pricing ? card.pricing[0].price : 'Free of cost/'}</p>
        <p class="mb-0">${card.pricing ? card.pricing[0].plan : 'Basic'}</p>
    `;
    // plan pro
    document.getElementById('plan-pro').innerHTML = `
        <p class="mb-0">${card.pricing ? card.pricing[1].price : 'Free of cost/'}</p>
        <p class="mb-0">${card.pricing ? card.pricing[1].plan : 'Pro'}</p>
    `;
    // plan contact
    document.getElementById('plan-contact').innerHTML = `
        <p class="mb-0">${card.pricing ? card.pricing[2].price : 'Free of cost/'}</p>
        <p class="mb-0">${card.pricing ? card.pricing[2].plan : 'Enterprise'}</p>
    `;
    // modal card features
    const cardFeatureUl = document.getElementById('features-div');
    cardFeatureUl.textContent = '';
    for(const feature in card.features){
        const showFeatures = card.features[feature].feature_name;
        const li = document.createElement('li');
        li.innerText = showFeatures;
        // console.log(li);
        cardFeatureUl.appendChild(li);
    }
    // modal card integrations
    const cardIntegrationUl = document.getElementById('integrations-div');
    const integrationLi = card.integrations.map(item =>`<li>${item}</li>`).join('');
    cardIntegrationUl.innerHTML = integrationLi;
}

loadCardData(6);