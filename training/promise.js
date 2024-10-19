const myPromise = new Promise( (resolve , reject) => {
    let action = true ;
    if (action) {
        resolve('success')
    }else {
        reject('error')
    }
} );

myPromise.then(result => {
    console.log('Result:', result)
}).catch(error => {
    console.log('Error:', error);   
})

const fs = require('fs');

fetch("https://www.google.com")
    .then( result => result.text())
    .then( text => {
        fs.writeFile('home.html', text , (err) => {
            if(err) throw err
            console.log('the html file have been saved');
            
        });
    } ).catch(function(error) {
        console.log(error);
        
    } )

//using async await 
const fs = require('fs').promises;

async function cloneGoogle () {
    const request = await fetch("https://www.google.com");
    const response = await request.text();
    const createFile = await fs.writeFile('home-2.html', response )
    console.log('done');
    
}
cloneGoogle();