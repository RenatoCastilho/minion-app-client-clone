import React, { Component } from "react";
import minion from './minion0.jpg';

class Minion extends Component{
    render(){
        return (

            <div className="minion-content">
                <h1>Miniatura A</h1>

                <img className='minion-image' src={minion} alt="Foto da miniatura"></img>

                <p className='descricao'>Minions ipsum exercitation tempor consequat 
                    reprehenderit bee do bee do bee do tempor gelatooo. 
                    Ex underweaaar voluptate exercitation et reprehenderit 
                    ullamco sed ullamco. Sed ut ex belloo! Para tú po kass 
                    veniam uuuhhh dolor. Nisi tatata bala tu hana dul sae magna 
                    wiiiii esse. Adipisicing para tú bananaaaa ut occaecat hahaha 
                    eiusmod esse cillum gelatooo.</p>

            </div>
                
        );
    }
}

export default Minion;