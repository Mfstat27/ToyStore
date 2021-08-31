import React from 'react';
import {Product} from './Product';
import {Title} from './Title';
import {ProductConsumer} from '../context';

export const ProductList = () => {
    return ( 
       <React.Fragment>
          <div className="py-5">
             <div className="container">
               <Title name="the" title="toys"/>
               <div className="row">
                  <ProductConsumer>
                     {(valueFromContext) => {
                        return valueFromContext.products.map((product) => {
                           return <Product 
                           key={product.id} 
                           product={product} 
                           />
                        })
                     }}
                  </ProductConsumer>
               </div>
            </div>
         </div>
      </React.Fragment>
   );
}
 
