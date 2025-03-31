

export default function Card({product}) {


    return(

        <>
        
        <div className="box-card">

           <div className="product-card">
               <img src={product.image_url} alt="Product Image" className="product-image"/>
               <div className="product-info">
                   <h2 className="product-name">{product.name}</h2>
                   <p className="product-description">{product.description}</p>
                   <p className="product-model"><strong>Modello:</strong>{product.model}</p>
                   <p className="product-price">
                       Prezzo: <span className="original-price">{product.price}</span>
                       <span className="discount-price">{product.discount_price}</span>
                   </p>
                   <button className="buy-button">Acquista Ora</button>
               </div>
           </div>
        </div> 

        </>
    )
}