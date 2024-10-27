const form = document.querySelector('form')

if (form) {
    
    form.addEventListener( 'submit', async (e) => {

        e.preventDefault();
        const formData = new FormData(form)

        const data = {

            "first_name":formData.get('first_name'),
            "last_name":formData.get('last_name'),
            "username":formData.get('username'),
            "email":formData.get('email'),
            "password":formData.get('password'),
            "confirm_password":formData.get('confirm_password')
        }

        if (!data.first_name || !data.last_name || !data.username || !data.email || !data.password || !data.confirm_password) {
            alert("Please fill out all fields");
            return;
        }

        try {
            
            const request = await fetch(form.action, {
                method: form.method,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const response = await request.json()
            console.log(response);

            if (request.ok) {
                alert('Sucessfully registered')
                window.location.replace('http://127.0.0.1:5500/frontend/simple-js/login.html')
            } else {
                alert(response.message)
            }
            
        } catch (error) {

            console.log('Error' , error);
            
        }
    })
}