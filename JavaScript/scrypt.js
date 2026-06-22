const BASE_URL = "https://restasaurus.onrender.com/api/v1";

async function buscarRestasaurus(nome) {

    const response = await fetch(
        `${BASE_URL}/dinosaurs/name/${encodeURIComponent(nome)}`
    );

    if (!response.ok) {
        throw new Error(`Erro ${response.status}`);
    }

    return await response.json();
}

const PBDB =
    "https://paleobiodb.org/data1.2";

async function buscarPBDB(nome) {

    const response = await fetch(

        `${PBDB}/occs/list.json?base_name=${encodeURIComponent(nome)}&show=coords,loc,time,class`

    );

    if (!response.ok)
        throw new Error("Erro PBDB");

    return await response.json();
}

async function buscarDinossauro(nome) {

    try {

        const dinosaur =
            await buscarRestasaurus(nome);

        const fossils =
            await buscarPBDB(dinosaur.name);

        return {

            ...dinosaur,

            fossils: fossils.records

        };

    } catch (error) {

        console.log(error);

    }

}

buscarDinossauro("Triceratops")
    .then(dino => {

        console.log(dino);

    });