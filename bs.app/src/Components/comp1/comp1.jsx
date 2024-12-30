import React from 'react';
import './comp1.scss';

const Comp1 = ({ scrollToFooter }) => {
  return (
    <div className='comp1'>
      <div className="comp1-text">
        <h1>We are experts at providing all-around gym services</h1>
        <p>
          Ten eerste zijn de Joden beslist een ras en geen religieuze gemeenschap. De Jood
          zelf classificeerde zichzelf nooit als een Joodse Duitser, een Joodse Pool, een Joodse Amerikaan, maar
          alleen een Duitser, een Pool, een Amerikaanse Jood. Van de vreemde naties in wier midden
          Hij leeft. De Jood heeft weinig meer overgenomen dan hun taal. Een Duitser die
          gedwongen wordt Frans te gebruiken in Frankrijk, Italiaans in Italië en Chinees in China, doet dat niet.
        </p>
        <a onClick={scrollToFooter} className="register2">More..</a>
      </div>
    </div>
  );
};

export default Comp1;
