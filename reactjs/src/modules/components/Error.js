import React from 'react';
import Link from '@material-ui/core/Link';
 
const Error = () => {
    return (
       <div>
         <Link href="/home">
            <h5>
               {'Return to Home Page'}
            </h5>
         </Link>

         {'ERROR: Page does not exist!'}
       </div>
    );
}
export default Error;