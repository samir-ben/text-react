const initState = {
    verses: [
        { id: 1, verse: "Ma jeunesse ne fut qu’un ténébreux orage,", number_verse: 1 },
        { id: 2, verse: "Traversé çà et là par de brillants soleils;", number_verse: 2 },
        { id: 3, verse: "Le tonnerre et la pluie ont fait un tel ravage,", number_verse: 3 },
        { id: 4, verse: "Qu’il reste en mon jardin bien peu de fruits vermeils.", number_verse: 4 },
        { id: 5, verse: "Voilà que j’ai touché l’automne des idées,", number_verse: 5 },
        { id: 6, verse: "Et qu’il faut employer la pelle et les râteaux", number_verse: 6 },
        { id: 7, verse: "Pour rassembler à neuf les terres inondées,", number_verse: 7 },
        { id: 8, verse: "Où l’eau creuse des trous grands comme des tombeaux.", number_verse: 8 },
        { id: 9, verse: "Et qui sait si les fleurs nouvelles que je rêve", number_verse: 9 },
        { id: 10, verse: "Trouveront dans ce sol lavé comme une grève", number_verse: 10 },
        { id: 11, verse: "Le mystique aliment qui ferait leur vigueur ?", number_verse: 11 },
        { id: 12, verse: "– Ô douleur ! ô douleur ! Le Temps mange la vie,", number_verse: 12 },
        { id: 13, verse: "Et l’obscur Ennemi qui nous ronge le cœur", number_verse: 13 },
        { id: 14, verse: "Du sang que nous perdons croît et se fortifie !", number_verse: 14 }
    ]
};

const ReducerVerse = (state = initState, action) => {
    return state;
}

export default ReducerVerse;