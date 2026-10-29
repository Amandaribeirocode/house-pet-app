
const API_URL = "http://localhost:3333/pets";

const petsListElement = document.getElementById("pets-list");
const petFormElement = document.getElementById("pet-form");


// Buscar e Listar Pets (GET)
async function fetchPets() {
  try {
    const response = await fetch(API_URL);
    const pets = await response.json();


    petsListElement.innerHTML = "";

    if (pets.length === 0) {
      petsListElement.innerHTML = "<p>Nenhum pet cadastrado no momento.</p>";
      return;
    }

    pets.forEach((pet) => {
      const petCard = document.createElement("div");
      petCard.classList.add("pet-card");

    const imageTag = pet.imageUrl && pet.imageUrl.trim() !== ""
        ? `<img src="${pet.imageUrl}" alt="Foto do ${pet.name}" class="pet-image" onerror="this.style.display='none'" />`
        : "";


    petCard.innerHTML = `
    <h3>${pet.name} 🐾</h3>
        
        <img src="${pet.imageUrl}" alt="Foto do ${pet.name}" class="pet-image" />

        <p><strong>Espécie:</strong> ${pet.species}</p>
        <p><strong>Idade:</strong> ${pet.ageYears} ano(s)</p>
        <p><strong>Status:</strong> ${pet.status}</p>

        <div class="actions">
          <button class="btn-status" onclick="toggleStatus('${pet._id}', '${pet.status}')">
            ${pet.status === "disponivel" ? "Adotar 🏠" : "Disponibilizar 🔄"}
          </button>
          <button class="btn-delete" onclick="deletePet('${pet._id}')">Excluir 🗑️</button>
        </div>
      `;

      petsListElement.appendChild(petCard);
    });
  } catch (error) {
    console.error("Erro ao buscar os pets:", error);
    petsListElement.innerHTML = "<p>Erro ao carregar a lista de pets.</p>";
  }
}


// Cadastra novo Pet (POST)

petFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const species = document.getElementById("species").value;
  const ageYears = document.getElementById("ageYears").value;


  const imageUrlInput = document.getElementById("imageUrl");
  const imageUrl = imageUrlInput ? imageUrlInput.value : "";

  const newPet = {
    name: name,
    species: species,
    ageYears: ageYears,
    imageUrl: imageUrl
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPet)
    });

    if (response.ok) {
      petFormElement.reset();
      fetchPets();
    } else {
      console.error("Erro ao cadastrar o pet");
    }
  } catch (error) {
    console.error("Erro na requisição POST:", error);
  }
});


//  Atualiza o status do Pet (PUT)

async function toggleStatus(id, currentStatus) {
  const newStatus = currentStatus === "disponivel" ? "adotado" : "disponivel";

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (response.ok) {
      fetchPets();
    } else {
      console.error("Erro ao alterar o status");
    }
  } catch (error) {
    console.error("Erro na requisição PUT:", error);
  }
}


//  Remove um pet já cadastrado (DELETE)

async function deletePet(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      fetchPets();
    } else {
      console.error("Erro ao deletar o pet");
    }
  } catch (error) {
    console.error("Erro na requisição DELETE:", error);
  }
}


fetchPets();