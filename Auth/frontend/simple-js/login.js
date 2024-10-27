const form = document.querySelector('form');

if (form) {
    
    form.addEventListener( 'submit' , async (e) => {

        e.preventDefault();
        const formData = new FormData(form)
        const data = {
            "email":formData.get('email'),
            "password":formData.get('password')
        }

        try {
             
            const request = await fetch(form.action, {
                method: form.method,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            } );

            const response = await request.json()
            console.log(response);

            if (request.ok) {
                alert('login succesful');
                const token = response.token;
                localStorage.setItem('token' , token)

                window.location.replace('http://127.0.0.1:5500/frontend/simple-js/dashboard.html');
                
            } else {
                alert(response.message)
            }
            

        } catch (error) {
            console.log('Error', error);
            
        }

    } )

}