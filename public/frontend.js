const signupBtn = document.getElementById("signup-btn");
const signinBtn = document.getElementById("signin-btn");
const logoutBtn = document.getElementById("logout-btn");
const userinfo = document.getElementById("info-btn")
const divinfo = document.getElementById("info")



const signupForm = document.getElementById("signup-form");
const signinForm = document.getElementById("signin-form");



const signup_enter = document.getElementById("signup-enter")
const signin_enter = document.getElementById("signin-enter")

signupBtn.addEventListener("click", () => {
   
    signupForm.classList.remove("hidden");
    signinForm.classList.add("hidden");
    logoutBtn.classList.add("hidden");
    divinfo.classList.add("hidden");
   
});


signinBtn.addEventListener("click", () => {
    
    signinForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    divinfo.classList.add("hidden");    
    
});


logoutBtn.addEventListener("click", () => {
    
    signinForm.classList.add("hidden");
    signupForm.classList.add("hidden");
    logoutBtn.classList.add("hidden");
    divinfo.classList.add("hidden"); 

    alert("You have logged out!");
});


signup_enter.addEventListener("click",async () => {
    const input_SIGNUP_user = document.getElementById("signup-username").value
    const input_SIGNUP_pass = document.getElementById("signup-password").value


await axios.post("http://localhost:4000/up",{
    username : input_SIGNUP_user,
    password: input_SIGNUP_pass
})
alert("account completion successfuly")

})

    signin_enter.addEventListener('click',async ()=>{

        const input_SIGNIN_user = document.getElementById("signin-username").value
        const input_SIGNIN_pass = document.getElementById("signin-password").value
    try{
    const response = await axios.post("http://localhost:4000/in",{
            username : input_SIGNIN_user,
            password : input_SIGNIN_pass
        })
        const token = response.data.token;
        if (token){
        localStorage.setItem("token",token)
        alert ("YOU HAVE SIGN - IN")
        document.getElementById("info").classList.remove("hidden");
        document.getElementById("logout-btn").classList.remove("hidden");
  
        }else{
            alert("Invalid credentials. Please try again.");
        }
    } catch (error) {
       
        if (error.response) {
            
            const errorMsg = error.response.data.message || "Login failed. Please check your credentials.";
            alert(errorMsg);
        } else {
         
            console.error("Error:", error.message);
            alert("An unexpected error occurred. Please try again.");
        }
    }
    })  

userinfo.addEventListener('click',async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You need to log in first!");
        return; // Prevent fetching user info if not logged in
    }


    divinfo.classList.remove("hidden");
  
    const response = await axios.get("http://localhost:4000/me",{
     headers :{
        Authorization: `Bearer ${token}`
     }
    })
    
    const infodiv = document.getElementById("user-information")
    infodiv.innerHTML = `[Username] :- ${response.data.user} <br>  [Password] :- ${response.data.pass}`
})
