

export default function Card() {
    return(

        <>
        
        <div className="box-card">

           <div className="product-card">
               <img src="" alt="Product Image" className="product-image"/>
               <div className="product-info">
                   <h2 className="product-name">Nome del Prodotto</h2>
                   <p className="product-description">Questa è una breve descrizione del prodotto. Elegante, moderno e di alta qualità.</p>
                   <p className="product-model"><strong>Modello:</strong> XYZ-123</p>
                   <p className="product-price">
                       Prezzo: <span className="original-price">€199.99</span>
                       <span className="discount-price">€149.99</span>
                   </p>
                   <button className="buy-button">Acquista Ora</button>
               </div>
           </div>
       </div> 

        </>
    )
}