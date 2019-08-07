import './resto-cards.css';

const RestoCard = (resto) => {
    return `
    <div class='grid-item'>
        <div>${resto.name}</div>
        <div><img style='width: 200px' src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/zlyceyrahjsmxj4j59bf' /></div>
        <div>ratings: ${resto.rating}</div>
    </div>
    `;
};

export default RestoCard;