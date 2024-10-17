import React from "react";

const PokemonCard = ({ pokemon }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transform transition-all duration-200">
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-24 h-24 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold capitalize">{pokemon.name}</h3>
            
        </div>
    );
};

export default PokemonCard;
